import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  alpha,
} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import TableChartIcon from '@mui/icons-material/TableChart';
import CloudIcon from '@mui/icons-material/Cloud';
import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { skillCategories } from '../../data/skills';

const ICON_MAP = {
  Web: WebIcon,
  Storage: StorageIcon,
  TableChart: TableChartIcon,
  Cloud: CloudIcon,
  BugReport: BugReportIcon,
  Build: BuildIcon,
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.045, ease: 'easeOut' },
  }),
};

function SkillCard({ category, cardIndex }) {
  const IconComponent = ICON_MAP[category.icon] || BuildIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: cardIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          background: category.gradient,
          borderTop: `2px solid ${alpha(category.color, 0.6)}`,
          '&:hover': {
            borderTop: `2px solid ${category.color}`,
            boxShadow: `0 16px 45px ${alpha(category.color, 0.2)}`,
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: alpha(category.color, 0.15),
                border: `1px solid ${alpha(category.color, 0.3)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconComponent sx={{ color: category.color, fontSize: '1.2rem' }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'text.primary',
              }}
            >
              {category.title}
            </Typography>
          </Box>

          {/* Skills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9 }}>
            {category.skills.map((skill, i) => (
              <motion.div key={skill} custom={i} variants={chipVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Chip
                  label={skill}
                  size="small"
                  sx={{
                    bgcolor: alpha(category.color, 0.1),
                    border: `1px solid ${alpha(category.color, 0.22)}`,
                    color: alpha(category.color, 0.9),
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.73rem',
                    height: 28,
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                    '&:hover': {
                      bgcolor: alpha(category.color, 0.2),
                      borderColor: category.color,
                      color: '#fff',
                      transform: 'translateY(-2px)',
                    },
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <Box
      id="skills"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #0a0f1e 0%, #050816 100%)',
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          overline="04. skills"
          title="Technical Arsenal"
          subtitle="Technologies, tools and practices I use daily to build high-quality software."
        />

        <Grid container spacing={3}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} lg={4} key={category.id}>
              <SkillCard category={category} cardIndex={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
