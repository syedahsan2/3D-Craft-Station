import React, { useEffect, useRef, useState } from 'react';
import './StatsBanner.css';

const StatsBanner = () => {
    const [counts, setCounts] = useState({
        designs: 0,
        delivered: 0
    });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Counter animation
    useEffect(() => {
        if (!isVisible) return;

        const animateValue = (start, end, duration, setter) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                setter(value);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        animateValue(0, 100, 2000, (val) => setCounts(prev => ({ ...prev, designs: val })));
        animateValue(0, 5000, 2500, (val) => setCounts(prev => ({ ...prev, delivered: val })));

    }, [isVisible]);

    // Intersection Observer for scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '50px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className="orange-stats-section" ref={sectionRef}>
            <div className="orange-stats-container">
                
                {/* Item 1: 100% Custom Designs */}
                <div className="orange-stats-card animate-card">
                    <div className="orange-stats-icon pulse-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                    </div>
                    <div className="orange-stats-info">
                        <h3 className="count-number">
                            {isVisible ? `${counts.designs}%` : '0%'}
                        </h3>
                        <h4>CUSTOM DESIGNS</h4>
                        <p>Unique artwork made for you</p>
                    </div>
                </div>

                {/* Item 2: 5000+ Designs Delivered */}
                <div className="orange-stats-card animate-card" style={{ animationDelay: '0.15s' }}>
                    <div className="orange-stats-icon pulse-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                    </div>
                    <div className="orange-stats-info">
                        <h3 className="count-number">
                            {isVisible ? `${counts.delivered}+` : '0+'}
                        </h3>
                        <h4>DESIGNS DELIVERED</h4>
                        <p>Trusted by clients worldwide</p>
                    </div>
                </div>

                {/* Item 3: 24-48H Fast Delivery */}
                <div className="orange-stats-card animate-card" style={{ animationDelay: '0.3s' }}>
                    <div className="orange-stats-icon pulse-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="orange-stats-info">
                        <h3 className="flip-text">24-48H</h3>
                        <h4>FAST DELIVERY</h4>
                        <p>Quick turnaround without compromise</p>
                    </div>
                </div>

                {/* Item 4: Unlimited Revisions */}
                <div className="orange-stats-card animate-card" style={{ animationDelay: '0.45s' }}>
                    <div className="orange-stats-icon pulse-icon">
                        <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 8.05a4.5 4.5 0 00-6.364 0L9 11.05l-3 3a4.5 4.5 0 106.364 6.364l3-3 3-3a4.5 4.5 0 000-6.364z"></path>
                        </svg>
                    </div>
                    <div className="orange-stats-info">
                        <h3 className="rotate-text">UNLIMITED</h3>
                        <h4>REVISIONS</h4>
                        <p>We work until your vision is perfect</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatsBanner;