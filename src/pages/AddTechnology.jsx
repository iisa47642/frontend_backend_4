// src/pages/AddTechnology.jsx
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography
} from '@mui/material';
import TechnologyForm from '../components/TechnologyForm';
import useTechnologies from '../hooks/useTechnologies';

function AddTechnology() {
    const { technologies, setTechnologies } = useTechnologies();
    const navigate = useNavigate();

    const handleSave = (newData) => {
        const newTech = {
            id: Date.now(),
            ...newData,
            status: 'not-started',
            notes: ''
        };
        setTechnologies([...technologies, newTech]);
        navigate('/technologies');
    };

    const handleCancel = () => {
        navigate('/technologies');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Добавление технологии
            </Typography>
            <TechnologyForm onSave={handleSave} onCancel={handleCancel} />
        </Container>
    );
}

export default AddTechnology;