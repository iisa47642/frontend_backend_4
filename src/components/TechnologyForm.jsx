// src/components/TechnologyForm.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || '',
        resources: initialData.resources && initialData.resources.length > 0
            ? initialData.resources
            : ['']
    });

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Название технологии обязательно';
        } else if (formData.title.trim().length < 2) {
            newErrors.title = 'Название должно содержать минимум 2 символа';
        } else if (formData.title.trim().length > 50) {
            newErrors.title = 'Название не должно превышать 50 символов';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание технологии обязательно';
        } else if (formData.description.trim().length < 5) {
            newErrors.description = 'Описание должно содержать минимум 5 символов';
        }

        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }

        formData.resources.forEach((resource, index) => {
            if (resource.trim() && !isValidUrl(resource)) {
                newErrors[`resource_${index}`] = 'Введите корректный URL';
            }
        });

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleResourceChange = (index, value) => {
        const newResources = [...formData.resources];
        newResources[index] = value;
        setFormData(prev => ({ ...prev, resources: newResources }));
    };

    const addResourceField = () => {
        setFormData(prev => ({ ...prev, resources: [...prev.resources, ''] }));
    };

    const removeResourceField = (index) => {
        if (formData.resources.length > 1) {
            const newResources = formData.resources.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, resources: newResources }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            const cleanedData = {
                ...formData,
                resources: formData.resources.filter(r => r.trim() !== '')
            };
            onSave(cleanedData);
        }
    };

    // Стили для TextField чтобы поддерживали тему
    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.default',
        }
    };

    return (
        <Paper 
            sx={{ 
                p: 4, 
                maxWidth: 600, 
                margin: '0 auto',
                backgroundColor: 'background.paper',
                backgroundImage: 'none',
                color: 'text.primary'
            }}
        >
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                {initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}
            </Typography>

            <Box 
                component="form" 
                onSubmit={handleSubmit} 
                noValidate
                sx={{
                    // Явно задаем прозрачный фон для формы
                    backgroundColor: 'transparent'
                }}
            >
                {/* Название */}
                <TextField
                    fullWidth
                    label="Название технологии *"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                    margin="normal"
                    placeholder="Например: React, Node.js, TypeScript"
                    sx={textFieldStyles}
                />

                {/* Описание */}
                <TextField
                    fullWidth
                    label="Описание *"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    margin="normal"
                    multiline
                    rows={4}
                    placeholder="Опишите, что это за технология и зачем её изучать..."
                    sx={textFieldStyles}
                />

                {/* Категория и сложность в одной строке */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            label="Категория"
                            sx={textFieldStyles}
                        >
                            <MenuItem value="frontend">Frontend</MenuItem>
                            <MenuItem value="backend">Backend</MenuItem>
                            <MenuItem value="database">База данных</MenuItem>
                            <MenuItem value="devops">DevOps</MenuItem>
                            <MenuItem value="other">Другое</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Сложность</InputLabel>
                        <Select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            label="Сложность"
                            sx={textFieldStyles}
                        >
                            <MenuItem value="beginner">Начальный</MenuItem>
                            <MenuItem value="intermediate">Средний</MenuItem>
                            <MenuItem value="advanced">Продвинутый</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Дедлайн */}
                <TextField
                    fullWidth
                    label="Дедлайн"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    error={!!errors.deadline}
                    helperText={errors.deadline}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={textFieldStyles}
                />

                {/* Ресурсы */}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Ресурсы для изучения
                    </Typography>
                    {formData.resources.map((resource, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
                            <TextField
                                fullWidth
                                type="url"
                                value={resource}
                                onChange={(e) => handleResourceChange(index, e.target.value)}
                                placeholder="https://example.com"
                                error={!!errors[`resource_${index}`]}
                                helperText={errors[`resource_${index}`]}
                                sx={textFieldStyles}
                            />
                            {formData.resources.length > 1 && (
                                <IconButton
                                    onClick={() => removeResourceField(index)}
                                    color="error"
                                    sx={{ mt: 1 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                    <Button
                        startIcon={<AddIcon />}
                        onClick={addResourceField}
                        variant="outlined"
                        sx={{ mt: 1 }}
                    >
                        Добавить ресурс
                    </Button>
                </Box>

                {/* Кнопки */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isFormValid}
                        size="large"
                    >
                        Сохранить
                    </Button>
                    <Button
                        type="button"
                        onClick={onCancel}
                        variant="outlined"
                        size="large"
                    >
                        Отмена
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default TechnologyForm;