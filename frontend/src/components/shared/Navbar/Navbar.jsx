import React, { useState, useEffect } from "react";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Button,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <BootstrapNavbar
      expanded={expanded}
      expand="lg"
      fixed="top"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand">
          {/* <img
            src="./src/assets/icon.png"
            alt="SocialFeed Logo"
            className="d-inline-block align-top logo"
          /> */}
          <span className="brand-text">SocialFeed</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded(!expanded)}
          className="navbar-toggler"
        />
        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleNavClick}
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/features"
              onClick={handleNavClick}
              className={location.pathname === "/features" ? "active" : ""}
            >
              Features
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              onClick={handleNavClick}
              className={location.pathname === "/about" ? "active" : ""}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news"
              onClick={handleNavClick}
              className={location.pathname === "/news" ? "active" : ""}
            >
              Tech News
            </Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => {
                navigate("/login");
                handleNavClick();
              }}
            >
              Login
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/signup");
                handleNavClick();
              }}
            >
              Sign Up
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavBar;
