import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { CheckCircle, Clock } from 'lucide-react';

const ProfilePage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await api.get('/orders/myorders', config);
          setOrders(data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [userInfo, navigate]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Profile</h2>
            <div className="mb-4">
               <label className="text-gray-500 text-sm">Name</label>
               <p className="font-semibold text-lg">{userInfo?.name}</p>
            </div>
            <div className="mb-4">
               <label className="text-gray-500 text-sm">Email</label>
               <p className="font-semibold text-lg">{userInfo?.email}</p>
            </div>
            <div className="mt-8">
                <span className="bg-grocery-light text-grocery-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Customer Account
                </span>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
          {loading ? (
            <Loader />
          ) : error ? (
             <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
          ) : orders.length === 0 ? (
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                 <p className="text-gray-500 mb-4 text-lg">You haven't placed any orders yet.</p>
                 <Link to="/products" className="bg-grocery text-white px-6 py-2 rounded-full font-medium hover:bg-grocery-dark transition">Start Shopping</Link>
             </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                       <th className="p-4 font-semibold">ID</th>
                       <th className="p-4 font-semibold">Date</th>
                       <th className="p-4 font-semibold">Total</th>
                       <th className="p-4 font-semibold">Paid</th>
                       <th className="p-4 font-semibold">Delivered</th>
                       <th className="p-4 font-semibold text-center">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 text-sm">
                     {orders.map((order) => (
                       <tr key={order._id} className="hover:bg-gray-50 transition">
                         <td className="p-4 text-gray-900 font-medium">{order._id.substring(0, 8)}...</td>
                         <td className="p-4 text-gray-600">{order.createdAt.substring(0, 10)}</td>
                         <td className="p-4 text-gray-900 font-semibold">₹{order.totalPrice}</td>
                         <td className="p-4">
                           {order.isPaid ? (
                              <CheckCircle className="h-5 w-5 text-green-500 inline" />
                           ) : (
                              <Clock className="h-5 w-5 text-red-500 inline" />
                           )}
                         </td>
                         <td className="p-4">
                           {order.isDelivered ? (
                              <CheckCircle className="h-5 w-5 text-green-500 inline" />
                           ) : (
                              <Clock className="h-5 w-5 text-yellow-500 inline" />
                           )}
                         </td>
                         <td className="p-4 text-center">
                           <Link to={`/order/${order._id}`} className="bg-grocery-light text-grocery-dark px-3 py-1 rounded hover:bg-grocery hover:text-white transition text-xs font-bold">
                             Details
                           </Link>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
