import React from "react";
import { Link } from "react-router-dom";

const Post = ({post}) => {
  return (
    <div style={{textAlign: "center", margin: "5rem auto", maxWidth: "1200px"}}>
      <Link to={`/posts/${post.slug}`}><h2>{post.title}</h2></Link>

      <p>{post.body}</p>

      <p><small>{post.publishedAt} by <Link to={`/users/${post.user.id}`}>{post.user.fullName}</Link></small></p>
    </div>
  )
}

export default Post;
