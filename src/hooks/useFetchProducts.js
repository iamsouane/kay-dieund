// src/hooks/useFetchProducts.js
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const useFetchProducts = (
  initialParams = { page: 1, category: "", search: "", ordering: "" }
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 1,
  });
  
  const [params, setParams] = useState(initialParams);
  const componentMounted = useRef(true);

  const fetchProducts = async (fetchParams = params) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/products/', {
        params: {
          page: fetchParams.page,
          category: fetchParams.category || undefined,
          search: fetchParams.search || undefined,
          ordering: fetchParams.ordering || undefined,
        }
      });
      
      if (componentMounted.current) {
        setData(response.data.results);
        
        // Calculer la pagination
        const totalPages = Math.ceil(response.data.count / 12); // 12 items par page
        
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          currentPage: fetchParams.page,
          totalPages: totalPages,
        });
        
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
      
      if (componentMounted.current) {
        setError(error.response?.data?.detail || error.message);
        toast.error("Erreur de chargement des produits");
        setLoading(false);
      }
    }
  };

  // Effet pour charger les produits au montage ou quand les params changent
  useEffect(() => {
    fetchProducts(params);

    return () => {
      componentMounted.current = false;
    };
  }, [params.page, params.category, params.search, params.ordering]);

  // Fonction pour changer de page
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setParams(prev => ({ ...prev, page }));
    }
  };

  // Fonction pour appliquer les filtres
  const applyFilters = (newFilters) => {
    setParams(prev => ({ 
      ...prev, 
      ...newFilters,
      page: 1 // Reset à la page 1 quand on filtre
    }));
  };

  // Fonction pour recharger les données
  const refetch = () => {
    fetchProducts(params);
    toast.success("Produits rechargés avec succès");
  };

  return { 
    data, 
    loading, 
    error, 
    pagination,
    params,
    goToPage,
    applyFilters,
    refetch 
  };
};

export default useFetchProducts;