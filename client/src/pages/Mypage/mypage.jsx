import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mypage.css';
import RightSidebar from '../../components/RightSideBar/rightside';
import LeftSidebar from '../../components/LeftSideBar/leftside';

const Mypage = ({ user }) => {
    const [userInfo, setUserInfo] = useState(user);
    const [isEditing, setIsEditing] = useState({
        name: false,
        phone: false,
        email: false,
        introduction: false,
        password: false
    });
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/user/${user._id}`, { withCredentials: true });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [user._id]);

    const handleEditToggle = (field) => {
        setIsEditing({ ...isEditing, [field]: !isEditing[field] });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSaveChanges = async () => {
        try {
            const updateData = {
                userId: userInfo._id,
                name: userInfo.name,
                phone: userInfo.phone,
                email: userInfo.email,
                introduction: userInfo.introduction
            };

            if (password) {
                updateData.password = password;
            }

            const response = await axios.put('http://localhost:5000/api/auth/update-profile', updateData, { withCredentials: true });
            setUserInfo(response.data);
            setPassword('');
            setIsEditing({
                name: false,
                phone: false,
                email: false,
                introduction: false,
                password: false
            });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="mypage-container">
            <LeftSidebar />
            <RightSidebar />
            <h1>My Page</h1>
            <div className="mypage-content">
                <table>
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>
                                {isEditing.name ? (
                                    <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
                                ) : (
                                    userInfo.name
                                )}
                                <button onClick={() => handleEditToggle('name')}>변경</button>
                            </td>
                        </tr>
                        <tr>
                            <td>연락처</td>
                            <td>
                                {isEditing.phone ? (
                                    <input type="text" name="phone" value={userInfo.phone} onChange={handleChange} />
                                ) : (
                                    userInfo.phone
                                )}
                                <button onClick={() => handleEditToggle('phone')}>변경</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                                {isEditing.email ? (
                                    <input type="text" name="email" value={userInfo.email} onChange={handleChange} />
                                ) : (
                                    userInfo.email
                                )}
                                <button onClick={() => handleEditToggle('email')}>변경</button>
                            </td>
                        </tr>
                        <tr>
                            <td>소개</td>
                            <td>
                                {isEditing.introduction ? (
                                    <input type="text" name="introduction" value={userInfo.introduction} onChange={handleChange} />
                                ) : (
                                    userInfo.introduction
                                )}
                                <button onClick={() => handleEditToggle('introduction')}>변경</button>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                {isEditing.password ? (
                                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                                ) : (
                                    '••••••••'
                                )}
                                <button onClick={() => handleEditToggle('password')}>변경</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleSaveChanges} className="save-button">변경사항을 확정하기</button>
            </div>
        </div>
    );
};

export default Mypage;
