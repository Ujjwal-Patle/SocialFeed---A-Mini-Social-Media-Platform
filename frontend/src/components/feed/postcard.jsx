import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faEdit,
  faTrash,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../../context/AuthContext";
import "./PostCard.css";

const API_URL = "http://localhost:8080";

function PostCard({ post, onPostUpdated, onPostDeleted }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editFile, setEditFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user, token } = useAuth();
  const [canDelete, setCanDelete] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return "Just now";
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!post?.id || !token) return;
      setIsLoading(true);

      try {
        const [commentsRes, countRes, userLikeRes] = await Promise.all([
          axios.get(`${API_URL}/api/comments/post/${post.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/likes/post/${post.id}/count`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/likes/post/${post.id}/user/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (isMounted) {
          setComments(commentsRes.data);
          setLikeCount(Number(countRes.data) || 0);
          setIsLiked(Boolean(userLikeRes.data));
          
          // Set permissions
          const isAdmin = user.role === "ADMIN";
          const isPostOwner = post.user.id === user.id;
          setCanDelete(isAdmin || isPostOwner);
          setCanEdit(isPostOwner);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to load post data");
          console.error("Error:", error);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [post?.id, user?.id, token]);

  const handleLike = async () => {
    if (!user || !token || isLiking) return;
    setIsLiking(true);

    try {
      if (isLiked) {
        await axios.delete(
          `${API_URL}/api/likes/post/${post.id}/user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikeCount(prev => prev - 1);
      } else {
        await axios.post(
          `${API_URL}/api/likes`,
          { postId: post.id, userId: user.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !token || isCommenting) return;
    setIsCommenting(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/comments`,
        {
          content: newComment,
          user: { id: user.id },
          post: { id: post.id },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments(prev => [{
        ...response.data,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          userpfp: user.userpfp,
        },
      }, ...prev]);
      setNewComment("");
    } catch (error) {
      setError("Failed to post comment");
      console.error("Error:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;
    setIsEditing(true);

    try {
      const formData = new FormData();
      formData.append("content", editContent);
      if (editFile) formData.append("file", editFile);

      const response = await axios.put(
        `${API_URL}/api/posts/${post.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onPostUpdated(response.data);
      setShowEditModal(false);
      setEditFile(null);
    } catch (error) {
      setError("Failed to update post");
      console.error("Error:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${API_URL}/api/posts/${post.id}?userId=${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onPostDeleted(post.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data || "Delete failed");
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <img
            src={`http://localhost:8080/${post.user.userpfp}`}
            alt={post.user.name}
            className="profile-pic"
            onError={(e) => {
              e.target.src = "/default-profile.png";
            }}
          />
          <div className="user-details">
            <p className="user-name">{post.user.name}</p>
            <p className="user-username">@{post.user.username}</p>
            <p className="post-time">{formatTimeAgo(post.createdAt)}</p>
          </div>
        </div>

        {(canEdit || canDelete) && (
          <div className="post-actions-owner">
            {canEdit && (
              <button
                className="edit-button"
                onClick={() => setShowEditModal(true)}
                disabled={isEditing}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
            {canDelete && (
              <button
                className="delete-button"
                onClick={() => setShowDeleteModal(true)}
                disabled={isEditing}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="post-content">{post.content}</div>

      {post.image && (
        <div className="post-image-container">
          <img
            src={`http://localhost:8080/${post.image}`}
            alt="Post content"
            className="post-image"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="post-actions">
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          disabled={isLiking}
        >
          <FontAwesomeIcon
            icon={isLiked ? faHeart : faHeartRegular}
            className="action-icon"
          />
          {likeCount}
        </button>
        <button
          className="comment-button"
          onClick={() => setShowComments(!showComments)}
        >
          <FontAwesomeIcon icon={faComment} className="action-icon" />
          {comments.length}
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={2}
              disabled={isCommenting}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!newComment.trim() || isCommenting}
              className="submit-button"
            >
              {isCommenting ? "Posting..." : "Post"}
            </Button>
          </form>

          {error && (
            <div className="error-message">
              <FontAwesomeIcon icon={faExclamationCircle} />
              {error}
            </div>
          )}

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <img
                    src={`http://localhost:8080/${comment.user.userpfp}`}
                    alt={comment.user.name}
                    className="comment-user-image"
                  />
                  <div className="comment-user-info">
                    <strong>{comment.user.name}</strong>
                    <span>@{comment.user.username}</span>
                  </div>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setEditContent(post.content);
          setEditFile(null);
          setError(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="What's on your mind?"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Update Image (Optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setEditFile(e.target.files[0])}
              />
              {post.image && (
                <small className="text-muted">
                  Current image will be replaced
                </small>
              )}
            </Form.Group>
            {error && (
              <div className="error-message">
                <FontAwesomeIcon icon={faExclamationCircle} />
                {error}
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            disabled={isEditing}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdatePost}
            disabled={isEditing || !editContent.trim()}
          >
            {isEditing ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeletePost}
            disabled={isEditing}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostCard;