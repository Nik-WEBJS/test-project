import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
