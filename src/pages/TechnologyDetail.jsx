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
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import useTechnologies from "../hooks/useTechnologies";

function TechnologyDetail() {
    const { id } = useParams();
    const { technologies, updateStatus, updateNotes } = useTechnologies();

    const currentTech = technologies.find(item => item.id === Number(id));

    if (!currentTech) {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 6, 
                        textAlign: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="h4" gutterBottom sx={{ color: '#7c3aed' }}>
                        ⚠️ Не найдено
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Запрашиваемая технология отсутствует в базе
                    </Typography>
                    <Button 
                        component={Link} 
                        to="/technologies" 
                        startIcon={<ArrowBackIcon />}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #6d28d9, #db2777)',
                            },
                        }}
                    >
                        Вернуться к каталогу
                    </Button>
                </Paper>
            </Container>
        );
    }

    const translateStatus = (statusKey) => {
        const translations = {
            'not-started': 'Ожидает',
            'in-progress': 'Изучаю',
            'completed': 'Освоено'
        };
        return translations[statusKey] || statusKey;
    };

    const availableStatuses = [
        { key: 'not-started', text: 'Ожидает', color: '#6b7280' },
        { key: 'in-progress', text: 'Изучаю', color: '#f59e0b' },
        { key: 'completed', text: 'Освоено', color: '#10b981' }
    ];

    const renderHeader = () => (
        <Card 
            elevation={0}
            sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
                },
            }}
        >
            <CardContent sx={{ pt: 4 }}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    {currentTech.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                    {currentTech.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    <Chip 
                        label={currentTech.category} 
                        sx={{ 
                            bgcolor: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                            fontWeight: 500,
                            px: 1,
                        }}
                    />
                    <Chip 
                        label={translateStatus(currentTech.status)} 
                        sx={{
                            bgcolor: currentTech.status === 'completed' 
                                ? 'rgba(16, 185, 129, 0.1)' 
                                : currentTech.status === 'in-progress'
                                    ? 'rgba(245, 158, 11, 0.1)'
                                    : 'rgba(107, 114, 128, 0.1)',
                            color: currentTech.status === 'completed' 
                                ? '#10b981' 
                                : currentTech.status === 'in-progress'
                                    ? '#f59e0b'
                                    : '#6b7280',
                            fontWeight: 500,
                            px: 1,
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );

    const renderStatusControl = () => (
        <Card 
            elevation={0}
            sx={{ 
                flex: 1,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    📊 Текущий статус
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Нажмите для изменения статуса изучения
                </Typography>
                <ButtonGroup fullWidth orientation="vertical" sx={{ gap: 1 }}>
                    {availableStatuses.map((statusOption) => (
                        <Button
                            key={statusOption.key}
                            variant={currentTech.status === statusOption.key ? "contained" : "outlined"}
                            onClick={() => updateStatus(currentTech.id, statusOption.key)}
                            sx={{
                                py: 1.5,
                                ...(currentTech.status === statusOption.key && {
                                    bgcolor: statusOption.color,
                                    '&:hover': { bgcolor: statusOption.color, opacity: 0.9 },
                                }),
                                ...( currentTech.status !== statusOption.key && {
                                    borderColor: statusOption.color,
                                    color: statusOption.color,
                                    '&:hover': { 
                                        bgcolor: `${statusOption.color}15`,
                                        borderColor: statusOption.color,
                                    },
                                }),
                            }}
                        >
                            {statusOption.text}
                        </Button>
                    ))}
                </ButtonGroup>
            </CardContent>
        </Card>
    );

    const renderActionsCard = () => (
        <Card 
            elevation={0}
            sx={{ 
                flex: 1,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    ⚡ Действия
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Управление записью технологии
                </Typography>
                <Button 
                    fullWidth
                    variant="contained" 
                    component={Link}
                    to={`/edit-technology/${currentTech.id}`}
                    startIcon={<EditIcon />}
                    sx={{
                        py: 1.5,
                        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #6d28d9, #db2777)',
                        },
                    }}
                >
                    Редактировать запись
                </Button>
            </CardContent>
        </Card>
    );

    const renderNotesSection = () => (
        <Card 
            elevation={0}
            sx={{ 
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    📝 Мои заметки
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Записывайте важные моменты в процессе изучения
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={currentTech.notes}
                    onChange={(evt) => updateNotes(currentTech.id, evt.target.value)}
                    placeholder="Начните писать здесь..."
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#7c3aed',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#7c3aed',
                            },
                        },
                    }}
                />
            </CardContent>
        </Card>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button 
                component={Link} 
                to="/technologies" 
                startIcon={<ArrowBackIcon />}
                sx={{ 
                    mb: 3,
                    color: '#7c3aed',
                    '&:hover': {
                        bgcolor: 'rgba(124, 58, 237, 0.08)',
                    },
                }}
            >
                Вернуться к каталогу
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {renderHeader()}

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    {renderStatusControl()}
                    {renderActionsCard()}
                </Box>

                {renderNotesSection()}
            </Box>
        </Container>
    );
}

export default TechnologyDetail;