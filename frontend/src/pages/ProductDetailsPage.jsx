import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api, { getImageUrl } from '../api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    });
    toast.success('Added to cart!');
    navigate('/cart');
  };

  return (
    <div>
      <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-grocery mb-6 transition">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="md:w-1/2">
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div className="md:w-1/2 flex flex-col">
            <div className="mb-2 text-sm text-grocery font-semibold uppercase tracking-wider">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
            
            <div className="text-3xl font-extrabold text-gray-900 mb-6">
              ₹{product.price}
            </div>

            <div className="mb-6 flex items-center">
              <span className="text-gray-700 font-medium mr-4">Status:</span>
              <span className={`font-bold ${product.countInStock > 0 ? 'text-grocery' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="mb-8 flex items-center">
                <span className="text-gray-700 font-medium mr-4">Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 focus:ring-grocery focus:border-grocery outline-none"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`mt-auto py-3 px-6 rounded-lg font-bold text-lg flex items-center justify-center transition-all ${
                product.countInStock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-grocery text-white hover:bg-grocery-dark shadow-md hover:shadow-lg'
              }`}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
