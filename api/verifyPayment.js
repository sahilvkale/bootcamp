import crypto from "crypto";
import admin from "firebase-admin";

// Initialize Firebase Admin safely in a serverless environment
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,   
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The replace() is crucial for Vercel to read multi-line private keys
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { paymentData, registrationData } = req.body;

    // 1. Verify Signature
    const body = paymentData.razorpay_order_id + "|" + paymentData.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== paymentData.razorpay_signature) {
      return res.status(403).json({ error: "Invalid signature" });
    }

    // 2. Security Passed! Save to Firestore via Admin "God Mode"
    await db.collection("bootcamp_registrations").add({
      ...registrationData,
      paymentStatus: "Paid",
      transactionID: paymentData.razorpay_payment_id,
      orderID: paymentData.razorpay_order_id,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    // 3. Increment the correct batch counter
    const batchType = registrationData.batchPreference; 
    if (batchType === "weekday" || batchType === "weekend") {
      await db.collection("bootcamp_metadata").doc("batch_stats").update({
        [`${batchType}Count`]: admin.firestore.FieldValue.increment(1)
      });
    }

    return res.status(200).json({ success: true, message: "Payment verified and saved!" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}