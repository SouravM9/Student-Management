import React, { useState, useEffect } from 'react'

function EditDetails() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState(0);
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {

        let url = window.location.href;
        setId(url.substring(url.lastIndexOf('/') + 1));

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

                if (result.userType === 'student') {
                    setIsStudent(true);
                }
            })
            .catch(err => {
                console.log(err);
            });

    }, [id])



    const editRecord = () => {
        fetch("/students/edit/" + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roll: roll,
                name: name,
            })
        })
            .then(res => res.json())
            .then(data => {
                window.location = '/detail/' + id;
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            {
                name
                    ?
                    < form >
                        <div className="form-group">
                            {isStudent ? <label>University Roll </label> : <label> Employee Id </label>}
                            <input type="text" className="form-control" value={roll}
                                onChange={(e) => setRoll(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-sm-10">
                            <label>Email</label>
                            <input className="form-control" type="text" value={email} readOnly />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={editRecord}>Submit</button>
                    </form>
                    : <h1> Loading... Please Wait!! </h1>
            }

        </div>
    )
}

export default EditDetails