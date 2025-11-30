import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTechnology() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'frontend',
        status: 'not-started',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const saved = localStorage.getItem('technologies');
        const technologies = saved ? JSON.parse(saved) : [];

        const newTechnology = {
            id: Date.now(), // Простой способ генерации ID
            ...formData
        };

        const updatedTechnologies = [...technologies, newTechnology];
        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));

        // Перенаправляем на страницу со списком
        navigate('/technologies');
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Добавить новую технологию</h1>
            </div>

            <form onSubmit={handleSubmit} className="technology-form">
                <div className="form-group">
                    <label htmlFor="title">Название технологии *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Например: React Hooks"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="Опишите, что нужно изучить..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Категория</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="frontend">Фронтенд</option>
                        <option value="backend">Бэкенд</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Начальный статус</label>
                    <div className="status-options">
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="not-started"
                                checked={formData.status === 'not-started'}
                                onChange={handleChange}
                            />
                            Не начато
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="in-progress"
                                checked={formData.status === 'in-progress'}
                                onChange={handleChange}
                            />
                            В процессе
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="completed"
                                checked={formData.status === 'completed'}
                                onChange={handleChange}
                            />
                            Выполнено
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Добавить технологию
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/technologies')}
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTechnology;