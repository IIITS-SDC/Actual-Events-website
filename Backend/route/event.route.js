import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controller/event.controller.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

// Routes
router.post("/events", upload.single("image"),createEvent);
router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;
