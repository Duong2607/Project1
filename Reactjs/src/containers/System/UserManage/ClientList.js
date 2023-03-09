import React, { Component} from 'react';

import { connect } from 'react-redux';

import { getAllClient } from '../../../services/clientService';
import io from "socket.io-client";
// import './ClientList.scss'

const socket = io.connect("http://localhost:8080");

class ClientList extends Component {

    constructor(props) {
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
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    showChoice (choice) {
        this.setState({
            hideshowbody: choice
        })
       
    }



    render() {
        let clientList = this.state.clientList;
       
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
