import { useEffect, useRef } from 'react';
import './CarouselModal.css';

const CarouselModal = ({ isOpen, onClose, slide }) => {
    const modalOverlayRef = useRef(null);
    const modal3DImageRef = useRef(null);
    const image3DWrapperRef = useRef(null);
    const modal3DAreaRef = useRef(null);

    // 3D transform states
    const rotXRef = useRef(0);
    const rotYRef = useRef(0);
    const zoomRef = useRef(1);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const rotStartRef = useRef({ x: 0, y: 0 });

    // Update 3D transform
    const update3DTransform = () => {
        if (image3DWrapperRef.current) {
            image3DWrapperRef.current.style.transform = 
                `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg) scale(${zoomRef.current})`;
        }
    };

    // Reset transforms when modal opens
    useEffect(() => {
        if (isOpen) {
            rotXRef.current = 0;
            rotYRef.current = 0;
            zoomRef.current = 1;
            update3DTransform();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Mouse drag controls
    useEffect(() => {
        const area = modal3DAreaRef.current;
        if (!area || !isOpen) return;

        const handleMouseDown = (e) => {
            if (e.target.closest('.modal-close-x')) return;
            isDraggingRef.current = true;
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            rotStartRef.current = { x: rotXRef.current, y: rotYRef.current };
            area.classList.add('grabbing');
            e.preventDefault();
        };

        const handleMouseMove = (e) => {
            if (!isDraggingRef.current) return;
            const deltaX = e.clientX - dragStartRef.current.x;
            const deltaY = e.clientY - dragStartRef.current.y;
            rotXRef.current = rotStartRef.current.x - deltaY * 0.4;
            rotYRef.current = rotStartRef.current.y + deltaX * 0.4;
            update3DTransform();
        };

        const handleMouseUp = () => {
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
                area.classList.remove('grabbing');
            }
        };

        const handleWheel = (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.08 : 0.08;
            zoomRef.current = Math.max(0.5, Math.min(3, zoomRef.current + delta));
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
    }, [isOpen]);

    // Keyboard close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === modalOverlayRef.current) {
            onClose();
        }
    };

    if (!isOpen || !slide) return null;

    return (
        <div 
            className={`modal-overlay ${isOpen ? 'active' : ''}`} 
            ref={modalOverlayRef}
            onClick={handleOverlayClick}
        >
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Left: 3D Image Area */}
                <div className="modal-3d-area" ref={modal3DAreaRef}>
                    <div className="image-3d-wrapper" ref={image3DWrapperRef}>
                        <img src={slide.image} alt="3D View" ref={modal3DImageRef} />
                    </div>
                    <button className="modal-close-x" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-controls-hint">
                        <span><i className="fa-solid fa-arrows-left-right"></i> Drag</span>
                        <span><i className="fa-solid fa-arrows-up-down"></i> Tilt</span>
                        <span><i className="fa-solid fa-magnifying-glass"></i> Scroll</span>
                    </div>
                </div>

                {/* Right: Details */}
                <div className="modal-details">
                    <div className="modal-badge">3D CRAFT STATION</div>
                    <h2 className="modal-title">{slide.title || '3D Model'}</h2>
                    <div className="modal-location">
                        <i className="fa-solid fa-cube"></i>
                        <span>{slide.subtitle || 'Premium Quality'}</span>
                    </div>
                    <p className="modal-desc">{slide.desc || 'High-quality 3D model crafted with attention to detail.'}</p>
                    <div className="detail-stats">
                        <div className="stat-item">
                            <div className="stat-value">{slide.rating || '4.9'}</div>
                            <div className="stat-label">Rating</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{slide.views || '2.4k'}</div>
                            <div className="stat-label">Views</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">{slide.saves || '156'}</div>
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

export default CarouselModal;