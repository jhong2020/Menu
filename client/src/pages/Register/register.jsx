import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import RightSidebar from '../../components/RightSideBar/rightside';
import LeftSidebar from '../../components/LeftSideBar/leftside';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        introduction: ''
    });

    const [usernameChecked, setUsernameChecked] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const checkUsername = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL+'/api/auth/check-username', { username: form.username });
            console.log('Username check response:', response.data);
            if (response.data.available) {
                toast.success(response.data.message);
                setUsernameChecked(true);
            } else {
                toast.error(response.data.message);
                setUsernameChecked(false);
            }
        } catch (error) {
            console.error('Username check error:', error);
            toast.error(error.response?.data?.message || 'Username check failed');
            setUsernameChecked(false);
        }
    };

    const checkEmail = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL+'/api/auth/check-email', { email: form.email });
            console.log('Email check response:', response.data);
            if (response.data.available) {
                toast.success(response.data.message);
                setEmailChecked(true);
            } else {
                toast.error(response.data.message);
                setEmailChecked(false);
            }
        } catch (error) {
            console.error('Email check error:', error);
            toast.error(error.response?.data?.message || 'Email check failed');
            setEmailChecked(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.error('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!usernameChecked) {
            toast.error('사용자명 중복 확인을 해주세요.');
            return;
        }
        if (!emailChecked) {
            toast.error('이메일 중복 확인을 해주세요.');
            return;
        }
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL+'/api/auth/register', form);
            console.log('회원가입 정보:', response.data);
            toast.success('회원가입이 완료되었습니다!');
            navigate('/login');
        } catch (error) {
            toast.error('회원가입 오류: ' + (error.response ? error.response.data.message : error.message));
            console.error('회원가입 오류:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="register-container">
            <LeftSidebar />
            <RightSidebar />
            <h1>회원가입 양식</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td><input type="text" name="name" value={form.name} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>아이디</td>
                            <td>
                                <input type="text" name="username" value={form.username} onChange={handleChange} />
                                <button type="button" className="check-button" onClick={checkUsername}>중복확인</button>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <input type="password" name="password" value={form.password} onChange={handleChange} />
                                {/* <div className="password-note">*비밀번호는 문자, 숫자, 특수문자(~!@#$%^&*())의 조합 10 ~ 16자리로 입력이 가능합니다.</div> */}
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td><input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                                <input type="email" name="email" value={form.email} onChange={handleChange} />
                                <button type="button" className="check-button" onClick={checkEmail}>이메일 중복확인</button>
                            </td>
                        </tr>
                        <tr>
                            <td>연락처</td>
                            <td><input type="text" name="phone" value={form.phone} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>소개</td>
                            <td><input type="text" name="introduction" value={form.introduction} onChange={handleChange} /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-group">
                    <button type="button" className="cancel-button" onClick={handleCancel}>가입취소</button>
                    <button type="submit" className="submit-button">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
