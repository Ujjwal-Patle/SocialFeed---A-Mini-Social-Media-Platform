import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/shared/Navbar/Navbar";
import Hero from "./components/shared/Hero/Hero";
import Features from "./components/shared/Features/Features";
import About from "./components/shared/About/About";
import Footer from "./components/shared/Footer/Footer";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Feed from "./components/feed/feed";
import RegisterForm from "./components/signup/signup";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Spinner } from "react-bootstrap";
import WeatherApp from "./components/weather/weather";
import ImageSearch from "./components/ImageSearch/ImageSearch";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import NewsFeed from "./components/newsApi/NewsFeed";

const PrivateRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      
    );
  }

  return token ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === "/feed" || location.pathname.startsWith("/profile/");
  const showSidebarOnly = location.pathname === "/imagesearch";

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      {!hideNavAndFooter && !showSidebarOnly && <Navbar />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/news" element={ <NewsFeed/>} />

        <Route
          path="/imagesearch"
          element={
            <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)' }}>
              <Sidebar />
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginLeft: 280,
                  transition: 'margin 0.3s',
                }}
                className="imagesearch-main-content"
              >
                <ImageSearch />
               
              </div>
            </div>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideNavAndFooter && !showSidebarOnly && <Footer />}
    </AuthProvider>
  );
}

export default App;
