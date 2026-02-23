import React from "react";
import "../styles/CartSidebar.css";

function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,   // ✅ Added
}) {
  // 🧮 Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      
      {/* 🔝 Header */}
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* 🛒 Cart Items */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              
              {/* 🖼 Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              {/* 📦 Product Details */}
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">
                  ${item.price.toFixed(2)}
                </p>
                <p className="cart-item-subtotal">
                  Subtotal: $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* 🔢 Quantity Controls */}
              <div className="cart-item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    onUpdateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </button>

                <span className="quantity-display">
                  {item.quantity}
                </span>

                <button
                  className="quantity-btn"
                  onClick={() =>
                    onUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* ❌ Remove Button */}
              <button
                className="remove-btn"
                onClick={() => onRemoveItem(item.id)}
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* 💰 Footer Total + Clear Button */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>

          {/* 🧹 Clear Cart Button */}
          <button 
            className="clear-cart-btn"
            onClick={onClearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;