import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Pulling in your Firebase connection!

const trackPrices = {
  sensorcraft: 1299,
  robotics: 1599,
  iot: 1999
};

export default function RegistrationForm() {
  const [activeTab, setActiveTab] = useState('register');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // === FUNCTION TO HANDLE REGISTRATION ===
  // === FUNCTION TO HANDLE REGISTRATION & PAYMENT ===
  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // 1. Calculate the price based on the selected track
    const amountInRupees = trackPrices[data.selectedTrack];
    
    if (!amountInRupees) {
      setStatusMessage({ type: 'error', text: '❌ Please select a valid track.' });
      setIsSubmitting(false);
      return;
    }

    // Razorpay requires the amount in paise (Rupees * 100)
    const amountInPaise = amountInRupees * 100;

    // 2. Setup Razorpay Options
    const options = {
      key: "rzp_test_SlpCo0mrJwuM0F", // TODO: Put your Razorpay Test Key here
      amount: amountInPaise, 
      currency: "INR",
      name: "IOTive Solutions LLP",
      description: `Bootcamp Registration: ${data.selectedTrack}`,
      image: "https://your-logo-url.com/logo.png", // Optional: Add your logo URL here later
      handler: async function (response) {
        // THIS CODE RUNS ONLY IF PAYMENT IS SUCCESSFUL
        try {
          // 3. Save to Firebase with the Success Transaction ID
          await addDoc(collection(db, 'bootcamp_registrations'), {
            ...data, // This spreads all the form data (name, phone, etc.)
            paymentStatus: "Paid",
            transactionID: response.razorpay_payment_id,
            amountPaid: amountInRupees,
            timestamp: serverTimestamp()
          });

          setStatusMessage({ type: 'success', text: `✅ Payment Successful! ID: ${response.razorpay_payment_id}. Registration saved!` });
          e.target.reset(); // Clear form on success
        } catch (error) {
          console.error("Firebase Error: ", error);
          setStatusMessage({ type: 'error', text: '❌ Payment received, but error saving data. Please contact support.' });
        }
      },
      prefill: {
        name: data.parentName,
        email: data.contactEmail,
        contact: data.contactPhone
      },
      theme: {
        color: "#2563eb" // Matches your blue theme
      }
    };

    // 4. Open the Razorpay Window
    const rzp = new window.Razorpay(options);
    
    // Handle if the user closes the window without paying
    rzp.on('payment.failed', function (response){
      setStatusMessage({ type: 'error', text: `❌ Payment Failed: ${response.error.description}` });
    });

    rzp.open();
    setIsSubmitting(false);
  };

  // === FUNCTION TO HANDLE ENQUIRY ===
  const handleEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // 2. Save to the 'bootcamp_enquiries' collection
      await addDoc(collection(db, 'bootcamp_enquiries'), {
        name: data.senderName,
        phone: data.senderPhone,
        email: data.senderEmail,
        question: data.question,
        status: "Unread",
        timestamp: serverTimestamp()
      });

      setStatusMessage({ type: 'success', text: '✅ Message sent! The team will contact you soon.' });
      e.target.reset(); // Clear the form
    } catch (error) {
      console.error("Firebase Error: ", error);
      setStatusMessage({ type: 'error', text: '❌ Error sending message. Please try again.' });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
      
      {/* Tab Buttons */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => { setActiveTab('register'); setStatusMessage({ type: '', text: '' }); }}
          className={`flex-1 py-4 text-lg font-bold transition-colors ${
            activeTab === 'register' 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
        >
          📝 Bootcamp Registration
        </button>
        <button
          onClick={() => { setActiveTab('enquiry'); setStatusMessage({ type: '', text: '' }); }}
          className={`flex-1 py-4 text-lg font-bold transition-colors ${
            activeTab === 'enquiry' 
              ? 'bg-slate-700 text-white border-b-2 border-blue-500'
              : 'text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
          style={activeTab === 'enquiry' ? { backgroundColor: '#2563eb', color: 'white' } : {}}
        >
          ❓ General Enquiry
        </button>
      </div>

      <div className="p-8">
        
        {/* Status Message Display */}
        {statusMessage.text && (
          <div className={`p-4 mb-6 rounded-lg text-center font-bold ${statusMessage.type === 'success' ? 'bg-green-600/20 text-green-400 border border-green-500/50' : 'bg-red-600/20 text-red-400 border border-red-500/50'}`}>
            {statusMessage.text}
          </div>
        )}

        {/* === REGISTRATION FORM === */}
        {activeTab === 'register' && (
          <form className="space-y-6 animate-fade-in" onSubmit={handleRegistration}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Student Name</label>
                <input type="text" name="studentName" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Grade / Standard</label>
                <select name="gradeLevel" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required>
                  <option value="">Select Grade</option>
                  <option value="7th">7th Standard</option>
                  <option value="8th">8th Standard</option>
                  <option value="9th">9th Standard</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Parent's Name</label>
                <input type="text" name="parentName" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                <input type="tel" name="contactPhone" pattern="[0-9]{10}" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" placeholder="10-digit number" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input type="email" name="contactEmail" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Track</label>
                <select name="selectedTrack" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required>
                  <option value="">Choose a track...</option>
                  <option value="sensorcraft">Sensorcraft (₹1,299)</option>
                  <option value="robotics">Robotics Workshop (₹1,599)</option>
                  <option value="iot">Getting Started with IoT (₹1,999)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Batch Preference</label>
                <select name="batchPreference" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required>
                  <option value="">Select Batch...</option>
                  <option value="weekday">Weekday (Mon, Tue, Wed)</option>
                  <option value="weekend">Weekend (Fri, Sat, Sun)</option>
                </select>
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white font-bold py-4 rounded-lg mt-4 transition-colors shadow-lg shadow-green-600/20">
              {isSubmitting ? 'Processing...' : 'Proceed to Pay & Register'}
            </button>
          </form>
        )}

        {/* === ENQUIRY FORM === */}
        {activeTab === 'enquiry' && (
          <form className="space-y-6 animate-fade-in" onSubmit={handleEnquiry}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                <input type="text" name="senderName" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                <input type="tel" name="senderPhone" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input type="email" name="senderEmail" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Your Question</label>
              <textarea name="question" rows="4" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" placeholder="How can we help?" required></textarea>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white font-bold py-4 rounded-lg mt-4 transition-colors shadow-lg shadow-blue-600/20">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}