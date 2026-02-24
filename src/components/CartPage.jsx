import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice
  } = useCart(); // ✅ all from context

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-page-content">
          
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                
                <img src={item.image} alt={item.name} />
                
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div>
                  ₹{item.price * item.quantity}
                </div>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{getTotalPrice()}</h2>

            <Link to="/">Continue Shopping</Link>
            <button>Checkout</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;