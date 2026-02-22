// src/components/AddToCartButton.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

const AddToCartButton = ({ product, variant = "primary", className = "", showIcon = true, children }) => {
    const dispatch = useDispatch();

    const addProduct = (product) => {
        dispatch(addCart({ ...product, qty: 1 }));
        toast.success("Ajouté au panier", {
            icon: '🛒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    return (
        <button
            className={`btn btn-${variant} rounded-pill d-inline-flex align-items-center justify-content-center gap-2 ${className}`}
            onClick={() => addProduct(product)}
        >
            {showIcon && <ShoppingCart size={18} />}
            {children || "Ajouter au panier"}
        </button>
    );
};

export default AddToCartButton;