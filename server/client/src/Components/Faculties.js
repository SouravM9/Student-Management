import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Faculty = props => (
    <tr>
        <td>{props.faculty.roll}</td>
        <td>{props.faculty.name}</td>
        <td>{props.faculty.email}</td>
        <td><Link to={"/detail/" + props.faculty._id}><Button variant="outline-light">View Detail</Button></Link>
        </td>
    </tr>
)

function Faculties() {

    const [faculties, setFaculties] = useState([]);

    useEffect(() => {

        fetch("/students/faculties", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(result => {
                setFaculties(result);
            })
    }, [])

    return (
        <div>
            <h3>All Faculties</h3>
            <Table striped bordered hover variant="primary">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        faculties.map(faculty => {
                            return <Faculty faculty={faculty} key={faculty._id} />;
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Faculties;