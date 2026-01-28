import stripe from "stripe";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// console.log("secrete key", STRIPE_SECRET_KEY)

const stripeClient = stripe(STRIPE_SECRET_KEY);

export default stripeClient;