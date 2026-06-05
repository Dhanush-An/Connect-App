import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, Briefcase, ShoppingBag, Heart, Settings, FileText, 
  MapPin, DollarSign, Clock, Search, Star, CheckCircle, 
  AlertCircle, Shield, Globe, Award, Upload, CreditCard,
  BookOpen, GraduationCap
} from 'lucide-react';

const DASHBOARD_MEMBERSHIPS = [
  {
    name: 'Silver',
    price: '$19',
    period: '/mo',
    desc: 'Perfect for getting started with basic job hunting and candidate profiling.',
    features: [
      'Apply to 15 jobs per month',
      'Standard profile listing',
      'Access to marketplace toolkits',
      'Email support response within 48h'
    ],
    color: '#94A3B8',
    atmBg: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #0f172a 100%)',
    cardNumber: '5412 7500 1920 0045',
    cardHolder: 'SILVER MEMBER',
    cardExpiry: '12/29'
  },
  {
    name: 'Gold',
    price: '$49',
    period: '/mo',
    desc: 'The best value plan for active candidates and growing service providers.',
    features: [
      'Unlimited job applications',
      'Featured profile status badge',
      'Priority service booking listings',
      '5% discount on digital toolkits',
      'Priority email support within 12h'
    ],
    color: '#F59E0B',
    atmBg: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #f59e0b 100%)',
    cardNumber: '5412 7500 4920 0088',
    cardHolder: 'GOLD MEMBER',
    cardExpiry: '06/30'
  },
  {
    name: 'Diamond',
    price: '$99',
    period: '/mo',
    desc: 'Ultimate console access for businesses, top agency vendors, and VIP recruiters.',
    features: [
      'Unlimited jobs, products & services',
      'Zero commission on product sales',
      'Dedicated partner success manager',
      'Free access to all marketplace kits',
      'Instant 24/7 Slack & Phone support'
    ],
    color: '#14B8A6',
    atmBg: 'linear-gradient(135deg, #0d9488 0%, #1e1b4b 50%, #4338ca 100%)',
    cardNumber: '5412 7500 9920 0123',
    cardHolder: 'DIAMOND MEMBER',
    cardExpiry: '09/31'
  }
];

const MOCK_TRAINING_COURSES = [
  {
    id: 'course-1',
    title: 'Modern React & TypeScript Bootcamp',
    provider: 'Nova Tech Academy',
    duration: '6 Weeks',
    price: 'Free',
    rating: 4.8,
    category: 'Development',
    description: 'Master React, hooks, state management, and TypeScript integrations. Includes 4 real-world projects.'
  },
  {
    id: 'course-2',
    title: 'Advanced Figma Design Systems',
    provider: 'Apex Design Lab',
    duration: '4 Weeks',
    price: 'Free',
    rating: 4.9,
    category: 'Design',
    description: 'Learn to design complex components, variant configurations, auto-layout, and build premium responsive prototypes.'
  },
  {
    id: 'course-3',
    title: 'Digital Marketing & Growth Hacking',
    provider: 'Innovate Tech Corp',
    duration: '5 Weeks',
    price: 'Free for Gold/Diamond',
    rating: 4.6,
    category: 'Marketing',
    description: 'Understand SEO, paid advertising funnel optimization, and landing page conversion strategies.'
  },
  {
    id: 'course-4',
    title: 'Technical Resume & Interview Coaching',
    provider: 'Connect Placement Hub',
    duration: '1 Session',
    price: 'Free',
    rating: 5.0,
    category: 'Consulting',
    description: 'Get 1-on-1 resume reviews and simulated coding/design mock interviews with corporate recruiters.'
  }
];

