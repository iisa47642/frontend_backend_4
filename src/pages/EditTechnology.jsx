// src/pages/EditTechnology.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Alert
} from '@mui/material';
import TechnologyForm from '../components/TechnologyForm';
import useTechnologies from '../hooks/useTechnologies';

function EditTechnology() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { technologies, setTechnologies } = useTechnologies();

    const techToEdit = technologies.find(t => t.id === Number(id));

    useEffect(() => {
        if (!techToEdit) {
            alert('Технология не найдена');
            navigate('/technologies');
        }
    }, [techToEdit, navigate]);

    const handleSave = (updatedData) => {
        const updatedTech = {
            ...techToEdit,
            ...updatedData,
            id: techToEdit.id, // сохраняем id
        };
        const updatedList = technologies.map(t => t.id === Number(id) ? updatedTech : t);
        setTechnologies(updatedList);
        navigate('/technologies');
    };

    const handleCancel = () => {
        navigate('/technologies');
    };

    if (!techToEdit) return null;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Редактирование технологии
            </Typography>
            <TechnologyForm
                onSave={handleSave}
                onCancel={handleCancel}
                initialData={techToEdit}
            />
        </Container>
    );
}

export default EditTechnology;