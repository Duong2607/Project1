
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';

import './AccountPage.scss';
class AccountPage extends Component {
    constructor () {
        super();
        this.state = {
          
        }}

    componentDidMount() {

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.clientInfo !== this.props.clientInfo) {
    //         this.setState({
    //             clientRedux: this.props.clientInfo,
                
    //         })
    //     }
          
           
    //     }
    
    render() {

        const {clientInfor} = this.props;
       
        return (
            <div>
                <HomeHeader></HomeHeader>
                <div className='account-page'>
                    <h2>Trang khách hàng</h2>
                    <p>Chào {clientInfor&&clientInfor.first_Name? this.props.clientInfor.first_Name : ''} {clientInfor&&clientInfor.last_Name? this.props.clientInfor.last_Name : ''}</p>

                <div className='history'>
               
                    <table>
                    <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Delivery</th>
                        <th>Payment Methods</th>
                        <th>Status</th>
                        <th>
                            <div className='view-button'>
                                View
                            </div>
                        </th>
                    </tr>
                    {/* {!isOrder? orders&&orders.map((item, index) => {
                        return(
                            <tr>
                                <th>{item.idUser}</th>
                                <th>{item.fullName}</th>
                                <th>{item.phoneNumber}</th>
                                <th>{item.address}</th>
                                <th>{item.price}</th>
                                <th>{item.delivery?'Đang vận chuyển':'Chưa vận chuyển'}</th>
                                <th>{item.paymentMethods}</th>
                                <th>{item.status?'Đã thanh toán':'Chưa thanh toán'}</th>
                                <th>
                                    <div className='view-button'>
                                        View
                                    </div>
                                </th>
                            </tr>
                        )
                    })

                    :<div>
                        </div>} */}
                    

                    
                    </table>
                    
                </div>
                </div>

                <HomeFooter></HomeFooter>
                 
                 
            </div>
        )
        }
}   
    const mapStateToProps = state => {
        return {
            clientIsLoggedIn: state.client.clientIsLoggedIn,
            clientInfor: state.client.clientInfor
        };
    };
    const mapDispatchToProps = dispatch => {
        return {
        //     navigate: (path) => dispatch(push(path)),
            
        //    // userLoginFail: () => dispatch(actions.userLoginFail()),
        //    clientProcessLogout: () => dispatch(actions.clientProcessLogout()),
          
            
        //    // userLoginFail: () => dispatch(actions.userLoginFail()),
        //     clientLoginSuccess: (clientInfor) => dispatch(actions.clientLoginSuccess(clientInfor))
        };
    };
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
