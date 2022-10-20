import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            roll: 0,
            password: '',
            assignment: "Not Submitted",
            selectedFile: null
        }
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);

        // axios.post("api/uploadfile", formData);

        this.updateStudent();
    };

    componentDidMount() {
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        axios.get('http://localhost:5000/students/' + id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    roll: response.data.roll,
                    email: response.data.email,
                    password: response.data.password,
                    assignment: response.data.assignment
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    updateStudent() {
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);

        const student = {
            name: this.state.name,
            roll: this.state.roll,
            email: this.state.email,
            password: this.state.password,
            assignment: "Submitted"
        }

        console.log(student);

        axios.post('http://localhost:5000/students/update/' + id, student)
            .then(res => console.log(res.data));

         window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Detail</h3>

                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{this.state.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.state.roll}</Card.Subtitle>
                        <Card.Text>{this.state.email}</Card.Text>
                        <Card.Text>{this.state.assignment}</Card.Text>
                    </Card.Body>
                </Card>
                <div >
                    <input type="file" onChange={this.onFileChange} />
                    <Button onClick={this.onFileUpload}>
                        Upload!
                    </Button>
                </div>
            </div>
        )
    }
}