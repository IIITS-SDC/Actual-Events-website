import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    clubName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Past Event", "Upcoming Event"],
      default: function () {
        return new Date(this.date) < new Date() ? "Past Event" : "Upcoming Event";
      },
      image: 
      {
          type: String,
          required: false
    }, 
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
