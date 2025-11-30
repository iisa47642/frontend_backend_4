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
  ButtonGroup,
  Alert,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import useTechnologies from '../hooks/useTechnologies';

function Settings() {
    const { technologies, setTechnologies } = useTechnologies();
    const [importText, setImportText] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech-tracker-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showMessage('success', 'Экспорт завершён — файл скачан.');
    };

    const handleImport = () => {
        try {
            const parsed = JSON.parse(importText);
            if (Array.isArray(parsed)) {
                setTechnologies(parsed);
                showMessage('success', 'Импортирован массив технологий.');
            } else if (parsed && Array.isArray(parsed.technologies)) {
                setTechnologies(parsed.technologies);
                showMessage('success', 'Импортирован формат экспорта.');
            } else {
                showMessage('error', 'Неверный формат JSON. Ожидается массив или { technologies: [...] }');
            }
        } catch (err) {
            showMessage('error', 'Ошибка парсинга JSON: ' + err.message);
        }
    };

    const handleReset = () => {
        if (!confirm('Сбросить все технологии в состояние "Не начато"?')) return;
        const reset = technologies.map(t => ({ ...t, status: 'not-started' }));
        setTechnologies(reset);
        showMessage('success', 'Статусы сброшены.');
    };

    const handleClearAll = () => {
        if (!confirm('Полностью очистить локальное хранилище технологий? Это необратимо.')) return;
        setTechnologies([]);
        showMessage('success', 'Данные очищены.');
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Настройки
            </Typography>

            {message.text && (
                <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
                </Alert>
            )}

            {/* Переключение темы */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Внешний вид
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isDarkMode}
                                onChange={toggleTheme}
                                color="primary"
                            />
                        }
                        label={isDarkMode ? 'Тёмная тема' : 'Светлая тема'}
                    />
                </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Экспорт / импорт данных
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Button variant="outlined" onClick={handleExport}>
                            Экспортировать
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={() => { setImportText(JSON.stringify({ technologies }, null, 2)); }}
                        >
                            Вставить пример
                        </Button>
                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        rows={8}
                        placeholder='Вставьте JSON сюда (массив или {"technologies": [...]})'
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Button 
                        variant="contained" 
                        onClick={handleImport}
                    >
                        Импортировать
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Действия
                    </Typography>
                    <ButtonGroup variant="outlined" sx={{ gap: 1, flexWrap: 'wrap' }}>
                        <Button onClick={handleReset}>
                            Сбросить статусы
                        </Button>
                        <Button 
                            onClick={handleClearAll}
                            color="error"
                        >
                            Очистить все
                        </Button>
                    </ButtonGroup>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Settings;