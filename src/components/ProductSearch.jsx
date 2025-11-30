// src/components/ProductSearch.jsx
import { useState, useEffect, useRef } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function ProductSearch() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    const searchProducts = async (query) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        abortControllerRef.current = new AbortController();
        
        try {
            setLoading(true);
            setError(null);

            if (!query.trim()) {
                setProducts([]);
                setLoading(false);
                return;
            }

            const response = await fetch(
                `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
                { signal: abortControllerRef.current.signal }
            );

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data.products || []);
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message);
                console.error('Ошибка при поиске продуктов:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            searchProducts(value);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Поиск продуктов
            </Typography>

            <Box sx={{ position: 'relative', mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Введите название продукта..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                />
                {loading && (
                    <CircularProgress 
                        size={24} 
                        sx={{ 
                            position: 'absolute', 
                            right: 10, 
                            top: '50%', 
                            transform: 'translateY(-50%)' 
                        }} 
                    />
                )}
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Ошибка: {error}
                </Alert>
            )}

            {products.length > 0 ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Найдено продуктов: {products.length}
                    </Typography>
                    
                    {/* Используем flex вместо Grid для лучшего контроля */}
                    <Box 
                        sx={{ 
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            justifyContent: 'center'
                        }}
                    >
                        {products.map((product) => (
                            <Card 
                                key={product.id}
                                sx={{ 
                                    flex: '0 1 calc(25% - 18px)',
                                    minWidth: 280,
                                    maxWidth: 320,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                    },
                                    // Адаптивность
                                    '@media (max-width: 1200px)': {
                                        flex: '0 1 calc(33.333% - 16px)',
                                    },
                                    '@media (max-width: 900px)': {
                                        flex: '0 1 calc(50% - 12px)',
                                    },
                                    '@media (max-width: 600px)': {
                                        flex: '0 1 100%',
                                        maxWidth: 'none'
                                    }
                                }}
                            >
                                {/* Картинка с фиксированными пропорциями */}
                                <Box sx={{ position: 'relative', paddingTop: '75%' }}>
                                    <CardMedia
                                        component="img"
                                        image={product.thumbnail}
                                        alt={product.title}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain', // Меняем на contain чтобы не обрезать
                                            backgroundColor: '#f5f5f5',
                                            p: 1
                                        }}
                                    />
                                </Box>
                                
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom noWrap>
                                        {product.title}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                                        <Chip 
                                            label={`$${product.price}`} 
                                            color="primary" 
                                            size="small" 
                                        />
                                        <Chip 
                                            label={product.category} 
                                            variant="outlined" 
                                            size="small" 
                                        />
                                    </Box>
                                    
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            minHeight: '60px'
                                        }}
                                    >
                                        {product.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </>
            ) : (
                searchTerm.trim() && !loading && (
                    <Typography variant="body1" color="text.secondary" align="center">
                        Продукты не найдены
                    </Typography>
                )
            )}
        </Container>
    );
}

export default ProductSearch;