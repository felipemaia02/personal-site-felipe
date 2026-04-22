<div align="center">

# 🚀 Dev Portfolio Template

**A modern, responsive and visually striking portfolio template for software developers.**

Built with React, Material UI and Framer Motion — fully customizable through a clean data layer.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Material UI](https://img.shields.io/badge/Material_UI-5-007FFF?style=flat-square&logo=mui)](https://mui.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF0078?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)](Dockerfile)

![Portfolio Preview](https://placehold.co/1200x630/050816/915EFF?text=Dev+Portfolio+Template&font=inter)

</div>

---

## ✨ Features

- **Dark "cosmic" theme** — deep dark background with electric violet & cyan accents
- **Animated Hero section** — typewriter effect, floating gradient orbs, scroll indicator
- **Frosted glass Navbar** — transparent → blur on scroll, active section highlight
- **Experience timeline** — animated cards with achievements and tech chips
- **Projects gallery** — filterable by technology, GitHub stars/forks display
- **Skills grid** — categorized cards (Frontend, Backend, Database, Cloud, Testing, Tools)
- **Contact section** — copy-to-clipboard email, direct links to LinkedIn and GitHub
- **Framer Motion animations** — fade-up on scroll, stagger children, layout transitions
- **Fully responsive** — mobile, tablet and desktop
- **SEO ready** — Open Graph and Twitter Card meta tags
- **Easy to customize** — all personal data lives in `src/data/`, no logic to touch

---

## 📁 Project Structure

```
src/
├── App.jsx                     # Root component + global keyframe animations
├── main.jsx
├── theme/
│   └── theme.js                # MUI theme (colors, typography, component overrides)
├── data/                       # ⭐ Edit these files to personalize the site
│   ├── profile.js              # Name, title, bio, avatar, stats, tech stack
│   ├── experience.js           # Work history (companies, roles, achievements)
│   ├── projects.js             # GitHub projects (description, links, filters)
│   └── skills.js               # Technical skills by category
└── components/
    ├── layout/
    │   ├── Navbar.jsx           # Responsive navigation with scroll spy
    │   └── Footer.jsx
    ├── ui/
    │   ├── AnimatedBox.jsx      # Reusable fade-up scroll animation wrapper
    │   └── SectionTitle.jsx     # Section heading with gradient underline
    └── sections/
        ├── Hero.jsx             # Landing section with typewriter & orbs
        ├── About.jsx            # Bio, avatar, stats and tech stack chips
        ├── Experience.jsx       # Professional timeline
        ├── Projects.jsx         # Filterable project cards
        ├── Skills.jsx           # Skill category cards
        └── Contact.jsx          # Contact cards with CTA
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/portfolio-template.git
cd portfolio-template

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 Customization

All personal data is isolated in the `src/data/` folder. You only need to edit these four files:

### `src/data/profile.js`
Your name, title, bio, location, social links, avatar, stats and tech stack.

```js
export const profile = {
  name: 'Your Full Name',
  title: 'Full Stack Developer',
  roles: ['React Developer', 'Node.js Engineer'],   // typewriter effect
  email: 'you@example.com',
  linkedin: 'https://linkedin.com/in/your-handle',
  github: 'https://github.com/your-handle',
  avatar: '/avatar.jpg',   // place your photo in /public
  resume: '/resume.pdf',   // place your CV in /public
  // ...
};
```

### `src/data/experience.js`
Work history with company, role, period, achievements and technologies used.

### `src/data/projects.js`
GitHub projects with description, tech stack, links and filter categories.

### `src/data/skills.js`
Technical skills organized by category (Frontend, Backend, Database, Cloud, Testing, Tools).

### Static assets
Place these files in the `/public` folder:
| File | Description |
|---|---|
| `avatar.jpg` | Your profile photo |
| `resume.pdf` | Your CV for download |
| `favicon.svg` | Browser tab icon |

---

## 🎨 Color Palette

| Role | Color | Hex |
|---|---|---|
| Background | Deep Cosmic | `#050816` |
| Surface | GitHub Dark | `#0d1117` |
| Primary | Electric Violet | `#915EFF` |
| Secondary | Electric Cyan | `#00D9F5` |
| Text Primary | White | `#FFFFFF` |
| Text Secondary | Slate | `#94A3B8` |

To change the palette, edit `src/theme/theme.js`.

---

### Netlify

Connect your GitHub repository on [netlify.com](https://netlify.com) and set:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Docker

Run the production build inside a container with a single command:

```bash
docker compose up -d
```

The site will be available at [http://localhost:4173](http://localhost:4173).

> Uses **Node 20 Alpine** to build and serve the app via `vite preview`.

| File | Purpose |
|---|---|
| `Dockerfile` | Node 20 Alpine — builds and serves with `vite preview` |
| `docker-compose.yml` | Runs the container on port `4173` |

**Useful commands:**

```bash
# Build and start
docker compose up -d --build

# Stop
docker compose down

# View logs
docker compose logs -f portfolio

# Build image manually
docker build -t portfolio .
```

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18 | UI framework |
| [Vite](https://vitejs.dev) | 5 | Build tool & dev server |
| [Material UI](https://mui.com) | 5 | Component library & theming |
| [Material Icons](https://mui.com/material-ui/material-icons/) | 5 | Icon set |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animations |
| [Inter](https://fonts.google.com/specimen/Inter) | — | Primary typeface |
| [Fira Code](https://fonts.google.com/specimen/Fira+Code) | — | Monospace / code flavor |

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for your own portfolio, fork it, or share it. A credit or star is always appreciated! ⭐

---

<div align="center">
  Made with ❤️ and too much coffee
</div>
