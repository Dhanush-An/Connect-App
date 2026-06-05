import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FunnelChart } from '../../components/CustomCharts';
import { 
  Briefcase, Users, Calendar, TrendingUp, Plus, Trash2, 
  MapPin, DollarSign, Clock, FileText, CheckCircle, XCircle 
} from 'lucide-react';

export default function EmployerDashboard({ activeTab, setActiveTab }) {
  const { 
    currentUser, jobs, postJob, deleteJob, applications, updateApplicationStatus, analytics 
  } = useApp();

  // Job posting state
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [jobLocation, setJobLocation] = useState('Remote');
  const [jobSalary, setJobSalary] = useState('$100,000 - $120,000');
  const [jobDescription, setJobDescription] = useState('');

  // Interview scheduling modal state
  const [schedulingApp, setSchedulingApp] = useState(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('10:00');
  const [interviewType, setInterviewType] = useState('Video Call');

  // Filter jobs and applications for this employer
  const employerJobs = jobs.filter(j => j.employerId === currentUser?.id);
  const employerJobIds = employerJobs.map(j => j.id);
  const employerApps = applications.filter(a => employerJobIds.includes(a.jobId));
  const scheduledInterviews = employerApps.filter(a => a.status === 'Interview Scheduled' && a.interview);

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!jobTitle || !jobDescription) return;

    postJob({
      title: jobTitle,
      company: currentUser?.name || 'Innovate Tech Corp',
      employerId: currentUser?.id || 'u-employer-1',
      location: jobLocation,
      salary: jobSalary,
      type: jobType,
      description: jobDescription
    });

    // Reset form
    setJobTitle('');
    setJobDescription('');
    setActiveTab('jobs');
  };

  const handleScheduleInterview = (e) => {
    e.preventDefault();
    if (!interviewDate || !schedulingApp) return;

    updateApplicationStatus(schedulingApp.id, 'Interview Scheduled', {
      date: interviewDate,
      time: interviewTime,
      type: interviewType
    });

    setSchedulingApp(null);
    setInterviewDate('');
  };

  return (
    <div className="space-y-6 w-full animate-slide-up">
      {/* ----------------------------------------------------
          OVERVIEW / REPORTS TAB
         ---------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Active Jobs</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{employerJobs.length}</h4>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/15">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Candidates</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{employerApps.length}</h4>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/15">
                <Users size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Interviews</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">{scheduledInterviews.length}</h4>
              </div>
              <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center border border-pink-500/15">
                <Calendar size={20} />
              </div>
            </div>
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-slate-500 text-xs font-semibold">Offers Accepted</span>
                <h4 className="text-2xl font-bold mt-1 text-slate-100">
                  {employerApps.filter(a => a.status === 'Hired').length}
                </h4>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/15">
                <CheckCircle size={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl lg:col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-200 mb-2">Hiring Pipeline Funnel</h3>
                <p className="text-xs text-slate-500 mb-4">Tracking applicant conversion across hiring milestones.</p>
              </div>
              <FunnelChart 
                data={[
                  { name: 'Applied', count: employerApps.length },
                  { name: 'Shortlisted', count: employerApps.filter(a => ['Shortlisted', 'Interview Scheduled', 'Hired'].includes(a.status)).length },
                  { name: 'Hired', count: employerApps.filter(a => a.status === 'Hired').length }
                ]} 
              />
            </div>

            <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
              <h3 className="text-base font-bold text-slate-200 mb-4">Recent Applicants</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase pb-3">
                      <th className="pb-3">Candidate</th>
                      <th className="pb-3">Job Applied</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-xs">
                    {employerApps.slice(0, 5).map((app) => (
                      <tr key={app.id} className="hover:bg-slate-900/10">
                        <td className="py-3 font-semibold text-slate-300">{app.applicantName}</td>
                        <td className="py-3 text-slate-400">{app.jobTitle}</td>
                        <td className="py-3 text-slate-500">{app.appliedDate}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                            app.status === 'Hired' ? 'bg-emerald-500/15 text-emerald-400' :
                            app.status === 'Rejected' ? 'bg-red-500/15 text-red-400' :
                            app.status === 'Interview Scheduled' ? 'bg-pink-500/15 text-pink-400 animate-pulse' :
                            'bg-indigo-500/15 text-indigo-400'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {employerApps.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-slate-500 py-6">No applicants yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          POST JOBS TAB
         ---------------------------------------------------- */}
      {activeTab === 'post-job' && (
        <div className="glass-panel p-6 rounded-2xl max-w-2xl mx-auto">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-slate-800">
            <Plus className="text-indigo-400" size={20} />
            <h2 className="text-lg font-bold text-slate-100">Create New Job Listing</h2>
          </div>
          <form onSubmit={handlePostJob} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Job Title</label>
                <input 
                  type="text" 
                  value={jobTitle} 
                  onChange={(e) => setJobTitle(e.target.value)} 
                  placeholder="e.g. Staff Fullstack Engineer"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Job Type</label>
                <select 
                  value={jobType} 
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Location</label>
                <input 
                  type="text" 
                  value={jobLocation} 
                  onChange={(e) => setJobLocation(e.target.value)}
                  placeholder="e.g. Remote / Chicago, IL"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold text-xs">Salary Range</label>
                <input 
                  type="text" 
                  value={jobSalary} 
                  onChange={(e) => setJobSalary(e.target.value)}
                  placeholder="e.g. $130,000 - $150,000"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-semibold text-xs">Description & Requirements</label>
              <textarea 
                rows="5"
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Detail core responsibilities, tech stack, and ideal candidate experience..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none resize-none"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20"
            >
              Publish Job Listing
            </button>
          </form>
        </div>
      )}

      {/* ----------------------------------------------------
          MANAGE JOBS LIST TAB
         ---------------------------------------------------- */}
      {activeTab === 'jobs' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Your Posted Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employerJobs.map(job => (
              <div key={job.id} className="border border-slate-800/80 bg-slate-950/20 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-slate-200">{job.title}</h3>
                    <button 
                      onClick={() => deleteJob(job.id)}
                      className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 text-slate-400 text-xs">
                    <span className="flex items-center gap-1"><MapPin size={13}/> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign size={13}/> {job.salary}</span>
                    <span className="flex items-center gap-1"><Clock size={13}/> {job.type}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-3.5 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-600">Posted on: {job.postedAt}</span>
                  <span className="bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                    Active
                  </span>
                </div>
              </div>
            ))}

            {employerJobs.length === 0 && (
              <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
                No active job postings. Start by posting a new job!
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          VIEW APPLICANTS TAB
         ---------------------------------------------------- */}
      {activeTab === 'applicants' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-100">Candidate Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {employerApps.map(app => (
              <div key={app.id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base text-slate-200">{app.applicantName}</h3>
                      <span className="text-xs text-indigo-400 block mt-0.5">Applied for: {app.jobTitle}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      app.status === 'Hired' ? 'bg-emerald-500/15 text-emerald-400' :
                      app.status === 'Rejected' ? 'bg-red-500/15 text-red-400' :
                      app.status === 'Interview Scheduled' ? 'bg-pink-500/15 text-pink-400 animate-pulse' :
                      'bg-indigo-500/15 text-indigo-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="mt-4 bg-slate-950/40 p-4 rounded-xl border border-slate-900 space-y-2.5 text-xs text-slate-400">
                    <div><span className="font-semibold text-slate-300">Email:</span> {app.applicantEmail}</div>
                    <div><span className="font-semibold text-slate-300">Profile Title:</span> Senior Frontend Engineer</div>
                    <div><span className="font-semibold text-slate-300">Key Skills:</span> React.js, Tailwind CSS, Node.js</div>
                    {app.interview && (
                      <div className="pt-2 mt-2 border-t border-slate-900 text-pink-400">
                        <span className="font-semibold">Interview:</span> {app.interview.date} at {app.interview.time} ({app.interview.type})
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 justify-end border-t border-slate-900 pt-4">
                  {app.status !== 'Hired' && app.status !== 'Rejected' && (
                    <>
                      <button 
                        onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                        className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs px-3 py-1.5 rounded-xl transition"
                      >
                        <XCircle size={14}/> Reject
                      </button>
                      <button 
                        onClick={() => updateApplicationStatus(app.id, 'Shortlisted')}
                        className="bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs px-3 py-1.5 rounded-xl transition"
                      >
                        Shortlist
                      </button>
                      <button 
                        onClick={() => setSchedulingApp(app)}
                        className="flex items-center gap-1 bg-pink-500/15 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 text-xs px-3 py-1.5 rounded-xl transition font-semibold"
                      >
                        <Calendar size={14}/> Schedule
                      </button>
                      <button 
                        onClick={() => updateApplicationStatus(app.id, 'Hired')}
                        className="flex items-center gap-1 bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1.5 rounded-xl transition font-semibold"
                      >
                        <CheckCircle size={14}/> Hire
                      </button>
                    </>
                  )}
                  {(app.status === 'Hired' || app.status === 'Rejected') && (
                    <span className="text-[11px] text-slate-500 py-1">Application process finalised</span>
                  )}
                </div>
              </div>
            ))}

            {employerApps.length === 0 && (
              <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
                No applicant submissions found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          INTERVIEW SCHEDULE TAB
         ---------------------------------------------------- */}
      {activeTab === 'interviews' && (
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-100 mb-5">Scheduled Interviews Calendar</h2>
          <div className="space-y-4">
            {scheduledInterviews.map(app => (
              <div key={app.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-950/20 border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700/60 transition duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center border border-pink-500/15 shrink-0">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-200">{app.applicantName}</h3>
                    <span className="text-xs text-indigo-400 font-medium block">Job: {app.jobTitle}</span>
                    <span className="text-xs text-slate-500 block mt-1">Status: Candidate Interview Stage</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex flex-wrap gap-4 text-xs">
                  <div className="bg-slate-900 border border-slate-800/50 p-2.5 rounded-xl text-center min-w-28">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Date</div>
                    <div className="font-bold text-slate-300 mt-0.5">{app.interview.date}</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800/50 p-2.5 rounded-xl text-center min-w-20">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Time</div>
                    <div className="font-bold text-slate-300 mt-0.5">{app.interview.time}</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800/50 p-2.5 rounded-xl text-center min-w-24">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Type</div>
                    <div className="font-bold text-slate-300 mt-0.5">{app.interview.type}</div>
                  </div>
                </div>
              </div>
            ))}

            {scheduledInterviews.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No interviews scheduled currently. Shortlist a candidate and trigger scheduling.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          INTERVIEW SCHEDULER POPUP MODAL
         ---------------------------------------------------- */}
      {schedulingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="glass-panel p-6 rounded-2xl w-full max-w-md animate-scale-in">
            <h3 className="font-bold text-base text-slate-200 mb-1">Schedule Candidate Interview</h3>
            <p className="text-xs text-slate-500 mb-4">Set times for {schedulingApp.applicantName}</p>

            <form onSubmit={handleScheduleInterview} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-semibold">Select Date</label>
                <input 
                  type="date" 
                  value={interviewDate} 
                  onChange={(e) => setInterviewDate(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 focus:border-pink-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Select Time</label>
                  <input 
                    type="time" 
                    value={interviewTime} 
                    onChange={(e) => setInterviewTime(e.target.value)} 
                    className="w-full bg-slate-900 border border-slate-800 focus:border-pink-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Meeting Type</label>
                  <select 
                    value={interviewType} 
                    onChange={(e) => setInterviewType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-pink-500/50 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
                  >
                    <option>Video Call</option>
                    <option>On-site Office</option>
                    <option>Phone Call</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4">
                <button 
                  type="button" 
                  onClick={() => setSchedulingApp(null)}
                  className="w-1/2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 py-2.5 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2.5 rounded-xl font-bold hover:from-indigo-500 hover:to-purple-500 transition shadow-lg shadow-indigo-600/10"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
