import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter'
import './CheckOutPage.scss';
import { withRouter } from 'react-router-dom';
import CartModalContent from '../cart/CartModalContent';
import { getCart } from '../../services/cartService'
import { addOrder } from '../../services/orderService';
import * as actions from "../../store/actions";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import io from "socket.io-client";
import _ from "lodash"
const socket = io.connect("http://localhost:8080");

class CheckOutPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            phoneNumber: '',
            address: '',
            isValid: [true],
            cart: [],
            fullName: '',
            isCart: 0,
            checkfullName: true,
            checkemail: true,
            checkphoneNumber: true,
            checkaddress: true,
            update: false,
            idUser: '',
            price: '',
            compeleteOrder: true,
            paymentMethods: '',
            checkpaymentMethods: true,
            email: '',
            status: false,
        }
        this.handleCompleteOrder= this.handleCompleteOrder.bind(this);
        this.compeleteOrder = true

    }
   

    async componentDidMount() {
       
        
        let data = {}
        if(this.props.clientIsLoggedIn === true) {
        data.idUser =     this.props.clientInfor._id
        let carts= await getCart(data);
      
        this.setState({
            cart: carts.cart,
            isCart: carts.errCode,
            idUser: this.props.clientInfor._id,
            price: this.props.priceClothing,
        })
        }

        socket.on('receive_cart', async() => {
            
            let carts= await getCart(data);
      
            this.setState({
                cart: carts.cart,
                isCart: carts.errCode,
                idUser: this.props.clientInfor._id,
                price: this.props.priceClothing,
            })
     
        })
    }

     async componentDidUpdate(prevProps, prevState, snapshot) {
      
        if(prevState.compeleteOrder!== this.state.compeleteOrder) {
            this.componentDidMount();
        }
        

    }

    // Th???c hi???n ho??n t???t ????n h??ng
    async handleCompleteOrder() {
        if(this.props.clientIsLoggedIn) {
            let isValid=  this.checkValideInput();
                if(isValid) {
                    let isConfirm = window.confirm('X??c nh???n thanh to??n');
                    if(isConfirm) {
                        if(this.state.idUser&&this.state.price&&!_.isEmpty(this.state.cart)) {
                            let res = await addOrder(this.state)
                            if(res.errCode === 0) {
                                this.setState({
                                    compeleteOrder: false
                                })
                            
                                await CartModalContent.handleDeleteAllCart(this.props.clientInfor._id);
                                // OrderManage
                                socket.emit('send_order', this.props.clientInfor._id)
                            }
                        }
                        else {
                            alert('Miss Data')
                        }
                    }
                }
        } else {
            alert('B???n ch??a ????ng nh???p')
        }
    }

    //g??n gi?? tr??? trong input cho c??c bi???n state
    handleOnChangeInput = (event, key) => {
        
        let copyState = {...this.state};
        copyState[key] = event.target.value;
        copyState['check'+key] = true
        this.setState({
            ...copyState,
            
        });

      } 
    //g??n gi?? tr??? cho bi???n state
      handleSetPayMethods = (key) => {
        this.setState({
            paymentMethods: key
        })
      }

    //ki???m tra input 
    checkValideInput = () => {
        let isValid = true; 
        let copyState = {...this.state};
        let arrInput = ['fullName', 'email', 'phoneNumber', 'address','paymentMethods'];

        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                copyState['check'+arrInput[i]] = false
                // copyState['check'+key] = true
                this.setState({
                    ...copyState,
                    
                });
            }
        }
        return isValid;
    }

    render() {
    
        return(
        <div className='checkout'>
            <HomeHeader
            handleUpdate = {this.handleUpdate}

            ></HomeHeader>
        {this.state.compeleteOrder? 

        <div className='checkout-page'>

        <div className='delivery-info'>
            <h2>Th??ng Tin Giao H??ng</h2>

            <div>
            <label>T??n Ng?????i Nh???n</label>
            <input
            className='input-infor'
            type="text"
            onChange={(event) => {this.handleOnChangeInput(event,'fullName')}}
            value={this.state.fullName}
            />
            <span style={{ display: this.state.checkfullName?'none':'block', color: 'red'}}>Missing parameter: T??n ng?????i nh???n</span>
            </div>
            <div>
            <label>Email</label>
            <input
            className='input-infor'
            type="text"
            onChange={(event) => {this.handleOnChangeInput(event,'email')}}
            value={this.state.email}
            />
            <span style={{display: this.state.checkemail?'none':'block', color: 'red'}}>Missing parameter: Email</span>
            </div>
            <div>
            <label>S??? ??i???n tho???i</label>
            <input
            className='input-infor'
            type="text"
            onChange={(event) => {this.handleOnChangeInput(event,'phoneNumber')}}
            value={this.state.phoneNumber}
            />
            <span style={{display: this.state.checkphoneNumber?'none':'block', color: 'red'}}>Missing parameter: S??? ??i???n tho???i</span>
            </div>
            <div>
            <label>?????a ch??? nh???n h??ng</label>
            <input
            className='input-infor'
            type="text"
            onChange={(event) => {this.handleOnChangeInput(event,'address')}}
            value={this.state.address}
            />
            <span style={{display: this.state.checkaddress?'none':'block', color: 'red'}}>Missing parameter: ?????a ch??? nh???n h??ng</span>
            </div>
            </div>

        <div className='payment-methods'>
            <h2>Ph????ng Th???c Thanh To??n</h2>
            <div className='payment cod' onClick={async() => {
                await this.handleSetPayMethods('cod');
                this.handleCompleteOrder()
            }}
            >
                <i class="fas fa-truck"></i>
                <label for="pay">Thanh to??n khi nh???n h??ng(COD)</label><br/>
            </div>
            <PayPalScriptProvider 
            options={{
                "client-id": 
                    "AR2bgUNvYSmwy70Ko5Qs0GxfpdcuQ-s1mehe1NHt9hmQnHJbU6A9KQGHSMMcFfrIOTuBCGFi-iNoNAYJ"
                    }}>
                <PayPalButtons
                createOrder={(data, actions) => {
                    this.handleSetPayMethods('paypal')
                    let isValid=  this.checkValideInput();
                    let usdPrice = parseFloat(`${this.props.priceClothing}`)/23720
                    usdPrice = Math.round(usdPrice * 100) / 100;
                    
                    if(isValid) {
                        return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        // currency_code: currency,
                                        value: `${usdPrice}`,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                    }
                    
                onApprove={ (data, actions) => {
                    return actions.order.capture().then(async () => {
                        // Your code here after capture the order
                        await this.setState({
                            status: true
                        })
                        if(this.state.idUser&&this.state.price&&this.state.cart) {
                            let res = await addOrder(this.state)
                            if(res.errCode === 0) {
                                this.setState({
                                    compeleteOrder: false,
                                   
                                })
                              
                                await CartModalContent.handleDeleteAllCart(this.props.clientInfor._id);
                                this.handleUpdate();
                                // OrderManage
                                socket.emit('send_order', this.props.clientInfor._id)
                            }
                        }
                    });
                }}
                ></PayPalButtons>
            </PayPalScriptProvider>

            <span style={{display: this.state.checkpaymentMethods?'none':'block', color: 'red'}}>Missing parameter: Ph????ng th???c thanh to??n</span>
            
        </div>
        <div className='complete-order'>
        <CartModalContent
        handleUpdate = {this.handleUpdate}
        
        />
        <div className='order-completion'>
            <div className='order-completion-content'>
                
                <div className='detail '>
                <span>T???ng ????n</span>
                <span>{this.props.priceClothing}??</span>
                </div>
                <br/>
                <div className='detail '>
                <span>??u ????i(th??nh vi??n)</span>
                <span>0??</span>
                </div>
                <br/>
                <div className='detail border-footer'>
                <span>Ph?? ship</span>
                <span>{this.props.priceClothing!==0?30000:0}??</span>
                </div>
            </div>
            <div className='order-completion-footer'>
                <div className='pay'>
                        <h1>
                            Th??nh Ti???n
                        </h1>
                        <h1 className='price'>
                            {this.props.priceClothing!==0?this.props.priceClothing+30000:0}??
                        </h1>
                    </div>
                </div>
        </div>
        </div>
        </div> : 
        <div className='complete'>
            <h2>
                ?????t h??ng th??nh c??ng!
            </h2>
        </div>

        }
            
            <HomeFooter></HomeFooter>
        </div>
        )
        
        }
}   
    const mapStateToProps = state => {
        return {
            clientIsLoggedIn: state.client.clientIsLoggedIn,
            clientInfor: state.client.clientInfor,
            priceClothing: state.cart.priceClothing
        };
    };
    const mapDispatchToProps = dispatch => {
        return {
        setInforCart : (priceClothing, countClothing) => dispatch(actions.setInforCart(priceClothing, countClothing)),
        clientLoginSuccess: (clientInfor) => dispatch(actions.clientLoginSuccess(clientInfor))
        };
    };
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckOutPage));
