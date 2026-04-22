import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import AnimatedBox from '../ui/AnimatedBox';
import { profile } from '../../data/profile';
import ContactModal from './ContactModal';

const CONTACTS = [
  {
    icon: <EmailOutlinedIcon sx={{ fontSize: '1.5rem' }} />,
    label: 'E-mail',
    value: profile.email,
    href: `mailto:${profile.email}`,
    copyable: true,
    color: '#FF6B6B',
  },
  {
    icon: <LinkedInIcon sx={{ fontSize: '1.5rem' }} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/felipeoliveira-maia',
    href: profile.linkedin,
    copyable: false,
    color: '#0A66C2',
  },
  {
    icon: <GitHubIcon sx={{ fontSize: '1.5rem' }} />,
    label: 'GitHub',
    value: 'github.com/felipemaia02',
    href: profile.github,
    copyable: false,
    color: '#94A3B8',
  },
  {
    icon: <PlaceOutlinedIcon sx={{ fontSize: '1.5rem' }} />,
    label: 'Location',
    value: profile.location,
    href: null,
    copyable: false,
    color: '#FBBF24',
  },
];

function ContactCard({ contact, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        sx={{
          p: 0,
          overflow: 'hidden',
          cursor: contact.href ? 'pointer' : 'default',
          '&:hover .contact-arrow': contact.href ? { opacity: 1, transform: 'translate(2px, -2px)' } : {},
        }}
        component={contact.href ? 'a' : 'div'}
        href={contact.href || undefined}
        target={contact.href && !contact.href.startsWith('mailto') ? '_blank' : undefined}
        rel={contact.href && !contact.href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
        style={{ textDecoration: 'none' }}
      >
        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5 }}>
          {/* Icon */}
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              bgcolor: alpha(contact.color, 0.12),
              border: `1.5px solid ${alpha(contact.color, 0.3)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: contact.color,
              flexShrink: 0,
              transition: 'all 0.25s ease',
            }}
          >
            {contact.icon}
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                mb: 0.3,
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {contact.label}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {contact.value}
            </Typography>
          </Box>

          {/* Action area */}
          <Box sx={{ flexShrink: 0 }}>
            {contact.copyable ? (
              <Tooltip title={copied ? 'Copied!' : 'Copy'} arrow>
                <IconButton
                  size="small"
                  onClick={(e) => { e.preventDefault(); handleCopy(); }}
                  aria-label="Copy email"
                  sx={{ color: copied ? 'success.main' : 'text.secondary', '&:hover': { color: contact.color } }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : contact.href ? (
              <ArrowOutwardIcon
                className="contact-arrow"
                sx={{
                  fontSize: '1.1rem',
                  color: 'text.secondary',
                  opacity: 0,
                  transition: 'all 0.2s ease',
                }}
              />
            ) : null}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: 'linear-gradient(180deg, #050816 0%, #050816 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orb */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,245,0.12) 0%, transparent 70%)',
          bottom: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle
          overline="05. contact"
          title="Let's Talk"
          subtitle="I'm open to new opportunities, freelance projects or just a good conversation about technology."
        />

        {/* Main CTA block */}
        <AnimatedBox delay={0.1}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 7,
              p: { xs: 4, md: 6 },
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(145,94,255,0.08) 0%, rgba(0,217,245,0.05) 100%)',
              border: '1px solid rgba(145,94,255,0.2)',
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}
            >
              Ready to work{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #915EFF, #00D9F5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                together?
              </Box>
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 480, mx: 'auto' }}>
              If you have an interesting project, a job offer or just want to chat
              about tech — my inbox is always open.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<EmailOutlinedIcon />}
                onClick={() => setModalOpen(true)}
              >
                Send a message
              </Button>
              <Button
                component="a"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<LinkedInIcon />}
              >
                LinkedIn
              </Button>
            </Box>
          </Box>
        </AnimatedBox>

        {/* Contact cards grid */}
        <Grid container spacing={2}>
          {CONTACTS.map((contact, index) => (
            <Grid item xs={12} sm={6} key={contact.label}>
              <ContactCard contact={contact} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}
