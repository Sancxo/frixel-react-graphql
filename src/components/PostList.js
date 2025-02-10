import React from "react";
import Post from "./Post";
import { useQuery, gql } from '@apollo/client';

export const postListQuery = gql`
  {
    posts {
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

const newPostSubscription = gql`
  subscription {
    newPost {
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

const PostList = _ => {
  const { data, loading, error, subscribeToMore } = useQuery(postListQuery);


  subscribeToMore({
    document: newPostSubscription,
    updateQuery: (prev, { subscriptionData }) => {
      console.log("prev", prev)
      console.log("Subscription data", subscriptionData.data)
      if (!subscriptionData.data) return prev;


      const newPost = subscriptionData.data.newPost;
      const exists = prev.posts.find(({ id }) => id === newPost.id);

      if (exists) return prev;

      return Object.assign({}, prev, {
        posts: [newPost, ...prev.posts],
        __typename: prev.__typename
      })
    },
    onError: error => console.error("Error:", error)
  });

  return (
    <div>
      {data && (
        <>
          {data.posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  )
}

export default PostList;
