// src/components/CartItemControls.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import toast from "react-hot-toast";
import { Plus, Minus, AlertTriangle } from "lucide-react";

const CartItemControls = ({ product }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(addCart(product));
    toast.success("Quantité augmentée", {
      icon: '➕',
      duration: 2000,
      style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#333',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      },
    });
  };

  const removeItem = () => {
    if (product.qty === 1) {
      toast((t) => (
        <div className="d-flex flex-column align-items-center p-2" style={{ minWidth: "280px" }}>
          <div className="d-flex align-items-center mb-3">
            <AlertTriangle className="text-danger me-2" size={20} />
            <span className="fw-semibold">Supprimer cet article ?</span>
          </div>
          <div className="d-flex justify-content-center gap-2 w-100">
            <button 
              className="btn btn-danger btn-sm px-4"
              onClick={() => {
                dispatch(delCart(product));
                toast.dismiss(t.id);
                toast.success("Article supprimé", {
                  icon: '🗑️',
                  duration: 3000,
                });
              }}
            >
              Oui
            </button>
            <button 
              className="btn btn-outline-secondary btn-sm px-4"
              onClick={() => toast.dismiss(t.id)}
            >
              Non
            </button>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-center',
        style: {
          borderRadius: '12px',
          background: 'white',
          color: '#333',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '16px',
        },
        icon: false,
      });
    } else {
      dispatch(delCart(product));
      toast.success("Quantité diminuée", {
        icon: '➖',
        duration: 2000,
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        },
      });
    }
  };

  return (
    <div className="d-flex align-items-center">
      <button
        className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
        onClick={removeItem}
        style={{ width: "35px", height: "35px" }}
      >
        <Minus size={16} />
      </button>
      <span className="mx-3 fw-bold">{product.qty}</span>
      <button
        className="btn btn-sm btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
        onClick={addItem}
        style={{ width: "35px", height: "35px" }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default CartItemControls;