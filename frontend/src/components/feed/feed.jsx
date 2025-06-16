import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Sidebar from "../shared/Sidebar/Sidebar";
import PostBox from "../postbox/postbox";
import PostCard from "./postcard";
import WeatherApp from "../weather/weather.jsx";
import { useAuth } from "../../context/AuthContext";
import ImageSearch from "../ImageSearch/ImageSearch";

import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch posts on load
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 403) {
          logout();
          navigate("/login");
          return;
        }

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, navigate, logout]);

  // Post handlers
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prev) => prev.filter((p) => p.id !== deletedPostId));
  };

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  if (!token) return null;

  return (
    <>
      <div className="feed-container d-flex">
        <Sidebar onToggle={handleSidebarToggle} />

        <Container
          fluid
          className={`feed-main ${!isSidebarOpen ? "sidebar-closed" : ""}`}
        >
          <Row className="justify-content-center">
            <Col md={8}>
              <PostBox onPostCreated={handlePostCreated} />
            </Col>
            <Col md={8}>
              <div className="post-section">
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}

                {loading ? (
                  <div className="text-center mt-4">
                    <Spinner animation="border" />
                    <p className="mt-2">Loading posts...</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onPostUpdated={handlePostUpdated}
                      onPostDeleted={handlePostDeleted}
                    />
                  ))
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <WeatherApp />
      </div>
    </>
  );
};

export default Feed;
