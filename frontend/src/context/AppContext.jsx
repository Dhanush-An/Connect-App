import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Seed fallback data for offline mode
const fallbackData = {
  users: [
    { id: "u-admin-1", name: "Sarah Jenkins", email: "sarah.admin@connect.com", role: "admin", status: "active", phone: "+1 (555) 019-2834", joined: "2025-01-15" },
    { id: "u-vendor-1", name: "Apex Creative Services", email: "contact@apexcreative.co", role: "vendor", status: "active", phone: "+1 (555) 043-9821", joined: "2025-03-20" },
    { id: "u-vendor-2", name: "Nova Tech Solutions", email: "info@novatech.io", role: "vendor", status: "active", phone: "+1 (555) 076-4312", joined: "2025-04-10" },
    { id: "u-employer-1", name: "Innovate Tech Corp", email: "recruiting@innovatetech.com", role: "employer", status: "active", phone: "+1 (555) 022-8754", joined: "2025-02-05" },
    { id: "u-seeker-1", name: "Alex Mercer", email: "alex.mercer@gmail.com", role: "user", status: "active", phone: "+1 (555) 088-3498", joined: "2025-05-12", membership: { plan: "Silver", status: "Active" }, profile: { title: "Senior Frontend Developer", skills: ["React.js", "Tailwind CSS", "JavaScript", "Node.js", "TypeScript"], experience: "5 Years", bio: "Passionate frontend developer specializing in responsive layouts and engaging UI animations." } }
  ],
  jobs: [
    { id: "job-1", title: "Senior React Engineer", company: "Innovate Tech Corp", employerId: "u-employer-1", location: "Remote / New York", salary: "$120,000 - $140,000", type: "Full-time", description: "We are seeking a seasoned frontend developer with deep expertise in React and modern state management. You will build user-facing panels and optimize application performance.", status: "active", postedAt: "2026-05-25" },
    { id: "job-2", title: "Product Designer (UI/UX)", company: "Innovate Tech Corp", employerId: "u-employer-1", location: "Hybrid (San Francisco)", salary: "$100,000 - $115,000", type: "Full-time", description: "Join our product team to design beautiful web interfaces, create prototypes, and establish our component design system.", status: "active", postedAt: "2026-05-28" },
    { id: "job-3", title: "Backend Node Developer", company: "Nova Tech Solutions", employerId: "u-vendor-2", location: "Remote (USA)", salary: "$110,000 - $130,000", type: "Contract", description: "Looking for a backend developer proficient in Node.js, Express, and database modeling with SQLite and PostgreSQL.", status: "active", postedAt: "2026-06-01" }
  ],
  applications: [
    { id: "app-1", jobId: "job-1", jobTitle: "Senior React Engineer", company: "Innovate Tech Corp", applicantId: "u-seeker-1", applicantName: "Alex Mercer", applicantEmail: "alex.mercer@gmail.com", status: "Shortlisted", appliedDate: "2026-05-26", interview: { date: "2026-06-05", time: "14:00", type: "Video Call" } }
  ],
  services: [
    { id: "srv-1", title: "Premium UI Redesign Package", vendorId: "u-vendor-1", vendorName: "Apex Creative Services", price: 1200, category: "Design", description: "Full redesign of your web portal including typography, dark/light styling, and Tailwind custom CSS files.", rating: 4.9, reviewsCount: 24, status: "active" },
    { id: "srv-2", title: "API Backend Integration Audit", vendorId: "u-vendor-2", vendorName: "Nova Tech Solutions", price: 850, category: "Development", description: "Security audit, performance tracing, and refactoring recommendations for Express and REST APIs.", rating: 4.7, reviewsCount: 18, status: "active" }
  ],
  bookings: [
    { id: "bk-1", serviceId: "srv-1", serviceTitle: "Premium UI Redesign Package", vendorId: "u-vendor-1", vendorName: "Apex Creative Services", customerId: "u-seeker-1", customerName: "Alex Mercer", date: "2026-06-12", price: 1200, status: "Confirmed" }
  ],
  products: [
    { id: "prod-1", title: "Connect HR Toolkit", price: 49, category: "Software", description: "A set of templates, policy handbooks, and interview rubrics for scaling startup teams.", sales: 142, status: "active" },
    { id: "prod-2", title: "Figma Dashboard Design Kit", price: 29, category: "Assets", description: "Premium grid system and Tailwind CSS matched components in a ready-to-use Figma archive.", sales: 328, status: "active" }
  ],
  orders: [
    { id: "ord-1", productId: "prod-1", productTitle: "Connect HR Toolkit", customerId: "u-seeker-1", customerName: "Alex Mercer", date: "2026-05-30", price: 49, status: "Completed" }
  ],
  reviews: [
    { id: "rev-1", vendorId: "u-vendor-1", reviewerName: "Alice Vance", rating: 5, comment: "Outstanding layout design! The Tailwind utility mappings are very clean and easy to integrate.", date: "2026-05-20" },
    { id: "rev-2", vendorId: "u-vendor-1", reviewerName: "David K.", rating: 4, comment: "Very communicative designer, delivering excellent high-fidelity Figma components.", date: "2026-05-24" }
  ],
  cms: {
    landingHeroTitle: "Connect Your Business, Career, & Services in One Unified Space",
    landingHeroSub: "The ultimate collaborative platform empowering talent to find jobs, vendors to sell services, and administrators to orchestrate commerce smoothly.",
    featuredNotice: "Join over 10,000+ businesses who leverage Connect App for daily operations.",
    serviceCategories: ["Design", "Development", "Marketing", "Consulting"],
    productCategories: ["Software", "Assets", "eBook", "Bundle"]
  }
};

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('visitor'); // 'visitor', 'admin', 'vendor', 'user', 'employer'
  const [currentUser, setCurrentUser] = useState(fallbackData.users[4]); // Defaults to Alex Mercer (user) for user roles

  // Theme: 'dark' | 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('connect-theme') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('connect-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  
  // Data lists
  const [users, setUsers] = useState(fallbackData.users);
  const [jobs, setJobs] = useState(fallbackData.jobs);
  const [applications, setApplications] = useState(fallbackData.applications);
  const [services, setServices] = useState(fallbackData.services);
  const [bookings, setBookings] = useState(fallbackData.bookings);
  const [products, setProducts] = useState(fallbackData.products);
  const [orders, setOrders] = useState(fallbackData.orders);
  const [reviews, setReviews] = useState(fallbackData.reviews);
  const [cms, setCms] = useState(fallbackData.cms);
  const [analytics, setAnalytics] = useState(null);

  const [activeTab, setActiveTab] = useState('overview');
  const [careerSubTab, setCareerSubTab] = useState('jobs');
  const [pendingMembership, setPendingMembership] = useState(null);

  // Sync activeTab when role changes
  useEffect(() => {
    setActiveTab('overview');
  }, [role]);

  const [membershipRequests, setMembershipRequests] = useState([
    {
      id: "mr-1",
      userId: "u-seeker-1",
      userName: "Alex Mercer",
      userEmail: "alex.mercer@gmail.com",
      planName: "Silver",
      type: "Initial Payment",
      amount: "$19",
      status: "Approved",
      date: "2026-06-01"
    }
  ]);

  const requestMembership = (planName, amount, type = "Initial Payment") => {
    const existingPending = membershipRequests.find(r => r.userId === (currentUser?.id || "u-seeker-1") && r.planName === planName && r.status === "Pending");
    if (existingPending) {
      pushNotification(`You already have a pending request for the ${planName} plan.`);
      return;
    }

    const newRequest = {
      id: `mr-${Date.now()}`,
      userId: currentUser?.id || "u-seeker-1",
      userName: currentUser?.name || "Alex Mercer",
      userEmail: currentUser?.email || "alex.mercer@gmail.com",
      planName,
      type,
      amount,
      status: "Pending",
      date: new Date().toISOString().split('T')[0]
    };
    setMembershipRequests(prev => [newRequest, ...prev]);
    pushNotification(`Membership request submitted for ${planName} Plan (${amount})`);
  };

  const approveMembershipRequest = (id) => {
    setMembershipRequests(prev => prev.map(r => {
      if (r.id === id) {
        setUsers(prevUsers => prevUsers.map(u => {
          if (u.id === r.userId) {
            return { ...u, membership: { plan: r.planName, status: "Active" } };
          }
          return u;
        }));
        
        if (currentUser && currentUser.id === r.userId) {
          setCurrentUser(prevUser => ({
            ...prevUser,
            membership: { plan: r.planName, status: "Active" }
          }));
        }

        pushNotification(`Approved ${r.planName} plan for ${r.userName}`);
        return { ...r, status: "Approved" };
      }
      return r;
    }));
  };

  const rejectMembershipRequest = (id) => {
    setMembershipRequests(prev => prev.map(r => {
      if (r.id === id) {
        pushNotification(`Rejected ${r.planName} plan for ${r.userName}`);
        return { ...r, status: "Rejected" };
      }
      return r;
    }));
  };
  
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);

  const serviceCategories = cms?.serviceCategories || ["Design", "Development", "Marketing", "Consulting"];
  const productCategories = cms?.productCategories || ["Software", "Assets", "eBook", "Bundle"];

  const addServiceCategory = async (category) => {
    if (serviceCategories.includes(category)) return;
    const updatedCategories = [...serviceCategories, category];
    await updateCMS({ serviceCategories: updatedCategories });
  };

  const deleteServiceCategory = async (category) => {
    const updatedCategories = serviceCategories.filter(c => c !== category);
    await updateCMS({ serviceCategories: updatedCategories });
  };

  const addProductCategory = async (category) => {
    if (productCategories.includes(category)) return;
    const updatedCategories = [...productCategories, category];
    await updateCMS({ productCategories: updatedCategories });
  };

  const deleteProductCategory = async (category) => {
    const updatedCategories = productCategories.filter(c => c !== category);
    await updateCMS({ productCategories: updatedCategories });
  };
  
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to Connect App! Change roles in the top bar to experience dashboards.", unread: true, date: "Just now" }
  ]);

  // Sync current user context when role changes
  useEffect(() => {
    if (role === 'admin') {
      setCurrentUser(users.find(u => u.role === 'admin') || fallbackData.users[0]);
    } else if (role === 'vendor') {
      setCurrentUser(users.find(u => u.role === 'vendor') || fallbackData.users[1]);
    } else if (role === 'employer') {
      setCurrentUser(users.find(u => u.role === 'employer') || fallbackData.users[3]);
    } else if (role === 'user') {
      setCurrentUser(users.find(u => u.role === 'user') || fallbackData.users[4]);
    } else {
      setCurrentUser(null);
    }
  }, [role, users]);

  // Fetch all data from backend
  const refreshData = async () => {
    setLoading(true);
    try {
      const endpoints = ['users', 'jobs', 'applications', 'services', 'bookings', 'products', 'orders', 'reviews', 'cms', 'analytics'];
      const results = await Promise.all(
        endpoints.map(ep => 
          fetch(`/api/${ep}`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch ${ep}`);
              return res.json();
            })
            .catch(err => {
              // Fail silently per endpoint, fallback will trigger if all fail
              return null;
            })
        )
      );

      setIsOffline(false);
      
      if (results[0]) setUsers(results[0]);
      if (results[1]) setJobs(results[1]);
      if (results[2]) setApplications(results[2]);
      if (results[3]) setServices(results[3]);
      if (results[4]) setBookings(results[4]);
      if (results[5]) setProducts(results[5]);
      if (results[6]) setOrders(results[6]);
      if (results[7]) setReviews(results[7]);
      if (results[8]) setCms(results[8]);
      if (results[9]) setAnalytics(results[9]);

    } catch (error) {
      console.warn("Backend server not responding. Operating in offline/mock mode.", error);
      setIsOffline(true);
      calculateOfflineAnalytics();
    } finally {
      setLoading(false);
    }
  };

  const calculateOfflineAnalytics = () => {
    // Generate analytics based on active state when offline
    const totalRev = orders.reduce((sum, o) => sum + (o.price || 0), 0) +
                     bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').reduce((sum, b) => sum + (b.price || 0), 0);
    setAnalytics({
      totalUsers: users.length,
      totalJobs: jobs.length,
      totalBookings: bookings.length,
      totalServices: services.length,
      totalRevenue: totalRev,
      chartRevenue: [
        { name: 'Jan', amount: 4300 },
        { name: 'Feb', amount: 5900 },
        { name: 'Mar', amount: 8800 },
        { name: 'Apr', amount: 7200 },
        { name: 'May', amount: 9600 },
        { name: 'Jun', amount: 12000 + totalRev }
      ],
      vendorEarnings: users.filter(u => u.role === 'vendor').map(v => {
        const vBookings = bookings.filter(b => b.vendorId === v.id && (b.status === 'Confirmed' || b.status === 'Completed'));
        return {
          vendorId: v.id,
          vendorName: v.name,
          earnings: vBookings.reduce((sum, b) => sum + (b.price || 0), 0),
          bookingCount: vBookings.length
        };
      }),
      funnel: [
        { name: 'Applied', count: applications.length },
        { name: 'Shortlisted/Interview', count: applications.filter(a => ['Shortlisted', 'Interview Scheduled', 'Hired'].includes(a.status)).length },
        { name: 'Hired', count: applications.filter(a => a.status === 'Hired').length }
      ]
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Sync analytics for offline updates
  useEffect(() => {
    if (isOffline) {
      calculateOfflineAnalytics();
    }
  }, [users, jobs, applications, services, bookings, products, orders, isOffline]);

  // Helper for adding notifications
  const pushNotification = (text) => {
    setNotifications(prev => [
      { id: Date.now(), text, unread: true, date: "Just now" },
      ...prev
    ]);
  };

  // ----------------------------------------------------
  // ACTION APIs
  // ----------------------------------------------------
  
  // 1. User Management
  const toggleUserStatus = async (userId, status) => {
    pushNotification(`User status changed for ${userId} to ${status}`);
    if (isOffline) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
      return;
    }
    try {
      const res = await fetch('/api/users/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status })
      });
      if (res.ok) refreshData();
    } catch (e) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    }
  };

  const registerUser = async (userData) => {
    pushNotification(`Registered user profile: ${userData.name}`);
    if (isOffline) {
      const newUser = { id: `u-${Date.now()}`, status: 'active', joined: new Date().toISOString().split('T')[0], ...userData };
      setUsers(prev => [...prev, newUser]);
      return newUser;
    }
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        refreshData();
        return await res.json();
      }
    } catch (e) {
      const newUser = { id: `u-${Date.now()}`, status: 'active', joined: new Date().toISOString().split('T')[0], ...userData };
      setUsers(prev => [...prev, newUser]);
      return newUser;
    }
  };

  // 2. Job Board Management
  const postJob = async (jobData) => {
    pushNotification(`New Job Posted: ${jobData.title} by ${jobData.company}`);
    if (isOffline) {
      const newJob = { id: `job-${Date.now()}`, status: 'active', postedAt: new Date().toISOString().split('T')[0], ...jobData };
      setJobs(prev => [newJob, ...prev]);
      return;
    }
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      if (res.ok) refreshData();
    } catch (e) {
      const newJob = { id: `job-${Date.now()}`, status: 'active', postedAt: new Date().toISOString().split('T')[0], ...jobData };
      setJobs(prev => [newJob, ...prev]);
    }
  };

  const deleteJob = async (jobId) => {
    pushNotification(`Job Listing removed.`);
    if (isOffline) {
      setJobs(prev => prev.filter(j => j.id !== jobId));
      setApplications(prev => prev.filter(a => a.jobId !== jobId));
      return;
    }
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      if (res.ok) refreshData();
    } catch (e) {
      setJobs(prev => prev.filter(j => j.id !== jobId));
      setApplications(prev => prev.filter(a => a.jobId !== jobId));
    }
  };

  // 3. Applications
  const applyForJob = async (jobId) => {
    if (!currentUser) return { error: "Please log in first." };
    const job = jobs.find(j => j.id === jobId);
    pushNotification(`Applied to: ${job?.title} at ${job?.company}`);
    
    if (isOffline) {
      const existing = applications.find(a => a.jobId === jobId && a.applicantId === currentUser.id);
      if (existing) return { error: "Already applied." };

      const newApp = {
        id: `app-${Date.now()}`,
        jobId,
        jobTitle: job.title,
        company: job.company,
        applicantId: currentUser.id,
        applicantName: currentUser.name,
        applicantEmail: currentUser.email,
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0]
      };
      setApplications(prev => [...prev, newApp]);
      return { success: true };
    }
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, applicantId: currentUser.id })
      });
      if (res.ok) {
        refreshData();
        return { success: true };
      } else {
        const data = await res.json();
        return { error: data.error };
      }
    } catch (e) {
      return { error: "Failed to connect to server." };
    }
  };

  const updateApplicationStatus = async (applicationId, status, interview = null) => {
    pushNotification(`Application updated to: ${status}`);
    if (isOffline) {
      setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, status, interview: interview ? interview : a.interview } : a));
      return;
    }
    try {
      const res = await fetch('/api/applications/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId, status, interview })
      });
      if (res.ok) refreshData();
    } catch (e) {
      setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, status, interview: interview ? interview : a.interview } : a));
    }
  };

  // 4. Services (Vendors)
  const addService = async (serviceData) => {
    pushNotification(`New Service Offered: ${serviceData.title}`);
    if (isOffline) {
      const newSrv = { id: `srv-${Date.now()}`, rating: 5.0, reviewsCount: 0, status: 'active', ...serviceData };
      setServices(prev => [...prev, newSrv]);
      return;
    }
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      if (res.ok) refreshData();
    } catch (e) {
      const newSrv = { id: `srv-${Date.now()}`, rating: 5.0, reviewsCount: 0, status: 'active', ...serviceData };
      setServices(prev => [...prev, newSrv]);
    }
  };

  const deleteService = async (serviceId) => {
    pushNotification(`Service Offer deleted.`);
    if (isOffline) {
      setServices(prev => prev.filter(s => s.id !== serviceId));
      return;
    }
    try {
      const res = await fetch(`/api/services/${serviceId}`, { method: 'DELETE' });
      if (res.ok) refreshData();
    } catch (e) {
      setServices(prev => prev.filter(s => s.id !== serviceId));
    }
  };

  // 5. Service Bookings
  const bookService = async (serviceId, date) => {
    if (!currentUser) return;
    const srv = services.find(s => s.id === serviceId);
    pushNotification(`Booked Service: ${srv?.title}`);
    
    if (isOffline) {
      const newBooking = {
        id: `bk-${Date.now()}`,
        serviceId,
        serviceTitle: srv.title,
        vendorId: srv.vendorId,
        vendorName: srv.vendorName,
        customerId: currentUser.id,
        customerName: currentUser.name,
        date,
        price: srv.price,
        status: 'Pending'
      };
      setBookings(prev => [...prev, newBooking]);
      return;
    }
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, customerId: currentUser.id, date })
      });
      if (res.ok) refreshData();
    } catch (e) {
      const newBooking = {
        id: `bk-${Date.now()}`,
        serviceId,
        serviceTitle: srv.title,
        vendorId: srv.vendorId,
        vendorName: srv.vendorName,
        customerId: currentUser.id,
        customerName: currentUser.name,
        date,
        price: srv.price,
        status: 'Pending'
      };
      setBookings(prev => [...prev, newBooking]);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    pushNotification(`Booking status updated to ${status}`);
    if (isOffline) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
      return;
    }
    try {
      const res = await fetch('/api/bookings/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status })
      });
      if (res.ok) refreshData();
    } catch (e) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    }
  };

  // 6. Products Marketplace
  const addProduct = async (productData) => {
    pushNotification(`Marketplace Product Listed: ${productData.title}`);
    if (isOffline) {
      const newProd = { id: `prod-${Date.now()}`, sales: 0, status: 'active', ...productData };
      setProducts(prev => [...prev, newProd]);
      return;
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) refreshData();
    } catch (e) {
      const newProd = { id: `prod-${Date.now()}`, sales: 0, status: 'active', ...productData };
      setProducts(prev => [...prev, newProd]);
    }
  };

  const deleteProduct = async (productId) => {
    pushNotification(`Marketplace Product deleted.`);
    if (isOffline) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      return;
    }
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (res.ok) refreshData();
    } catch (e) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const buyProduct = async (productId) => {
    if (!currentUser) return;
    const prod = products.find(p => p.id === productId);
    pushNotification(`Purchased Product: ${prod?.title}`);
    
    if (isOffline) {
      const newOrder = {
        id: `ord-${Date.now()}`,
        productId,
        productTitle: prod.title,
        customerId: currentUser.id,
        customerName: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        price: prod.price,
        status: 'Completed'
      };
      setOrders(prev => [...prev, newOrder]);
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, sales: (p.sales || 0) + 1 } : p));
      return;
    }
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, customerId: currentUser.id })
      });
      if (res.ok) refreshData();
    } catch (e) {
      const newOrder = {
        id: `ord-${Date.now()}`,
        productId,
        productTitle: prod.title,
        customerId: currentUser.id,
        customerName: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        price: prod.price,
        status: 'Completed'
      };
      setOrders(prev => [...prev, newOrder]);
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, sales: (p.sales || 0) + 1 } : p));
    }
  };

  // 7. CMS Content Controls
  const updateCMS = async (cmsData) => {
    pushNotification(`CMS Landing Content updated.`);
    if (isOffline) {
      setCms(prev => ({ ...prev, ...cmsData }));
      return;
    }
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsData)
      });
      if (res.ok) refreshData();
    } catch (e) {
      setCms(prev => ({ ...prev, ...cmsData }));
    }
  };

  // 8. Reviews
  const submitReview = async (reviewData) => {
    pushNotification(`Submitted review for vendor services.`);
    if (isOffline) {
      const newRev = { id: `rev-${Date.now()}`, date: new Date().toISOString().split('T')[0], ...reviewData };
      setReviews(prev => [newRev, ...prev]);
      return;
    }
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      if (res.ok) refreshData();
    } catch (e) {
      const newRev = { id: `rev-${Date.now()}`, date: new Date().toISOString().split('T')[0], ...reviewData };
      setReviews(prev => [newRev, ...prev]);
    }
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      currentUser, setCurrentUser,
      users, jobs, applications, setApplications, services, bookings, products, orders, reviews, cms, analytics,
      loading, isOffline, notifications, setNotifications, pushNotification, refreshData,
      toggleUserStatus, registerUser, postJob, deleteJob, applyForJob, updateApplicationStatus,
      addService, deleteService, bookService, updateBookingStatus, addProduct, deleteProduct, buyProduct,
      updateCMS, submitReview,
      serviceCategories, productCategories,
      selectedServiceCategory, setSelectedServiceCategory,
      selectedProductCategory, setSelectedProductCategory,
      addServiceCategory, deleteServiceCategory,
      addProductCategory, deleteProductCategory,
      theme, toggleTheme,
      activeTab, setActiveTab,
      careerSubTab, setCareerSubTab,
      membershipRequests, requestMembership,
      approveMembershipRequest, rejectMembershipRequest,
      pendingMembership, setPendingMembership
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
