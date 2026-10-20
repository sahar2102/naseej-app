import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bus, PhoneCall, Shield, Bell, Settings, Search, Menu, X, AlertTriangle, Moon, Sun } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'emergency' | 'bus' | 'alerts'>('emergency');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  return (
    <div className={`relative h-screen w-full overflow-hidden font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'}`} dir="rtl">
      {/* 1. THE STAGE: Full Screen Map Placeholder */}
      <div className={`absolute inset-0 z-0 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-blue-50'}`}>
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: `radial-gradient(${isDarkMode ? '#38bdf8' : '#0073E6'} 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
        {/* Mock Map Marker */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          <div className="bg-white text-slate-900 px-3 py-1 rounded-full shadow-lg text-[10px] font-bold mb-2 transform -translate-y-1 transition-all group-hover:-translate-y-2 whitespace-nowrap">
            موقعك الحالي (تونس)
          </div>
          <div className="w-6 h-6 bg-tunis-blue border-4 border-white rounded-full shadow-xl mx-auto" />
        </motion.div>

        {/* Mock bus marker */}
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          <div className="bg-amber-500 text-white px-2 py-0.5 rounded-full shadow-md text-[9px] font-bold mb-1">
            حافلة 28B
          </div>
          <div className="w-5 h-5 bg-amber-400 border-2 border-white rounded-full shadow-md mx-auto flex items-center justify-center text-[10px]">
            🚌
          </div>
        </motion.div>
      </div>

      {/* 2. FLOATING GLASS SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute top-6 right-6 bottom-6 w-84 max-w-[calc(100vw-48px)] backdrop-blur-xl border shadow-2xl rounded-[32px] z-20 flex flex-col p-6 overflow-hidden transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-slate-900/80 border-slate-700/50 text-slate-100' 
                : 'bg-white/80 border-white/60 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-12 bg-tunis-blue rounded-arch flex items-center justify-center text-white text-xl shadow-md">
                <span>✚</span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-tunis-deep dark:text-sky-400">نسيج</h1>
                <p className="text-[10px] text-tunis-blue uppercase tracking-widest font-bold">Naseej Tunisia</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className={`flex p-1 rounded-2xl mb-4 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200/60'}`}>
              {(['emergency', 'bus', 'alerts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    activeTab === tab 
                      ? (isDarkMode ? 'bg-slate-700 text-sky-400 shadow' : 'bg-white text-tunis-deep shadow-sm') 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab === 'emergency' ? 'إسعاف' : tab === 'bus' ? 'حافلة' : 'تنبيهات'}
                </button>
              ))}
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {activeTab === 'emergency' && (
                <>
                  <div className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all cursor-pointer group ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-blue-50 dark:bg-sky-950/50 rounded-arch flex items-center justify-center text-tunis-blue text-xl group-hover:bg-tunis-blue group-hover:text-white transition-colors">
                        🚑
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-tunis-deep dark:text-sky-300">إسعاف الهناء</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">2.4 كم • متاح الآن</p>
                      </div>
                      <a href="tel:190" className="p-2 rounded-xl bg-blue-50 dark:bg-slate-700 text-tunis-blue dark:text-sky-400 hover:bg-tunis-blue hover:text-white transition-colors">
                        <PhoneCall size={16} />
                      </a>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all cursor-pointer group ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-amber-50 dark:bg-amber-950/50 rounded-arch flex items-center justify-center text-tunis-gold text-xl group-hover:bg-tunis-gold group-hover:text-white transition-colors">
                        👤
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-tunis-deep dark:text-amber-300">سامي بن علي</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">متطوع إسعافات أولية • 800 م</p>
                      </div>
                      <button className="p-2 rounded-xl bg-amber-50 dark:bg-slate-700 text-tunis-gold hover:bg-tunis-gold hover:text-white transition-colors">
                        <PhoneCall size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'bus' && (
                <>
                  <div className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-arch flex items-center justify-center text-emerald-600 text-xl">
                        🚌
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-tunis-deep dark:text-emerald-300">خط 28B - العاصمة / أريانة</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">الوقت المتوقع: 6 دقائق</p>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-arch flex items-center justify-center text-emerald-600 text-xl">
                        🚌
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-tunis-deep dark:text-emerald-300">خط 35 - قرطاج / المنار</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">الوقت المتوقع: 14 دقيقة</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'alerts' && (
                <>
                  <div className={`p-4 rounded-2xl border shadow-sm ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/90 border-slate-100'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-xl">
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold">ازدحام مروري بطريق المرناقية</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">يرجى اتباع الطرق البديلة - منذ 12 دقيقة</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Safety Footer */}
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/50 rounded-2xl border border-red-200 dark:border-red-900/50">
              <p className="text-[10px] text-red-900 dark:text-red-300 leading-relaxed font-medium">
                في حالة الطوارئ القصوى، اتصل بالأرقام الرسمية أولاً:
                <span className="block font-bold mt-1 text-red-600 dark:text-red-400">الحماية المدنية 198 / الإسعاف 190</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. DISCREET FLOATING SOS BUTTON */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSosModalOpen(true)}
        className="absolute bottom-10 left-10 w-16 h-16 bg-tunis-red text-white rounded-3xl shadow-[0_8px_30px_rgb(231,0,19,0.4)] z-30 flex items-center justify-center text-3xl overflow-hidden focus:outline-none"
        aria-label="طلب استغاثة طارئ"
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
        className={`absolute top-6 left-6 w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center z-30 transition-colors ${
          isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'
        }`}
        aria-label="القائمة"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Map Tools / Dark Mode Toggle */}
      <div className="absolute bottom-10 right-1/2 translate-x-1/2 flex gap-4 z-20">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border flex items-center gap-2 cursor-pointer transition-all ${
            isDarkMode 
              ? 'bg-slate-800/80 border-slate-700 text-sky-400 hover:bg-slate-800' 
              : 'bg-white/80 border-white/60 text-tunis-deep hover:bg-white'
          }`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          <span className="text-xs font-bold">{isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
        </button>
      </div>

      {/* SOS Confirmation Modal */}
      <AnimatePresence>
        {sosModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl shadow-2xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-950/80 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🚨
                </div>
                <h2 className="text-xl font-extrabold mb-2 text-tunis-red">تأكيد طلب النجدة</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  سيتم إرسال موقعك الحالي إلى أقرب سيارة إسعاف ومتطوعي الهلال الأحمر.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <a 
                    href="tel:190"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-tunis-red text-white font-bold rounded-2xl shadow hover:bg-red-700 transition-colors text-sm"
                  >
                    <PhoneCall size={16} />
                    اتصال 190
                  </a>
                  <a 
                    href="tel:198"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-tunis-deep text-white font-bold rounded-2xl shadow hover:bg-blue-900 transition-colors text-sm"
                  >
                    <PhoneCall size={16} />
                    حماية 198
                  </a>
                </div>

                <button 
                  onClick={() => setSosModalOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 font-bold text-xs hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
