// src/components/Products.jsx
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { 
  Search, 
  Grid3x3, 
  Shirt, 
  Gem, 
  Laptop, 
  Eye, 
  RefreshCw,
  Star,
  StarHalf,
  PackageOpen,
  ChevronRight,
  Filter,
  ArrowUpDown,
  X,
  Check,
  AlertCircle
} from "lucide-react";

import useFetchProducts from "../hooks/useFetchProducts";
import useProductFilters from "../hooks/useProductFilters";
import AddToCartButton from "./AddToCartButton";

// Fonction de formatage des prix en FCFA
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const Products = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Utilisation du hook de fetch
  const { data: products, loading, error, refetch } = useFetchProducts();

  // Utilisation du hook de filtres
  const {
    filteredProducts,
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
  } = useProductFilters(products);

  // Catégories avec slugs correspondant à Django
  const categories = [
    { id: "all", name: "Tous les produits", icon: Grid3x3 },
    { id: "men-s-clothing", name: "Homme", icon: Shirt },
    { id: "women-s-clothing", name: "Femme", icon: Shirt },
    { id: "jewelery", name: "Bijoux", icon: Gem },
    { id: "electronics", name: "Électronique", icon: Laptop },
  ];

  const Loading = () => {
    return (
      <div className="row g-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm">
              <Skeleton height={200} className="card-img-top" />
              <div className="card-body">
                <Skeleton count={3} />
                <Skeleton width={100} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ErrorDisplay = () => (
    <div className="col-12 text-center py-5">
      <AlertCircle size={64} className="text-danger mb-3 mx-auto" />
      <h3 className="text-danger mb-3">Une erreur est survenue</h3>
      <p className="text-muted mb-4">{error}</p>
      <button
        className="btn btn-primary rounded-pill px-5 d-inline-flex align-items-center gap-2 mx-auto"
        onClick={refetch}
      >
        <RefreshCw size={18} />
        Réessayer
      </button>
    </div>
  );

  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} size={16} className="text-warning fill-current" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" size={16} className="text-warning fill-current" />);
    }
    return stars;
  };

  const ShowProducts = () => {
    return (
      <>
        {/* Barre de filtres améliorée */}
        <div className="filters-section bg-light p-4 rounded-3 mb-5 shadow-sm">
          {/* Bouton filtres mobile */}
          <button 
            className="btn btn-outline-primary d-md-none w-100 mb-3 rounded-pill"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter size={18} className="me-2" />
            {showMobileFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </button>

          <div className={`row g-3 align-items-center ${!showMobileFilters ? 'd-none d-md-flex' : ''}`}>
            {/* Barre de recherche */}
            <div className="col-md-4">
              <div className="search-box position-relative">
                <Search 
                  size={18} 
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" 
                />
                <input
                  type="text"
                  className="form-control form-control-lg rounded-pill ps-5"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
                    onClick={() => setSearchTerm("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Filtres par catégorie */}
            <div className="col-md-5">
              <div className="d-flex flex-wrap gap-2">
                {categories.map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    className={`btn rounded-pill px-4 d-inline-flex align-items-center gap-2 ${
                      activeCategory === id
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setActiveCategory(id)}
                  >
                    <Icon size={16} />
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tri */}
            <div className="col-md-3">
              <div className="d-flex gap-2 align-items-center">
                <ArrowUpDown size={18} className="text-muted" />
                <select
                  className="form-select form-select-lg rounded-pill"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Trier par</option>
                  <option value="price-asc">Prix: croissant</option>
                  <option value="price-desc">Prix: décroissant</option>
                  <option value="name-asc">Nom: A à Z</option>
                  <option value="name-desc">Nom: Z à A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
              >
                <div className="card product-card h-100 border-0 shadow-sm hover-lift">
                  {/* Badge de catégorie */}
                  <div className="position-absolute top-0 start-0 m-3 z-1">
                    <span className="badge bg-primary bg-opacity-75 text-white px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                      {product.category_name === "Vêtements Homme" && <Shirt size={14} />}
                      {product.category_name === "Vêtements Femme" && <Shirt size={14} />}
                      {product.category_name === "Bijoux" && <Gem size={14} />}
                      {product.category_name === "Électronique" && <Laptop size={14} />}
                      <span className="ms-1">{product.category_name}</span>
                    </span>
                  </div>

                  {/* Image du produit */}
                  <div className="product-image-wrapper p-4">
                    <img
                      className="card-img-top product-image"
                      src={product.image_url || product.image}
                      alt={product.title}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    {/* Titre */}
                    <h5 className="card-title fw-bold mb-2">
                      {product.title.length > 40
                        ? `${product.title.substring(0, 40)}...`
                        : product.title}
                    </h5>

                    {/* Description */}
                    <p className="card-text text-muted small flex-grow-1">
                      {product.description.substring(0, 80)}...
                    </p>

                    {/* Prix et évaluation */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="h4 fw-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="text-warning d-flex me-1">
                          {renderStars(product.rating_rate)}
                        </div>
                        <span className="text-muted small">({product.rating_count})</span>
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="d-grid gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-primary rounded-pill d-inline-flex align-items-center justify-content-center gap-2"
                      >
                        <Eye size={18} />
                        Voir détails
                      </Link>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <PackageOpen size={64} className="text-muted mb-3 mx-auto" />
              <h3 className="text-muted">Aucun produit trouvé</h3>
              <p>Essayez de modifier vos filtres de recherche</p>
              <button
                className="btn btn-primary rounded-pill px-5 d-inline-flex align-items-center gap-2 mx-auto"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchTerm("");
                  setSortBy("default");
                }}
              >
                <RefreshCw size={18} />
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Résultats trouvés */}
        {filteredProducts.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <p className="text-muted mb-0 d-flex align-items-center">
              <Check size={16} className="text-success me-1" />
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-1"
                onClick={refetch}
                title="Recharger les produits"
              >
                <RefreshCw size={14} />
                <span className="d-none d-sm-inline">Recharger</span>
              </button>
              <button
                className="btn btn-link text-primary text-decoration-none d-inline-flex align-items-center gap-1"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Haut de page <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderContent = () => {
    if (loading) return <Loading />;
    if (error) return <ErrorDisplay />;
    return <ShowProducts />;
  };

  return (
    <div className="products-page py-5">
      <div className="container">
        {/* En-tête de la page */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">
            <span className="text-primary">Nos</span> Produits
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Découvrez notre sélection de produits de qualité, soigneusement
            choisis pour répondre à tous vos besoins.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="products-content">
          {renderContent()}
        </div>
      </div>

      {/* Styles personnalisés */}
      <style jsx>{`
        .product-card {
          transition: all 0.3s ease;
          border-radius: 15px;
          overflow: hidden;
        }
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .product-image-wrapper {
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image-wrapper {
          transform: scale(1.05);
        }
        .product-image {
          transition: transform 0.3s ease;
        }
        .hover-lift {
          transition: transform 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .filters-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
          border-color: #0d6efd;
        }
        .z-1 {
          z-index: 1;
        }
        .fill-current {
          fill: currentColor;
        }
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          .filters-section {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;