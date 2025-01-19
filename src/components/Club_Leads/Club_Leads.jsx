import React, { useEffect, useState } from "react";
import "./Club_Lead.css";

const ProtectedPage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the user's name from localStorage
    const storedName = localStorage.getItem("name");

    // Set the user's name in state
    if (storedName) {
      setUserName(storedName);
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div className="protected-container">
      <h1>Hello {userName || "Guest"}</h1>
    </div>
  );
};

export default ProtectedPage;
