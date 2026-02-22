// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { Footer, Navbar, ClearCartButton, CartItemControls } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Charger les suggestions basées sur les produits du panier
  useEffect(() => {
    if (state.length > 0) {
      const firstCategory = state[0].category;
      setLoadingSuggestions(true);

      fetch(`https://fakestoreapi.com/products/category/${firstCategory}`)
        .then(res => res.json())
        .then(data => {
          const cartIds = state.map(item => item.id);
          const filtered = data.filter(item => !cartIds.includes(item.id)).slice(0, 4);
          setSuggestions(filtered);
          setLoadingSuggestions(false);
        })
        .catch(err => {
          console.error("Erreur chargement suggestions:", err);
          setLoadingSuggestions(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [state]);

  const EmptyCart = () => {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="empty-cart-icon mb-4">
              <i className="fa fa-shopping-cart fa-5x text-muted"></i>
            </div>
            <h2 className="display-5 fw-bold mb-3">Votre panier est vide</h2>
            <p className="lead text-muted mb-4">
              Découvrez nos produits et commencez vos achats
            </p>
            <Link to="/product" className="btn btn-primary btn-lg rounded-pill px-5">
              <i className="fa fa-arrow-left me-2"></i>
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.map((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
      return null;
    });

    const shippingCost = subtotal > 200 ? 0 : shipping;
    const total = subtotal + shippingCost;

    return (
      <div className="cart-page py-4">
        <div className="container">
          {/* En-tête avec bouton vider */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 mb-0">
              <i className="fa fa-shopping-cart text-primary me-2"></i>
              Mon Panier ({totalItems} article{totalItems > 1 ? 's' : ''})
            </h2>
            {state.length > 0 && <ClearCartButton cartItems={state} />}
          </div>

          <div className="row g-4">
            {/* Liste des articles */}
            <div className="col-lg-8">
              <div className="cart-items">
                {state.map((item, index) => (
                  <div key={item.id} className="cart-item-card bg-white rounded-4 shadow-sm mb-3 p-3">
                    <div className="row align-items-center">
                      {/* Image */}
                      <div className="col-md-2 col-4">
                        <div className="product-image bg-light rounded-3 p-2 text-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-fluid"
                            style={{ maxHeight: "80px", objectFit: "contain" }}
                          />
                        </div>
                      </div>

                      {/* Infos produit */}
                      <div className="col-md-5 col-8">
                        <h6 className="fw-bold mb-2">
                          {item.title.length > 40
                            ? `${item.title.substring(0, 40)}...`
                            : item.title}
                        </h6>
                        <div className="product-meta small text-muted">
                          <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
                            {item.category === "men's clothing" ? "👔 Homme" :
                              item.category === "women's clothing" ? "👗 Femme" :
                                item.category === "jewelery" ? "💎 Bijoux" : "📱 Électronique"}
                          </span>
                        </div>
                      </div>

                      {/* Quantité et prix - Utilisation du nouveau composant */}
                      <div className="col-md-5 mt-3 mt-md-0">
                        <div className="row align-items-center">
                          <div className="col-6">
                            <CartItemControls product={item} />
                          </div>
                          <div className="col-6 text-end">
                            <div className="price-info">
                              <div className="fw-bold text-primary h5 mb-0">
                                {(item.price * item.qty).toLocaleString()} €
                              </div>
                              <small className="text-muted">
                                {item.qty} x {item.price.toLocaleString()} €
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions de produits */}
              {suggestions.length > 0 && (
                <div className="cart-suggestions mt-4">
                  <div className="bg-light rounded-4 p-4">
                    <h6 className="fw-bold mb-3">
                      <i className="fa fa-gift text-primary me-2"></i>
                      Vous aimerez aussi
                    </h6>
                    <div className="row g-3">
                      {loadingSuggestions ? (
                        [...Array(4)].map((_, i) => (
                          <div key={i} className="col-6 col-md-3">
                            <div className="bg-white rounded-3 p-3 text-center">
                              <div className="skeleton-image bg-secondary bg-opacity-10 rounded-3 mb-2" style={{ height: "60px" }}></div>
                              <div className="skeleton-text bg-secondary bg-opacity-10 rounded-3 mb-2" style={{ height: "15px", width: "80%" }}></div>
                              <div className="skeleton-price bg-secondary bg-opacity-10 rounded-3" style={{ height: "20px", width: "50%" }}></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        suggestions.map((item) => (
                          <div key={item.id} className="col-6 col-md-3">
                            <div className="suggestion-card bg-white rounded-3 p-3 text-center hover-lift">
                              <div className="suggestion-image mb-2">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  style={{ height: "60px", objectFit: "contain" }}
                                  className="img-fluid"
                                />
                              </div>
                              <h6 className="small fw-bold mb-2 text-truncate">
                                {item.title}
                              </h6>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="text-primary fw-bold small">
                                  {item.price.toLocaleString()} €
                                </span>
                                <button
                                  className="btn btn-sm btn-primary rounded-circle"
                                  style={{ width: "32px", height: "32px" }}
                                  onClick={() => {
                                    // Importer et utiliser addCart ici
                                    import("../redux/action").then(({ addCart }) => {
                                      dispatch(addCart({ ...item, qty: 1 }));
                                      toast.success("Ajouté au panier");
                                    });
                                  }}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Résumé de la commande */}
            <div className="col-lg-4">
              <div className="order-summary bg-white rounded-4 shadow-sm p-4 sticky-top" style={{ top: "100px" }}>
                <h5 className="fw-bold mb-4">
                  <i className="fa fa-file-text text-primary me-2"></i>
                  Récapitulatif
                </h5>

                <div className="summary-details">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Sous-total</span>
                    <span className="fw-bold">{subtotal.toLocaleString()} €</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Livraison</span>
                    <span className={shippingCost === 0 ? "text-success" : ""}>
                      {shippingCost === 0 ? "Gratuite" : `${shippingCost.toLocaleString()} €`}
                    </span>
                  </div>

                  {subtotal > 200 && (
                    <div className="alert alert-success py-2 small mb-3">
                      <i className="fa fa-truck me-2"></i>
                      Livraison gratuite offerte !
                    </div>
                  )}

                  {subtotal < 50 && (
                    <div className="alert alert-info py-2 small mb-3">
                      <i className="fa fa-info-circle me-2"></i>
                      Plus que {(50 - subtotal).toLocaleString()} € pour la livraison gratuite
                    </div>
                  )}

                  <hr className="my-3" />

                  <div className="d-flex justify-content-between mb-4">
                    <span className="h6 fw-bold">Total</span>
                    <span className="h5 fw-bold text-primary">
                      {total.toLocaleString()} €
                    </span>
                  </div>

                  <div className="promo-code mb-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control rounded-start-pill"
                        placeholder="Code promo"
                      />
                      <button className="btn btn-outline-primary rounded-end-pill">
                        Appliquer
                      </button>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="btn btn-primary btn-lg w-100 rounded-pill py-3 mb-3"
                  >
                    <i className="fa fa-credit-card me-2"></i>
                    Valider la commande
                  </Link>

                  <div className="payment-methods text-center small text-muted">
                    <i className="fa fa-cc-visa me-2 fa-lg"></i>
                    <i className="fa fa-cc-mastercard me-2 fa-lg"></i>
                    <i className="fa fa-cc-paypal me-2 fa-lg"></i>
                    <i className="fa fa-cc-amex fa-lg"></i>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="secure-checkout small text-muted text-center">
                  <i className="fa fa-lock text-success me-2"></i>
                  Paiement 100% sécurisé
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      {/* Fil d'Ariane */}
      <div className="breadcrumb-wrapper bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Accueil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/product" className="text-decoration-none">Produits</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Panier
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contenu du panier */}
      <div className="container my-3 py-3">
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>

      <Footer />

      {/* Styles personnalisés */}
      <style jsx>{`
        .cart-item-card {
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .cart-item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
          border-color: #0d6efd20;
        }
        .sticky-top {
          z-index: 10;
        }
        .empty-cart-icon {
          animation: float 3s ease-in-out infinite;
        }
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .suggestion-card {
          transition: all 0.3s ease;
        }
        .suggestion-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          .cart-item-card {
            padding: 1rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Cart;