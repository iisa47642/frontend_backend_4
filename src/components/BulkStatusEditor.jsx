// src/components/BulkStatusEditor.jsx
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useTechnologies from '../hooks/useTechnologies';

function BulkStatusEditor() {
    const { technologies, setTechnologies } = useTechnologies();
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [targetStatus, setTargetStatus] = useState('in-progress');

    const handleItemToggle = (itemId) => {
        const updatedSet = new Set(checkedItems);
        if (updatedSet.has(itemId)) {
            updatedSet.delete(itemId);
        } else {
            updatedSet.add(itemId);
        }
        setCheckedItems(updatedSet);
    };

    const markAllItems = () => {
        const allIds = new Set(technologies.map(item => item.id));
        setCheckedItems(allIds);
    };

    const clearAllChecks = () => {
        setCheckedItems(new Set());
    };

    const executeStatusUpdate = () => {
        if (checkedItems.size === 0) {
            alert('Выберите хотя бы одну запись');
            return;
        }

        const modifiedList = technologies.map(item =>
            checkedItems.has(item.id) ? { ...item, status: targetStatus } : item
        );

        setTechnologies(modifiedList);
        setCheckedItems(new Set());
        alert(`✅ Обновлено ${checkedItems.size} записей`);
    };

    const statusTranslations = {
        'not-started': 'Ожидает',
        'in-progress': 'Изучаю',
        'completed': 'Освоено'
    };

    const getStatusChipStyle = (status) => {
        const styles = {
            'completed': { bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
            'in-progress': { bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
            'not-started': { bgcolor: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' },
        };
        return styles[status] || styles['not-started'];
    };

    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 4, 
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                ⚡ Массовое редактирование
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3 }}>
                <Button 
                    variant="outlined" 
                    onClick={markAllItems}
                    sx={{
                        borderColor: '#7c3aed',
                        color: '#7c3aed',
                        '&:hover': {
                            borderColor: '#6d28d9',
                            bgcolor: 'rgba(124, 58, 237, 0.08)',
                        },
                    }}
                >
                    Выбрать все
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={clearAllChecks}
                    sx={{
                        borderColor: 'divider',
                        '&:hover': {
                            borderColor: '#7c3aed',
                        },
                    }}
                >
                    Сбросить
                </Button>

                <FormControl sx={{ minWidth: 200, ml: 'auto' }}>
                    <InputLabel>Новый статус</InputLabel>
                    <Select
                        value={targetStatus}
                        onChange={(evt) => setTargetStatus(evt.target.value)}
                        label="Новый статус"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'divider',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#7c3aed',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#7c3aed',
                            },
                        }}
                    >
                        {Object.entries(statusTranslations).map(([key, label]) => (
                            <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={executeStatusUpdate}
                    disabled={checkedItems.size === 0}
                    startIcon={<CheckCircleIcon />}
                    sx={{
                        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #6d28d9, #db2777)',
                        },
                        '&.Mui-disabled': {
                            background: '#e5e7eb',
                        },
                    }}
                >
                    Применить ({checkedItems.size})
                </Button>
            </Box>

            <List 
                sx={{ 
                    maxHeight: 350, 
                    overflow: 'auto', 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                }}
            >
                {technologies.map(item => (
                    <ListItem
                        key={item.id}
                        dense
                        sx={{
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:last-child': { borderBottom: 'none' },
                            '&:hover': { 
                                bgcolor: 'rgba(124, 58, 237, 0.04)',
                            },
                            ...(checkedItems.has(item.id) && {
                                bgcolor: 'rgba(124, 58, 237, 0.08)',
                            }),
                        }}
                        onClick={() => handleItemToggle(item.id)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checkedItems.has(item.id)}
                                tabIndex={-1}
                                disableRipple
                                sx={{
                                    '&.Mui-checked': {
                                        color: '#7c3aed',
                                    },
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ fontWeight: 500 }}>
                                    {item.title}
                                </Typography>
                            }
                            secondary={
                                <Chip
                                    label={statusTranslations[item.status]}
                                    size="small"
                                    sx={{ 
                                        mt: 0.5,
                                        fontWeight: 500,
                                        ...getStatusChipStyle(item.status),
                                    }}
                                />
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default BulkStatusEditor;