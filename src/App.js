import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SurveyList from "./components/SurveyList";
import CreateSurvey from "./components/CreateSurveyX";
import TakeSurvey from "./components/TakeSurveyX";

function App() {
  return (
    <Router>
      <div>
        {/* Simple Navigation Bar */}
        <nav style={{ padding: "10px", background: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/create" style={{ marginRight: "15px" }}>Create Survey</Link>

        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<SurveyList />} />
         
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/survey/:id" element={<TakeSurvey />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
