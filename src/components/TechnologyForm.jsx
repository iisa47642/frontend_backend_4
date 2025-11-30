// src/components/TechnologyForm.jsx
import { useState, useMemo } from 'react';
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

// Валидация URL
const checkUrlFormat = (urlString) => {
    try {
        new URL(urlString);
        return true;
    } catch {
        return false;
    }
};

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
    const [formFields, setFormFields] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'beginner',
        deadline: initialData.deadline || '',
        resources: initialData.resources && initialData.resources.length > 0
            ? initialData.resources
            : ['']
    });

    // Валидация с useMemo вместо useEffect + useState
    const validationResult = useMemo(() => {
        const fieldErrors = {};

        // Проверка названия
        const trimmedTitle = formFields.title.trim();
        if (!trimmedTitle) {
            fieldErrors.title = 'Укажите название технологии';
        } else if (trimmedTitle.length < 2) {
            fieldErrors.title = 'Минимум 2 символа';
        } else if (trimmedTitle.length > 50) {
            fieldErrors.title = 'Максимум 50 символов';
        }

        // Проверка описания
        const trimmedDesc = formFields.description.trim();
        if (!trimmedDesc) {
            fieldErrors.description = 'Укажите описание';
        } else if (trimmedDesc.length < 5) {
            fieldErrors.description = 'Минимум 5 символов';
        }

        // Проверка дедлайна
        if (formFields.deadline) {
            const selectedDate = new Date(formFields.deadline);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (selectedDate < currentDate) {
                fieldErrors.deadline = 'Дата не может быть в прошлом';
            }
        }

        // Проверка ресурсов
        formFields.resources.forEach((url, idx) => {
            if (url.trim() && !checkUrlFormat(url)) {
                fieldErrors[`resource_${idx}`] = 'Некорректный URL';
            }
        });

        return {
            errors: fieldErrors,
            isValid: Object.keys(fieldErrors).length === 0
        };
    }, [formFields]);

    const modifyField = (fieldName, fieldValue) => {
        setFormFields(current => ({ ...current, [fieldName]: fieldValue }));
    };

    const modifyResource = (idx, newValue) => {
        const updatedResources = [...formFields.resources];
        updatedResources[idx] = newValue;
        setFormFields(current => ({ ...current, resources: updatedResources }));
    };

    const appendResourceField = () => {
        setFormFields(current => ({ 
            ...current, 
            resources: [...current.resources, ''] 
        }));
    };

    const deleteResourceField = (idx) => {
        if (formFields.resources.length > 1) {
            const filteredResources = formFields.resources.filter((_, i) => i !== idx);
            setFormFields(current => ({ ...current, resources: filteredResources }));
        }
    };

    const submitForm = (evt) => {
        evt.preventDefault();
        if (validationResult.isValid) {
            const cleanedData = {
                ...formFields,
                resources: formFields.resources.filter(r => r.trim() !== '')
            };
            onSave(cleanedData);
        }
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#7c3aed',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#7c3aed',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#7c3aed',
        },
    };

    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 4, 
                maxWidth: 600, 
                margin: '0 auto',
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
            <Typography 
                variant="h5" 
                align="center" 
                sx={{ 
                    mb: 3,
                    fontWeight: 600,
                }}
            >
                {initialData.title ? '✏️ Изменение записи' : '➕ Новая запись'}
            </Typography>

            <Box 
                component="form" 
                onSubmit={submitForm} 
                noValidate
                sx={{ backgroundColor: 'transparent' }}
            >
                <TextField
                    fullWidth
                    label="Название *"
                    value={formFields.title}
                    onChange={(evt) => modifyField('title', evt.target.value)}
                    error={!!validationResult.errors.title}
                    helperText={validationResult.errors.title}
                    margin="normal"
                    placeholder="React, Node.js, TypeScript..."
                    sx={inputStyles}
                />

                <TextField
                    fullWidth
                    label="Описание *"
                    value={formFields.description}
                    onChange={(evt) => modifyField('description', evt.target.value)}
                    error={!!validationResult.errors.description}
                    helperText={validationResult.errors.description}
                    margin="normal"
                    multiline
                    rows={4}
                    placeholder="Опишите технологию и цели изучения..."
                    sx={inputStyles}
                />

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            value={formFields.category}
                            onChange={(evt) => modifyField('category', evt.target.value)}
                            label="Категория"
                            sx={inputStyles}
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
                            value={formFields.difficulty}
                            onChange={(evt) => modifyField('difficulty', evt.target.value)}
                            label="Сложность"
                            sx={inputStyles}
                        >
                            <MenuItem value="beginner">Начальный</MenuItem>
                            <MenuItem value="intermediate">Средний</MenuItem>
                            <MenuItem value="advanced">Продвинутый</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    fullWidth
                    label="Целевая дата"
                    type="date"
                    value={formFields.deadline}
                    onChange={(evt) => modifyField('deadline', evt.target.value)}
                    error={!!validationResult.errors.deadline}
                    helperText={validationResult.errors.deadline}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={inputStyles}
                />

                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                        📚 Материалы для изучения
                    </Typography>
                    {formFields.resources.map((resourceUrl, idx) => (
                        <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'flex-start' }}>
                            <TextField
                                fullWidth
                                type="url"
                                value={resourceUrl}
                                onChange={(evt) => modifyResource(idx, evt.target.value)}
                                placeholder="https://..."
                                error={!!validationResult.errors[`resource_${idx}`]}
                                helperText={validationResult.errors[`resource_${idx}`]}
                                size="small"
                                sx={inputStyles}
                            />
                            {formFields.resources.length > 1 && (
                                <IconButton
                                    onClick={() => deleteResourceField(idx)}
                                    sx={{ 
                                        color: '#ef4444',
                                        '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                    <Button
                        startIcon={<AddIcon />}
                        onClick={appendResourceField}
                        sx={{ 
                            mt: 1,
                            color: '#7c3aed',
                            borderColor: '#7c3aed',
                            '&:hover': {
                                borderColor: '#6d28d9',
                                bgcolor: 'rgba(124, 58, 237, 0.08)',
                            },
                        }}
                        variant="outlined"
                    >
                        Добавить ссылку
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!validationResult.isValid}
                        size="large"
                        sx={{
                            px: 4,
                            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #6d28d9, #db2777)',
                            },
                            '&.Mui-disabled': {
                                background: '#e5e7eb',
                            },
                        }}
                    >
                        Сохранить
                    </Button>
                    <Button
                        type="button"
                        onClick={onCancel}
                        variant="outlined"
                        size="large"
                        sx={{
                            px: 4,
                            borderColor: 'divider',
                            '&:hover': {
                                borderColor: '#7c3aed',
                            },
                        }}
                    >
                        Отменить
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default TechnologyForm;