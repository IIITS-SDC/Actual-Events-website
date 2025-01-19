import mongoose from "mongoose";

// Helper function to determine the event semester based on the date
function determineSemester(date) {
  const eventDate = new Date(date);
  const month = eventDate.getMonth() + 1; // Months are 0-based
  if (month >= 8 && month <= 11) {
    return "Spring";
  } else if (month >= 1 && month <= 4) {
    return "Summer";
  }
  return null; // Invalid range
}

const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    clubName: {
      type: String,
      required: true,
      default: function () {
        // Retrieve club name from localStorage
        if (typeof window !== "undefined") {
          return localStorage.getItem("name") || "Unknown Club";
        }
        return "Unknown Club"; // Default for server-side scenarios
      },
    },
    eventType: {
      type: String,
      enum: ["Hands-on", "Quiz", "Lecture", "Other"],
      required: true,
    },
    semester: {
      type: String,
      enum: ["Spring", "Summer"],
      required: true,
      default: function () {
        return determineSemester(this.date);
      },
    },
    date: {
      type: Date,
      required: true,
      unique: true, // Enforces unique dates
      validate: {
        validator: function (value) {
          const semester = determineSemester(value);
          const month = value.getMonth() + 1;

          if (semester === "Spring" && (month < 8 || month > 11)) {
            return false; // Invalid date for Spring semester
          }
          if (semester === "Summer" && (month < 1 || month > 4)) {
            return false; // Invalid date for Summer semester
          }
          return true;
        },
        message: "Date must match the selected semester range.",
      },
    },
    speaker: {
      name: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
    },
    eventVenue: {
      type: String,
      required: true,
    },
    eventSponsor: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Past Event", "Upcoming Event"],
      default: function () {
        return new Date(this.date) < new Date()
          ? "Past Event"
          : "Upcoming Event";
      },
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
