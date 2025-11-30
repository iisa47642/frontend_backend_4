// src/components/RoadmapImporter.jsx
import { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import useTechnologies from '../hooks/useTechnologies';

function RoadmapImporter() {
    const { technologies: existingData, setTechnologies } = useTechnologies();
    const [isLoading, setIsLoading] = useState(false);

    const fetchFromExternalApi = async () => {
        setIsLoading(true);
        try {
            const apiResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!apiResponse.ok) throw new Error(`Статус: ${apiResponse.status}`);

            const userData = await apiResponse.json();

            // Преобразование в формат приложения
            const transformedData = userData.map(user => ({
                id: user.id,
                title: user.name,
                description: `📧 ${user.email} | 🏙️ ${user.address.city}`,
                status: 'not-started',
                notes: '',
                category: 'api'
            }));

            if (transformedData.length === 0) {
                alert('API вернул пустой ответ');
                return;
            }

            // Исключение дубликатов
            const currentIds = new Set(existingData.map(item => item.id));
            const uniqueItems = transformedData.filter(item => !currentIds.has(item.id));

            if (uniqueItems.length === 0) {
                alert('Все данные уже присутствуют в каталоге');
                return;
            }

            setTechnologies(current => [...current, ...uniqueItems]);
            alert(`✅ Добавлено ${uniqueItems.length} новых записей`);

        } catch (fetchError) {
            console.error('Ошибка загрузки:', fetchError);
            alert('❌ Не удалось загрузить данные: ' + (fetchError.message || 'неизвестная ошибка'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                📥 Импорт из внешнего источника
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Загрузите демо-данные из JSONPlaceholder API
            </Typography>
            <Button
                onClick={fetchFromExternalApi}
                disabled={isLoading}
                variant="contained"
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <CloudDownloadIcon />}
                sx={{
                    background: isLoading 
                        ? '#9ca3af' 
                        : 'linear-gradient(135deg, #10b981, #34d399)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #059669, #10b981)',
                    },
                    '&.Mui-disabled': {
                        background: '#e5e7eb',
                        color: '#9ca3af',
                    },
                }}
            >
                {isLoading ? 'Загрузка...' : 'Импортировать данные'}
            </Button>
        </Box>
    );
}

export default RoadmapImporter;