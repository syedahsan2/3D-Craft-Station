import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ React Router import
import './CompleteProjects.css';

const projectsData = [
    {
        id: 1,
        title: "Fantasy Character Design",
        category: "Character Modeling",
        image: "../../Home/1.webp",
        client: "Game Studio XYZ",
        year: "2024",
        desc: "High-quality fantasy character design for AAA games.",
        rating: "4.9",
        views: "2.4k",
        saves: "156"
    },
    {
        id: 2,
        title: "Creature Design for Sci-Fi Film",
        category: "3D Rendering",
        image: "../../Home/2.webp",
        client: "Design Hub",
        year: "2024",
        desc: "Stunning creature design for sci-fi film production.",
        rating: "4.8",
        views: "3.1k",
        saves: "203"
    },
    {
        id: 3,
        title: "Product Animation for Marketing",
        category: "Realistic 3D Portrate",
        image: "../../Home/3.webp",
        client: "Brand X",
        year: "2023",
        desc: "Professional product animation for marketing campaigns.",
        rating: "4.7",
        views: "1.8k",
        saves: "98"
    },
    {
        id: 4,
        title: "CAD Modeling for Industrial Design",
        category: "CAD Modeling",
        image: "../../Home/4.webp",
        client: "Tech Innovations",
        year: "2024",
        desc: "Precise CAD modeling for industrial design projects.",
        rating: "4.9",
        views: "5.2k",
        saves: "340"
    },
    {
        id: 5,
        title: "Product Design for Mobile App",
        category: "Game Development",
        image: "../../Home/5.webp",
        client: "Indie Studio",
        year: "2023",
        desc: "Innovative product design for mobile applications.",
        rating: "5.0",
        views: "4.7k",
        saves: "412"
    },
    {
        id: 6,
        title: "Mold Design for Manufacturing",
        category: "Scientific Visualization",
        image: "../../Home/6.webp",
        client: "MediTech",
        year: "2024",
        desc: "Detailed mold design for manufacturing processes.",
        rating: "4.8",
        views: "3.9k",
        saves: "278"
    }
];

const CompleteProjects = ({ onProjectClick }) => {
    const navigate = useNavigate();  // ✅ useNavigate hook
    const [filter, setFilter] = useState('all');
    const categories = ['all', ...new Set(projectsData.map(p => p.category))];

    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    const handleViewProject = (project) => {
        if (onProjectClick) {
            onProjectClick(project);
        }
    };

    // ✅ Navigate to Portfolio page
    const goToPortfolio = () => {
        navigate('/portfolio');
    };

    return (
        <section className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <span className="projects-badge">✦ OUR WORK ✦</span>
                    <h2 className="projects-title">Complete <span className="highlight">Projects</span></h2>
                    <p className="projects-subtitle">Explore our finest 3D creations and animations</p>
                </div>

                <div className="projects-filter">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat === 'all' ? 'All Projects' : cat}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image-wrapper">
                                <img src={project.image} alt={project.title} className="project-image" />
                            </div>
                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-category">{project.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="projects-footer">
                    {/* ✅ View All Projects Button - Portfolio Link */}
                    <button className="projects-loadmore" onClick={goToPortfolio}>
                        View All Projects <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CompleteProjects;