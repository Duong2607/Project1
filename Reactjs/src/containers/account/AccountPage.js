
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { getOrderById } from '../../services/orderService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './AccountPage.scss';


class ProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    async componentDidMount() {
        if(!_.isEmpty(this.props.cartData)) {
            console.log(this.props.cartData)
            
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        let copyState = {...this.state}; //lấy bản copy tránh lấy thẳng state

        return(
            
            <React.Fragment>
                <Modal isOpen={this.props.isOpenProductModal} toggle={()=>{this.props.closeProductModal()}} >
                    <ModalHeader toggle={()=>{this.props.closeProductModal()}}>Modal title</ModalHeader>
                    <ModalBody>
                    <div className='cart-modal-content'>
                    
                    {
                      
                    this.props.cartData && this.props.cartData.map((item, index) => {
                        return (
                            <div className='cart-item'>
                                <div className='image-clothing' style={{backgroundImage: `url(${item.img}`}}>

                                </div>
                                <div className='info-clothing' >
                                    <div className='header-cart'>
                                        <p className='name-clothing'>{item.nameClothing}</p>
                                        
                                    </div>
                                    <p>{item.priceClothing}</p>
                                    <div className='size-clothing'>
                                        <span>size</span>
                                        <p>{item.sizeClothing}</p>

                                    </div>

                                    <div className='quantity-clothing'>
                                        <span>Quantity</span>
                                        <span
                                        style={{marginLeft: '8px'}}
                                        >{item.count}</span>
                                        

                                    </div>

                                </div>

                            </div>
                        )
                       
                    })
                    }
                    
                    
                       
                    </div>
                    </ModalBody>
                    <ModalFooter>
                    
                    <Button 
                    className='px-3'
                    color="secondary" 
                    onClick={()=>{this.props.closeProductModal()}}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>


                         
                   
            </React.Fragment>
                                    

                            
        )
    }
}

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          orders: '',
          isOpenProductModal: false,
          cartData:''
        }
     this.closeProductModal = this.closeProductModal.bind(this);

    }

        componentDidMount = async() =>{
        
        if(this.props.clientInfor) {
                console.log(this.props.clientInfor._id);
                let ordersData = await getOrderById(this.props.clientInfor._id);
                if(ordersData.errCode==0) {
                    this.setState({
                        orders: ordersData.orders
                    })
                } else {
                    alert(ordersData.errMessage);
                }
                
        }
    }

    async openProductModal(order) {
        
        await this.setState({
            cartData: order.cart,
            isOpenProductModal: true,
        })
       
    }

    closeProductModal () {
        this.setState({
            isOpenProductModal: false
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // mount lần 2 để set được info 
        if (prevProps.clientIsLoggedIn !== this.props.clientIsLoggedIn) {

            this.componentDidMount();

         }
          
           
        }
    
    render() {

        const {clientInfor} = this.props;
        const {orders} = this.state;
        let objModal = new ProductModal();

        return (
            <div>
                <HomeHeader></HomeHeader>
                <div className='account-page'>
                {this.state.isOpenProductModal&&
                <ProductModal
                isOpenProductModal = {this.state.isOpenProductModal}
                closeProductModal = {this.closeProductModal}
                cartData = {this.state.cartData}
                />
                }
                    <h2>Trang khách hàng</h2>
                    <p>Chào {clientInfor&&clientInfor.first_Name? this.props.clientInfor.first_Name : ''} {clientInfor&&clientInfor.last_Name? this.props.clientInfor.last_Name : ''}</p>

                <div className='history'>
                <h2>LỊCH SỬ ĐẶT HÀNG</h2>
                    <table>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Delivery</th>
                        <th>Payment Methods</th>
                        <th>Status</th>
                        <th>
                            <div className='view-button'>
                                Xem đơn hàng
                            </div>
                        </th>
                    </tr>
                    {!_.isEmpty(orders)? orders&&orders.map((item, index) => {
                        return(
                            <tr>
                                <th>{item.fullName}</th>
                                <th>{item.phoneNumber}</th>
                                <th>{item.address}</th>
                                <th>{item.price}</th>
                                <th>{item.delivery?'Đang vận chuyển':'Chưa vận chuyển'}</th>
                                <th>{item.paymentMethods}</th>
                                <th>{item.status?'Đã thanh toán':'Chưa thanh toán'}</th>
                                <th>
                                    <div className='view-button'
                                     onClick={async() => {await this.openProductModal(item)}}>
                                        View
                                    </div>
                                </th>
                            </tr>
                        )
                    })

                    :<div>
                        </div>}
                    

                    
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
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountPage));
