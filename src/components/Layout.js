import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Science as ScienceIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 64,
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  padding: '0 24px',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
}));

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: 64,
  background: '#F8FAFF',
  minHeight: 'calc(100vh - 64px)',
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Design Agent', icon: <ScienceIcon />, path: '/design-agent' },
  { text: 'Analyse Agents', icon: <AnalyticsIcon />, path: '/analyse-agents' },
  { text: 'Configuration', icon: <SettingsIcon />, path: '/configuration' },
];

function Layout({ onLogout }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('isAuthenticated');
    if (onLogout) {
      onLogout();
    }
    handleMenuClose();
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    const path = menuItems[newValue].path;
    navigate(path);
  };

  const currentTab = menuItems.findIndex(item => item.path === location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 200 }}>
            <img src="/logo.svg" alt="InferAge Logo" style={{ height: 40 }} />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              InferAge
            </Typography>
          </Box>

          <StyledTabs 
            value={currentTab !== -1 ? currentTab : 0}
            onChange={handleTabChange}
            centered
            sx={{ flex: 1 }}
          >
            {menuItems.map((item) => (
              <StyledTab
                key={item.path}
                icon={item.icon}
                iconPosition="start"
                label={item.text}
              />
            ))}
          </StyledTabs>

          <Box sx={{ width: 200, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleMenuClick}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.05)',
                }
              }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Main>
    </Box>
  );
}

export default Layout; 