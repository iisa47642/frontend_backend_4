import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import TechnologyFilter from '../components/TechnologyFilter';

function TechnologyList() {
    const [technologies, setTechnologies] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Загружаем технологии из localStorage
    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            setTechnologies(JSON.parse(saved));
        }
    }, []);

    // Функция для изменения статуса технологии
    const updateStatus = (techId, newStatus) => {
        const updated = technologies.map(tech =>
            tech.id === techId ? { ...tech, status: newStatus } : tech
        );
        setTechnologies(updated);
        localStorage.setItem('technologies', JSON.stringify(updated));
    };

    // Функция для обновления заметок
    const updateNotes = (techId, newNotes) => {
        const updated = technologies.map(tech =>
            tech.id === techId ? { ...tech, notes: newNotes } : tech
        );
        setTechnologies(updated);
        localStorage.setItem('technologies', JSON.stringify(updated));
    };

    // Функции для быстрых действий
    const handleMarkAllCompleted = () => {
        const updated = technologies.map(tech => ({ ...tech, status: 'completed' }));
        setTechnologies(updated);
        localStorage.setItem('technologies', JSON.stringify(updated));
    };

    const handleResetAll = () => {
        const updated = technologies.map(tech => ({ ...tech, status: 'not-started' }));
        setTechnologies(updated);
        localStorage.setItem('technologies', JSON.stringify(updated));
    };

    // Фильтрация технологий
    const filteredByStatus = technologies.filter(tech => {
        if (activeFilter === 'all') return true;
        return tech.status === activeFilter;
    });

    const filteredTechnologies = filteredByStatus.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="page">
            <ProgressHeader technologies={technologies} />

            <QuickActions
                technologies={technologies}
                onMarkAllCompleted={handleMarkAllCompleted}
                onResetAll={handleResetAll}
            />

            {/* Поле поиска */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span>Найдено: {filteredTechnologies.length}</span>
            </div>

            <TechnologyFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            <h2>Дорожная карта изучения</h2>
            <p>Нажмите на карточку, чтобы изменить статус</p>

            {filteredTechnologies.map(tech => (
                <TechnologyCard
                    key={tech.id}
                    id={tech.id}
                    title={tech.title}
                    description={tech.description}
                    status={tech.status}
                    notes={tech.notes}
                    category={tech.category}
                    onStatusChange={updateStatus}
                    onNotesChange={updateNotes}
                />
            ))}

            {technologies.length === 0 && (
                <div className="empty-state">
                    <p>Технологий пока нет.</p>
                    <Link to="/add-technology" className="btn btn-primary">
                        Добавить первую технологию
                    </Link>
                </div>
            )}
        </div>
    );
}

export default TechnologyList;