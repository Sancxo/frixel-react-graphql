import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { postListQuery } from "./PostList";

const createPostMutation = gql`
  mutation CreatePostMutation (
    $title: String!
    $slug: String!
    $body: String!
  ) {
      createPost(title: $title, body: $body, slug: $slug) {
        id
        slug
        publishedAt
        title
        body
        user {
          id
          fullName
        }
      }
    }
`

const CreatePost = _ => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ title: '', body: '', slug: '' });
  const [createPost] = useMutation(createPostMutation, {
    variables: {
      title: formState.title,
      body: formState.body,
      slug: formState.slug
    },
    update: (cache, { data: {createPost} }) => {
      const { posts } = cache.readQuery({ query: postListQuery });

      cache.writeQuery({
        query: postListQuery,
        data: {
          posts: [createPost, ...posts]
        }
      })
    },
    onCompleted: _ => navigate('/')
  });

  return (
    <form onSubmit={e => { e.preventDefault(); createPost(); }} style={{display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "900px", margin: "auto", textAlign: "center"}}>
      <h2>Create a post</h2>

      <input type="text" placeholder="Write post title here ..." value={formState.title} onChange={e => { setFormState({ ...formState, title: e.target.value }) }} />

      <input type="text" placeholder="Write post slug here ..." value={formState.slug} onChange={e => { setFormState({ ...formState, slug: e.target.value }) }} />

      <textarea rows={25} placeholder="Write post body here ..." value={formState.body} onChange={e => { setFormState({ ...formState, body: e.target.value }) }}></textarea>

      <button type="submit">Submit</button>
    </form>
  )
}

export default CreatePost;
