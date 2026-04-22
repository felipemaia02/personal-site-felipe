FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 4173

# Serve the built app with Vite preview
CMD ["npm", "run", "preview", "--", "--host", "--port", "4173"]
