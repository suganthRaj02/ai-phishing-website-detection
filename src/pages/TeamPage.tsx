import React from 'react';
import { GraduationCap, Award, BookOpen, User, ShieldCheck, Mail, GitBranch, Cpu } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Manu Neethi S',
      regNo: '192521063',
      role: 'Machine Learning & Threat Modeling',
      initials: 'MN',
      color: 'from-cyan-500/30 to-blue-600/40 border-cyan-500/50 text-cyan-300',
      description: 'Engineered the feature extraction pipeline and trained the Random Forest scikit-learn model on phishing dataset vectors.',
    },
    {
      name: 'Sugantharaj A',
      regNo: '192421416',
      role: 'Frontend Architecture & Firebase Integration',
      initials: 'SA',
      color: 'from-teal-500/30 to-emerald-600/40 border-teal-500/50 text-teal-300',
      description: 'Built the responsive React + TypeScript dashboard, Google OAuth authentication flow, and Firestore persistence architecture.',
    },
    {
      name: 'Dinesh Karthik R.',
      regNo: '192524121',
      role: 'Security Analysis & Ethical Hacking Validation',
      initials: 'DK',
      color: 'from-indigo-500/30 to-purple-600/40 border-indigo-500/50 text-indigo-300',
      description: 'Validated zero-day attack heuristics, homograph attack tests, and formulated contextual security recommendations.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ITA1402 – Ethical Hacking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Project Team & Academic Mentorship
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Final Year Engineering Capstone Presentation — Department of Information Technology & Cybersecurity
        </p>
      </div>

      {/* Team Members Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-white font-bold text-lg">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
          <h2>Project Team Members</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl group hover:translate-y-[-2px]"
            >
              <div className="space-y-4">
                {/* Professional Initials Avatar */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} border flex items-center justify-center font-bold text-xl tracking-wider shadow-lg group-hover:scale-105 transition-transform`}>
                  {member.initials}
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">{member.name}</h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/60 font-semibold">
                      Reg No: {member.regNo}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-2">
                    {member.role}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                  {member.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Member #{idx + 1}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Guide Section */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        <div className="flex items-center space-x-2 text-white font-bold text-lg">
          <Award className="w-5 h-5 text-cyan-400" />
          <h2>Project Guide & Advisor</h2>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black text-2xl shadow-lg flex-shrink-0">
            DS
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
              FACULTY GUIDE & MENTOR
            </div>
            <h3 className="text-2xl font-bold text-white">Dr. Smitha</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Faculty Advisor overseeing the research methodology, algorithmic feature calibration, ethical hacking guidelines, and defense against deceptive cybersecurity threats for the ITA1402 curriculum.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-400">
              <span>Department of Information Technology</span>
              <span>&bull;</span>
              <span>Course: ITA1402 – Ethical Hacking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
