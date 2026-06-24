import { useEffect, useRef, useState } from 'react';
import './CharacterSlider.css';

const slidesData = [
    { 
        image: '../../../Home/top_cards/1.webp',
        title: 'Mountain Peak', 
        subtitle: 'Swiss Alps', 
        desc: 'Breathtaking view of the Swiss Alps at golden hour.',
        rating: '4.9', 
        views: '2.4k', 
        saves: '156' 
    },
    { 
        image: '../../../Home/top_cards/2.webp',
        title: 'Ocean Horizon', 
        subtitle: 'Maldives', 
        desc: 'Crystal clear waters meet the endless sky.',
        rating: '4.8', 
        views: '3.1k', 
        saves: '203' 
    },
    { 
        image: '../../../Home/top_cards/3.webp',
        title: 'Forest Light', 
        subtitle: 'Pacific NW', 
        desc: 'Sunlight filters through ancient trees.',
        rating: '4.7', 
        views: '1.8k', 
        saves: '98' 
    },
    { 
        image: '../../../Home/top_cards/4.webp',
        title: 'Coastal Wave', 
        subtitle: 'Amalfi', 
        desc: 'Dramatic coastline where turquoise waters meet cliffs.',
        rating: '4.9', 
        views: '5.2k', 
        saves: '340' 
    },
    { 
        image: '../../../Home/top_cards/5.webp',
        title: 'Valley Glow', 
        subtitle: 'Yosemite', 
        desc: 'Golden light paints the granite walls.',
        rating: '5.0', 
        views: '4.7k', 
        saves: '412' 
    },
    { 
        image: '../../../Home/top_cards/6.webp', 
        title: 'Misty Hills', 
        subtitle: 'Highlands', 
        desc: 'Rolling hills wrapped in morning mist.',
        rating: '4.6', 
        views: '1.2k', 
        saves: '67' 
    },
    { 
        image: '../../../Home/top_cards/7.webp', 
        title: 'Desert Night', 
        subtitle: 'Sahara', 
        desc: 'Endless dunes under a canopy of stars.',
        rating: '4.8', 
        views: '3.9k', 
        saves: '278' 
    },
    { 
        image: '../../../Home/top_cards/8.webp', 
        title: 'Aurora Sky', 
        subtitle: 'Norway', 
        desc: 'Northern lights dance across the arctic sky.',
        rating: '5.0', 
        views: '6.8k', 
        saves: '520' 
    },
    { 
        image: '../../../Home/top_cards/9.webp', 
        title: 'City Lights', 
        subtitle: 'Tokyo', 
        desc: 'Neon-lit metropolis with futuristic vibes.',
        rating: '4.9', 
        views: '8.2k', 
        saves: '612' 
    },
    { 
        image: '../../../Home/top_cards/10.webp', 
        title: 'Mountain Lake', 
        subtitle: 'Banff', 
        desc: 'Crystal clear lake reflecting majestic peaks.',
        rating: '5.0', 
        views: '7.5k', 
        saves: '534' 
    },
    { 
        image: '../../../Home/top_cards/11.webp', 
        title: 'Wildflower Field', 
        subtitle: 'Tuscany', 
        desc: 'Blooming wildflowers under the Italian sun.',
        rating: '4.8', 
        views: '5.9k', 
        saves: '421' 
    },
    { 
        image: '../../../Home/top_cards/12.webp', 
        title: 'Ancient Temple', 
        subtitle: 'Cambodia', 
        desc: 'Mysterious temple ruins in the jungle.',
        rating: '4.9', 
        views: '6.1k', 
        saves: '489' 
    },
];

const CharacterSlider = () => {
    const trackRef = useRef(null);
    const modalOverlayRef = useRef(null);
    const modal3DImageRef = useRef(null);
    const image3DWrapperRef = useRef(null);
    const modal3DAreaRef = useRef(null);
    
    const [currentIndex, setCurrentIndex] = useState(0);
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

const totalSlides = slidesData.length;
const degreeStep = 360 / totalSlides;
const radius = 400;
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

const updateCarousel = () => {
    if (!trackRef.current) return;
    
    const slides = trackRef.current.children;
    const angle = -currentIndex * degreeStep;
    
    trackRef.current.style.transform = `rotateY(${angle}deg)`;
    
    Array.from(slides).forEach((slide, index) => {
        let diff = (index - currentIndex) % totalSlides;
        if (diff < -totalSlides/2) diff += totalSlides;
        if (diff > totalSlides/2) diff -= totalSlides;
        
        const isActive = Math.abs(diff) < 0.5 || Math.abs(diff) === 0;
        
        if (isActive) {
            slide.style.transform = `rotateY(${index * degreeStep}deg) translateZ(${radius + 40}px) scale(1.15)`;
            slide.style.opacity = '1';
            slide.style.zIndex = '10';
            slide.style.filter = 'brightness(1)';
            slide.classList.add('is-active');
        } else {
            slide.style.transform = `rotateY(${index * degreeStep}deg) translateZ(${radius}px) scale(0.90)`;
            slide.style.opacity = '1';  // ✅ Much more visible
            slide.style.zIndex = '2';
            slide.style.filter = 'brightness(1)';  // ✅ No blur, just slightly dimmer
            slide.classList.remove('is-active');
        }
    });
};

    // Auto rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalSlides);
        }, 4000);
        
        return () => clearInterval(interval);
    }, [totalSlides]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const update3DTransform = () => {
        if (image3DWrapperRef.current) {
            image3DWrapperRef.current.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg) scale(${zoomRef.current})`;
        }
    };

    useEffect(() => {
        updateCarousel();
    }, [currentIndex]);

    useEffect(() => {
        updateCarousel();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isModalOpen) {
                if (e.key === 'Escape') closeModal();
                return;
            }
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

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
    }, []);

    const openModal = (slide) => {
        setCurrentSlide(slide);
        setIsModalOpen(true);
        rotXRef.current = 0;
        rotYRef.current = 0;
        zoomRef.current = 1;
        update3DTransform();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSlide(null);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isModalOpen]);

    return (
        <>
            <div className="bg-shadows"></div>
            
            <section className="hero-section">
                <div className="hero-tag">✦ 3D CRAFT STATION ✦</div>
                <h1>
                    Immersive <span className="highlight">3D</span><br />
                    <span className="typewriter-text">
                        {displayText}
                        <span className="cursor">|</span>
                    </span>
                </h1>
                <p className="subtitle">Bringing ideas to life through high-quality 3D modeling, visualization, and digital artistry.</p>
                
                <div className="slider-wrapper">
                    <div className="slider-video-bg">
                        <video 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            preload="metadata"  // ✅ Add this
                            className="slider-video"
                        >
                            <source src="/Home/top_cards/banner_last video_4.mp4" type="video/mp4" />
                            <img src="/Home/top_cards/slider-bg.webp" alt="Background" />
                        </video>
                        <div className="slider-video-overlay"></div>
                    </div>

                    <div className="viewport-frame">
                        <div className="film-reel-assembly">
                            <div className="carousel-3d-track" ref={trackRef}>
                                {slidesData.map((slide, index) => {
                                    const rotation = index * degreeStep;
                                    return (
                                        <div 
                                            key={index} 
                                            className="carousel-slide"
                                            style={{
                                                transform: `rotateY(${rotation}deg) translateZ(${radius}px)`
                                            }}
                                            onClick={() => openModal(slide)}
                                        >
                                            <img src={slide.image} alt={slide.title} />
                                            {/* Slide overlay removed - no text */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Controls removed - auto rotate only */}
                </div>
            </section>
            
            {/* Modal */}
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