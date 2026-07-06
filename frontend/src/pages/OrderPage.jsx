import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { CheckCircle, Clock } from 'lucide-react';

const OrderPage = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await order ? { data: order } : await axios.get(`/api/orders/${id}`, config);
        if(!order || data._id !== id){
             setOrder(data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    
    if (userInfo) {
       fetchOrder();
    }
  }, [id, userInfo, order]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const paymentHandler = async () => {
    try {
      setPayLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // 1. Get Razorpay Key ID
      const { data: keyId } = await axios.get('/api/payment/razorpay');
      
      // 2. Create Razorpay order
      const { data: rpOrder } = await axios.post(`/api/orders/${id}/razorpay`, {}, config);

      // Real Razorpay Flow
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setPayLoading(false);
        return;
      }

      // 3. Setup options
      const options = {
        key: keyId,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        name: 'VeggieMart',
        description: `Order ${order._id}`,
        image: 'https://cdn-icons-png.flaticon.com/512/3014/3014414.png',
        order_id: rpOrder.id, 
        handler: async function (response) {
          try {
            // 4. Verify Payment on Backend
            const verificationConfig = {
               headers: {
                 'Content-Type': 'application/json',
                 Authorization: `Bearer ${userInfo.token}`,
               },
             };
            const { data: updatedOrder } = await axios.post(
              `/api/orders/${id}/pay`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              verificationConfig
            );
            setOrder(updatedOrder);
            toast.success('Payment Successful!');
            setPayLoading(false);
          } catch (err) {
            toast.error(err.response?.data?.message || err.message);
            setPayLoading(false);
          }
        },
        prefill: {
          name: order.user.name,
          email: order.user.email,
          contact: order.shippingAddress.phoneNumber,
        },
        theme: {
          color: '#4caf50',
        },
        modal: {
          ondismiss: function () {
            setPayLoading(false);
            toast.error('Payment cancelled');
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setPayLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Details</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Shipping</h2>
            <p className="mb-1"><span className="font-semibold">Name:</span> {order.shippingAddress.fullName}</p>
            <p className="mb-1"><span className="font-semibold">Email:</span> {order.user.email}</p>
            <p className="mb-4"><span className="font-semibold">Address:</span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
            
            {order.isDelivered ? (
              <div className="bg-green-100 text-green-800 p-3 rounded flex items-center">
                 <CheckCircle className="h-5 w-5 mr-2" /> Delivered on {order.deliveredAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded flex items-center">
                 <Clock className="h-5 w-5 mr-2" /> Not Delivered
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Payment</h2>
            <p className="mb-4"><span className="font-semibold">Method:</span> {order.paymentMethod}</p>
            
            {order.isPaid ? (
              <div className="bg-green-100 text-green-800 p-3 rounded flex items-center">
                 <CheckCircle className="h-5 w-5 mr-2" /> Paid on {order.paidAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 p-3 rounded flex items-center">
                 <Clock className="h-5 w-5 mr-2" /> Not Paid
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Items</h2>
            <ul className="divide-y divide-gray-200">
              {order.orderItems.map((item, index) => (
                <li key={index} className="py-3 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-grow text-sm">
                    <Link to={`/product/${item.product}`} className="font-semibold hover:text-grocery">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-sm font-medium">
                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="border-t border-gray-200 py-4 mb-6">
              <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </div>
            
            {!order.isPaid && (
              <button
                onClick={paymentHandler}
                disabled={payLoading}
                className={`w-full bg-grocery text-white py-3 rounded-lg font-bold transition shadow-sm ${payLoading ? 'opacity-70 cursor-wait' : 'hover:bg-grocery-dark'}`}
              >
                {payLoading ? 'Processing...' : `Pay ₹${order.totalPrice} with Razorpay`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
