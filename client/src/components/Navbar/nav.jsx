import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">메인화면으로</Link>
                </li>
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/menu">룰렛 돌리기</Link>
                        </li>
                        <li>
                            <Link to="/mypage">마이페이지</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>로그아웃</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
