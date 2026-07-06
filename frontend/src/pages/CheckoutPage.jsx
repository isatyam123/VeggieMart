import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { shippingAddress, saveShippingAddress, cartItems, itemsPrice, paymentMethod, savePaymentMethod, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(shippingAddress.fullName || userInfo?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [pincode, setPincode] = useState(shippingAddress.pincode || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    saveShippingAddress({ fullName, phoneNumber, address, city, pincode });
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/orders`,
        {
          orderItems: cartItems,
          shippingAddress: { fullName, phoneNumber, address, city, pincode },
          paymentMethod,
          totalPrice: itemsPrice,
        },
        config
      );

      clearCart();
      toast.success('Order Placed! Proceeding to Payment...');
      navigate(`/order/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Shipping Details</h2>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-grocery focus:border-grocery outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-grocery focus:border-grocery outline-none"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-grocery focus:border-grocery outline-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-1">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-grocery focus:border-grocery outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Pincode</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-grocery focus:border-grocery outline-none"
              />
            </div>
          </div>
          
          <div className="mb-8">
             <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment Method</h2>
             <div className="flex items-center space-x-2">
                <input 
                   type="radio" 
                   id="razorpay" 
                   name="paymentMethod" 
                   value="Razorpay" 
                   checked={paymentMethod === 'Razorpay'} 
                   onChange={(e) => savePaymentMethod(e.target.value)}
                   className="h-4 w-4 text-grocery focus:ring-grocery border-gray-300"
                />
                <label htmlFor="razorpay" className="font-medium text-gray-700">Razorpay (Cards, UPI, NetBanking)</label>
             </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <div className="flex justify-between font-bold text-lg">
              <span>Total to Pay:</span>
              <span>₹{itemsPrice}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className={`w-full bg-grocery text-white py-3 rounded-lg font-bold text-lg transition ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-grocery-dark shadow-md'
            }`}
          >
            {loading ? 'Placing Order...' : 'Place Order & Pay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
