import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

const getPostQuery = gql`
  query GetPostQuery (
    $slug: String!
  ) {
    post(slug: $slug) {
      id
      slug
      title
      body
      publishedAt
      user {
        id
        fullName
      }
    }
  }
`

const ShowPost = _ => {
  const { slug } = useParams();
  const { data } = useQuery(getPostQuery, {variables: {slug: slug}});

  return(
    data && <Post post={data.post} />
  )
}

export default ShowPost;
