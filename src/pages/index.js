import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/blog.css"
import callApiGet from '../fetchAPI/getAPI'
import Menu from "../components/menu";
import callApiGetDetail from "../fetchAPI/upDataFile"
// import callApiGetImg from "../fetchAPI/getImgAPI"

const YourselfProflie = () => {
  const [users, setUsers] = useState([]);
  const [usersDetail, setUsersDetail] = useState([]);
  const [UrlImage, setUrlImage] = useState([]);
  let dataContents = ""
  useEffect(() => {
    getAll();
  }, []);
  const getAll = () => {
    callApiGet()
      .then(data => setUsers(data.item));
    callApiGetDetail(dataContents)
      .then(dataContent => setUsersDetail(dataContent.items));
    // callApiGetImg()
    //   .then(dataImg => setUrlImage(dataImg.items));
  }
  return (
    <div>
      <Menu />
      <div className="container">
        <div className="blog">
     
          {
            users.map((users, key) => {
              return (
                <div key={key} className="component">
                  <h2 className="name">{users.nameUser}</h2>
                  <div>
                    <div className="status" >
                      <div> <p>Date of birth:</p></div>
                      <div><p>{users.dateBirth} </p></div>
                    </div>
                    <div className="status" >
                      <div>  <p>GT :</p></div>
                      <div> <p>{users.gtsx} </p></div>
                    </div>
                    <div className="status" >
                      <div> <p>Phone:</p></div>
                      <div> <p>{users.phone} </p></div>
                    </div>
                    <div className="status" >
                      <div> <p>Email:</p> </div>
                      <div> <p>{users.email}</p></div>
                    </div>
                    <div className="status" >
                      <div> <p>Description:</p></div>
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
export default YourselfProflie

// <div className="img-home">
// {
//   UrlImage.map((item, key) => {
//     return (
//       <div className="item-user-home" key={key} >
//         <img className="image-see-home" src={item.avatar ? item.avatar : ""} />
//       </div>
//     )
//   })
// }

// </div>