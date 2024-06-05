import React from 'react';
import './rightside.css';
// import movingImage from '../../../public/image/sidebar.gif'; // 경로에 맞게 수정하세요

const RightSidebar = () => {
    return (
        <div className="right-sidebar">
            <img src="/image/sidebar.gif" alt="Moving Animation" className="moving-image" /> {/* 절대 경로를 사용합니다 */}
            <img src="/image/sidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/sidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/sidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/sidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/sidebar.gif" alt="Moving Animation" className="moving-image" />
            <img src="/image/sidebar.gif" alt="Moving Animation" className="moving-image" />
        </div>
    );
}

export default RightSidebar;
