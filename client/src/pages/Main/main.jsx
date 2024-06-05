import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import LeftSidebar from '../../components/LeftSideBar/leftside';
import RightSidebar from '../../components/RightSideBar/rightside';

const Main = ({ isLoggedIn, handleLogout }) => {
    return (
        <div className="main-container">
            <LeftSidebar />
            <RightSidebar />
            <h1>점메추좀 ㅎㅎ</h1>
            <div className="content-container">
                <div className="image-wrapper">
                    
                    <img src="../../../image/lunch.png" alt="lunch" style={{ width: '50%' }} />
                </div>
            </div>
            <div className="buttons-container">
                {isLoggedIn ? (
                    <>
                        <Link to="/menu">룰렛 돌리기</Link>
                        <Link to="/mypage">마이페이지</Link>
                        
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/register">회원가입</Link>
                        <Link to="/login">로그인</Link>
                    </>
                )}
            </div>
        </div>
    );
}
export default Main;
