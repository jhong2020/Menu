// src/pages/Roulette/roulette.jsx
import React from 'react';
import './Roulette.css';

const Roulette = () => {
    return (
        <div className="Roulette-container">
            <div className="Roulette">
                <h2>Kakao Map</h2>
                <iframe
                    src="/kakao-map/map.html"
                    style={{ width: '400%', height: '600px', border: 'none' }}
                    title="Kakao Map"
                ></iframe>
            </div>
        </div>
    );
}

export default Roulette;
