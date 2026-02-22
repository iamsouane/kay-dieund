// src/pages/Checkout.jsx
import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.handleCart);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "Sénégal",
    region: "Dakar",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    saveInfo: false,
    sameAddress: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.address.trim()) newErrors.address = "Adresse requise";
    if (!formData.country) newErrors.country = "Pays requis";
    if (!formData.region) newErrors.region = "Région requise";
    if (!formData.zip.trim()) newErrors.zip = "Code postal requis";

    if (paymentMethod === "card") {
      if (!formData.cardName.trim()) newErrors.cardName = "Nom sur la carte requis";
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Numéro de carte requis";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Numéro de carte invalide (16 chiffres)";
      }
      if (!formData.expiration.trim()) {
        newErrors.expiration = "Date d'expiration requise";
      } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiration)) {
        newErrors.expiration = "Format MM/AA invalide";
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV requis";
      } else if (!/^\d{3}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV invalide (3 chiffres)";
      }
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

    // Simuler la validation de commande
    setTimeout(() => {
      toast.success("Commande validée avec succès !");
      navigate("/order-confirmation");
      setIsSubmitting(false);
    }, 2000);
  };

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
              Ajoutez des articles avant de passer à la caisse
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

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    
    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const shippingCost = subtotal > 200 ? 0 : shipping;
    const total = subtotal + shippingCost;

    return (
      <div className="checkout-page py-4">
        <div className="container">
          {/* Fil d'Ariane */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/cart">Panier</Link></li>
              <li className="breadcrumb-item active">Validation</li>
              <li className="breadcrumb-item disabled">Confirmation</li>
            </ol>
          </nav>

          <div className="row g-4">
            {/* Formulaire de livraison et paiement */}
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                {/* Informations personnelles */}
                <div className="checkout-section bg-white rounded-4 shadow-sm p-4 mb-4">
                  <h5 className="fw-bold mb-4">
                    <i className="fa fa-user text-primary me-2"></i>
                    Informations personnelles
                  </h5>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Prénom</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`form-control form-control-lg ${errors.firstName ? 'is-invalid' : ''}`}
                        placeholder="Votre prénom"
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">{errors.firstName}</div>
                      )}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`form-control form-control-lg ${errors.lastName ? 'is-invalid' : ''}`}
                        placeholder="Votre nom"
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">{errors.lastName}</div>
                      )}
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="vous@exemple.com"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Adresse de livraison */}
                <div className="checkout-section bg-white rounded-4 shadow-sm p-4 mb-4">
                  <h5 className="fw-bold mb-4">
                    <i className="fa fa-map-marker text-primary me-2"></i>
                    Adresse de livraison
                  </h5>
                  
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`form-control form-control-lg ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="Numéro et nom de rue"
                      />
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Complément d'adresse <span className="text-muted">(Optionnel)</span>
                      </label>
                      <input
                        type="text"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Appartement, étage, etc."
                      />
                    </div>
                    
                    <div className="col-md-5">
                      <label className="form-label fw-semibold">Pays</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`form-select form-select-lg ${errors.country ? 'is-invalid' : ''}`}
                      >
                        <option>Sénégal</option>
                        <option>Mali</option>
                        <option>Côte d'Ivoire</option>
                        <option>France</option>
                      </select>
                      {errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>
                    
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Région</label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className={`form-select form-select-lg ${errors.region ? 'is-invalid' : ''}`}
                      >
                        <option>Dakar</option>
                        <option>Thiès</option>
                        <option>Saint-Louis</option>
                        <option>Diourbel</option>
                      </select>
                      {errors.region && (
                        <div className="invalid-feedback">{errors.region}</div>
                      )}
                    </div>
                    
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Code postal</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className={`form-control form-control-lg ${errors.zip ? 'is-invalid' : ''}`}
                        placeholder="Code postal"
                      />
                      {errors.zip && (
                        <div className="invalid-feedback">{errors.zip}</div>
                      )}
                    </div>
                    
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="sameAddress"
                          checked={formData.sameAddress}
                          onChange={handleChange}
                          className="form-check-input"
                          id="sameAddress"
                        />
                        <label className="form-check-label" htmlFor="sameAddress">
                          L'adresse de facturation est identique
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mode de paiement */}
                <div className="checkout-section bg-white rounded-4 shadow-sm p-4 mb-4">
                  <h5 className="fw-bold mb-4">
                    <i className="fa fa-credit-card text-primary me-2"></i>
                    Mode de paiement
                  </h5>
                  
                  <div className="payment-methods mb-4">
                    <div className="row g-2">
                      <div className="col-md-4">
                        <div 
                          className={`payment-card p-3 rounded-3 border text-center cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <i className="fa fa-credit-card fa-2x mb-2 text-primary"></i>
                          <p className="mb-0 fw-semibold">Carte bancaire</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div 
                          className={`payment-card p-3 rounded-3 border text-center cursor-pointer ${paymentMethod === 'orange' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                          onClick={() => setPaymentMethod('orange')}
                        >
                          <i className="fa fa-mobile fa-2x mb-2 text-primary"></i>
                          <p className="mb-0 fw-semibold">Orange Money</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div 
                          className={`payment-card p-3 rounded-3 border text-center cursor-pointer ${paymentMethod === 'paypal' ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                          onClick={() => setPaymentMethod('paypal')}
                        >
                          <i className="fa fa-paypal fa-2x mb-2 text-primary"></i>
                          <p className="mb-0 fw-semibold">PayPal</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold">Nom sur la carte</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`form-control form-control-lg ${errors.cardName ? 'is-invalid' : ''}`}
                          placeholder="Comme inscrit sur la carte"
                        />
                        {errors.cardName && (
                          <div className="invalid-feedback">{errors.cardName}</div>
                        )}
                      </div>
                      
                      <div className="col-12">
                        <label className="form-label fw-semibold">Numéro de carte</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className={`form-control form-control-lg ${errors.cardNumber ? 'is-invalid' : ''}`}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && (
                          <div className="invalid-feedback">{errors.cardNumber}</div>
                        )}
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Date d'expiration</label>
                        <input
                          type="text"
                          name="expiration"
                          value={formData.expiration}
                          onChange={handleChange}
                          className={`form-control form-control-lg ${errors.expiration ? 'is-invalid' : ''}`}
                          placeholder="MM/AA"
                          maxLength="5"
                        />
                        {errors.expiration && (
                          <div className="invalid-feedback">{errors.expiration}</div>
                        )}
                      </div>
                      
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className={`form-control form-control-lg ${errors.cvv ? 'is-invalid' : ''}`}
                          placeholder="123"
                          maxLength="3"
                        />
                        {errors.cvv && (
                          <div className="invalid-feedback">{errors.cvv}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'orange' && (
                    <div className="text-center py-3">
                      <i className="fa fa-mobile fa-3x text-primary mb-3"></i>
                      <p>Vous recevrez une notification sur votre téléphone pour confirmer le paiement.</p>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="text-center py-3">
                      <i className="fa fa-paypal fa-3x text-primary mb-3"></i>
                      <p>Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
                    </div>
                  )}
                </div>

                {/* Bouton de validation */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 rounded-pill py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-check-circle me-2"></i>
                      Confirmer la commande
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Résumé de la commande */}
            <div className="col-lg-4">
              <div className="order-summary bg-white rounded-4 shadow-sm p-4 sticky-top" style={{ top: "100px" }}>
                <h5 className="fw-bold mb-4">
                  <i className="fa fa-file-text text-primary me-2"></i>
                  Récapitulatif
                </h5>

                {/* Liste des articles */}
                <div className="order-items mb-4">
                  {state.map((item) => (
                    <div key={item.id} className="d-flex gap-3 mb-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        style={{ width: "50px", height: "50px", objectFit: "contain" }}
                        className="bg-light rounded-3 p-1"
                      />
                      <div className="flex-grow-1">
                        <h6 className="small fw-bold mb-1">{item.title.substring(0, 30)}</h6>
                        <small className="text-muted">{item.qty} x {item.price.toLocaleString()} €</small>
                      </div>
                      <span className="fw-bold">{(item.price * item.qty).toLocaleString()} €</span>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="summary-details">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Sous-total</span>
                    <span>{subtotal.toLocaleString()} €</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Livraison</span>
                    <span className={shippingCost === 0 ? "text-success" : ""}>
                      {shippingCost === 0 ? "Gratuite" : `${shippingCost.toLocaleString()} €`}
                    </span>
                  </div>
                  {shippingCost === 0 && (
                    <div className="alert alert-success py-1 small mb-2">
                      <i className="fa fa-truck me-1"></i>
                      Livraison gratuite !
                    </div>
                  )}
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="h6 fw-bold">Total</span>
                  <span className="h5 fw-bold text-primary">{total.toLocaleString()} €</span>
                </div>

                {/* Modes de paiement acceptés */}
                <div className="payment-icons text-center small text-muted">
                  <i className="fa fa-cc-visa me-2 fa-2x"></i>
                  <i className="fa fa-cc-mastercard me-2 fa-2x"></i>
                  <i className="fa fa-cc-paypal me-2 fa-2x"></i>
                  <i className="fa fa-mobile fa-2x"></i>
                </div>

                <hr />

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
      
      <div className="checkout-wrapper py-4">
        {state.length > 0 ? <ShowCheckout /> : <EmptyCart />}
      </div>

      <Footer />

      {/* Styles personnalisés */}
      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .payment-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .payment-card:hover {
          border-color: #0d6efd !important;
          background-color: rgba(13, 110, 253, 0.05);
        }
        .checkout-section {
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .checkout-section:hover {
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        .sticky-top {
          z-index: 10;
        }
        .form-control-lg, .form-select-lg {
          padding: 1rem;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }
        .form-control-lg:focus, .form-select-lg:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
        }
        .empty-cart-icon {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @media (max-width: 768px) {
          .checkout-section {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Checkout;