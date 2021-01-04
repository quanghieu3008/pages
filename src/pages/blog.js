import React, { useEffect, useState, useRef } from "react"
import callApiGetDetail from '../fetchAPI/upDataFile'
import { Modal, Form, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import addContentAPI from "../fetchAPI/addContentAPI"
import Menu from "../components/menu";
import deleteContentAPI from "../fetchAPI/deleteContentAPI"
import updateContentAPI from "../fetchAPI/updateContentAPI"
import searchContentAPI from "../fetchAPI/searchContentAPI"
import "../style/blog.css"
function mapData() {

}
const Yourself = () => {
    const today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const [content, setContent] = useState('')
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dataNew, setDataNew] = useState({})
    const [usersDetail, setUsersDetail] = useState([]);
    const [showScreen, setShowScreen] = useState(false);
    const [showScreenAdd, setShowScreenAdd] = useState(false);
    const [checkStatus, setCheckStatus] = useState("");
    const [textSearch, setTextSearch] = useState("");
    const [value, setValue] = useState(0)
    useEffect(() => {
        get();
    }, []);




    const onHandleEdit = (item) => {
        setShowScreenAdd(true);
        setContent(item.content)
        setTitle(item.title)
        setDescription(item.description)
        setId(item.id)
        setCheckStatus("Edit Content")
    }
    const onHandleShowAdd = () => {
        setContent("")
        setTitle("")
        setDescription("")
        setShowScreenAdd(true);
        setCheckStatus("Add Content")

    }
    const onHandleShow = (item) => {
        setShowScreen(true);
        setDataNew(item)
    }
    const get = () => {
        callApiGetDetail()
            .then(data => setUsersDetail(data.items));

    }
    const addContent = () => {

        if (content && title && description !== "") {
            addContentAPI({
                content: content,
                title: title,
                description: description,
                date: date
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
    const updateContent = () => {
        if (content && title && description !== "") {
            updateContentAPI({
                content: content,
                title: title,
                description: description,
                date: date,
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
    const onHandleDelete = (id) => {
        deleteContentAPI(id)
            .then((res) => {
                get();
                setShowScreenAdd(false);
            })
            .catch((error) => {
                alert("Error!")
            });
    }
    const handleSearch = (e) => {
        setTextSearch(e.target.value)

    }

    const onHandleSearchMore = () => {
        searchContentAPI(textSearch)
            .then((res) => {
                setUsersDetail(res.items)
            })
    }

    return (
        <div  >
            <Menu title={"Blog"} />


            <div className="input-search">
                <Button className="right-search" onClick={() => onHandleShowAdd()} variant="outline-success"  >Add</Button>
                <input defaultValue={textSearch} type="text" class="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" onChange={handleSearch} />
                <Button className="right-search" onClick={onHandleSearchMore} variant="info" >Search</Button>
            </div>

            <div className="list-title">


                {
                    usersDetail.map((item, key) => {
                        return (
                            <Card key={key} className="blog-item" text="black" style={{ background: 'white', width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title >{item.title}</Card.Title>
                                    <Card.Text >
                                        {item.description}
                                    </Card.Text>
                                 
                                    <small style={{display:"flex",alignSelf:'flex-end'}} class="text-muted"> {item.date}</small>
                                </Card.Body>
                               
                                <Card.Footer>
                                    <div className="button-handle">
                                        <Button onClick={() => onHandleShow(item)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Detail</Button>
                                        <Button variant="light" onClick={() => onHandleEdit(item)}>Edit</Button>
                                        <Button variant="light" onClick={() => onHandleDelete(item.id)}>Delete</Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        )
                    })}
            </div>
            <Modal show={showScreen}>
                <Modal.Header closeButton onClick={() => setShowScreen(false)}>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {dataNew.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={showScreen}>
                        <Form.Label style={{fontWeight:'bold'}} >{dataNew.description}</Form.Label>
                        
                        <p class="text-left">{dataNew.content}</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button type="submit">Done </Button>
                <small class="text-muted">{dataNew.date}</small>
                </Modal.Footer>
            </Modal>
            <Modal
                size="lg"
                show={showScreenAdd}
                onHide={() => setShowScreenAdd(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton onClick={() => setShowScreenAdd(false)}>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {checkStatus}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={true} onSubmit={() => addContent} >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title </Form.Label>
                            <Form.Control defaultValue={title} type="title" placeholder="Title" required onChange={(e) => { setTitle(e.target.value) }} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Description </Form.Label>
                            <Form.Control defaultValue={description} type="title" placeholder="Description" required onChange={(e) => { setDescription(e.target.value) }} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content </Form.Label>
                            <Form.Control defaultValue={content} type="title" placeholder="Content" required as="textarea" rows={3} onChange={(e) => { setContent(e.target.value) }} />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" type="submit" onClick={() => checkStatus === "Edit Content" ? updateContent() : addContent()}>{checkStatus === "Edit Content" ? "Save" : "Add"}</Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Yourself
