import './HeroGallery.css';

const HeroGallery = () => {
  return (
    <div className="hero-gallery-wrapper">
      <div className="hero-gallery-content">
        <div className="hero-gallery-banner">
          <div className="hero-banner-text">
            <h3>✨ EPIC CHARACTERS ✨</h3>
            <p>Discover the <span className="highlight">legendary warriors</span> from ancient realms</p>
            <p>Each hero carries a <span className="highlight">unique power</span> waiting to be unleashed</p>
            <p>Join the adventure and <span className="highlight">claim your destiny</span> today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;