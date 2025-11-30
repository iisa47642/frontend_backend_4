// src/pages/TechnologyDetail.jsx
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  ButtonGroup,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useTechnologies from "../hooks/useTechnologies";

function TechnologyDetail() {
    const { id } = useParams();
    const { technologies, updateStatus, updateNotes } = useTechnologies();

    const tech = technologies.find(t => t.id === Number(id));

    if (!tech) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Технология не найдена
                </Typography>
                <Button 
                    component={Link} 
                    to="/technologies" 
                    startIcon={<ArrowBackIcon />}
                >
                    Назад к списку
                </Button>
            </Container>
        );
    }

    const getStatusText = (status) => {
        const statusMap = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Изучено'
        };
        return statusMap[status] || status;
    };

    const statusButtons = [
        { value: 'not-started', label: 'Не начато' },
        { value: 'in-progress', label: 'В процессе' },
        { value: 'completed', label: 'Изучено' }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button 
                component={Link} 
                to="/technologies" 
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 3 }}
            >
                Назад к списку
            </Button>

            {/* Убираем Grid, делаем обычный поток */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Заголовок и описание */}
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {tech.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            {tech.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label={tech.category} variant="outlined" />
                            <Chip 
                                label={getStatusText(tech.status)} 
                                color={
                                    tech.status === 'completed' ? 'success' : 
                                    tech.status === 'in-progress' ? 'warning' : 'default'
                                } 
                            />
                        </Box>
                    </CardContent>
                </Card>

                {/* Статус и действия в одной строке на десктопе */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    {/* Статус */}
                    <Card sx={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Статус: {getStatusText(tech.status)}
                            </Typography>
                            <ButtonGroup fullWidth variant="outlined">
                                {statusButtons.map((status) => (
                                    <Button
                                        key={status.value}
                                        variant={tech.status === status.value ? "contained" : "outlined"}
                                        onClick={() => updateStatus(tech.id, status.value)}
                                    >
                                        {status.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </CardContent>
                    </Card>

                    {/* Действия */}
                    <Card sx={{ flex: 1 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Действия
                            </Typography>
                            <Button 
                                fullWidth
                                variant="contained" 
                                component={Link}
                                to={`/edit-technology/${tech.id}`}
                                startIcon="✏️"
                            >
                                Редактировать технологию
                            </Button>
                        </CardContent>
                    </Card>
                </Box>

                {/* Заметки - на всю ширину */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Заметки
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={tech.notes}
                            onChange={(e) => updateNotes(tech.id, e.target.value)}
                            placeholder="Добавьте свои заметки по изучению этой технологии..."
                            variant="outlined"
                        />
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default TechnologyDetail;