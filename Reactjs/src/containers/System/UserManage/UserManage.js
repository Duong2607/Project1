import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import Header from '../../Header/Header';
import { getAllClient } from '../../../services/clientService';
import ClientList from './ClientList';
import CreatNewAdmin from './CreatNewAdmin';
import AdminList from './AdminList';
import './UserManage.scss'
class UserManage extends Component {
    constructor(props){
        super(props);
        this.state = {
            clientList: '',
            hideshowbody: 'clientlist'
        }
    }
    
    async componentDidMount() {
        let clientListData = await getAllClient();
        if(clientListData.errCode==0) {
            await this.setState({
                clientList: clientListData.client,
            })
        }
    }

    showChoice (choice) {
        this.setState({
            hideshowbody: choice
        })
       
    }

    logout = () => {
        this.props.processLogout();
    }

    render() {
        let clientList = this.state.clientList;
        return (
            <React.Fragment>
            <Header></Header>
            <div className="usermanage">
            <nav id="sidebarMenu" class=" sidebar">
                    <div class="position-sticky">
                    <div class="list-group list-group-flush mx-3 mt-4">
                        <p
                        href="#"
                        class="list-group-item list-group-item-action py-2 ripple"
                        aria-current="true"
                        onClick={() => {this.showChoice('clientlist')}}
                        style = {{color: this.state.hideshowbody=='clientlist'?'blue':''}}
                        >
                        <span>Danh sách người dùng</span>
                        </p>
                        <p href="#" class="list-group-item list-group-item-action py-2 ripple"
                        onClick={() => {this.showChoice('adminlist')}}
                        style = {{color: this.state.hideshowbody=='adminlist'?'blue':''}}
                        >
                        <span>Danh sách quản trị viên</span></p
                        >
                        <p href="#" class="list-group-item list-group-item-action py-2 ripple"
                        onClick={() => {this.showChoice('creatAdmin')}}
                        style = {{color: this.state.hideshowbody=='creatAdmin'?'blue':''}}
                        >
                        <span>Tạo mới quản trị viên</span></p
                        >
                    </div>
                    </div>
                </nav>
                {this.state.hideshowbody=='clientlist'?
                <div className='clientlist'>
                    
                    <ClientList></ClientList>
                </div>

                : this.state.hideshowbody=='creatAdmin'?
                <div className='creatadmin'>
                    <CreatNewAdmin></CreatNewAdmin>
                </div>
                :<div className='adminlist'>
                    <AdminList></AdminList>
                </div>
                }
            {/* <table>
                <tr>
                    <th>ID User</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Fix</th>
                    <th>Delete</th>
                </tr>
                
                {clientList? clientList.map((item)=> {
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
            </table> */}
           
            </div>
            
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
