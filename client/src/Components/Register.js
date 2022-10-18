import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRoll = this.onChangeRoll.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      roll: 0,
      email: '',
      password: '',
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangeRoll(e) {
    this.setState({
      roll: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const student = {
      name: this.state.name,
      roll: this.state.roll,
      email: this.state.email,
      password: this.state.password
    }

    console.log(student);

    axios.post('http://localhost:5000/students/register', student)
      .then(res => console.log(res.data));

    window.location = '/login';
  }

  render() {
    return (
      <div className="container">
        <h3>New Registration</h3>

        <Form onSubmit={this.onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>University Roll</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter University Roll"
              value={this.state.roll}
              onChange={this.onChangeRoll}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={this.onChangeName}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Register
          </Button>
        </Form>
      </div>
    )
  }
}

