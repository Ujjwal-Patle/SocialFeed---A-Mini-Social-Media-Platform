import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaCamera,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      setIsOpen(!mobile);
      onToggle && onToggle(!mobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="sidebar loading">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <img
            src={`http://localhost:8080/${user.userpfp}`}
            alt="Profile"
            className="profile-picture"
          />
          <h3>{user.name}</h3>
          <p className="username">@{user.username}</p>
        </div>
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/feed"
            className={`sidebar-link ${isActive("/feed") ? "active" : ""}`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaHome className="icon" /> Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`/profile/${user.id}`}
            className={`sidebar-link ${
              isActive(`/profile/${user.id}`) ? "active" : ""
            }`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaUser className="icon" /> Profile
          </Nav.Link>
          {/* <Nav.Link
            as={Link}
            to="/notifications"
            className={`sidebar-link ${isActive("/notifications") ? "active" : ""}`}
          >
            <FaBell className="icon" /> Notifications
          </Nav.Link> */}
          <Nav.Link
            as={Link}
            to="/imagesearch"
            className={`sidebar-link ${
              isActive("/imagesearch") ? "active" : ""
            }`}
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaCamera className="icon" /> Image Search
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="sidebar-link">
            <FaSignOutAlt className="icon" /> Logout
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
