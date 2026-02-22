// src/hooks/useFetchProducts.js
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const useFetchProducts = (url = "https://fakestoreapi.com/products/") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const componentMounted = useRef(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const products = await response.json();
        
        if (componentMounted.current) {
          setData(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
        
        if (componentMounted.current) {
          setError(error.message);
          toast.error("Erreur de chargement des produits");
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      componentMounted.current = false;
    };
  }, [url]);

  // Fonction pour recharger les données
  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const products = await response.json();
      
      if (componentMounted.current) {
        setData(products);
        setLoading(false);
        toast.success("Produits rechargés avec succès");
      }
    } catch (error) {
      console.error("Erreur lors du rechargement:", error);
      
      if (componentMounted.current) {
        setError(error.message);
        toast.error("Erreur lors du rechargement");
        setLoading(false);
      }
    }
  };

  return { data, loading, error, refetch };
};

export default useFetchProducts;