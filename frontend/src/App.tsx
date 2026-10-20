import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bus, PhoneCall, Shield, Bell, Settings, Search, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('emergency');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative h-screen w-full bg-slate-100 overflow-hidden font-sans" dir="rtl">
      {/* 1. THE STAGE: Full Screen Map Placeholder */}
      <div className="absolute inset-0 z-0 bg-blue-50">
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#0073E6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Mock Map Marker */}
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
        >
          <div className="bg-white px-3 py-1 rounded-full shadow-lg text-[10px] font-bold mb-2 transform -translate-y-1 transition-all group-hover:-translate-y-2">موقعك الحالي</div>
          <div className="w-6 h-6 bg-tunis-blue border-4 border-white rounded-full shadow-xl" />
        </motion.div>
      </div>

      {/* 2. FLOATING GLASS SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute top-6 right-6 bottom-6 w-80 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[32px] z-20 flex flex-col p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-12 bg-tunis-blue rounded-arch flex items-center justify-center text-white text-xl">
                <span>✚</span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-tunis-deep">نسيج</h1>
                <p className="text-[10px] text-tunis-blue uppercase tracking-widest font-bold">Naseej Tunisia</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-black/5 p-1 rounded-2xl mb-6">
              {['emergency', 'bus', 'alerts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-white shadow-sm text-tunis-deep' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab === 'emergency' ? 'إسعاف' : tab === 'bus' ? 'حافلة' : 'تنبيهات'}
                </button>
              ))}
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {activeTab === 'emergency' && (
                <>
                  <div className="bg-white/80 border border-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-blue-50 rounded-arch flex items-center justify-center text-tunis-blue text-xl group-hover:bg-tunis-blue group-hover:text-white transition-colors">🚑</div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-tunis-deep">إسعاف الهناء</h3>
                        <p className="text-[11px] text-gray-500">2.4 كم • متاح الآن</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/80 border border-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-amber-50 rounded-arch flex items-center justify-center text-tunis-gold text-xl group-hover:bg-tunis-gold group-hover:text-white transition-colors">👤</div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-tunis-deep">سامي بن علي</h3>
                        <p className="text-[11px] text-gray-500">متطوع إسعافات أولية</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Safety Footer */}
            <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-[10px] text-red-900 leading-relaxed font-medium">
                في حالة الطوارئ القصوى، اتصل بالأرقام الرسمية أولاً:
                <span className="block font-bold mt-1">الحماية المدنية 198 / الإسعاف 190</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. DISCREET FLOATING SOS BADGE */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-10 left-10 w-16 h-16 bg-tunis-red text-white rounded-3xl shadow-[0_8px_30px_rgb(231,0,19,0.4)] z-30 flex items-center justify-center text-3xl overflow-hidden"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-white/20"
        />
        🆘
      </motion.button>

      {/* Sidebar Toggle for Small Screens */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="absolute top-10 left-10 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center z-30"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Map Tools */}
      <div className="absolute bottom-10 right-1/2 translate-x-1/2 flex gap-4 z-20">
        <div className="bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/40 flex items-center gap-3 cursor-pointer hover:bg-white transition-all">
          <span className="text-lg">🌙</span>
          <span className="text-xs font-bold text-tunis-deep">الوضع الليلي</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
