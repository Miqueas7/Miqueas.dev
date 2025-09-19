// =============================================
// PROJECTS MANAGEMENT SYSTEM
// =============================================

class ProjectsManager {
  constructor() {
    this.projects = [];
    this.filteredProjects = [];
    this.currentFilter = "all";
    this.projectsContainer = null;
    this.init();
  }

  async init() {
    await this.loadProjects();
    this.setupFilters();
    this.setupModal();
    this.renderProjects();
  }

  // =============================================
  // Load Projects Data
  // =============================================
  async loadProjects() {
    // In a real application, this would fetch from an API or JSON file
    this.projects = [
      {
        id: 1,
        title: "Software Creación Masiva de Planos MTC",
        shortTitle: "Planos MTC",
        description:
          "Sistema automatizado para generar 700+ planos técnicos en minutos con detección de riesgo geológico mediante ML",
        longDescription: `
                    Lideré el desarrollo de un software revolucionario para la industria de construcción vial 
                    que automatiza completamente la creación de planos técnicos, archivos SHP, KML y memorias 
                    descriptivas. El sistema incluye integración con la plataforma del MTC mediante web scraping 
                    y utiliza Machine Learning para detectar zonas de alto riesgo geológico.
                `,
        category: "automation",
        featured: true,
        technologies: [
          "Python",
          "C#",
          "Machine Learning",
          "Selenium",
          "MySQL",
          "ChatGPT API",
        ],
        achievements: [
          "700+ planos generados en minutos",
          "Integración con plataforma MTC",
          "Modelo ML para riesgo geológico",
          "95% reducción en tiempo de procesamiento",
        ],
        metrics: {
          efficiency: "95%",
          accuracy: "99.9%",
          timesSaved: "120hrs/month",
          roi: "400%",
        },
        github: "https://github.com/Miqueas7/Repositorio-Freelancer",
        demo: null,
        images: [
          "assets/img/projects/mtc-1.jpg",
          "assets/img/projects/mtc-2.jpg",
        ],
        year: "2024-2025",
        status: "active",
        client: "Confidential",
        role: "Tech Lead & Developer",
      },
      {
        id: 2,
        title: "ML para Sostenimiento Minero",
        shortTitle: "ML Mining Support",
        description:
          "Modelo predictivo para selección óptima de sostenimiento en Unidad Minera Catalina Huanca",
        longDescription: `
                    Desarrollé un modelo de Machine Learning que predice el tipo óptimo de sostenimiento 
                    requerido en diferentes zonas de la mina basándose en parámetros geomecánicos, 
                    históricos de incidentes y condiciones geológicas. El sistema procesa más de 10,000 
                    puntos de datos históricos para generar predicciones con 92% de precisión.
                `,
        category: "ml",
        featured: true,
        technologies: [
          "TensorFlow",
          "Python",
          "Scikit-learn",
          "Pandas",
          "NumPy",
          "Jupyter",
        ],
        achievements: [
          "92% precisión en predicciones",
          "30% reducción en costos",
          "10,000+ datos procesados",
          "Implementación en producción",
        ],
        metrics: {
          accuracy: "92%",
          costReduction: "30%",
          dataPoints: "10,000+",
          trainingTime: "48hrs",
        },
        github: "#",
        demo: "#",
        images: ["assets/img/projects/ml-mining.jpg"],
        year: "2023",
        status: "completed",
        client: "UM Catalina Huanca",
        role: "ML Engineer",
      },
      {
        id: 3,
        title: "Sistema de Ventilación Minera",
        shortTitle: "Mining Ventilation",
        description:
          "Software para cálculo de cobertura de aire según normativa DS 023-2017 EM",
        longDescription: `
                    Software especializado para el cálculo automático de requerimientos de ventilación 
                    en operaciones mineras subterráneas, asegurando el cumplimiento de la normativa 
                    peruana DS 023-2017 EM. Incluye generación automática de reportes para auditorías 
                    y simulación de diferentes escenarios.
                `,
        category: "mining",
        featured: true,
        technologies: ["Python", "VentSim", "Excel", "VBA", "PyQt5"],
        achievements: [
          "100% cumplimiento normativo",
          "Cálculos automáticos complejos",
          "Reportes para auditorías",
          "Interfaz intuitiva",
        ],
        metrics: {
          compliance: "100%",
          calculations: "50+/día",
          timeSaved: "80%",
          accuracy: "99.9%",
        },
        github: "#",
        demo: "#",
        images: ["assets/img/projects/ventilation.jpg"],
        year: "2023",
        status: "completed",
        client: "VPS Consulting",
        role: "Software Developer",
      },
      {
        id: 4,
        title: "Sistema Gestor de Aceros RockTools",
        shortTitle: "RockTools Manager",
        description:
          "Plataforma de gestión con base de datos en la nube para control de inventario",
        longDescription: `
                    Sistema integral de gestión de inventario para aceros de perforación con 
                    sincronización en tiempo real, dashboard analítico y alertas automáticas. 
                    La plataforma redujo las pérdidas por mal manejo en un 40% y mejoró 
                    significativamente el control de inventario.
                `,
        category: "software",
        featured: false,
        technologies: ["C#", ".NET", "MySQL", "Azure", "Blazor", "SignalR"],
        achievements: [
          "Control en tiempo real",
          "40% reducción en pérdidas",
          "Dashboard analítico",
          "Alertas automáticas",
        ],
        metrics: {
          uptime: "99.9%",
          responseTime: "<100ms",
          users: "50+",
          dataSync: "Real-time",
        },
        github: "#",
        demo: "#",
        images: ["assets/img/projects/rocktools.jpg"],
        year: "2023",
        status: "completed",
        client: "RockTools",
        role: "Full Stack Developer",
      },
      {
        id: 5,
        title: "Automatización Geotécnica",
        shortTitle: "Geotech Automation",
        description:
          "Suite de herramientas para automatización de ensayos y reportes geotécnicos",
        longDescription: `
                    Suite completa de automatización para laboratorios geotécnicos que incluye 
                    procesamiento de datos de ensayos, generación automática de gráficos y planos 
                    en AutoCAD, y creación de reportes según normativas ASTM y NTP. El sistema 
                    redujo el tiempo de procesamiento en un 50%.
                `,
        category: "automation",
        featured: false,
        technologies: [
          "Python",
          "Excel",
          "AutoCAD",
          "VBA",
          "XML",
          "Visual LISP",
        ],
        achievements: [
          "50% reducción en tiempo",
          "Cumplimiento ASTM/NTP",
          "Planos automáticos",
          "100% precisión",
        ],
        metrics: {
          efficiency: "50%",
          standards: "ASTM/NTP",
          dailyReports: "20+",
          errorRate: "0%",
        },
        github: "https://github.com/Miqueas7/Repositorio-Freelancer",
        demo: "#",
        images: ["assets/img/projects/geotech.jpg"],
        year: "2021-2022",
        status: "completed",
        client: "JR Geoconsultores",
        role: "Lead Developer",
      },
      {
        id: 6,
        title: "Algoritmo Búsqueda Tabú - Redes de Tuberías",
        shortTitle: "Tabu Search Networks",
        description:
          "Optimización de redes de distribución de agua mediante algoritmo de búsqueda tabú",
        longDescription: `
                    Implementación de algoritmo de búsqueda tabú para optimizar el diseño de 
                    redes de tuberías en proyectos de distribución de agua. El algoritmo considera 
                    múltiples variables como presión, caudal, diámetros y costos para encontrar 
                    la solución óptima.
                `,
        category: "optimization",
        featured: false,
        technologies: ["Python", "NetworkX", "NumPy", "Matplotlib"],
        achievements: [
          "25% reducción en costos",
          "Solución óptima garantizada",
          "Procesamiento paralelo",
          "Visualización interactiva",
        ],
        metrics: {
          optimization: "25%",
          iterations: "10,000+",
          variables: "50+",
          runtime: "<5min",
        },
        github: "#",
        demo: "#",
        images: ["assets/img/projects/tabu.jpg"],
        year: "2023",
        status: "completed",
        client: "EDT Consulting",
        role: "Algorithm Developer",
      },
    ];

    this.filteredProjects = [...this.projects];
  }

  // =============================================
  // Setup Filters
  // =============================================
  setupFilters() {
    // Create filter buttons if they don't exist
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "projects-filters";
    filtersContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">
                <i class="fas fa-th"></i> Todos
                <span class="filter-count">${this.projects.length}</span>
            </button>
            <button class="filter-btn" data-filter="automation">
                <i class="fas fa-robot"></i> Automatización
                <span class="filter-count">${
                  this.getProjectsByCategory("automation").length
                }</span>
            </button>
            <button class="filter-btn" data-filter="ml">
                <i class="fas fa-brain"></i> Machine Learning
                <span class="filter-count">${
                  this.getProjectsByCategory("ml").length
                }</span>
            </button>
            <button class="filter-btn" data-filter="mining">
                <i class="fas fa-hard-hat"></i> Minería
                <span class="filter-count">${
                  this.getProjectsByCategory("mining").length
                }</span>
            </button>
            <button class="filter-btn" data-filter="software">
                <i class="fas fa-code"></i> Software
                <span class="filter-count">${
                  this.getProjectsByCategory("software").length
                }</span>
            </button>
        `;

    // Insert filters before projects grid
    const projectsSection = document.getElementById("projects");
    const projectsGrid = document.getElementById("projectsGrid");

    if (
      projectsSection &&
      projectsGrid &&
      !document.querySelector(".projects-filters")
    ) {
      projectsGrid.parentNode.insertBefore(filtersContainer, projectsGrid);
    }

    // Add event listeners
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterProjects(btn.dataset.filter);
        this.updateActiveFilter(btn);
      });
    });
  }

  getProjectsByCategory(category) {
    if (category === "all") return this.projects;
    return this.projects.filter((p) => p.category === category);
  }

  filterProjects(category) {
    this.currentFilter = category;

    if (category === "all") {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(
        (p) => p.category === category
      );
    }

    this.renderProjects(true);
  }

  updateActiveFilter(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    activeBtn.classList.add("active");
  }

  // =============================================
  // Render Projects
  // =============================================
  renderProjects(animate = false) {
    const container = document.getElementById("projectsGrid");
    if (!container) return;

    // Clear container with fade out
    if (animate) {
      container.style.opacity = "0";
      setTimeout(() => {
        this.renderProjectCards(container);
        container.style.opacity = "1";
      }, 300);
    } else {
      this.renderProjectCards(container);
    }
  }

  renderProjectCards(container) {
    container.innerHTML = this.filteredProjects
      .map(
        (project, index) => `
            <div class="project-card ${project.featured ? "featured" : ""}" 
                 data-category="${project.category}"
                 data-project-id="${project.id}"
                 style="animation-delay: ${index * 100}ms">
                ${
                  project.featured
                    ? '<div class="featured-badge">⭐ Destacado</div>'
                    : ""
                }
                
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <div class="project-links">
                        ${
                          project.github !== "#"
                            ? `
                            <a href="${project.github}" target="_blank" aria-label="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                        `
                            : ""
                        }
                        ${
                          project.demo
                            ? `
                            <a href="${project.demo}" target="_blank" aria-label="Demo">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        `
                            : ""
                        }
                        <button class="project-detail-btn" data-project-id="${
                          project.id
                        }" aria-label="Ver detalles">
                            <i class="fas fa-info-circle"></i>
                        </button>
                    </div>
                </div>
                
                <p class="project-description">${project.description}</p>
                
                <div class="project-achievements">
                    ${project.achievements
                      .slice(0, 2)
                      .map(
                        (achievement) => `
                        <div class="achievement-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${achievement}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                
                <div class="project-footer">
                    <div class="project-tech">
                        ${project.technologies
                          .slice(0, 4)
                          .map(
                            (tech) => `
                            <span class="tech-tag" title="${tech}">${tech}</span>
                        `
                          )
                          .join("")}
                        ${
                          project.technologies.length > 4
                            ? `
                            <span class="tech-tag more">+${
                              project.technologies.length - 4
                            }</span>
                        `
                            : ""
                        }
                    </div>
                    <span class="project-year">${project.year}</span>
                </div>
                
                <div class="project-status status-${project.status}">
                    <span class="status-dot"></span>
                    ${
                      project.status === "active"
                        ? "En desarrollo"
                        : "Completado"
                    }
                </div>
            </div>
        `
      )
      .join("");

    // Add event listeners for detail buttons
    container.querySelectorAll(".project-detail-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const projectId = parseInt(btn.dataset.projectId);
        this.showProjectModal(projectId);
      });
    });

    // Add click event to cards
    container.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!e.target.closest("a") && !e.target.closest("button")) {
          const projectId = parseInt(card.dataset.projectId);
          this.showProjectModal(projectId);
        }
      });
    });
  }

  // =============================================
  // Project Modal
  // =============================================
  setupModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById("projectModal")) {
      const modal = document.createElement("div");
      modal.id = "projectModal";
      modal.className = "project-modal";
      modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="modal-close" aria-label="Cerrar">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-body" id="modalBody">
                        <!-- Content will be inserted here -->
                    </div>
                </div>
            `;
      document.body.appendChild(modal);

      // Close modal events
      modal.querySelector(".modal-overlay").addEventListener("click", () => {
        this.closeModal();
      });

      modal.querySelector(".modal-close").addEventListener("click", () => {
        this.closeModal();
      });

      // ESC key to close
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          this.closeModal();
        }
      });
    }
  }

  showProjectModal(projectId) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById("projectModal");
    const modalBody = document.getElementById("modalBody");

    modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${project.title}</h2>
                <div class="modal-badges">
                    <span class="badge badge-${project.status}">
                        ${
                          project.status === "active"
                            ? "En desarrollo"
                            : "Completado"
                        }
                    </span>
                    <span class="badge badge-year">${project.year}</span>
                    ${
                      project.featured
                        ? '<span class="badge badge-featured">⭐ Destacado</span>'
                        : ""
                    }
                </div>
            </div>
            
            <div class="modal-info">
                <div class="info-item">
                    <i class="fas fa-user-tie"></i>
                    <div>
                        <span class="info-label">Rol</span>
                        <span class="info-value">${project.role}</span>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-building"></i>
                    <div>
                        <span class="info-label">Cliente</span>
                        <span class="info-value">${project.client}</span>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-tag"></i>
                    <div>
                        <span class="info-label">Categoría</span>
                        <span class="info-value">${this.getCategoryName(
                          project.category
                        )}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>Descripción</h3>
                <p>${project.longDescription}</p>
            </div>
            
            <div class="modal-achievements">
                <h3>Logros Principales</h3>
                <div class="achievements-grid">
                    ${project.achievements
                      .map(
                        (achievement) => `
                        <div class="achievement-card">
                            <i class="fas fa-trophy"></i>
                            <p>${achievement}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="modal-metrics">
                <h3>Métricas de Impacto</h3>
                <div class="metrics-grid">
                    ${Object.entries(project.metrics)
                      .map(
                        ([key, value]) => `
                        <div class="metric-card">
                            <span class="metric-value">${value}</span>
                            <span class="metric-label">${this.getMetricLabel(
                              key
                            )}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="modal-technologies">
                <h3>Stack Tecnológico</h3>
                <div class="tech-grid">
                    ${project.technologies
                      .map(
                        (tech) => `
                        <div class="tech-item">
                            <i class="${this.getTechIcon(tech)}"></i>
                            <span>${tech}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="modal-actions">
                ${
                  project.github !== "#"
                    ? `
                    <a href="${project.github}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-github"></i>
                        Ver en GitHub
                    </a>
                `
                    : ""
                }
                ${
                  project.demo
                    ? `
                    <a href="${project.demo}" target="_blank" class="btn btn-secondary">
                        <i class="fas fa-external-link-alt"></i>
                        Ver Demo
                    </a>
                `
                    : ""
                }
                <button class="btn btn-outline" onclick="projectsManager.closeModal()">
                    Cerrar
                </button>
            </div>
        `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    const modal = document.getElementById("projectModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // =============================================
  // Utility Methods
  // =============================================
  getCategoryName(category) {
    const names = {
      automation: "Automatización",
      ml: "Machine Learning",
      mining: "Minería",
      software: "Software",
      optimization: "Optimización",
    };
    return names[category] || category;
  }

  getMetricLabel(key) {
    const labels = {
      efficiency: "Eficiencia",
      accuracy: "Precisión",
      timesSaved: "Tiempo Ahorrado",
      roi: "ROI",
      costReduction: "Reducción de Costos",
      dataPoints: "Datos Procesados",
      trainingTime: "Tiempo de Entrenamiento",
      compliance: "Cumplimiento",
      calculations: "Cálculos",
      timeSaved: "Tiempo Ahorrado",
      uptime: "Disponibilidad",
      responseTime: "Tiempo de Respuesta",
      users: "Usuarios",
      dataSync: "Sincronización",
      standards: "Estándares",
      dailyReports: "Reportes Diarios",
      errorRate: "Tasa de Error",
      optimization: "Optimización",
      iterations: "Iteraciones",
      variables: "Variables",
      runtime: "Tiempo de Ejecución",
    };
    return labels[key] || key;
  }

  getTechIcon(tech) {
    const icons = {
      Python: "fab fa-python",
      "C#": "fas fa-code",
      ".NET": "fab fa-microsoft",
      JavaScript: "fab fa-js",
      React: "fab fa-react",
      TensorFlow: "fas fa-brain",
      MySQL: "fas fa-database",
      Azure: "fab fa-microsoft",
      Git: "fab fa-git",
      GitHub: "fab fa-github",
      Docker: "fab fa-docker",
      AWS: "fab fa-aws",
    };

    // Default icon for technologies not in the list
    return icons[tech] || "fas fa-cog";
  }
}

// =============================================
// Initialize Projects Manager
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  window.projectsManager = new ProjectsManager();
});

// =============================================
// Project Modal Styles
// =============================================
const projectStyles = `
<style>
/* Project Card Enhancements */
.project-card {
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
}

.project-card.featured {
    border: 2px solid var(--copper);
}

.featured-badge {
    position: absolute;
    top: -10px;
    right: 20px;
    background: var(--gold);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
}

.achievement-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.achievement-item i {
    color: var(--emerald);
    flex-shrink: 0;
}

.project-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.project-year {
    color: var(--text-muted);
    font-size: 0.875rem;
}

.project-status {
    position: absolute;
    bottom: 10px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.75rem;
    color: var(--text-muted);
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-muted);
    animation: pulse 2s infinite;
}

.status-active .status-dot {
    background: var(--emerald);
}

.status-completed .status-dot {
    background: var(--copper);
    animation: none;
}

/* Filter Count */
.filter-count {
    background: rgba(184, 115, 51, 0.2);
    color: var(--copper);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    margin-left: 5px;
}

/* Project Modal */
.project-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 5000;
}

.project-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: relative;
    background: var(--carbon-black);
    border-radius: 20px;
    max-width: 900px;
    max-height: 90vh;
    width: 90%;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: var(--text-primary);
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
}

