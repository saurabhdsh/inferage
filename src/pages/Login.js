import { useState, useEffect } from 'react';
import { Box, Card, TextField, Button, Typography, Container, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 4,
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  maxWidth: '400px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 122, 255, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-50%',
    width: '200%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transform: 'translateX(-100%)',
    animation: 'shimmer 3s infinite',
  },
  '@keyframes shimmer': {
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}));

const Logo = styled(motion.div)({
  width: 120,
  height: 120,
  position: 'relative',
  marginBottom: 32,
});

const GradientBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#ffffff',
  zIndex: -1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(0,122,255,0.08), transparent 70%)',
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 2,
    background: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 122, 255, 0.1)',
    },
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: '14px 0',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(45deg, #007AFF, #47A1FF)',
  boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 122, 255, 0.4)',
  },
}));

function Login({ onAuthChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing auth on mount
    localStorage.removeItem('isAuthenticated');
    if (onAuthChange) {
      onAuthChange(false);
    }
  }, [onAuthChange]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      if (email === 'demo@inferage.ai' && password === 'demo123') {
        console.log('Credentials matched');
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store auth token or user data
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Authentication stored');
        
        // Update auth state in parent component
        if (onAuthChange) {
          onAuthChange(true);
        }
        
        // Navigate to dashboard
        navigate('/');
      } else {
        console.log('Invalid credentials');
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" sx={{ minHeight: '100vh', position: 'relative' }}>
      <GradientBackground />
      <Box
        component={motion.div}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <StyledCard
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: 0.3 
          }}
        >
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Logo
              as={motion.img}
              src="/logo.svg"
              alt="InferAge Logo"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.5
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Typography 
                component="h1" 
                variant="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #007AFF, #47A1FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                InferAge
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.8 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500,
                  color: '#007AFF',
                  textAlign: 'center',
                  marginBottom: 4,
                }}
              >
                Orchestrating AI, Simplified
              </Typography>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Typography 
                  color="error" 
                  sx={{ mb: 2, textAlign: 'center' }}
                >
                  {error}
                </Typography>
              </motion.div>
            )}

            <Box
              component={motion.div}
              sx={{ width: '100%' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <StyledTextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                disabled={loading}
                required
              />
              <StyledTextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                disabled={loading}
                required
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <StyledButton
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 4 }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: 24, height: 24, borderRadius: '50%', 
                                border: '2px solid #fff', 
                                borderTopColor: 'transparent',
                                marginRight: 8 }}
                      />
                      Signing In...
                    </Box>
                  ) : (
                    'Sign In'
                  )}
                </StyledButton>
              </motion.div>
            </Box>
          </Box>
        </StyledCard>
      </Box>
    </Container>
  );
}

export default Login; 