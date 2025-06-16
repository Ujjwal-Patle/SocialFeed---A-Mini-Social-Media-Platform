import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Features from '../Features/Features';
import About from '../About/About';
import './Hero.css';

const Hero = () => {
  return (
    <>
      <div className="hero-section">
        {/* Animated SVG background */}
        <svg className="hero-bg-svg" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none'}} aria-hidden="true">
          <path fill="#6c63ff" fillOpacity="0.08" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              {/* <span className="hero-badge">#1 Social Platform</span> */}
              <h1 className="hero-title">Connect. Share. Explore.</h1>
              <p className="hero-subtitle">Where real stories meet real people. Experience a new era of social connection.</p>
              <p className="hero-description">
                Join our vibrant community where ideas flow freely, connections are made,
                and stories come to life. Share your thoughts, engage with others,
                and be part of something bigger.
              </p>
              <div className="hero-buttons">
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline-primary" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
              {/* <div className="hero-stats mt-5">
                <div className="d-flex justify-content-start gap-5">
                  <div className="stat-item">
                    <h3>10K+</h3>
                    <p>Active Users</p>
                  </div>
                  <div className="stat-item">
                    <h3>50K+</h3>
                    <p>Posts Shared</p>
                  </div>
                  <div className="stat-item">
                    <h3>24/7</h3>
                    <p>Support</p>
                  </div>
                </div>
              </div> */}
              <div className="hero-testimonial mt-4">
                <blockquote>
                  <span className="quote-mark">“</span>
                  <span className="quote-text">This platform helped me find my voice and connect with amazing people worldwide!</span>
                  <span className="quote-author">— Happy User</span>
                </blockquote>
              </div>
            </Col>
            <Col lg={6} className="hero-image">
              <img
                src="/src/assets/newImage.jpg"
                alt="Social Feed Platform Illustration"
                className="img-fluid floating-animation"
                aria-label="Landing page illustration"
                style={{ maxHeight: '420px', width: '100%', objectFit: 'contain', boxShadow: '0 8px 32px rgba(60,72,100,0.10)' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Features />
      <About />
    </>
  );
};

export default Hero; 