import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

export default function Login() {


  const [username, setusername] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return username.length > 0 && password.length > 0;

  };



  return (

    <div className="Login">

      <form onSubmit={ async(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement

        const formData = new FormData(form);
        await fetch("http://localhost:3000/login", {
          method: "Post",
          headers: { "Content-Type": "login/json" },
          body: formData,
        }
        )
      }  
    }
    >

        <Form.Group controlId="username">

          <Form.Label>Username :</Form.Label>

          <Form.Control


            type="usernames"

            value={username}

            onChange={(e) => setusername(e.target.value)}

          />

        </Form.Group>

        <Form.Group  controlId="password">

          <Form.Label>Password</Form.Label>

          <Form.Control

            type="password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

        </Form.Group>

        <Button  size="lg" type="submit" disabled={!validateForm()}>

          Login

        </Button>

      </form>

    </div>

  );

}