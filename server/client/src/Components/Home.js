import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Student = props => (
    <tr>
        <td>{props.student.roll}</td>
        <td>{props.student.name}</td>
        <td>{props.student.email}</td>
        <td>{props.student.assignment}</td>
        <td><Link to={"/detail/" + props.student._id}><Button variant="outline-light">View Detail</Button></Link>
        </td>
    </tr>
)

function Home() {

    const [students, setStudents] = useState([]);

    useEffect(() => {

        fetch("/students", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(result => {
                setStudents(result);
            })
    }, [])

    return (
        <div>
            <h3>All Students</h3>
            <Table striped bordered hover variant="primary">
                <thead>
                    <tr>
                        <th>Roll</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Assignment</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student => {
                            return <Student student={student} key={student._id} />;
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Home;