const MOCK_INTERNSHIPS = [
  {
    id: 'intern-1',
    title: 'UI/UX Design Intern',
    company: 'Apex Creative Services',
    location: 'Hybrid (New York)',
    duration: '3 Months',
    type: 'Paid Internship',
    stipend: '$2,500/mo',
    description: 'Work alongside senior designers to refine user flows, draft prototypes, and conduct usability tests on real client projects.'
  },
  {
    id: 'intern-2',
    title: 'Junior React Frontend Intern',
    company: 'Innovate Tech Corp',
    location: 'Remote',
    duration: '3 Months',
    type: 'Paid Internship',
    stipend: '$3,000/mo',
    description: 'Participate in sprint planning, implement frontend UI designs using Tailwind CSS, and resolve active bug requests.'
  },
  {
    id: 'intern-3',
    title: 'Open Source Community Manager',
    company: 'Connect OpenSource',
    location: 'Remote',
    duration: 'Flexible',
    type: 'Volunteering',
    stipend: 'Unpaid / Experience Certificate',
    description: 'Manage community channels, moderate GitHub discussions, and assist new contributors with pull requests.'
  },
  {
    id: 'intern-4',
    title: 'Graduate Trainee (Software Engineering)',
    company: 'Nova Tech Solutions',
    location: 'San Francisco, CA',
    duration: '12 Months',
    type: 'Trainee',
    stipend: '$5,500/mo',
    description: 'A fast-track rotational engineering program through DevOps, Backend APIs, and Client-side Engineering.'
  }
];

