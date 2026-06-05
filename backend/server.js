import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'db.json');

const app = express();
const PORT = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Database read/write helper functions
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return {
      users: [],
      jobs: [],
      applications: [],
      services: [],
      bookings: [],
      products: [],
      orders: [],
      reviews: [],
      cms: {}
    };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to db.json:', error);
  }
};

// ----------------------------------------------------
// CMS ENDPOINTS
// ----------------------------------------------------
app.get('/api/cms', (req, res) => {
  const db = readDB();
  res.json(db.cms || {});
});

app.post('/api/cms', (req, res) => {
  const db = readDB();
  db.cms = { ...db.cms, ...req.body };
  writeDB(db);
  res.json({ success: true, cms: db.cms });
});

// ----------------------------------------------------
// USER ENDPOINTS
// ----------------------------------------------------
app.get('/api/users', (req, res) => {
  const db = readDB();
  res.json(db.users || []);
});

app.post('/api/users', (req, res) => {
  const db = readDB();
  const newUser = {
    id: `u-${Date.now()}`,
    status: 'active',
    joined: new Date().toISOString().split('T')[0],
    ...req.body
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

app.post('/api/users/status', (req, res) => {
  const { userId, status } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.status = status;
    writeDB(db);
    res.json({ success: true, user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// ----------------------------------------------------
// JOB ENDPOINTS
// ----------------------------------------------------
app.get('/api/jobs', (req, res) => {
  const db = readDB();
  res.json(db.jobs || []);
});

app.post('/api/jobs', (req, res) => {
  const db = readDB();
  const newJob = {
    id: `job-${Date.now()}`,
    status: 'active',
    postedAt: new Date().toISOString().split('T')[0],
    ...req.body
  };
  db.jobs.unshift(newJob); // New jobs first
  writeDB(db);
  res.status(201).json(newJob);
});

app.delete('/api/jobs/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.jobs = db.jobs.filter(j => j.id !== id);
  // Also filter applications for this job
  db.applications = db.applications.filter(a => a.jobId !== id);
  writeDB(db);
  res.json({ success: true, message: 'Job deleted successfully' });
});

// ----------------------------------------------------
// APPLICATION ENDPOINTS
// ----------------------------------------------------
app.get('/api/applications', (req, res) => {
  const db = readDB();
  res.json(db.applications || []);
});

app.post('/api/applications', (req, res) => {
  const db = readDB();
  const { jobId, applicantId } = req.body;
  
  // Check if already applied
  const existing = db.applications.find(a => a.jobId === jobId && a.applicantId === applicantId);
  if (existing) {
    return res.status(400).json({ error: 'You have already applied for this job.' });
  }

  const job = db.jobs.find(j => j.id === jobId);
  const applicant = db.users.find(u => u.id === applicantId);

  if (!job || !applicant) {
    return res.status(404).json({ error: 'Job or applicant not found' });
  }

  const newApp = {
    id: `app-${Date.now()}`,
    jobId,
    jobTitle: job.title,
    company: job.company,
    applicantId,
    applicantName: applicant.name,
    applicantEmail: applicant.email,
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0]
  };

  db.applications.push(newApp);
  writeDB(db);
  res.status(201).json(newApp);
});

app.post('/api/applications/status', (req, res) => {
  const { applicationId, status, interview } = req.body;
  const db = readDB();
  const appItem = db.applications.find(a => a.id === applicationId);
  if (appItem) {
    appItem.status = status;
    if (interview) {
      appItem.interview = interview;
    }
    writeDB(db);
    res.json({ success: true, application: appItem });
  } else {
    res.status(404).json({ error: 'Application not found' });
  }
});

// ----------------------------------------------------
// SERVICE ENDPOINTS
// ----------------------------------------------------
app.get('/api/services', (req, res) => {
  const db = readDB();
  res.json(db.services || []);
});

app.post('/api/services', (req, res) => {
  const db = readDB();
  const newService = {
    id: `srv-${Date.now()}`,
    rating: 5.0,
    reviewsCount: 0,
    status: 'active',
    ...req.body
  };
  db.services.push(newService);
  writeDB(db);
  res.status(201).json(newService);
});

app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.services = db.services.filter(s => s.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Service deleted' });
});

// ----------------------------------------------------
// BOOKING ENDPOINTS
// ----------------------------------------------------
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json(db.bookings || []);
});

app.post('/api/bookings', (req, res) => {
  const db = readDB();
  const { serviceId, customerId, date } = req.body;

  const service = db.services.find(s => s.id === serviceId);
  const customer = db.users.find(u => u.id === customerId);

  if (!service || !customer) {
    return res.status(404).json({ error: 'Service or customer not found' });
  }

  const newBooking = {
    id: `bk-${Date.now()}`,
    serviceId,
    serviceTitle: service.title,
    vendorId: service.vendorId,
    vendorName: service.vendorName,
    customerId,
    customerName: customer.name,
    date,
    price: service.price,
    status: 'Pending'
  };

  db.bookings.push(newBooking);
  writeDB(db);
  res.status(201).json(newBooking);
});

app.post('/api/bookings/status', (req, res) => {
  const { bookingId, status } = req.body;
  const db = readDB();
  const booking = db.bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = status;
    writeDB(db);
    res.json({ success: true, booking });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

// ----------------------------------------------------
// PRODUCT ENDPOINTS
// ----------------------------------------------------
app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products || []);
});

app.post('/api/products', (req, res) => {
  const db = readDB();
  const newProduct = {
    id: `prod-${Date.now()}`,
    sales: 0,
    status: 'active',
    ...req.body
  };
  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.products = db.products.filter(p => p.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// ----------------------------------------------------
// ORDER ENDPOINTS
// ----------------------------------------------------
app.get('/api/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
  const db = readDB();
  const { productId, customerId } = req.body;

  const product = db.products.find(p => p.id === productId);
  const customer = db.users.find(u => u.id === customerId);

  if (!product || !customer) {
    return res.status(404).json({ error: 'Product or customer not found' });
  }

  const newOrder = {
    id: `ord-${Date.now()}`,
    productId,
    productTitle: product.title,
    customerId,
    customerName: customer.name,
    date: new Date().toISOString().split('T')[0],
    price: product.price,
    status: 'Completed'
  };

  product.sales = (product.sales || 0) + 1;
  db.orders.push(newOrder);
  writeDB(db);
  res.status(201).json(newOrder);
});

// ----------------------------------------------------
// REVIEWS
// ----------------------------------------------------
app.get('/api/reviews', (req, res) => {
  const db = readDB();
  res.json(db.reviews || []);
});

app.post('/api/reviews', (req, res) => {
  const db = readDB();
  const newReview = {
    id: `rev-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    ...req.body
  };
  db.reviews.unshift(newReview);
  writeDB(db);
  res.status(201).json(newReview);
});

// ----------------------------------------------------
// ANALYTICS & REPORTS
// ----------------------------------------------------
app.get('/api/analytics', (req, res) => {
  const db = readDB();

  // Calculate stats
  const totalUsers = db.users.length;
  const totalJobs = db.jobs.length;
  const totalBookings = db.bookings.length;
  const totalServices = db.services.length;

  const totalRevenue = db.orders.reduce((sum, o) => sum + (o.price || 0), 0) +
                       db.bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').reduce((sum, b) => sum + (b.price || 0), 0);

  // Revenue by months (mocked but combining actual values for June 2026)
  const chartRevenue = [
    { name: 'Jan', amount: 4300 },
    { name: 'Feb', amount: 5900 },
    { name: 'Mar', amount: 8800 },
    { name: 'Apr', amount: 7200 },
    { name: 'May', amount: 9600 },
    { name: 'Jun', amount: 12000 + totalRevenue }
  ];

  // Vendor earnings details
  const vendorEarnings = db.users.filter(u => u.role === 'vendor').map(v => {
    const vBookings = db.bookings.filter(b => b.vendorId === v.id && (b.status === 'Confirmed' || b.status === 'Completed'));
    const earnings = vBookings.reduce((sum, b) => sum + (b.price || 0), 0);
    return {
      vendorId: v.id,
      vendorName: v.name,
      earnings,
      bookingCount: vBookings.length
    };
  });

  // Hiring funnel details
  const pendingApps = db.applications.filter(a => a.status === 'Applied').length;
  const interviewApps = db.applications.filter(a => a.status === 'Interview Scheduled' || a.status === 'Shortlisted').length;
  const hiredApps = db.applications.filter(a => a.status === 'Hired' || a.status === 'Completed').length;

  res.json({
    totalUsers,
    totalJobs,
    totalBookings,
    totalServices,
    totalRevenue,
    chartRevenue,
    vendorEarnings,
    funnel: [
      { name: 'Applied', count: pendingApps + interviewApps + hiredApps },
      { name: 'Shortlisted/Interview', count: interviewApps + hiredApps },
      { name: 'Hired', count: hiredApps }
    ]
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Connect App Backend running on http://localhost:${PORT}`);
});
