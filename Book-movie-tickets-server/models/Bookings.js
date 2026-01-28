import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  showId: Schema.Types.ObjectId,
  seats: [String],
  amount: Number,
  stripeSessionId: String,
  status: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const BookingsModel = model("Booking", bookingSchema);

export default BookingsModel;