import { useNavigate } from 'react-router-dom';  // ✅ React Router import
import './FeaturedDesigns.css';

const designsData = [
  { id: 1, img: "../../Home/feature/1.webp" },
  { id: 2, img: "../../Home/feature/2.webp" },
  { id: 3, img: "../../Home/feature/3.webp" },
  { id: 4, img: "../../Home/feature/4.webp" },
  { id: 5, img: "../../Home/feature/5.webp" },
  { id: 6, img: "../../Home/feature/6.webp" },
  { id: 7, img: "../../Home/feature/7.webp" },
  { id: 8, img: "../../Home/feature/8.webp" }
];

const FeaturedDesigns = () => {
  const navigate = useNavigate();  // ✅ useNavigate hook

  // ✅ Navigate to Portfolio page
  const goToPortfolio = () => {
    navigate('/portfolio');
  };

  return (
    <section className="featured-section">
      <div className="featured-container">
        <h2 className="featured-title">OUR FEATURED DESIGNS</h2>
        <div className="featured-grid">
          {designsData.map((design) => (
            <div key={design.id} className="featured-card">
              <img src={design.img} alt={`Design ${design.id}`} className="featured-img" />
            </div>
          ))}
        </div>
        <div>
          {/* ✅ See All Designs Button - Portfolio Link */}
          <button className="featured-btn" onClick={goToPortfolio}>
            See All Designs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;