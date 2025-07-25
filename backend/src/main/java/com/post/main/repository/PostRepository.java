package com.post.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.post.main.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);

    @Modifying
    @Query("DELETE FROM Post p WHERE p.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    List<Post> findAllByOrderByCreatedAtDesc();
}
