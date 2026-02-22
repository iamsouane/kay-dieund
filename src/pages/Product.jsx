// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart({ ...product, qty: quantity }));
    toast.success("Ajouté au panier", {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image);
        setLoading(false);
        
        const response2 = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
        );
        const data2 = await response2.json();
        // Filtrer pour exclure le produit actuel
        const filtered = data2.filter(item => item.id !== parseInt(id));
        setSimilarProducts(filtered);
        setLoading2(false);
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        toast.error("Erreur de chargement du produit");
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const Loading = () => {
    return (
      <div className="container my-5 py-5">
        <div className="row g-5">
          <div className="col-md-6">
            <Skeleton height={500} width="100%" borderRadius={20} />
          </div>
          <div className="col-md-6">
            <Skeleton height={40} width="60%" count={1} />
            <Skeleton height={30} width="40%" count={1} className="mt-3" />
            <Skeleton height={100} count={1} className="mt-4" />
            <Skeleton height={50} width="30%" count={1} className="mt-4" />
            <div className="d-flex gap-3 mt-4">
              <Skeleton height={50} width={150} />
              <Skeleton height={50} width={150} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="container my-5 py-4">
        <div className="row g-5">
          {/* Galerie d'images */}
          <div className="col-lg-6">
            <div className="product-gallery">
              <div className="main-image bg-light rounded-4 p-4 mb-3 text-center">
                <img
                  className="img-fluid"
                  src={selectedImage || product.image}
                  alt={product.title}
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </div>
              <div className="thumbnail-images d-flex gap-2 justify-content-center">
                {[product.image, product.image, product.image].map((img, index) => (
                  <div 
                    key={index}
                    className={`thumbnail bg-light rounded-3 p-2 cursor-pointer ${selectedImage === img ? 'border border-primary' : ''}`}
                    onClick={() => setSelectedImage(img)}
                    style={{ width: "80px", height: "80px", cursor: "pointer" }}
                  >
                    <img 
                      src={img} 
                      alt={`thumbnail-${index}`}
                      className="w-100 h-100"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Détails du produit */}
          <div className="col-lg-6">
            <div className="product-details">
              {/* Catégorie */}
              <div className="mb-3">
                <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill">
                  {product.category === "men's clothing" && "👔 Vêtements Homme"}
                  {product.category === "women's clothing" && "👗 Vêtements Femme"}
                  {product.category === "jewelery" && "💎 Bijoux"}
                  {product.category === "electronics" && "📱 Électronique"}
                </span>
              </div>

              {/* Titre */}
              <h1 className="display-5 fw-bold mb-3">{product.title}</h1>

              {/* Évaluation */}
              <div className="rating mb-3 d-flex align-items-center">
                <div className="stars text-warning me-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa fa-star${i < Math.round(product.rating?.rate) ? '' : '-o'}`}></i>
                  ))}
                </div>
                <span className="text-muted">
                  {product.rating?.rate} ({product.rating?.count} avis)
                </span>
              </div>

              {/* Prix */}
              <div className="price mb-4">
                <h2 className="display-4 fw-bold text-primary">
                  {product.price?.toLocaleString()} €
                </h2>
                <small className="text-muted">TVA incluse, livraison gratuite</small>
              </div>

              {/* Description */}
              <div className="description mb-4">
                <h5 className="fw-bold mb-3">Description</h5>
                <p className="text-muted lead">{product.description}</p>
              </div>

              {/* Quantité */}
              <div className="quantity mb-4">
                <h5 className="fw-bold mb-3">Quantité</h5>
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-outline-dark rounded-circle" 
                    onClick={decrementQuantity}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <span className="mx-3 fs-4 fw-bold">{quantity}</span>
                  <button 
                    className="btn btn-outline-dark rounded-circle" 
                    onClick={incrementQuantity}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  <span className="ms-3 text-muted">Stock disponible</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="actions d-flex gap-3 mb-4">
                <button
                  className="btn btn-primary btn-lg flex-grow-1 rounded-pill"
                  onClick={() => addProduct(product)}
                >
                  <i className="fa fa-shopping-cart me-2"></i>
                  Ajouter au panier
                </button>
                <Link
                  to="/cart"
                  className="btn btn-outline-primary btn-lg flex-grow-1 rounded-pill"
                >
                  <i className="fa fa-eye me-2"></i>
                  Voir le panier
                </Link>
              </div>

              {/* Informations supplémentaires */}
              <div className="additional-info bg-light p-4 rounded-4">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-truck text-primary me-3 fa-lg"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Livraison gratuite</h6>
                        <small className="text-muted">À partir de 50€</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-undo text-primary me-3 fa-lg"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Retour gratuit</h6>
                        <small className="text-muted">Sous 30 jours</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-shield text-primary me-3 fa-lg"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Paiement sécurisé</h6>
                        <small className="text-muted">CB, PayPal, Orange Money</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-clock text-primary me-3 fa-lg"></i>
                      <div>
                        <h6 className="fw-bold mb-0">Support 24/7</h6>
                        <small className="text-muted">Service client dédié</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div className="d-flex gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} style={{ minWidth: "250px" }}>
            <Skeleton height={300} width="100%" borderRadius={15} />
            <Skeleton height={30} width="80%" className="mt-3" />
            <Skeleton height={20} width="60%" />
            <div className="d-flex gap-2 mt-3">
              <Skeleton height={40} width={100} />
              <Skeleton height={40} width={100} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="d-flex gap-4">
        {similarProducts.map((item) => (
          <div 
            key={item.id} 
            className="product-card bg-white rounded-4 shadow-sm p-3"
            style={{ minWidth: "250px" }}
          >
            <div className="text-center mb-3">
              <img
                className="img-fluid"
                src={item.image}
                alt={item.title}
                style={{ height: "150px", objectFit: "contain" }}
              />
            </div>
            <div className="product-info">
              <h6 className="fw-bold mb-2">
                {item.title.substring(0, 30)}...
              </h6>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="h5 fw-bold text-primary">
                  {item.price?.toLocaleString()} €
                </span>
                <div className="text-warning small">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-alt"></i>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Link
                  to={`/product/${item.id}`}
                  className="btn btn-outline-primary btn-sm flex-grow-1 rounded-pill"
                >
                  <i className="fa fa-eye me-1"></i>
                  Voir
                </Link>
                <button
                  className="btn btn-primary btn-sm flex-grow-1 rounded-pill"
                  onClick={() => addProduct(item)}
                >
                  <i className="fa fa-cart-plus me-1"></i>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        ))}
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
                {product.title?.substring(0, 30)}...
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Produit principal */}
      <div className="main-product">
        {loading ? <Loading /> : <ShowProduct />}
      </div>

      {/* Produits similaires */}
      {similarProducts.length > 0 && (
        <div className="similar-products-section py-5 bg-light">
          <div className="container">
            <div className="section-header text-center mb-5">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 rounded-pill">
                Recommandations
              </span>
              <h2 className="display-6 fw-bold mb-3">Vous aimerez peut-être aussi</h2>
              <p className="text-muted">Découvrez des produits similaires qui pourraient vous intéresser</p>
            </div>

            <div className="similar-products-slider">
              {loading2 ? (
                <Loading2 />
              ) : (
                <Marquee
                  pauseOnHover={true}
                  pauseOnClick={true}
                  speed={40}
                  gradient={true}
                  gradientColor={[248, 249, 250]}
                >
                  <ShowSimilarProduct />
                </Marquee>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Styles personnalisés */}
      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .thumbnail {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        .thumbnail:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .product-card {
          transition: all 0.3s ease;
          margin: 0 10px;
        }
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .breadcrumb-item a {
          color: #6c757d;
        }
        .breadcrumb-item a:hover {
          color: #0d6efd;
        }
        @media (max-width: 768px) {
          .display-5 {
            font-size: 2rem;
          }
          .display-4 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Product;