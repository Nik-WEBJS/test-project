import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styles from "./Navbar.module.scss";
import Button from "@mui/material/Button";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Button variant="outlined" component={Link} to="/">
        About Us
      </Button>
      {token ? (
        <>
          <Button variant="outlined" component={Link} to="/profile">
            Profile
          </Button>
          <Button variant="text" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="outlined" component={Link} to="/login">
          Sign in
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
