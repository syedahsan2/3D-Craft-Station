import './StayConnected.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const socialLinks = [
  { id: 1, icon: faFacebookF, url: "https://www.facebook.com/3dcraftstation/", label: "Follow us on Facebook" },
  { id: 2, icon: faInstagram, url: "https://www.instagram.com/3dcraftstation/", label: "Follow us on Instagram" },
];

const StayConnected = () => {
  return (
    <section className="stay-connected">
      <div className="stay-connected-container">
        <h3 className="stay-connected-title">STAY CONNECTED</h3>
        <div className="social-icons">
          {socialLinks.map((social) => (
            <a 
              key={social.id} 
              href={social.url} 
              className="social-icon" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={social.label}
            >
              <FontAwesomeIcon icon={social.icon} />
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