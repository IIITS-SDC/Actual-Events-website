import Event from "../models/event.model.js";

// Get all blocked dates
export const getBlockedDates = async (req, res) => {
  try {
    const events = await Event.find({}, "date"); // Retrieve only the date field
    const blockedDates = events.map((event) => event.date);

    res.status(200).json({
      blockedDates,
    });
  } catch (error) {
    console.error("Error fetching blocked dates:", error);
    res.status(500).json({
      message: "Error fetching blocked dates",
    });
  }
};

// Add a blocked date
export const addBlockedDate = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    // Check if the date already exists
    const existingEvent = await Event.findOne({ date });
    if (existingEvent) {
      return res.status(400).json({
        message: "This date is already blocked",
      });
    }

    // Add a new event with the blocked date (as an empty event, optional)
    const newEvent = new Event({ date });
    await newEvent.save();

    res.status(201).json({
      message: "Blocked date added successfully",
      date,
    });
  } catch (error) {
    console.error("Error adding blocked date:", error);
    res.status(500).json({
      message: "Error adding blocked date",
    });
  }
};
