import React, { useState, useEffect } from 'react';
import {
  Home, Dumbbell, PlayCircle, User,
  Play, Bell, ChevronRight, ArrowLeft, Clock,
  Star as StarIcon, Target, Shield, Zap, Flame,
  Trophy, Globe, Activity, CheckCircle2, Coffee, Quote,
  LogOut, CreditCard, Settings, DownloadCloud, Moon, Sun,
  X, Check, Lock, Bot, Calendar, Gamepad2, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA ---
const CATEGORIES = {
  'Football': [
    {
      id: 'f1', title: 'Individual Session', coach: 'Head Coach', level: 'All Levels', rating: '4.9', duration: '2h 00m',
      desc: 'Focused 1-on-1 drills to maximize personal technique and ball mastery.', focus: 'Technical', premium: true,
      episodes: [{ id: 1, title: '1v1 Tactics', time: '20:00' }, { id: 2, title: 'Sole Control', time: '25:00' }]
    },
    {
      id: 'f2', title: 'Duo Session', coach: 'Tactical Coach', level: 'Intermediate', rating: '4.8', duration: '3h 15m',
      desc: 'Pair training drills focusing on passing chemistry and combinations.', focus: 'Passing', premium: true,
      episodes: [{ id: 1, title: 'Give and Go', time: '15:00' }, { id: 2, title: 'Overlap Runs', time: '20:00' }]
    },
    {
      id: 'f3', title: 'Small Group (3-5)', coach: 'Academy', level: 'Advanced', rating: '4.9', duration: '4h 30m',
      desc: 'Dynamic group exercises simulating match intensity and possession.', focus: 'Tactical', premium: false,
      episodes: [{ id: 1, title: 'Rondo Basics', time: '30:00' }, { id: 2, title: 'Pressing Traps', time: '40:00' }]
    },
  ],
  'Gym': [
    { id: 'g1', title: 'Lower Body', coach: 'Fitness Coach', level: 'All', rating: '5.0', duration: '1h 45m', desc: 'Explosive leg power and speed generation.', focus: 'Strength', premium: true, episodes: [{ id: 1, title: 'Squat Mastery', time: '15:00' }] },
    { id: 'g2', title: 'Upper Body', coach: 'Fitness Coach', level: 'All', rating: '4.8', duration: '1h 30m', desc: 'Build upper body dominance and shield strength.', focus: 'Strength', premium: false, episodes: [{ id: 1, title: 'Push Mechanics', time: '20:00' }] },
    { id: 'g3', title: 'Core', coach: 'Fitness Coach', level: 'All', rating: '4.9', duration: '1h 00m', desc: 'Develop an iron core for balance and shooting.', focus: 'Stability', premium: true, episodes: [{ id: 1, title: 'Dynamic Planks', time: '10:00' }] },
    { id: 'g4', title: 'Full Body', coach: 'Performance', level: 'Advanced', rating: '4.9', duration: '2h 15m', desc: 'Complete athletic conditioning for 90 minutes.', focus: 'Endurance', premium: true, episodes: [{ id: 1, title: 'HIIT Circuits', time: '30:00' }] },
    { id: 'g5', title: 'Mobility / Stretching', coach: 'Physio', level: 'Recovery', rating: '5.0', duration: '45m', desc: 'Prevent injuries and increase range of motion.', focus: 'Recovery', premium: false, episodes: [{ id: 1, title: 'Pre-Match Flow', time: '15:00' }] },
  ]
};

const POSITION_DRILLS = {
  'STRIKER': [
    { title: 'Elite Finishing School', coach: 'Pro Attacker', duration: '45m', rating: '4.9', premium: true },
    { title: 'Movement in the Box', coach: 'Target Man', duration: '30m', rating: '4.8', premium: true },
    { title: 'Basic Shooting', coach: 'Academy', duration: '15m', rating: '4.5', premium: false },
  ],
  'MIDFIELDER': [
    { title: 'The Midfield Maestro', coach: 'Playmaker', duration: '50m', rating: '5.0', premium: true },
    { title: 'Scan, Receive, Turn', coach: 'Pro Coach', duration: '40m', rating: '4.9', premium: true },
    { title: 'Passing Triangle', coach: 'Academy', duration: '20m', rating: '4.4', premium: false },
  ],
  'GOALKEEPER': [
    { title: 'Reflex Masterclass', coach: 'GK Coach', duration: '60m', rating: '4.9', premium: true },
    { title: 'Diving Technique', coach: 'The Wall', duration: '45m', rating: '4.8', premium: true },
    { title: 'Handling Basics', coach: 'Academy', duration: '15m', rating: '4.6', premium: false },
  ]
};

const TRAINING_PLANS = {
  'Shooting': [
    { title: 'Power Strikes', coach: 'Pro Attacker', duration: '20m', rating: '4.8', premium: true },
    { title: 'Finesse Finishing', coach: 'Academy', duration: '15m', rating: '4.5', premium: false },
  ],
  'Dribbling': [
    { title: 'Close Control', coach: 'Playmaker', duration: '25m', rating: '4.9', premium: true },
    { title: '1v1 Beat Defender', coach: 'Winger', duration: '30m', rating: '5.0', premium: true },
  ],
  'Passing': [
    { title: 'Long Balls', coach: 'Pro Coach', duration: '20m', rating: '4.7', premium: false },
    { title: 'One Touch Magic', coach: 'Midfielder', duration: '35m', rating: '4.9', premium: true },
  ]
};

// --- COMPONENTS ---

const HomeScreen = ({ onSelectCourse, onNavigate, isPro, triggerPaywall }) => {
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const containerWidth = e.target.clientWidth;
    const activeIndex = Math.round(scrollLeft / (containerWidth * 0.88));
    setActiveCard(activeIndex);
  };

  const banners = [
    { badge: 'LIVE NOW', title: 'Masterclass: \nFirst Touch', desc: 'Learn elite ball control secrets.', bg: 'from-brand to-accentOrange', icon: PlayCircle },
    { badge: 'COMMUNITY', title: 'Train Like\nA Pro Player', desc: 'Join 10,000+ athletes worldwide.', bg: 'from-accentBlue to-cyan-400', icon: Globe },
    { badge: 'PREMIUM', title: 'Unlock Pro\nMentality', desc: 'Mental coaching for performers.', bg: 'from-purple-600 to-pink-500', icon: Trophy },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">

      <div className="pt-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white font-black text-xl shadow-glow">B</div>
          <span className="font-black text-[22px] tracking-tighter text-textMain">B<span className="text-brand">PRO</span></span>
        </div>

        {isPro ? (
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-300 to-amber-500 px-3.5 py-2 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] cursor-pointer">
            <Trophy size={14} className="text-slate-900 fill-current" />
            <span className="text-[11px] font-black tracking-widest text-slate-900 uppercase">PRO MEMBER</span>
          </div>
        ) : (
          <div onClick={triggerPaywall} className="flex items-center gap-1.5 bg-gradient-to-r from-brand to-accentOrange px-4 py-2.5 rounded-full shadow-glow cursor-pointer active:scale-95 transition-transform hover:scale-105">
            <Zap size={14} className="text-white fill-current" />
            <span className="text-[11px] font-black tracking-widest text-white uppercase">Go Pro</span>
          </div>
        )}
      </div>

      <div className="pt-6 mb-6">
        <p className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Welcome back,</p>
        <h1 className="text-[28px] font-black text-textMain tracking-tight">Player One! 👋</h1>
      </div>

      <div className="mb-10 -mx-6">
        <div onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 no-scrollbar">
          {banners.map((banner, i) => (
            <div key={i} className={`min-w-[88%] snap-center shrink-0 bg-gradient-to-br ${banner.bg} p-6 rounded-[32px] shadow-glow relative overflow-hidden text-white flex flex-col justify-between h-[200px] cursor-pointer`}>
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>
              <div className="absolute right-[-10%] bottom-[-15%] opacity-20 transform -rotate-12 transition-transform duration-700">
                <banner.icon size={180} />
              </div>

              <div className="relative z-10 pt-2">
                <span className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase mb-4 inline-block">
                  {banner.badge}
                </span>
                <h2 className="text-[26px] font-black leading-none whitespace-pre-line text-white shadow-sm">{banner.title}</h2>
              </div>

              <div className="relative z-10 mt-auto pt-2">
                <p className="text-white/90 text-xs font-bold leading-tight">{banner.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-1">
          {banners.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${activeCard === i ? 'w-4 bg-brand' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`}></div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-sm font-extrabold text-textMain mb-4">Training Hub</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { id: 'football', label: 'Football', icon: Flame, color: 'text-brand', bg: 'bg-brandSoft' },
            { id: 'gym', label: 'Gym', icon: Dumbbell, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { id: 'positions', label: 'Positions', icon: Target, color: 'text-accentBlue', bg: 'bg-accentBlue/10' },
            { id: 'training_plan', label: 'Training Plan', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { id: 'custom_plan', label: 'Program', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { id: 'ai_coach', label: 'AI Coach', icon: Bot, color: 'text-pink-500', bg: 'bg-pink-500/10' },
            { id: 'games', label: 'Games', icon: Gamepad2, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
            { id: 'events', label: 'Events', icon: MapPin, color: 'text-violet-500', bg: 'bg-violet-500/10' },
          ].map((m, i) => (
            <div key={i} onClick={() => onNavigate(m.id)} className="flex flex-col items-center gap-2 cursor-pointer group bg-surface border border-surfaceAlt p-3 rounded-[24px] shadow-sm hover:shadow-md transition-all h-full">
              <div className={`w-12 h-12 ${m.bg} ${m.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                <m.icon size={20} strokeWidth={2.5} className={(m.id === 'custom_plan') ? 'text-orange-500' : ''} />
              </div>
              <span className="text-[10px] font-bold text-textMain tracking-tight text-center leading-none mt-1">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-black text-textMain tracking-tight">New Releases</h3>
          <span className="text-brand text-xs font-bold cursor-pointer hover:underline">See All</span>
        </div>

        {CATEGORIES['Football'].map((p, index) => (
          <div key={p.id} onClick={() => onSelectCourse(p)} className={`w-full bg-surface border border-surfaceAlt rounded-[32px] p-2 shadow-sm cursor-pointer group hover:shadow-md transition-all ${index > 0 ? 'mt-4' : ''}`}>
            <div className="h-48 bg-surfaceAlt rounded-[24px] flex items-center justify-center relative mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brandSoft to-surface opacity-80" />
              <div className="relative z-10 w-16 h-16 bg-surface rounded-full flex items-center justify-center text-brand shadow-glow group-hover:scale-110 transition-transform">
                {p.premium && !isPro ? <Lock fill="currentColor" size={24} className="opacity-80" /> : <Play fill="currentColor" size={24} className="ml-1" />}
              </div>
              {p.premium && !isPro && <span className="absolute top-4 right-4 bg-brand text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-md tracking-wider">PRO</span>}
              <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-textMain">
                {p.episodes.length} SESSIONS
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-lg text-textMain mb-1">{p.title}</h4>
                  <p className="text-xs text-textMuted font-medium uppercase tracking-wider">{p.coach} • {p.duration}</p>
                </div>
                <div className="w-10 h-10 bg-brandSoft text-brand rounded-full flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const PositionHubScreen = ({ onSelectCourse, onBack, isPro }) => {
  const [selectedPos, setSelectedPos] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">
      <AnimatePresence mode="wait">
        {!selectedPos ? (
          <motion.div key="selection" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="pt-8 mb-8 flex items-center gap-4">
              <button onClick={onBack} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
              <div>
                <p className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Your Role</p>
                <h2 className="text-3xl font-black text-textMain tracking-tight">Position Hub 🎯</h2>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { id: 'STRIKER', icon: Target, desc: 'Finishing & Shot Execution', color: 'bg-brandSoft text-brand', border: 'border-brand/20' },
                { id: 'MIDFIELDER', icon: Zap, desc: 'Vision & Playmaking', color: 'bg-accentBlue/10 text-accentBlue', border: 'border-accentBlue/20' },
                { id: 'GOALKEEPER', icon: Shield, desc: 'Reaction & Handling', color: 'bg-emerald-500/10 text-emerald-500', border: 'border-emerald-500/20' },
              ].map((pos) => (
                <div key={pos.id} onClick={() => setSelectedPos(pos.id)} className={`bg-surface border ${pos.border} p-6 rounded-[32px] shadow-sm flex items-center gap-5 cursor-pointer active:scale-95 transition-all hover:border-brand/50`}>
                  <div className={`w-20 h-20 ${pos.color} rounded-[24px] flex items-center justify-center`}>
                    <pos.icon size={36} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-textMain mb-1">{pos.id}</h3>
                    <p className="text-textMuted text-xs font-semibold">{pos.desc}</p>
                  </div>
                  <div className="w-10 h-10 border-2 border-surfaceAlt rounded-full flex items-center justify-center text-textMuted">
                    <ChevronRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="drills" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="pt-8 mb-8 flex items-center gap-4">
              <button onClick={() => setSelectedPos(null)} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
              <div>
                <h2 className="text-2xl font-black text-textMain leading-none">{selectedPos}</h2>
                <p className="text-brand text-[11px] font-bold tracking-widest uppercase mt-1">Specialized Tactical Program</p>
              </div>
            </div>

            <div className="space-y-4">
              {POSITION_DRILLS[selectedPos].map((drill, i) => (
                <div key={i} onClick={() => onSelectCourse(drill)} className="bg-surface border border-surfaceAlt p-4 rounded-[28px] shadow-sm flex items-center gap-5 active:scale-95 transition-transform cursor-pointer group hover:border-brand/50">
                  <div className="w-16 h-16 bg-surfaceAlt group-hover:bg-brandSoft rounded-[20px] flex items-center justify-center text-textMuted group-hover:text-brand transition-colors relative overflow-hidden">
                    {drill.premium && !isPro ? <Lock size={24} /> : <Play size={24} fill="currentColor" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-extrabold text-sm text-textMain leading-tight pr-4">{drill.title}</h4>
                    </div>
                    <p className="text-[11px] text-textMuted font-semibold mt-1 flex items-center gap-2">
                      <StarIcon size={12} className="text-accentOrange" fill="currentColor" /> {drill.rating}
                      <span className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full" /> {drill.duration}
                    </p>
                  </div>
                  {drill.premium && !isPro ? (
                    <span className="bg-brand text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">PRO</span>
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-textMuted"><ChevronRight size={16} /></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AICoachScreen = ({ onBack }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 flex flex-col min-h-screen">
      <div className="pt-8 px-6 pb-4 bg-surfaceAlt/80 backdrop-blur-md sticky top-0 z-20 border-b border-surface/50 flex flex-col">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={onBack} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white shadow-glow">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-textMain leading-none">BPRO AI Coach</h2>
              <p className="text-[10px] font-bold text-brand uppercase tracking-widest mt-0.5">Online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* System welcome message */}
        <div className="flex justify-start">
          <div className="bg-surface border border-surfaceAlt p-5 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
            <p className="text-sm font-semibold text-textMain leading-relaxed mb-4">Hello! I'm your BPRO AI Coach. Ask me anything about training regimens, recovery plans, or tactical advice.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-bold bg-surfaceAlt text-textMuted px-3 py-2 rounded-lg border border-surfaceAlt cursor-pointer hover:bg-brandSoft hover:text-brand transition-colors">How to hit a knuckleball?</span>
              <span className="text-[11px] font-bold bg-surfaceAlt text-textMuted px-3 py-2 rounded-lg border border-surfaceAlt cursor-pointer hover:bg-brandSoft hover:text-brand transition-colors">Create a 3-day split</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-surfaceAlt border-t border-surface/50 fixed bottom-24 left-0 right-0 max-w-[420px] mx-auto z-40">
        <div className="flex items-center bg-surface border border-surfaceAlt rounded-[24px] p-2 pr-2 shadow-sm focus-within:border-brand/50 transition-colors">
          <div className="w-10 h-10 bg-surfaceAlt rounded-full flex items-center justify-center text-textMuted mr-2 cursor-pointer hover:text-textMain"><Settings size={18} /></div>
          <input type="text" placeholder="Message BPRO AI..." className="flex-1 min-w-0 bg-transparent text-sm font-medium text-textMain placeholder-textMuted outline-none py-2" />
          <button className="w-10 h-10 bg-gradient-to-br from-brand to-accentOrange rounded-full items-center justify-center flex shadow-glow text-white shrink-0"><ArrowLeft className="rotate-180" size={18} /></button>
        </div>
      </div>
    </motion.div>
  );
};

const GamesScreen = ({ onBack }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">
      <div className="pt-8 mb-6 flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
        <div>
          <p className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Play & Compete</p>
          <h2 className="text-2xl font-black text-textMain tracking-tight leading-none">BPRO Games 🎮</h2>
        </div>
      </div>

      <div className="space-y-4 mb-8">
         <div className="bg-surface border border-surfaceAlt p-4 rounded-[28px] shadow-sm flex flex-col gap-4 cursor-pointer hover:border-brand/40 transition-colors">
            <div className="w-full aspect-video bg-surfaceAlt rounded-2xl relative overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
               <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=720&auto=format&fit=crop" alt="Video thumbnail" className="w-full h-full object-cover" />
               <div className="w-12 h-12 bg-brand/90 backdrop-blur-md rounded-full absolute z-20 flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Play size={20} className="ml-1" fill="currentColor"/></div>
               <div className="absolute bottom-3 left-3 z-20">
                  <span className="bg-brand text-white text-[9px] font-black tracking-widest px-2 py-1 rounded-md mb-1 inline-block">NEW VIDEO</span>
                  <p className="text-white text-sm font-black shadow-sm">Jack's Crossbar Challenge</p>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <h4 className="text-sm font-black text-textMain mb-1">Beat Jack's Record</h4>
                  <p className="text-[11px] text-textMuted font-medium">Upload your video hitting the crossbar.</p>
               </div>
               <div className="w-10 h-10 bg-brandSoft text-brand rounded-full flex items-center justify-center shrink-0">
                  <Trophy size={18} />
               </div>
            </div>
         </div>
         
         <div className="bg-surface border border-surfaceAlt p-4 rounded-[28px] shadow-sm flex items-center gap-4 cursor-pointer hover:border-brand/40 transition-colors">
            <div className="w-16 h-16 bg-accentBlue/10 text-accentBlue rounded-[20px] flex items-center justify-center shrink-0">
               <Zap size={28} />
            </div>
            <div className="flex-1">
               <h4 className="text-sm font-black text-textMain mb-1">Tactical IQ Quiz</h4>
               <p className="text-[11px] text-textMuted font-medium line-clamp-1 mb-2">Test your vision and split-second decisions.</p>
               <p className="text-[9px] text-accentBlue font-black uppercase tracking-widest">PLAY NOW</p>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

const EventsScreen = ({ onBack }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">
      <div className="pt-8 mb-6 flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
        <div>
          <p className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Community</p>
          <h2 className="text-2xl font-black text-textMain tracking-tight leading-none">BPRO Events 🎟️</h2>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-[32px] text-white shadow-glow mb-6 relative overflow-hidden cursor-pointer transform active:scale-95 transition-transform hover:shadow-lg">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
         <span className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase mb-4 inline-block">OFFLINE MATCH</span>
         <h3 className="text-2xl font-black leading-tight mb-2">Fun Football with<br/>Jack Brown 🇮🇩</h3>
         <p className="text-white/80 text-xs font-semibold mb-4 leading-relaxed">Join Jack and the BPRO coaches for an exclusive 7v7 match this weekend at GBK Arena.</p>
         <div className="flex items-center justify-between">
           <div className="flex -space-x-2">
             <div className="w-8 h-8 rounded-full bg-indigo-300 border-2 border-indigo-600 overflow-hidden"><img src="https://i.pravatar.cc/100?img=1" className="w-full h-full object-cover"/></div>
             <div className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-indigo-600 overflow-hidden"><img src="https://i.pravatar.cc/100?img=2" className="w-full h-full object-cover"/></div>
             <div className="w-8 h-8 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-[9px] font-black text-indigo-600">+12</div>
           </div>
           <span className="bg-white text-indigo-600 px-4 py-2 rounded-full text-[11px] font-black tracking-widest shadow-sm">RSVP NOW</span>
         </div>
      </div>

      <div className="bg-surface border border-surfaceAlt p-5 rounded-[32px] shadow-sm flex flex-col cursor-pointer hover:border-brand/40 transition-colors">
         <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center"><Globe size={20} /></div>
            <div>
               <span className="text-[10px] font-black tracking-widest text-textMuted uppercase">SCHOOL TOUR</span>
               <h4 className="text-sm font-black text-textMain uppercase">BPRO Goes To School</h4>
            </div>
         </div>
         <p className="text-xs font-medium text-textMuted mb-4">We are visiting 5 high schools in Jakarta this month holding free training clinics.</p>
         <button className="w-full bg-surfaceAlt text-textMain font-bold text-xs py-3 rounded-xl hover:bg-surface transition-colors border border-surfaceAlt">Nominate Your School</button>
      </div>

    </motion.div>
  );
};

const CustomPlanScreen = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('workouts');

  const WORKOUT_PLAN = [
    { day: 'Day 1', title: 'Fat Burn & Core', desc: 'High-intensity interval training combined with core stability.', duration: '45m', type: 'HIIT' },
    { day: 'Day 2', title: 'Lower Body Power', desc: 'Building leg strength while maintaining an elevated heart rate.', duration: '50m', type: 'Strength' },
    { day: 'Day 3', title: 'Active Recovery', desc: 'Light jogging, dynamic stretching, and mobility work.', duration: '30m', type: 'Recovery' },
    { day: 'Day 4', title: 'Upper Body & Cardio', desc: 'Push/pull supersets followed by a 15m steady-state run.', duration: '55m', type: 'Hybrid' },
  ];

  const NUTRITION_PLAN = [
    { meal: 'Breakfast', time: '08:00 AM', food: 'Oatmeal with whey protein, almonds, and berries', cals: '450 kcal', macros: 'P:35g | C:45g | F:12g' },
    { meal: 'Lunch', time: '01:00 PM', food: 'Grilled chicken breast, quinoa, and steamed broccoli', cals: '550 kcal', macros: 'P:45g | C:50g | F:10g' },
    { meal: 'Pre-Workout', time: '04:30 PM', food: 'Banana and a black coffee', cals: '120 kcal', macros: 'P:1g | C:28g | F:0g' },
    { meal: 'Dinner', time: '07:30 PM', food: 'Baked salmon, sweet potato, and asparagus', cals: '500 kcal', macros: 'P:40g | C:35g | F:18g' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">
      <div className="pt-8 mb-6 flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
        <div>
          <p className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Tailored for You</p>
          <h2 className="text-2xl font-black text-textMain tracking-tight leading-none">Cutting Program ✂️</h2>
        </div>
      </div>

      <div className="bg-gradient-to-br from-brand to-accentOrange p-6 rounded-[32px] text-white shadow-glow mb-8 pointer-events-none relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-black leading-tight">Current Phase</h3>
            <p className="text-white/80 text-xs font-bold">Week 2 of 8 • Fat Loss Focus</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
            <Flame size={24} className="text-white" />
          </div>
        </div>
        <div className="w-full bg-white/20 h-2 rounded-full mb-2 overflow-hidden">
          <div className="bg-white h-full w-[25%] rounded-full shadow-sm"></div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-right">25% Completed</p>
      </div>

      <div className="flex bg-surface p-1.5 border border-surfaceAlt rounded-[24px] mb-6">
        {[
          { id: 'workouts', label: 'Workouts', icon: Dumbbell },
          { id: 'nutrition', label: 'Nutrition', icon: Coffee }
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 py-3 rounded-[20px] font-bold text-xs flex items-center justify-center gap-2 transition-all ${activeTab === t.id ? 'bg-surfaceAlt text-textMain shadow-sm border border-surfaceAlt' : 'text-textMuted'}`}>
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'workouts' ? (
          <motion.div key="workouts" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
            {WORKOUT_PLAN.map((day, i) => (
              <div key={i} className="bg-surface border border-surfaceAlt p-5 rounded-[28px] shadow-sm flex gap-4 relative overflow-hidden cursor-pointer hover:border-brand/40 transition-colors group">
                <div className="w-14 h-14 bg-surfaceAlt group-hover:bg-brandSoft rounded-2xl flex flex-col items-center justify-center text-textMain group-hover:text-brand transition-colors shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Day</span>
                  <span className="text-lg font-black leading-none mt-1">{i + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-black text-textMain">{day.title}</h4>
                  </div>
                  <p className="text-xs text-textMuted line-clamp-2 leading-snug font-medium mb-3">{day.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="bg-brandSoft text-brand px-2 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase">{day.type}</span>
                    <span className="text-textMuted text-[10px] font-bold flex items-center gap-1"><Clock size={12} /> {day.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="nutrition" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
            <div className="flex justify-between items-center bg-surface border border-surfaceAlt p-4 rounded-[24px] mb-6 shadow-sm">
              <div className="text-center flex-1 border-r border-surfaceAlt">
                <p className="text-[10px] font-black text-textMuted uppercase tracking-widest mb-1">Target</p>
                <p className="text-lg font-black text-textMain">1,850 <span className="text-xs text-textMuted font-bold">kcal</span></p>
              </div>
              <div className="text-center flex-1">
                <p className="text-[10px] font-black text-textMuted uppercase tracking-widest mb-1">Split</p>
                <p className="text-xs font-extrabold text-brand mt-1">40% P / 40% C / 20% F</p>
              </div>
            </div>

            <h3 className="text-sm font-black text-textMain mb-4">Daily Menu</h3>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[27px] before:w-0.5 before:bg-surfaceAlt">
              {NUTRITION_PLAN.map((meal, i) => (
                <div key={i} className="relative flex gap-5">
                  <div className="w-14 h-14 bg-surface border border-surfaceAlt rounded-full flex flex-col items-center justify-center shrink-0 shadow-sm relative z-10 text-textMuted">
                    <Coffee size={20} />
                  </div>
                  <div className="bg-surface border border-surfaceAlt p-4 rounded-[28px] shadow-sm flex-1 pt-3 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-extrabold text-sm text-textMain">{meal.meal}</h4>
                      <span className="text-[10px] font-bold text-textMuted bg-surfaceAlt px-2 py-1 rounded-lg">{meal.time}</span>
                    </div>
                    <p className="text-xs font-semibold text-textMuted leading-relaxed mb-3">{meal.food}</p>
                    <div className="flex justify-between items-center border-t border-surfaceAlt/50 pt-3 mt-1">
                      <span className="text-brand font-black text-xs">{meal.cals}</span>
                      <span className="text-[10px] font-bold text-textMuted">{meal.macros}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TrainingPlanScreen = ({ onSelectCourse, onBack, isPro }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">
      <AnimatePresence mode="wait">
        {!selectedPlan ? (
          <motion.div key="selection" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="pt-8 mb-8 flex items-center gap-4">
              <button onClick={onBack} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
              <div>
                <p className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Tailored for you</p>
                <h2 className="text-3xl font-black text-textMain tracking-tight">Training Plan 📋</h2>
              </div>
            </div>

            <div className="space-y-5">
              {[
                { id: 'Shooting', icon: Target, desc: 'Improve striking power', color: 'bg-brandSoft text-brand', border: 'border-brand/20' },
                { id: 'Dribbling', icon: Activity, desc: 'Master ball manipulation', color: 'bg-accentOrange/10 text-accentOrange', border: 'border-accentOrange/20' },
                { id: 'Passing', icon: Globe, desc: 'Vision & distribution', color: 'bg-accentBlue/10 text-accentBlue', border: 'border-accentBlue/20' },
              ].map((plan) => (
                <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`bg-surface border ${plan.border} p-6 rounded-[32px] shadow-sm flex items-center gap-5 cursor-pointer active:scale-95 transition-all hover:border-brand/50`}>
                  <div className={`w-20 h-20 ${plan.color} rounded-[24px] flex items-center justify-center`}>
                    <plan.icon size={36} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-textMain mb-1">{plan.id}</h3>
                    <p className="text-textMuted text-xs font-semibold">{plan.desc}</p>
                  </div>
                  <div className="w-10 h-10 border-2 border-surfaceAlt rounded-full flex items-center justify-center text-textMuted">
                    <ChevronRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="drills" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <div className="pt-8 mb-8 flex items-center gap-4">
              <button onClick={() => setSelectedPlan(null)} className="w-12 h-12 bg-surface shadow-sm border border-surfaceAlt rounded-full flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors"><ArrowLeft size={20} /></button>
              <div>
                <h2 className="text-2xl font-black text-textMain leading-none">{selectedPlan}</h2>
                <p className="text-brand text-[11px] font-bold tracking-widest uppercase mt-1">Specific Skill Focus</p>
              </div>
            </div>

            <div className="space-y-4">
              {TRAINING_PLANS[selectedPlan].map((drill, i) => (
                <div key={i} onClick={() => onSelectCourse(drill)} className="bg-surface border border-surfaceAlt p-4 rounded-[28px] shadow-sm flex items-center gap-5 active:scale-95 transition-transform cursor-pointer group hover:border-brand/50">
                  <div className="w-16 h-16 bg-surfaceAlt group-hover:bg-brandSoft rounded-[20px] flex items-center justify-center text-textMuted group-hover:text-brand transition-colors relative overflow-hidden">
                    {drill.premium && !isPro ? <Lock size={24} /> : <Play size={24} fill="currentColor" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-extrabold text-sm text-textMain leading-tight pr-4">{drill.title}</h4>
                    </div>
                    <p className="text-[11px] text-textMuted font-semibold mt-1 flex items-center gap-2">
                      <StarIcon size={12} className="text-accentOrange" fill="currentColor" /> {drill.rating}
                      <span className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full" /> {drill.duration}
                    </p>
                  </div>
                  {drill.premium && !isPro ? (
                    <span className="bg-brand text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">PRO</span>
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-textMuted"><ChevronRight size={16} /></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProgramsScreen = ({ onSelectCourse, isPro }) => {
  const [activeTab, setActiveTab] = useState('Football');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">
      <div className="pt-8 mb-8 text-left">
        <p className="text-sm font-bold text-textMuted uppercase tracking-wider mb-1">Academy</p>
        <h2 className="text-3xl font-black text-textMain tracking-tight">Active Programs 🏋️‍♂️</h2>
      </div>

      <div className="flex bg-surface p-1.5 border border-surfaceAlt rounded-[24px] mb-8">
        {['Football', 'Gym'].map(c => (
          <button key={c} onClick={() => setActiveTab(c)} className={`flex-1 py-3 rounded-[20px] font-bold text-xs transition-all ${activeTab === c ? 'bg-surfaceAlt text-textMain shadow-sm border border-surfaceAlt' : 'text-textMuted'}`}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {CATEGORIES[activeTab].map((p, i) => (
          <div key={i} onClick={() => onSelectCourse(p)} className="group bg-surface border border-surfaceAlt p-4 rounded-[32px] shadow-sm flex items-center gap-5 active:scale-[0.98] transition-transform cursor-pointer hover:shadow-md hover:border-brand/30">
            <div className="w-20 h-20 bg-brandSoft rounded-[24px] flex items-center justify-center text-brand">
              {p.premium && !isPro ? <Lock size={28} /> : (activeTab === 'Football' ? <Home size={32} /> : <Dumbbell size={32} />)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-extrabold text-base text-textMain leading-tight">{p.title}</h3>
                {p.premium && !isPro && <span className="bg-brand text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm">PRO</span>}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-textMuted font-semibold mb-2">
                <span className="bg-surfaceAlt px-2 py-1 rounded-lg text-textMain border border-surfaceAlt">{p.episodes.length} Episodes</span>
              </div>
              <p className="text-[11px] text-textMuted line-clamp-1">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const CourseDetailScreen = ({ course, onBack }) => {
  const episodes = course.episodes || [{ id: 1, title: course.title, time: course.duration }];
  const [activeEp, setActiveEp] = useState(episodes[0]);

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-[80] bg-surfaceAlt flex flex-col no-scrollbar overflow-y-auto">
      <div className="px-6 py-4 flex items-center justify-between sticky top-0 bg-surfaceAlt/80 backdrop-blur-xl z-20 border-b border-surface/50">
        <button onClick={onBack} className="w-12 h-12 bg-surface rounded-full shadow-sm flex items-center justify-center text-textMain hover:bg-surfaceAlt transition-colors border border-surfaceAlt">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <p className="text-[10px] text-brand font-black uppercase tracking-widest">{course.coach || 'BPRO Coach'}</p>
          <h2 className="text-sm font-extrabold text-textMain truncate max-w-[200px]">{course.title}</h2>
        </div>
        <div className="w-12 h-12 bg-surface rounded-full shadow-sm flex items-center justify-center text-textMain border border-surfaceAlt"><StarIcon size={18} /></div>
      </div>

      <div className="p-6">
        {/* Fake Video Player area */}
        <div className="w-full aspect-video bg-surface rounded-[32px] overflow-hidden relative mb-8 flex items-center justify-center cursor-pointer border border-surfaceAlt">
          <div className="absolute inset-0 bg-gradient-to-tr from-brandSoft to-surface opacity-50" />
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-20 h-20 bg-brand shadow-glow rounded-full flex items-center justify-center text-white">
            <Play fill="currentColor" size={32} className="ml-1" />
          </motion.div>
          <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-surfaceAlt">
            <h3 className="text-textMain font-black text-sm">{activeEp.title}</h3>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-textMain">Sessions</h3>
          <span className="bg-brandSoft text-brand px-3 py-1.5 rounded-full text-[11px] font-bold">{episodes.length} Episodes</span>
        </div>

        <div className="space-y-4 mb-10">
          {episodes.map((ep, i) => (
            <div key={ep.id} onClick={() => setActiveEp(ep)} className={`p-4 rounded-[28px] flex items-center gap-5 transition-all border-2 cursor-pointer ${activeEp.id === ep.id ? 'bg-surface border-brand shadow-soft' : 'bg-surface border-transparent shadow-sm hover:border-surfaceAlt'}`}>
              <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center ${activeEp.id === ep.id ? 'bg-brand text-white shadow-glow' : 'bg-surfaceAlt text-textMuted'}`}>
                {activeEp.id === ep.id ? <Play size={20} fill="currentColor" /> : <span className="font-black text-lg">{i + 1}</span>}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-extrabold mb-1 ${activeEp.id === ep.id ? 'text-brand' : 'text-textMain'}`}>{ep.title}</h4>
                <p className="text-xs text-textMuted font-medium flex items-center gap-1"><Clock size={12} /> {ep.time || '15:00'} min</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- PREMIUM PAYWALL SCREEN ---
const SubscriptionScreen = ({ onClose, onUpgrade }) => {
  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-[100] bg-surface flex flex-col no-scrollbar overflow-y-auto">

      {/* Sleek Premium Dark Header */}
      <div className="relative h-[340px] w-full bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand/40 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accentOrange/30 rounded-full blur-[80px]"></div>

        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-40"></div>

        {/* Close Button top-right */}
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white z-20 hover:bg-white/20 transition-colors">
          <X size={20} />
        </button>

        <div className="relative z-10 text-center px-6 mt-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-brand to-accentOrange rounded-[24px] shadow-glow flex items-center justify-center text-white mb-6 transform rotate-3">
            <Flame size={36} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">BPRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accentOrange">PRO</span></h1>
          <p className="text-gray-300 text-sm font-medium max-w-[260px] mx-auto">Unlock your true potential with full access to our premium training plans.</p>
        </div>

        {/* Curved bottom edge bridging to content */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-surface rounded-t-[32px]"></div>
      </div>

      <div className="flex-1 px-6 pt-4 pb-32 bg-surface">
        {/* Elevated Features List */}
        <div className="space-y-3 mb-10">
          {[
            "Access 200+ Premium Drills",
            "1-on-1 Tactical Analysis",
            "Position Specific Masterclass",
            "Offline 4K Video Downloads"
          ].map((feat, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-surfaceAlt border border-surface p-4 rounded-[20px]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-accentOrange flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-sm font-extrabold text-textMain">{feat}</span>
            </div>
          ))}
        </div>

        {/* Interactive Pricing Cards */}
        <div className="space-y-4 mb-6">
          {/* Annual Plan (Highlighted) */}
          <div onClick={onUpgrade} className="relative bg-surfaceAlt border-2 border-brand rounded-[28px] p-5 shadow-glow cursor-pointer transform transition-transform active:scale-95 overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-[16px] z-10">Save 40%</div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent"></div>

            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-textMain text-sm font-black mb-1">Annual PRO</h3>
                <p className="text-[11px] font-semibold text-textMuted">Rp 1.188.000 / year</p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-sm font-bold text-textMain">Rp</span>
                  <span className="text-2xl font-black text-brand tracking-tighter">99.000</span>
                </div>
                <span className="text-[10px] font-bold text-textMuted uppercase">/ Month</span>
              </div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div onClick={onUpgrade} className="bg-surface border border-surfaceAlt rounded-[28px] p-5 shadow-sm cursor-pointer transform transition-transform active:scale-95 flex justify-between items-center hover:border-brand/30">
            <div>
              <h3 className="text-textMain text-sm font-black mb-1">Monthly PRO</h3>
              <p className="text-[11px] font-semibold text-textMuted">Flexible billing</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-sm font-bold text-textMain">Rp</span>
                <span className="text-xl font-black text-textMain tracking-tighter">149.000</span>
              </div>
              <span className="text-[10px] font-bold text-textMuted uppercase">/ Month</span>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <button onClick={onUpgrade} className="w-full py-5 rounded-[24px] bg-gradient-to-r from-brand to-accentOrange text-white font-black text-base shadow-glow flex justify-center items-center gap-2 transform transition-all active:scale-[0.98] hover:scale-[1.02]">
            <Lock size={18} fill="currentColor" /> UNLOCK BPRO PRO
          </button>
        </div>

        <p className="text-center text-[10px] font-semibold text-textMuted mt-6 px-4">
          Subscriptions auto-renew. Cancel anytime in App Settings. Terms of Service & Privacy Policy apply.
        </p>
      </div>
    </motion.div>
  );
}

// Profile Header Fragment
const ProfileScreen = ({ toggleTheme, isDark, isPro, triggerPaywall }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32 px-6">
      <div className="pt-8 flex justify-end">
        <button onClick={toggleTheme} className="w-12 h-12 bg-surface border border-surfaceAlt rounded-full flex items-center justify-center text-textMuted hover:text-brand transition-colors shadow-sm">
          {isDark ? <Sun size={20} className="text-accentOrange" /> : <Moon size={20} className="text-accentBlue" />}
        </button>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-4">
          <div className={`w-28 h-28 border-4 ${isPro ? 'border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.4)]' : 'border-surface shadow-soft'} rounded-full overflow-hidden transition-all duration-500`}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Player Profile" className="w-full h-full object-cover" />
          </div>
          {isPro && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-0 text-slate-900 right-0 bg-gradient-to-r from-amber-300 to-amber-500 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full border-2 border-surface shadow-md">
              PRO
            </motion.div>
          )}
        </div>
        <h1 className="text-3xl font-black text-textMain tracking-tight">John Doe</h1>
        <p className="text-textMuted font-semibold mt-1">johndoe@bpro.com</p>
      </div>

      <div className="flex gap-4 mb-10">
        <div className="flex-1 bg-surface p-5 rounded-[28px] shadow-sm border border-surfaceAlt flex flex-col items-center">
          <h4 className="text-2xl font-black text-textMain">34</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-textMuted mt-1">Sessions</p>
        </div>
        <div className="flex-1 bg-surface p-5 rounded-[28px] shadow-sm border border-surfaceAlt flex flex-col items-center">
          <h4 className="text-2xl font-black text-brand">12h</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-textMuted mt-1">Trained</p>
        </div>
      </div>

      <h3 className="text-xs font-black text-textMuted uppercase tracking-widest mb-4 pl-2">Account Options</h3>
      <div className="bg-surface rounded-[32px] border border-surfaceAlt shadow-card mb-8 overflow-hidden">
        {!isPro && (
          <div onClick={triggerPaywall} className="flex items-center justify-between p-4 cursor-pointer hover:bg-surfaceAlt transition-colors border-b border-surfaceAlt">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brandSoft rounded-2xl flex items-center justify-center text-brand">
                <Trophy size={18} />
              </div>
              <h4 className="text-sm font-bold text-textMain">Upgrade to PRO</h4>
            </div>
            <ChevronRight size={16} className="text-brand mr-2" />
          </div>
        )}
        {[
          { label: 'Downloaded Videos', icon: DownloadCloud, color: 'text-accentBlue' },
          { label: 'Push Notifications', icon: Bell, color: 'text-emerald-500' },
          { label: 'App Settings', icon: Settings, color: 'text-textMuted' },
        ].map((item, i) => (
          <div key={i} className={`flex items-center justify-between p-4 cursor-pointer hover:bg-surfaceAlt transition-colors ${i !== 2 ? 'border-b border-surfaceAlt' : ''}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 bg-surfaceAlt rounded-2xl flex items-center justify-center ${item.color}`}>
                <item.icon size={18} />
              </div>
              <h4 className="text-sm font-bold text-textMain">{item.label}</h4>
            </div>
            <ChevronRight size={16} className="text-textMuted mr-2" />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-brand font-black text-sm px-6 py-4 rounded-full hover:bg-brandSoft transition-colors">
          <LogOut size={18} /> Sign Out
        </button>
      </div>

    </motion.div>
  );
};


// --- MAIN APP SHELL ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // App Business State
  const [isUserPro, setIsUserPro] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Security Interceptor logic
  const handleSelectCourse = (course) => {
    if (course.premium && !isUserPro) {
      setShowPaywall(true);
    } else {
      setSelectedCourse(course);
    }
  };

  useEffect(() => {
    isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  }, [isDark]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  return (
    <div className="bg-surfaceAlt min-h-screen font-inter antialiased flex justify-center transition-colors duration-500">
      <div className="w-full max-w-[420px] bg-surfaceAlt min-h-screen relative shadow-2xl flex flex-col overflow-x-hidden">

        {/* Modals layered on top */}
        <AnimatePresence>
          {showPaywall && (
            <SubscriptionScreen
              onClose={() => setShowPaywall(false)}
              onUpgrade={() => { setIsUserPro(true); setShowPaywall(false); }}
            />
          )}
          {selectedCourse && (
            <CourseDetailScreen
              course={selectedCourse}
              onBack={() => setSelectedCourse(null)}
            />
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto no-scrollbar">
          {activeTab === 'home' && <HomeScreen onSelectCourse={handleSelectCourse} onNavigate={(id) => {
            if (id === 'football' || id === 'gym') setActiveTab('programs');
            else setActiveTab(id);
          }} isPro={isUserPro} triggerPaywall={() => setShowPaywall(true)} />}
          {activeTab === 'programs' && <ProgramsScreen onSelectCourse={handleSelectCourse} isPro={isUserPro} />}
          {activeTab === 'positions' && <PositionHubScreen onSelectCourse={handleSelectCourse} onBack={() => setActiveTab('home')} isPro={isUserPro} />}
          {activeTab === 'ai_coach' && <AICoachScreen onBack={() => setActiveTab('home')} />}
          {activeTab === 'games' && <GamesScreen onBack={() => setActiveTab('home')} />}
          {activeTab === 'events' && <EventsScreen onBack={() => setActiveTab('home')} />}
          {activeTab === 'custom_plan' && <CustomPlanScreen onBack={() => setActiveTab('home')} />}
          {activeTab === 'training_plan' && <TrainingPlanScreen onSelectCourse={handleSelectCourse} onBack={() => setActiveTab('home')} isPro={isUserPro} />}
          {activeTab === 'profile' && <ProfileScreen isDark={isDark} toggleTheme={() => setIsDark(!isDark)} isPro={isUserPro} triggerPaywall={() => setShowPaywall(true)} />}
        </main>

        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-surface/80 backdrop-blur-xl rounded-[36px] p-2 flex justify-between items-center shadow-soft border border-surfaceAlt z-[60]">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'programs', icon: PlayCircle, label: 'Academy' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map((tab) => {
            const isActive = activeTab === tab.id || (activeTab === 'positions' && tab.id === 'home');
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative flex flex-col items-center justify-center w-full py-3 rounded-[30px] transition-all duration-300 ${isActive ? 'text-brand' : 'text-textMuted hover:text-textMain'}`}>
                {isActive && <motion.div layoutId="navBubble" className="absolute inset-0 bg-brandSoft rounded-[28px] z-0" />}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && <span className="text-[10px] font-black mt-0.5">{tab.label}</span>}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
