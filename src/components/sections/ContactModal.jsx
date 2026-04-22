import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function ContactModal({ open, onClose }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [fields, setFields] = useState({ from_name: '', from_email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  // Strips tags and control chars; keeps only safe printable characters
  const sanitize = (value) => value.replace(/[<>"'`]/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  const LIMITS = { from_name: 80, from_email: 254, subject: 120, message: 2000 };

  const validate = () => {
    const e = {};
    const name = fields.from_name.trim();
    const email = fields.from_email.trim();
    const subject = fields.subject.trim();
    const message = fields.message.trim();

    if (!name) {
      e.from_name = 'Name is required';
    } else if (name.length > LIMITS.from_name) {
      e.from_name = `Max ${LIMITS.from_name} characters`;
    } else if (!/^[\p{L}\p{M} .'\-]+$/u.test(name)) {
      e.from_name = 'Name must contain only letters and spaces';
    }

    if (!email) {
      e.from_email = 'Email is required';
    } else if (email.length > LIMITS.from_email) {
      e.from_email = `Max ${LIMITS.from_email} characters`;
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
      e.from_email = 'Enter a valid email address';
    }

    if (!subject) {
      e.subject = 'Subject is required';
    } else if (subject.length > LIMITS.subject) {
      e.subject = `Max ${LIMITS.subject} characters`;
    }

    if (!message) {
      e.message = 'Message is required';
    } else if (message.length > LIMITS.message) {
      e.message = `Max ${LIMITS.message} characters`;
    }

    return e;
  };

  const sanitizeEmail = (value) => value.replace(/[^a-zA-Z0-9._%+\-@]/g, '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const raw = name === 'from_email' ? sanitizeEmail(value) : sanitize(value);
    const sanitized = raw.slice(0, LIMITS[name]);
    setFields((prev) => ({ ...prev, [name]: sanitized }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) { setErrors(validation); return; }

    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      setStatus('success');
      setFields({ from_name: '', from_email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    if (status === 'sending') return;
    setStatus('idle');
    setErrors({});
    onClose();
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
      '&:hover fieldset': { borderColor: 'rgba(145,94,255,0.5)' },
      '&.Mui-focused fieldset': { borderColor: '#915EFF' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#915EFF' },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0d1117',
          border: '1px solid rgba(145,94,255,0.25)',
          borderRadius: '16px',
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Send a message</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            I'll reply as soon as possible
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small" aria-label="Close" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {status === 'success' ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Message sent! 🎉</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              Thanks for reaching out. I'll get back to you soon.
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleClose}>Close</Button>
          </Box>
        ) : (
          <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your name"
                  name="from_name"
                  value={fields.from_name}
                  onChange={handleChange}
                  error={!!errors.from_name}
                  helperText={errors.from_name || `${fields.from_name.length}/80`}
                  disabled={status === 'sending'}
                  inputProps={{ maxLength: 80, autoComplete: 'name', spellCheck: false }}
                  sx={inputSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your email"
                  name="from_email"
                  type="email"
                  value={fields.from_email}
                  onChange={handleChange}
                  error={!!errors.from_email}
                  helperText={errors.from_email}
                  disabled={status === 'sending'}
                  inputProps={{ maxLength: 254, autoComplete: 'email', inputMode: 'email' }}
                  sx={inputSx}
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              error={!!errors.subject}
              helperText={errors.subject || `${fields.subject.length}/120`}
              disabled={status === 'sending'}
              inputProps={{ maxLength: 120 }}
              sx={inputSx}
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={5}
              value={fields.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message || `${fields.message.length}/2000`}
              disabled={status === 'sending'}
              inputProps={{ maxLength: 2000 }}
              sx={inputSx}
            />
            {status === 'error' && (
              <Alert severity="error" sx={{ borderRadius: '8px' }}>
                Something went wrong. Please try again or send an email directly.
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
              disabled={status === 'sending'}
              sx={{ alignSelf: 'flex-end', minWidth: 160 }}
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
