import './FeaturedDesigns.css';

const designsData = [
  { id: 1, img: "../../Home/feature/1.jpg" },
  { id: 2, img: "../../Home/feature/2.jpg" },
  { id: 3, img: "../../Home/feature/3.jpg" },
  { id: 4, img: "../../Home/feature/4.jpg" },
  { id: 5, img: "../../Home/feature/5.jpg" },
  { id: 6, img: "../../Home/feature/6.jpg" },
  { id: 7, img: "../../Home/feature/7.jpg" },
  { id: 8, img: "../../Home/feature/8.jpg" }
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