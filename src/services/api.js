// src/services/api.js
import axios from 'axios';

// Configuration de base de l'API
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * PRODUITS
 */

// Récupérer tous les produits avec pagination et filtres
export const getProducts = (params = {}) => {
  return api.get('/products/', { params });
};

// Récupérer un produit par son ID
export const getProduct = (id) => {
  return api.get(`/products/${id}/`);
};

// Récupérer les produits par catégorie
export const getProductsByCategory = (categoryId, page = 1) => {
  return api.get('/products/', {
    params: {
      category: categoryId,
      page: page
    }
  });
};

// Rechercher des produits
export const searchProducts = (query, page = 1) => {
  return api.get('/products/', {
    params: {
      search: query,
      page: page
    }
  });
};

/**
 * CATÉGORIES
 */

// Récupérer toutes les catégories
export const getCategories = () => {
  return api.get('/categories/');
};

// Récupérer une catégorie par son ID
export const getCategory = (id) => {
  return api.get(`/categories/${id}/`);
};

/**
 * FORMATAGE
 */

// Formater les prix en FCFA
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Formater les dates
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * UTILITAIRES
 */

// Gestionnaire d'erreurs générique
export const handleApiError = (error) => {
  if (error.response) {
    // La requête a été faite et le serveur a répondu avec un code d'erreur
    console.error('Erreur serveur:', error.response.data);
    console.error('Status:', error.response.status);
    return error.response.data?.detail || 'Une erreur est survenue';
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    console.error('Pas de réponse du serveur:', error.request);
    return 'Impossible de contacter le serveur';
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    console.error('Erreur:', error.message);
    return 'Erreur de requête';
  }
};

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = handleApiError(error);
    // Vous pouvez ajouter ici une notification toast globale si vous voulez
    // toast.error(errorMessage);
    return Promise.reject(error);
  }
);

/**
 * AUTHENTIFICATION
 */

// Inscription
export const register = (userData) => {
  // Transforme fullName en first_name + last_name pour Django
  const nameParts = userData.fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return api.post('/register/', {
    username: userData.email, // ou tu peux utiliser email comme username
    email: userData.email,
    password: userData.password,
    password2: userData.confirmPassword,
    first_name: firstName,
    last_name: lastName
  });
};

// Connexion
export const login = (credentials) => {
  return api.post('/login/', {
    username: credentials.email, // Django attend 'username' par défaut
    password: credentials.password
  });
};

// Rafraîchir le token
export const refreshToken = (refresh) => {
  return api.post('/token/refresh/', { refresh });
};

// Récupérer le profil
export const getProfile = () => {
  return api.get('/profile/');
};

export default api;