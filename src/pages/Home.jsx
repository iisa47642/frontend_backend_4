// src/pages/Home.jsx
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Paper,
  Fade,
} from '@mui/material';
import RoadmapImporter from '../components/RoadmapImporter';

function Home() {
    const renderWelcomeSection = () => (
        <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 6, position: 'relative' }}>
                {/* Декоративный фон */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -60,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 300,
                        height: 300,
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }}
                />
                
                <Typography 
                    variant="h2" 
                    component="h1" 
                    gutterBottom
                    sx={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #7c3aed 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        position: 'relative',
                    }}
                >
                    DevProgress
                </Typography>
                
                <Typography 
                    variant="h5" 
                    sx={{ 
                        color: 'text.secondary', 
                        mb: 2,
                        fontWeight: 400,
                    }}
                >
                    Ваш персональный трекер технологий
                </Typography>
                
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: 'text.secondary',
                        maxWidth: 500,
                        mx: 'auto',
                        opacity: 0.8,
                    }}
                >
                    Отслеживайте прогресс в изучении современных инструментов разработки
                </Typography>
            </Box>
        </Fade>
    );

    const renderFeatureCards = () => (
        <Box 
            sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                gap: 3,
                mb: 4,
            }}
        >
            {[
                { emoji: '📊', title: 'Аналитика', desc: 'Визуализация вашего прогресса' },
                { emoji: '🎯', title: 'Цели', desc: 'Устанавливайте дедлайны' },
                { emoji: '📝', title: 'Заметки', desc: 'Записывайте важное' },
            ].map((feature, idx) => (
                <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(236, 72, 153, 0.05))',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 40px rgba(124, 58, 237, 0.15)',
                        },
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 1 }}>
                        {feature.emoji}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {feature.desc}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {renderWelcomeSection()}
            {renderFeatureCards()}
            
            <Card 
                elevation={0}
                sx={{ 
                    border: '1px solid',
                    borderColor: 'divider',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.02), rgba(236, 72, 153, 0.02))',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <RoadmapImporter />
                </CardContent>
            </Card>

            <Typography 
                variant="caption" 
                display="block" 
                textAlign="center" 
                sx={{ mt: 4, opacity: 0.6 }}
            >
                * Для импорта данных может потребоваться VPN
            </Typography>
        </Container>
    );
}

export default Home;