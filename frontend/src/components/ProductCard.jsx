import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden border border-gray-100 flex flex-col">
      <Link to={`/product/${product._id}`} className="block relative h-48 overflow-hidden">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
        />
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-grocery font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-grocery transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
          <Link
            to={`/product/${product._id}`}
            className="text-sm bg-grocery-light text-grocery-dark px-3 py-1.5 rounded font-medium hover:bg-grocery hover:text-white transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
