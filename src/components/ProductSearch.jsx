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
  Chip,
  Paper,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function ProductSearch() {
    const [productList, setProductList] = useState([]);
    const [queryText, setQueryText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const searchDelayRef = useRef(null);
    const requestControllerRef = useRef(null);

    const executeSearch = async (searchQuery) => {
        // Отменяем предыдущий запрос
        if (requestControllerRef.current) {
            requestControllerRef.current.abort();
        }
        
        requestControllerRef.current = new AbortController();
        
        try {
            setIsSearching(true);
            setSearchError(null);

            const trimmedQuery = searchQuery.trim();
            if (!trimmedQuery) {
                setProductList([]);
                setIsSearching(false);
                return;
            }

            const apiResponse = await fetch(
                `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedQuery)}`,
                { signal: requestControllerRef.current.signal }
            );

            if (!apiResponse.ok) {
                throw new Error(`Ошибка сервера: ${apiResponse.status}`);
            }

            const responseData = await apiResponse.json();
            setProductList(responseData.products || []);
        } catch (fetchError) {
            if (fetchError.name !== 'AbortError') {
                setSearchError(fetchError.message);
                console.error('Ошибка поиска:', fetchError);
            }
        } finally {
            setIsSearching(false);
        }
    };

    const handleQueryChange = (evt) => {
        const inputValue = evt.target.value;
        setQueryText(inputValue);

        // Debounce
        if (searchDelayRef.current) {
            clearTimeout(searchDelayRef.current);
        }

        searchDelayRef.current = setTimeout(() => {
            executeSearch(inputValue);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (searchDelayRef.current) {
                clearTimeout(searchDelayRef.current);
            }
            if (requestControllerRef.current) {
                requestControllerRef.current.abort();
            }
        };
    }, []);

    const renderSearchHeader = () => (
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
                Поиск продуктов
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Найдите продукты через внешний API
            </Typography>
        </Box>
    );

    const renderSearchInput = () => (
        <Paper 
            elevation={0}
            sx={{ 
                p: 3, 
                mb: 4,
                border: '1px solid',
                borderColor: 'divider',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.02), rgba(236, 72, 153, 0.02))',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <TextField
                    fullWidth
                    placeholder="Введите название для поиска..."
                    value={queryText}
                    onChange={handleQueryChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#7c3aed' }} />
                            </InputAdornment>
                        ),
                    }}
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
                {isSearching && (
                    <CircularProgress 
                        size={24}
                        sx={{ 
                            position: 'absolute', 
                            right: 16, 
                            top: '50%', 
                            transform: 'translateY(-50%)',
                            color: '#7c3aed',
                        }} 
                    />
                )}
            </Box>
        </Paper>
    );

    const renderProductCard = (product) => (
        <Card 
            key={product.id}
            elevation={0}
            sx={{ 
                flex: '0 1 calc(25% - 18px)',
                minWidth: 280,
                maxWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)',
                    borderColor: '#7c3aed',
                },
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
            <Box sx={{ position: 'relative', paddingTop: '75%', bgcolor: '#faf5ff' }}>
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
                        objectFit: 'contain',
                        p: 2
                    }}
                />
            </Box>
            
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap sx={{ fontWeight: 600 }}>
                    {product.title}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip 
                        label={`$${product.price}`} 
                        size="small"
                        sx={{ 
                            bgcolor: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                            fontWeight: 600,
                        }}
                    />
                    <Chip 
                        label={product.category} 
                        size="small"
                        sx={{
                            bgcolor: 'rgba(236, 72, 153, 0.1)',
                            color: '#ec4899',
                        }}
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
                        minHeight: 60,
                    }}
                >
                    {product.description}
                </Typography>
            </CardContent>
        </Card>
    );

    const renderResults = () => {
        if (productList.length === 0) {
            if (queryText.trim() && !isSearching) {
                return (
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 4, 
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            🔍 Ничего не найдено
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Попробуйте изменить поисковый запрос
                        </Typography>
                    </Paper>
                );
            }
            return null;
        }

        return (
            <>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <span>Найдено:</span>
                    <Chip 
                        label={productList.length} 
                        size="small"
                        sx={{ 
                            bgcolor: 'rgba(124, 58, 237, 0.1)',
                            color: '#7c3aed',
                            fontWeight: 600,
                        }}
                    />
                </Typography>
                
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'center'
                    }}
                >
                    {productList.map(renderProductCard)}
                </Box>
            </>
        );
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {renderSearchHeader()}
            {renderSearchInput()}

            {searchError && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 3,
                        borderRadius: 2,
                    }}
                >
                    {searchError}
                </Alert>
            )}

            {renderResults()}
        </Container>
    );
}

export default ProductSearch;