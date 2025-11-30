// src/pages/TechnologyList.jsx
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import useTechnologies from "../hooks/useTechnologies";
import BulkStatusEditor from "../components/BulkStatusEditor";

function TechnologyList() {
    const { technologies, progress, cycleStatus } = useTechnologies();

    const getStatusText = (status) => {
        const statusMap = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Изучено'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'in-progress': return 'warning';
            default: return 'default';
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Все технологии ({technologies.length})
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                Прогресс: {progress}%
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 3,
                    mb: 4
                }}
            >
                {technologies.map((tech) => (
                    <Card
                        key={tech.id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4,
                            }
                        }}
                        onClick={() => cycleStatus(tech.id)}
                    >
                        {/* Остальное содержимое карточки без изменений */}
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant="h6"
                                component="h3"
                                gutterBottom
                            >
                                {tech.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    flexGrow: 1,
                                    mb: 2,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {tech.description}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                                <Chip
                                    label={tech.category}
                                    variant="outlined"
                                    size="small"
                                />
                                <Chip
                                    label={getStatusText(tech.status)}
                                    color={getStatusColor(tech.status)}
                                    size="small"
                                />
                            </Box>
                        </CardContent>

                        <CardActions sx={{ mt: 'auto' }}>
                            <Button
                                size="small"
                                component={Link}
                                to={`/technology/${tech.id}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                Подробнее →
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            <BulkStatusEditor />
        </Container>
    );
}

export default TechnologyList;