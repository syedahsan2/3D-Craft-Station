import { useState, useEffect } from 'react';
import './Typewriter.css';

const Typewriter = ({ texts, delay = 100, pauseTime = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    const currentFullText = texts[currentTextIndex];
    
    if (isDeleting) {
      if (currentText.length === 0) {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }, 500);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, delay / 2);
      }
    } else {
      if (currentText.length === currentFullText.length) {
        timeout = setTimeout(() => {
          setIsWaiting(true);
        }, 0);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts, delay, pauseTime]);

  return (
    <span className="typewriter">
      {currentText}
      <span className="cursor">|</span>
    </span>
  );
};

export default Typewriter;