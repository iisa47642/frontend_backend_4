// src/components/Navigation.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';

function Navigation({ isLoggedIn, username, onLogout }) {
  const currentLocation = useLocation();
  const muiTheme = useTheme();
  const compactView = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [menuVisible, setMenuVisible] = useState(false);

  const checkActivePath = (routePath) => currentLocation.pathname === routePath;

  const navigationLinks = [
    { route: '/technologies', text: 'Каталог' },
    { route: '/add-technology', text: 'Создать' },
    { route: '/search', text: 'Найти' },
    { route: '/statistics', text: 'Аналитика' },
    { route: '/settings', text: 'Параметры' },
  ];

  const buildDesktopMenu = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {navigationLinks.map((navItem) => (
        <Button
          key={navItem.route}
          component={Link}
          to={navItem.route}
          sx={{
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: '20px',
            background: checkActivePath(navItem.route) 
              ? 'linear-gradient(135deg, #7c3aed, #ec4899)' 
              : 'transparent',
            '&:hover': {
              background: checkActivePath(navItem.route) 
                ? 'linear-gradient(135deg, #6d28d9, #db2777)' 
                : 'rgba(255,255,255,0.15)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {navItem.text}
        </Button>
      ))}
    </Box>
  );

  const buildMobileDrawer = () => (
    <Drawer
      anchor="right"
      open={menuVisible}
      onClose={() => setMenuVisible(false)}
      PaperProps={{
        sx: {
          background: 'linear-gradient(180deg, #1e1b4b, #312e81)',
          color: 'white',
        }
      }}
    >
      <Box sx={{ width: 280, pt: 3 }} role="presentation">
        <Box sx={{ px: 3, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            📚 Навигация
          </Typography>
        </Box>
        <List sx={{ pt: 2 }}>
          {navigationLinks.map((navItem) => (
            <ListItem
              key={navItem.route}
              component={Link}
              to={navItem.route}
              onClick={() => setMenuVisible(false)}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: '12px',
                background: checkActivePath(navItem.route) 
                  ? 'linear-gradient(135deg, #7c3aed, #ec4899)' 
                  : 'transparent',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                },
                textDecoration: 'none',
              }}
            >
              <ListItemText 
                primary={navItem.text} 
                sx={{ color: 'white' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        {/* Логотип слева */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar 
            sx={{ 
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              width: 40,
              height: 40,
            }}
          >
            <CodeIcon />
          </Avatar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #a78bfa, #f472b6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DevProgress
          </Typography>
        </Box>

        {/* Центральное меню */}
        {!compactView && buildDesktopMenu()}

        {/* Правая часть */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn ? (
            <>
              {!compactView && (
                <Chip 
                  avatar={<Avatar sx={{ bgcolor: '#7c3aed' }}>{username.charAt(0).toUpperCase()}</Avatar>}
                  label={username} 
                  sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.3)',
                    '& .MuiChip-avatar': { color: 'white' }
                  }} 
                  variant="outlined"
                />
              )}
              <Button
                onClick={onLogout}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  borderRadius: '20px',
                  px: 3,
                  '&:hover': {
                    background: 'rgba(239, 68, 68, 0.2)',
                    borderColor: '#ef4444',
                  }
                }}
                variant="outlined"
              >
                Выход
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                color: 'white',
                borderRadius: '20px',
                px: 3,
                background: checkActivePath('/login') 
                  ? 'linear-gradient(135deg, #7c3aed, #ec4899)' 
                  : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6d28d9, #db2777)',
                  borderColor: 'transparent',
                }
              }}
            >
              Авторизация
            </Button>
          )}

          {/* Мобильное меню */}
          {compactView && (
            <IconButton
              sx={{ color: 'white' }}
              onClick={() => setMenuVisible(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {buildMobileDrawer()}
    </AppBar>
  );
}

export default Navigation;