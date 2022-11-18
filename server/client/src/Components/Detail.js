import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Detail() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState(0);
    const [password, setPassword] = useState('');
    const [assignment, setAssignment] = useState('Not Submitted');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

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

    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);

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
        })
        .catch(err => {
            console.log(err);
        });

    const updateStudent = () => {
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);

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

        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);

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
        <div>
            <h3>Detail</h3>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{roll}</Card.Subtitle>
                    <Card.Text>{email}</Card.Text>
                    <Card.Text>{assignment}</Card.Text>
                </Card.Body>
            </Card>
            {
                isAdmin ?
                    <div>
                        <Button
                            onClick={deleteRecord}
                            style={{ color: 'red' }}
                        >Delete Record</Button>
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
    )
}

export default Detail
