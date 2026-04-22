import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { motion } from 'framer-motion';
import AnimatedBox from '../ui/AnimatedBox';
import SectionTitle from '../ui/SectionTitle';
import { profile } from '../../data/profile';

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #050816 0%, #0a0f1e 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          overline="01. about me"
          title="Who I Am"
          subtitle="A little about my journey, passions and what drives me as a developer."
        />

        <Grid container spacing={6} alignItems="flex-start">
          {/* ── Left column: avatar + stats ── */}
          <Grid item xs={12} md={4}>
            <AnimatedBox delay={0.1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                {/* Avatar */}
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #915EFF 0%, #00D9F5 100%)',
                      zIndex: 0,
                    }}
                  />
                  <Avatar
                    src={profile.avatar || undefined}
                    alt={profile.name}
                    sx={{
                      width: { xs: 150, md: 180 },
                      height: { xs: 150, md: 180 },
                      position: 'relative',
                      zIndex: 1,
                      border: '4px solid #050816',
                      fontSize: '3.5rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                      color: 'primary.main',
                    }}
                  >
                    {profile.initials}
                  </Avatar>
                </Box>

                {/* Name + location */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {profile.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      fontFamily: '"Fira Code", monospace',
                      fontSize: '0.82rem',
                      mb: 1,
                    }}
                  >
                    {profile.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {profile.location}
                    </Typography>
                  </Box>
                </Box>

                {/* Stats grid */}
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  {profile.stats.map((stat) => (
                    <Grid item xs={6} key={stat.label}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          bgcolor: alpha('#915EFF', 0.08),
                          border: '1px solid rgba(145,94,255,0.18)',
                          borderRadius: '12px',
                          transition: 'all 0.25s ease',
                          '&:hover': {
                            bgcolor: alpha('#915EFF', 0.14),
                            transform: 'scale(1.03)',
                          },
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(90deg, #915EFF, #00D9F5)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1.2,
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                          {stat.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </AnimatedBox>
          </Grid>

          {/* ── Right column: text + tech stack ── */}
          <Grid item xs={12} md={8}>
            <AnimatedBox delay={0.2}>
              <Box sx={{ mb: 4 }}>
                {profile.about.map((paragraph, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 2,
                      '&:last-of-type': { mb: 0 },
                      lineHeight: 1.85,
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Box>
            </AnimatedBox>

            {/* Tech stack */}
            <AnimatedBox delay={0.3}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                  <CodeOutlinedIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'primary.main',
                      fontFamily: '"Fira Code", monospace',
                      letterSpacing: '0.12em',
                    }}
                  >
                    TECH STACK
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                  {profile.techStack.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Chip
                        label={tech.name}
                        sx={{
                          bgcolor: alpha(tech.color, 0.1),
                          border: `1px solid ${alpha(tech.color, 0.35)}`,
                          color: tech.color,
                          fontFamily: '"Fira Code", monospace',
                          fontSize: '0.78rem',
                          height: 30,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha(tech.color, 0.2),
                            borderColor: tech.color,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 14px ${alpha(tech.color, 0.25)}`,
                          },
                          cursor: 'default',
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </AnimatedBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
