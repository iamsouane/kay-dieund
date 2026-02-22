// src/components/ClearCartButton.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { delCart } from "../redux/action";
import toast from "react-hot-toast";
import { Trash2, AlertTriangle, X } from "lucide-react";

const ClearCartButton = ({ cartItems }) => {
    const dispatch = useDispatch();

    const clearCart = () => {
        if (cartItems.length > 0) {
            toast((t) => (
                <div className="d-flex flex-column align-items-center p-2" style={{ minWidth: "300px" }}>
                    <div className="d-flex align-items-center mb-3">
                        <AlertTriangle className="text-warning me-2" size={20} />
                        <span className="fw-semibold">Vider tout le panier ?</span>
                    </div>
                    <div className="d-flex justify-content-center gap-2 w-100">
                        <button
                            className="btn btn-danger btn-sm px-4"
                            onClick={() => {
                                cartItems.forEach(item => {
                                    for (let i = 0; i < item.qty; i++) {
                                        dispatch(delCart(item));
                                    }
                                });
                                toast.dismiss(t.id);
                                toast.success("Panier vidé", {
                                    icon: '🗑️',
                                    duration: 3000
                                });
                            }}
                        >
                            Vider
                        </button>
                        <button
                            className="btn btn-outline-secondary btn-sm px-4"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            ), {
                duration: 8000,
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
        }
    };

    return (
        <button
            className="btn btn-outline-danger rounded-pill d-flex align-items-center gap-2 px-4 py-2"
            onClick={clearCart}
        >
            <Trash2 size={18} />
            <span>Vider le panier</span>
        </button>
    );
};

export default ClearCartButton;