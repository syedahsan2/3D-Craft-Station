import { useState } from 'react';
import './CompleteProjects.css';

const projectsData = [
    {
        id: 1,
        title: "3D Character Design",
        category: "Character Modeling",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
        client: "Game Studio XYZ",
        year: "2024"
    },
    {
        id: 2,
        title: "Architectural Visualization",
        category: "3D Rendering",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
        client: "Design Hub",
        year: "2024"
    },
    {
        id: 3,
        title: "Product Animation",
        category: "Motion Graphics",
        image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=600&q=80",
        client: "Brand X",
        year: "2023"
    },
    {
        id: 4,
        title: "VR Environment",
        category: "Virtual Reality",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=600&q=80",
        client: "Tech Innovations",
        year: "2024"
    },
    {
        id: 5,
        title: "Game Asset Pack",
        category: "Game Development",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80",
        client: "Indie Studio",
        year: "2023"
    },
    {
        id: 6,
        title: "Medical 3D Model",
        category: "Scientific Visualization",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
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