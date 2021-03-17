import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class LoginPage extends Component {
  onSubmit(e) {
    e.preventDefault();
    if (e.target[0].value === "admin" && e.target[1].value === "admin") {
      localStorage.setItem("token", "sadf2JC89U2T84IJSAKDM9ioji8ru39y8g9euf023djkd30992uf583");
      this.props.history.push("/admin");
    } else {
      alert("Username/Password anda salah !");
    }

    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
  }

  render() {
    return (
      <Form onSubmit={(e) => this.onSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
