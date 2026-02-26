// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const [isOpen, setIsOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // Vérifier l'état de connexion au chargement et quand le localStorage change
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('access')
            const userData = localStorage.getItem('user')
            
            if (token && userData) {
                setIsAuthenticated(true)
                setUser(JSON.parse(userData))
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        }
        
        checkAuth()
        
        // Écouter les changements de localStorage (si un autre onglet modifie)
        window.addEventListener('storage', checkAuth)
        
        return () => {
            window.removeEventListener('storage', checkAuth)
        }
    }, [location]) // Re-vérifie quand la route change

    // Fonction pour fermer le menu après clic sur mobile
    const closeMenu = () => {
        setIsOpen(false)
        setDropdownOpen(false)
    }

    // Fonction pour basculer le menu
    const toggleMenu = () => {
        setIsOpen(!isOpen)
        if (dropdownOpen) setDropdownOpen(false)
    }

    // Fonction pour basculer le dropdown
    const toggleDropdown = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDropdownOpen(!dropdownOpen)
    }

    // Fermer le dropdown quand on clique ailleurs
    useEffect(() => {
        const handleClickOutside = () => {
            if (dropdownOpen) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [dropdownOpen])

    // Fonction de déconnexion
    const handleLogout = () => {
        // Supprimer les tokens et infos user
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        
        setIsAuthenticated(false)
        setUser(null)
        setDropdownOpen(false)
        
        toast.success("Déconnexion réussie")
        navigate('/')
        closeMenu()
    }

    // Récupérer le nom d'affichage de l'utilisateur
    const getDisplayName = () => {
        if (!user) return 'Mon Compte'
        return user.full_name || user.username || user.email || 'Mon Compte'
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
                        <div className="d-flex gap-2 position-relative">
                            {!isAuthenticated ? (
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
                                <div className="dropdown d-inline-block">
                                    <button
                                        className="btn btn-outline-dark rounded-pill dropdown-toggle d-flex align-items-center gap-2"
                                        type="button"
                                        onClick={toggleDropdown}
                                        aria-expanded={dropdownOpen}
                                    >
                                        <i className="fa fa-user-circle"></i>
                                        <span className="d-none d-md-inline">{getDisplayName()}</span>
                                    </button>
                                    
                                    {/* Menu déroulant */}
                                    {dropdownOpen && (
                                        <ul className="dropdown-menu show position-absolute" style={{
                                            top: '100%',
                                            right: 0,
                                            left: 'auto',
                                            marginTop: '0.5rem',
                                            minWidth: '200px',
                                            boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)',
                                            zIndex: 1000
                                        }}>
                                            <li>
                                                <NavLink 
                                                    className="dropdown-item py-2" 
                                                    to="/profile" 
                                                    onClick={closeMenu}
                                                >
                                                    <i className="fa fa-user-circle me-2"></i>
                                                    Mon Profil
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    className="dropdown-item py-2" 
                                                    to="/orders" 
                                                    onClick={closeMenu}
                                                >
                                                    <i className="fa fa-shopping-bag me-2"></i>
                                                    Mes Commandes
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    className="dropdown-item py-2" 
                                                    to="/settings" 
                                                    onClick={closeMenu}
                                                >
                                                    <i className="fa fa-cog me-2"></i>
                                                    Paramètres
                                                </NavLink>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <button 
                                                    className="dropdown-item text-danger py-2" 
                                                    onClick={handleLogout}
                                                >
                                                    <i className="fa fa-sign-out-alt me-2"></i>
                                                    Déconnexion
                                                </button>
                                            </li>
                                        </ul>
                                    )}
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

            {/* Ajout du style pour les liens actifs et le dropdown */}
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
                .dropdown-menu.show {
                    display: block;
                    animation: fadeIn 0.2s ease;
                }
                .dropdown-item {
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .dropdown-item:hover {
                    background-color: #f8f9fa;
                    transform: translateX(5px);
                }
                .dropdown-item.text-danger:hover {
                    background-color: #dc3545;
                    color: white !important;
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @media (max-width: 991px) {
                    .nav-link.active::after {
                        bottom: auto;
                        top: 50%;
                        left: 10px;
                        transform: translateY(-50%);
                    }
                    .dropdown-menu.show {
                        position: static !important;
                        box-shadow: none !important;
                        margin-top: 0.5rem;
                    }
                }
            `}</style>
        </nav>
    )
}

export default Navbar