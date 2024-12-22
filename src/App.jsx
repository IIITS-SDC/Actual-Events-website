import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Club from './components/Club/Club.jsx';
import Events from './components/Events/Events.jsx';
import About from './components/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/club/*" element={<Club />} />  {/* Added /* for nested routes */}
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;