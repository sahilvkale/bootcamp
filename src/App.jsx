import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import TrackCard from './components/TrackCard';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

// Your bootcamp curriculum data
const trackData = [
  {
    title: "Sensorcraft",
    subtitle: "Arduino Basics",
    price: "₹1,299",
    featured: false,
    syllabus: [
      "Hello World of Hardware. Intro to microcontrollers and writing first C++ code.",
      "The Sixth Sense. Wiring IR and Ultrasonic sensors to detect obstacles.",
      "The Final Build. Creating a Smart Security Alarm prototype."
    ],
    kit: [
      "Arduino Uno R3 (Compatible) + USB Cable",
      "Half-size Breadboard & Jumper Wires",
      "LEDs & 220Ω Resistors",
      "IR Sensor & HC-SR04 Ultrasonic Sensor",
      "Active Buzzer & 9V Battery"
    ]
  },
  {
    title: "Robotics Workshop",
    subtitle: "Build & Code",
    price: "₹1,599",
    featured: true,
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
    title: "Getting Started with IoT",
    subtitle: "Arduino Advanced",
    price: "₹1,999",
    featured: false,
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
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-slate-100">
      <Navbar />

      {/* Hero Section - Fixed for desktop */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
            <span className="text-sm font-medium text-blue-300">🎯 Summer Tech Bootcamp 2026</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Unleash Your Inner{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 animate-gradient">
              Inventor!
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            IOTive Summer Tech Bootcamp 2026. A 100% hands-on experience for 7th to 9th graders to build, code, and create.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#register"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all shadow-xl shadow-blue-500/30 w-full sm:w-auto text-center"
            >
              Secure Your Spot →
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#tracks"
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all w-full sm:w-auto text-center"
            >
              Explore Tracks
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-scroll"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Students Trained" },
              { number: "25+", label: "Workshops" },
              { number: "15+", label: "Expert Mentors" },
              { number: "100%", label: "Hands-on Learning" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {stat.number}
                </div>
                <div className="text-slate-400 mt-2 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Tracks Section */}
      <section id="tracks" className="py-16 sm:py-20 md:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Track</h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4">
              Every track includes 12 hours of training and a complete take-home DIY Kit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {trackData.map((track, index) => (
              <TrackCard
                key={index}
                title={track.title}
                subtitle={track.subtitle}
                price={track.price}
                featured={track.featured}
                syllabus={track.syllabus}
                kit={track.kit}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Join the Bootcamp</h2>
            <p className="text-base sm:text-lg text-slate-400 px-4">Secure your spot today or drop us a message if you have any questions.</p>
          </motion.div>

          <RegistrationForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;