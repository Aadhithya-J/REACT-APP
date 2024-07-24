import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import QuizPage from './components/QuizPage';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate('/quiz');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/quiz" element={isAuthenticated ? <QuizPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />} />
                <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
            </Routes>
        </div>
    );
};

export default App;
