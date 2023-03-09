import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './CartModal.scss'
import { withRouter } from 'react-router-dom';
import CartModalContent from './CartModalContent';


class Cart extends Component {
    constructor () {
        super();
        this.price = 50;
        this.state = {
            
        }
        

    }
    getPrice() {
        return this.price
    }

    consologabc() {
        alert('abc')
    }
    render() {
        return(
            <React.Fragment>
           
                    <div className='cart-modal-header'>
                        <h1>
                            Giỏ hàng
                        </h1>
                        <i class="fas fa-times" onClick={() => {this.props.closeCartModal()}}></i>
                        
                    </div>
                
            </React.Fragment>
        )
    }
}

class CartModal extends Component {
    constructor () {
        super();
        this.state = {
            isCart: 0,
            cart: [],
            pricecount: 0,

        };
      }


      async componentDidMount() {

      }

      
      componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.cart !== this.state.cart) {
        }

        if (prevProps.clientIsLoggedIn !== this.props.clientIsLoggedIn) {
            this.componentDidMount();

        }

        if (prevProps.addCartSuccess !== this.props.addCartSuccess) {
            this.componentDidMount();

        }
      }
      
      

      

      async handleCompeleteOrder() {
        this.props.history.push ({
            pathname: '/checkout',
        })
      }
     

    render() {
  
        let priceClothing =0
        var objC = new Cart();
       
        return (
            <React.Fragment>
                
                
                <div className='cart-modal' style={{display: this.props.showCartModal ? 'block' : 'none'}}>
                    <Cart
                    closeCartModal = {this.props.closeCartModal}
                    />
                    {/* <CartModalHeader 
                    closeCartModal = {this.props.closeCartModal}
                    /> */}
                    <CartModalContent
                  
                    handleUpdate = {this.handleUpdate}
                    addCartSuccess = {this.props.addCartSuccess}
                    handleUpdateModal = {this.handleUpdateModal}
                    render = {this.render}
                 />


                 {/* <CartModalContent
                 clientIsLoggedIn = {this.props.clientIsLoggedIn}
                //  handleUpdate = {this.props.handleUpdate}
                 addCartSuccess = {this.props.addCartSuccess}
                 clientInfor = {this.props.clientInfor}
                 getInforCart = {this.props.getInforCart}
                 /> */}
                    <div className='cart-modal-footer'>
                        <div className='pay'>
                            <h1 className='title'>
                                Thành Tiền
                            </h1>
                            <h1 className='price'>
                                {this.props.priceClothing}đ
                            </h1>
                        </div>
                        <div className='pay-button'>
                            <h1 className='button' onClick={() => {this.handleCompeleteOrder(priceClothing)}}> 
                                Thanh Toán
                            </h1>
                        </div>
                    </div>

                </div>
  
                

            </React.Fragment>
        );
    }

}



const mapStateToProps = state => {
    return {
        clientIsLoggedIn: state.client.clientIsLoggedIn,
        clientInfor: state.client.clientInfor,
        priceClothing: state.cart.priceClothing,
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

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CartModal));

