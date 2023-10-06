import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { User, LogOut, FileText } from "react-feather";

const MainNavBar = (props) => {
  const logoutHandler = () => {
    props.removeCookie("Rent@SG Cookie");
    props.setDisplayListings("verified");
    props.setUserId(null);
    props.logoutHandler();
  };
  //className="bg-body-tertiary"
  //data-bs-theme="light"
  return (
    <Navbar expand="lg" fixed="top" style={{ backgroundColor: "#ffd4cf" }}>
      <Container style={{ backgroundColor: "#ffd4cf" }}>
        <Navbar.Brand
          href="#home"
          className="fs-5"
          onClick={() => props.setDisplayListings("verified")}
        >
          Rent@SG
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="fs-5 d-none">
              Home
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="fs-5 d-none">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            {!props.isLoggedIn ? (
              <Nav.Link className="fs-5" onClick={props.showLoginModalHandler}>
                Login
              </Nav.Link>
            ) : null}

            {!props.isLoggedIn ? (
              <Nav.Link className="fs-5" onClick={props.showRegisterModalHandler}>
                Register
              </Nav.Link>
            ) : null}
            {props.isLoggedIn ? (
              <Nav.Link
                className="fs-5"
                onClick={() => props.setDisplayListings("my applications")}
              >
                <FileText size={18} className="mb-1 me-1" />
                <span>Applications</span>
              </Nav.Link>
            ) : null}
            {props.isLoggedIn && props.role === "admin" ? (
              <Nav.Link
                className="fs-5"
                onClick={() => props.setDisplayListings("verify listings")}
              >
                Verify Listings
              </Nav.Link>
            ) : null}
            {props.isLoggedIn && props.role === "landlord" ? (
              <Nav.Link className="fs-5" onClick={() => props.setDisplayListings("my listings")}>
                My Listings
              </Nav.Link>
            ) : null}
            {props.isLoggedIn && props.role === "landlord" ? (
              <Nav.Link className="fs-5" onClick={props.showListingModalHandler}>
                Create Listing
              </Nav.Link>
            ) : null}
            {props.isLoggedIn ? (
              <Nav.Link className="fs-5" onClick={props.showProfileModalHandler}>
                <User size={18} className="mb-1 me-1" />
                <span>Profile</span>
              </Nav.Link>
            ) : null}
            {props.isLoggedIn ? (
              <Nav.Link className="fs-5" onClick={logoutHandler}>
                <LogOut size={18} className="mb-1 me-1" />
                <span>Log out</span>
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavBar;
