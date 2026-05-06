import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { amount } = req.body;
    const amountInRupees = parseInt(amount, 10);

    if (!amountInRupees) return res.status(400).json({ error: "Amount is missing" });

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amountInRupees * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Could not create order" });
  }
}