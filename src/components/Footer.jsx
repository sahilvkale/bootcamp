import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-white tracking-wider mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">IOT</span>
              <span>ive</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering the next generation of innovators in Pune & beyond with hands-on tech education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Tracks', 'Gallery', 'Register'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <span>📍</span>
                <span>Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>📞</span>
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>✉️</span>
                <span>info@iotive.tech</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {['🐙', '🔗', '✉️'].map((icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-colors text-xl"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} IOTive Solutions LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}