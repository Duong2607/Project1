import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getAllUser } from '../../../services/userService';
import io from "socket.io-client";
// import './AdminList.scss'

const socket = io.connect("http://localhost:8080");

class AdminList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adminList: '',
            hideshowbody: 'AdminList'
        }
     
    }

    async componentDidMount() {
        let adminListData = await getAllUser();
        if(adminListData.errCode==0) {
            await this.setState({
                adminList: adminListData.user,
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    showChoice (choice) {
        this.setState({
            hideshowbody: choice
        })
       
    }



    render() {
        let adminList = this.state.adminList;
       
        return (
            <React.Fragment>
                <div className="usermanage">
                    <table>
                        <tr>
                            <th>ID User</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Fix</th>
                            <th>Delete</th>
                        </tr>
                        
                        {adminList? adminList.map((item)=> {
                            return(
                                <tr>
                                <th>{item._id}</th>
                                <th>{item.email}</th>
                                <th>{item.first_Name+' '+item.last_Name}</th>
                                <th>
                                            <div className='view-button fix'
                                            // onClick={async() => {
                                            //     await this.openModalFixClothing(item);
                                            // }}
                                            >
                                                <i class="fa fa-wrench" aria-hidden="true"></i>
                                            </div>
                                            
                                        </th>
                                        <th>
                                            <div className='view-button delete'
                                            // onClick={()=>{this.handleDeleteClothing(item._id)}}
                                            >
                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                            </div>
                                        </th>
                                </tr>
                            )
                        }):
                        <div></div>
                        }
                    </table>
                </div>
                
                       
                   
                
            </React.Fragment>
            )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
