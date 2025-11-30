// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login({ onLogin }) {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigate();

    const processLogin = (evt) => {
        evt.preventDefault();
        setErrorMessage('');

        const trimmedLogin = userLogin.trim();
        const isValidCredentials = trimmedLogin && userPassword === 'password';

        if (isValidCredentials) {
            onLogin(trimmedLogin);
            navigation('/technologies');
        } else {
            setErrorMessage('Проверьте введённые данные. Подсказка: пароль — password');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 5, 
                        width: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                        <Avatar 
                            sx={{ 
                                width: 56, 
                                height: 56, 
                                mb: 2,
                                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                            }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography 
                            component="h1" 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Авторизация
                        </Typography>
                    </Box>
                    
                    {errorMessage && (
                        <Alert 
                            severity="error" 
                            sx={{ 
                                mb: 3,
                                borderRadius: 2,
                            }}
                        >
                            {errorMessage}
                        </Alert>
                    )}

                    <Box 
                        component="form" 
                        onSubmit={processLogin} 
                        sx={{ backgroundColor: 'transparent' }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login-field"
                            label="Логин"
                            name="login"
                            autoComplete="username"
                            autoFocus
                            value={userLogin}
                            onChange={(evt) => setUserLogin(evt.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#7c3aed',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#7c3aed',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#7c3aed',
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password-field"
                            autoComplete="current-password"
                            value={userPassword}
                            onChange={(evt) => setUserPassword(evt.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#7c3aed',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#7c3aed',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#7c3aed',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 4, 
                                mb: 2,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #6d28d9, #db2777)',
                                },
                            }}
                        >
                            Войти в систему
                        </Button>
                        
                        <Box 
                            sx={{ 
                                mt: 2, 
                                p: 2, 
                                borderRadius: 2,
                                bgcolor: 'action.hover',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" align="center">
                                💡 Используйте любой логин и пароль <strong>password</strong>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;