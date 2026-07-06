import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, itemsPrice } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=checkout');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any vegetables yet.</p>
          <Link to="/products" className="bg-grocery text-white px-6 py-2 rounded-full font-medium hover:bg-grocery-dark transition">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.product} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-grow text-center sm:text-left">
                      <Link to={`/product/${item.product}`} className="text-lg font-semibold text-gray-900 hover:text-grocery">
                        {item.name}
                      </Link>
                      <div className="text-gray-600 font-medium mt-1">₹{item.price}</div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <select
                        value={item.qty}
                        onChange={(e) => addToCart(item, Number(e.target.value))}
                        className="border border-gray-300 rounded p-1 focus:ring-grocery focus:border-grocery outline-none"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      
                      <button
                        onClick={() => removeFromCart(item.product)}
                        className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full hover:bg-red-100 transition"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 text-gray-600">
                <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                <span>₹{itemsPrice}</span>
              </div>
              
              <div className="border-t border-gray-200 py-4 mb-6">
                <div className="flex justify-between items-center font-bold text-lg text-gray-900">
                  <span>Subtotal</span>
                  <span>₹{itemsPrice}</span>
                </div>
              </div>
              
              <button
                onClick={checkoutHandler}
                className="w-full bg-grocery text-white py-3 rounded-lg font-bold hover:bg-grocery-dark transition shadow-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
