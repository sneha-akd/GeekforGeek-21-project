import { Schema, model } from "mongoose";

const showSchema = new Schema(
  {
    title: { type: String },
    posterUrl: { type: String },
    screen: { type: String },
    startTime: { type: Date },
    seats: [String],
    bookedSeats: [String],
    pricing: { A: Number, B: Number, C: Number, D: Number, E: Number, F: Number },
    currency: { type: String },
  }
);

const ShowModel = model("Show", showSchema);

export default ShowModel;