export default function UserDashboard({ activeTab, setActiveTab }) {
  const { 
    currentUser, registerUser, jobs, applyForJob, applications, setApplications,
    products, buyProduct, orders, bookings, services, bookService, reviews, submitReview,
    membershipRequests, requestMembership, careerSubTab, setCareerSubTab, pushNotification
  } = useApp();

  // Training and internship local states
  const [registeredTrainings, setRegisteredTrainings] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState([]);

  // Search jobs states
  const [jobSearch, setJobSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyMessage, setApplyMessage] = useState('');

  // Profile management states
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || '');
  const [profileTitle, setProfileTitle] = useState(currentUser?.profile?.title || 'Staff UI/UX Specialist');
  const [profileSkills, setProfileSkills] = useState(currentUser?.profile?.skills?.join(', ') || 'React, Tailwind CSS, JavaScript');
  const [profileBio, setProfileBio] = useState(currentUser?.profile?.bio || 'Experienced web designer with a background in graphic styling.');
  const [cvFile, setCvFile] = useState('Alex_Mercer_CV.pdf');

  // Saved Jobs wishlist
  const [savedJobs, setSavedJobs] = useState(['job-1']); // Pre-saved Job-1

  // Booking states
  const [bookingDate, setBookingDate] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  // Settings states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(false);
  const [visibility, setVisibility] = useState(true);

  // Reviews submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewingVendorId, setReviewingVendorId] = useState(null);

  // Filter user records
  const userOrders = orders.filter(o => o.customerId === currentUser?.id);
  const userBookings = bookings.filter(b => b.customerId === currentUser?.id);
  const userApps = applications.filter(a => a.applicantId === currentUser?.id);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    registerUser({
      id: currentUser.id,
      name: profileName,
      email: profileEmail,
      role: 'user',
      profile: {
        title: profileTitle,
        skills: profileSkills.split(',').map(s => s.trim()),
        bio: profileBio
      }
    });
  };

  const handleApply = async (jobId) => {
    const res = await applyForJob(jobId);
    if (res.error) {
      setApplyMessage(res.error);
    } else {
      setApplyMessage('Application submitted successfully!');
      setTimeout(() => {
        setSelectedJob(null);
        setApplyMessage('');
        setActiveTab('applications');
      }, 1500);
    }
  };

  const handleRegisterTraining = (course) => {
    if (registeredTrainings.includes(course.id)) return;
    setRegisteredTrainings(prev => [...prev, course.id]);
    pushNotification(`Registered for training program: ${course.title} by ${course.provider}`);
  };

  const handleApplyInternship = (internship) => {
    if (appliedInternships.includes(internship.id)) return;
    setAppliedInternships(prev => [...prev, internship.id]);

    const newApp = {
      id: `app-intern-${Date.now()}`,
      jobId: internship.id,
      jobTitle: `${internship.title} (Internship)`,
      company: internship.company,
      applicantId: currentUser?.id || 'u-seeker-1',
      applicantName: currentUser?.name || 'Alex Mercer',
      applicantEmail: currentUser?.email || 'alex.mercer@gmail.com',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [...prev, newApp]);
    pushNotification(`Applied for internship: ${internship.title} at ${internship.company}`);
  };

  const handleBookService = (serviceId) => {
    if (!bookingDate) return;
    bookService(serviceId, bookingDate);
    setSelectedService(null);
    setBookingDate('');
    setActiveTab('orders');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment || !reviewingVendorId) return;

    submitReview({
      vendorId: reviewingVendorId,
      reviewerName: currentUser?.name || 'Alex Mercer',
      rating: Number(reviewRating),
      comment: reviewComment
    });

    setReviewComment('');
    setReviewingVendorId(null);
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(prev => prev.filter(id => id !== jobId));
    } else {
      setSavedJobs(prev => [...prev, jobId]);
    }
  };

  // Filtered jobs list
  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) || 
    j.company.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // Filtered training list
  const filteredTrainings = MOCK_TRAINING_COURSES.filter(t =>
    t.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    t.provider.toLowerCase().includes(jobSearch.toLowerCase()) ||
    t.category.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // Filtered opportunities list
  const filteredInternships = MOCK_INTERNSHIPS.filter(i =>
    i.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    i.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
    i.type.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const getSearchPlaceholder = () => {
    if (careerSubTab === 'training') return "Search courses, providers, categories...";
    if (careerSubTab === 'opportunities') return "Search internships, stipends, companies...";
    return "Search jobs, companies, requirements...";
  };

  return (
    <div className="space-y-6 w-full animate-slide-up">
      {/* ----------------------------------------------------
          DASHBOARD OVERVIEW TAB
         ---------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-6 text-sm">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-container">
            <div className="glass-panel hover-animate p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Submitted Applications</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{userApps.length}</h4>
              </div>
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/15">
                <FileText size={20} />
              </div>
            </div>
            <div className="glass-panel hover-animate p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Service Bookings</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{userBookings.length}</h4>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/15">
                <Clock size={20} />
              </div>
            </div>
            <div className="glass-panel hover-animate p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Toolkit Purchases</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{userOrders.length}</h4>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/15">
                <ShoppingBag size={20} />
              </div>
            </div>
            <div className="glass-panel hover-animate p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Saved Opportunities</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{savedJobs.length}</h4>
              </div>
              <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center border border-pink-500/15">
                <Heart size={20} />
              </div>
            </div>
          </div>

          {/* Job Search Section */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800/60 pb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <GraduationCap className="text-orange-400" size={22} />
                  Career & Growth Hub
                </h2>
                <p className="text-xs text-slate-500 mt-1">Search, apply, and register for corporate jobs, skill trainings, and internships.</p>
              </div>

              {/* Sub-tab Pill Selectors */}
              <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => { setCareerSubTab('jobs'); setJobSearch(''); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    careerSubTab === 'jobs'
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <Briefcase size={13} />
                  Jobs
                </button>
                <button
                  type="button"
                  onClick={() => { setCareerSubTab('training'); setJobSearch(''); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    careerSubTab === 'training'
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <BookOpen size={13} />
                  Training
                </button>
                <button
                  type="button"
                  onClick={() => { setCareerSubTab('opportunities'); setJobSearch(''); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    careerSubTab === 'opportunities'
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <Award size={13} />
                  Opportunities
                </button>
              </div>
            </div>

            <div className="relative w-full mb-6">
              <Search size={16} className="absolute left-3 top-3 text-slate-500" />
              <input 
                type="text" 
                value={jobSearch} 
                onChange={(e) => setJobSearch(e.target.value)} 
                placeholder={getSearchPlaceholder()}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl pl-9 pr-4 py-2 text-slate-100 focus:outline-none"
              />
            </div>

            {/* Sub-tab 1: Jobs */}
            {careerSubTab === 'jobs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-container">
                {filteredJobs.map(job => {
                  const isSaved = savedJobs.includes(job.id);
                  const hasApplied = userApps.some(a => a.jobId === job.id);

                  return (
                    <div key={job.id} className="border border-slate-800/80 bg-slate-950/20 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/60 transition duration-300 hover-animate">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-sm text-slate-200">{job.title}</h3>
                            <span className="text-xs text-slate-400 mt-0.5 block">{job.company}</span>
                          </div>
                          <button 
                            onClick={() => toggleSaveJob(job.id)}
                            className={`p-1.5 rounded-lg border transition ${
                              isSaved 
                                ? 'bg-pink-500/10 border-pink-500/30 text-pink-400' 
                                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2.5 mt-3 text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full"><MapPin size={11}/> {job.location}</span>
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full"><DollarSign size={11}/> {job.salary}</span>
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full"><Clock size={11}/> {job.type}</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-900 flex justify-between items-center text-xs">
                        <button 
                          onClick={() => setSelectedJob(job)}
                          className="text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          Learn More
                        </button>
                        <button 
                          onClick={() => handleApply(job.id)}
                          disabled={hasApplied}
                          className={`px-3.5 py-1.5 rounded-xl font-bold transition text-[11px] btn-animate ${
                            hasApplied 
                              ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed' 
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/15'
                          }`}
                        >
                          {hasApplied ? 'Applied' : 'Easy Apply'}
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredJobs.length === 0 && (
                  <div className="col-span-2 text-center text-slate-500 py-12">No active jobs found matching search terms.</div>
                )}
              </div>
            )}

            {/* Sub-tab 2: Training */}
            {careerSubTab === 'training' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-container">
                {filteredTrainings.map(course => {
                  const isRegistered = registeredTrainings.includes(course.id);
                  return (
                    <div key={course.id} className="border border-slate-800/80 bg-slate-950/20 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/60 transition duration-300 hover-animate">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-sm text-slate-200">{course.title}</h3>
                            <span className="text-xs text-slate-400 mt-0.5 block">{course.provider}</span>
                          </div>
                          <span className="flex items-center gap-1 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/15 px-2 py-0.5 rounded-full">
                            ⭐ {course.rating}
                          </span>
                        </div>
                        
                        <p className="text-[11.5px] text-slate-500 mt-3.5 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5 mt-4 text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                            <Clock size={11}/> {course.duration}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                            <DollarSign size={11}/> {course.price}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-indigo-400 border-indigo-500/20">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-900 flex justify-end">
                        <button
                          onClick={() => handleRegisterTraining(course)}
                          disabled={isRegistered}
                          className={`px-3.5 py-1.5 rounded-xl font-bold transition text-[11px] flex items-center gap-1.5 cursor-pointer btn-animate ${
                            isRegistered
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-default'
                              : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/15'
                          }`}
                        >
                          {isRegistered ? (
                            <>
                              <CheckCircle size={11} />
                              Registered
                            </>
                          ) : (
                            'Register Course'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredTrainings.length === 0 && (
                  <div className="col-span-2 text-center text-slate-500 py-12">No active training courses found matching search terms.</div>
                )}
              </div>
            )}

            {/* Sub-tab 3: Opportunities */}
            {careerSubTab === 'opportunities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-container">
                {filteredInternships.map(intern => {
                  const isApplied = appliedInternships.includes(intern.id);
                  return (
                    <div key={intern.id} className="border border-slate-800/80 bg-slate-950/20 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/60 transition duration-300 hover-animate">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-sm text-slate-200">{intern.title}</h3>
                            <span className="text-xs text-slate-400 mt-0.5 block">{intern.company}</span>
                          </div>
                          <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/15 px-2 py-0.5 rounded-full">
                            {intern.type}
                          </span>
                        </div>

                        <p className="text-[11.5px] text-slate-500 mt-3.5 leading-relaxed">
                          {intern.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5 mt-4 text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                            <MapPin size={11}/> {intern.location}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                            <Clock size={11}/> {intern.duration}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full text-emerald-400 border-emerald-500/20">
                            <DollarSign size={11}/> Stipend: {intern.stipend}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-900 flex justify-end">
                        <button
                          onClick={() => handleApplyInternship(intern)}
                          disabled={isApplied}
                          className={`px-3.5 py-1.5 rounded-xl font-bold transition text-[11px] flex items-center gap-1.5 cursor-pointer btn-animate ${
                            isApplied
                              ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 cursor-default'
                              : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/15'
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <CheckCircle size={11} />
                              Applied
                            </>
                          ) : (
                            'Easy Apply'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredInternships.length === 0 && (
                  <div className="col-span-2 text-center text-slate-500 py-12">No active internship opportunities found matching search terms.</div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          PROFILE MANAGEMENT TAB
         ---------------------------------------------------- */}
      {activeTab === 'profile' && (
        <div className="glass-panel p-6 rounded-2xl max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-800">
            <User className="text-indigo-400" size={20} />
            <h2 className="text-lg font-bold text-slate-100">Profile Management</h2>
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Full Name</label>
                <input 
                  type="text" 
                  value={profileName} 
                  onChange={(e) => setProfileName(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Email Address</label>
                <input 
                  type="email" 
                  value={profileEmail} 
                  onChange={(e) => setProfileEmail(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Profile Title</label>
                <input 
                  type="text" 
                  value={profileTitle} 
                  onChange={(e) => setProfileTitle(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Upload CV / Portfolio (Mock)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={cvFile} 
                    onChange={(e) => setCvFile(e.target.value)} 
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                  />
                  <button type="button" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300">
                    <Upload size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-semibold text-xs">Core Skills (Comma separated)</label>
              <input 
                type="text" 
                value={profileSkills} 
                onChange={(e) => setProfileSkills(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-semibold text-xs">Professional Bio</label>
              <textarea 
                rows="4"
                value={profileBio} 
                onChange={(e) => setProfileBio(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none resize-none"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20"
            >
              Save Profile Settings
            </button>
          </form>
        </div>
      )}

      {/* ----------------------------------------------------
          ORDERS & BOOKINGS TAB
         ---------------------------------------------------- */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Services Booking requests */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-bold text-slate-100">Service Bookings</h2>
              <button 
                onClick={() => setActiveTab('overview')} 
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Book a Vendor Service
              </button>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                    <th className="pb-3">Vendor</th>
                    <th className="pb-3">Service Package</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {userBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-900/10">
                      <td className="py-3 font-semibold text-slate-300">{b.vendorName}</td>
                      <td className="py-3 text-slate-400">{b.serviceTitle}</td>
                      <td className="py-3 text-slate-400">{b.date}</td>
                      <td className="py-3 text-slate-400 font-bold">${b.price}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                          b.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400' :
                          b.status === 'Cancelled' ? 'bg-red-500/15 text-red-400' :
                          b.status === 'Confirmed' ? 'bg-blue-500/15 text-blue-400' :
                          'bg-amber-500/15 text-amber-400 animate-pulse'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {b.status === 'Completed' ? (
                          <button 
                            onClick={() => setReviewingVendorId(b.vendorId)}
                            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md font-semibold"
                          >
                            Review
                          </button>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {userBookings.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-slate-500 py-6">No service bookings made yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Product Marketplace Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-base font-bold text-slate-100 mb-5">Digital Toolkit Purchases</h2>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                      <th className="pb-3">Product Name</th>
                      <th className="pb-3">Purchase Date</th>
                      <th className="pb-3">Cost</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {userOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-900/10">
                        <td className="py-3 font-semibold text-slate-300">{ord.productTitle}</td>
                        <td className="py-3 text-slate-400">{ord.date}</td>
                        <td className="py-3 text-indigo-400 font-bold">${ord.price}</td>
                        <td className="py-3">
                          <span className="bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {userOrders.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-slate-500 py-6">No marketplace orders.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Marketplace Browser */}
            <div className="glass-panel p-6 rounded-2xl lg:col-span-1">
              <h2 className="text-base font-bold text-slate-100 mb-4">Marketplace Toolkit</h2>
              <div className="space-y-4">
                {products.map(prod => (
                  <div key={prod.id} className="border border-slate-900 bg-slate-950/20 p-3.5 rounded-xl text-xs flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-semibold text-slate-300">{prod.title}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">{prod.description}</p>
                      <span className="font-extrabold text-indigo-400 mt-2 block">${prod.price}</span>
                    </div>
                    <button 
                      onClick={() => buyProduct(prod.id)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] shrink-0"
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          APPLICATIONS PIPELINE STATUS TAB
         ---------------------------------------------------- */}
      {activeTab === 'applications' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Your Job Applications</h2>
          <div className="space-y-4">
            {userApps.map(app => (
              <div key={app.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-950/20 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700/60 transition duration-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-200">{app.jobTitle}</h3>
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[9px] ${
                      app.status === 'Hired' ? 'bg-emerald-500/15 text-emerald-400' :
                      app.status === 'Rejected' ? 'bg-red-500/15 text-red-400' :
                      app.status === 'Interview Scheduled' ? 'bg-pink-500/15 text-pink-400 animate-pulse' :
                      'bg-indigo-500/15 text-indigo-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">{app.company}</span>
                  <span className="text-[10px] text-slate-500 mt-2 block">Applied on: {app.appliedDate}</span>
                </div>

                {app.interview && (
                  <div className="mt-4 sm:mt-0 bg-pink-500/5 border border-pink-500/15 p-3 rounded-xl max-w-sm text-xs text-pink-300">
                    <span className="font-bold uppercase tracking-wider text-[9px] block text-pink-400 mb-1">Interview Scheduled</span>
                    <div className="space-y-0.5">
                      <div>Slot: {app.interview.date} at {app.interview.time}</div>
                      <div>Format: {app.interview.type}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {userApps.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                You haven't submitted any job applications yet. Browse the Job Seeker board to apply!
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SAVED OPPORTUNITIES & WISHLIST TAB
         ---------------------------------------------------- */}
      {activeTab === 'saved' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Your Saved Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.filter(j => savedJobs.includes(j.id)).map(job => (
              <div key={job.id} className="border border-slate-800/80 bg-slate-950/20 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/60 transition duration-300">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">{job.title}</h3>
                      <span className="text-xs text-slate-400 mt-0.5 block">{job.company}</span>
                    </div>
                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400"
                    >
                      <Heart size={14} fill="currentColor" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5 mt-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full"><MapPin size={11}/> {job.location}</span>
                    <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full"><DollarSign size={11}/> {job.salary}</span>
                    <span className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full"><Clock size={11}/> {job.type}</span>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-900 flex justify-end">
                  <button 
                    onClick={() => handleApply(job.id)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-[11px] transition shadow-lg"
                  >
                    Easy Apply
                  </button>
                </div>
              </div>
            ))}

            {jobs.filter(j => savedJobs.includes(j.id)).length === 0 && (
              <div className="col-span-2 text-center py-12 text-slate-500">No saved jobs in your wishlist.</div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SETTINGS TAB
         ---------------------------------------------------- */}
      {activeTab === 'settings' && (
        <div className="glass-panel p-6 rounded-2xl max-w-xl mx-auto text-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <Settings className="text-indigo-400" size={20} />
            <h2 className="text-lg font-bold text-slate-100">Account Configuration</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-slate-300">Email Job Alerts</h4>
                <p className="text-xs text-slate-500 mt-0.5">Receive digests of newly published roles matching your skills.</p>
              </div>
              <input 
                type="checkbox" 
                checked={emailAlerts} 
                onChange={() => setEmailAlerts(!emailAlerts)} 
                className="w-4 h-4 bg-slate-900 border border-slate-800 accent-indigo-500 rounded"
              />
            </div>

            <div className="flex justify-between items-center border-t border-slate-900 pt-4">
              <div>
                <h4 className="font-semibold text-slate-300">Live Browser Notifications</h4>
                <p className="text-xs text-slate-500 mt-0.5">Get immediate updates on booking confirmations and interviews.</p>
              </div>
              <input 
                type="checkbox" 
                checked={desktopAlerts} 
                onChange={() => setDesktopAlerts(!desktopAlerts)} 
                className="w-4 h-4 bg-slate-900 border border-slate-800 accent-indigo-500 rounded"
              />
            </div>

            <div className="flex justify-between items-center border-t border-slate-900 pt-4">
              <div>
                <h4 className="font-semibold text-slate-300">Profile Search Visibility</h4>
                <p className="text-xs text-slate-500 mt-0.5">Let recruiting employers inspect your details and CV files.</p>
              </div>
              <input 
                type="checkbox" 
                checked={visibility} 
                onChange={() => setVisibility(!visibility)} 
                className="w-4 h-4 bg-slate-900 border border-slate-800 accent-indigo-500 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MEMBERSHIP TAB
         ---------------------------------------------------- */}
      {activeTab === 'membership' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT — Active Membership Card */}
            <div className="glass-panel p-6 rounded-2xl lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-100 mb-1">Your Active Membership</h2>
                <p className="text-xs text-slate-500 mb-5">Your verified digital card on the Connect network.</p>
                
                {currentUser?.membership ? (() => {
                  const plan = DASHBOARD_MEMBERSHIPS.find(m => m.name.toLowerCase() === currentUser.membership.plan.toLowerCase()) || DASHBOARD_MEMBERSHIPS[0];
                  return (
                    <div className="space-y-4">
                      {/* High fidelity card replica */}
                      <div
                        className="w-full aspect-[1.586/1] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border"
                        style={{
                          background: plan.atmBg,
                          borderColor: 'rgba(255,255,255,0.08)',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                        <div className="flex justify-between items-start z-10">
                          <span className="text-[9px] font-bold tracking-widest text-white/50 font-mono">CONNECT PREPAID</span>
                          <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h.01M8.5 8.5a5 5 0 0 1 7 0M12 5a10 10 0 0 1 10 10" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="flex items-center gap-3 z-10">
                          <div className="w-9 h-7 rounded-md bg-gradient-to-br from-yellow-300 to-amber-500 opacity-90 relative overflow-hidden shadow border border-amber-600/20">
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-amber-700/25">
                              <div className="border-r border-b border-amber-700/25" />
                              <div className="border-r border-b border-amber-700/25" />
                              <div className="border-b border-amber-700/25" />
                            </div>
                          </div>
                          <div className="w-6 h-5 rounded border border-white/10 bg-white/5 flex items-center justify-center">
                            <div className="w-3 h-2.5 bg-white/20 rounded-sm" />
                          </div>
                        </div>
                        <div className="z-10 font-mono text-sm tracking-[0.18em] text-white font-extrabold text-shadow-sm select-none">
                          {plan.cardNumber}
                        </div>
                        <div className="flex justify-between items-end z-10">
                          <div>
                            <p className="text-[7px] text-white/45 tracking-wider uppercase">Cardholder</p>
                            <p className="text-[10px] font-mono font-bold text-white tracking-wide">{currentUser.name.toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-[7px] text-white/45 tracking-wider uppercase">Valid Thru</p>
                            <p className="text-[10px] font-mono font-bold text-white tracking-wide">{plan.cardExpiry}</p>
                          </div>
                          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="font-black text-white text-xs select-none">C</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tier Plan:</span>
                          <span className="font-bold text-slate-200">{plan.name} Membership</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Status:</span>
                          <span className="font-bold text-emerald-400">Verified & Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Billing Period:</span>
                          <span className="text-slate-400">Monthly renewal</span>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="space-y-4">
                    {/* Placeholder inactive card */}
                    <div className="w-full aspect-[1.586/1] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 opacity-60">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-bold tracking-widest text-slate-500 font-mono">CONNECT INACTIVE</span>
                        <span className="text-xs text-slate-600">🚫</span>
                      </div>
                      <div className="text-center py-4 text-xs font-bold text-slate-600 tracking-wider">
                        NO ACTIVE MEMBERSHIP CARD
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[7px] text-slate-600 tracking-wider uppercase">Cardholder</p>
                          <p className="text-[10px] font-mono font-bold text-slate-500 uppercase">{currentUser?.name || "GUEST"}</p>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                          <span className="font-black text-slate-700 text-xs select-none">C</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400 leading-relaxed">
                      Select one of the card tiers on the right to register your initial card payment request.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — Upgrade Card / Subscription Plans */}
            <div className="glass-panel p-6 rounded-2xl lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-100 mb-1">Upgrade or Subscribe</h2>
                <p className="text-xs text-slate-500 mb-5">Select a membership card to subscribe or upgrade your access.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {DASHBOARD_MEMBERSHIPS.map(plan => {
                    const isCurrent = currentUser?.membership?.plan.toLowerCase() === plan.name.toLowerCase();
                    const currentPlanIndex = DASHBOARD_MEMBERSHIPS.findIndex(m => m.name.toLowerCase() === (currentUser?.membership?.plan || '').toLowerCase());
                    const thisPlanIndex = DASHBOARD_MEMBERSHIPS.findIndex(m => m.name.toLowerCase() === plan.name.toLowerCase());
                    const isUpgrade = currentUser?.membership && thisPlanIndex > currentPlanIndex;
                    const isDowngrade = currentUser?.membership && thisPlanIndex < currentPlanIndex;

                    return (
                      <div 
                        key={plan.name} 
                        className={`border rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/60 transition bg-slate-950/10 ${
                          isCurrent ? 'border-blue-500/40 bg-blue-500/5' : 'border-slate-800/80'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-200 text-sm">{plan.name}</h4>
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ background: plan.color }} 
                            />
                          </div>
                          <div className="flex items-baseline mt-2.5 gap-0.5">
                            <span className="text-lg font-extrabold text-slate-100">{plan.price}</span>
                            <span className="text-[10px] text-slate-500">{plan.period}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-3 mt-2 leading-relaxed">
                            {plan.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-900">
                          <button
                            type="button"
                            onClick={() => {
                              const requestType = isUpgrade ? "Upgrade Request" : "Initial Payment";
                              requestMembership(plan.name, plan.price, requestType);
                            }}
                            disabled={isCurrent || isDowngrade}
                            className={`w-full py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                              isCurrent 
                                ? 'bg-slate-900 text-slate-500 border border-slate-800 cursor-default' 
                                : isDowngrade 
                                ? 'bg-slate-900 text-slate-600 border border-slate-900 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/10'
                            }`}
                          >
                            {isCurrent ? 'Current Plan' : isDowngrade ? 'Billed Card' : isUpgrade ? 'Upgrade' : 'Subscribe'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM — Transaction & Billing Log */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-base font-bold text-slate-100 mb-4">Billing & Membership History</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase pb-3">
                    <th className="pb-3">Reference ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">Transaction Type</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {membershipRequests
                    .filter(r => r.userId === currentUser?.id)
                    .map(r => (
                      <tr key={r.id} className="hover:bg-slate-900/10">
                        <td className="py-3 font-semibold text-slate-300">REF-{r.id.split('-')[1] || r.id}</td>
                        <td className="py-3 text-slate-400">{r.date}</td>
                        <td className="py-3 text-slate-400">{r.planName}</td>
                        <td className="py-3 text-slate-400">{r.type}</td>
                        <td className="py-3 text-indigo-400 font-bold">{r.amount}</td>
                        <td className="py-3 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                            r.status === 'Approved' ? 'bg-emerald-500/15 text-emerald-400' :
                            r.status === 'Rejected' ? 'bg-red-500/15 text-red-400' :
                            'bg-amber-500/15 text-amber-400 animate-pulse'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  {membershipRequests.filter(r => r.userId === currentUser?.id).length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-slate-500 py-6">No payment history found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          JOB DESCRIPTION DETAIL MODAL
         ---------------------------------------------------- */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="glass-panel p-6 rounded-2xl w-full max-w-lg animate-scale-in text-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base text-slate-200">{selectedJob.title}</h3>
                <span className="text-xs text-indigo-400 mt-0.5 block">{selectedJob.company}</span>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-4 text-slate-400 text-xs">
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800/80 px-2.5 py-0.5 rounded-full"><MapPin size={12}/> {selectedJob.location}</span>
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800/80 px-2.5 py-0.5 rounded-full"><DollarSign size={12}/> {selectedJob.salary}</span>
              <span className="flex items-center gap-1 bg-slate-900 border border-slate-800/80 px-2.5 py-0.5 rounded-full"><Clock size={12}/> {selectedJob.type}</span>
            </div>

            <div className="mt-5 space-y-2">
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider">Position Requirements</h4>
              <p className="text-slate-400 text-xs leading-relaxed max-h-40 overflow-y-auto pr-1">
                {selectedJob.description}
              </p>
            </div>

            {applyMessage && (
              <div className={`mt-4 p-2.5 rounded-xl text-center text-xs font-bold ${
                applyMessage.includes('successful') 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {applyMessage}
              </div>
            )}

            <div className="flex gap-2.5 pt-6 mt-4 border-t border-slate-900">
              <button 
                onClick={() => setSelectedJob(null)}
                className="w-1/3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 py-2.5 rounded-xl font-bold transition"
              >
                Close
              </button>
              <button 
                onClick={() => handleApply(selectedJob.id)}
                className="w-2/3 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-bold transition shadow-lg shadow-indigo-600/10"
              >
                Easy Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          CUSTOMER VENDOR REVIEW SUBMISSION MODAL
         ---------------------------------------------------- */}
      {reviewingVendorId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="glass-panel p-6 rounded-2xl w-full max-w-md animate-scale-in text-sm">
            <h3 className="font-bold text-base text-slate-200 mb-1">Submit Customer Review</h3>
            <p className="text-xs text-slate-500 mb-4">Rate the services and deliverables from this vendor.</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold text-xs">Rating Stars (1-5)</label>
                <select 
                  value={reviewRating} 
                  onChange={(e) => setReviewRating(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500/50"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                  <option value="3">⭐⭐⭐ 3 Stars</option>
                  <option value="2">⭐⭐ 2 Stars</option>
                  <option value="1">⭐ 1 Star</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold text-xs">Review Details</label>
                <textarea 
                  rows="4"
                  value={reviewComment} 
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Detail your experience with the vendor packages..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500/50 resize-none"
                  required
                />
              </div>

              <div className="flex gap-2.5 pt-4">
                <button 
                  type="button" 
                  onClick={() => setReviewingVendorId(null)}
                  className="w-1/2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 py-2.5 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-bold transition shadow-lg shadow-indigo-600/10"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
