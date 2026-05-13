import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import TrackCard from './components/TrackCard';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

// Your bootcamp curriculum data
// Your updated bootcamp curriculum data (2 Tracks)
// Your updated bootcamp curriculum data matching the flyer
const trackData = [
  {
    id: "robotics",
    title: "Robotics Workshop",
    subtitle: "BUILD & CODE • 12 HOURS",
    price: "₹1,599",
    theme: "blue", // Used for the border and accent colors
    description: "Bring machines to life! Understand motor mechanics, assemble a robotic chassis, and write logic to make your robot navigate and react.",
    batches: [
      { name: "Batch 1 (Weekday Batch)", date: "25th May to 27th May", time: "9:00 AM to 12:00 PM" },
      { name: "Batch 2 (Weekend Batch)", date: "29th May to 31st May", time: "9:00 AM to 12:00 PM" }
    ],
    syllabus: [
      "Mechanics & Power. Assembling chassis, DC BO motors, and L298N driver.",
      "Brains & Movement. Coding logic for directional control via Arduino.",
      "Autonomous Navigation. Building an Obstacle-Avoiding Robot."
    ],
    kit: [
      "2WD Acrylic Robot Chassis Base",
      "DC BO Motors & Wheels",
      "L298N Motor Driver Module",
      "Arduino Uno R3 & Ultrasonic Sensor",
      "Battery Holder & Assorted Wires"
    ]
  },
  {
    id: "iot",
    title: "Getting Started with IoT",
    subtitle: "ARDUINO ADVANCED • 12 HOURS",
    price: "₹1,999", 
    theme: "green", // Used for the border and accent colors
    description: "Connect your creations to the internet! Master advanced microcontrollers and learn how real-world IoT networks send and receive data globally.",
    batches: [
      { name: "Batch 1 (Weekday Batch)", date: "25th May to 27th May", time: "2:00 PM to 5:00 PM" },
      { name: "Batch 2 (Weekend Batch)", date: "29th May to 31st May", time: "2:00 PM to 5:00 PM" }
    ],
    syllabus: [
      "Hello Internet! NodeMCU ESP8266 setup and connecting to local Wi-Fi.",
      "Data in the Cloud. Pushing DHT11 sensor data to a live cloud dashboard.",
      "Smart Home Automation. Controlling a relay module from a smartphone."
    ],
    kit: [
      "NodeMCU ESP8266 Board",
      "DHT11 Temp/Humidity Sensor",
      "2-Channel 5V Relay Module",
      "LDR (Light Sensor)",
      "Breadboard, LEDs & Wires"
    ]
  }
];

function App() {
  // --- TYPING EFFECT LOGIC ---
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["Innovation!", "Reality!", "Prototypes!", "Products!"];

  useEffect(() => {
    const currentWord = words[wordIndex];
    // Speed: Typing is slower, deleting is faster
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        // Pause at the end of the word before deleting
        setTimeout(() => setIsDeleting(true), 1500); 
      } else if (isDeleting && displayText === '') {
        // Move to the next word once fully deleted
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        // Type or delete the next character
        setDisplayText(
          currentWord.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  // ---------------------------
  // --- BULLETPROOF SMOOTH SCROLLING ---
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          // Calculate navbar height offset if needed, or just scroll smoothly
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);


  return (
    <div id="home" className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero Section - Fixed for desktop */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-arctic-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-frost-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8 px-4 py-1.5 bg-arctic-100 rounded-full border border-arctic-200"
          >
            <span className="text-sm font-semibold text-arctic-700">🎯 Summer Tech Bootcamp 2026</span>
          </motion.div>
          
          {/* Main Heading - YOUR CUSTOM TYPING COMPONENT */}
          <div className="mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-3"
            >
              {/* LEFT PART - FIXED WIDTH */}
              <div className="w-full md:w-auto mb-2 md:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
                  Turning Ideas into
                </h1>
              </div>
              
              {/* RIGHT PART - ANIMATED TEXT WITH FIXED CONTAINER */}
              <div className="min-w-[280px] md:min-w-[320px] lg:min-w-[380px] h-[4.5rem] md:h-[5.5rem] lg:h-[6.5rem] flex items-center justify-center md:justify-start">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold relative tracking-tight">
                  {displayText}
                  {/* Blinking cursor updated to Arctic Theme */}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute -right-3 top-1 md:top-2 h-[80%] w-[4px] bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                  />
                </span>
              </div>
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed px-4"
          >
            AISSMS IOIT X IOTive Summer Tech Bootcamp 2026. A 100% hands-on experience for 7th to 9th graders to build, code, and create.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#register"
              className="inline-block bg-gradient-to-br from-blue-600 to-cyan-600/70 hover:from-arctic-500 hover:to-arctic-400 text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all shadow-xl shadow-arctic-500/30 w-full sm:w-auto text-center"
            >
              Secure Your Spot →
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#tracks"
              className="inline-block bg-white border-1 border-blue-600 hover:border-blue-300 hover:bg-slate-50 text-slate-700 text-base sm:text-lg font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all w-full sm:w-auto text-center shadow-sm"
            >
              Explore Tracks
            </motion.a>
          </motion.div>
        </div>


      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Students Trained" },
              { number: "10+", label: "Workshops" },
              { number: "10+", label: "Expert Mentors" },
              { number: "100%", label: "Hands-on Learning" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-600 bg-clip-text bg-gradient-to-r from-arctic-500 to-frost-500">
                  {stat.number}
                </div>
                <div className="text-slate-500 mt-2 text-sm sm:text-base font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Tracks Section */}
      <section id="tracks" className="py-16 sm:py-20 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Choose Your Track</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Every track includes 12 hours of training and a complete take-home DIY Kit.
            </p>
          </motion.div>

          {/* UPDATED: Centered 2-column grid and updated prop passing */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
            {trackData.map((track, index) => (
              <TrackCard
                key={index}
                track={track}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Join the Bootcamp</h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">Secure your spot today or drop us a message if you have any questions.</p>
          </motion.div>

          <RegistrationForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;