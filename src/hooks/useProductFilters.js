// src/hooks/useProductFilters.js
import { useState, useEffect } from "react";

const useProductFilters = (products) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        let filtered = [...products];

        // Filtre par catégorie
        if (activeCategory !== "all") {
            filtered = filtered.filter(item => item.category === activeCategory);
        }

        // Filtre par recherche
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Tri
        switch (sortBy) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "name-desc":
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [products, activeCategory, searchTerm, sortBy]);

    return {
        filteredProducts,
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
    };
};

export default useProductFilters;