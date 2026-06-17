import { useState } from 'react';
import './CompleteProjects.css';

const projectsData = [
    {
        id: 1,
        title: "Fantasy Character Design",
        category: "Character Modeling",
        image: "../../Home/1.jpg",
        client: "Game Studio XYZ",
        year: "2024"
    },
    {
        id: 2,
        title: "Creature Design for Sci-Fi Film",
        category: "3D Rendering",
        image: "../../Home/2.jpg",
        client: "Design Hub",
        year: "2024"
    },
    {
        id: 3,
        title: "Product Animation for Marketing",
        category: "Realistic 3D Portrate",
        image: "../../Home/3.jpg",
        client: "Brand X",
        year: "2023"
    },
    {
        id: 4,
        title: "CAD Modeling for Industrial Design",
        category: "CAD Modeling",
        image: "../../Home/4.jpg",
        client: "Tech Innovations",
        year: "2024"
    },
    {
        id: 5,
        title: "Product Design for Mobile App",
        category: "Game Development",
        image: "../../Home/5.jpg",
        client: "Indie Studio",
        year: "2023"
    },
    {
        id: 6,
        title: "Mold Design for Manufacturing",
        category: "Scientific Visualization",
        image: "../../Home/6.jpg",
        client: "MediTech",
        year: "2024"
    }
];

const CompleteProjects = () => {
    const [filter, setFilter] = useState('all');
    const categories = ['all', ...new Set(projectsData.map(p => p.category))];

    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

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
                                <div className="project-overlay">
                                    <button className="project-view-btn">
                                        <i className="fa-solid fa-eye"></i> View Project
                                    </button>
                                </div>
                            </div>
                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-category">{project.category}</p>
                                <div className="project-meta">
                                    <span><i className="fa-regular fa-building"></i> {project.client}</span>
                                    <span><i className="fa-regular fa-calendar"></i> {project.year}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="projects-footer">
                    <button className="projects-loadmore">
                        View All Projects <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CompleteProjects;