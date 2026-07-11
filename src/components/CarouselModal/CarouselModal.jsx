import './CarouselModal.css';

const CarouselModal = ({ isOpen, onClose, slide }) => {
    if (!isOpen || !slide) return null;

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-3d-area">
                    <div className="image-3d-wrapper">
                        <img src={slide.image} alt={slide.title} />
                    </div>
                    <button className="modal-close-x" onClick={onClose}>✕</button>
                </div>
                <div className="modal-details">
                    <h2>{slide.title}</h2>
                    <h3>{slide.subtitle}</h3>
                    <p>{slide.desc}</p>
                    <div className="modal-stats">
                        <span>⭐ {slide.rating}</span>
                        <span>👁️ {slide.views}</span>
                        <span>💾 {slide.saves}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselModal;