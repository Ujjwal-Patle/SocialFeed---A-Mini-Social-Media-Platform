import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

// Enhanced validation function
const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Full name is required.";
  } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
    errors.name = "Name can only contain letters and spaces.";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (values.name.length > 40) {
    errors.name = "Name must be less than 40 characters.";
  }

  if (!values.username.trim()) {
    errors.username = "Username is required.";
  } else if (!/^[a-zA-Z0-9_.]+$/.test(values.username)) {
    errors.username = "Username can only contain letters, numbers, underscores, or dots.";
  } else if (values.username.length < 3) {
    errors.username = "Username must be at least 3 characters.";
  } else if (values.username.length > 20) {
    errors.username = "Username must be at most 20 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    errors.email = "Invalid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  } else if (values.password.length > 32) {
    errors.password = "Password must be at most 32 characters.";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Must include at least one uppercase letter.";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Must include at least one lowercase letter.";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Must include at least one digit.";
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password = "Must include at least one special character (!@#$%^&*).";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setFormData({ ...formData, file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl("");
      }
    } else {
      const updatedData = { ...formData, [name]: value };
      setFormData(updatedData);
      setErrors(validate(updatedData));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (formData.file) {
        data.append("file", formData.file);
      }

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data) navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-outer-container" style={{ marginTop: '3.5rem' }}>
      <div className="register-card-2col">
        <div className="register-form-col">
          <div className="register-header">
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Join our community and start sharing your moments</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <div className="profile-picture-upload">
              <div className="profile-picture-preview">
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile preview" />
                ) : (
                  <div className="profile-picture-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
              <Form.Group controlId="profilePicture">
                <Form.Control
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="custom-file-input"
                />
              </Form.Group>
            </div>

            <div className="form-section">
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Full Name"
                    required
                    isInvalid={!!errors.name && touched.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email Address"
                    required
                    isInvalid={!!errors.email && touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Username"
                    required
                    isInvalid={!!errors.username && touched.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    required
                    isInvalid={!!errors.password && touched.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <Form.Group className="form-group">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm Password"
                  required
                  isInvalid={!!errors.confirmPassword && touched.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Button
              variant="primary"
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="auth-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
