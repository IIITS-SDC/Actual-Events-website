import express from "express";
import {
  getBlockedDates,
  addBlockedDate,
} from "../controller/date.controller.js";

const router = express.Router();

// Get all blocked dates
router.get("/blocked-dates", getBlockedDates);

// Add a new blocked date
router.post("/blocked-dates", addBlockedDate);

export default router;
