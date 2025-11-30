import { useCallback, useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

// Начальный набор данных
const defaultDataset = [
    { 
        id: 1, 
        title: 'HTML CSS', 
        description: 'Изучение базовых веб технологий', 
        status: 'completed',
        notes: '',
        category: 'frontend'
    },
    { 
        id: 2, 
        title: 'React', 
        description: 'Фреймворк для веб разработки', 
        status: 'completed',
        notes: '',
        category: 'frontend'
    },
    { 
        id: 3, 
        title: 'Redux', 
        description: 'Не localStorage', 
        status: 'completed',
        notes: '',
        category: 'frontend'
    },
    { 
        id: 4, 
        title: 'Vue', 
        description: 'Ещё один фреймворк', 
        status: 'completed',
        notes: '',
        category: 'frontend'
    },
    { 
        id: 5, 
        title: 'Angular', 
        description: 'и ещё один', 
        status: 'in-progress',
        notes: '',
        category: 'frontend'
    },
    { 
        id: 6, 
        title: 'docker, ci/cd, k8s', 
        description: 'devops штучки', 
        status: 'not-started',
        notes: '',
        category: 'devops'
    }
];

// Порядок статусов для циклического переключения
const STATUS_SEQUENCE = ['not-started', 'in-progress', 'completed'];

function useTechnologies() {
    const [dataCollection, persistData] = useLocalStorage('technologies', defaultDataset);

    // Изменение статуса записи
    const modifyItemStatus = useCallback((itemId, newStatusValue) => {
        persistData(currentData =>
            currentData.map(entry =>
                entry.id === itemId ? { ...entry, status: newStatusValue } : entry
            )
        );
    }, [persistData]);

    // Циклическое переключение статуса
    const rotateItemStatus = useCallback((itemId) => {
        persistData(currentData =>
            currentData.map(entry => {
                if (entry.id === itemId) {
                    const currentPosition = STATUS_SEQUENCE.indexOf(entry.status);
                    const nextPosition = (currentPosition + 1) % STATUS_SEQUENCE.length;
                    return { ...entry, status: STATUS_SEQUENCE[nextPosition] };
                }
                return entry;
            })
        );
    }, [persistData]);

    // Обновление заметок
    const modifyItemNotes = useCallback((itemId, notesContent) => {
        persistData(currentData =>
            currentData.map(entry =>
                entry.id === itemId ? { ...entry, notes: notesContent } : entry
            )
        );
    }, [persistData]);

    // Пометить все как завершённые
    const completeAllItems = useCallback(() => {
        persistData(currentData =>
            currentData.map(entry => ({ ...entry, status: 'completed' }))
        );
    }, [persistData]);

    // Сброс всех статусов
    const resetAllItemStatuses = useCallback(() => {
        persistData(currentData =>
            currentData.map(entry => ({ ...entry, status: 'not-started' }))
        );
    }, [persistData]);

    // Вычисление прогресса
    const progressPercentage = useMemo(() => {
        if (dataCollection.length === 0) return 0;
        const completedCount = dataCollection.filter(entry => entry.status === 'completed').length;
        return Math.round((completedCount / dataCollection.length) * 100);
    }, [dataCollection]);

    return {
        technologies: dataCollection,
        setTechnologies: persistData,
        updateStatus: modifyItemStatus,
        cycleStatus: rotateItemStatus,
        updateNotes: modifyItemNotes,
        markAllCompleted: completeAllItems,
        resetAllStatuses: resetAllItemStatuses,
        progress: progressPercentage
    };
}

export default useTechnologies;