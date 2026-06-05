import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LineChart } from '../../components/CustomCharts';
import { 
  Plus, Trash2, DollarSign, Calendar, Star, TrendingUp, 
  Settings, CheckCircle, XCircle, Clock, ShoppingBag 
} from 'lucide-react';

export default function VendorDashboard({ activeTab, setActiveTab }) {
  const {
    currentUser, services, addService, deleteService, bookings, updateBookingStatus, reviews, analytics,
    serviceCategories
  } = useApp();

  // Wizard state for adding services
  const [srvTitle, setSrvTitle] = useState('');
  const [srvCategory, setSrvCategory] = useState('');
  const [srvPrice, setSrvPrice] = useState(150);
  const [srvDescription, setSrvDescription] = useState('');

  // Filter records for this vendor
  const vendorServices = services.filter(s => s.vendorId === currentUser?.id);
  const vendorBookings = bookings.filter(b => b.vendorId === currentUser?.id);
  const vendorReviews = reviews.filter(r => r.vendorId === currentUser?.id);

  // Math stats
  const totalEarnings = vendorBookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + (b.price || 0), 0);

  const averageRating = vendorReviews.length > 0 
    ? (vendorReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / vendorReviews.length).toFixed(1)
    : '5.0';

  const handleAddService = (e) => {
    e.preventDefault();
    if (!srvTitle || !srvDescription) return;

    addService({
      title: srvTitle,
      vendorId: currentUser?.id || 'u-vendor-1',
      vendorName: currentUser?.name || 'Apex Creative Services',
      price: Number(srvPrice),
      category: srvCategory || serviceCategories[0] || 'Development',
      description: srvDescription
    });

    // Reset wizard
    setSrvTitle('');
    setSrvDescription('');
    setSrvCategory('');
    setActiveTab('services');
  };

  // Mock revenue chart for vendor overview
  const vendorRevenueData = [
    { name: 'Jan', amount: Math.round(totalEarnings * 0.3) },
    { name: 'Feb', amount: Math.round(totalEarnings * 0.45) },
    { name: 'Mar', amount: Math.round(totalEarnings * 0.6) },
    { name: 'Apr', amount: Math.round(totalEarnings * 0.8) },
    { name: 'May', amount: Math.round(totalEarnings * 0.95) },
    { name: 'Jun', amount: totalEarnings }
  ];

  return (
    <div className="space-y-6 w-full animate-slide-up">
      {/* ----------------------------------------------------
          OVERVIEW / EARNINGS TAB
         ---------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Total Revenue</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">${totalEarnings.toLocaleString()}</h4>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/15">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Booking Requests</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{vendorBookings.length}</h4>
              </div>
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/15">
                <Calendar size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Average Rating</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{averageRating} / 5.0</h4>
              </div>
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/15">
                <Star size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Listed Services</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{vendorServices.length}</h4>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/15">
                <ShoppingBag size={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-slate-200">Revenue Generation</h3>
                <span className="text-slate-400 text-xs font-medium">Fiscal H1 2026</span>
              </div>
              <LineChart data={vendorRevenueData} height={200} />
            </div>

            <div className="glass-panel p-6 rounded-2xl lg:col-span-1">
              <h3 className="text-base font-bold text-slate-200 mb-4">Activity Log</h3>
              <div className="space-y-4">
                {vendorBookings.slice(0, 4).map(b => (
                  <div key={b.id} className="flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-slate-300">{b.customerName}</div>
                      <div className="text-slate-500 mt-0.5">{b.serviceTitle}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-indigo-400">${b.price}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{b.date}</div>
                    </div>
                  </div>
                ))}
                {vendorBookings.length === 0 && (
                  <div className="text-center text-slate-500 py-12 text-xs">No bookings requests.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          ADD SERVICE TAB
         ---------------------------------------------------- */}
      {activeTab === 'add-service' && (
        <div className="glass-panel p-6 rounded-2xl max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-800">
            <Plus className="text-indigo-400" size={20} />
            <h2 className="text-lg font-bold text-slate-100">Create Service Package</h2>
          </div>
          <form onSubmit={handleAddService} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Service Package Name</label>
                <input 
                  type="text" 
                  value={srvTitle} 
                  onChange={(e) => setSrvTitle(e.target.value)} 
                  placeholder="e.g. Full-Stack Shopify Setup"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Service Category</label>
                <select 
                  value={srvCategory || serviceCategories[0] || ''} 
                  onChange={(e) => setSrvCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                >
                  {serviceCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-semibold text-xs">Pricing Rate (USD)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">$</div>
                <input 
                  type="number" 
                  value={srvPrice} 
                  onChange={(e) => setSrvPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl pl-9 pr-4 py-2.5 text-slate-100 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-semibold text-xs">Full Package Description</label>
              <textarea 
                rows="5"
                value={srvDescription} 
                onChange={(e) => setSrvDescription(e.target.value)}
                placeholder="Give details on delivery times, technologies, and milestones included..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none resize-none"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20"
            >
              Publish Service Package
            </button>
          </form>
        </div>
      )}

      {/* ----------------------------------------------------
          MANAGE SERVICES TAB
         ---------------------------------------------------- */}
      {activeTab === 'services' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Active Service Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendorServices.map(srv => (
              <div key={srv.id} className="border border-slate-800/80 bg-slate-950/20 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">{srv.title}</h3>
                      <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold uppercase tracking-wider">
                        {srv.category}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteService(srv.id)}
                      className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs mt-3.5 leading-relaxed line-clamp-3">
                    {srv.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star size={13} fill="currentColor"/> {srv.rating || '5.0'} <span className="text-slate-500 font-normal">({srv.reviewsCount || 0})</span>
                  </div>
                  <span className="text-indigo-400 font-extrabold text-sm">
                    ${srv.price}
                  </span>
                </div>
              </div>
            ))}

            {vendorServices.length === 0 && (
              <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
                No active service listings. Start offering a new service!
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          BOOKING REQUESTS / ORDERS TAB
         ---------------------------------------------------- */}
      {activeTab === 'orders' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Incoming Booking Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Scheduled Date</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {vendorBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-semibold text-slate-300">{b.customerName}</td>
                    <td className="py-3.5 text-slate-400">{b.serviceTitle}</td>
                    <td className="py-3.5 text-slate-400">{b.date}</td>
                    <td className="py-3.5 text-indigo-400 font-bold">${b.price}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                        b.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400' :
                        b.status === 'Cancelled' ? 'bg-red-500/15 text-red-400' :
                        b.status === 'Confirmed' ? 'bg-blue-500/15 text-blue-400' :
                        'bg-amber-500/15 text-amber-400 animate-pulse'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      {b.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => updateBookingStatus(b.id, 'Cancelled')}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-lg transition"
                          >
                            Decline
                          </button>
                          <button 
                            onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg transition"
                          >
                            Accept
                          </button>
                        </>
                      )}
                      {b.status === 'Confirmed' && (
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'Completed')}
                          className="bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg transition font-semibold"
                        >
                          Complete
                        </button>
                      )}
                      {(b.status === 'Completed' || b.status === 'Cancelled') && (
                        <span className="text-slate-500 text-[11px]">No pending actions</span>
                      )}
                    </td>
                  </tr>
                ))}
                {vendorBookings.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-slate-500 py-10">No bookings requests.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          CUSTOMER REVIEWS TAB
         ---------------------------------------------------- */}
      {activeTab === 'reviews' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Customer Testimonials & Ratings</h2>
          <div className="space-y-4">
            {vendorReviews.map(r => (
              <div key={r.id} className="border border-slate-800/80 bg-slate-950/20 p-5 rounded-2xl hover:border-slate-700/40 transition duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">{r.reviewerName}</h4>
                    <span className="text-slate-500 text-[10px] block mt-0.5">Reviewed on: {r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        fill={i < r.rating ? 'currentColor' : 'none'} 
                        className={i < r.rating ? 'text-amber-400' : 'text-slate-700'} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mt-3 border-l-2 border-indigo-500/40 pl-3">
                  "{r.comment}"
                </p>
              </div>
            ))}

            {vendorReviews.length === 0 && (
              <div className="text-center py-10 text-slate-500 text-sm">
                No customer ratings recorded yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
