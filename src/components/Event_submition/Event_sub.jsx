import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Event_sub.css";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Hands-on"); // Dropdown menu
  const [semester, setSemester] = useState(""); // Spring or Summer
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerCompany, setSpeakerCompany] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventSponsor, setEventSponsor] = useState("");
  const [takenMentorPermission, setTakenMentorPermission] = useState(false);
  const [takenSDCPermission, setTakenSDCPermission] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]); // List of blocked dates
  const [clubName, setClubName] = useState("");

  useEffect(() => {
    // Fetch blocked dates from the server
    const fetchBlockedDates = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/event/blocked-dates");
        setBlockedDates(response.data.blockedDates || []);
      } catch (err) {
        console.error("Error fetching blocked dates:", err);
      }
    };

    fetchBlockedDates();

    // Fetch club name from localStorage
    const storedClubName = localStorage.getItem("name") || "Unknown Club";
    setClubName(storedClubName);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "eventName":
        setEventName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "eventType":
        setEventType(value);
        break;
      case "semester":
        setSemester(value);
        setDate(""); // Reset date when semester changes
        break;
      case "date":
        setDate(value);
        break;
      case "speakerName":
        setSpeakerName(value);
        break;
      case "speakerCompany":
        setSpeakerCompany(value);
        break;
      case "eventVenue":
        setEventVenue(value);
        break;
      case "eventSponsor":
        setEventSponsor(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!takenMentorPermission || !takenSDCPermission) {
      setError("Please confirm all permissions before submitting.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("clubName", clubName);
    formData.append("eventName", eventName);
    formData.append("description", description);
    formData.append("eventType", eventType);
    formData.append("semester", semester);
    formData.append("date", date);
    formData.append("image", image);
    formData.append("speakerName", speakerName);
    formData.append("speakerCompany", speakerCompany);
    formData.append("eventVenue", eventVenue);
    formData.append("eventSponsor", eventSponsor);
    formData.append("takenMentorPermission", takenMentorPermission);
    formData.append("takenSDCPermission", takenSDCPermission);

    try {
      const response = await axios.post("http://localhost:5001/api/event/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      // Handle successful submission
      setMessageType("success");
      setMessage("Login Successful!");
      console.log(response.data);

      // Clear the form
      setEventName("");
      setDescription("");
      setEventType("Hands-on");
      setSemester("");
      setDate("");
      setImage(null);
      setSpeakerName("");
      setSpeakerCompany("");
      setEventVenue("");
      setEventSponsor("");
      setTakenMentorPermission(false);
      setTakenSDCPermission(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const isDateBlocked = (date) => {
    return blockedDates.includes(date);
  };

  return (
    <div className="event-form-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <h1>Submit Event</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group semester-group">
          <label>Semester</label>
          <div className="semester-options" style={{ display: "flex", gap: "20px" }}>
            <label>
              <input
                type="checkbox"
                name="semester"
                value="Spring"
                onChange={handleChange}
                checked={semester === "Spring"}
                style={{ width: "20px", height: "20px" }}
              />
              Spring
            </label>
            <label>
              <input
                type="checkbox"
                name="semester"
                value="Summer"
                onChange={handleChange}
                checked={semester === "Summer"}
                style={{ width: "20px", height: "20px" }}
              />
              Summer
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Club Name</label>
          <input
            type="text"
            name="clubName"
            value={clubName}
            disabled
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            name="eventName"
            value={eventName}
            onChange={handleChange}
            required
            placeholder="Enter the event name"
          />
        </div>

        <div className="form-group">
          <label>Event Type</label>
          <select
            name="eventType"
            value={eventType}
            onChange={handleChange}
            required
            style={{ width: "100%", backgroundColor: "#2b2b3d", color: "white" }}
          >
            <option value="Hands-on">Hands-on</option>
            <option value="Quiz">Quiz</option>
            <option value="Lecture">Lecture</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            placeholder="Enter a brief description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Speaker Name</label>
          <input
            type="text"
            name="speakerName"
            value={speakerName}
            onChange={handleChange}
            required
            placeholder="Enter speaker's name"
          />
        </div>

        <div className="form-group">
          <label>Speaker Company</label>
          <input
            type="text"
            name="speakerCompany"
            value={speakerCompany}
            onChange={handleChange}
            required
            placeholder="Enter speaker's company"
          />
        </div>

        <div className="form-group">
          <label>Event Venue</label>
          <input
            type="text"
            name="eventVenue"
            value={eventVenue}
            onChange={handleChange}
            required
            placeholder="Enter event venue"
          />
        </div>

        <div className="form-group">
          <label>Event Sponsor</label>
          <input
            type="text"
            name="eventSponsor"
            value={eventSponsor}
            onChange={handleChange}
            placeholder="Enter event sponsor"
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            required
            min={semester === "Spring" ? "2024-08-01" : "2024-01-01"}
            max={semester === "Spring" ? "2024-11-30" : "2024-04-30"}
            disabled={!semester}
            style={isDateBlocked(date) ? { backgroundColor: "#ccc" } : {}}
          />
          {isDateBlocked(date) && <p className="error-message">This date is already taken.</p>}
        </div>

        <div className="form-group">
          <label>Event Image</label>
          <input
            type="file"
            name="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={takenMentorPermission}
              onChange={(e) => setTakenMentorPermission(e.target.checked)}
              style={{ width: "20px", height: "20px" }}
            />
            Taken permission from club mentor
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={takenSDCPermission}
              onChange={(e) => setTakenSDCPermission(e.target.checked)}
              style={{ width: "20px", height: "20px" }}
            />
            Taken permission from SDC
          </label>
        </div>

        <button
          type="submit"
          className="event-submit-button"
          disabled={loading || isDateBlocked(date)}
        >
          {loading ? "Submitting..." : "Submit Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
