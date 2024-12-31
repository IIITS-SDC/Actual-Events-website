import Club from "../models/club.model.js";

// Create Club
export const createClub = async (req, res) => {
  try {
    const { clubname, aboutclub, members, clubType, image } = req.body;

    // Validate required fields
    if (!clubname || !aboutclub || !members || !clubType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Handle image (from file upload or URL)
    let imagePath = image; // Image passed as a URL
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // Image from file upload
    }

    if (!imagePath) {
      return res.status(400).json({ message: "Club image is required" });
    }

    // Check if the club already exists
    const existingClub = await Club.findOne({ clubname });
    if (existingClub) {
      return res.status(400).json({ message: "Club name already exists" });
    }

    // Create a new club
    const newClub = new Club({
      clubname,
      aboutclub,
      members,
      clubType,
      image: imagePath,
    });

    await newClub.save();

    res.status(201).json({
      message: "Club created successfully",
      club: newClub,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Clubs
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json({ clubs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Club by ID
export const getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({ club });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Club
export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { clubname, aboutclub, members, clubType, image } = req.body;

    // Handle updated image (from file upload or URL)
    let imagePath = image;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedClub = await Club.findByIdAndUpdate(
      id,
      {
        clubname,
        aboutclub,
        members,
        clubType,
        ...(imagePath && { image: imagePath }), // Update image if provided
      },
      { new: true }
    );

    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({
      message: "Club updated successfully",
      club: updatedClub,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Club
export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClub = await Club.findByIdAndDelete(id);

    if (!deletedClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
