import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scroll direction check
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP - show header
        setIsVisible(true);
      }
      
      // Background change on scroll
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-header" 
      className={`${!isVisible ? 'nav-hidden' : 'nav-visible'} ${isScrolled ? 'nav-scrolled-active' : ''}`}
    >
      <div className="header-inner">
        {/* Logo */}
        <NavLink to="/" className="logo-wrapper" style={{ textDecoration: 'none' }}>
          <div className="logo-box">
            <img src="/Logo.webp" alt="Logo" className="logo-image" />
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end
          >
            Home
            <div className="overlap-squares">
              <div className="square-1"></div>
              <div className="square-2"></div>
            </div>
          </NavLink>
          <NavLink 
            to="/portfolio" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Portfolio
            <div className="overlap-squares">
              <div className="square-1"></div>
              <div className="square-2"></div>
            </div>
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Services
            <div className="overlap-squares">
              <div className="square-1"></div>
              <div className="square-2"></div>
            </div>
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            About
            <div className="overlap-squares">
              <div className="square-1"></div>
              <div className="square-2"></div>
            </div>
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="header-right">
          <NavLink to="/contact" className="contact-btn">
            Contact
          </NavLink>
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink 
          to="/" 
          onClick={closeMobileMenu}
          className={({ isActive }) => isActive ? 'mobile-active' : ''}
          end
        >
          Home
        </NavLink>
        <NavLink 
          to="/portfolio" 
          onClick={closeMobileMenu}
          className={({ isActive }) => isActive ? 'mobile-active' : ''}
        >
          Portfolio
        </NavLink>
        <NavLink 
          to="/services" 
          onClick={closeMobileMenu}
          className={({ isActive }) => isActive ? 'mobile-active' : ''}
        >
          Services
        </NavLink>
        <NavLink 
          to="/about" 
          onClick={closeMobileMenu}
          className={({ isActive }) => isActive ? 'mobile-active' : ''}
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          onClick={closeMobileMenu}
          className="mobile-contact"
        >
          Contact
        </NavLink>
      </div>
    </header>
  );
};

export default Header;