import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    // Расчет статистики
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    
    // Расчет процента выполнения
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-header">
            <div className="progress-stats">
                <div className="stat-item">
                    <span className="stat-number">{total}</span>
                    <span className="stat-label">Всего технологий</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number completed">{completed}</span>
                    <span className="stat-label">Изучено</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number in-progress">{inProgress}</span>
                    <span className="stat-label">В процессе</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number not-started">{notStarted}</span>
                    <span className="stat-label">Не начато</span>
                </div>
            </div>
            
            <div className="progress-bar-container">
                <div className="progress-info">
                    <span>Общий прогресс: {completionPercentage}%</span>
                    <span>{completed} из {total}</span>
                </div>
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;