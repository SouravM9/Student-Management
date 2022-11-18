import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RegisterFaculty() {

    const [name, setName] = useState('');
    const [roll, setRoll] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {

        fetch("/students/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roll: roll,
                name: name,
                password: password,
                email: email,
                userType: 'admin'
            })
        })
            .then(res => res.json())
            .then(data => {
            })
            .catch(err => {
                console.log(err);
            });

         window.location = '/login';
    }

    return (
        <div className="container">
            <h3>Faculty Registration</h3>

            <Form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Employee Id</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Employee Id"
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="outline-light" type="submit" onClick={onSubmit}>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default RegisterFaculty
