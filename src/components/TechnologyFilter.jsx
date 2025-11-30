import './TechnologyFilter.css';

function TechnologyFilter({ activeFilter, onFilterChange }) {
    const filters = [
        { key: 'all', label: 'Все технологии' },
        { key: 'not-started', label: 'Не начатые' },
        { key: 'in-progress', label: 'В процессе' },
        { key: 'completed', label: 'Выполненные' }
    ];

    return (
        <div className="technology-filter">
            <h3>Фильтр по статусу</h3>
            <div className="filter-buttons">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        onClick={() => onFilterChange(filter.key)}
                        className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TechnologyFilter;