import React, { Component } from 'react';
import { getCart, updateCart, deleteCart, deleteAllCart } from '../../services/cartService';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './CartModalContent.scss'
import { withRouter } from 'react-router-dom';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");


class CartModalContent extends Component {
    constructor () {
        super();
        this.state = {
            isCart: 0,
            cart: [],
            pricecount: 0,
            update: false
        };
         this.priceClothing = 0;
         this.deleteAll = 0;
      }

      async componentDidMount() {
 
        let data = {}
        if(this.props.clientIsLoggedIn === true) {
        data.idUser =     this.props.clientInfor._id
        }
        let carts= await getCart(data);
        
        this.setState({
            cart: carts.cart,
            isCart: carts.errCode
        })

        socket.on('receive_cart', async() => {
            
            let carts= await getCart(data);
            
            this.setState({
                cart: carts.cart,
                isCart: carts.errCode
            })
                console.log('nhận')
        })
      }
      async componentDidUpdate(prevProps, prevState, snapshot) {
   
        if (prevProps.clientIsLoggedIn !== this.props.clientIsLoggedIn) {

            this.componentDidMount();

         }

        if (prevProps.addCartSuccess !== this.props.addCartSuccess) {
            this.componentDidMount();
        }
      }

        handleUpdateCart = async (id, status)=> {
        let res = await updateCart(id, status);
        socket.emit('update_cart')
        if(res&&res.errCode===0) {
            if(res.udcart.count === 0){
                this.handleDeleteCart(id);
            }
        }
        else {
            alert(res.errMessage)
        }
      }

      async handleDeleteCart(id) {
        let res = await deleteCart(id);
        if(res&&res.errCode===0) {
            socket.emit('update_cart')
        }
        else {
            alert(res)
        }


      }

       static async handleDeleteAllCart(id) {
        await deleteAllCart(id);
      }


    render() {
        let carts = this.state.cart;
        let isCart = this.state.isCart;
        let priceClothing = 0;
        let countClothing = {};
        this.props.setInforCart(0, null)
  
        return (
            <React.Fragment>
                  
                    <div className='cart-modal-content'>
                    
                    {
                    !isCart&&this.props.clientIsLoggedIn?  
                    carts && carts.map((item, index) => {
                       priceClothing +=item.priceClothing*item.count;
                       countClothing = item.count;
                       this.props.setInforCart(priceClothing, carts)
                    
                        return (
                            <div className='cart-item'>
                                <div className='image-clothing' style={{backgroundImage: `url(${item.img}`}}>

                                </div>
                                <div className='info-clothing' >
                                    <div className='header-cart'>
                                        <p className='name-clothing'>{item.nameClothing}</p>
                                        <i class="fas fa-times" onClick={() => {this.handleDeleteCart(item._id)
                                       }}></i>
                                    </div>
                                    <p>{item.priceClothing}</p>
                                    <div className='size-clothing'>
                                        <span>size</span>
                                        <p>{item.sizeClothing}</p>

                                    </div>

                                    <div className='quantity-clothing'>
                                        <span>Quantity</span>
                                        <p onClick={() => {this.handleUpdateCart(item._id,'-')}}>-</p>
                                        <span>{item.count}</span>
                                        <p 
                                        onClick={() => {this.handleUpdateCart(item._id,'+')}}>+</p>

                                    </div>

                                </div>

                            </div>
                        )
                       
                    }):
                     <li>Giỏ hàng chưa có sản phẩm</li>}
                    
                    
                       
                    </div>

            </React.Fragment>
        );
    }

}



const mapStateToProps = state => {
    return {
        clientIsLoggedIn: state.client.clientIsLoggedIn,
        clientInfor: state.client.clientInfor,
        countClothing: state.cart.countClothing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        
       // userLoginFail: () => dispatch(actions.userLoginFail()),
        clientLoginSuccess: (userInfor) => dispatch(actions.clientLoginSuccess(userInfor)),
        setInforCart : (priceClothing, countClothing) => dispatch(actions.setInforCart(priceClothing, countClothing)),
      
    };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CartModalContent));
