import React, { Component } from 'react';
import { getCart, updateCart, deleteCart } from '../../services/cartService';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './CartModalHeader.scss';
import { withRouter } from 'react-router-dom';

class CartModalHeader extends Component {
    constructor () {
        super();
        this.state = {

        };

    }

    render() {
        
        return (
            <React.Fragment>
           
                    <div className='cart-modal-header'>
                        <h1>
                            Giỏ hàng
                        </h1>
                        <i class="fas fa-times" onClick={() => {this.props.closeCartModal()}}></i>
                        
                    </div>
                
            </React.Fragment>
        );
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
        navigate: (path) => dispatch(push(path)),
        clientLoginSuccess: (userInfor) => dispatch(actions.clientLoginSuccess(userInfor))
    };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(CartModalHeader));
