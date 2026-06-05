import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LineChart, BarChart } from '../../components/CustomCharts';
import { 
  Users, Briefcase, ShoppingBag, Sliders, Edit, 
  TrendingUp, Trash2, ShieldAlert, CheckCircle, XCircle, 
  DollarSign, MapPin, Star, Plus 
} from 'lucide-react';

export default function AdminDashboard({ activeTab }) {
  const { 
    users, toggleUserStatus, jobs, deleteJob, services, deleteService, 
    products, addProduct, deleteProduct, orders, bookings, cms, updateCMS, analytics,
    serviceCategories, productCategories,
    addServiceCategory, deleteServiceCategory,
    addProductCategory, deleteProductCategory,
    membershipRequests, approveMembershipRequest, rejectMembershipRequest
  } = useApp();

  // CMS editor states
  const [cmsHeroTitle, setCmsHeroTitle] = useState(cms?.landingHeroTitle || '');
  const [cmsHeroSub, setCmsHeroSub] = useState(cms?.landingHeroSub || '');
  const [cmsNotice, setCmsNotice] = useState(cms?.featuredNotice || '');

  // Add Product states
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState(49);
  const [prodCategory, setProdCategory] = useState('');
  const [prodDescription, setProdDescription] = useState('');

  const handleUpdateCMS = (e) => {
    e.preventDefault();
    updateCMS({
      landingHeroTitle: cmsHeroTitle,
      landingHeroSub: cmsHeroSub,
      featuredNotice: cmsNotice
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!prodTitle || !prodDescription) return;

    addProduct({
      title: prodTitle,
      price: Number(prodPrice),
      category: prodCategory || productCategories[0] || 'Software',
      description: prodDescription
    });

    setProdTitle('');
    setProdDescription('');
    setProdCategory('');
  };

  // Math totals
  const totalUsers = users.length;
  const totalJobs = jobs.length;
  const totalBookings = bookings.length;
  const totalServices = services.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0) + 
                       bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').reduce((sum, b) => sum + (b.price || 0), 0);

  // Seed chart values matching total revenue
  const revenueChartData = [
    { name: 'Jan', amount: 4300 },
    { name: 'Feb', amount: 5900 },
    { name: 'Mar', amount: 8800 },
    { name: 'Apr', amount: 7200 },
    { name: 'May', amount: 9600 },
    { name: 'Jun', amount: 12000 + totalRevenue }
  ];

  return (
    <div className="space-y-6 w-full animate-slide-up">
      {/* ----------------------------------------------------
          REPORTS & REVENUE TAB (OVERVIEW)
         ---------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Total Revenue</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">${revenueChartData[5].amount.toLocaleString()}</h4>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/15">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Platform Users</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{totalUsers}</h4>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/15">
                <Users size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Active Jobs</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{totalJobs}</h4>
              </div>
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/15">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Booked Services</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{totalBookings}</h4>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/15">
                <Sliders size={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-base font-bold text-slate-200 mb-4">Financial Growth (Platform Revenue)</h3>
              <LineChart data={revenueChartData} height={200} />
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-base font-bold text-slate-200 mb-4">Marketplace Product Sales</h3>
              <BarChart data={products} height={200} />
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          USER MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">System Accounts Registry</h2>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Joined Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Access Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-semibold text-slate-300">{u.name}</td>
                    <td className="py-3.5 text-slate-400">{u.email}</td>
                    <td className="py-3.5 text-slate-400">{u.phone}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase border ${
                        u.role === 'admin' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        u.role === 'vendor' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                        u.role === 'employer' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-500">{u.joined}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        u.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      {u.role !== 'admin' && (
                        u.status === 'active' ? (
                          <button 
                            onClick={() => toggleUserStatus(u.id, 'suspended')}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 px-2.5 py-1 rounded-lg transition"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button 
                            onClick={() => toggleUserStatus(u.id, 'active')}
                            className="bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded-lg transition"
                          >
                            Reactivate
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          VENDOR MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'vendors' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Verified Partner Logins</h2>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                  <th className="pb-3">Company Name</th>
                  <th className="pb-3">Contact Email</th>
                  <th className="pb-3">Contact Phone</th>
                  <th className="pb-3">Total Services Listed</th>
                  <th className="pb-3">Account Status</th>
                  <th className="pb-3 text-right">Auditing Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {users.filter(u => u.role === 'vendor').map(v => {
                  const vSrvs = services.filter(s => s.vendorId === v.id).length;
                  return (
                    <tr key={v.id} className="hover:bg-slate-900/10">
                      <td className="py-3.5 font-semibold text-slate-300">{v.name}</td>
                      <td className="py-3.5 text-slate-400">{v.email}</td>
                      <td className="py-3.5 text-slate-400">{v.phone}</td>
                      <td className="py-3.5 text-slate-400 font-bold">{vSrvs} services</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          v.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {v.status === 'active' ? (
                          <button 
                            onClick={() => toggleUserStatus(v.id, 'suspended')}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 px-2.5 py-1 rounded-lg transition"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button 
                            onClick={() => toggleUserStatus(v.id, 'active')}
                            className="bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded-lg transition"
                          >
                            Approve Partner
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          JOB BOARD MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'jobs' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Moderate Active Listings</h2>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Recruiter Company</th>
                  <th className="pb-3">Compensation</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Date Posted</th>
                  <th className="pb-3 text-right">Moderator actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {jobs.map(j => (
                  <tr key={j.id} className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-semibold text-slate-300">{j.title}</td>
                    <td className="py-3.5 text-slate-400">{j.company}</td>
                    <td className="py-3.5 text-indigo-400 font-bold">{j.salary}</td>
                    <td className="py-3.5 text-slate-400">{j.location}</td>
                    <td className="py-3.5 text-slate-500">{j.postedAt}</td>
                    <td className="py-3.5 text-right">
                      <button 
                        onClick={() => deleteJob(j.id)}
                        className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          PRODUCT MARKETPLACE MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add Product Form */}
          <div className="glass-panel p-6 rounded-2xl max-w-xl mx-auto">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-800">
              <Plus className="text-indigo-400" size={20} />
              <h2 className="text-base font-bold text-slate-100">Add Marketplace Digital Toolkit</h2>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Product Name</label>
                  <input 
                    type="text" 
                    value={prodTitle} 
                    onChange={(e) => setProdTitle(e.target.value)} 
                    placeholder="e.g. Figma System Guide"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500/50"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Pricing (USD)</label>
                  <input 
                    type="number" 
                    value={prodPrice} 
                    onChange={(e) => setProdPrice(e.target.value)} 
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Category Type</label>
                  <select 
                    value={prodCategory || productCategories[0] || ''} 
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500/50"
                  >
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Product Pitch / Description</label>
                  <input 
                    type="text" 
                    value={prodDescription} 
                    onChange={(e) => setProdDescription(e.target.value)} 
                    placeholder="Short description of files included..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500/50"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition"
              >
                Register Product
              </button>
            </form>
          </div>

          {/* Products List Grid */}
          <div className="glass-panel p-6 rounded-2xl">
            <h2 className="text-base font-bold text-slate-100 mb-4">Active Platform Toolkits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map(prod => (
                <div key={prod.id} className="border border-slate-900 bg-slate-950/20 p-4 rounded-xl text-xs flex flex-col justify-between hover:border-slate-800/80 transition duration-300">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-200">{prod.title}</h4>
                      <button 
                        onClick={() => deleteProduct(prod.id)}
                        className="text-slate-600 hover:text-red-400 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block uppercase">{prod.category}</span>
                    <p className="text-slate-500 mt-2 line-clamp-2 leading-relaxed">{prod.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center">
                    <span className="text-[10px] text-slate-500">Sales: {prod.sales || 0} unit(s)</span>
                    <span className="font-extrabold text-indigo-400">${prod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SERVICES MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'services' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">System Services Registry</h2>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Vendor Creator</th>
                  <th className="pb-3">Service cost</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Rating Score</th>
                  <th className="pb-3 text-right">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-semibold text-slate-300">{s.title}</td>
                    <td className="py-3.5 text-slate-400">{s.vendorName}</td>
                    <td className="py-3.5 text-indigo-400 font-bold">${s.price}</td>
                    <td className="py-3.5 text-slate-400">{s.category}</td>
                    <td className="py-3.5 font-semibold text-amber-400 flex items-center gap-1 mt-3">
                      <Star size={12} fill="currentColor"/> {s.rating || '5.0'}
                    </td>
                    <td className="py-3.5 text-right">
                      <button 
                        onClick={() => deleteService(s.id)}
                        className="text-slate-500 hover:text-red-400 p-2 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          CMS MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'cms' && (
        <div className="glass-panel p-6 rounded-2xl max-w-xl mx-auto">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-800">
            <Edit className="text-indigo-400" size={20} />
            <h2 className="text-lg font-bold text-slate-100">CMS Landing Configuration</h2>
          </div>
          <form onSubmit={handleUpdateCMS} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Hero Title Text</label>
              <input 
                type="text" 
                value={cmsHeroTitle} 
                onChange={(e) => setCmsHeroTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Hero Subtitle description</label>
              <textarea 
                rows="3"
                value={cmsHeroSub} 
                onChange={(e) => setCmsHeroSub(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none resize-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-semibold">Footer announcement notice</label>
              <input 
                type="text" 
                value={cmsNotice} 
                onChange={(e) => setCmsNotice(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-600/25"
            >
              Update Landing Page Live CMS
            </button>
          </form>
        </div>
      )}

      {/* ----------------------------------------------------
          CATEGORY MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'categories' && (
        <CategoryManagementPanel
          serviceCategories={serviceCategories}
          productCategories={productCategories}
          addServiceCategory={addServiceCategory}
          deleteServiceCategory={deleteServiceCategory}
          addProductCategory={addProductCategory}
          deleteProductCategory={deleteProductCategory}
        />
      )}

      {/* ----------------------------------------------------
          MEMBERSHIPS TAB
         ---------------------------------------------------- */}
      {activeTab === 'memberships' && (
        <div className="glass-panel p-6 rounded-2xl text-xs">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Membership Cards Transactions</h2>
              <p className="text-xs text-slate-500 mt-1">Review initial card payments and plan upgrade requests submitted by candidate seekers.</p>
            </div>
            <div className="text-xs font-semibold px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
              Pending Tasks: {membershipRequests.filter(r => r.status === 'Pending').length}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                  <th className="pb-3">Reference ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Customer (Email)</th>
                  <th className="pb-3">Requested Plan</th>
                  <th className="pb-3">Transaction Type</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Moderator Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {membershipRequests.map(r => (
                  <tr key={r.id} className="hover:bg-slate-900/10">
                    <td className="py-3.5 font-semibold text-slate-300">REF-{r.id.split('-')[1] || r.id}</td>
                    <td className="py-3.5 text-slate-400">{r.date}</td>
                    <td className="py-3.5">
                      <p className="font-semibold text-slate-200">{r.userName}</p>
                      <p className="text-[10px] text-slate-500">{r.userEmail}</p>
                    </td>
                    <td className="py-3.5">
                      <span className="font-bold text-slate-300">{r.planName} Plan</span>
                    </td>
                    <td className="py-3.5 text-slate-400">{r.type}</td>
                    <td className="py-3.5 text-indigo-400 font-bold">{r.amount}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        r.status === 'Approved' ? 'bg-emerald-500/15 text-emerald-400' :
                        r.status === 'Rejected' ? 'bg-red-500/15 text-red-400' :
                        'bg-amber-500/15 text-amber-400 animate-pulse'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      {r.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            type="button"
                            onClick={() => approveMembershipRequest(r.id)}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded-lg transition font-semibold cursor-pointer"
                          >
                            Approve
                          </button>
                          <button 
                            type="button"
                            onClick={() => rejectMembershipRequest(r.id)}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 px-2.5 py-1 rounded-lg transition font-semibold cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                  </tr>
                ))}
                {membershipRequests.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-slate-500 py-6">No membership card transactions logged.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryManagementPanel({
  serviceCategories,
  productCategories,
  addServiceCategory,
  deleteServiceCategory,
  addProductCategory,
  deleteProductCategory
}) {
  const [newServiceCat, setNewServiceCat] = useState('');
  const [newProductCat, setNewProductCat] = useState('');

  const handleAddServiceCat = (e) => {
    e.preventDefault();
    if (!newServiceCat.trim()) return;
    addServiceCategory(newServiceCat.trim());
    setNewServiceCat('');
  };

  const handleAddProductCat = (e) => {
    e.preventDefault();
    if (!newProductCat.trim()) return;
    addProductCategory(newProductCat.trim());
    setNewProductCat('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-fade-in">
      
      {/* Service Categories Panel */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-800">
            <Sliders className="text-indigo-400" size={20} />
            <h2 className="text-base font-bold text-slate-100">Service Categories</h2>
          </div>
          
          <form onSubmit={handleAddServiceCat} className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={newServiceCat}
              onChange={(e) => setNewServiceCat(e.target.value)}
              placeholder="e.g. Marketing, Consulting..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500/50"
              required
            />
            <button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shrink-0 cursor-pointer"
            >
              Add
            </button>
          </form>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {serviceCategories.map(cat => (
              <div 
                key={cat} 
                className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2 text-xs text-slate-300"
              >
                <span>{cat}</span>
                <button 
                  onClick={() => deleteServiceCategory(cat)}
                  className="text-slate-500 hover:text-red-400 p-1 rounded transition cursor-pointer"
                  title={`Delete ${cat}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {serviceCategories.length === 0 && (
              <div className="text-center text-slate-500 py-6 text-xs">No service categories defined.</div>
            )}
          </div>
        </div>
      </div>

      {/* Product Categories Panel */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-800">
            <ShoppingBag className="text-purple-400" size={20} />
            <h2 className="text-base font-bold text-slate-100">Product Categories</h2>
          </div>
          
          <form onSubmit={handleAddProductCat} className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={newProductCat}
              onChange={(e) => setNewProductCat(e.target.value)}
              placeholder="e.g. eBook, Asset Bundle..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-purple-500/50"
              required
            />
            <button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shrink-0 cursor-pointer"
            >
              Add
            </button>
          </form>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {productCategories.map(cat => (
              <div 
                key={cat} 
                className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2 text-xs text-slate-300"
              >
                <span>{cat}</span>
                <button 
                  onClick={() => deleteProductCategory(cat)}
                  className="text-slate-500 hover:text-red-400 p-1 rounded transition cursor-pointer"
                  title={`Delete ${cat}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {productCategories.length === 0 && (
              <div className="text-center text-slate-500 py-6 text-xs">No product categories defined.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
