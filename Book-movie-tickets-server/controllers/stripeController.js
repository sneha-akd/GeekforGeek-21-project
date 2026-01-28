import redisClient from "../config/redisClient.js";
import stripeClient from "../config/stripe.js";
import BookingsModel from "../models/Bookings.js";
import ShowModel from "../models/Show.js";


// IN DEBUG MODE
// const SUCCESS_URL = "http://localhost:3000/bookings/success?session_id={CHECKOUT_SESSION_ID}"
// const CANCEL_URL = "http://localhost:3000/bookings/cancel?session_id={CHECKOUT_SESSION_ID}"

// IN PROD MODE: TODO: Add Render.com url
const SUCCESS_URL = "https://geekforgeek-21-project.onrender.com/?session_id={CHECKOUT_SESSION_ID}"
const CANCEL_URL = "https://geekforgeek-21-project.onrender.com/"

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { seats, showId } = req.body;

    const show = await ShowModel.findById(showId);
    let totalAmount = 0;

    seats.forEach((seat) => {
      const seatRow = seat[0];
      const price = show.pricing[seatRow];
      totalAmount += price;
    });

    const lockedKey = `locked_seats:${showId}`;
    const availableKey = `available_seats:${showId}`;

    const booking = await BookingsModel.create({
      showId,
      seats,
      amount: totalAmount,
    });
    await redisClient.del(availableKey);
    await redisClient.sRem(lockedKey, seats);

    const lineItems = seats.map((seat) => {
      const seatRow = seat[0];
      const price = show.pricing[seatRow];

      return {
        price_data: {
          currency: "inr",
          unit_amount: price * 100,
          product_data: {
            name: `${show.title} - ${seat}`,
            images: [show.posterUrl],
          },
        },
        quantity: 1,
      };
    });

    const session = await stripeClient.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      metadata: { bookingId: booking._id.toString() },
    });

    booking.stripeSessionId = session.id;
    // store booking in DB
    await booking.save();

    await ShowModel.findByIdAndUpdate(showId, {
      $push: { bookedSeats: { $each: seats } }
    }, { new: true });

    res.send(session.url);
  } catch (error) {
    next(error);
  }
};
