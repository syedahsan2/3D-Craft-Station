import { useState, useEffect, useRef, useCallback } from 'react';
import './Slider.css';

const Slider = ({ slidesData, onCardClick }) => {
    const [currentAngle, setCurrentAngle] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartAngle, setDragStartAngle] = useState(0);
    
    const carouselRingRef = useRef(null);
    const carouselSectionRef = useRef(null);
    const autoRotateTimerRef = useRef(null);
    
    const totalSlides = slidesData.length;
    const anglePerSlide = 360 / totalSlides;
    
    // Get radius based on screen size
    const getRadius = () => {
        return window.innerWidth <= 768 ? 250 : 380;
    };
    
    // Update active card styling and info
    const updateActiveCard = useCallback(() => {
        const cards = carouselRingRef.current?.querySelectorAll('.carousel-card');
        const dots = document.querySelectorAll('.carousel-dot');
        
        cards?.forEach((card, idx) => {
            if (idx === activeIndex) {
                card.classList.add('active-card');
            } else {
                card.classList.remove('active-card');
            }
        });
        
        dots?.forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, [activeIndex]);
    
    // Rotate to specific index
    const rotateToIndex = useCallback((index) => {
        const newAngle = -anglePerSlide * index;
        setCurrentAngle(newAngle);
        setActiveIndex(index);
        if (carouselRingRef.current) {
            carouselRingRef.current.style.transform = `rotateY(${newAngle}deg)`;
        }
        updateActiveCard();
        resetAutoRotate();
    }, [anglePerSlide, updateActiveCard]);
    
    // Rotate carousel by direction
    const rotateCarousel = useCallback((dir) => {
        const newAngle = currentAngle - anglePerSlide * dir;
        setCurrentAngle(newAngle);
        if (carouselRingRef.current) {
            carouselRingRef.current.style.transform = `rotateY(${newAngle}deg)`;
        }
        
        let normalizedAngle = ((newAngle % 360) + 360) % 360;
        let newIndex = Math.round(-normalizedAngle / anglePerSlide);
        newIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
        setActiveIndex(newIndex);
        updateActiveCard();
        resetAutoRotate();
    }, [currentAngle, anglePerSlide, totalSlides, updateActiveCard]);
    
    // Auto rotate
    const startAutoRotate = useCallback(() => {
        stopAutoRotate();
        autoRotateTimerRef.current = setInterval(() => {
            if (!isDragging) {
                rotateCarousel(1);
            }
        }, 3500);
    }, [isDragging, rotateCarousel]);
    
    const stopAutoRotate = () => {
        if (autoRotateTimerRef.current) {
            clearInterval(autoRotateTimerRef.current);
            autoRotateTimerRef.current = null;
        }
    };
    
    const resetAutoRotate = () => {
        stopAutoRotate();
        startAutoRotate();
    };
    
    // Create cards
    const createCards = useCallback(() => {
        if (!carouselRingRef.current) return;
        
        const radius = getRadius();
        carouselRingRef.current.innerHTML = '';
        
        // Create dots container
        const dotsContainer = document.querySelector('.carousel-dots');
        if (dotsContainer) dotsContainer.innerHTML = '';
        
        slidesData.forEach((slide, i) => {
            // Create card
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" loading="eager">
                <div class="card-shine"></div>
            `;
            card.style.transform = `rotateY(${anglePerSlide * i}deg) translateZ(${radius}px)`;
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                if (onCardClick) {
                    onCardClick(i);
                }
            });
            carouselRingRef.current.appendChild(card);
            
            // Create dot
            if (dotsContainer) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                dot.addEventListener('click', () => rotateToIndex(i));
                dotsContainer.appendChild(dot);
            }
        });
        
        updateActiveCard();
    }, [slidesData, anglePerSlide, onCardClick, rotateToIndex, updateActiveCard]);
    
    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            createCards();
            rotateToIndex(activeIndex);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [createCards, rotateToIndex, activeIndex]);
    
    // Initialize carousel
    useEffect(() => {
        createCards();
        startAutoRotate();
        
        return () => {
            stopAutoRotate();
        };
    }, [createCards, startAutoRotate]);
    
    // Mouse/Touch drag handlers
    useEffect(() => {
        const section = carouselSectionRef.current;
        if (!section) return;
        
        const handleMouseDown = (e) => {
            if (e.target.closest('.ctrl-btn') || e.target.closest('.carousel-dot')) return;
            setIsDragging(true);
            setDragStartX(e.clientX);
            setDragStartAngle(currentAngle);
            stopAutoRotate();
        };
        
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const newAngle = dragStartAngle + (e.clientX - dragStartX) * 0.3;
            setCurrentAngle(newAngle);
            if (carouselRingRef.current) {
                carouselRingRef.current.style.transform = `rotateY(${newAngle}deg)`;
            }
            
            let normalizedAngle = ((newAngle % 360) + 360) % 360;
            let newIndex = Math.round(-normalizedAngle / anglePerSlide);
            newIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
            setActiveIndex(newIndex);
            updateActiveCard();
        };
        
        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                startAutoRotate();
            }
        };
        
        const handleTouchStart = (e) => {
            if (e.target.closest('.ctrl-btn') || e.target.closest('.carousel-dot')) return;
            setIsDragging(true);
            setDragStartX(e.touches[0].clientX);
            setDragStartAngle(currentAngle);
            stopAutoRotate();
        };
        
        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const newAngle = dragStartAngle + (e.touches[0].clientX - dragStartX) * 0.3;
            setCurrentAngle(newAngle);
            if (carouselRingRef.current) {
                carouselRingRef.current.style.transform = `rotateY(${newAngle}deg)`;
            }
            
            let normalizedAngle = ((newAngle % 360) + 360) % 360;
            let newIndex = Math.round(-normalizedAngle / anglePerSlide);
            newIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
            setActiveIndex(newIndex);
            updateActiveCard();
        };
        
        const handleTouchEnd = () => {
            if (isDragging) {
                setIsDragging(false);
                startAutoRotate();
            }
        };
        
        section.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        section.addEventListener('touchstart', handleTouchStart, { passive: false });
        section.addEventListener('touchmove', handleTouchMove, { passive: false });
        section.addEventListener('touchend', handleTouchEnd);
        
        return () => {
            section.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            section.removeEventListener('touchstart', handleTouchStart);
            section.removeEventListener('touchmove', handleTouchMove);
            section.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, dragStartX, dragStartAngle, currentAngle, anglePerSlide, totalSlides, updateActiveCard, startAutoRotate, stopAutoRotate]);
    
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') rotateCarousel(-1);
            if (e.key === 'ArrowRight') rotateCarousel(1);
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [rotateCarousel]);
    
    return (
        <div className="bg-shadows">
            <div className="shadow-char char-1">3D</div>
            <div className="shadow-char char-2">CS</div>
            <div className="shadow-char char-3">CR</div>
            <div className="shadow-char char-4">FT</div>
            
            <section className="hero-section">
                <div className="hero-tag">✦ Interactive 3D Experience</div>
                <h1>Immersive <span className="highlight">360°</span><br />Carousel</h1>
                <p className="subtitle">Drag, click or use arrows to explore</p>
                
                <div className="carousel-section" ref={carouselSectionRef}>
                    <div className="carousel-container">
                        <div className="carousel-ring" ref={carouselRingRef}></div>
                    </div>
                    <div className="carousel-info">
                        <div className="info-title" id="infoTitle">
                            {slidesData[activeIndex]?.title}
                        </div>
                        <div className="info-subtitle" id="infoSubtitle">
                            {slidesData[activeIndex]?.subtitle}
                        </div>
                    </div>
                    <div className="carousel-controls">
                        <button className="ctrl-btn" onClick={() => rotateCarousel(-1)}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className="carousel-dots"></div>
                        <button className="ctrl-btn" onClick={() => rotateCarousel(1)}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Slider;