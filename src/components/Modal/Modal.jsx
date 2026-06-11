import { useState, useEffect, useRef, useCallback } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, slideData, slideIndex, slidesData }) => {
    const [rotX, setRotX] = useState(0);
    const [rotY, setRotY] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [rotStart, setRotStart] = useState({ x: 0, y: 0 });
    
    const imageWrapperRef = useRef(null);
    const modalAreaRef = useRef(null);
    
    // Update transform
    const updateTransform = useCallback(() => {
        if (imageWrapperRef.current) {
            imageWrapperRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${zoom})`;
        }
    }, [rotX, rotY, zoom]);
    
    // Reset transforms when modal opens
    useEffect(() => {
        if (isOpen) {
            setRotX(0);
            setRotY(0);
            setZoom(1);
            updateTransform();
        }
    }, [isOpen, updateTransform]);
    
    // Apply transform
    useEffect(() => {
        updateTransform();
    }, [rotX, rotY, zoom, updateTransform]);
    
    // Mouse/Touch drag for rotation
    useEffect(() => {
        const area = modalAreaRef.current;
        if (!area || !isOpen) return;
        
        const handleMouseDown = (e) => {
            if (e.target.closest('.modal-close-x')) return;
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            setRotStart({ x: rotX, y: rotY });
            area.classList.add('grabbing');
            e.preventDefault();
        };
        
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const newRotX = rotStart.x - (e.clientY - dragStart.y) * 0.4;
            const newRotY = rotStart.y + (e.clientX - dragStart.x) * 0.4;
            setRotX(newRotX);
            setRotY(newRotY);
        };
        
        const handleMouseUp = () => {
            setIsDragging(false);
            area.classList.remove('grabbing');
        };
        
        const handleTouchStart = (e) => {
            if (e.target.closest('.modal-close-x')) return;
            if (e.touches.length === 1) {
                setIsDragging(true);
                setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
                setRotStart({ x: rotX, y: rotY });
            }
        };
        
        const handleTouchMove = (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const newRotX = rotStart.x - (e.touches[0].clientY - dragStart.y) * 0.4;
            const newRotY = rotStart.y + (e.touches[0].clientX - dragStart.x) * 0.4;
            setRotX(newRotX);
            setRotY(newRotY);
            e.preventDefault();
        };
        
        const handleTouchEnd = () => {
            setIsDragging(false);
        };
        
        const handleWheel = (e) => {
            e.preventDefault();
            setZoom(prev => Math.max(0.5, Math.min(3, prev + (e.deltaY > 0 ? -0.08 : 0.08))));
        };
        
        area.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        area.addEventListener('touchstart', handleTouchStart, { passive: false });
        area.addEventListener('touchmove', handleTouchMove, { passive: false });
        area.addEventListener('touchend', handleTouchEnd);
        area.addEventListener('wheel', handleWheel, { passive: false });
        
        return () => {
            area.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            area.removeEventListener('touchstart', handleTouchStart);
            area.removeEventListener('touchmove', handleTouchMove);
            area.removeEventListener('touchend', handleTouchEnd);
            area.removeEventListener('wheel', handleWheel);
        };
    }, [isOpen, isDragging, dragStart, rotStart, rotX, rotY]);
    
    // ESC key handler
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);
    
    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
    
    if (!isOpen || !slideData) return null;
    
    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-3d-area" ref={modalAreaRef}>
                    <div className="image-3d-wrapper" ref={imageWrapperRef}>
                        <img src={slideData.image} alt={slideData.title} />
                    </div>
                    <button className="modal-close-x" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-controls-hint">
                        <div className="hint-item"><i className="fa-solid fa-arrows-left-right"></i> Drag</div>
                        <div className="hint-item"><i className="fa-solid fa-arrows-up-down"></i> Tilt</div>
                        <div className="hint-item"><i className="fa-solid fa-magnifying-glass"></i> Scroll</div>
                    </div>
                </div>
                <div className="modal-details">
                    <div className="modal-badge">Featured</div>
                    <h2>{slideData.title}</h2>
                    <div className="modal-location">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{slideData.location || slideData.subtitle}</span>
                    </div>
                    <p className="modal-desc">{slideData.desc || 'Experience this stunning 3D view with interactive controls. Drag to rotate, scroll to zoom.'}</p>
                    <div className="detail-stats">
                        <div className="stat-item">
                            <div className="stat-value">{slideData.rating || '4.8'}</div>
                            <div className="stat-label">Rating</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{slideData.views || '10.2K'}</div>
                            <div className="stat-label">Views</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{slideData.saves || '2.1K'}</div>
                            <div className="stat-label">Saves</div>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button className="modal-btn btn-outline" onClick={onClose}>Close</button>
                        <button className="modal-btn btn-primary">
                            <i className="fa-solid fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;