// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <footer className="bg-dark text-white pt-5 pb-4 mt-5 position-relative">
        {/* Bouton retour en haut */}
        <button
          onClick={scrollToTop}
          className="btn btn-primary rounded-circle position-absolute top-0 start-50 translate-middle"
          style={{ width: "50px", height: "50px", zIndex: 10 }}
          title="Retour en haut"
        >
          <i className="fa fa-arrow-up"></i>
        </button>

        <div className="container">
          <div className="row g-4">
            {/* Section À propos avec logo */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-about">
                <h3 className="fw-bold mb-4">
                  <span className="text-primary">Kay</span> Dieund
                </h3>
                <p className="text-white-50 mb-4">
                  Votre destination en ligne pour des produits de qualité.
                  Une expérience d'achat moderne, sécurisée et entièrement
                  optimisée pour vos besoins.
                </p>
                
                {/* Newsletter */}
                <div className="newsletter mb-4">
                  <h6 className="text-white mb-3">Newsletter</h6>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control bg-dark border-secondary text-white"
                      placeholder="Votre email"
                      aria-label="Email pour newsletter"
                    />
                    <button className="btn btn-primary" type="button">
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </div>
                </div>

                {/* Réseaux sociaux avec le nouveau composant */}
                <div className="social-section">
                  <h6 className="text-white mb-3">Suivez-nous</h6>
                  <SocialLinks variant="light" size="md" />
                </div>
              </div>
            </div>

            {/* Section Liens rapides avec icônes */}
            <div className="col-lg-2 col-md-6">
              <h5 className="fw-bold mb-4 position-relative pb-2">
                Liens rapides
                <span className="position-absolute bottom-0 start-0 w-25 bg-primary" style={{ height: "2px" }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link to="/" className="text-white-50 text-decoration-none hover-link">
                    <i className="fa fa-chevron-right me-2 small text-primary"></i>
                    Accueil
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/product" className="text-white-50 text-decoration-none hover-link">
                    <i className="fa fa-chevron-right me-2 small text-primary"></i>
                    Produits
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/about" className="text-white-50 text-decoration-none hover-link">
                    <i className="fa fa-chevron-right me-2 small text-primary"></i>
                    À propos
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/contact" className="text-white-50 text-decoration-none hover-link">
                    <i className="fa fa-chevron-right me-2 small text-primary"></i>
                    Contact
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/faq" className="text-white-50 text-decoration-none hover-link">
                    <i className="fa fa-chevron-right me-2 small text-primary"></i>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section Catégories avec compteurs */}
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-4 position-relative pb-2">
                Catégories
                <span className="position-absolute bottom-0 start-0 w-25 bg-primary" style={{ height: "2px" }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link to="/product?category=homme" className="text-white-50 text-decoration-none hover-link d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fa fa-chevron-right me-2 small text-primary"></i>
                      Vêtements Homme
                    </span>
                    <span className="badge bg-primary bg-opacity-25 text-white rounded-pill">45+</span>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/product?category=femme" className="text-white-50 text-decoration-none hover-link d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fa fa-chevron-right me-2 small text-primary"></i>
                      Vêtements Femme
                    </span>
                    <span className="badge bg-primary bg-opacity-25 text-white rounded-pill">52+</span>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/product?category=bijoux" className="text-white-50 text-decoration-none hover-link d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fa fa-chevron-right me-2 small text-primary"></i>
                      Bijoux
                    </span>
                    <span className="badge bg-primary bg-opacity-25 text-white rounded-pill">28+</span>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/product?category=electronique" className="text-white-50 text-decoration-none hover-link d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fa fa-chevron-right me-2 small text-primary"></i>
                      Électroniques
                    </span>
                    <span className="badge bg-primary bg-opacity-25 text-white rounded-pill">63+</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Section Contact avec carte et horaires */}
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-4 position-relative pb-2">
                Contact
                <span className="position-absolute bottom-0 start-0 w-25 bg-primary" style={{ height: "2px" }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                    <i className="fa fa-map-marker text-primary"></i>
                  </div>
                  <div>
                    <span className="text-white-50">123 Avenue Léopold Sédar Senghor</span>
                    <br />
                    <span className="text-white-50">Dakar, Sénégal</span>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                    <i className="fa fa-envelope text-primary"></i>
                  </div>
                  <div>
                    <span className="text-white-50">contact@kaydieund.sn</span>
                    <br />
                    <span className="text-white-50">support@kaydieund.sn</span>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                    <i className="fa fa-phone text-primary"></i>
                  </div>
                  <div>
                    <span className="text-white-50">+221 77 123 45 67</span>
                    <br />
                    <span className="text-white-50">+221 78 123 45 67</span>
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                    <i className="fa fa-clock text-primary"></i>
                  </div>
                  <div>
                    <span className="text-white-50">Lun - Ven: 9h - 18h</span>
                    <br />
                    <span className="text-white-50">Sam: 10h - 14h</span>
                  </div>
                </li>
              </ul>

              {/* Réseaux sociaux version inline (optionnel) */}
              <div className="mt-3 d-md-none">
                <SocialLinks variant="inline" size="sm" showLabel={false} />
              </div>
            </div>
          </div>

          {/* Séparateur décoratif */}
          <div className="position-relative my-4">
            <hr className="border-secondary opacity-25" />
            <div className="position-absolute top-50 start-50 translate-middle bg-primary px-3 py-1 rounded-pill">
              <i className="fa fa-star text-white"></i>
            </div>
          </div>

          {/* Copyright et crédits avec badges */}
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="text-white-50 mb-0">
                © {currentYear} <strong className="text-white">Kay Dieund</strong>. 
                Tous droits réservés.
                <span className="ms-2 badge bg-primary bg-opacity-25 text-white">v1.0.0</span>
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="text-white-50 mb-2">
                Fait avec <i className="fa fa-heart text-danger"></i> par{" "}
                <a
                  href="https://github.com/iamsouane"
                  className="text-decoration-none fw-bold text-white hover-text-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Serigne Ismaila SOUANE
                </a>
              </p>
              <div className="tech-stack">
                <span className="badge bg-primary bg-opacity-10 text-white me-2 py-2 px-3 rounded-pill">
                  <i className="fa fa-code me-1"></i>React
                </span>
                <span className="badge bg-primary bg-opacity-10 text-white me-2 py-2 px-3 rounded-pill">
                  <i className="fa fa-database me-1"></i>Django
                </span>
                <span className="badge bg-primary bg-opacity-10 text-white me-2 py-2 px-3 rounded-pill">
                  <i className="fa fa-database me-1"></i>PostgreSQL
                </span>
                <span className="badge bg-primary bg-opacity-10 text-white me-2 py-2 px-3 rounded-pill">
                  <i className="fa fa-cubes me-1"></i>Docker
                </span>
                <span className="badge bg-primary bg-opacity-10 text-white py-2 px-3 rounded-pill">
                  <i className="fa fa-kubernetes me-1"></i>Kubernetes
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles personnalisés */}
      <style jsx>{`
        .social-link {
          transition: all 0.3s ease !important;
        }
        .social-link:hover {
          transform: translateY(-5px) scale(1.1);
          background-color: var(--bs-primary) !important;
          color: white !important;
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.4);
        }
        .hover-link {
          transition: all 0.3s ease;
          display: inline-block;
        }
        .hover-link:hover {
          color: white !important;
          transform: translateX(5px);
        }
        .hover-text-primary:hover {
          color: var(--bs-primary) !important;
        }
        .badge {
          transition: all 0.3s ease;
        }
        .badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 10px rgba(13, 110, 253, 0.3);
        }
        .btn-primary.rounded-circle {
          transition: all 0.3s ease;
        }
        .btn-primary.rounded-circle:hover {
          transform: scale(1.1);
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.5);
        }
        @media (max-width: 768px) {
          .btn-primary.rounded-circle {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;