import { Link } from 'react-router-dom';
import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ id, title, description, status, notes, category, onStatusChange, onNotesChange }) {
    const handleCardClick = () => {
        const nextStatus =
            status === 'not-started' ? 'in-progress' :
                status === 'in-progress' ? 'completed' : 'not-started';

        onStatusChange(id, nextStatus);
    };

    const handleNotesClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className={`technology-card ${status}`}
            onClick={handleCardClick}
        >
            <div className="card-content">
                <div className="card-header">
                    <h3>
                        {title}
                        <span className={`category-badge category-${category}`}>
              {category === 'frontend' ? 'Фронтенд' : 'Бэкенд'}
            </span>
                    </h3>
                    <Link
                        to={`/technology/${id}`}
                        className="detail-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Подробнее →
                    </Link>
                </div>
                <p>{description}</p>
                <div className="status">
                    Статус: <span>{getStatusText(status)}</span>
                </div>
            </div>

            <div onClick={handleNotesClick}>
                <TechnologyNotes
                    notes={notes}
                    onNotesChange={onNotesChange}
                    techId={id}
                />
            </div>
        </div>
    );
}

function getStatusText(status) {
    const statusMap = {
        'not-started': 'Не начато',
        'in-progress': 'В процессе',
        'completed': 'Выполнено'
    };
    return statusMap[status] || status;
}

export default TechnologyCard;