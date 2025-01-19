import Event from "../models/event.model.js";
import moment from "moment"; // To format the date as dd-mm-yyyy

 

export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      description,
      date,
      eventType,
      speakerName,
      speakerCompany,
      eventVenue,
      eventSponsor,
      semester,
    } = req.body;
    let imagePath;

    // Handle the uploaded image
    if (req.file) {
      imagePath = req.file.filename; // Store the image path correctly
    }

    // Validate required fields
    if (
      !eventName ||
      !description ||
      !date ||
      !eventType ||
      !speakerName ||
      !speakerCompany ||
      !eventVenue ||
      !semester
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate semester and date range
    const eventDate = moment(date, "YYYY-MM-DD").toDate();
    const month = eventDate.getMonth() + 1; // Months are 0-based in JavaScript

    if (
      (semester === "Spring" && (month < 8 || month > 11)) ||
      (semester === "Summer" && (month < 1 || month > 4))
    ) {
      return res
        .status(400)
        .json({ message: "Date must match the selected semester range" });
    }

    // Format the date
    const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

    // Check for duplicate date
    const existingEvent = await Event.findOne({ date: formattedDate });
    if (existingEvent) {
      return res
        .status(400)
        .json({ message: "An event with the same date already exists" });
    }

    // Retrieve clubName from localStorage (handled server-side for simplicity)
    const clubName = req.body.clubName || "Unknown Club";

    // Create a new event
    const newEvent = new Event({
      eventName,
      clubName,
      description,
      date: formattedDate,
      eventType,
      semester,
      speaker: {
        name: speakerName,
        company: speakerCompany,
      },
      eventVenue,
      eventSponsor,
      image: imagePath || null, // Handle cases where no image is uploaded
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: {
        ...newEvent.toObject(),
        date: moment(newEvent.date).format("DD-MM-YYYY"), // Format date for the response
        image: imagePath
          ? `http://localhost:5001/uploads/${imagePath}`
          : null, // Return full path to the image or null
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: error.message });
  }
};


 

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    // Format and include all necessary fields
    const formattedEvents = events.map((event) => {
      return {
        _id: event._id,
        eventName: event.eventName,
        clubName: event.clubName,
        eventType: event.eventType,
        semester: event.semester,
        speaker: {
          name: event.speaker?.name || "N/A",
          company: event.speaker?.company || "N/A",
        },
        description: event.description,
        date: moment(event.date).format("DD-MM-YYYY"), // Format the date
        eventVenue: event.eventVenue || "N/A",
        eventSponsor: event.eventSponsor || "N/A",
        status: event.status,
        image: event.image
          ? `http://localhost:5001/uploads/${event.image}`
          : null, // Include full path if image exists
        createdAt: moment(event.createdAt).format("DD-MM-YYYY HH:mm:ss"),
        updatedAt: moment(event.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
      };
    });

    res.status(200).json({ events: formattedEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
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
    const {
      eventName,
      description,
      date,
      eventType,
      speakerName,
      speakerCompany,
      eventVenue,
      eventSponsor,
      semester,
    } = req.body;
    let imagePath;

    // Handle new image upload if provided
    if (req.file) {
      imagePath = req.file.filename; // Store the new image filename
    }

    // Validate required fields
    if (
      !eventName ||
      !description ||
      !date ||
      !eventType ||
      !speakerName ||
      !speakerCompany ||
      !eventVenue ||
      !semester
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate semester and date range
    const eventDate = moment(date, "YYYY-MM-DD").toDate();
    const month = eventDate.getMonth() + 1; // Months are 0-based in JavaScript

    if (
      (semester === "Spring" && (month < 8 || month > 11)) ||
      (semester === "Summer" && (month < 1 || month > 4))
    ) {
      return res
        .status(400)
        .json({ message: "Date must match the selected semester range" });
    }

    // Format the date
    const formattedDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

    // Find and update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        eventName,
        description,
        date: formattedDate, // Update date
        eventType,
        semester,
        speaker: {
          name: speakerName,
          company: speakerCompany,
        },
        eventVenue,
        eventSponsor,
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
        image: updatedEvent.image
          ? `http://localhost:5001/uploads/${updatedEvent.image}`
          : null, // Include full image path
      },
    });
  } catch (error) {
    console.error("Error updating event:", error);
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
