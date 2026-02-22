// src/pages/PageNotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { Home, ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      
      <div className="container my-5 py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            <div className="py-5">
              {/* Code 404 */}
              <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
              
              {/* Titre */}
              <h2 className="display-5 fw-bold mb-4">Page non trouvée</h2>
              
              {/* Message */}
              <p className="lead text-muted mb-5">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
              
              {/* Boutons */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Link 
                  to="/" 
                  className="btn btn-primary btn-lg rounded-pill px-5 d-inline-flex align-items-center gap-2"
                >
                  <Home size={20} />
                  Accueil
                </Link>
                
                <button 
                  onClick={() => window.history.back()} 
                  className="btn btn-outline-secondary btn-lg rounded-pill px-5 d-inline-flex align-items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PageNotFound;