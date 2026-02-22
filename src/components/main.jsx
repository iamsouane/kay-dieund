// src/components/main.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        {/* Image de fond avec overlay */}
        <div className="hero-wrapper position-relative">
          <img
            className="hero-image w-100"
            src="./assets/main.png.jpg"
            alt="Kay Dieund - Shopping"
            style={{
              height: "600px",
              objectFit: "cover",
              filter: "brightness(0.7)"
            }}
          />
          
          {/* Overlay dégradé */}
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-overlay"></div>
          
          {/* Contenu overlay */}
          <div className="position-absolute top-50 start-50 translate-middle w-100 text-center text-white px-3">
            <div className="container">
              {/* Badge de bienvenue */}
              <span className="badge bg-primary bg-opacity-75 text-white px-4 py-2 mb-4 rounded-pill fs-6">
                <i className="fa fa-gem me-2"></i>
                Nouvelle Collection 2026
              </span>
              
              {/* Titre principal */}
              <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                Bienvenue chez <span className="text-primary">Kay Dieund</span>
              </h1>
              
              {/* Sous-titre */}
              <p className="lead fs-4 mb-5 mx-auto" style={{ maxWidth: "800px" }}>
                Découvrez notre sélection exclusive de produits de qualité. 
                Des articles soigneusement choisis pour répondre à tous vos besoins 
                avec style et élégance.
              </p>
              
              {/* Boutons d'action */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link to="/product" className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg">
                  <i className="fa fa-shopping-bag me-2"></i>
                  Acheter maintenant
                </Link>
                <Link to="/about" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill">
                  <i className="fa fa-info-circle me-2"></i>
                  En savoir plus
                </Link>
              </div>
              
              {/* Statistiques */}
              <div className="row mt-5 pt-4 justify-content-center g-4">
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <i className="fa fa-truck fa-2x mb-2 text-primary"></i>
                    <h3 className="h4 fw-bold mb-1">Livraison gratuite</h3>
                    <p className="small opacity-75">À partir de 50€</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <i className="fa fa-shield fa-2x mb-2 text-primary"></i>
                    <h3 className="h4 fw-bold mb-1">Paiement sécurisé</h3>
                    <p className="small opacity-75">CB, PayPal, Orange Money</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <i className="fa fa-undo fa-2x mb-2 text-primary"></i>
                    <h3 className="h4 fw-bold mb-1">Retour gratuit</h3>
                    <p className="small opacity-75">Sous 30 jours</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <i className="fa fa-headset fa-2x mb-2 text-primary"></i>
                    <h3 className="h4 fw-bold mb-1">Support 24/7</h3>
                    <p className="small opacity-75">Service client dédié</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des catégories populaires (optionnelle) */}
      <section className="popular-categories py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
              Catégories
            </span>
            <h2 className="display-6 fw-bold">Nos catégories populaires</h2>
            <p className="text-muted">Explorez nos différentes gammes de produits</p>
          </div>
          
          <div className="row g-4">
            {[
              { icon: "fa-tshirt", title: "Vêtements Homme", count: "120+", color: "primary" },
              { icon: "fa-female", title: "Vêtements Femme", count: "150+", color: "danger" },
              { icon: "fa-gem", title: "Bijoux", count: "80+", color: "warning" },
              { icon: "fa-laptop", title: "Électronique", count: "200+", color: "success" }
            ].map((category, index) => (
              <div className="col-6 col-lg-3" key={index}>
                <Link to={`/product?category=${category.title.toLowerCase()}`} className="text-decoration-none">
                  <div className="card border-0 shadow-sm hover-scale text-center p-4">
                    <div className={`rounded-circle bg-${category.color} bg-opacity-10 p-3 mx-auto mb-3`} style={{ width: "fit-content" }}>
                      <i className={`fa ${category.icon} fa-2x text-${category.color}`}></i>
                    </div>
                    <h5 className="fw-bold mb-1">{category.title}</h5>
                    <p className="small text-muted mb-0">{category.count} produits</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ajout des styles CSS */}
      <style jsx>{`
        .bg-gradient-overlay {
          background: linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
        }
        .hero-section {
          min-height: 600px;
        }
        .stat-item {
          transition: transform 0.3s ease;
        }
        .stat-item:hover {
          transform: translateY(-5px);
        }
        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        @media (max-width: 768px) {
          .hero-image {
            height: 800px !important;
          }
          .display-3 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;