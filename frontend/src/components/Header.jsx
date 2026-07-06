import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <header className="bg-grocery text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-white" />
            <span className="font-bold text-xl tracking-tight">VeggieMart</span>
          </Link>
          
          <nav className="flex space-x-6 items-center">
            <Link to="/products" className="hover:text-grocery-light transition">
              Products
            </Link>
            
            <Link to="/cart" className="flex items-center hover:text-grocery-light transition relative">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center hover:text-grocery-light transition">
                  <User className="h-5 w-5 mr-1" />
                  <span>{userInfo.name}</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center hover:text-grocery-light transition">
                <User className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
