// src/components/RoadmapImporter.jsx
import { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';

function RoadmapImporter() {
    const { technologies: localTechs, setTechnologies } = useTechnologies();
    const [importing, setImporting] = useState(false);

    const importFromApi = async () => {
        setImporting(true);
        try {
            // 🔥 Делаем запрос напрямую — без кастомного хука
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const users = await response.json();

            // Преобразуем под формат технологии
            const apiTechnologies = users.map(user => ({
                id: user.id,
                title: user.name,
                description: `Email: ${user.email} | Город: ${user.address.city}`,
                status: 'not-started',
                notes: '',
                category: 'api'
            }));

            if (apiTechnologies.length === 0) {
                alert('API вернул пустой список.');
                return;
            }

            // Фильтруем дубли
            const existingIds = new Set(localTechs.map(t => t.id));
            const newTechs = apiTechnologies.filter(t => !existingIds.has(t.id));

            if (newTechs.length === 0) {
                alert('Все технологии уже есть в списке.');
                return;
            }

            // Сохраняем в localStorage через useTechnologies
            setTechnologies(prev => [...prev, ...newTechs]);
            alert(`Успешно импортировано ${newTechs.length} технологий!`);

        } catch (err) {
            console.error('Ошибка импорта:', err);
            alert('Ошибка при импорте: ' + (err.message || 'неизвестная'));
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="roadmap-importer" style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>📥 Импорт технологий из API</h3>
            <button
                onClick={importFromApi}
                disabled={importing}
                style={{
                    padding: '8px 16px',
                    backgroundColor: importing ? '#ccc' : '#2ecc71',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: importing ? 'not-allowed' : 'pointer'
                }}
            >
                {importing ? 'Импорт...' : 'Загрузить из JSONPlaceholder'}
            </button>
        </div>
    );
}

export default RoadmapImporter;