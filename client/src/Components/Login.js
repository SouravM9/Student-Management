import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            iserror: false
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get('http://localhost:5000/students/login/' + this.state.email + '/' + this.state.password)
            .then(response => {
                if (response.data.length > 0){
                    window.location = '/';
                    
                }
                else{
                    
                    this.setState({
                        iserror: true
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="container">
            <h3>Sign in</h3>

                <Form onSubmit={this.onSubmit}>
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
                    { this.state.iserror ? <div style={{ color: "red"}}className='errorMessage'>Invalid Credentials</div> : <div></div> }
                    <Button variant="outline-light" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}

