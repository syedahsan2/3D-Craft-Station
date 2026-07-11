import { useEffect, useState } from 'react';
import './HeroText.css';

const typewriterTexts = [
    'Custom STL Designs',
    '3D Printable Models',
    'Miniatures & Figurines',
    'Mechanical STL Parts',
    'Collectibles & Statues'
];

const HeroText = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    // Typewriter effect
    useEffect(() => {
        const currentFullText = typewriterTexts[textIndex];
        let timeout;
        
        if (isDeleting) {
            if (displayText.length === 0) {
                timeout = setTimeout(() => {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
                }, 500);
            } else {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 50);
            }
        } else {
            if (displayText.length < currentFullText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentFullText.slice(0, displayText.length + 1));
                }, 100);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000);
            }
        }
        
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex]);

    return (
        <div className="hero-text-wrapper">
            <div className="hero-tag">✦ 3D CRAFT STATION ✦</div>
            <h1 className="hero-title">
                Immersive <span className="highlight">3D</span><br />
                <span className="typewriter-text">
                    {displayText}
                    <span className="cursor">|</span>
                </span>
            </h1>
            <p className="hero-subtitle">
                Custom STL models engineered for high-quality 3D printing, collectibles, 
                prototypes, miniatures, and production-ready designs.
            </p>
        </div>
    );
};

export default HeroText;