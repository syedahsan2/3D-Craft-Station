import { useEffect, useRef, useState, useCallback } from 'react';
// import './CharacterSlider.css';

const slidesData = [
    { 
        image: '../../../Home/top_cards/1.jpg',
        title: 'Mountain Peak', 
        subtitle: 'Swiss Alps', 
        desc: 'Breathtaking view of the Swiss Alps at golden hour.',
        rating: '4.9', 
        views: '2.4k', 
        saves: '156' 
    },
    { 
        image: '../../../Home/top_cards/2.jpg',
        title: 'Ocean Horizon', 
        subtitle: 'Maldives', 
        desc: 'Crystal clear waters meet the endless sky.',
        rating: '4.8', 
        views: '3.1k', 
        saves: '203' 
    },
    { 
        image: '../../../Home/top_cards/3.jpg',
        title: 'Forest Light', 
        subtitle: 'Pacific NW', 
        desc: 'Sunlight filters through ancient trees.',
        rating: '4.7', 
        views: '1.8k', 
        saves: '98' 
    },
    { 
        image: '../../../Home/top_cards/4.jpg',
        title: 'Coastal Wave', 
        subtitle: 'Amalfi', 
        desc: 'Dramatic coastline where turquoise waters meet cliffs.',
        rating: '4.9', 
        views: '5.2k', 
        saves: '340' 
    },
    { 
        image: '../../../Home/top_cards/5.jpg',
        title: 'Valley Glow', 
        subtitle: 'Yosemite', 
        desc: 'Golden light paints the granite walls.',
        rating: '5.0', 
        views: '4.7k', 
        saves: '412' 
    },
    { 
        image: '../../../Home/top_cards/6.jpg', 
        title: 'Misty Hills', 
        subtitle: 'Highlands', 
        desc: 'Rolling hills wrapped in morning mist.',
        rating: '4.6', 
        views: '1.2k', 
        saves: '67' 
    },
    { 
        image: '../../../Home/top_cards/7.jpg', 
        title: 'Desert Night', 
        subtitle: 'Sahara', 
        desc: 'Endless dunes under a canopy of stars.',
        rating: '4.8', 
        views: '3.9k', 
        saves: '278' 
    },
    { 
        image: '../../../Home/top_cards/8.jpg', 
        title: 'Aurora Sky', 
        subtitle: 'Norway', 
        desc: 'Northern lights dance across the arctic sky.',
        rating: '5.0', 
        views: '6.8k', 
        saves: '520' 
    },
    { 
        image: '../../../Home/top_cards/9.jpg', 
        title: 'City Lights', 
        subtitle: 'Tokyo', 
        desc: 'Neon-lit metropolis with futuristic vibes.',
        rating: '4.9', 
        views: '8.2k', 
        saves: '612' 
    },
        { 
        image: '../../../Home/top_cards/10.jpg', 
        title: 'City Lights', 
        subtitle: 'Tokyo', 
        desc: 'Neon-lit metropolis with futuristic vibes.',
        rating: '4.9', 
        views: '8.2k', 
        saves: '612' 
    },
        { 
        image: '../../../Home/top_cards/11.jpg', 
        title: 'City Lights', 
        subtitle: 'Tokyo', 
        desc: 'Neon-lit metropolis with futuristic vibes.',
        rating: '4.9', 
        views: '8.2k', 
        saves: '612' 
    },
        { 
        image: '../../../Home/top_cards/12.jpg', 
        title: 'City Lights', 
        subtitle: 'Tokyo', 
        desc: 'Neon-lit metropolis with futuristic vibes.',
        rating: '4.9', 
        views: '8.2k', 
        saves: '612' 
    },
    
    
];

