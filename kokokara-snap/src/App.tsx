import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProfilePage from "./components/pages/ProfilePage";
import MapPage from "./components/pages/MapPage";

const App: React.FC = () => {
  return (
    <MapPage />
    // <Router>
    //   {/* The Router component wraps the whole application, providing routing functionality */}
    //   <Routes>
    //     {/* Define the routes for your app here */}
    //     <Route path="/" element={<HomePage />} />{" "}
    //     {/* HomePage is rendered at the root URL */}
    //     <Route path="/profile" element={<ProfilePage />} />{" "}
    //     {/* ProfilePage is rendered at /profile */}
    //     <Route path="/map" element={<MapPage />} />{" "}
    //     {/* ProfilePage is rendered at /profile */}
    //   </Routes>
    // </Router>
  );
};

export default App;
