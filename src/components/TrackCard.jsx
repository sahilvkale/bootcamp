import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Award } from 'lucide-react';

export default function TrackCard({ title, price, subtitle, syllabus, kit, featured = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border rounded-2xl p-6 shadow-xl transition-all ${
        featured 
          ? 'border-blue-500/50 shadow-blue-500/20 shadow-2xl' 
          : 'border-slate-700 hover:border-blue-500/30'
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 left-6">
          <div className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            <Award size={14} />
            <span>Best Seller</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-blue-400 font-medium mt-1">{subtitle}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 px-4 py-1.5 rounded-full font-bold border border-blue-400/30">
          {price}
        </div>
      </div>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mt-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex justify-center items-center gap-2"
      >
        {isOpen ? (
          <>Hide Details <ChevronUp size={18} /></>
        ) : (
          <>View Syllabus & Kit <ChevronDown size={18} /></>
        )}
      </motion.button>

      {/* Expandable Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-6 border-t border-slate-700 pt-6 overflow-hidden"
          >
            <div>
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                📅 3-Day Syllabus
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                {syllabus.map((day, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-blue-400 font-bold">Day {index + 1}:</span>
                    <span>{day}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                🛠️ Take-Home DIY Kit
              </h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                {kit.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}