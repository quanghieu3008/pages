import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { Button, ul, li, Text } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../style/blog.css"
import callApiGet from '../fetchAPI/getAPI'
import Menu from "../components/menu";
import callApiGetDetail from "../fetchAPI/upDataFile"
const Yourself = () => {
  const [users, setUsers] = useState([]);
  const [usersDetail, setUsersDetail] = useState([]);
  useEffect(() => {
    getAll();
  }, []);
  const getAll = () => {
    callApiGet()
      .then(data => setUsers(data));
    callApiGetDetail()
      .then(dataContent => setUsersDetail(dataContent));

  }
  return (

    <div>
      <Menu title={"Blog"} />
      <div className="container">
        <div className="blog">
        {
          users.map((users, key) => {
            return (
              <div key={key} className="component">
                <h2 className="name">{users.nameUser}</h2>
                <div>
                  <div className="status" >
                    <div> <p>Ngày sinh:</p></div>
                    <div><p>{users.dateBirth} </p></div>
                  </div>
                  <div className="status" >
                    <div>  <p>Giới tính :</p></div>
                    <div> <p>{users.gtsx} </p></div>
                  </div>
                  <div className="status" >
                    <div> <p>Điện thoại:</p></div>
                    <div> <p>{users.phone} </p></div>
                  </div>
                  <div className="status" >
                    <div> <p>Email:</p> </div>
                    <div> <p>{users.email}</p></div>
                  </div>
                  <div className="status" >
                    <div> <p>Địa chỉ:</p></div>
                    <div> <p>{users.dc}</p></div>
                  </div>
                  <div className="status" >
                    <div> <p>Website:</p> </div>
                    <div> <p>{users.webSite}</p></div>
        
                  </div>
                </div>
              </div>
            )
          })}
          {usersDetail.map((detail, key) => {
            return (
              <div key={key} className="component-detail">
                <div className="title">
                  <h5>
                    {detail.title}
                  </h5>
                </div>

                <div className="title-detail">
                  <div className="title-content">
                    <b> {detail.description} </b>
                    <p> {detail.date}</p>
                  </div>
                  <div className="title-content" >
                    <p>{detail.content}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
   
      </div>
    </div>
  )
}
export default Yourself

