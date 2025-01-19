import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import Club from "./components/Clubs/Clubs.jsx";
import Events from "./components/Events/Events.jsx";
import About from "./components/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Login from "./components/Login/Login.jsx";
import Event_sub from "./components/Event_submition/Event_sub.jsx";
import Event_All from "./components/Events/AllEvents.jsx";
import PrivateRoute from "./Protected_Routes/PrivateRoute.jsx";
import Club_Leads from "./components/Club_Leads/Club_Leads.jsx";
import Club_Nav from "./components/Navbar/Club_Nav.jsx";
import Event_For_Leads from "./components/Event_For_Leads/Event_For_Leads.jsx";
function App() {
  const location = useLocation(); // Get the current route path
  const [isProtectedRoute, setIsProtectedRoute] = useState(false);

  useEffect(() => {
    // Update the state based on the current route
    const protectedRoutes = ["/protected","/protected/event_sub","/protected/event_for_leads"]; // Add more protected routes here
    setIsProtectedRoute(protectedRoutes.includes(location.pathname));
  }, [location]);

  return (
    <div className="App">
      {/* Render Club_Nav for protected routes, Navbar otherwise */}
      {isProtectedRoute ? <Club_Nav /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/club/*" element={<Club />} /> 
        {/* Added /* for nested routes */}
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected/event_sub" element={<PrivateRoute>
              <Event_sub />
            </PrivateRoute>} />
        <Route path="/event_all" element={<Event_All />} />
        <Route
          path="/protected"
          element={
            <PrivateRoute>
              <Club_Leads />
            </PrivateRoute>
          }
        />
         <Route
          path="/protected/event_for_leads"
          element={
            <PrivateRoute>
              <Event_For_Leads />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
