// src/components/Navbar.jsx
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    // Fonction pour fermer le menu après clic sur mobile
    const closeMenu = () => {
        setIsOpen(false)
    }

    // Fonction pour basculer le menu
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 sticky-top shadow-sm">
            <div className="container">
                {/* Logo / Brand */}
                <NavLink
                    className="navbar-brand fw-bold fs-3 px-2"
                    to="/"
                    onClick={closeMenu}
                >
                    <span className="text-primary">Kay</span> Dieund
                </NavLink>

                {/* Bouton toggle pour mobile */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu collapse */}
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    {/* Liens de navigation */}
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item mx-1">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link px-3 ${isActive ? 'active fw-semibold text-primary' : 'text-dark'}`
                                }
                                to="/"
                                onClick={closeMenu}
                            >
                                Accueil
                            </NavLink>
                        </li>
                        <li className="nav-item mx-1">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link px-3 ${isActive ? 'active fw-semibold text-primary' : 'text-dark'}`
                                }
                                to="/product"
                                onClick={closeMenu}
                            >
                                Produits
                            </NavLink>
                        </li>
                        <li className="nav-item mx-1">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link px-3 ${isActive ? 'active fw-semibold text-primary' : 'text-dark'}`
                                }
                                to="/about"
                                onClick={closeMenu}
                            >
                                À Propos
                            </NavLink>
                        </li>
                        <li className="nav-item mx-1">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link px-3 ${isActive ? 'active fw-semibold text-primary' : 'text-dark'}`
                                }
                                to="/contact"
                                onClick={closeMenu}
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>

                    {/* Boutons d'action */}
                    <div className="d-flex flex-column flex-lg-row gap-2 align-items-center">
                        {/* Barre de recherche (optionnelle) */}
                        <div className="position-relative me-lg-2 mb-2 mb-lg-0">
                            <input
                                type="search"
                                className="form-control rounded-pill bg-light border-0 px-4 py-2"
                                placeholder="Rechercher..."
                                style={{ width: '200px' }}
                            />
                            <i className="fa fa-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
                        </div>

                        {/* Boutons utilisateur */}
                        <div className="d-flex gap-2">
                            {!localStorage.getItem('token') ? (
                                <>
                                    <NavLink
                                        to="/login"
                                        className="btn btn-outline-primary rounded-pill px-4"
                                        onClick={closeMenu}
                                    >
                                        <i className="fa fa-sign-in-alt me-2"></i>
                                        Connexion
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className="btn btn-primary rounded-pill px-4"
                                        onClick={closeMenu}
                                    >
                                        <i className="fa fa-user-plus me-2"></i>
                                        Inscription
                                    </NavLink>
                                </>
                            ) : (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-outline-dark rounded-pill dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="fa fa-user me-2"></i>
                                        Mon Compte
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <NavLink className="dropdown-item" to="/profile">
                                                <i className="fa fa-user-circle me-2"></i>Profil
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="dropdown-item" to="/orders">
                                                <i className="fa fa-shopping-bag me-2"></i>Commandes
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item text-danger">
                                                <i className="fa fa-sign-out-alt me-2"></i>Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Panier avec badge */}
                            <NavLink
                                to="/cart"
                                className="btn btn-outline-dark rounded-pill position-relative"
                                onClick={closeMenu}
                            >
                                <i className="fa fa-shopping-cart"></i>
                                {state.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {state.length}
                                        <span className="visually-hidden">articles dans le panier</span>
                                    </span>
                                )}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ajout du style pour les liens actifs */}
            <style jsx>{`
                .nav-link.active {
                    position: relative;
                }
                .nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: #0d6efd;
                }
                @media (max-width: 991px) {
                    .nav-link.active::after {
                        bottom: auto;
                        top: 50%;
                        left: 10px;
                        transform: translateY(-50%);
                    }
                }
            `}</style>
        </nav>
    )
}

export default Navbar