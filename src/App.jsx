// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./view/admin/Dashboard";
import Preview from "./view/student/Preview";
import Login from "./view/Login";
import ViewProfile from "./view/ViewProfile";
import EditStudent from "./view/admin/EditStudent";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes using Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/viewprofile/:id" element={<ViewProfile />} />
          <Route path="/editstudent/:id" element={<EditStudent />} />
        </Route>

        {/* Routes without Layout */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
