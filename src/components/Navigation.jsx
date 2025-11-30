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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navigation({ isLoggedIn, username, onLogout }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/technologies', label: 'Все технологии' },
    { path: '/add-technology', label: 'Добавить' },
    { path: '/search', label: 'Поиск' },
    { path: '/statistics', label: 'Статистика' },
    { path: '/settings', label: 'Настройки' },
  ];

  const renderMenuItems = () => (
    <>
      {menuItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          component={Link}
          to={item.path}
          sx={{
            backgroundColor: isActive(item.path) ? '#0ea5a4' : 'transparent',
            '&:hover': {
              backgroundColor: isActive(item.path) ? '#089191' : 'rgba(255,255,255,0.1)',
            }
          }}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  const renderDrawer = () => (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              sx={{
                backgroundColor: isActive(item.path) ? '#0ea5a4' : 'transparent',
                color: isActive(item.path) ? 'white' : 'inherit',
                textDecoration: 'none',
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1f2937, #111827)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Левая часть */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              marginRight: 2
            }}
          >
            🚀 Трекер технологий
          </Typography>
          
          {!isMobile && renderMenuItems()}
        </Box>

        {/* Правая часть */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn ? (
            <>
              {!isMobile && (
                <Chip 
                  label={`Привет, ${username}`} 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} 
                />
              )}
              <Button
                color="inherit"
                onClick={onLogout}
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                backgroundColor: isActive('/login') ? '#0ea5a4' : 'transparent',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: isActive('/login') ? '#089191' : 'rgba(255,255,255,0.1)',
                }
              }}
            >
              Войти
            </Button>
          )}

          {/* Бургер-меню для мобильных */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {renderDrawer()}
    </AppBar>
  );
}

export default Navigation;