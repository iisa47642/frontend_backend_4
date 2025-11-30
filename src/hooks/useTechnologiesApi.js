// src/hooks/useTechnologiesApi.js
import { useState, useEffect } from 'react';

// Возвращаем только readonly-данные из API
function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTechnologies = async () => {
        try {
            setLoading(true);
            setError(null);

            // 🔥 Подставь свой API или используй mock
            // Пример: https://my-json-server.typicode.com/...
            const response = await fetch('https://jsonplaceholder.typicode.com/users'); 

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            console.log("data ", data)
            // Преобразуем под наш формат
            const formatted = data.map(item => ({
                id: item.id,
                title: item.name,
                description: `Email: ${item.email}, Город: ${item.address.city}`,
                status: 'not-started',
                notes: '',
                category: 'api-imported'
            }));

            setTechnologies(formatted);
        } catch (err) {
            setError('Не удалось загрузить технологии из API');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Загружаем только если нужно (например, в компоненте импорта)
        // fetchTechnologies(); // ← не вызываем автоматически
    }, []);

    return { technologies, loading, error, refetch: fetchTechnologies };
}

export default useTechnologiesApi;