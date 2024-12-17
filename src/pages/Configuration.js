import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  GitHub as GitHubIcon,
  Api as ApiIcon,
  BugReport as JiraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
}));

const configSections = [
  {
    title: 'GitHub Configuration',
    icon: <GitHubIcon fontSize="large" />,
    color: '#24292e',
    fields: [
      { name: 'githubToken', label: 'Access Token', type: 'password' },
      { name: 'githubUsername', label: 'Username', type: 'text' },
      { name: 'githubRepo', label: 'Default Repository', type: 'text' },
    ]
  },
  {
    title: 'OpenAI Configuration',
    icon: <ApiIcon fontSize="large" />,
    color: '#00A67E',
    fields: [
      { name: 'openaiKey', label: 'API Key', type: 'password' },
      { name: 'openaiOrg', label: 'Organization ID', type: 'text' },
      { name: 'openaiModel', label: 'Default Model', type: 'text' },
    ]
  },
  {
    title: 'Jira Configuration',
    icon: <JiraIcon fontSize="large" />,
    color: '#0052CC',
    fields: [
      { name: 'jiraUrl', label: 'Jira URL', type: 'text' },
      { name: 'jiraUsername', label: 'Username', type: 'text' },
      { name: 'jiraToken', label: 'API Token', type: 'password' },
    ]
  }
];

function Configuration() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (name) => (event) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = (section) => {
    // Here you would typically save to your backend
    console.log(`Saving ${section} configuration:`, formData);
    setSnackbar({
      open: true,
      message: `${section} configuration saved successfully!`,
      severity: 'success'
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600} color="primary">
        Configuration
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Configure your integration settings for various services
      </Typography>

      <Grid container spacing={3}>
        {configSections.map((section, index) => (
          <Grid item xs={12} key={section.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StyledCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${section.color}15`,
                      color: section.color,
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {section.title}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {section.fields.map((field) => (
                    <Grid item xs={12} md={6} key={field.name}>
                      <TextField
                        fullWidth
                        label={field.label}
                        type={field.type === 'password' && !showPassword[field.name] ? 'password' : 'text'}
                        value={formData[field.name] || ''}
                        onChange={handleChange(field.name)}
                        InputProps={field.type === 'password' ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => togglePasswordVisibility(field.name)}
                                edge="end"
                              >
                                {showPassword[field.name] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        } : undefined}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={() => handleSave(section.title)}
                      sx={{ mt: 2 }}
                    >
                      Save {section.title}
                    </Button>
                  </Grid>
                </Grid>
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Configuration; 