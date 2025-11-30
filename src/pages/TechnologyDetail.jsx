import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProgressBar from '../components/ProgressBar';

function TechnologyDetail() {
    const { techId } = useParams();
    const navigate = useNavigate();
    const [technology, setTechnology] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const technologies = JSON.parse(saved);
            const tech = technologies.find(t => t.id === parseInt(techId));
            setTechnology(tech);
        }
    }, [techId]);

    const updateStatus = (newStatus) => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const technologies = JSON.parse(saved);
            const updated = technologies.map(tech =>
                tech.id === parseInt(techId) ? { ...tech, status: newStatus } : tech
            );
            localStorage.setItem('technologies', JSON.stringify(updated));
            setTechnology({ ...technology, status: newStatus });
        }
    };

    const updateNotes = (newNotes) => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const technologies = JSON.parse(saved);
            const updated = technologies.map(tech =>
                tech.id === parseInt(techId) ? { ...tech, notes: newNotes } : tech
            );
            localStorage.setItem('technologies', JSON.stringify(updated));
            setTechnology({ ...technology, notes: newNotes });
        }
    };

    if (!technology) {
        return (
            <div className="page">
                <h1>Технология не найдена</h1>
                <p>Технология с ID {techId} не существует.</p>
                <Link to="/technologies" className="btn">
                    ← Назад к списку
                </Link>
            </div>
        );
    }

    const getStatusText = (status) => {
        const statusMap = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе',
            'completed': 'Выполнено'
        };
        return statusMap[status] || status;
    };

    const getStatusProgress = (status) => {
        const progressMap = {
            'not-started': 0,
            'in-progress': 50,
            'completed': 100
        };
        return progressMap[status] || 0;
    };

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <h1>{technology.title}</h1>
            </div>

            <div className="technology-detail">
                <div className="detail-section">
                    <h3>Описание</h3>
                    <p>{technology.description}</p>
                </div>

                <div className="detail-section">
                    <h3>Категория</h3>
                    <span className={`category-badge category-${technology.category}`}>
            {technology.category === 'frontend' ? 'Фронтенд' : 'Бэкенд'}
          </span>
                </div>

                <div className="detail-section">
                    <h3>Прогресс изучения</h3>
                    <ProgressBar
                        progress={getStatusProgress(technology.status)}
                        label={getStatusText(technology.status)}
                        color={
                            technology.status === 'completed' ? '#4CAF50' :
                                technology.status === 'in-progress' ? '#FF9800' : '#F44336'
                        }
                        height={20}
                        animated={true}
                    />

                    <div className="status-buttons">
                        <button
                            onClick={() => updateStatus('not-started')}
                            className={technology.status === 'not-started' ? 'active' : ''}
                        >
                            Не начато
                        </button>
                        <button
                            onClick={() => updateStatus('in-progress')}
                            className={technology.status === 'in-progress' ? 'active' : ''}
                        >
                            В процессе
                        </button>
                        <button
                            onClick={() => updateStatus('completed')}
                            className={technology.status === 'completed' ? 'active' : ''}
                        >
                            Завершено
                        </button>
                    </div>
                </div>

                <div className="detail-section">
                    <h3>Мои заметки</h3>
                    <textarea
                        value={technology.notes || ''}
                        onChange={(e) => updateNotes(e.target.value)}
                        placeholder="Записывайте сюда важные моменты..."
                        rows="4"
                        className="notes-textarea"
                    />
                    <div className="notes-hint">
                        {technology.notes ? `Заметка сохранена (${technology.notes.length} символов)` : 'Добавьте заметку'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnologyDetail;