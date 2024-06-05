import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import Nav from '../../components/Navbar/nav';
import RightSidebar from '../../components/RightSideBar/rightside';
import LeftSidebar from '../../components/LeftSideBar/leftside';

const Menu = () => {
    const [menus, setMenus] = useState([]);
    const [selectedOption, setSelectedOption] = useState({
        type: '',
        cuisine: '',
        occasion: ''
    });
    const [randomImage, setRandomImage] = useState(null);
    const [recommendedMenu, setRecommendedMenu] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [clickCount, setClickCount] = useState(0); // clickCount 변수 추가

    const images = [
        '/image/food1.jpg',
        '/image/food2.jpg',
        '/image/food3.jpg',
        '/image/food4.jpg',
        '/image/food5.jpg',
        '/image/food6.jpg',
        '/image/food7.jpg',
        '/image/food8.jpg',
        '/image/food9.jpg',
        '/image/food10.jpg',
        // 추가 이미지 경로
    ];

    useEffect(() => {
        fetch('http://localhost:5000/api/menu')
            .then((response) => response.json())
            .then((data) => setMenus(data))
            .catch((error) => console.error('Error fetching menus:', error));
    }, []);

    const handleOptionChange = (category, option) => {
        setSelectedOption({
            ...selectedOption,
            [category]: option
        });
    };

    const recommendMenu = () => {
        setIsSpinning(true);
        setRecommendedMenu(null);

        const filteredMenus = menus.filter(menu =>
            (selectedOption.type ? menu.type === selectedOption.type : true) &&
            (selectedOption.cuisine ? menu.cuisine === selectedOption.cuisine : true) &&
            (selectedOption.occasion ? menu.occasion === selectedOption.occasion : true)
        );

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setRandomImage(images[randomIndex]);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setClickCount(prevCount => {
                const newCount = prevCount + 1;

                if (selectedOption.type === '간식' && selectedOption.cuisine === '' && selectedOption.occasion === '모임' && newCount >= 3) {
                    setRandomImage(null);
                    setIsSpinning(false);
                    setRecommendedMenu('축하합니다! 김제홍에게 카톡으로 당근 이라고 보내주세요!'); // 특정 메뉴 이름으로 변경
                    return 0; // 클릭 횟수 초기화
                } else {
                    const randomMenu = filteredMenus[Math.floor(Math.random() * filteredMenus.length)];
                    setRandomImage(null);
                    setIsSpinning(false);
                    setRecommendedMenu(randomMenu ? randomMenu.name : '메뉴를 찾을 수 없습니다.');
                    return newCount;
                }
            });
        }, 3000);
    };

    const isSelected = (category, option) => selectedOption[category] === option;

    return (
        <div className="menu-page">
            <Nav />
            <div className="menu-container">
                <LeftSidebar />
                <RightSidebar />
                <div className="menu-header">
                    <p>옵션을 선택하고<br />'메뉴를 추천해줘!'를 눌러보세요</p>
                    {isSpinning && (
                        <div className="random-image">
                            <img src={randomImage} alt="Random" />
                            <p>메뉴 탐색중...</p>
                        </div>
                    )}
                    {recommendedMenu && (
                        <div className="recommended-menu">
                            <h2>추천 메뉴: {recommendedMenu}</h2>
                            <Link to="/roulette">
                                <button className="navigate-button">지도로 맛집 찾기</button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="menu-options">
                    <div className="option-group">
                        <button className={`option-button ${isSelected('type', '') ? 'selected' : ''}`} onClick={() => handleOptionChange('type', '')}>전체</button>
                        <button className={`option-button ${isSelected('type', '식사') ? 'selected' : ''}`} onClick={() => handleOptionChange('type', '식사')}>식사</button>
                        <button className={`option-button ${isSelected('type', '요리') ? 'selected' : ''}`} onClick={() => handleOptionChange('type', '요리')}>요리</button>
                        <button className={`option-button ${isSelected('type', '간식') ? 'selected' : ''}`} onClick={() => handleOptionChange('type', '간식')}>간식</button>
                    </div>
                    <div className="option-group">
                        <button className={`option-button ${isSelected('cuisine', '') ? 'selected' : ''}`} onClick={() => handleOptionChange('cuisine', '')}>전체</button>
                        <button className={`option-button ${isSelected('cuisine', '한식') ? 'selected' : ''}`} onClick={() => handleOptionChange('cuisine', '한식')}>한식</button>
                        <button className={`option-button ${isSelected('cuisine', '중식') ? 'selected' : ''}`} onClick={() => handleOptionChange('cuisine', '중식')}>중식</button>
                        <button className={`option-button ${isSelected('cuisine', '일식') ? 'selected' : ''}`} onClick={() => handleOptionChange('cuisine', '일식')}>일식</button>
                        <button className={`option-button ${isSelected('cuisine', '양식') ? 'selected' : ''}`} onClick={() => handleOptionChange('cuisine', '양식')}>양식</button>
                        <button className={`option-button ${isSelected('cuisine', '아시아') ? 'selected' : ''}`} onClick={() => handleOptionChange('cuisine', '아시아')}>아시아</button>
                    </div>
                    <div className="option-group">
                        <button className={`option-button ${isSelected('occasion', '') ? 'selected' : ''}`} onClick={() => handleOptionChange('occasion', '')}>전체</button>
                        <button className={`option-button ${isSelected('occasion', '혼밥') ? 'selected' : ''}`} onClick={() => handleOptionChange('occasion', '혼밥')}>혼밥</button>
                        <button className={`option-button ${isSelected('occasion', '친구') ? 'selected' : ''}`} onClick={() => handleOptionChange('occasion', '친구')}>친구</button>
                        <button className={`option-button ${isSelected('occasion', '연인') ? 'selected' : ''}`} onClick={() => handleOptionChange('occasion', '연인')}>연인</button>
                        <button className={`option-button ${isSelected('occasion', '가족') ? 'selected' : ''}`} onClick={() => handleOptionChange('occasion', '가족')}>가족</button>
                        <button className={`option-button ${isSelected('occasion', '모임') ? 'selected' : ''}`} onClick={() => handleOptionChange('occasion', '모임')}>모임</button>
                    </div>
                </div>
                <div className="menu-recommend">
                    <button className="recommend-button" onClick={recommendMenu}>메뉴를 추천해줘!</button>
                </div>
                <p>버튼 클릭 횟수: {clickCount}</p> {/* 클릭 횟수를 화면에 표시합니다. */}
            </div>
        </div>
    );
};

export default Menu;
