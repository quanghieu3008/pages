import React, { useEffect, useState } from "react"
import callApiGetDetail from '../fetchAPI/upDataFile'
import { Modal, Form, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import addContentAPI from "../fetchAPI/addContentAPI"
import Menu from "../components/menu";
import deleteContentAPI from "../fetchAPI/deleteContentAPI"
import updateContentAPI from "../fetchAPI/updateContentAPI"
import searchContentAPI from "../fetchAPI/searchContentAPI"
import callApiGetImg from "../fetchAPI/getImgAPI"
import updateImgAPI from "../fetchAPI/updateImgAPI"
import "../style/blog.css"
import Admin from "./admin"
import PaginationCommon from "./paginations"
import callApiGetPagination from "../fetchAPI/getPaginationAPI"
import PaginationPage from "../pages/paginationPage"
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
    let totalSlide = Math.ceil(usersDetailTotal / 3)

    const [listDataItem, setListDataItem] = useState([])
    const [activePageStatus, setActivePageStatus] = useState(1)
    const [totalPage, setTotalPage] = useState(10)
    // let totalNumberPage = Math.ceil(usersDetail.count / 3)
    const [dataPageToDo, setDataPageToDo] = useState([])

    console.log(usersDetailTotal, "eeeeeeeeeeeeeeeeeeee", totalSlide);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 3,
        // totalRow: totalSlide,
    })
    useEffect(() => {
        get(1);

    }, []);

    const handlePageChange = (newPage) => {
        console.log(newPage, "so trang ------ sau bam");
        setPagination({
            ...pagination,
            page: newPage
        })
        console.log(pagination.page, "so trang ------ sau bam save");
        handleGetPagination(newPage)
    }

    const handleGetPagination = (pages) => {
        console.log(pages, 'page input------------+++');
        callApiGetPagination(pages)
            .then(dataPagination => {

                setDataPageToDo(dataPagination.items)
                if (dataPagination.items.length === 0) {

                    handlePageChange(pages - 1)
                    // setPagination({
                    //     ...pagination,
                    //     page: pages - 1
                    // });
                    
                    // totalSlide = pages - 1
                    console.log(totalSlide, "end delete --------------", pagination.page, "hiện tại", pages);
                };
                console.log(dataPagination, "page data")
            });

    }
    // console.log(totalNumberPage, "number ============");
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
        handleGetPagination(1);
        console.log("---------------------------data");
        callApiGetDetail()
            .then(data => {
                setUsersDetailTotal(data.count)
                // setListDataItem(data.items)
                console.log("---------------------------data", data, "user tasssss", usersDetailTotal);
            });
        callApiGetImg()
            .then(dataImg => setUrlImage(dataImg.items));

    }

    const hanldeNextPage = () => {
        handleGetPagination(totalSlide);

        if (dataPageToDo.length >= pagination.limit) {
            getNewPage()
        }


    }
    const getNewPage = () => {
        callApiGetDetail()
            .then(data => {
                setUsersDetailTotal(data.count)
                handlePageChange(totalSlide + 1)
                console.log("---------------------------data", data, "user tasssss", usersDetailTotal);
            });
    }
    const addContent = () => {
        const { content, title, description } = dataNew || ""
        if (content && title && description !== "") {
            addContentAPI(dataNew)
                .then((res) => {
                    handleGetPagination(pagination.page);
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
                    handleGetPagination(pagination.page);
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
                // if(dataPageToDo.length===0){}
                handleGetPagination(pagination.page);
                console.log(res, "data loeg-----------------");
                setShowModalComfirm(false);
                setUsersDetailTotal(usersDetailTotal - 1)
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
                setUsersDetailTotal(res.items)
            })
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
    console.log(pagination.page, "|||||||||", totalSlide,"{{{{{{{{{{{{{Ơ",usersDetailTotal);
    return (
        <div>
            <Menu title={"Blog"} />
            <div className="input-search">
                <div className="admin-profile">

                    <Admin />
                    <Button className="right-search" onClick={() => onHandleShowAdd()} variant="outline-success"  >Add</Button>

                </div>
                <div className="admin-profile">
                    <input defaultValue={textSearch} type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" onChange={handleSearch} />
                    <Button className="right-search" onClick={onHandleSearchMore} variant="info" >Search</Button>
                </div>

            </div>
            <div className="input-search">
                <div>
                    <div>
                        <input type="file" onChange={onHandleImage}></input>
                    </div>
                    <Button className="upload-img btn btn-outline-warning" onClick={onHandleUpdateImg} variant="info" >Save</Button>

                </div>

                {
                    UrlImage.map((item, key) => {
                        return (
                            <div className="item-user" key={key} >
                                <img className="image-see" src={ImageUser ? ImageUser : item.avatar} />
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div>
                    <button
                        disabled={pagination.page <= 1}
                        onClick={() => handlePageChange(pagination.page - 1)}>
                        Prev
            </button>
                    <button
                        disabled={pagination.page >= totalSlide}
                        onClick={() => handlePageChange(pagination.page + 1)}>
                        Next
        </button>
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

            <div>
                <PaginationPage
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
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
        </div>
    )
}
export default Yourself



// <PaginationCommon
// pages={{ activePageStatus: activePageStatus, totalNumberPage: totalNumberPage }}
// detailPage={totalNumberPage}
// handleGetPagination={handleGetPagination}
// />