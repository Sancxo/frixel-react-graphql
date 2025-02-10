import { gql, useMutation } from "@apollo/client";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const logInMutation = gql`
mutation LogInMutation(
  $fullName: String!,
  $password: String!
) {
  logIn(fullName: $fullName, password: $password) {
    id
  }
}
`;

const Login = _ => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ fullName: '', password: '' });
  const [logIn] = useMutation(logInMutation, { variables: { fullName: formState.fullName, password: formState.password }, onCompleted: _ => {localStorage.setItem("connection_status", "signed_in"); navigate('/');} });

  return (
    <form onSubmit={e => { e.preventDefault(); logIn()}} style={{display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px", margin: "auto", textAlign: "center"}}>
      <h2>Log in</h2>

      <input type="text" placeholder="Type your first and last names here" value={formState.fullName} onChange={e => setFormState({...formState, fullName: e.target.value})} />

      <input type="password" placeholder="Type your password here" value={formState.password} onChange={e => setFormState({...formState, password: e.target.value})} />

      <button type="submit">Log in</button>
    </form>
  )
}

export default Login;
