import React, { useState, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaCloudUploadAlt, FaTimes, FaExclamationCircle } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./postbox.css";

const PostBox = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { user, token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !file) {
      setError("Please enter some content or upload an image");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }
      formData.append("userId", user.id);

      const response = await axios.post(
        "http://localhost:8080/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");
      setFile(null);
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please upload an image file");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setError("");
      } else {
        setError("Please upload an image file");
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="post-box">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className="post-input"
            />
          </Form.Group>

          <div
            className={`upload-area ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
              disabled={loading}
            />
            <FaCloudUploadAlt className="upload-icon" />
            <p className="upload-text">Drag and drop an image here</p>
            <p className="upload-hint">or click to browse</p>
          </div>

          {file && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="preview-img"
              />
              <button
                type="button"
                className="remove-image"
                onClick={removeFile}
                disabled={loading}
              >
                <FaTimes />
              </button>
            </div>
          )}

          {error && (
            <div className="error-message">
              <FaExclamationCircle />
              {error}
            </div>
          )}

          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              className="submit-button"
              disabled={loading || (!content.trim() && !file)}
            >
              {loading ? (
                <>
                  <span className="loading-spinner" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PostBox;
