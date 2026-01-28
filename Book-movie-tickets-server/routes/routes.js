import { Router } from "express";

import ShowModel from "../models/Show.js";
import redisClient from "../config/redisClient.js";

const router = Router();

const seedAvailableSeats = async (showId, showDetails) => {
  const availableKey = `available_seats:${showId}`;
  const exists = await redisClient.exists(availableKey);

  if (!exists) {
    await redisClient.sAdd(availableKey, showDetails.seats);
  }
};

router.get("/", async (req, res, next) => {
  const shows = await ShowModel.find({});
  res.send(shows);
});

router.get("/:showId/seats", async (req, res, next) => {
  try {
    const { showId } = req.params;

    const showDetails = await ShowModel.findById(showId);

    if (!showDetails) {
      res.status(404).send({ message: "Show not found" });
      return;
    }

    const availableKey = `available_seats:${showId}`;
    const lockedKey = `locked_seats:${showId}`;

    await seedAvailableSeats(showId, showDetails);

    const availableSeats = await redisClient.sMembers(availableKey);
    const lockedSeats = await redisClient.sMembers(lockedKey);
    res.send({
      availableSeats,
      lockedSeats: [...lockedSeats, ...showDetails.bookedSeats],
    });
  } catch (error) {
    next(error);
  }
});

export default router;