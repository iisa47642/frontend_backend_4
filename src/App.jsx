// src/App.jsx
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomThemeProvider } from './context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';

// Подключение модулей
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProductSearch from './components/ProductSearch';
import EditTechnology from './pages/EditTechnology';

// Вспомогательная функция для работы с localStorage
const readFromStorage = (key, fallback) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : fallback;
};

const writeToStorage = (key, value) => {
    localStorage.setItem(key, value);
};

const removeFromStorage = (key) => {
    localStorage.removeItem(key);
};

function App() {
    // Состояние авторизации
    const [authStatus, setAuthStatus] = useState(() => 
        readFromStorage('isLoggedIn', 'false') === 'true'
    );
    const [currentUser, setCurrentUser] = useState(() => 
        readFromStorage('username', '')
    );

    // Обработчик успешной авторизации
    const handleSuccessfulLogin = (loginName) => {
        setAuthStatus(true);
        setCurrentUser(loginName);
        writeToStorage('isLoggedIn', 'true');
        writeToStorage('username', loginName);
    };

    // Обработчик выхода из системы
    const handleUserLogout = () => {
        setAuthStatus(false);
        setCurrentUser('');
        removeFromStorage('isLoggedIn');
        removeFromStorage('username');
    };

    return (
        <CustomThemeProvider>
            <CssBaseline />
            <Router basename='frontend_and_backend_practice_react'>
                <Navigation 
                    isLoggedIn={authStatus} 
                    username={currentUser} 
                    onLogout={handleUserLogout} 
                />
                
                <main className="app-container">
                    <Routes>
                        {/* Публичные маршруты */}
                        <Route path="/" element={<Home />} />
                        <Route path="/technologies" element={<TechnologyList />} />
                        <Route path="/technology/:id" element={<TechnologyDetail />} />
                        <Route path="/add-technology" element={<AddTechnology />} />
                        <Route path="/login" element={<Login onLogin={handleSuccessfulLogin} />} />
                        <Route path="/search" element={<ProductSearch />} />
                        <Route path="/edit-technology/:id" element={<EditTechnology />} />

                        {/* Страницы требующие авторизации */}
                        <Route
                            path="/statistics"
                            element={
                                <ProtectedRoute isLoggedIn={authStatus}>
                                    <Statistics />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute isLoggedIn={authStatus}>
                                    <Settings setIsLoggedIn={setAuthStatus} />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </Router>
        </CustomThemeProvider>
    );
}

export default App;