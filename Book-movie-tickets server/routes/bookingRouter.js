import { Router } from "express";

import redisClient from "../config/redisClient.js";
import BookingsModel from "../models/Bookings.js";
import { createCheckoutSession } from "../controllers/stripeController.js"

const bookingRouter = Router();

bookingRouter.post("/book-seats", async (req, res, next) => {
  try {
    const { seats, showId, time = 600 } = req.body;
    const availableKey = `available_seats:${showId}`;
    const lockedKey = `locked_seats:${showId}`;
    const tempRequestKey = `request_seats:${Date.now()}`;

    console.log("setting new key", tempRequestKey);
    await redisClient.sAdd(tempRequestKey, seats);
    await redisClient.expire(tempRequestKey, 5);

    const lockedIntersection = await redisClient.sInter([tempRequestKey, lockedKey]);

    if (lockedIntersection.length > 0) {
      await redisClient.del(tempRequestKey);
      return res.status(409).send({
        message: "Some seats are not available",
      });
    }

    const intersection = await redisClient.sInter([tempRequestKey, availableKey]);
    if (intersection.length !== seats.length) {
      await redisClient.del(tempRequestKey);
      return res.status(409).send({
        message: "Some seats are not available",
      });
    }

    // AVAILAB seats - A1,A2 A3
    await redisClient.sAdd(lockedKey, seats); //A1, A2
    await redisClient.expire(lockedKey, time);

    await redisClient.del(tempRequestKey);

    res.send({
      message: `Seats locked for ${time / 60} minutes`,
      data: seats,
    });
  } catch (error) {
    next(error);
  }
});

bookingRouter.post("/confirm", async (req, res, next) => {
  try {
    const { seats, showId } = req.body;

    const lockedKey = `locked_seats:${showId}`;
    const availableKey = `available_seats:${showId}`;

    const booking = await BookingsModel.create({ showId, seats });
    await redisClient.del(availableKey);

    await redisClient.sRem(lockedKey, seats);

    res.send({
      message: "Booking confirmed",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

bookingRouter.post("/checkout", createCheckoutSession);

export default bookingRouter;