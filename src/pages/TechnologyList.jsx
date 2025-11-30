// src/pages/TechnologyList.jsx
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    LinearProgress,
    Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useTechnologies from "../hooks/useTechnologies";
import BulkStatusEditor from "../components/BulkStatusEditor";

function TechnologyList() {
    const { technologies, progress, cycleStatus } = useTechnologies();

    const translateStatus = (statusKey) => {
        const translations = {
            'not-started': 'Ожидает',
            'in-progress': 'Изучаю',
            'completed': 'Освоено'
        };
        return translations[statusKey] || statusKey;
    };

    const determineChipColor = (statusKey) => {
        const colorMapping = {
            'completed': 'success',
            'in-progress': 'warning',
            'not-started': 'default'
        };
        return colorMapping[statusKey] || 'default';
    };

    const renderProgressHeader = () => (
        <Paper 
            elevation={0}
            sx={{ 
                p: 3, 
                mb: 4, 
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(236, 72, 153, 0.08))',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Каталог технологий
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Всего элементов: {technologies.length}
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        {progress}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        общий прогресс
                    </Typography>
                </Box>
            </Box>
            <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'rgba(124, 58, 237, 0.1)',
                    '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
                        borderRadius: 4,
                    }
                }}
            />
        </Paper>
    );

    const renderTechnologyCard = (techItem) => (
        <Card
            key={techItem.id}
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)',
                    borderColor: '#7c3aed',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: techItem.status === 'completed' 
                        ? 'linear-gradient(90deg, #10b981, #34d399)' 
                        : techItem.status === 'in-progress'
                            ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                            : 'linear-gradient(90deg, #6b7280, #9ca3af)',
                },
            }}
            onClick={() => cycleStatus(techItem.id)}
        >
            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1 }}
                >
                    {techItem.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: 40,
                    }}
                >
                    {techItem.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                        label={techItem.category}
                        size="small"
                        sx={{ 
                            bgcolor: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                            fontWeight: 500,
                        }}
                    />
                    <Chip
                        label={translateStatus(techItem.status)}
                        color={determineChipColor(techItem.status)}
                        size="small"
                        sx={{ fontWeight: 500 }}
                    />
                </Box>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                    size="small"
                    component={Link}
                    to={`/technology/${techItem.id}`}
                    onClick={(evt) => evt.stopPropagation()}
                    sx={{
                        color: '#7c3aed',
                        fontWeight: 500,
                        '&:hover': {
                            bgcolor: 'rgba(124, 58, 237, 0.08)',
                        },
                    }}
                >
                    Детали →
                </Button>
            </CardActions>
        </Card>
    );

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {renderProgressHeader()}

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: 3,
                    mb: 4,
                }}
            >
                {technologies.map(renderTechnologyCard)}
            </Box>

            <BulkStatusEditor />
        </Container>
    );
}

export default TechnologyList;