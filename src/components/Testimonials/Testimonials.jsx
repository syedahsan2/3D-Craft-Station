import { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const testimonialsData = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Creative Director",
        company: "Pixel Studios",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 5,
        text: "Absolutely outstanding work! The 3D models created by 3D Station exceeded our expectations. The attention to detail and creativity is remarkable."
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Game Developer",
        company: "Indie Games",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        text: "Working with 3D Station has been a game-changer for our studio. Their 3D character designs are top-notch and delivered on time."
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Marketing Manager",
        company: "Brand Solutions",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4,
        text: "Great experience from start to finish. The team understood our vision perfectly and brought it to life."
    },
    {
        id: 4,
        name: "David Kim",
        role: "Product Designer",
        company: "Design Hub",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 5,
        text: "Incredible quality and fast turnaround. The 3D product renders they created are being used across all our marketing materials."
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    
    // ✅ Counter states
    const [clientsCount, setClientsCount] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);
    const [isCounterStarted, setIsCounterStarted] = useState(false);
    const sectionRef = useRef(null);

    // ✅ Intersection Observer - Start counter when section is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isCounterStarted) {
                        setIsCounterStarted(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
    }, [isCounterStarted]);

    // ✅ Counter animation
    useEffect(() => {
        if (!isCounterStarted) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const interval = duration / steps;

        // Happy Clients: 0 → 100
        let clientsStep = 0;
        const clientsInterval = setInterval(() => {
            clientsStep++;
            const progress = clientsStep / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(eased * 100);
            setClientsCount(value);
            if (clientsStep >= steps) {
                clearInterval(clientsInterval);
                setClientsCount(100);
            }
        }, interval);

        // Rating: 0 → 4.9
        let ratingStep = 0;
        const ratingInterval = setInterval(() => {
            ratingStep++;
            const progress = ratingStep / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = (eased * 4.9).toFixed(1);
            setRatingCount(parseFloat(value));
            if (ratingStep >= steps) {
                clearInterval(ratingInterval);
                setRatingCount(4.9);
            }
        }, interval);

        // Projects Done: 0 → 200
        let projectsStep = 0;
        const projectsInterval = setInterval(() => {
            projectsStep++;
            const progress = projectsStep / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(eased * 200);
            setProjectsCount(value);
            if (projectsStep >= steps) {
                clearInterval(projectsInterval);
                setProjectsCount(200);
            }
        }, interval);

        return () => {
            clearInterval(clientsInterval);
            clearInterval(ratingInterval);
            clearInterval(projectsInterval);
        };
    }, [isCounterStarted]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <i key={i} className={`fa-solid fa-star ${i < rating ? 'star-filled' : 'star-empty'}`}></i>
        ));
    };

    const currentTestimonial = testimonialsData[currentIndex];

    return (
        <section className="testimonials-section" ref={sectionRef}>
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <span className="testimonials-badge">✦ CLIENT LOVE ✦</span>
                    <h2 className="testimonials-title">What Our <span className="highlight">Clients Say</span></h2>
                    <p className="testimonials-subtitle">Don't just take our word for it</p>
                </div>

                <div className="testimonials-slider">
                    <button className="slider-nav prev" aria-label="Previous testimonial" onClick={prevSlide}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    <div className="testimonials-wrapper">
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="quote-icon">
                                    <i className="fa-solid fa-quote-left"></i>
                                </div>
                                <div className="testimonial-stars">
                                    {renderStars(currentTestimonial.rating)}
                                </div>
                                <p className="testimonial-text">"{currentTestimonial.text}"</p>
                                <div className="testimonial-author">
                                    <img src={currentTestimonial.image} alt={currentTestimonial.name} className="author-image" />
                                    <div className="author-info">
                                        <p className="author-name">{currentTestimonial.name}</p>
                                        <p className="author-role">{currentTestimonial.role}, {currentTestimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="slider-nav next" onClick={nextSlide}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>

                <div className="testimonials-dots">
                    {testimonialsData.map((_, idx) => (
                        <button
                            key={idx}
                            className={`dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(idx)}
                            title="Next Slide"
                        />
                    ))}
                </div>

                {/* ✅ Stats with Counter Animation */}
                <div className="testimonials-stats">
                    <div className="stat">
                        <div className="stat-number">
                            {isCounterStarted ? clientsCount : 0}+
                        </div>
                        <div className="stat-label">Happy Clients</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">
                            {isCounterStarted ? ratingCount : 0}
                        </div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">
                            {isCounterStarted ? projectsCount : 0}+
                        </div>
                        <div className="stat-label">Projects Done</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;