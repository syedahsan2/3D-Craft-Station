import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ React Router import
import './WorldSection.css';

const WorldSection = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const navigate = useNavigate(); 
    
    const fullText = "3D STATION";
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    useEffect(() => {
        let timeout;
        
        if (isTypingComplete) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
                setIsTypingComplete(false);
            }, pauseTime);
            return () => clearTimeout(timeout);
        }

        if (isDeleting) {
            if (displayText.length === 0) {
                timeout = setTimeout(() => {
                    setIsDeleting(false);
                }, 500);
            } else {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, deletingSpeed);
            }
        } else {
            if (displayText.length < fullText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(fullText.slice(0, displayText.length + 1));
                }, typingSpeed);
            } else if (displayText.length === fullText.length) {
                timeout = setTimeout(() => {
                    setIsTypingComplete(true);
                }, 0);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isTypingComplete]);
  // ✅ Navigate to Portfolio page
  const goToPortfolio = () => {
    navigate('/portfolio');
  };
return (
    <section className="world-section">
        <div className="world-container">
            <div className="world-content">
                <h2 className="world-title">
                    THE WORLD <br /> OF <span className="world-highlight">{displayText}<span className="cursor">|</span></span>
                </h2>
                <button className="world-btn" onClick={goToPortfolio}>
                    <span>Explore the universe</span>
                    <i className="fa-solid fa-circle-play"></i>
                </button>
            </div>

            <div className="world-image-wrapper">
                <div className="world-image-container">
                    <img 
                        src="../../Home/Banner_T.webp" 
                        alt="3D Character" 
                        className="world-image"
                    />
                </div>
            </div>
        </div>
    </section>
);

};

export default WorldSection;