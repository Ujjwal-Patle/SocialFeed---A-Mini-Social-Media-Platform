import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import "../login/login.css";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Username is required.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  }
  return errors;
};

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, token } = useAuth();

  useEffect(() => {
    if (token) navigate("/feed");
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(validate({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    setErrors(validate(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ username: true, password: true });
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      const response = await login(formData.username, formData.password);
      if (response.token) {
        toast.success("Login successful!");
        navigate("/feed");
      }
    } catch (error) {
      toast.error(error.response?.data || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-outer-container">
      <div className="login-card-2col">
        
        <div className="login-form-col">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control${errors.username && touched.username ? " is-invalid" : ""}`}
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                minLength={3}
                maxLength={20}
                required
                autoComplete="username"
                placeholder="Enter your username"
              />
              {errors.username && touched.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control${errors.password && touched.password ? " is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                minLength={6}
                maxLength={32}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="login-button"
              disabled={loading || Object.keys(errors).length > 0}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="auth-link mt-3">
            Don't have an account? <Link to="/signup">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
