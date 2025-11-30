// src/pages/Home.jsx
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Paper
} from '@mui/material';
import RoadmapImporter from '../components/RoadmapImporter';

function Home() {
   

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom
                    sx={{
                        background: 'linear-gradient(135deg, #0ea5a4 0%, #089191 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        fontWeight: 'bold'
                    }}
                >
                    Добро пожаловать в Трекер технологий!
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Отслеживайте свой прогресс в изучении современных технологий.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Для импорта из API и поиска возможно понадобится VPN*
                </Typography>
            </Box>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <RoadmapImporter />
                </CardContent>
            </Card>

            
        </Container>
    );
}

export default Home;