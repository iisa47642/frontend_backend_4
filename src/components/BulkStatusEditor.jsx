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
import useTechnologies from '../hooks/useTechnologies';

function BulkStatusEditor() {
    const { technologies, setTechnologies } = useTechnologies();
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [newStatus, setNewStatus] = useState('in-progress');

    const toggleSelect = (id) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const selectAll = () => {
        const allIds = new Set(technologies.map(t => t.id));
        setSelectedIds(allIds);
    };

    const clearSelection = () => {
        setSelectedIds(new Set());
    };

    const applyBulkUpdate = () => {
        if (selectedIds.size === 0) {
            alert('Выберите хотя бы одну технологию');
            return;
        }

        const updated = technologies.map(t =>
            selectedIds.has(t.id) ? { ...t, status: newStatus } : t
        );

        setTechnologies(updated);
        setSelectedIds(new Set());
        alert(`Статус обновлён для ${selectedIds.size} технологий`);
    };

    const statusLabels = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Изучено'
    };

    return (
        <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Массовое редактирование статусов
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3 }}>
                <Button variant="outlined" onClick={selectAll}>
                    Выбрать все
                </Button>
                <Button variant="outlined" onClick={clearSelection}>
                    Снять выбор
                </Button>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Новый статус</InputLabel>
                    <Select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        label="Новый статус"
                    >
                        {Object.entries(statusLabels).map(([value, label]) => (
                            <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={applyBulkUpdate}
                    disabled={selectedIds.size === 0}
                    sx={{ ml: 'auto' }}
                >
                    Обновить статус ({selectedIds.size})
                </Button>
            </Box>

            <List sx={{ maxHeight: 300, overflow: 'auto', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                {technologies.map(tech => (
                    <ListItem
                        key={tech.id}
                        dense
                        button
                        onClick={() => toggleSelect(tech.id)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedIds.has(tech.id)}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={tech.title}
                            secondary={
                                <Chip
                                    label={statusLabels[tech.status]}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mt: 0.5 }}
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