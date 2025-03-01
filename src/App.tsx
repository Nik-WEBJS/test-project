import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import { CssBaseline, Box } from "@mui/material";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Box className={styles.container}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <AppRoutes />
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;
