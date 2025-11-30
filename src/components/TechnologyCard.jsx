import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
    const { id, title, description, status, notes } = technology;

    const handleCardClick = () => {
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];
        onStatusChange(id, nextStatus);
    };

    const handleNotesChange = (e) => {
        onNotesChange(id, e.target.value);
    };

    return (
        <div 
            className={`technology-card status-${status}`}
            onClick={handleCardClick}
        >
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className={`status-badge status-${status}`}>
                    {getStatusText(status)}
                </span>
            </div>
            <p className="card-description">{description}</p>
            
            <div className="notes-section">
                <h4>Мои заметки:</h4>
                <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Записывайте сюда важные моменты..."
                    rows="3"
                    className="notes-textarea"
                />
                <div className="notes-hint">
                    {notes.length > 0 
                        ? `Заметка сохранена (${notes.length} символов)`
                        : 'Добавьте заметку'
                    }
                </div>
            </div>

            <div className="card-footer">
                <div className="progress-indicator">
                    {renderStatusIcon(status)}
                </div>
                <span className="click-hint">Нажмите для смены статуса</span>
            </div>
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

function renderStatusIcon(status) {
    switch(status) {
        case 'completed':
            return '✅';
        case 'in-progress':
            return '⏳';
        case 'not-started':
            return '⭕';
        default:
            return '❓';
    }
}

export default TechnologyCard;