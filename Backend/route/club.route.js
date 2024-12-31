import express from "express";
import {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controller/club.controller.js";
import { upload } from "../middleware/multerConfig.js"; // Multer middleware for file uploads
import secureRoute from "../middleware/secureRoute.js"; // Middleware for protected routes

const router = express.Router();

// Routes
router.post("/create", secureRoute, upload.single("image"), createClub); // Create a new club
router.get("/getAll", getAllClubs); // Get all clubs
router.get("/getClub/:id", getClubById); // Get club by ID
router.put("/update/:id", secureRoute, upload.single("image"), updateClub); // Update a club
router.delete("/delete/:id", secureRoute, deleteClub); // Delete a club

export default router;
