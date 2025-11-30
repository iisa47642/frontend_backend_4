// src/pages/EditTechnology.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';
import TechnologyForm from '../components/TechnologyForm';
import useTechnologies from '../hooks/useTechnologies';

function EditTechnology() {
    const { id: techId } = useParams();
    const routerNavigation = useNavigate();
    const { technologies, setTechnologies } = useTechnologies();

    const targetTech = technologies.find(item => item.id === Number(techId));

    useEffect(() => {
        if (!targetTech) {
            alert('Запись не найдена в каталоге');
            routerNavigation('/technologies');
        }
    }, [targetTech, routerNavigation]);

    const applyChanges = (modifiedData) => {
        const updatedEntry = {
            ...targetTech,
            ...modifiedData,
            id: targetTech.id,
        };
        const refreshedList = technologies.map(item => 
            item.id === Number(techId) ? updatedEntry : item
        );
        setTechnologies(refreshedList);
        routerNavigation('/technologies');
    };

    const discardChanges = () => {
        routerNavigation('/technologies');
    };

    if (!targetTech) return null;

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
                    Редактирование
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Изменение записи: {targetTech.title}
                </Typography>
            </Box>
            <TechnologyForm
                onSave={applyChanges}
                onCancel={discardChanges}
                initialData={targetTech}
            />
        </Container>
    );
}

export default EditTechnology;