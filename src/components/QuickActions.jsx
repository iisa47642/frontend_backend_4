import { useState } from 'react';
import Modal from './Modal';
import './QuickActions.css';

function QuickActions({ 
    onMarkAllCompleted, 
    onResetAllStatuses, 
    technologies 
}) {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
        
        // Создаем blob и скачиваем файл
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech-tracker-export-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setShowExportModal(true);
    };

    const filteredTechnologies = technologies.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="actions-buttons">
                <button 
                    className="action-btn completed"
                    onClick={onMarkAllCompleted}
                >
                    ✅ Отметить все как выполненные
                </button>
                <button 
                    className="action-btn reset"
                    onClick={onResetAllStatuses}
                >
                    🔄 Сбросить все статусы
                </button>
                <button 
                    className="action-btn search"
                    onClick={() => setShowSearchModal(true)}
                >
                    🔍 Поиск технологий
                </button>
                <button 
                    className="action-btn export"
                    onClick={handleExport}
                >
                    📤 Экспорт данных
                </button>
            </div>

            {/* Модальное окно экспорта */}
            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных"
            >
                <p>Данные успешно экспортированы!</p>
                <p>Файл был скачан автоматически.</p>
                <button 
                    className="modal-btn"
                    onClick={() => setShowExportModal(false)}
                >
                    Закрыть
                </button>
            </Modal>

            {/* Модальное окно поиска */}
            <Modal
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                title="Поиск технологий"
            >
                <div className="search-modal-content">
                    <input
                        type="text"
                        placeholder="Введите название или описание..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <div className="search-results">
                        <p>Найдено: {filteredTechnologies.length} технологий</p>
                        {filteredTechnologies.length > 0 ? (
                            <div className="results-list">
                                {filteredTechnologies.map(tech => (
                                    <div key={tech.id} className="search-result-item">
                                        <strong>{tech.title}</strong>
                                        <span className={`status-badge status-${tech.status}`}>
                                            {getStatusText(tech.status)}
                                        </span>
                                        <p>{tech.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Технологии не найдены</p>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

function getStatusText(status) {
    const statusMap = {
        'completed': 'Изучено',
        'in-progress': 'В процессе',
        'not-started': 'Не начато'
    };
    return statusMap[status] || status;
}

export default QuickActions;