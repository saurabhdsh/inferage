import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  Typography, 
  IconButton, 
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Paper,
  Button,
  Chip,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code as CodeIcon,
  Edit as EditIcon,
  Translate as TranslateIcon,
  ExpandMore as ExpandMoreIcon,
  WebAsset as WebAssetIcon,
  Architecture as ArchitectureIcon,
  BugReport as BugReportIcon,
  Storage as StorageIcon,
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
  Settings as SettingsIcon,
  CloudUpload as CloudUploadIcon,
  SmartToy as SmartToyIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
  },
}));

const AgentCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    '& .agent-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: '8px 24px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.2)',
  },
}));

const agentCategories = [
  {
    title: 'SDLC Agents',
    icon: <CodeIcon fontSize="large" />,
    color: '#007AFF',
    description: 'Streamline your development lifecycle',
    subAgents: [
      { 
        name: 'UI Component Generator', 
        icon: <WebAssetIcon />, 
        description: 'Generate and deploy UI components',
        features: ['React/Vue/Angular support', 'Responsive layouts', 'Accessibility compliant'],
        status: 'stable'
      },
      { 
        name: 'Architecture Assistant', 
        icon: <ArchitectureIcon />, 
        description: 'Help with system architecture decisions',
        features: ['Pattern suggestions', 'Scalability analysis', 'Best practices'],
        status: 'beta'
      },
      {
        name: 'Code Review Agent',
        icon: <BugReportIcon />,
        description: 'Automated code review and quality assurance',
        features: ['Security analysis', 'Performance optimization', 'Code standards'],
        status: 'stable'
      },
      {
        name: 'Database Designer',
        icon: <StorageIcon />,
        description: 'Design and optimize database schemas',
        features: ['Schema optimization', 'Index suggestions', 'Migration scripts'],
        status: 'stable'
      }
    ]
  },
  {
    title: 'Content Writing Agents',
    icon: <EditIcon fontSize="large" />,
    color: '#5856D6',
    description: 'Create and optimize content automatically',
    subAgents: [
      {
        name: 'Blog Writer',
        icon: <EditIcon />,
        description: 'Generate engaging blog posts and articles',
        features: ['SEO optimization', 'Tone adjustment', 'Multi-language'],
        status: 'stable'
      },
      {
        name: 'Technical Writer',
        icon: <EditIcon />,
        description: 'Create technical documentation and guides',
        features: ['API documentation', 'User guides', 'Code examples'],
        status: 'stable'
      },
      {
        name: 'Marketing Copy',
        icon: <EditIcon />,
        description: 'Generate marketing and promotional content',
        features: ['Ad copy', 'Email templates', 'Social media posts'],
        status: 'beta'
      },
      {
        name: 'Content Optimizer',
        icon: <EditIcon />,
        description: 'Optimize existing content for better engagement',
        features: ['Readability analysis', 'Keyword optimization', 'Style suggestions'],
        status: 'stable'
      }
    ]
  },
  {
    title: 'Translation Agents',
    icon: <TranslateIcon fontSize="large" />,
    color: '#FF2D55',
    description: 'Translate and localize content seamlessly',
    subAgents: [
      {
        name: 'Code Translator',
        icon: <TranslateIcon />,
        description: 'Translate between programming languages',
        features: ['Syntax conversion', 'Framework migration', 'Code optimization'],
        status: 'beta'
      },
      {
        name: 'Document Translator',
        icon: <TranslateIcon />,
        description: 'Translate documentation and content',
        features: ['30+ languages', 'Context preservation', 'Technical terms'],
        status: 'stable'
      },
      {
        name: 'API Localizer',
        icon: <TranslateIcon />,
        description: 'Localize API responses and errors',
        features: ['Response localization', 'Error messages', 'Regional formats'],
        status: 'stable'
      }
    ]
  },
  {
    title: 'DevOps Agents',
    icon: <SettingsIcon fontSize="large" />,
    color: '#34C759',
    description: 'Automate your deployment and operations',
    subAgents: [
      {
        name: 'CI/CD Assistant',
        icon: <SettingsIcon />,
        description: 'Optimize your deployment pipeline',
        features: ['Pipeline optimization', 'Test automation', 'Deployment scripts'],
        status: 'beta'
      },
      {
        name: 'Infrastructure Manager',
        icon: <SettingsIcon />,
        description: 'Manage cloud infrastructure efficiently',
        features: ['Resource optimization', 'Cost analysis', 'Security compliance'],
        status: 'stable'
      },
      {
        name: 'Monitoring Agent',
        icon: <SettingsIcon />,
        description: 'Monitor system performance and health',
        features: ['Performance metrics', 'Alert management', 'Log analysis'],
        status: 'stable'
      }
    ]
  },
  {
    title: 'Security Agents',
    icon: <BugReportIcon fontSize="large" />,
    color: '#FF9500',
    description: 'Enhance your application security',
    subAgents: [
      {
        name: 'Code Scanner',
        icon: <BugReportIcon />,
        description: 'Scan code for security vulnerabilities',
        features: ['Vulnerability detection', 'Best practices', 'Fix suggestions'],
        status: 'stable'
      },
      {
        name: 'Penetration Tester',
        icon: <BugReportIcon />,
        description: 'Automated security testing',
        features: ['API testing', 'SQL injection', 'XSS detection'],
        status: 'beta'
      },
      {
        name: 'Compliance Checker',
        icon: <BugReportIcon />,
        description: 'Check compliance with security standards',
        features: ['GDPR', 'HIPAA', 'PCI DSS'],
        status: 'stable'
      }
    ]
  },
  {
    title: 'Data Analysis Agents',
    icon: <AnalyticsIcon fontSize="large" />,
    color: '#AC8E68',
    description: 'Analyze and visualize your data',
    subAgents: [
      {
        name: 'Data Cleaner',
        icon: <AnalyticsIcon />,
        description: 'Clean and prepare data for analysis',
        features: ['Data validation', 'Format standardization', 'Duplicate removal'],
        status: 'stable'
      },
      {
        name: 'Pattern Analyzer',
        icon: <AnalyticsIcon />,
        description: 'Identify patterns and trends in data',
        features: ['Trend analysis', 'Anomaly detection', 'Predictive models'],
        status: 'beta'
      },
      {
        name: 'Report Generator',
        icon: <AnalyticsIcon />,
        description: 'Generate comprehensive data reports',
        features: ['Visual charts', 'PDF export', 'Custom templates'],
        status: 'stable'
      }
    ]
  }
];

const steps = ['Basic Info', 'Configuration', 'Review'];

function DesignAgent() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    type: '',
    model: '',
    parameters: {}
  });

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const handleCreateAgent = () => {
    setCreateDialogOpen(true);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Agent Name"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={newAgent.description}
              onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Select
              fullWidth
              value={newAgent.type}
              onChange={(e) => setNewAgent({ ...newAgent, type: e.target.value })}
              sx={{ mb: 2 }}
            >
              <MenuItem value="ui">UI Generation</MenuItem>
              <MenuItem value="code">Code Analysis</MenuItem>
              <MenuItem value="content">Content Generation</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Model Configuration"
              multiline
              rows={4}
              value={newAgent.model}
              onChange={(e) => setNewAgent({ ...newAgent, model: e.target.value })}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Review your agent configuration:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <pre>{JSON.stringify(newAgent, null, 2)}</pre>
            </Paper>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary">
            Design Agent
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage AI agents for your workflow
          </Typography>
        </Box>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateAgent}
        >
          Create Custom Agent
        </StyledButton>
      </Box>

      <Grid container spacing={3}>
        {agentCategories.map((category, index) => (
          <Grid item xs={12} key={category.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StyledCard>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: `${category.color}15`,
                        color: category.color,
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={() => handleCategoryClick(index)}>
                    <ExpandMoreIcon 
                      sx={{ 
                        transform: expandedCategory === index ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.3s'
                      }} 
                    />
                  </IconButton>
                </Box>

                <Collapse in={expandedCategory === index}>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {category.subAgents.map((agent) => (
                      <Grid item xs={12} md={6} key={agent.name}>
                        <AgentCard>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 2,
                                bgcolor: `${category.color}15`,
                                color: category.color,
                                height: 'fit-content',
                              }}
                            >
                              {agent.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {agent.name}
                                </Typography>
                                <Chip 
                                  label={agent.status} 
                                  size="small"
                                  color={agent.status === 'stable' ? 'success' : 'warning'}
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {agent.description}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                {agent.features.map((feature) => (
                                  <Chip
                                    key={feature}
                                    label={feature}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          </Box>
                          <Box 
                            className="agent-actions"
                            sx={{ 
                              position: 'absolute',
                              right: 16,
                              bottom: 16,
                              opacity: 0,
                              transform: 'translateY(10px)',
                              transition: 'all 0.3s',
                              display: 'flex',
                              gap: 1,
                            }}
                          >
                            <IconButton size="small" sx={{ bgcolor: 'background.paper' }}>
                              <PlayArrowIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ bgcolor: 'background.paper' }}>
                              <SettingsIcon />
                            </IconButton>
                          </Box>
                        </AgentCard>
                      </Grid>
                    ))}
                  </Grid>
                </Collapse>
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Create Agent Dialog */}
      <Dialog 
        open={createDialogOpen} 
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon color="primary" />
            <Typography variant="h6">Create Custom Agent</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button 
            disabled={activeStep === 0} 
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <StyledButton
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => setCreateDialogOpen(false)}
            >
              Deploy Agent
            </StyledButton>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DesignAgent; 