import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅 추가
import './login.css';
import RightSidebar from '../../components/RightSideBar/rightside';
import LeftSidebar from '../../components/LeftSideBar/leftside';

const Login = ({ handleLogin }) => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();  // useNavigate 훅 초기화

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', form, { withCredentials: true });
            handleLogin(response.data.user);
            navigate('/');  // 로그인 성공 후 메인페이지로 리디렉션
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <LeftSidebar />
            <RightSidebar />
            <div className="container">
                <div className="form-box">
                    <h4>로그인</h4>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="아이디" 
                            value={form.username} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="비밀번호" 
                            value={form.password} 
                            onChange={handleChange} 
                        />
                        <button type="submit">로그인</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
