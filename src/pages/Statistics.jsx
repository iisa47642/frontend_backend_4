// src/pages/Statistics.jsx
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  LinearProgress,
  Paper,
} from '@mui/material';
import useTechnologies from '../hooks/useTechnologies';

// Компонент прогресс-бара вынесен за пределы основного компонента
const ProgressIndicator = ({ title, amount, percent, barColor }) => (
    <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        bgcolor: `${barColor}15`,
                        color: barColor,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '20px',
                        fontWeight: 600,
                    }}
                >
                    {amount}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 45, textAlign: 'right' }}>
                    {percent}%
                </Typography>
            </Box>
        </Box>
        <LinearProgress 
            variant="determinate" 
            value={percent} 
            sx={{ 
                height: 10, 
                borderRadius: 5,
                backgroundColor: `${barColor}15`,
                '& .MuiLinearProgress-bar': {
                    backgroundColor: barColor,
                    borderRadius: 5,
                }
            }}
        />
    </Box>
);

function Statistics() {
    const { technologies, progress } = useTechnologies();

    const totalCount = technologies.length;
    const statusCounts = {
        completed: technologies.filter(item => item.status === 'completed').length,
        'in-progress': technologies.filter(item => item.status === 'in-progress').length,
        'not-started': technologies.filter(item => item.status === 'not-started').length
    };

    const calcPercent = (num) => totalCount === 0 ? 0 : Math.round((num / totalCount) * 100);

    const renderStatCard = (label, value, gradient, emoji) => (
        <Card 
            elevation={0}
            sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: gradient,
                }}
            />
            <CardContent sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                            {label}
                        </Typography>
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: 700,
                                background: gradient,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ opacity: 0.8 }}>
                        {emoji}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
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
                    Аналитика
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Обзор вашего прогресса в изучении технологий
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 3,
                    mb: 4,
                }}
            >
                {renderStatCard(
                    'Общий прогресс',
                    `${progress}%`,
                    'linear-gradient(135deg, #7c3aed, #ec4899)',
                    '📈'
                )}
                {renderStatCard(
                    'Всего в каталоге',
                    totalCount,
                    'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    '📚'
                )}
                {renderStatCard(
                    'Освоено',
                    statusCounts.completed,
                    'linear-gradient(135deg, #10b981, #34d399)',
                    '✅'
                )}
                {renderStatCard(
                    'В процессе',
                    statusCounts['in-progress'],
                    'linear-gradient(135deg, #f59e0b, #fbbf24)',
                    '⏳'
                )}
            </Box>

            <Card 
                elevation={0}
                sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
                        📊 Распределение по статусам
                    </Typography>
                    
                    <ProgressIndicator 
                        title="Освоено" 
                        amount={statusCounts.completed} 
                        percent={calcPercent(statusCounts.completed)} 
                        barColor="#10b981"
                    />
                    <ProgressIndicator 
                        title="В процессе изучения" 
                        amount={statusCounts['in-progress']} 
                        percent={calcPercent(statusCounts['in-progress'])} 
                        barColor="#f59e0b"
                    />
                    <ProgressIndicator 
                        title="Ожидает начала" 
                        amount={statusCounts['not-started']} 
                        percent={calcPercent(statusCounts['not-started'])} 
                        barColor="#6b7280"
                    />
                </CardContent>
            </Card>
        </Container>
    );
}

export default Statistics;
