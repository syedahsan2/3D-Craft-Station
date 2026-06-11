import './FeaturedDesigns.css';

const designsData = [
  { id: 1, img: "../../Home/fantasy_warrior.png" },
  { id: 2, img: "../../Home/misty_mountains.png" },
  { id: 3, img: "../../Home/modern_villa.png" },
  { id: 4, img: "../../Home/character_model.png" },
  { id: 5, img: "../../Home/environment_art.png" },
  { id: 6, img: "../../Home/valley_landscape_2.png" },
  { id: 7, img: "../../Home/potrait.png" },
  { id: 8, img: "../../Home/modern_villa.png" }
];

const FeaturedDesigns = () => {
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
          <button className="featured-btn">See All Designs</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;