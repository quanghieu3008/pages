
import React, { useEffect, useState } from "react"

import { Modal, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from "../components/menu";
import callApiGet from '../fetchAPI/getAPI'
import "../style/blog.css"
import updateUserAPI from "../fetchAPI/updateUserAPI"
import { Link } from "gatsby"

const Admin = () => {

    const [faceUser, setFaceUser] = useState({});
    const [userDetail, setUsersDetail] = useState([]);
    const [id, setId] = useState('')
    const [nameUser, setNameUser] = useState('')
    const [dateBirth, setDateBirth] = useState('')
    const [gtsx, setGtsx] = useState('')
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dc, setDc] = useState('');
    const [webSite, setWebSite] = useState('');
    const [showScreen, setShowScreen] = useState(false);
    const [showScreenAdd, setShowScreenAdd] = useState(false);


    useEffect(() => {
        get();
        
    }, []);
    const get = () => {
        callApiGet()
            .then(data => setUsersDetail(data.item));

    }
    const onHandleEdit = (item) => {
        console.log(item, "item----------");
        setShowScreenAdd(true);
        setNameUser(item.nameUser)
        setDateBirth(item.dateBirth)
        setGtsx(item.gtsx)
        setPhone(item.phone)
        setDc(item.dc)
        setEmail(item.email)
        setWebSite(item.webSite)
        setId(item.id)

    }
    const updateContent = () => {
        if (nameUser && dateBirth && gtsx && phone && gtsx && email && dc && webSite !== "") {
            updateUserAPI({
                nameUser: nameUser,
                dateBirth: dateBirth,
                gtsx: gtsx,
                phone: phone,
                email: email,
                dc: dc,
                webSite: webSite,
                id: id
            })
                .then((res) => {
                    get();
                    setShowScreenAdd(false);
                })
                .catch((error) => {
                    alert("Error!")
                });
        }
        else alert("Not empty")
    }
    console.log(userDetail, "detail lisst ===================");
    return (
        <div>
            <Menu title={"Blog"} />

            <div>
                {userDetail.map((item, key) => {
                    return (
                        <div>
                        <h1>Hi from the second page</h1>
                        <p>Welcome to the edit info page</p>
                        
                        <div>
                        <Button  variant="outline-success"  onClick={() => onHandleEdit(item)}>Edit Profile</Button>
                        </div>
                        <Link to="/">Go back to the Blog</Link>
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
                                <Form.Control defaultValue={nameUser} type="title" placeholder="User Name" required onChange={(e) => { setNameUser(e.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>Date </Form.Label>
                                <Form.Control defaultValue={dateBirth} type="date" placeholder="Date" required onChange={(e) => { setDateBirth(e.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput3">
                                <Form.Label>GT </Form.Label>
                                <Form.Control defaultValue={gtsx} type="title" placeholder="GT" required onChange={(e) => { setGtsx(e.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput4">
                                <Form.Label>Phone </Form.Label>
                                <Form.Control defaultValue={phone} type="title" placeholder="Phone" required onChange={(e) => { setPhone(e.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput5">
                                <Form.Label>Email </Form.Label>
                                <Form.Control defaultValue={email} type="title" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlInput6">
                                <Form.Label>Address</Form.Label>
                                <Form.Control defaultValue={dc} type="title" placeholder="Address" required onChange={(e) => { setDc(e.target.value) }} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput6">
                                <Form.Label>WebSite </Form.Label>
                                <Form.Control defaultValue={webSite} type="title" placeholder="WebSite" required onChange={(e) => { setWebSite(e.target.value) }} />
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