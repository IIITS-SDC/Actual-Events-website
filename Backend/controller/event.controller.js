import Event from "../models/event.model.js";
import moment from "moment"; // To format the date as dd-mm-yyyy

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { eventName, clubName, description, date } = req.body;
    let imagePath;

    // Handle the uploaded image
    if (req.file) {
      imagePath = `../uploads/${req.file.filename}`; // Store image path correctly
    }

    // Validate required fields
    if (!eventName || !clubName || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Format the date to dd-mm-yyyy
    const formattedDate = moment(date, "DD-MM-YYYY").format("YYYY-MM-DD"); 

    // Create a new event
    const newEvent = new Event({
      eventName,
      clubName,
      description,
      date: formattedDate, // Store the formatted date
      image: imagePath,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: {
        ...newEvent.toObject(),
        date: moment(newEvent.date).format("DD-MM-YYYY"), // Format date for the response
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    // Format the dates for all events to dd-mm-yyyy
    const formattedEvents = events.map((event) => {
      return {
        ...event.toObject(),
        date: moment(event.date).format("DD-MM-YYYY"), // Format the date for each event
      };
    });

    res.status(200).json({ events: formattedEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Format the date for the individual event to dd-mm-yyyy
    event.date = moment(event.date).format("DD-MM-YYYY");

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, clubName, description, date } = req.body;
    let imagePath;

    // Handle new image upload if provided
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Format the date to dd-mm-yyyy
    const formattedDate = moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");

    // Find and update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        eventName,
        clubName,
        description,
        date: formattedDate, // Update date to the formatted one
        ...(imagePath && { image: imagePath }), // Update image only if a new file is uploaded
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: {
        ...updatedEvent.toObject(),
        date: moment(updatedEvent.date).format("DD-MM-YYYY"), // Format date for the response
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the event
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
