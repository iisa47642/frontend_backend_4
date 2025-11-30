// src/pages/AddTechnology.jsx
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';
import TechnologyForm from '../components/TechnologyForm';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
    const { technologies, setTechnologies } = useTechnologies();
    const routerNavigation = useNavigate();

    const saveNewTechnology = (formData) => {
        const techEntry = {
            id: Date.now(),
            ...formData,
            status: 'not-started',
            notes: ''
        };
        setTechnologies([...technologies, techEntry]);
        routerNavigation('/technologies');
    };

    const discardChanges = () => {
        routerNavigation('/technologies');
    };

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
                    Новая технология
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Добавьте технологию в ваш каталог для отслеживания
                </Typography>
            </Box>
            <TechnologyForm onSave={saveNewTechnology} onCancel={discardChanges} />
        </Container>
    );
}

export default AddTechnology;