import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const Student = props => (
    <tr>
        <td>{props.student.roll}</td>
        <td>{props.student.name}</td>
        <td>{props.student.email}</td>
        <td>{props.student.assignment}</td>
    </tr>
)

export default class Home extends Component {

    constructor(props) {
        super(props);


        this.state = { students: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/students/')
            .then(response => {
                this.setState({ students: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    studentList() {
        return this.state.students.map(student => {
            return <Student student={student} key={student._id} />;
        })
    }


    render() {
        return (
            <div>
                <h3>All Students</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Roll</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Assignment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.studentList()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

