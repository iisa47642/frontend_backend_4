// src/pages/Statistics.jsx
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  LinearProgress
} from '@mui/material';
import useTechnologies from '../hooks/useTechnologies';

function Statistics() {
    const { technologies, progress } = useTechnologies();

    const total = technologies.length;
    const counts = {
        completed: technologies.filter(t => t.status === 'completed').length,
        'in-progress': technologies.filter(t => t.status === 'in-progress').length,
        'not-started': technologies.filter(t => t.status === 'not-started').length
    };

    const percentage = (n) => total === 0 ? 0 : Math.round((n / total) * 100);

    const StatusBar = ({ label, count, percentage, color }) => (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                    {label} ({count})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {percentage}%
                </Typography>
            </Box>
            <LinearProgress 
                variant="determinate" 
                value={percentage} 
                sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#f1f5f9',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: color,
                    }
                }}
            />
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Статистика
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" variant="body2" gutterBottom>
                                Общий прогресс
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                {progress}%
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" variant="body2" gutterBottom>
                                Всего технологий
                            </Typography>
                            <Typography variant="h4">
                                {total}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" variant="body2" gutterBottom>
                                Изучено
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {counts.completed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" variant="body2" gutterBottom>
                                В процессе
                            </Typography>
                            <Typography variant="h4" color="warning.main">
                                {counts['in-progress']}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Распределение по статусам
                    </Typography>
                    
                    <StatusBar 
                        label="Изучено" 
                        count={counts.completed} 
                        percentage={percentage(counts.completed)} 
                        color="#4caf50"
                    />
                    <StatusBar 
                        label="В процессе" 
                        count={counts['in-progress']} 
                        percentage={percentage(counts['in-progress'])} 
                        color="#f59e0b"
                    />
                    <StatusBar 
                        label="Не начато" 
                        count={counts['not-started']} 
                        percentage={percentage(counts['not-started'])} 
                        color="#94a3b8"
                    />
                </CardContent>
            </Card>
        </Container>
    );
}

export default Statistics;
