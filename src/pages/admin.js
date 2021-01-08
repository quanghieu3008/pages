
import React, { useEffect, useState } from "react"

import { Modal, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from "../components/menu";
import callApiGet from '../fetchAPI/getAPI'
import "../style/blog.css"
import updateUserAPI from "../fetchAPI/updateUserAPI"
import { Link } from "gatsby"

const Admin = () => {
    const [userDetail, setUsersDetail] = useState([]);
    const [id, setId] = useState('')
    const [showScreen, setShowScreen] = useState(false);
    const [showScreenAdd, setShowScreenAdd] = useState(false);
    const [ojectStyle, setOjectStyle] = useState({})
    const [ojectTitle, setOjectTitle] = useState("")
    useEffect(() => {
        get();

    }, []);
    const get = () => {
        callApiGet()
            .then(data => setUsersDetail(data.item));

    }
    const onHandleEdit = (item) => {
        setShowScreenAdd(true);
        setOjectStyle(item);
        setId(item.id);
    }
    const onHandleTitle = (e) => {
        const { name } = e.target;
        setOjectStyle({ ...ojectStyle, [name]: e.target.value })
    }
    const updateContent = () => {
        const { nameUser, dateBirth, gtsx, phone, email, dc, webSite } = ojectStyle || ''
        if (nameUser && dateBirth && gtsx && phone && email && dc && webSite !== "") {
            updateUserAPI(ojectStyle)
                .then((res) => {
                    get();
                    setShowScreenAdd(false);
                    {
                        alert("Success");
                    }
                })
                .catch((error) => {
                    alert("Error!");
                });
        }
        else alert("Not empty");
    }
    return (
        <div>
            <div>
                {userDetail.map((item, key) => {
                    return (
                        <div key={key}>
                            <Button style={{ color: 'gray', background: 'white' }} className="btn btn-outline-secondary" onClick={() => onHandleEdit(item)}> Profile</Button>


                        </div>
                    )
                })}

                <Modal
                    size="lg"
                    show={showScreenAdd}
                    onHide={() => setShowScreenAdd(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton onClick={() => setShowScreenAdd(false)}>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Profile
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={true} onSubmit={() => updateContent} >

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>User Name </Form.Label>
                                <Form.Control minLength={1} maxLength={30} name="nameUser" defaultValue={ojectStyle.nameUser} type="title" placeholder="User Name" required onChange={onHandleTitle} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>Date </Form.Label>
                                <Form.Control defaultValue={ojectStyle.dateBirth} name="dateBirth" type="date" placeholder="Date" required onChange={onHandleTitle} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput3">
                                <Form.Label>GT </Form.Label>
                                <Form.Control minLength={1} maxLength={15} name="gtsx" defaultValue={ojectStyle.gtsx} type="title" placeholder="GT" required onChange={onHandleTitle} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput4">
                                <Form.Label>Phone </Form.Label>
                                <Form.Control minLength={1} maxLength={11} name="phone" defaultValue={ojectStyle.phone} type="number" placeholder="Phone" required onChange={onHandleTitle} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput5">
                                <Form.Label>Email </Form.Label>
                                <Form.Control minLength={1} maxLength={128} name="email" defaultValue={ojectStyle.email} type="title" placeholder="Email" required onChange={onHandleTitle} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput6">
                                <Form.Label>Address</Form.Label>
                                <Form.Control minLength={1} maxLength={128} name="dc" defaultValue={ojectStyle.dc} type="title" placeholder="Address" required onChange={onHandleTitle} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput7">
                                <Form.Label>WebSite </Form.Label>
                                <Form.Control minLength={1} maxLength={128} name="webSite" defaultValue={ojectStyle.webSite} type="title" placeholder="WebSite" required onChange={onHandleTitle} />
                            </Form.Group>
                        </Form>
                        <Button variant="primary" type="submit" onClick={updateContent} >Save</Button>

                    </Modal.Body>
                </Modal>

            </div>



        </div>
    );
}



export default Admin;