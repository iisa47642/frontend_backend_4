import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect }) {
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="actions-buttons">
                <button onClick={onMarkAllCompleted} className="action-btn completed">
                    Отметить все как выполненные
                </button>
                <button onClick={onResetAll} className="action-btn reset">
                    Сбросить все статусы
                </button>
                <button onClick={onRandomSelect} className="action-btn random">
                    Случайный выбор следующей технологии
                </button>
            </div>
        </div>
    );
}

export default QuickActions;