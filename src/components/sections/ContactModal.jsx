import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
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
  const recaptchaRef = useRef(null);
  const submittingRef = useRef(false);
  const [status, setStatus] = useState('idle');
  const [fields, setFields] = useState({ from_name: '', from_email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const URL_RE = /https?:\/\/[^\s]*/gi;
  const BARE_URL_RE = /\b(www\.|([-a-z0-9]+\.)+[a-z]{2,}(\/[^\s]*)?)(?=[\s,;!?]|$)/gi;
  const stripUrls = (value) => value.replace(URL_RE, '').replace(BARE_URL_RE, '');
  const sanitize = (value) => stripUrls(value).replace(/[<>"'`]/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

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

    const hasUrl = (v) => /https?:\/\/|www\.|([-a-z0-9]+\.)+[a-z]{2,}/i.test(v);

    if (!subject) {
      e.subject = 'Subject is required';
    } else if (subject.length > LIMITS.subject) {
      e.subject = `Max ${LIMITS.subject} characters`;
    } else if (hasUrl(subject)) {
      e.subject = 'Links are not allowed';
    }

    if (!message) {
      e.message = 'Message is required';
    } else if (message.length > LIMITS.message) {
      e.message = `Max ${LIMITS.message} characters`;
    } else if (hasUrl(message)) {
      e.message = 'Links are not allowed';
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

  // Rate limiting: max 3 sends per hour, stored in localStorage
  const RATE_KEY = 'contact_sends';
  const RATE_LIMIT = 3;
  const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

  const getRateData = () => {
    try {
      return JSON.parse(localStorage.getItem(RATE_KEY)) || { count: 0, windowStart: Date.now() };
    } catch {
      return { count: 0, windowStart: Date.now() };
    }
  };

  const checkRateLimit = () => {
    const data = getRateData();
    const now = Date.now();
    if (now - data.windowStart > RATE_WINDOW_MS) {
      // Window expired — reset
      localStorage.setItem(RATE_KEY, JSON.stringify({ count: 0, windowStart: now }));
      return { allowed: true, remaining: RATE_LIMIT };
    }
    const remaining = RATE_LIMIT - data.count;
    return { allowed: remaining > 0, remaining };
  };

  const incrementRateCount = () => {
    const data = getRateData();
    const now = Date.now();
    const windowStart = now - data.windowStart > RATE_WINDOW_MS ? now : data.windowStart;
    localStorage.setItem(RATE_KEY, JSON.stringify({ count: data.count + 1, windowStart }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;

    const validation = validate();
    if (Object.keys(validation).length) { setErrors(validation); return; }

    const { allowed } = checkRateLimit();
    if (!allowed) {
      setStatus('ratelimit');
      return;
    }

    if (!captchaToken) {
      setErrors((prev) => ({ ...prev, captcha: 'Please complete the CAPTCHA' }));
      return;
    }

    submittingRef.current = true;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      incrementRateCount();
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
      setStatus('success');
      setFields({ from_name: '', from_email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      submittingRef.current = false;
    }
  };

  const handleClose = () => {
    if (status === 'sending') return;
    setStatus('idle');
    setErrors({});
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
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
        ) : status === 'ratelimit' ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Too many messages</Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              You've reached the limit of {RATE_LIMIT} messages per hour. Please try again later.
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
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => {
                setCaptchaToken(token);
                setErrors((prev) => ({ ...prev, captcha: undefined }));
              }}
              onExpired={() => setCaptchaToken(null)}
              theme="dark"
            />
            {errors.captcha && (
              <Alert severity="warning" sx={{ borderRadius: '8px', py: 0 }}>
                {errors.captcha}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
              disabled={status === 'sending' || !captchaToken}
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
