import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const onSubmit = () => {

        fetch("/students/login/" + email + "/" + password, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.length > 0) {
                    localStorage.setItem("currentUser", result[0]._id);
                    if(result[0].userType === 'student')
                    {
                        window.location = '/detail/' + result[0]._id;
                    }
                    else
                    {
                        window.location = '/';
                    }                
                }
                else {
                    setIsError(true);
                }
            })
    }

    return (
        <div className="container">
            <h3>Sign in</h3>

            <Form onSubmit={(e) => e.preventDefault()}>
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
                {isError ? <div style={{ color: "red" }} className='errorMessage'>Invalid Credentials</div> : <div></div>}
                <Button variant="outline-light" type="submit" onClick={onSubmit}>
                    Login
                </Button>
                <Link to={"/register"}><h5>Don't have an Account?</h5> </Link>
            </Form>
        </div >
    )
}

export default Login
