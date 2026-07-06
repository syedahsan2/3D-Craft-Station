import { useEffect, useRef, useState, useCallback } from 'react';
import CarouselModal from '../CarouselModal/CarouselModal';
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
const HeroCarousel = () => {
    const trackRef = useRef(null);
    const sliderRef = useRef(null);
    const videoRef = useRef(null);
    const autoRotateRef = useRef(null);
    const isTransitioningRef = useRef(false);
    const animationFrameRef = useRef(null);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [isInView, setIsInView] = useState(false);
    
    const totalSlides = slidesData.length;
    const degreeStep = 360 / totalSlides;
    const radius = 400;

    // ✅ Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsInView(entry.isIntersecting);
                    if (videoRef.current) {
                        entry.isIntersecting ? videoRef.current.play() : videoRef.current.pause();
                    }
                });
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }

        return () => {
            if (sliderRef.current) {
                observer.unobserve(sliderRef.current);
            }
        };
    }, []);

    // ✅ Update carousel
    const updateCarousel = useCallback(() => {
        if (!trackRef.current || isTransitioningRef.current || !isInView) return;
        
        isTransitioningRef.current = true;
        
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        
        animationFrameRef.current = requestAnimationFrame(() => {
            const slides = trackRef.current.children;
            const baseAngle = -currentIndex * degreeStep;
            
            trackRef.current.style.transform = `rotateY(${baseAngle}deg)`;
            
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
                    slide.style.opacity = '1';
                    slide.style.zIndex = '2';
                    slide.style.filter = 'brightness(0.85)';
                    slide.classList.remove('is-active');
                }
            });
            
            setTimeout(() => {
                isTransitioningRef.current = false;
            }, 50);
        });
    }, [currentIndex, degreeStep, totalSlides, radius, isInView]);

    // ✅ Auto Rotate
    useEffect(() => {
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }
        
        if (!isInView) return;
        
        autoRotateRef.current = setInterval(() => {
            if (!isModalOpen && isInView) {
                setCurrentIndex((prev) => (prev + 1) % totalSlides);
            }
        }, 4000);
        
        return () => {
            if (autoRotateRef.current) {
                clearInterval(autoRotateRef.current);
            }
        };
    }, [isModalOpen, totalSlides, isInView]);

    useEffect(() => {
        updateCarousel();
    }, [currentIndex, updateCarousel]);

    useEffect(() => {
        setTimeout(() => {
            updateCarousel();
        }, 200);
    }, [updateCarousel]);

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const openModal = (slide) => {
        setCurrentSlide(slide);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSlide(null);
    };

    // Keyboard navigation
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
    }, [isModalOpen, goToNext, goToPrev]);

    return (
        <div className="carousel-wrapper" ref={sliderRef}>
            {/* Video Background */}
            <div className="carousel-video-bg">
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="none"
                    className="carousel-video"
                    poster="/Home/top_cards/slider-bg.webp"
                >
                    <source src="/Home/top_cards/banner_last_video.webm" type="video/webm" />
                    <img src="/Home/top_cards/slider-bg.webp" alt="Background" />
                </video>
                <div className="carousel-video-overlay"></div>
            </div>

            {/* Carousel */}
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
                                        transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                                        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease'
                                    }}
                                    onClick={() => openModal(slide)}
                                >
                                    <img src={slide.image} alt={slide.title} loading="lazy" decoding="async" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="carousel-controls">
                <button className="ctrl-btn prev" onClick={goToPrev}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="carousel-indicators">
                    {slidesData.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
                <button className="ctrl-btn next" onClick={goToNext}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            {/* ✅ Modal Component */}
            <CarouselModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                slide={currentSlide}
            />
        </div>
    );
};

export default HeroCarousel;