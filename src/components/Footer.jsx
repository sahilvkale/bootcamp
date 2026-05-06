import { motion } from 'framer-motion';
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

import Logo from '../assets/Workshop_Images/IOTiveSolutionsLLP.png';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
             <img src={Logo} height={45}  width={90} alt="Description of image" />;
            <p className="text-slate-400 text-sm leading-relaxed">
              Turning Ideas into Innovation. We specialize in IoT, PCB design, and custom electronics solutions for students, startups, and makers.
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
                <span>+91 8055499119</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span>✉️</span>
                <span>iotivetech@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Connect With Us</h4>
            <div className="flex gap-4">
              
              {[
                {
                  icon: <FaInstagram />,
                  link: "https://www.instagram.com/iotive.official",
                },
                {
                  icon: <FaLinkedinIn />,
                  link: "https://www.linkedin.com",
                },
                {
                  icon: <FaEnvelope />,
                  link: "iotivetech@gmail.com",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-500 transition-all duration-300 text-lg"
                >
                  {item.icon}
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