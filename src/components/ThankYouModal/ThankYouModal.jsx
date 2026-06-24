import { useEffect, useRef } from 'react';
import './ThankYouModal.css';

const ThankYouModal = ({ isOpen, onClose, userName, userEmail, type = 'contact' }) => {
    const modalRef = useRef(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    // ✅ Different messages for contact vs newsletter
    const isNewsletter = type === 'newsletter';
    const title = isNewsletter ? 'WELCOME ABOARD!' : `THANK YOU, ${userName || 'FRIEND'}!`;
    const subtitle = isNewsletter 
        ? 'You have successfully subscribed to our newsletter! 🎉'
        : 'Your message has been received successfully.';
    const message = isNewsletter
        ? 'Check your inbox for a confirmation email. We\'ll keep you updated with the latest 3D designs and offers.'
        : 'Our team will get back to you within 24-48 hours. A confirmation email has been sent to your inbox.';

    return (
        <div className="thankyou-overlay" ref={modalRef} onClick={handleOverlayClick}>
            <div className="thankyou-modal">
                {/* Animated Squares */}
                <div className="thankyou-squares">
                    <div className="square-1"></div>
                    <div className="square-2"></div>
                    <div className="square-3"></div>
                    <div className="square-4"></div>
                </div>

                <div className="thankyou-content">
                    <div className="thankyou-icon">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="45" stroke="#FF7A00" strokeWidth="3"/>
                            <path d="M30 50L45 65L70 35" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="50" cy="50" r="48" stroke="#FF7A00" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"/>
                        </svg>
                    </div>

                    <h2 className="thankyou-title">
                        {title}
                    </h2>
                    
                    <p className="thankyou-subtitle">{subtitle}</p>
                    
                    <div className="thankyou-message">
                        <p>{message}</p>
                        {isNewsletter && userEmail && (
                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '10px' }}>
                                📧 <strong>{userEmail}</strong>
                            </p>
                        )}
                    </div>

                    <button className="thankyou-btn" onClick={onClose}>
                        <span>Continue</span>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>

                {/* Floating Squares */}
                <div className="floating-squares">
                    <div className="float-square s1"></div>
                    <div className="float-square s2"></div>
                    <div className="float-square s3"></div>
                    <div className="float-square s4"></div>
                    <div className="float-square s5"></div>
                    <div className="float-square s6"></div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouModal;