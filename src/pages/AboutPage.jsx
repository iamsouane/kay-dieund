// src/pages/AboutPage.jsx
import React from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

const AboutPage = () => {
  // Données de l'équipe (uniquement vous)
  const teamMembers = [
    {
      name: "Serigne Ismaila SOUANE",
      role: "Lead Developer & DevOps",
      image: "assets/iamsouane.jpg",
      bio: "Passionné par les architectures microservices et les technologies cloud. Développeur full-stack avec une expertise en React, Django, et DevOps.",
      social: {
        github: "https://github.com/iamsouane",
        linkedin: "https://www.linkedin.com/in/serigne-ismaila-souane-b78b04392/",
        twitter: "https://x.com/iamsouane"
      }
    }
  ];

  // Statistiques
  const stats = [
    { icon: "fa-users", value: "5000+", label: "Clients satisfaits" },
    { icon: "fa-box", value: "10000+", label: "Produits vendus" },
    { icon: "fa-truck", value: "24/7", label: "Livraison disponible" },
    { icon: "fa-headset", value: "24/7", label: "Support client" }
  ];

  // Valeurs de l'entreprise
  const values = [
    {
      icon: "fa-star",
      title: "Qualité",
      description: "Sélection rigoureuse de chaque produit pour garantir une qualité exceptionnelle."
    },
    {
      icon: "fa-shield",
      title: "Confiance",
      description: "La sécurité de vos données et transactions est ma priorité absolue."
    },
    {
      icon: "fa-rocket",
      title: "Innovation",
      description: "Utilisation des technologies les plus récentes pour une expérience optimale."
    },
    {
      icon: "fa-heart",
      title: "Passion",
      description: "Un projet développé avec passion pour offrir le meilleur service."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero bg-primary text-white py-5">
        <div className="container text-center py-5">
          <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInDown">
            À Propos de <span className="text-warning">Kay Dieund</span>
          </h1>
          <p className="lead fs-4 mx-auto" style={{ maxWidth: "800px" }}>
            Découvrez l'histoire derrière votre plateforme d'achat préférée,
            construite avec les technologies les plus modernes.
          </p>
          <div className="mt-4">
            <Link to="/product" className="btn btn-light btn-lg rounded-pill px-5 me-3">
              <i className="fa fa-shopping-bag me-2"></i>
              Voir nos produits
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg rounded-pill px-5">
              <i className="fa fa-envelope me-2"></i>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="our-story py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="story-content">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
                  Notre Histoire
                </span>
                <h2 className="display-5 fw-bold mb-4">
                  Une plateforme moderne pour des achats exceptionnels
                </h2>
                <p className="lead text-muted mb-4">
                  Bienvenue chez <strong>Kay Dieund</strong>, votre destination en ligne pour des produits de qualité
                  et une expérience d'achat exceptionnelle.
                </p>
                <p className="text-muted mb-4">
                  Cette plateforme a été entièrement conçue et développée par <strong>Serigne Ismaila SOUANE</strong>
                  dans le cadre d'un projet de système réparti, démontrant l'utilisation de technologies modernes
                  comme React, Django, PostgreSQL, Docker, Kubernetes, Ansible et Jenkins. Chaque aspect technique
                  a été soigneusement pensé pour offrir une expérience fluide et sécurisée.
                </p>

                {/* Points clés */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <i className="fa fa-check text-primary"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Produits certifiés</h6>
                        <small className="text-muted">100% authentiques</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <i className="fa fa-check text-primary"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Livraison rapide</h6>
                        <small className="text-muted">Partout au Sénégal</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <i className="fa fa-check text-primary"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Paiement sécurisé</h6>
                        <small className="text-muted">Orange Money, CB, PayPal</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <i className="fa fa-check text-primary"></i>
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">Support 24/7</h6>
                        <small className="text-muted">Service client dédié</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="story-image position-relative">
                <img
                  src="https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Notre équipe"
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="experience-badge position-absolute bg-primary text-white p-4 rounded-4 shadow"
                  style={{ bottom: "-30px", left: "-30px" }}>
                  <h2 className="display-4 fw-bold mb-0">2+</h2>
                  <p className="mb-0">Années d'expérience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="stats-section bg-light py-5">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3 col-6">
                <div className="stat-card text-center p-4 bg-white rounded-4 shadow-sm hover-lift">
                  <div className="stat-icon bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "70px", height: "70px" }}>
                    <i className={`fa ${stat.icon} fa-2x`}></i>
                  </div>
                  <h3 className="display-5 fw-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="values-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
              Nos Valeurs
            </span>
            <h2 className="display-5 fw-bold mb-3">Ce qui nous définit</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Des principes forts qui guident chacune de mes actions
            </p>
          </div>

          <div className="row g-4">
            {values.map((value, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="value-card text-center p-4 bg-white rounded-4 shadow-sm h-100 hover-lift">
                  <div className="value-icon bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "80px", height: "80px" }}>
                    <i className={`fa ${value.icon} fa-3x`}></i>
                  </div>
                  <h4 className="fw-bold mb-3">{value.title}</h4>
                  <p className="text-muted mb-0">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Le Développeur */}
      <section className="developer-section bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
              Le Développeur
            </span>
            <h2 className="display-5 fw-bold mb-3">Derrière Kay Dieund</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Un développeur passionné, créateur de cette plateforme
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="developer-card bg-white rounded-4 shadow-lg overflow-hidden">
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="p-4">
                        <h3 className="fw-bold mb-2">{member.name}</h3>
                        <p className="text-primary fw-semibold mb-3">{member.role}</p>
                        <p className="text-muted mb-4">{member.bio}</p>

                        <div className="social-links mb-4">
                          <h6 className="fw-bold mb-3">Retrouvez-moi sur :</h6>
                          <div className="d-flex gap-3">
                            <a
                              href={member.social.github}
                              className="social-link bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                              style={{ width: "45px", height: "45px" }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-github fa-lg"></i>
                            </a>
                            <a
                              href={member.social.linkedin}
                              className="social-link bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                              style={{ width: "45px", height: "45px" }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-linkedin fa-lg"></i>
                            </a>
                            <a
                              href={member.social.twitter}
                              className="social-link bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                              style={{ width: "45px", height: "45px" }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                          </div>
                        </div>

                        <div className="tech-stack">
                          <h6 className="fw-bold mb-3">Technologies utilisées :</h6>
                          <div className="d-flex flex-wrap gap-2">
                            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                              React
                            </span>
                            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                              Django
                            </span>
                            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                              PostgreSQL
                            </span>
                            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                              Docker
                            </span>
                            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                              Kubernetes
                            </span>
                            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                              Ansible
                            </span>
                            <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                              Jenkins
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Produits - Section améliorée */}
      <section className="products-showcase py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
              Nos Produits
            </span>
            <h2 className="display-5 fw-bold mb-3">Découvrez nos catégories</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Des produits soigneusement sélectionnés pour vous
            </p>
          </div>

          <div className="row g-4">
            {/* Catégorie Homme */}
            <div className="col-md-3 col-sm-6">
              <div className="category-card position-relative rounded-4 overflow-hidden shadow-sm hover-lift">
                <img
                  className="w-100"
                  src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Vêtements Homme"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
                  <h4 className="text-white fw-bold mb-2">Vêtements Homme</h4>
                  <p className="text-white-50 mb-3">Collection élégante et moderne</p>
                  <Link to="/product?category=homme" className="btn btn-light btn-sm rounded-pill align-self-start">
                    Découvrir <i className="fa fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Catégorie Femme */}
            <div className="col-md-3 col-sm-6">
              <div className="category-card position-relative rounded-4 overflow-hidden shadow-sm hover-lift">
                <img
                  className="w-100"
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Vêtements Femme"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
                  <h4 className="text-white fw-bold mb-2">Vêtements Femme</h4>
                  <p className="text-white-50 mb-3">Élégance et tendance</p>
                  <Link to="/product?category=femme" className="btn btn-light btn-sm rounded-pill align-self-start">
                    Découvrir <i className="fa fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Catégorie Bijoux */}
            <div className="col-md-3 col-sm-6">
              <div className="category-card position-relative rounded-4 overflow-hidden shadow-sm hover-lift">
                <img
                  className="w-100"
                  src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Bijoux"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
                  <h4 className="text-white fw-bold mb-2">Bijoux</h4>
                  <p className="text-white-50 mb-3">Des pièces uniques et raffinées</p>
                  <Link to="/product?category=bijoux" className="btn btn-light btn-sm rounded-pill align-self-start">
                    Découvrir <i className="fa fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Catégorie Électronique */}
            <div className="col-md-3 col-sm-6">
              <div className="category-card position-relative rounded-4 overflow-hidden shadow-sm hover-lift">
                <img
                  className="w-100"
                  src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Électroniques"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
                  <h4 className="text-white fw-bold mb-2">Électroniques</h4>
                  <p className="text-white-50 mb-3">Les dernières technologies</p>
                  <Link to="/product?category=electronique" className="btn btn-light btn-sm rounded-pill align-self-start">
                    Découvrir <i className="fa fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="cta-section bg-primary text-white py-5">
        <div className="container text-center py-4">
          <h2 className="display-5 fw-bold mb-4">Prêt à commencer vos achats ?</h2>
          <p className="lead fs-4 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Rejoignez des milliers de clients satisfaits et découvrez une expérience d'achat unique.
          </p>
          <Link to="/product" className="btn btn-light btn-lg rounded-pill px-5">
            <i className="fa fa-shopping-bag me-2"></i>
            Acheter maintenant
          </Link>
        </div>
      </section>

      <Footer />

      {/* Styles personnalisés */}
      <style jsx>{`
        .about-hero {
          background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .stat-card, .value-card, .team-card {
          transition: all 0.3s ease;
        }
        .team-image {
          position: relative;
          overflow: hidden;
        }
        .team-social {
          background: linear-gradient(to top, rgba(13,110,253,0.9), transparent);
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }
        .team-card:hover .team-social {
          transform: translateY(0);
        }
        .category-card {
          cursor: pointer;
        }
        .category-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .category-card:hover .category-overlay {
          opacity: 1;
        }
        .experience-badge {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .social-link {
          transition: all 0.3s ease;
        }
        .social-link:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem;
          }
          .experience-badge {
            left: 10px !important;
            bottom: 10px !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default AboutPage;