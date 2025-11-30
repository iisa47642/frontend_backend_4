import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
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

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    const updateStatus = useCallback((techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    }, [setTechnologies]);

    // 🔄 Новая функция для циклического изменения статуса
    const cycleStatus = useCallback((techId) => {
        setTechnologies(prev =>
            prev.map(tech => {
                if (tech.id === techId) {
                    const statusOrder = ['not-started', 'in-progress', 'completed'];
                    const currentIndex = statusOrder.indexOf(tech.status);
                    const nextIndex = (currentIndex + 1) % statusOrder.length;
                    return { ...tech, status: statusOrder[nextIndex] };
                }
                return tech;
            })
        );
    }, [setTechnologies]);

    const updateNotes = useCallback((techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    }, [setTechnologies]);

    const markAllCompleted = useCallback(() => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'completed' }))
        );
    }, [setTechnologies]);

    const resetAllStatuses = useCallback(() => {
        setTechnologies(prev =>
            prev.map(tech => ({ ...tech, status: 'not-started' }))
        );
    }, [setTechnologies]);

    const calculateProgress = useCallback(() => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    }, [technologies]);

    return {
        technologies,
        setTechnologies,
        updateStatus,
        cycleStatus, // 🔄 Экспортируем новую функцию
        updateNotes,
        markAllCompleted,
        resetAllStatuses,
        progress: calculateProgress()
    };
}

export default useTechnologies;