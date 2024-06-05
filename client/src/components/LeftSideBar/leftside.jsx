import React from 'react';
import './leftside.css';

const LeftSidebar = () => {
    return (
        <div className="left-sidebar">
            <img src="/image/leftsidebar.gif" alt="Moving Animation" className="moving-image" /> {/* 절대 경로를 사용합니다 */}
            <img src="/image/leftsidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/leftsidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/leftsidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/leftsidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/leftsidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/leftsidebar.gif" alt="Moving Animation" className="moving-image" />
        </div>
    );
}

export default LeftSidebar;
