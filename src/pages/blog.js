import React, { useEffect, useState } from "react"
import callApiGet from '../fetchAPI/getAPI'


function mapData() {

}
const Yourself = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        callApiGet()
            .then(data => setUsers(data));
    }, []);
    console.log(users, "okokoko:::::::::::::");
    let ListData = []
    ListData = users.map((item) => {
        return (
            <div >
                <div className="blog">
                    <div className="component">
                        <h2 className="name">{item.nameUser}</h2>
                        <div>
                            <div className="status" >
                                <div> <p>Ngày sinh:</p></div>
                                <div><p>{item.dateBirth} </p></div>
                            </div>
                            <div className="status" >
                                <div>  <p>Giới tính :</p></div>
                                <div> <p>{item.gtsx} </p></div>
                            </div>
                            <div className="status" >
                                <div> <p>Điện thoại:</p></div>
                                <div> <p>{item.phone} </p></div>
                            </div>
                            <div className="status" >
                                <div> <p>Email:</p> </div>
                                <div> <p>{item.email}</p></div>
                            </div>
                            <div className="status" >
                                <div> <p>Địa chỉ:</p></div>
                                <div> <p>{item.dc}</p></div>
                            </div>
                            <div className="status" >
                                <div> <p>Website:</p> </div>
                                <div> <p>{item.webSite}</p></div>

                            </div>
                        </div>

                        {
                            item && item.detailTitle ? item.detailTitle.map((itemExperience) => {
                                return (
                                    <div className="component-detail">
                                        <div className="title">
                                            <h4>
                                                {itemExperience.experience}
                                            </h4>
                                        </div>
                                        {
                                            itemExperience && itemExperience.experienceDetail ? itemExperience.experienceDetail.map((itemDetail) => {
                                                return (
                                                    <div className="title-detail">
                                                        <div className="border-title">
                                                            <b>{itemDetail.nameExperience} </b>
                                                            <p> {itemDetail.times}</p>
                                                        </div>
                                                        <div>
                                                            {itemDetail && itemDetail.list ? itemDetail.list.map((itemList) => {
                                                                return (
                                                                    <div className="title-content" >
                                                                        <p>{itemList.content}</p>
                                                                    </div>
                                                                )
                                                            })
                                                                : <div></div>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                                : <div></div>
                                        }
                                    </div>
                                )
                            })
                                : <div></div>
                        }


                    </div>


                </div>

            </div>
        )
    })
    return (
      
        <div className="container">{ListData}</div>
        
    )
}
export default Yourself

