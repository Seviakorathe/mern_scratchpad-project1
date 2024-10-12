import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import ThemeToggle from "./ThemeToggle.jsx"; // Adjust the path if needed

function NavBar() {
  return (
    <Navbar className="col-xl-1140">
      <Container
        style={{
          textTransform: "uppercase", // Uppercase text
          fontWeight: "bold", // Bold text
        }}
        className="p-3" // Add padding or any other Bootstrap utility classes
      >
        <Navbar.Brand as={Link} to="/">
          🏠︎
        </Navbar.Brand>
      </Container>
      <Link to="/add">
        <CiSquarePlus className="fs-1" />
      </Link>
      <ThemeToggle /> {/* Include the ThemeToggle component here */}
    </Navbar>
  );
}

export default NavBar;
