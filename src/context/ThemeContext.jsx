// src/context/ThemeContext.js
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeContext } from './themeContextDef';

// Получаем начальное значение из localStorage синхронно
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
};

export { ThemeContext };

export const CustomThemeProvider = ({ children }) => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(getInitialTheme);

    const switchTheme = () => {
        setDarkModeEnabled(currentMode => {
            const updatedMode = !currentMode;
            localStorage.setItem('theme', updatedMode ? 'dark' : 'light');
            return updatedMode;
        });
    };

    const appTheme = createTheme({
        palette: {
            mode: darkModeEnabled ? 'dark' : 'light',
            primary: {
                main: '#7c3aed',
                light: '#a78bfa',
                dark: '#5b21b6',
            },
            secondary: {
                main: '#ec4899',
                light: '#f472b6',
                dark: '#db2777',
            },
            background: {
                default: darkModeEnabled ? '#0f0f23' : '#faf5ff',
                paper: darkModeEnabled ? '#1a1a2e' : '#ffffff',
            },
            success: {
                main: '#10b981',
            },
            warning: {
                main: '#f59e0b',
            },
            error: {
                main: '#ef4444',
            },
        },
        typography: {
            fontFamily: '"Poppins", "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 600,
            },
            h3: {
                fontWeight: 600,
            },
            h4: {
                fontWeight: 600,
            },
            h5: {
                fontWeight: 500,
            },
            h6: {
                fontWeight: 500,
            },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        boxShadow: darkModeEnabled 
                            ? '0 4px 20px rgba(0, 0, 0, 0.4)' 
                            : '0 4px 20px rgba(124, 58, 237, 0.1)',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        textTransform: 'none',
                        fontWeight: 500,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                    },
                },
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ isDarkMode: darkModeEnabled, toggleTheme: switchTheme }}>
            <ThemeProvider theme={appTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};