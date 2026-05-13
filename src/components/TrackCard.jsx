import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrackCard({ track }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Set colors dynamically based on the flyer's theme (Blue for Robotics, Green for IoT)
  const isBlue = track.theme === 'blue';
  const borderColor = isBlue ? 'border-blue-600' : 'border-emerald-500';
  const textColor = isBlue ? 'text-blue-800' : 'text-emerald-800';
  const badgeBg = isBlue ? 'bg-blue-600' : 'bg-emerald-500';
  const lightBg = isBlue ? 'bg-blue-50' : 'bg-emerald-50';

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 ${borderColor} flex flex-col h-full`}>
      
      {/* Top Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4 mb-2">
          {/* Icons matching the flyer */}
          <div className="text-4xl">
            {isBlue ? '🤖' : '🌐'}
          </div>
          <div>
            <h3 className={`text-2xl font-black ${textColor} leading-tight`}>
              {track.title}
            </h3>
            <p className="text-slate-500 text-sm font-bold tracking-widest mt-1 uppercase">
              {track.subtitle}
            </p>
          </div>
        </div>
        
        <div className={`text-4xl font-extrabold ${textColor} mt-4 mb-4`}>
          {track.price}
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed min-h-[60px]">
          {track.description}
        </p>
      </div>

      {/* Batch Schedule Section (Matches the flyer's pill design) */}
      <div className="px-6 pb-6">
        <div className="relative border-t border-slate-200 pt-6 mt-2">
          {/* BATCH SCHEDULE Badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className={`${badgeBg} text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
              Batch Schedule
            </span>
          </div>

          <div className="space-y-3 mt-2">
            {track.batches.map((batch, index) => (
              <div key={index} className={`flex flex-col sm:flex-row justify-between p-3 rounded-lg ${lightBg} border border-slate-100`}>
                <div className="flex flex-col">
                  <span className={`font-bold text-sm ${textColor}`}>{batch.name}</span>
                  <span className="text-slate-600 text-xs mt-0.5 flex items-center gap-1">
                    📅 {batch.date}
                  </span>
                </div>
                <div className="text-slate-600 text-xs font-semibold flex items-center gap-1 mt-2 sm:mt-0">
                  🕒 {batch.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow"></div> {/* Pushes the button to the bottom */}

      {/* Syllabus & Kit Dropdown Button */}
      <div className="px-6 pb-6 pt-2">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-colors border-2 ${isBlue ? 'border-blue-600 text-blue-700 hover:bg-blue-50' : 'border-emerald-500 text-emerald-700 hover:bg-emerald-50'}`}
        >
          {isExpanded ? 'Hide Syllabus & Kit ▴' : 'View Syllabus & Kit ▾'}
        </button>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <div className="mb-4">
                <h4 className={`font-bold ${textColor} flex items-center gap-2 mb-2`}>
                  📚 3-Day Syllabus
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  {track.syllabus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-slate-400">Day {idx + 1}:</span> 
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`font-bold ${textColor} flex items-center gap-2 mb-2`}>
                  🛠️ Take-Home DIY Kit
                </h4>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
                  {track.kit.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}