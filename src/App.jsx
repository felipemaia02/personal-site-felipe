import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

const globalStyles = `
  html { scroll-behavior: smooth; }

  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(35px, -55px) scale(1.06); }
    66%       { transform: translate(-25px, 20px) scale(0.94); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-45px, 35px) scale(0.94); }
    66%       { transform: translate(30px, -30px) scale(1.06); }
  }
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%       { transform: translate(20px, 40px) scale(1.08); }
  }
  @keyframes blink-cursor {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(145, 94, 255, 0.5); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(145, 94, 255, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(145, 94, 255, 0); }
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Box sx={{ overflowX: 'hidden' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
