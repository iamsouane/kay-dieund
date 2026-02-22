// src/pages/ContactPage.jsx
import React, { useState } from "react";
import { Footer, Navbar, SocialLinks } from "../components";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Clock, Map, Share2 } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
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

    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast.success("Message envoyé avec succès !");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["Cite Comico 4, Yeumbeul Nord", "Dakar, Sénégal"]
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+221 77 571 04 40", "+221 78 123 45 67"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@kaydieund.sn", "support@kaydieund.sn"]
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun - Ven: 9h - 18h", "Sam: 10h - 14h"]
    }
  ];

  // Configuration des liens sociaux pour le composant SocialLinks
  const socialLinksConfig = {
    github: "https://github.com/iamsouane",
    linkedin: "https://linkedin.com/in/serigne-ismaila-souane-b78b04392/",
    twitter: "https://twitter.com/iamsouane",
    portfolio: "#"
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="contact-hero bg-primary text-white py-5">
        <div className="container text-center py-4">
          <h1 className="display-4 fw-bold mb-3">Contactez-nous</h1>
          <p className="lead fs-4 mx-auto" style={{ maxWidth: "700px" }}>
            Une question ? Une suggestion ? Notre équipe est là pour vous répondre
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info py-5">
        <div className="container">
          <div className="row g-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="info-card bg-white p-4 rounded-4 shadow-sm text-center h-100 hover-lift">
                    <div className="info-icon bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "70px", height: "70px" }}>
                      <Icon size={28} />
                    </div>
                    <h5 className="fw-bold mb-3">{info.title}</h5>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted mb-1">{detail}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main py-5 bg-light">
        <div className="container">
          <div className="row g-5">
            {/* Formulaire de contact */}
            <div className="col-lg-7">
              <div className="contact-form bg-white p-5 rounded-4 shadow-sm">
                <div className="mb-4">
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
                    Nous écrire
                  </span>
                  <h2 className="display-6 fw-bold mb-3">Envoyez-nous un message</h2>
                  <p className="text-muted">
                    Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Nom */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label fw-semibold">
                          Nom complet <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label fw-semibold">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="vous@exemple.com"
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    {/* Sujet */}
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="subject" className="form-label fw-semibold">
                          Sujet <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control form-control-lg ${errors.subject ? 'is-invalid' : ''}`}
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Sujet de votre message"
                        />
                        {errors.subject && (
                          <div className="invalid-feedback">{errors.subject}</div>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="message" className="form-label fw-semibold">
                          Message <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className={`form-control form-control-lg ${errors.message ? 'is-invalid' : ''}`}
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Votre message..."
                        />
                        {errors.message && (
                          <div className="invalid-feedback">{errors.message}</div>
                        )}
                        <small className="text-muted">
                          {formData.message.length}/500 caractères minimum: 10
                        </small>
                      </div>
                    </div>

                    {/* Bouton submit */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg rounded-pill px-5 py-3 w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <i className="fa fa-paper-plane me-2"></i>
                            Envoyer le message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar avec infos supplémentaires */}
            <div className="col-lg-5">
              {/* Carte */}
              <div className="map-container bg-white p-4 rounded-4 shadow-sm mb-4">
                <h5 className="fw-bold mb-3 d-flex align-items-center">
                  <Map className="text-primary me-2" size={20} />
                  Notre emplacement
                </h5>
                <div className="map-placeholder bg-light rounded-3 d-flex align-items-center justify-content-center"
                  style={{ height: "250px", background: "#f8f9fa" }}>
                  <div className="text-center">
                    <MapPin size={48} className="text-primary mb-3 mx-auto" />
                    <p className="text-muted mb-0">Carte interactive</p>
                    <small className="text-muted">Dakar, Sénégal</small>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux - Utilisation du composant SocialLinks */}
              <div className="social-sidebar bg-white p-4 rounded-4 shadow-sm">
                <h5 className="fw-bold mb-4 d-flex align-items-center">
                  <Share2 className="text-primary me-2" size={20} />
                  Suivez-nous
                </h5>
                
                {/* Version colored avec label */}
                <SocialLinks 
                  variant="colored" 
                  size="md" 
                  links={socialLinksConfig}
                  className="justify-content-center"
                />

                {/* FAQ rapide */}
                <div className="quick-faq mt-4 pt-4 border-top">
                  <h6 className="fw-bold mb-3">Questions fréquentes</h6>
                  <div className="faq-item mb-3">
                    <p className="mb-1 fw-semibold">Délais de livraison ?</p>
                    <small className="text-muted">2-3 jours ouvrés partout au Sénégal</small>
                  </div>
                  <div className="faq-item mb-3">
                    <p className="mb-1 fw-semibold">Moyens de paiement ?</p>
                    <small className="text-muted">Orange Money, CB, PayPal</small>
                  </div>
                  <div className="faq-item">
                    <p className="mb-1 fw-semibold">Politique de retour ?</p>
                    <small className="text-muted">Retour gratuit sous 30 jours</small>
                  </div>
                  <Link to="/faq" className="btn btn-link text-primary p-0 mt-3">
                    Voir toutes les FAQs <i className="fa fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-5">
        <div className="container">
          <div className="newsletter-card bg-primary text-white p-5 rounded-4 shadow-lg">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h3 className="display-6 fw-bold mb-3">Restez informé</h3>
                <p className="mb-lg-0">
                  Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives
                  et les dernières actualités.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="newsletter-form d-flex gap-2">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-white bg-opacity-25 border-0 text-white"
                    placeholder="Votre adresse email"
                    style={{ backdropFilter: "blur(10px)" }}
                  />
                  <button className="btn btn-light btn-lg px-4">
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
                <small className="text-white-50 mt-2 d-block">
                  Nous ne spammons pas. Désinscription possible à tout moment.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Styles personnalisés */}
      <style jsx>{`
        .contact-hero {
          background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .info-card {
          transition: all 0.3s ease;
        }
        .form-control-lg {
          padding: 1rem 1.5rem;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }
        .form-control-lg:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .newsletter-card {
          background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
        }
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          .contact-form {
            padding: 2rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default ContactPage;