.modal-close:hover {
    background: var(--danger);
    color: white;
    transform: rotate(90deg);
}

.modal-body {
    padding: 40px;
    overflow-y: auto;
    max-height: 90vh;
}

.modal-header {
    margin-bottom: 30px;
}

.modal-header h2 {
    margin-bottom: 15px;
    color: var(--copper);
}

.modal-badges {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.badge {
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 600;
}

.badge-active {
    background: rgba(16, 185, 129, 0.2);
    color: var(--emerald);
}

.badge-completed {
    background: rgba(184, 115, 51, 0.2);
    color: var(--copper);
}

.badge-year {
    background: rgba(6, 182, 212, 0.2);
    color: var(--cyan-tech);
}

.badge-featured {
    background: rgba(245, 158, 11, 0.2);
    color: var(--gold);
}

.modal-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    background: var(--graphite);
    border-radius: 10px;
    margin-bottom: 30px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.info-item i {
    font-size: 1.5rem;
    color: var(--copper);
}

.info-label {
    display: block;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.info-value {
    display: block;
    font-weight: 600;
    color: var(--text-primary);
}

.modal-description,
.modal-achievements,
.modal-metrics,
.modal-technologies {
    margin-bottom: 30px;
}

.modal-description h3,
.modal-achievements h3,
.modal-metrics h3,
.modal-technologies h3 {
    color: var(--copper);
    margin-bottom: 15px;
}

.achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
}

.achievement-card {
    background: var(--graphite);
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.achievement-card i {
    color: var(--gold);
    font-size: 1.25rem;
    flex-shrink: 0;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.metric-card {
    background: linear-gradient(135deg, var(--graphite) 0%, rgba(184, 115, 51, 0.1) 100%);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.metric-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--copper);
    margin-bottom: 5px;
}

.metric-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.tech-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    background: rgba(139, 92, 246, 0.1);
    color: var(--violet-tech);
    border-radius: 20px;
    border: 1px solid rgba(139, 92, 246, 0.3);
}

.modal-actions {
    display: flex;
    gap: 15px;
    padding-top: 20px;
    border-top: 1px solid var(--graphite-light);
}

.btn-outline {
    background: transparent;
    border: 2px solid var(--graphite-light);
    color: var(--text-primary);
}

.btn-outline:hover {
    background: var(--graphite);
    border-color: var(--copper);
}

/* Responsive */
@media (max-width: 768px) {
    .modal-body {
        padding: 20px;
    }
    
    .modal-info {
        grid-template-columns: 1fr;
    }
    
    .achievements-grid {
        grid-template-columns: 1fr;
    }
    
    .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .modal-actions {
        flex-direction: column;
    }
    
    .modal-actions .btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
`;

// Inject project styles
document.head.insertAdjacentHTML("beforeend", projectStyles);
