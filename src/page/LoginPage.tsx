import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import { useAuth } from "../components/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  React.useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  return <LoginForm />;
};

export default LoginPage;
