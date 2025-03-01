import { useEffect, useState } from "react";
import { getInfo } from "../services/api";
import { useAuth } from "../components/AuthContext";

const HomePage = () => {
  const { token } = useAuth();
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    if (token) {
      getInfo().then((data) => setInfo(data as string));
    }
  }, [token]);

  return (
    <div>
      <h1>Little story about the company</h1>
      {token ? <p>{info}</p> : ""}
    </div>
  );
};

export default HomePage;
