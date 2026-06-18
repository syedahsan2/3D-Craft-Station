import { useState, useEffect } from 'react';
import './WorldSection.css';

const WorldSection = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    
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
                setIsDeleting(false);
                timeout = setTimeout(() => {
                    typeNext();
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
                setIsTypingComplete(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, isTypingComplete]);

    const typeNext = () => {
        setDisplayText('');
        setIsDeleting(false);
    };

  return (
    <section className="world-section">
      <div className="world-container">
        <div className="world-content">
          <h2 className="world-title">
            THE WORLD <br /> OF <span className="world-highlight">3D STATION</span>
          </h2>
          <button className="world-btn">
            <span>Explore the universe</span>
            <i className="fa-solid fa-circle-play"></i>
          </button>
        </div>
        {/* ❌ .world-image-wrapper hata do */}
      </div>
    </section>
  );

};

export default WorldSection;