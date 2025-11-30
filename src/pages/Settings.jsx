// src/pages/Settings.jsx
import { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ThemeContext } from '../context/ThemeContext';
import useTechnologies from '../hooks/useTechnologies';

function Settings() {
    const { technologies, setTechnologies } = useTechnologies();
    const [jsonInput, setJsonInput] = useState('');
    const [notification, setNotification] = useState({ severity: '', content: '' });
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const displayNotification = (severity, content) => {
        setNotification({ severity, content });
        setTimeout(() => setNotification({ severity: '', content: '' }), 4000);
    };

    const performExport = () => {
        const exportData = {
            exportTimestamp: new Date().toISOString(),
            technologies
        };
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(jsonBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `devprogress-backup-${Date.now()}.json`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        URL.revokeObjectURL(downloadUrl);
        displayNotification('success', '📦 Данные успешно экспортированы');
    };

    const performImport = () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            if (Array.isArray(parsedData)) {
                setTechnologies(parsedData);
                displayNotification('success', '✅ Импортирован массив технологий');
            } else if (parsedData && Array.isArray(parsedData.technologies)) {
                setTechnologies(parsedData.technologies);
                displayNotification('success', '✅ Данные успешно импортированы');
            } else {
                displayNotification('error', '⚠️ Неверный формат. Ожидается массив или объект с полем technologies');
            }
        } catch (parseError) {
            displayNotification('error', '❌ Ошибка парсинга: ' + parseError.message);
        }
    };

    const resetStatuses = () => {
        if (!confirm('Сбросить статусы всех технологий на "Ожидает"?')) return;
        const resetData = technologies.map(item => ({ ...item, status: 'not-started' }));
        setTechnologies(resetData);
        displayNotification('success', '🔄 Все статусы сброшены');
    };

    const clearAllData = () => {
        if (!confirm('⚠️ Удалить все данные? Это действие необратимо!')) return;
        setTechnologies([]);
        displayNotification('success', '🗑️ Все данные удалены');
    };

    const renderThemeCard = () => (
        <Card 
            elevation={0}
            sx={{ 
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    🎨 Оформление
                </Typography>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'action.hover',
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Цветовая схема
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {isDarkMode ? 'Тёмный режим активен' : 'Светлый режим активен'}
                        </Typography>
                    </Box>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#7c3aed',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#7c3aed',
                                    },
                                }}
                            />
                        }
                        label=""
                    />
                </Box>
            </CardContent>
        </Card>
    );

    const renderDataCard = () => (
        <Card 
            elevation={0}
            sx={{ 
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    💾 Управление данными
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                    <Button 
                        variant="outlined" 
                        startIcon={<DownloadIcon />}
                        onClick={performExport}
                        sx={{
                            borderColor: '#7c3aed',
                            color: '#7c3aed',
                            '&:hover': {
                                borderColor: '#6d28d9',
                                bgcolor: 'rgba(124, 58, 237, 0.08)',
                            },
                        }}
                    >
                        Экспорт
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={() => setJsonInput(JSON.stringify({ technologies }, null, 2))}
                        sx={{
                            borderColor: 'divider',
                            '&:hover': {
                                borderColor: '#7c3aed',
                            },
                        }}
                    >
                        Показать пример
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={10}
                    placeholder='Вставьте JSON данные для импорта...'
                    value={jsonInput}
                    onChange={(evt) => setJsonInput(evt.target.value)}
                    sx={{ 
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            '&:hover fieldset': {
                                borderColor: '#7c3aed',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#7c3aed',
                            },
                        },
                    }}
                />

                <Button 
                    variant="contained" 
                    startIcon={<UploadIcon />}
                    onClick={performImport}
                    sx={{
                        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #6d28d9, #db2777)',
                        },
                    }}
                >
                    Импортировать
                </Button>
            </CardContent>
        </Card>
    );

    const renderActionsCard = () => (
        <Card 
            elevation={0}
            sx={{ 
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    ⚙️ Дополнительные действия
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={resetStatuses}
                        sx={{
                            borderColor: '#f59e0b',
                            color: '#f59e0b',
                            '&:hover': {
                                borderColor: '#d97706',
                                bgcolor: 'rgba(245, 158, 11, 0.08)',
                            },
                        }}
                    >
                        Сбросить статусы
                    </Button>
                    <Button 
                        variant="outlined"
                        startIcon={<DeleteForeverIcon />}
                        onClick={clearAllData}
                        sx={{
                            borderColor: '#ef4444',
                            color: '#ef4444',
                            '&:hover': {
                                borderColor: '#dc2626',
                                bgcolor: 'rgba(239, 68, 68, 0.08)',
                            },
                        }}
                    >
                        Очистить всё
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontWeight: 700,
                        mb: 1,
                        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    Параметры
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Настройка приложения и управление данными
                </Typography>
            </Box>

            {notification.content && (
                <Alert 
                    severity={notification.severity} 
                    sx={{ 
                        mb: 3,
                        borderRadius: 2,
                    }}
                >
                    {notification.content}
                </Alert>
            )}

            {renderThemeCard()}
            {renderDataCard()}
            {renderActionsCard()}
        </Container>
    );
}

export default Settings;