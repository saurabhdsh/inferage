import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  Typography, 
  IconButton, 
  Chip,
  LinearProgress,
  Tab,
  Tabs,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
}));

// Mock data
const performanceData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  performance: Math.floor(Math.random() * 40) + 60,
  errors: Math.floor(Math.random() * 10),
}));

const agentStats = [
  { name: 'UI Agents', value: 35, color: '#007AFF' },
  { name: 'Content Agents', value: 25, color: '#34C759' },
  { name: 'Translation Agents', value: 20, color: '#FF2D55' },
  { name: 'DevOps Agents', value: 20, color: '#FF9500' },
];

const recentActivities = [
  { 
    agent: 'UI Component Generator',
    status: 'success',
    time: '2 mins ago',
    duration: '1.2s',
    type: 'SDLC'
  },
  { 
    agent: 'Content Optimizer',
    status: 'error',
    time: '5 mins ago',
    duration: '2.5s',
    type: 'Content'
  },
  { 
    agent: 'Code Translator',
    status: 'success',
    time: '10 mins ago',
    duration: '3.1s',
    type: 'Translation'
  },
  { 
    agent: 'Security Scanner',
    status: 'success',
    time: '15 mins ago',
    duration: '5.2s',
    type: 'Security'
  },
];

function AnalyseAgents() {
  const [timeRange, setTimeRange] = useState(0);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={600} color="primary">
            Agent Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and analyze your AI agents' performance
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          sx={{ borderRadius: 2 }}
        >
          Refresh Data
        </Button>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { title: 'Active Agents', value: '24', icon: <MemoryIcon />, color: '#007AFF' },
          { title: 'Avg Response Time', value: '1.2s', icon: <SpeedIcon />, color: '#34C759' },
          { title: 'Success Rate', value: '95%', icon: <CheckCircleIcon />, color: '#5856D6' },
          { title: 'Error Rate', value: '5%', icon: <ErrorIcon />, color: '#FF3B30' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StyledCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: `${stat.color}15`,
                      color: stat.color,
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.random() * 100} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: `${stat.color}15`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: stat.color,
                    }
                  }} 
                />
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Performance Graph */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Performance Overview
              </Typography>
              <Tabs 
                value={timeRange} 
                onChange={(e, v) => setTimeRange(v)}
                sx={{ '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' } }}
              >
                <StyledTab label="24h" />
                <StyledTab label="7d" />
                <StyledTab label="30d" />
              </Tabs>
            </Box>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#007AFF" 
                    fill="#007AFF" 
                    fillOpacity={0.1} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="errors" 
                    stroke="#FF3B30" 
                    fill="#FF3B30" 
                    fillOpacity={0.1} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </StyledCard>
        </Grid>

        {/* Agent Distribution */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Agent Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={agentStats}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {agentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </StyledCard>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Recent Activities
            </Typography>
            <Grid container spacing={2}>
              {recentActivities.map((activity, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      sx={{ 
                        p: 2, 
                        display: 'flex', 
                        alignItems: 'center',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: 'none',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {activity.agent}
                          </Typography>
                          <Chip 
                            label={activity.status} 
                            size="small"
                            color={activity.status === 'success' ? 'success' : 'error'}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {activity.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Duration: {activity.duration}
                          </Typography>
                          <Chip label={activity.type} size="small" variant="outlined" />
                        </Box>
                      </Box>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnalyseAgents; 