import { useEffect } from 'react';
import CharacterSlider from '../components/CharacterSlider/CharacterSlider';
import CompleteProjects from '../components/CompleteProjects/CompleteProjects';
import Testimonials from '../components/Testimonials/Testimonials';
import WorldSection from '../components/WorldSection/WorldSection';
import FeaturedDesigns from '../components/FeaturedDesigns/FeaturedDesigns';
import StayConnected from '../components/StayConnected/StayConnected';
import StatsBanner from '../components/StatsBanner/StatsBanner';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>3D Craft Station - Premium 3D Design Studio | Character Modeling & Animation</title>
        <meta name="description" content="3D Craft Station offers professional 3D modeling, character design, animation & product visualization services. Custom 3D solutions for gaming, film & product design." />
      </Helmet>
      <main>
        <CharacterSlider />

      <div className="reveal-section">
        <StatsBanner />
      </div>
      
        <div className="reveal-section">
          <CompleteProjects />
        </div>

        <div className="reveal-section">
          <Testimonials />
        </div>

        <div className="reveal-section">
          <WorldSection />
        </div>

        <div className="reveal-section">
          <FeaturedDesigns />
        </div>

        <div className="reveal-section">
          <StayConnected />
        </div>



      </main>
    </>
  );
};

export default HomePage;