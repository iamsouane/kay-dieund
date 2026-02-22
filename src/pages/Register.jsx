// src/pages/Register.jsx
import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
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
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Le nom complet est requis";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Le nom doit contenir au moins 3 caractères";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }
        
        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (formData.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        } else if (!/(?=.*[0-9])/.test(formData.password)) {
            newErrors.password = "Le mot de passe doit contenir au moins un chiffre";
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
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
        
        // Simuler l'inscription
        setTimeout(() => {
            // Vérification si l'email existe déjà (simulée)
            if (formData.email === "demo@kaydieund.sn") {
                toast.error("Cet email est déjà utilisé");
                setIsSubmitting(false);
            } else {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("user", JSON.stringify({ 
                    email: formData.email, 
                    name: formData.fullName 
                }));
                toast.success("Inscription réussie !");
                navigate("/");
            }
        }, 1500);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Navbar />
            
            <div className="register-page py-5">
                <div className="container">
                    <div className="row justify-content-center align-items-center min-vh-80">
                        <div className="col-md-10 col-lg-8">
                            <div className="register-card bg-white rounded-4 shadow-lg overflow-hidden">
                                <div className="row g-0">
                                    {/* Colonne gauche - Message de bienvenue */}
                                    <div className="col-lg-6">
                                        <div className="welcome-section bg-primary text-white h-100 d-flex flex-column justify-content-center p-5">
                                            <div className="welcome-content text-center text-lg-start">
                                                <div className="mb-4">
                                                    <i className="fa fa-user-plus fa-4x"></i>
                                                </div>
                                                <h2 className="display-5 fw-bold mb-3">Rejoignez-nous !</h2>
                                                <p className="lead mb-4 opacity-75">
                                                    Créez votre compte pour commencer vos achats
                                                </p>
                                                
                                                {/* Avantages */}
                                                <div className="benefits mt-5">
                                                    <div className="benefit-item d-flex align-items-center mb-3">
                                                        <div className="benefit-icon bg-white bg-opacity-20 rounded-circle p-2 me-3">
                                                            <i className="fa fa-check fa-lg"></i>
                                                        </div>
                                                        <span>Commandes simplifiées</span>
                                                    </div>
                                                    <div className="benefit-item d-flex align-items-center mb-3">
                                                        <div className="benefit-icon bg-white bg-opacity-20 rounded-circle p-2 me-3">
                                                            <i className="fa fa-check fa-lg"></i>
                                                        </div>
                                                        <span>Suivi de vos achats</span>
                                                    </div>
                                                    <div className="benefit-item d-flex align-items-center mb-3">
                                                        <div className="benefit-icon bg-white bg-opacity-20 rounded-circle p-2 me-3">
                                                            <i className="fa fa-check fa-lg"></i>
                                                        </div>
                                                        <span>Offres personnalisées</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Colonne droite - Formulaire */}
                                    <div className="col-lg-6">
                                        <div className="register-body p-5">
                                            <div className="text-center mb-4">
                                                <h3 className="fw-bold">Inscription</h3>
                                                <p className="text-muted">Créez votre compte en quelques clics</p>
                                            </div>

                                            <form onSubmit={handleSubmit}>
                                                {/* Champ Nom Complet */}
                                                <div className="form-group mb-3">
                                                    <label htmlFor="fullName" className="form-label fw-semibold">
                                                        <i className="fa fa-user text-primary me-2"></i>
                                                        Nom Complet
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0">
                                                            <i className="fa fa-user text-muted"></i>
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className={`form-control form-control-lg border-0 bg-light ${errors.fullName ? 'is-invalid' : ''}`}
                                                            id="fullName"
                                                            name="fullName"
                                                            value={formData.fullName}
                                                            onChange={handleChange}
                                                            placeholder="Votre nom complet"
                                                            style={{ padding: "1rem" }}
                                                        />
                                                    </div>
                                                    {errors.fullName && (
                                                        <div className="text-danger small mt-2">
                                                            <i className="fa fa-exclamation-circle me-1"></i>
                                                            {errors.fullName}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Champ Email */}
                                                <div className="form-group mb-3">
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
                                                <div className="form-group mb-3">
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
                                                    <small className="text-muted">
                                                        Minimum 6 caractères, doit contenir au moins un chiffre
                                                    </small>
                                                </div>

                                                {/* Champ Confirmation Mot de passe */}
                                                <div className="form-group mb-3">
                                                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                                                        <i className="fa fa-lock text-primary me-2"></i>
                                                        Confirmer le Mot de Passe
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0">
                                                            <i className="fa fa-lock text-muted"></i>
                                                        </span>
                                                        <input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            className={`form-control form-control-lg border-0 bg-light ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            value={formData.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder="••••••••"
                                                            style={{ padding: "1rem" }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-light border-0"
                                                            onClick={toggleConfirmPasswordVisibility}
                                                        >
                                                            <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                                        </button>
                                                    </div>
                                                    {errors.confirmPassword && (
                                                        <div className="text-danger small mt-2">
                                                            <i className="fa fa-exclamation-circle me-1"></i>
                                                            {errors.confirmPassword}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Conditions d'utilisation */}
                                                <div className="form-group mb-4">
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
                                                            id="acceptTerms"
                                                            name="acceptTerms"
                                                            checked={formData.acceptTerms}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-check-label small" htmlFor="acceptTerms">
                                                            J'accepte les{" "}
                                                            <Link to="/terms" className="text-primary text-decoration-none">
                                                                conditions d'utilisation
                                                            </Link>{" "}
                                                            et la{" "}
                                                            <Link to="/privacy" className="text-primary text-decoration-none">
                                                                politique de confidentialité
                                                            </Link>
                                                        </label>
                                                    </div>
                                                    {errors.acceptTerms && (
                                                        <div className="text-danger small mt-2">
                                                            <i className="fa fa-exclamation-circle me-1"></i>
                                                            {errors.acceptTerms}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Bouton d'inscription */}
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-lg w-100 rounded-pill py-3 mb-4"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Inscription en cours...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="fa fa-user-plus me-2"></i>
                                                            S'inscrire
                                                        </>
                                                    )}
                                                </button>

                                                {/* Lien de connexion */}
                                                <div className="text-center">
                                                    <p className="text-muted mb-0">
                                                        Vous avez déjà un compte ?{" "}
                                                        <Link to="/login" className="text-primary fw-bold text-decoration-none">
                                                            Se connecter
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

                                            {/* Inscription avec réseaux sociaux */}
                                            <div className="social-register">
                                                <p className="text-center text-muted small mb-3">
                                                    S'inscrire avec
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
                .register-card {
                    border: none;
                    transition: transform 0.3s ease;
                }
                .register-card:hover {
                    transform: translateY(-5px);
                }
                .welcome-section {
                    background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
                }
                .bg-opacity-20 {
                    --bs-bg-opacity: 0.2;
                }
                .benefit-icon {
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
                    .benefit-item {
                        justify-content: center;
                    }
                    .register-body {
                        padding: 2rem !important;
                    }
                }
            `}</style>
        </>
    )
}

export default Register;