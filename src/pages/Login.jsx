// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Effacer l'erreur du champ quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler la connexion
    setTimeout(() => {
      // Vérification des identifiants (simulée)
      if (formData.email === "demo@kaydieund.sn" && formData.password === "password123") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ email: formData.email, name: "Utilisateur Test" }));
        toast.success("Connexion réussie !");
        navigate("/");
      } else {
        toast.error("Email ou mot de passe incorrect");
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      
      <div className="login-page py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-80">
            <div className="col-md-10 col-lg-8">
              <div className="login-card bg-white rounded-4 shadow-lg overflow-hidden">
                <div className="row g-0">
                  {/* Colonne gauche - Message de bienvenue */}
                  <div className="col-lg-6">
                    <div className="welcome-section bg-primary text-white h-100 d-flex flex-column justify-content-center p-5">
                      <div className="welcome-content text-center text-lg-start">
                        <div className="mb-4">
                          <i className="fa fa-hand-peace-o fa-4x"></i>
                        </div>
                        <h2 className="display-5 fw-bold mb-3">Content de vous revoir !</h2>
                        <p className="lead mb-4 opacity-75">
                          Connectez-vous pour accéder à votre compte
                        </p>
                        
                        {/* Caractéristiques */}
                        <div className="features mt-5">
                          <div className="feature-item d-flex align-items-center mb-3">
                            <div className="feature-icon bg-white bg-opacity-20 rounded-circle p-2 me-3">
                              <i className="fa fa-shopping-bag fa-lg"></i>
                            </div>
                            <span>Gérez vos commandes</span>
                          </div>
                          <div className="feature-item d-flex align-items-center mb-3">
                            <div className="feature-icon bg-white bg-opacity-20 rounded-circle p-2 me-3">
                              <i className="fa fa-tag fa-lg"></i>
                            </div>
                            <span>Offres exclusives</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Colonne droite - Formulaire */}
                  <div className="col-lg-6">
                    <div className="login-body p-5">
                      <div className="text-center mb-4">
                        <h3 className="fw-bold">Connexion</h3>
                        <p className="text-muted">Entrez vos identifiants</p>
                      </div>

                      <form onSubmit={handleSubmit}>
                        {/* Champ Email */}
                        <div className="form-group mb-4">
                          <label htmlFor="email" className="form-label fw-semibold">
                            <i className="fa fa-envelope text-primary me-2"></i>
                            Adresse Email
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-0">
                              <i className="fa fa-envelope text-muted"></i>
                            </span>
                            <input
                              type="email"
                              className={`form-control form-control-lg border-0 bg-light ${errors.email ? 'is-invalid' : ''}`}
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="votre@email.com"
                              style={{ padding: "1rem" }}
                            />
                          </div>
                          {errors.email && (
                            <div className="text-danger small mt-2">
                              <i className="fa fa-exclamation-circle me-1"></i>
                              {errors.email}
                            </div>
                          )}
                        </div>

                        {/* Champ Mot de passe */}
                        <div className="form-group mb-4">
                          <label htmlFor="password" className="form-label fw-semibold">
                            <i className="fa fa-lock text-primary me-2"></i>
                            Mot de Passe
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-0">
                              <i className="fa fa-lock text-muted"></i>
                            </span>
                            <input
                              type={showPassword ? "text" : "password"}
                              className={`form-control form-control-lg border-0 bg-light ${errors.password ? 'is-invalid' : ''}`}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="••••••••"
                              style={{ padding: "1rem" }}
                            />
                            <button
                              type="button"
                              className="btn btn-light border-0"
                              onClick={togglePasswordVisibility}
                            >
                              <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                          </div>
                          {errors.password && (
                            <div className="text-danger small mt-2">
                              <i className="fa fa-exclamation-circle me-1"></i>
                              {errors.password}
                            </div>
                          )}
                        </div>

                        {/* Options supplémentaires */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="remember"
                            />
                            <label className="form-check-label text-muted" htmlFor="remember">
                              Se souvenir de moi
                            </label>
                          </div>
                          <Link to="/forgot-password" className="text-primary text-decoration-none small">
                            Mot de passe oublié ?
                          </Link>
                        </div>

                        {/* Bouton de connexion */}
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100 rounded-pill py-3 mb-4"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Connexion en cours...
                            </>
                          ) : (
                            <>
                              <i className="fa fa-sign-in-alt me-2"></i>
                              Se connecter
                            </>
                          )}
                        </button>

                        {/* Lien d'inscription */}
                        <div className="text-center">
                          <p className="text-muted mb-0">
                            Nouveau sur Kay Dieund ?{" "}
                            <Link to="/register" className="text-primary fw-bold text-decoration-none">
                              Créer un compte
                            </Link>
                          </p>
                        </div>
                      </form>

                      {/* Séparateur */}
                      <div className="divider my-4 d-flex align-items-center">
                        <hr className="flex-grow-1" />
                        <span className="mx-3 text-muted small">ou</span>
                        <hr className="flex-grow-1" />
                      </div>

                      {/* Connexion avec réseaux sociaux */}
                      <div className="social-login">
                        <p className="text-center text-muted small mb-3">
                          Se connecter avec
                        </p>
                        <div className="d-flex gap-2 justify-content-center">
                          <button className="btn btn-outline-dark rounded-circle p-3" style={{ width: "50px", height: "50px" }}>
                            <i className="fa fa-google fa-lg"></i>
                          </button>
                          <button className="btn btn-outline-dark rounded-circle p-3" style={{ width: "50px", height: "50px" }}>
                            <i className="fa fa-facebook-f fa-lg"></i>
                          </button>
                          <button className="btn btn-outline-dark rounded-circle p-3" style={{ width: "50px", height: "50px" }}>
                            <i className="fa fa-twitter fa-lg"></i>
                          </button>
                          <button className="btn btn-outline-dark rounded-circle p-3" style={{ width: "50px", height: "50px" }}>
                            <i className="fa fa-github fa-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sécurité */}
              <div className="security-info text-center mt-4">
                <p className="small text-muted">
                  <i className="fa fa-shield-alt text-primary me-2"></i>
                  Vos informations sont protégées par un cryptage SSL sécurisé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Styles personnalisés */}
      <style jsx>{`
        .min-vh-80 {
          min-height: 80vh;
        }
        .login-card {
          border: none;
          transition: transform 0.3s ease;
        }
        .login-card:hover {
          transform: translateY(-5px);
        }
        .welcome-section {
          background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
        }
        .bg-opacity-20 {
          --bs-bg-opacity: 0.2;
        }
        .feature-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .form-control-lg {
          padding: 1rem;
          transition: all 0.3s ease;
        }
        .form-control-lg:focus {
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
        }
        .btn-primary {
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.4);
        }
        .btn-outline-dark {
          transition: all 0.3s ease;
        }
        .btn-outline-dark:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .divider hr {
          height: 1px;
          background-color: #dee2e6;
          opacity: 0.5;
        }
        @media (max-width: 768px) {
          .welcome-section {
            padding: 3rem 2rem !important;
            text-align: center !important;
          }
          .welcome-content {
            text-align: center !important;
          }
          .feature-item {
            justify-content: center;
          }
          .login-body {
            padding: 2rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Login;