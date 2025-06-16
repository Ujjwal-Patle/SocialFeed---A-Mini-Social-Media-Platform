import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
  console.log('API Key:', apiKey);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch news. Try again later.");
        setLoading(false);
      });
  }, [url]);

  return (
    <Container className="my-4 mt-5">
      <h2 className="mb-4">📰 TechCrunch Headlines</h2>

      {loading ? (
        <div className="text-center"><Spinner animation="border" variant="primary" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {articles.map((article, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={article.urlToImage || "https://via.placeholder.com/300x180"}
                  alt="news"
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description || "No description available."}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read More →
                  </a>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default NewsFeed;
