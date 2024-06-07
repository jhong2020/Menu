import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './pages/Main/main';
import Menu from './pages/Menu/menu';
import Roulette from './pages/Roulette/Roulette';
import Register from './pages/Register/register';
import Login from './pages/Login/login';
import Mypage from './pages/Mypage/mypage';
import Nav from './components/Navbar/nav';
import Map from './components/Map/Map';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// app.js
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL+'/api/auth/check', { withCredentials: true });
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
                setUser(null);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const handleLogout = async () => {
        try {
            await axios.post(process.env.REACT_APP_API_URL+'/api/auth/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Router>
            <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div>
                <Routes>
                    <Route path="/" element={<Main isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
                    <Route path="/menu" element={isLoggedIn ? <Menu /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                    <Route path="/roulette" element={<Roulette/>}/>
                    <Route path="/mypage" element={isLoggedIn ? <Mypage user={user} /> : <Navigate to="/login" />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/map" element={<Map />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
