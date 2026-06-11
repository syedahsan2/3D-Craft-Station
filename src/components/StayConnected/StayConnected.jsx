import './StayConnected.css';

const socialLinks = [
  { id: 1, icon: "fa-brands fa-x-twitter", url: "#" },
  { id: 2, icon: "fa-brands fa-instagram", url: "#" },
  { id: 3, icon: "fa-brands fa-facebook-f", url: "#" },
  { id: 4, icon: "fa-brands fa-youtube", url: "#" },
  { id: 5, icon: "fa-brands fa-linkedin-in", url: "#" }
];

const StayConnected = () => {
  return (
    <section className="stay-connected">
      <div className="stay-connected-container">
        <h3 className="stay-connected-title">STAY CONNECTED</h3>
        <div className="social-icons">
          {socialLinks.map((social) => (
            <a key={social.id} href={social.url} className="social-icon" aria-label="Social link">
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
        <p className="stay-connected-text">
          Follow us for latest updates and 3D art inspiration
        </p>
      </div>
    </section>
  );
};

export default StayConnected;