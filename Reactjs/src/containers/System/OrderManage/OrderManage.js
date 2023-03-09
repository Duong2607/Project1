import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import './OrderManage.scss';
import { getAllOrder } from '../../../services/orderService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from "lodash";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

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

class RegisterPackageGroupOrAcc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: '',
            isOrder: 0,
            isOpenProductModal: false,
            cartData: [],
        }
     this.update = false;
     this.closeProductModal = this.closeProductModal.bind(this);

    }

    async componentDidMount() {
        let orders= await getAllOrder();
         
        this.setState({
            order: orders.orders,
            isOrder: orders.errCode
        })
        // const socket = io("http://localhost:8080");


        socket.on('receive_order', (data) => {
            if(data) {
                console.log(data)

            }
            window.location.reload()
        })
        

      }
    async componentDidUpdate(prevProps, prevState, snapshot) {
       
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

    render() {
        let orders = this.state.order;
        let isOrder = this.state.isOrder;
        let objModal = new ProductModal();
         
        return (
            <React.Fragment>
            <Header></Header>
            <div className="order-manage-table">
                {this.state.isOpenProductModal&&
                <ProductModal
                isOpenProductModal = {this.state.isOpenProductModal}
                closeProductModal = {this.closeProductModal}
                cartData = {this.state.cartData}
                />
                }
                
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
                        <div className=''>
                            Product
                        </div>
                    </th>
                </tr>
                {!isOrder? orders&&orders.map((item, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPackageGroupOrAcc);
