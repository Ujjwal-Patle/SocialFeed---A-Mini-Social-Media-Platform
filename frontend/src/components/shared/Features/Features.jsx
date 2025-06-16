import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faHeart, 
  faUserFriends, 
  faBell 
} from '@fortawesome/free-solid-svg-icons';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: faEdit,
      title: 'Post Creation & Feed',
      description: 'Share your thoughts, images, and stories with our intuitive post creation system. Enjoy a personalized feed that keeps you updated with content you care about.'
    },
    {
      icon: faHeart,
      title: 'Like & Comment System',
      description: 'Engage with content through likes and comments. Foster meaningful discussions and show appreciation for content that resonates with you.'
    },
    {
      icon: faUserFriends,
      title: 'Follow System',
      description: 'Connect with like-minded individuals, follow your favorite creators, and build your own community of followers.'
    },
    {
      icon: faBell,
      title: 'Real-time Notifications',
      description: 'Stay updated with instant notifications about likes, comments, follows, and mentions. Never miss an important interaction.'
    }
  ];

  const iconColors = [
    '#222', // Post Creation & Feed (black)
    '#e53935', // Like & Comment System (red)
    '#1976d2', // Follow System (blue)
    '#43a047', // Real-time Notifications (green)
  ];

  return (
  
    <section className="features-section mt-5" id="features">
      <Container  >
        <h2 className="section-title text-center mb-2">Platform Features</h2>
        <p className="section-subtitle text-center mb-5">Everything you need to connect, share, and grow your community</p>
        <Row>
          {features.map((feature, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Body className="text-center">
                  <div className="feature-icon" aria-label={feature.title} style={{ fontSize: '2.2rem', background: 'rgba(245,248,255,0.85)', boxShadow: '0 4px 16px rgba(102,99,255,0.13)' }}>
                    <FontAwesomeIcon icon={feature.icon} style={{ color: iconColors[index] }} />
                  </div>
                  <Card.Title className="mt-4 mb-3">{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features; 