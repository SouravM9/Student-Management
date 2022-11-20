import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function Detail() {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState(0);
    const [password, setPassword] = useState('');
    const [assignment, setAssignment] = useState('Not Submitted');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {

        let url = window.location.href;
        setId(url.substring(url.lastIndexOf('/') + 1));

        fetch("/students/" + localStorage.getItem("currentUser"), {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.userType === 'admin') {
                    setIsAdmin(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );
        console.log(selectedFile);

        // axios.post("api/uploadfile", formData);

        updateStudent();
    };

    fetch("/students/" + id, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(result => {
            setRoll(result.roll);
            setName(result.name);
            setEmail(result.email);
            setPassword(result.password);
            setAssignment(result.assignment);
            if (result.userType === 'student') {
                setIsStudent(true);
            }
        })
        .catch(err => {
            console.log(err);
        });

    const updateStudent = () => {

        fetch("/students/update/" + id, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                roll: roll,
                email: email,
                password: password,
                assignment: "Submitted"
            })
        })
            .then(res => res.json())
            .then(data => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });

    }

    const deleteRecord = () => {


        fetch("/students/" + id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                window.location = '/';
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            {
                name ?

                    <div>
                        <h3> Detail </h3>

                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{roll}</Card.Subtitle>
                                <Card.Text>{email}</Card.Text>
                                {
                                    isStudent ? <Card.Text>{assignment}</Card.Text> : <></>
                                }
                            </Card.Body>
                        </Card>
                        {
                            isAdmin ?
                                <div>
                                    <Link to={'/edit/' + id}>
                                        <Button
                                            style={{ color: 'green' }}
                                        >Edit</Button>
                                    </Link>

                                    <Button
                                        onClick={deleteRecord}
                                        style={{ color: 'red' }}
                                    >Delete</Button>
                                </div>
                                :
                                <div className='uploading'>
                                    <input type="file" onChange={onFileChange} />
                                    <Button
                                        onClick={onFileUpload}
                                    >
                                        Upload File
                                    </Button>
                                </div>
                        }
                    </div>
                    :
                    <h1>Loading.. Please Wait!!</h1>
            }

        </>
    )
}

export default Detail