const CharacterSlider = () => {
    const carouselRingRef = useRef(null);
    const carouselDotsRef = useRef(null);
    const carouselSectionRef = useRef(null);
    const modalOverlayRef = useRef(null);
    const modal3DImageRef = useRef(null);
    const image3DWrapperRef = useRef(null);
    const modal3DAreaRef = useRef(null);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(null);
    
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    
    const typewriterTexts = [
        '3D Models',
        'Character Design',
        'Environment Art',
        'Product Visualization',
        'Game Assets'
    ];
    
    // Typewriter effect
    useEffect(() => {
        const currentFullText = typewriterTexts[textIndex];
        let timeout;
        
        if (isDeleting) {
            if (displayText.length === 0) {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
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
    
    // 3D transform states for modal image
    const rotXRef = useRef(0);
    const rotYRef = useRef(0);
    const zoomRef = useRef(1);
    const isModalDraggingRef = useRef(false);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const rotStartRef = useRef({ x: 0, y: 0 });
    
    let currentAngleRef = useRef(0);
    let autoRotateTimerRef = useRef(null);
    let isDraggingRef = useRef(false);
    let dragStartXRef = useRef(0);
    let dragStartAngleRef = useRef(0);
    
    const totalSlides = slidesData.length;
    const anglePerSlide = 360 / totalSlides;
    
    const getRadius = useCallback(() => {
        return window.innerWidth <= 768 ? 280 : 480;
    }, []);
    
    const update3DTransform = useCallback(() => {
        if (image3DWrapperRef.current) {
            image3DWrapperRef.current.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg) scale(${zoomRef.current})`;
        }
    }, []);
    
    const updateActiveCard = useCallback(() => {
        const cards = document.querySelectorAll('.carousel-card');
        const dots = document.querySelectorAll('.carousel-dot');
        const infoTitle = document.getElementById('infoTitle');
        const infoSubtitle = document.getElementById('infoSubtitle');
        
        cards.forEach((card, idx) => {
            if (idx === activeIndex) {
                card.classList.add('active-card');
            } else {
                card.classList.remove('active-card');
            }
        });
        
        dots.forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        if (infoTitle) infoTitle.textContent = slidesData[activeIndex].title;
        if (infoSubtitle) infoSubtitle.textContent = slidesData[activeIndex].subtitle;
    }, [activeIndex]);
    
    const rotateCarousel = useCallback((dir) => {
        currentAngleRef.current -= anglePerSlide * dir;
        if (carouselRingRef.current) {
            carouselRingRef.current.style.transform = `rotateY(${currentAngleRef.current}deg)`;
        }
        
        let normalizedAngle = ((currentAngleRef.current % 360) + 360) % 360;
        let newIndex = Math.round(-normalizedAngle / anglePerSlide);
        newIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
        setActiveIndex(newIndex);
        updateActiveCard();
        resetAutoRotate();
    }, [anglePerSlide, totalSlides, updateActiveCard]);
    
    const rotateToIndex = useCallback((index) => {
        setActiveIndex(index);
        currentAngleRef.current = -anglePerSlide * index;
        if (carouselRingRef.current) {
            carouselRingRef.current.style.transform = `rotateY(${currentAngleRef.current}deg)`;
        }
        updateActiveCard();
        resetAutoRotate();
    }, [anglePerSlide, updateActiveCard]);
    
    const startAutoRotate = useCallback(() => {
        if (autoRotateTimerRef.current) clearInterval(autoRotateTimerRef.current);
        autoRotateTimerRef.current = setInterval(() => {
            if (!isDraggingRef.current && !isModalOpen) {
                rotateCarousel(1);
            }
        }, 3500);
    }, [rotateCarousel, isModalOpen]);
    
    const stopAutoRotate = useCallback(() => {
        if (autoRotateTimerRef.current) {
            clearInterval(autoRotateTimerRef.current);
            autoRotateTimerRef.current = null;
        }
    }, []);
    
    const resetAutoRotate = useCallback(() => {
        stopAutoRotate();
        startAutoRotate();
    }, [stopAutoRotate, startAutoRotate]);
    
    const createCarousel = useCallback(() => {
        if (!carouselRingRef.current || !carouselDotsRef.current) return;
        
        const radius = getRadius();
        carouselRingRef.current.innerHTML = '';
        carouselDotsRef.current.innerHTML = '';
        
        slidesData.forEach((slide, i) => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.innerHTML = `<img src="${slide.image}" alt="${slide.title}" loading="eager"><div class="card-shine"></div>`;
            card.style.transform = `rotateY(${anglePerSlide * i}deg) translateZ(${radius}px)`;
            card.addEventListener('click', () => {
                setCurrentSlide(slide);
                setIsModalOpen(true);
                // Reset transforms
                rotXRef.current = 0;
                rotYRef.current = 0;
                zoomRef.current = 1;
                update3DTransform();
                stopAutoRotate();
            });
            carouselRingRef.current.appendChild(card);
            
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            dot.addEventListener('click', () => rotateToIndex(i));
            carouselDotsRef.current.appendChild(dot);
        });
        
        updateActiveCard();
    }, [anglePerSlide, getRadius, rotateToIndex, updateActiveCard, stopAutoRotate, update3DTransform]);
    
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setCurrentSlide(null);
        startAutoRotate();
    }, [startAutoRotate]);
    
    useEffect(() => {
        const handleResize = () => {
            createCarousel();
            rotateToIndex(activeIndex);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [createCarousel, rotateToIndex, activeIndex]);
    
    useEffect(() => {
        createCarousel();
        startAutoRotate();
        
        return () => {
            stopAutoRotate();
        };
    }, [createCarousel, startAutoRotate, stopAutoRotate]);
    
    // Mouse/Touch drag for carousel
    useEffect(() => {
        const section = carouselSectionRef.current;
        if (!section) return;
        
        const handleMouseDown = (e) => {
            if (e.target.closest('.ctrl-btn') || e.target.closest('.carousel-dot')) return;
            isDraggingRef.current = true;
            dragStartXRef.current = e.clientX;
            dragStartAngleRef.current = currentAngleRef.current;
            stopAutoRotate();
        };
        
        const handleMouseMove = (e) => {
            if (!isDraggingRef.current) return;
            currentAngleRef.current = dragStartAngleRef.current + (e.clientX - dragStartXRef.current) * 0.3;
            if (carouselRingRef.current) {
                carouselRingRef.current.style.transform = `rotateY(${currentAngleRef.current}deg)`;
            }
            
            let normalizedAngle = ((currentAngleRef.current % 360) + 360) % 360;
            let newIndex = Math.round(-normalizedAngle / anglePerSlide);
            newIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
            setActiveIndex(newIndex);
            updateActiveCard();
        };
        
        const handleMouseUp = () => {
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
                startAutoRotate();
            }
        };
        
        section.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            section.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [anglePerSlide, totalSlides, updateActiveCard, startAutoRotate, stopAutoRotate]);
    
    // Modal image 3D controls (drag to rotate, scroll to zoom)
    useEffect(() => {
        const area = modal3DAreaRef.current;
        if (!area) return;
        
        const handleMouseDown = (e) => {
            if (e.target.closest('.modal-close-x')) return;
            isModalDraggingRef.current = true;
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            rotStartRef.current = { x: rotXRef.current, y: rotYRef.current };
            area.classList.add('grabbing');
            e.preventDefault();
        };
        
        const handleMouseMove = (e) => {
            if (!isModalDraggingRef.current) return;
            const deltaX = e.clientX - dragStartRef.current.x;
            const deltaY = e.clientY - dragStartRef.current.y;
            rotXRef.current = rotStartRef.current.x - deltaY * 0.4;
            rotYRef.current = rotStartRef.current.y + deltaX * 0.4;
            update3DTransform();
        };
        
        const handleMouseUp = () => {
            if (isModalDraggingRef.current) {
                isModalDraggingRef.current = false;
                area.classList.remove('grabbing');
            }
        };
        
        const handleWheel = (e) => {
            e.preventDefault();
            const zoomDelta = e.deltaY > 0 ? -0.08 : 0.08;
            zoomRef.current = Math.max(0.5, Math.min(3, zoomRef.current + zoomDelta));
            update3DTransform();
        };
        
        area.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        area.addEventListener('wheel', handleWheel, { passive: false });
        
        return () => {
            area.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            area.removeEventListener('wheel', handleWheel);
        };
    }, [update3DTransform]);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isModalOpen) {
                if (e.key === 'Escape') closeModal();
                return;
            }
            if (e.key === 'ArrowLeft') rotateCarousel(-1);
            if (e.key === 'ArrowRight') rotateCarousel(1);
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [rotateCarousel, isModalOpen, closeModal]);
    
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);
    
    return (
        <>
            <div className="bg-shadows">
                <div className="shadow-char char-1">3D</div>
                <div className="shadow-char char-2">CS</div>
                <div className="shadow-char char-3">CR</div>
                <div className="shadow-char char-4">FT</div>
            </div>
            
            <section className="hero-section">
                <div className="hero-tag">✦ 3D CRAFT STATION ✦</div>
                <h1>
                    Immersive <span className="highlight">3D</span><br />
                    <span className="typewriter-text">
                        {displayText}
                        <span className="cursor">|</span>
                    </span>
                </h1>
                <p className="subtitle">Click any card to explore interactive 3D view · Drag to rotate · Scroll to zoom</p>
                
                <div className="carousel-section" ref={carouselSectionRef}>
                    <div className="carousel-container">
                        <div className="carousel-ring" ref={carouselRingRef}></div>
                    </div>
                    <div className="carousel-controls">
                        <button className="ctrl-btn" onClick={() => rotateCarousel(-1)}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className="carousel-dots" ref={carouselDotsRef}></div>
                        <button className="ctrl-btn" onClick={() => rotateCarousel(1)}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </section>
            
            {/* Modal with Image (No 3D Model) */}
            <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} ref={modalOverlayRef} onClick={closeModal}>
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-3d-area" ref={modal3DAreaRef}>
                        <div className="image-3d-wrapper" ref={image3DWrapperRef}>
                            {currentSlide?.image ? (
                                <img src={currentSlide.image} alt="3D View" ref={modal3DImageRef} />
                            ) : (
                                <div className="placeholder-image" style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    background: 'linear-gradient(135deg, #333, #555)', 
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    No Image Available
                                </div>
                            )}
                        </div>
                        <button className="modal-close-x" onClick={closeModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="modal-controls-hint">
                            <div className="hint-item"><i className="fa-solid fa-arrows-left-right"></i> Drag</div>
                            <div className="hint-item"><i className="fa-solid fa-arrows-up-down"></i> Tilt</div>
                            <div className="hint-item"><i className="fa-solid fa-magnifying-glass"></i> Scroll</div>
                        </div>
                    </div>
                    
                    <div className="modal-details">
                        <div className="modal-badge">3D CRAFT STATION</div>
                        <h2>{currentSlide?.title || '3D Model'}</h2>
                        <div className="modal-location">
                            <i className="fa-solid fa-cube"></i>
                            <span>{currentSlide?.subtitle || 'Premium Quality'}</span>
                        </div>
                        <p className="modal-desc">{currentSlide?.desc || 'High-quality 3D model crafted with attention to detail.'}</p>
                        <div className="detail-stats">
                            <div className="stat-item">
                                <div className="stat-value">{currentSlide?.rating || '4.9'}</div>
                                <div className="stat-label">Rating</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{currentSlide?.views || '2.4k'}</div>
                                <div className="stat-label">Views</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">{currentSlide?.saves || '156'}</div>
                                <div className="stat-label">Saves</div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="modal-btn btn-outline" onClick={closeModal}>Close</button>
                            <button className="modal-btn btn-primary">
                                <i className="fa-solid fa-download"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CharacterSlider;