import './FilterTabs.css';

function FilterTabs({ activeFilter, onFilterChange, technologies }) {
    const filters = [
        { key: 'all', label: 'Все', count: technologies.length },
        { key: 'completed', label: 'Изучено', count: technologies.filter(t => t.status === 'completed').length },
        { key: 'in-progress', label: 'В процессе', count: technologies.filter(t => t.status === 'in-progress').length },
        { key: 'not-started', label: 'Не начато', count: technologies.filter(t => t.status === 'not-started').length }
    ];

    return (
        <div className="filter-tabs">
            <h3>Фильтр по статусу</h3>
            <div className="tabs">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        className={`tab ${activeFilter === filter.key ? 'active' : ''}`}
                        onClick={() => onFilterChange(filter.key)}
                    >
                        {filter.label}
                        <span className="tab-count">{filter.count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterTabs;