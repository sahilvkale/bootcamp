// components/AutoScrollGallery.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Import your workshop photos (update paths as needed)
import workshop1 from '../assets/Workshop_Images/workshop1.jpg';
import workshop2 from '../assets/Workshop_Images/workshop2.jpg';
import workshop3 from '../assets/Workshop_Images/workshop3.jpg';
import workshop4 from '../assets/Workshop_Images/workshop4.jpg';
import workshop5 from '../assets/Workshop_Images/workshop5.jpg';
import workshop6 from '../assets/Workshop_Images/workshop6.jpg';

const galleryPhotos = [
  {
    image: workshop1,
    title: 'Arduino Basics Workshop',
    description: 'Learning the fundamentals of microcontrollers',
    category: 'workshop'
  },
  {
    image: workshop2,
    title: 'Sensor Integration',
    description: 'Working with IR and Ultrasonic sensors',
    category: 'workshop'
  },
  {
    image: workshop3,
    title: 'Robot Assembly',
    description: 'Building 2WD robot chassis',
    category: 'workshop'
  },
  {
    image: workshop4,
    title: 'IoT Cloud Connection',
    description: 'Pushing data to cloud dashboards',
    category: 'workshop'
  },
  {
    image: workshop5,
    title: 'PCB Design Session',
    description: 'Learning PCB layout principles',
    category: 'workshop'
  },
  {
    image: workshop6,
    title: 'Smart Home Automation',
    description: 'Controlling relays via smartphone',
    category: 'workshop'
  },
  {
    image: workshop1,
    title: 'Student Projects Showcase',
    description: 'Young innovators presenting their work',
    category: 'workshop'
  },
  {
    image: workshop2,
    title: 'Team Collaboration',
    description: 'Students working together on projects',
    category: 'workshop'
  },
  {
    image: workshop3,
    title: 'Robotics Competition',
    description: 'Friendly robot racing event',
    category: 'workshop'
  },
  {
    image: workshop4,
    title: 'Sensor Calibration',
    description: 'Fine-tuning sensor readings',
    category: 'workshop'
  },
  {
    image: workshop5,
    title: 'Circuit Debugging',
    description: 'Troubleshooting connections',
    category: 'workshop'
  },
  {
    image: workshop6,
    title: 'Final Presentations',
    description: 'Students demoing their prototypes',
    category: 'workshop'
  }
];

const AutoScrollGallery = () => {
  const galleryRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate images for seamless scrolling
  const duplicatedPhotos = [...galleryPhotos, ...galleryPhotos];

  // Auto-scroll effect
  useEffect(() => {
    if (!galleryRef.current || isPaused) return;

    const gallery = galleryRef.current;
    let scrollSpeed = 0.8; // pixels per frame
    let animationId;

    const animate = () => {
      if (gallery) {
        gallery.scrollLeft += scrollSpeed;
        
        // Reset scroll position when reaching the end of duplicated content
        if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
          gallery.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    gallery.addEventListener('mouseenter', handleMouseEnter);
    gallery.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      if (gallery) {
        gallery.removeEventListener('mouseenter', handleMouseEnter);
        gallery.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isPaused]);

  return (
    <section id = "gallery" className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Bootcamp <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">In Action</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            See what students are building at our Summer Tech Bootcamp 2026
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="relative">
        <div
          ref={galleryRef}
          className="flex overflow-x-auto py-4 gap-6 px-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* CSS for hiding scrollbar */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {duplicatedPhotos.map((photo, index) => (
            <div
              key={`${photo.title}-${index}`}
              className="flex-shrink-0 w-72 sm:w-80 md:w-96 h-80 rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Image */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Category Label */}
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Workshop
                </span>
              </div>
              
              {/* Overlay with details - Shows on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold mb-2">{photo.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base">{photo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optional: Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </section>
  );
};

export default AutoScrollGallery;