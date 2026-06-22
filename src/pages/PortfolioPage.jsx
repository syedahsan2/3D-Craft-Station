import { useEffect, useRef, useState } from 'react';

const PortfolioPage = () => {
    const portfolioRef = useRef(null);
    
    // Typewriter states
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    
    const lines = [
        { text: "CREATING", color: "#ffffff" },
        { text: "CHARACTERS", color: "#ff6600" },
        { text: "THAT TELL STORIES", color: "#ffffff" }
    ];
    
    // Typewriter effect
    useEffect(() => {
        const currentLine = lines[lineIndex];
        if (!currentLine) return;
        
        const fullText = currentLine.text;
        
        if (isDeleting) {
            if (charIndex > 0) {
                const timer = setTimeout(() => {
                    setCharIndex(charIndex - 1);
                }, 30);
                return () => clearTimeout(timer);
            } else {
                setIsDeleting(false);
                setLineIndex((prev) => (prev + 1) % lines.length);
            }
        } else {
            if (charIndex < fullText.length) {
                const timer = setTimeout(() => {
                    setCharIndex(charIndex + 1);
                }, 80);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [charIndex, isDeleting, lineIndex]);
    
    // Update displayed text
    useEffect(() => {
        const currentLine = lines[lineIndex];
        if (currentLine) {
            setDisplayedText(currentLine.text.substring(0, charIndex));
        }
    }, [charIndex, lineIndex]);
    
    // Get current line color
    const getCurrentColor = () => {
        return lines[lineIndex]?.color || '#ffffff';
    };

    useEffect(() => {
        // Animation on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    // Scroll to portfolio section when down arrow is clicked
    const scrollToPortfolio = () => {
        const portfolioSection = document.querySelector('.portfolio-container');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Scroll to next (right arrow functionality)
    const scrollToNext = () => {
        const portfolioSection = document.querySelector('.portfolio-container');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const portfolioItems = [
        { id: 1, size: "tall", img: "../../Portfolio/normal_card/1.jpg", title: "Fantasy Warrior" },
        { id: 2, size: "tall",  img: "../../Portfolio/normal_card/2.jpg", title: "Modern Villa" },
        { id: 3, size: "tall", img: "../../Portfolio/normal_card/3.jpg", title: "Product Design" },
        { id: 4, size: "tall", img: "../../Portfolio/normal_card/4.jpg", title: "Character Model" },
        { id: 5, size: "tall", img: "../../Portfolio/normal_card/5.jpg", title: "Environment Art" },
        { id: 6, size: "tall", img: "../../Portfolio/tall_card/1.jpg", title: "Valley Landscape" },
        { id: 10,  img: "../../Portfolio/wide_card/1.jpg", title: "Forest Light" },
        { id: 11,  img: "../../Portfolio/large_card/1.jpg", title: "Forest Light" },
        { id: 12,  img: "../../Portfolio/wide_card/2.jpg", title: "Forest Light" },
        { id: 7, size: "bottom-row", img: "../../Portfolio/bottom_row_card/1.jpg", title: "Desert Panorama" },
        { id: 8, size: "bottom-row", img: "../../Portfolio/bottom_row_card/2.jpg", title: "Aurora Sky" },
        { id: 9, size: "bottom-row", img: "../../Portfolio/bottom_row_card/3.jpg", title: "Misty Mountains" },
     
    ];

    const getSizeClass = (size) => {
        switch(size) {
            case 'tall': return 'size-tall';
            case 'large': return 'size-large';
            case 'wide': return 'size-wide';
            case 'bottom-row': return 'size-bottom-row';
            default: return 'size-normal';
        }
    };

    const getStyle = (size) => {
        if (size === 'wide') {
            return { gridColumn: 'span 2' };
        }
        return {};
    };

    return (
        <>
{/* Hero Section - Services Style */}
<section className="services-hero-section" style={{ paddingTop: '160px', minHeight: '100vh' }}>
    <div className="hero-container">
        <div className="hero-content animate-on-scroll">
            <h1 className="hero-title">
                <span style={{ color: '#ffffff' }}>
                    {lineIndex === 0 ? displayedText : lines[0].text}
                    {lineIndex === 0 && <span className="cursor">|</span>}
                </span>
                <br />
                <span style={{ color: '#ff6600' }}>
                    {lineIndex === 1 ? displayedText : (lineIndex > 1 ? lines[1].text : '')}
                    {lineIndex === 1 && <span className="cursor">|</span>}
                </span>
                <br />
                <span style={{ color: '#ffffff' }}>
                    {lineIndex === 2 ? displayedText : (lineIndex > 2 ? lines[2].text : '')}
                    {lineIndex === 2 && <span className="cursor">|</span>}
                </span>
            </h1>
            <p className="hero-subtitle">
                From concept to final render, we design unique 3D characters 
                that captivate audiences and elevate brands.
            </p>
            <button className="btn-expertise" onClick={scrollToPortfolio}>
                View Our Work
            </button>
        </div>

        {/* Single Image */}
        <div className="animate-on-scroll" style={{ flex: '0.9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div className="orange-radial-glow"></div>
            <img 
                src="../../Portfolio/Banner_R.png" 
                alt="Portfolio Banner" 
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 2,
                    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.7))',
                    transition: 'transform 0.4s ease'
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.02) translateY(-5px)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1) translateY(0)'}
            />
        </div>
    </div>

    {/* Chevron Divider */}
    <div className="chevron-divider-container">
        <div className="orange-chevron-line"></div>
        <div className="white-chevron-block" style={{ backgroundColor: '#f7f7f7' }}></div>
    </div>
</section>

            {/* Portfolio Grid Section */}
            <section className="portfolio-container" ref={portfolioRef}>
                <h2 className="grid-title animate-on-scroll">OUR FEATURED DESIGNS</h2>
                
                <div className="masonry-grid">
                    {portfolioItems.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`grid-card ${getSizeClass(item.size)} animate-on-scroll`}
                            style={getStyle(item.size)}
                        >
                            <div 
                                className="card-img" 
                                style={{ backgroundImage: `url('${item.img}')` }}
                            >
                                <div className="card-overlay">
                                    <div className="card-info">
                                        <h3>{item.title}</h3>
                                        <button className="view-btn">View Project <i className="fa-solid fa-arrow-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="center-action-block animate-on-scroll">
                    <button className="capsule-btn">View All Projects</button>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="form-contact-section">
                <div className="form-dark-overlay"></div>
                <div className="form-section-container animate-on-scroll">
                    <h2 className="form-main-heading">
                        YOUR VISION,<br />
                        OUR <span className="accent-orange-text">3D EXPERTISE</span>
                    </h2>

                    <form className="inline-capture-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-pill-group">
                            <input type="text" name="name" className="capsule-input-field" placeholder="NAME" required />
                        </div>
                        <div className="input-pill-group">
                            <input type="email" name="email" className="capsule-input-field" placeholder="EMAIL" required />
                        </div>
                        <div className="input-pill-group">
                            <input type="tel" name="phone" className="capsule-input-field" placeholder="NUMBER" required />
                        </div>
                        <div className="button-pill-group">
                            <button type="submit" className="btn-submit-pill">CONTACT</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default PortfolioPage;