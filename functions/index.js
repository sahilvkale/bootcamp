require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Firebase Admin 
admin.initializeApp();
const db = admin.firestore();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint 1: Securely create an order ID
exports.createOrder = functions.https.onCall(async (data, context) => {
  try {
    // Bulletproof unwrapping (handles Firebase v9/v10 version quirks)
    const payload = data.data || data; 
    
    // Ensure the amount exists and is converted to a strict integer
    const amountInRupees = parseInt(payload.amount, 10);
    
    if (!amountInRupees) {
      console.error("Missing amount! Received payload:", payload);
      throw new functions.https.HttpsError("invalid-argument", "Amount is missing from request.");
    }

    const options = {
      amount: amountInRupees * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    return { orderId: order.id, amount: order.amount };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new functions.https.HttpsError("internal", "Could not create order.");
  }
});

// Endpoint 2: Verify signature and save to database
exports.verifyAndSavePayment = functions.https.onCall(async (data, context) => {
  // Bulletproof unwrapping
  const payload = data.data || data;
  const { paymentData, registrationData } = payload;
  
  if (!paymentData || !registrationData) {
     throw new functions.https.HttpsError("invalid-argument", "Missing payment or registration data.");
  }

  // 1. Recreate the signature using your hidden Key Secret
  const body = paymentData.razorpay_order_id + "|" + paymentData.razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  // 2. Check if they match
  if (expectedSignature === paymentData.razorpay_signature) {
    // SECURITY PASSED! 
    try {
      await db.collection("bootcamp_registrations").add({
        ...registrationData,
        paymentStatus: "Paid",
        transactionID: paymentData.razorpay_payment_id,
        orderID: paymentData.razorpay_order_id,
        timestamp: FieldValue.serverTimestamp()
      });
      return { success: true, message: "Payment verified and saved!" };
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw new functions.https.HttpsError("internal", "Payment verified, but failed to save record.");
    }
  } else {
    // SECURITY FAILED!
    throw new functions.https.HttpsError("permission-denied", "Invalid payment signature.");
  }
});