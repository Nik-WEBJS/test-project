import { useEffect, useState } from "react";
import { getInfo } from "../services/api";

const HomePage = () => {
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    getInfo().then((data) => setInfo(data as string));
  }, []);

  return (
    <div>
      <h1>Little story about the company</h1>
      <p>{info}</p>
    </div>
  );
};

export default HomePage;
