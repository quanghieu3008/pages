import React, { useEffect, useState } from "react"
import callApiGetDetail from '../fetchAPI/upDataFile'
import { Modal, Form, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import addContentAPI from "../fetchAPI/addContentAPI"
import Menu from "../components/menu";
import deleteContentAPI from "../fetchAPI/deleteContentAPI"
import updateContentAPI from "../fetchAPI/updateContentAPI"
import callApiGetImg from "../fetchAPI/getImgAPI"
import updateImgAPI from "../fetchAPI/updateImgAPI"
import "../style/blog.css"
import Admin from "./admin"
import callApiGetPagination from "../fetchAPI/getPaginationAPI"
import Pagination from 'react-bootstrap/Pagination';

const Yourself = () => {
    const today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const [id, setId] = useState('')

    const [dataNew, setDataNew] = useState({})
    const [usersDetailTotal, setUsersDetailTotal] = useState(0);
    const [showScreen, setShowScreen] = useState(false);
    const [showModalComfirm, setShowModalComfirm] = useState(false);
    const [showScreenAdd, setShowScreenAdd] = useState(false);
    const [checkStatus, setCheckStatus] = useState("");
    const [textSearch, setTextSearch] = useState("");
    const [UrlImage, setUrlImage] = useState([]);
    const [ImageUser, setImageUser] = useState(null);
    let totalSlide = Math.ceil(usersDetailTotal / 6)
    const [dataPageToDo, setDataPageToDo] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 6,
        search: ""
    })
    useEffect(() => {
        get();

    }, []);

    const handlePageChange = (newPage) => {
        setPagination(newPage)
        handleGetPagination(newPage)
    }

    const handleGetPagination = (pages) => {
        callApiGetPagination(pages)
            .then(dataPagination => {
                setDataPageToDo(dataPagination.items);
                if (dataPagination.items.length === 0) {
                    handlePageChange({ ...pagination, page: pagination.page - 1 })
                };
            });
    }
    const onHandleEdit = (item) => {
        setShowScreenAdd(true);
        setDataNew(item)
        setCheckStatus("Edit Content")
    }
    const handleSetContent = (event) => {
        const { name } = event.target;
        setDataNew({ ...dataNew, [name]: event.target.value })
    }
    const handleAddContent = (e) => {
        const { name } = e.target;
        setDataNew({ ...dataNew, [name]: e.target.value, date: date })
    }
    const onHandleShowAdd = () => {
        setDataNew({ ...dataNew, content: "", title: "", description: "", id: "" })
        setShowScreenAdd(true);
        setCheckStatus("Add Content")
    }
    const onHandleShow = (item) => {
        setShowScreen(true);
        setDataNew(item)
    }
    const get = (data) => {
        handleGetPagination({ ...pagination, page: 1 });
        callApiGetDetail(pagination.search)
            .then(data => {
                setUsersDetailTotal(data.count)
            });
        callApiGetImg()
            .then(dataImg => setUrlImage(dataImg.items));
    }
    const hanldeNextPage = () => {
        if (usersDetailTotal % pagination.limit === 0) {
            getNewPage()
            handleGetPagination({ ...pagination, page: totalSlide + 1 });
        }
    }
    const getNewPage = () => {
        callApiGetDetail(pagination.search)
            .then(data => {
                setUsersDetailTotal(data.count)
                handlePageChange({ ...pagination, page: totalSlide + 1 })
            });
    }
    const addContent = () => {
        const { content, title, description } = dataNew || ""
        if (content && title && description !== "") {
            addContentAPI(dataNew)
                .then((res) => {
                    handleGetPagination(pagination);
                    setShowScreenAdd(false);
                    hanldeNextPage()
                    setUsersDetailTotal(usersDetailTotal + 1)
                    alert("Success!");
                })
                .catch((error) => {
                    alert("Error!");
                });
        }
        else alert("Not empty")
    }
    const updateContent = () => {
        const { content, title, description } = dataNew
        if (content && title && description !== "") {
            updateContentAPI(dataNew)
                .then((res) => {
                    handleGetPagination(pagination);
                    setShowScreenAdd(false);
                    alert("Success!");
                })
                .catch((error) => {
                    alert("Error!")
                });
        }
        else alert("Not empty")
    }
    const onHandleDelete = () => {

        deleteContentAPI(id)
            .then((res) => {
                handleGetPagination(pagination);
                setShowModalComfirm(false);
                setUsersDetailTotal(usersDetailTotal - 1)
            })
            .catch((error) => {
                alert("Error!")
            });
    }
    const handleSearch = (e) => {
        setPagination({ ...pagination, search: e.target.value, page: 1 })
    }
    const HandleComfirm = (item) => {
        setShowModalComfirm(true)
        setId(item)
    }
    const onHandleImage = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImageUser(URL.createObjectURL(img))
        }
    }
    const onHandleUpdateImg = () => {
        updateImgAPI({
            id: 1,
            avatar: ImageUser
        })
            .then((res) => {
                get();
                alert("Success")

            })
            .catch((error) => {
                alert("Error!")
            });
    }
    const { page } = pagination
    let pageLists = []
    for (let i = 1; i <= totalSlide; i++) {
        pageLists.push(
            <Pagination.Item key={i} active={i === page} onClick={() => handlePageChange({ ...pagination, page: i })}>
                {i}
            </Pagination.Item>
        );
    }
    const paginationBasic = (<Pagination >{pageLists}</Pagination>)
    return (
        <div >

            <Menu  />
            <div className="input-search">
                <div className="admin-profile">

                    <Admin />
                    <Button className="right-search" onClick={() => onHandleShowAdd()} variant="outline-success"  >Add</Button>

                </div>
                <div className="admin-profile">
                    <input defaultValue={textSearch} type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" onChange={handleSearch} />
                    <Button className="right-search" onClick={get} variant="info" >Search</Button>
                </div>

            </div>
 
            <div className="list-title">
                {
                    dataPageToDo.map((item, key) => {
                        return (
                            <Card key={key} className="blog-item" text="black" style={{ background: 'white', width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title >{item.title}</Card.Title>
                                    <Card.Text >
                                        {item.description}
                                    </Card.Text>

                                    <small style={{ display: "flex", alignSelf: 'flex-end' }} className="text-muted"> {item.date}</small>
                                </Card.Body>

                                <Card.Footer>
                                    <div className="button-handle">
                                        <Button onClick={() => onHandleShow(item)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Detail</Button>
                                        <Button variant="light" onClick={() => onHandleEdit(item)}>Edit</Button>
                                        <Button variant="light" onClick={() => HandleComfirm(item.id)}>Delete</Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        )
                    })}

            </div>

            <div className="list-title">
                {paginationBasic}
            </div>
            <Modal show={showScreen}>
                <Modal.Header closeButton onClick={() => setShowScreen(false)}>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {dataNew.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={showScreen}>
                        <Form.Label style={{ fontWeight: 'bold' }} >{dataNew.description}</Form.Label>

                        <p className="text-left">{dataNew.content}</p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowScreen(false)} >Done </Button>
                    <small className="text-muted">{dataNew.date}</small>
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
                    <Form noValidate validated={true} onSubmit={() => updateContent} >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title </Form.Label>
                            <Form.Control minLength={1} maxLength={128} defaultValue={dataNew.title} name="title" type="title" placeholder="Title" required onChange={checkStatus === "Edit Content" ? handleSetContent : handleAddContent} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Description </Form.Label>
                            <Form.Control minLength={1} maxLength={128} defaultValue={dataNew.description} name="description" type="title" placeholder="Description" required onChange={checkStatus === "Edit Content" ? handleSetContent : handleAddContent} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content </Form.Label>
                            <Form.Control minLength={1} maxLength={128} defaultValue={dataNew.content} name="content" type="title" placeholder="Content" required as="textarea" rows={5} onChange={checkStatus === "Edit Content" ? handleSetContent : handleAddContent} />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" type="submit" onClick={() => checkStatus === "Edit Content" ? updateContent() : addContent()}>{checkStatus === "Edit Content" ? "Save" : "Add"}</Button>
                </Modal.Body>
            </Modal>
            <Modal show={showModalComfirm}>
                <Modal.Header closeButton onClick={() => setShowModalComfirm(false)}>
                    <Modal.Title>
                        do you want to delete?
                            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="list-task">
                        <Button className="btn btn-danger" onClick={onHandleDelete}>Yes </Button>
                        <Button onClick={() => setShowModalComfirm(false)}>No</Button>
                    </div>
                </Modal.Body>

            </Modal>
        </div >
    )
}
export default Yourself

// <div className="input-search">
// <div>
//     <div>
//         <input type="file" onChange={onHandleImage}></input>
//     </div>
//     <Button className="upload-img btn btn-outline-warning" onClick={onHandleUpdateImg} variant="info" >Save</Button>

// </div>

// {
//     UrlImage.map((item, key) => {
//         return (
//             <div className="item-user" key={key} >
//                 <img className="image-see" src={ImageUser ? ImageUser : item.avatar} />
//             </div>
//         )
//     })
// }
// </div>
