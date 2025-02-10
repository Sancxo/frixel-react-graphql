import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";

const getUserQuery = gql`
  query getUserQuery (
    $id: ID!
  ) {
    user(id: $id) {
      id
      fullName
      isAdmin
      posts {
        id
        title
        slug
        publishedAt
      }
    }
  }
`

const ShowUser = _ => {
  const { userId } = useParams();
  const { data } = useQuery(getUserQuery, { variables: { id: userId } });

  return (
    <div style={{textAlign: "center", margin: "5rem auto", maxWidth: "1200px"}}>
      {data && (
        <>
          <h2>{data.user.fullName}</h2>
          <p>{data.user.isAdmin && "Admin"}</p>

          <h3>Posts: </h3>

          <ul style={{listStyle: "none"}}>
            {data.user.posts.map(post => (
              <li key={`list-item-${post.id}`}><Link key={`link-${post.id}`} to={`/posts/${post.slug}`}>{ post.title }</Link> (published on: {post.publishedAt})</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ShowUser;
