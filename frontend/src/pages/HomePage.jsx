import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.slice(0, 4)); // Show only top 4 as featured
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-grocery-light rounded-3xl p-8 md:p-16 mb-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Fresh & Organic <br />
            <span className="text-grocery">Vegetables</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get the freshest vegetables delivered directly from the farm to your doorstep. Healthy eating has never been easier.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-grocery text-white px-6 py-3 rounded-full font-bold hover:bg-grocery-dark transition"
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Fresh Vegetables Assortment"
            className="rounded-2xl shadow-xl w-full max-w-md object-cover h-64 md:h-80"
          />
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-grocery font-semibold hover:underline">
            View All
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-200 mt-12">
        <div className="text-center">
          <div className="bg-grocery-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-grocery" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h3 className="font-bold text-lg mb-2">100% Organic</h3>
          <p className="text-gray-500">Grown without synthetic pesticides or fertilizers.</p>
        </div>
        <div className="text-center">
          <div className="bg-grocery-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-grocery" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
          <p className="text-gray-500">Same-day delivery for ultimate freshness.</p>
        </div>
        <div className="text-center">
          <div className="bg-grocery-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-grocery" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </div>
          <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
          <p className="text-gray-500">100% secure payments via Razorpay.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
