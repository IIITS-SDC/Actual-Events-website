import mongoose from "mongoose";

const clubSchema = mongoose.Schema(
  {
    clubname: {
      type: String,
      required: true,
      unique: true,
    },
    aboutclub: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    clubType: {
      type: String,
      enum: ["technical", "non-technical"],
      required: true,
      default: "non-technical",
    },
    image: {
      type: String, // URL or path to the uploaded image
      required: false,
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const Club = mongoose.models.Club || mongoose.model("Club", clubSchema);

export default Club;
