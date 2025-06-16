import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <Container >
        <Row className="align-items-center">
          <Col lg={6} className="about-image">
            <img
              src="./src/assets/ChatGPT Image Jun 4, 2025, 11_04_32 AM.png"
              alt="About SocialFeed"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col lg={6} className="about-content">
            <h2 className="section-title">Why SocialFeed?</h2>
            <p className="section-subtitle mb-4">A platform built for genuine connections and meaningful conversations</p>
            <p className="about-description">
              SocialFeed was born from a simple idea: to create a space where people can
              connect authentically and share what matters most to them. We believe in
              the power of genuine connections and meaningful conversations.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <h4>🌟 Our Mission</h4>
                <p>To foster genuine connections and empower voices in the digital age.</p>
              </div>
              <div className="feature-item">
                <h4>💡 Our Vision</h4>
                <p>Creating a platform where every story finds its audience and every voice matters.</p>
              </div>
              <div className="feature-item">
                <h4>🤝 Our Values</h4>
                <p>Authenticity, Privacy, Community, and Innovation drive everything we do.</p>
              </div>
            </div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center mt-5 mb-4">Meet The Creators</h2>
          <p className="text-center mb-5">The brilliant minds behind SocailFeed</p>
          
          <Row className="justify-content-center g-4">
            {[
              {
                name: "Ujjwal Patle",
                role: "Developer",
                image: "./src/assets/ujjwal.jpeg", 
                bio: "Full Stack Developer passionate about building impactful digital experiences."
              },
              {
                name: "Mrunali Jangam",
                role: "Developer",
                image: "./src/assets/mrunali.jpg",
                bio: "Frontend specialist with a love for beautiful, user-friendly interfaces."
              },
              {
                name: "Lakshit Dogra",
                role: "Developer",
                image: "./src/assets/IMG_3474.jpg",
                bio: "Backend and DevOps enthusiast, ensuring everything runs smoothly."
              }
            ].map((creator, index) => (
              <Col key={index} lg={4} md={6}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="creator-card h-100 p-4 text-center shadow rounded"
                >
                  <div className="creator-image mb-3">
                    <img 
                      src={creator.image} 
                      alt={creator.name}
                      className="img-fluid rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="mb-2">{creator.name}</h3>
                  <p className="text-primary mb-3">{creator.role}</p>
                  <p>{creator.bio}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center mt-5 mb-4">Mentors & Guides</h2>
          <p className="text-center mb-5">Meet the mentors and guides who inspire and support our journey</p>
          <Row className="justify-content-center g-4 mb-5">
            {[
              {
                name: "Dr. Kiran Waghmare",
                role: "Lead Mentor",
                image: "./src/assets/kiranMaam.jpeg",
                bio: "Expert in community building and digital education. Passionate about guiding the next generation."
              },
              {
                name: "Mr. Vipul Tembulwar",
                role: "Senior Guide",
                image: "./src/assets/vipulSir.jpeg",
                bio: "Seasoned advisor with a background in technology and innovation. Always ready to help."
              },
              {
                name: "Mrs. Shweta Bhere",
                role: "Senior Guide",
                image: "./src/assets/shwetaMaam.jpeg",
                bio: "Seasoned advisor with a background in technology and innovation. Always ready to help."
              }
            ].map((mentor, index) => (
              <Col key={index} lg={4} md={6}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="creator-card h-100 p-4 text-center shadow rounded"
                >
                  <div className="creator-image mb-3">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name}
                      className="img-fluid rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="mb-2">{mentor.name}</h3>
                  <p className="text-primary mb-3">{mentor.role}</p>
                  <p>{mentor.bio}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
        
      </Container>
    </section>
  );
};

export default About; 