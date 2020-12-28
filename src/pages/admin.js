import React, { Component } from 'react';
import { connect } from 'react-redux';

import callApiGet from '../fetchAPI/getAPI'
import updateAPI from '../fetchAPI/upDataFile'
class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInput: false,
            dataEdit: [],
            nameUser: '',
            id: '',
            dateBirth: '',
            gtsx: '',
            phone: '',
            email: '',
            dc: '',
            webSite: '',
            experience: props
          
            // aOject: {
            //     nameUser: '',
            //     id: '',
            //     dateBirth: '',
            //     gtsx: '',
            //     phone: '',
            //     email: '',
            //     dc: '',
            //     webSite: '',
            //     detailTitle: [{
            //         id: 1,
            //         experience: "",
            //         experienceDetail: [
            //             {
            //                 id: 1,
            //                 nameExperience: "",
            //                 times: "",
            //                 list: [
            //                     {
            //                         id: 1,
            //                         content: " "
            //                     }

            //                 ]
            //             }
            //         ]
            //     }
            //     ],
            // },

        }
        console.log(props,"dddddddddddddđ");
    }
    componentDidMount = () => {
        callApiGet()
            .then(data => {
                this.setState({
                    dataEdit: data
                })
                // callApiGet()
            })
    }
    setInput = () => {
        this.setState({
            checkInput: !this.state.checkInput
        })
    }
    handleUpdate = (datas) => {
        // let page = {
        //     id: this.state.id,
        //     nameUser: this.state.nameUser
        // }
        updateAPI({
            id: this.state.id,
            nameUser: this.state.nameUser
        })
    }
    handleChange = (item) => {
        this.setState({
            id: item.id,
            nameUser: item.nameUser,
            dateBirth: item.dateBirth,
            gtsx: item.gtsx,
            phone: item.phone,
            email: item.email,
            dc: item.dc,
            webSite: item.webSite
        })
    }
    handleChangeTime = (e) => {

        const { nameUser, dateBirth, gtsx, phone, email, dc, webSite } = this.state.dataEdit || ''
        this.setState({
            nameUser: e.target.value
        })
    }
    handleChangeNumber = (e) => {
        this.setState({
            experience:e.target.value
        })
    }
    render() {
        // const { dataEdit } = this.state || []
        console.log(this.state.experience, "tess loggggggggggggggggggggggg");
        let ListData = []

        ListData = this.state.dataEdit.map((item, key) => {
            return (
                <div key={key}  >
                    <button onClick={() => this.handleChange(item)}>Sửa</button>
                    <table  >
                        <tr >
                            <th>STT</th>
                            <th>
                                Detail
                            </th>


                        </tr>
                        <tr>
                            <td>Tên:</td>
                            <input className="inputType" value={this.state.nameUser}
                                onChange={(e) => {
                                    this.setState({
                                        nameUser: e.target.value
                                    })
                                }}
                            ></input>

                        </tr>
                        <tr>
                            <td>Ngày sinh:</td>
                            <input className="inputType" value={this.state.dateBirth}
                                onChange={(e) => {
                                    this.setState({
                                        dateBirth: e.target.value
                                    })
                                }}
                            ></input>

                        </tr>
                        <tr>
                            <td>Giới tính :</td>
                            <input className="inputType" value={this.state.gtsx}
                                onChange={(e) => {
                                    this.setState({
                                        gtsx: e.target.value
                                    })
                                }}
                            ></input>

                        </tr>
                        <tr>
                            <td>Điện thoại:</td>
                            <input className="inputType" value={this.state.phone}
                                onChange={(e) => {
                                    this.setState({
                                        phone: e.target.value
                                    })
                                }}
                            ></input>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <input className="inputType" value={this.state.email}
                                onChange={(e) => {
                                    this.setState({
                                        email: e.target.value
                                    })
                                }}
                            ></input>
                        </tr>
                        <tr>
                            <td>Địa chỉ:</td>
                            <input className="inputType" value={this.state.dc}
                                onChange={(e) => {
                                    this.setState({
                                        dc: e.target.value
                                    })
                                }}
                            ></input>

                        </tr>
                        <tr>
                            <td>Website:</td>
                            <input className="inputType" value={this.state.webSite}
                                onChange={(e) => {
                                    this.setState({
                                        webSite: e.target.value
                                    })
                                }}
                            ></input>

                        </tr>
                    </table>

                    {
                        item && item.detailTitle ? item.detailTitle.map((itemExperience) => {
                            return (
                                <div className="component-detail">
                                    <div className="title">
                                        <h4>
                                            {itemExperience.experience}
                                        </h4>
                                        <input className="inputType" value={this.state.experience}
                                            onChange={this.handleChangeNumber}
                                        ></input>
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
            )
        })
        const { dataEdit } = this.state
        const { nameUser, dateBirth, gtsx, phone, email, dc, webSite } = this.state.dataEdit || ''
        return (

            <div >

                {ListData}


            </div>
        );
    }
}

export default admin