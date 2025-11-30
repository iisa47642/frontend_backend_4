// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

const storageEventName = 'custom-storage-update';

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (!item) return initialValue;

            const parsed = JSON.parse(item);

            if (Array.isArray(parsed)) {
                return parsed;
            }

            if (parsed && typeof parsed === "object" && Array.isArray(parsed.technologies)) {
                console.warn(`[useLocalStorage] Обнаружен объект экспорта. Использую только technologies[].`);
                return parsed.technologies;
            }

            console.warn(`[useLocalStorage] Неверный формат данных. Сбрасываю в initialValue.`);
            return initialValue;
        } catch (err) {
            console.error(`Ошибка чтения localStorage[${key}]:`, err);
            return initialValue;
        }
    });

    // Функция для обновления значения и оповещения других
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));

            // 🔥 Генерируем событие для других компонентов
            window.dispatchEvent(new Event(storageEventName));
        } catch (err) {
            console.error(`Ошибка записи localStorage[${key}]:`, err);
        }
    };

    // 🔥 Слушаем собственные события обновления
    useEffect(() => {
        const handleStorageUpdate = () => {
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    const parsed = JSON.parse(item);
                    let data;
                    if (Array.isArray(parsed)) {
                        data = parsed;
                    } else if (parsed && typeof parsed === "object" && Array.isArray(parsed.technologies)) {
                        data = parsed.technologies;
                    } else {
                        data = initialValue;
                    }
                    setStoredValue(data);
                }
            } catch (err) {
                console.error(`Ошибка при обработке обновления localStorage[${key}]:`, err);
            }
        };

        window.addEventListener(storageEventName, handleStorageUpdate);
        return () => window.removeEventListener(storageEventName, handleStorageUpdate);
    }, [key, initialValue]);

    return [storedValue, setValue];
}

export default useLocalStorage;