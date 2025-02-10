import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const logOutMutation = gql`
  mutation LogOutMutation {
    logOut {
      id
    }
  }
`

const Header = _ => {
  const navigate = useNavigate('/');
  const connectionStatus = localStorage.getItem("connection_status");
  const [logOut] = useMutation(logOutMutation, { onCompleted: _ => {localStorage.removeItem("connection_status"); navigate('/')}})

  return (
    <div style={{display: "flex", justifyContent: "space-between", margin: "auto 5rem"}}>
      <Link to="/"><p>IG Actus</p></Link>
      <div style={{display: "flex", justifyContent: "space-around", width: "33%"}}>
        <Link to="/"><p>Blog feed</p></Link>
        {connectionStatus === "signed_in" && (
          <>
            <p>|</p>
            <Link to="/create"><p>Publish</p></Link>
          </>
        )}
        <p>|</p>
        {connectionStatus === "signed_in" ? (
          <Link onClick={e => { e.preventDefault(); logOut() }}><p>Log out</p></Link>
        ) : (
          <Link to="/login"><p>Log in</p></Link>
        )}
      </div>
    </div>
  )
}

export default Header;
