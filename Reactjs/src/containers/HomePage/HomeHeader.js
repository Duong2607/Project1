import React, { Component } from 'react';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Modal from './Modal';
import {createNewUser} from '../../services/clientService';
import { handleLoginClientApi } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import CartModal from '../cart/CartModal';
class HomeHeader extends Component {
    constructor () {
        super();
        this.state = {
          showCartModal: false,
          showModalLogin: false,  
          showModal: false,
          email: '',
          password: '',
          first_Name: '',
          last_Name: '',
        };
        this.handleOpenCartModal = this.handleOpenCartModal.bind(this);
        this.handleCloseCartModal = this.handleCloseCartModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModalLogin = this.handleCloseModalLogin.bind(this);
        this.handleOpenModalLogin = this.handleOpenModalLogin.bind(this);
    }
      handleOpenCartModal() {
        this.setState({ showCartModal: true });
      } 

      handleCloseCartModal() {
        this.setState({showCartModal: false});
      }

      handleOpenModal(clientIsLoggedIn) {
        if(!clientIsLoggedIn){
        this.setState({ showModal: true });
        } 
            if(clientIsLoggedIn) {
                console.log(this.props.clientIsLoggedIn)
                this.props.history.push ({
                    pathname: '/account',
                    
                })
      }}

      handleCloseModal () {
        this.setState({ showModal: false });
      }

      handleOpenModalLogin (clientIsLoggedIn) {
        if(!clientIsLoggedIn){
        this.setState({ showModalLogin: true });
        }else{
            this.props.userNotLogin();
            this.props.clientProcessLogout();
        
        }
      }

      handleCloseModalLogin () {
        this.setState({ showModalLogin: false });
      }
   
      handleOnChangeInput = (event) => {
        console.log(event.target.value)
      }        

      createNewuser = async (data) => {
        try {
            let reponse = await createNewUser(data);
            if(reponse && reponse.errMessage !=='OK'){
                alert(reponse.errMessage);
            } else {
                this.setState({
                    showModal: false,
                    
                });
                alert('????ng k?? th??nh c??ng');
                
            }
        } catch (e) {
            console.log(e)
        }
      }
      LoginSuccess =  async (user) => {
         try {
        
                let data = await handleLoginClientApi(user.email, user.password);
                if(data && data.errCode !==0){
                    this.setState({
                        errMessage: data.errMessage
                    })
                    alert(this.state.errMessage)
                }
                if(data && data.errCode === 0){
                    //todo
                    this.props.clientLoginSuccess(data.client)
                    
                    this.setState({
                        showModalLogin: false,
                        email: data.client.email,
                        first_Name: data.client.first_Name,
                        last_Name: data.client.last_Name,
                        idUser: this.props.clientInfor._id
                    })
                    console.log('login succeeds')
                    
                }
                } catch (error) {
                    if(error.response) {
                        if(error.response.data) {
                            this.setState({
                            errMessage: error.response.data.message
                            })
                        }
                    }

                    
                    
                }
      }
      redirectToHome() {
        this.props.history.push({
            pathname: '/'
        })
      }

      redirectToClothingPage() {
        this.props.history.push ({
            pathname: `/for-him`
        })
      }

      componentDidMount() {

      }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
        // nh???n th???y s???n ph???m ???????c th??m v??o gi??? ????? m??? gi???
        if(prevProps.addCartSuccess !== this.props.addCartSuccess) {
            this.setState({ showCartModal: true });
        }
      }
      

    render() {

        const {clientIsLoggedIn, clientInfor} = this.props;
        return (
            <div className='all-header'>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='information'>
                        <div className='hotline'>
                            <div>Hotline: 0933.782.768</div>
                        </div>
                        <div className='up-in-ca'>
                            <div className='child-uia'>
                               <div onClick={() => {this.handleOpenModal(clientIsLoggedIn)}}>{clientIsLoggedIn ? 'T??i kho???n' : '????ng k??'}</div> 
                            </div>
                          
                            <div className='child-uia'>
                                <div onClick={() => {this.handleOpenModalLogin(clientIsLoggedIn)}}>{clientIsLoggedIn ? '????ng xu???t' : '????ng nh???p'}</div>
                            </div>
                            <div className='child-uia'>
                                <div>Li??n h???</div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='logo'>
                        <div className='header-logo'>
                            <img src='https://ssstutter.com/img/new_logo.png'>
                            </img>
                        </div>
                    </div>               
                </div>
            </div>

           <div className='fixed-content'>
            <div className='home-content-container'>
                <div className='main-nav'>
                    <div className='child1-nav'>
                        
                         <ul className='main-list'> 
                            <li className='home-node'
                            onClick={() => {this.redirectToHome()}}
                            >
                                <div >
                                    <span>HOME</span>
                                </div>
                            </li>
                            <li className='clothing-node'
                            onClick={()=> {this.redirectToClothingPage()}}>
                                <div>
                                   <span>CLOTHING</span> 
                                </div>
                                {/* <ul class="bonus-clothing">
                                    <li><span href="">Tees</span></li>
                                    <li><span href="">Pants</span></li>
                                    <li><span href="">Jackets</span></li>
                                </ul> */}
                            </li>
                        </ul> 
                    </div>
                    <div className='child2-nav'>
                        <div className='search-item'>
                        <i class="fas fa-search"></i>
                        </div>
                        <div className='cart-item' onClick={() => {this.handleOpenCartModal()}}>
                        <i class="fas fa-cart-plus"></i>
                        </div>
                    </div>
                </div>
                <div className='red-line'>
                    
                </div>
                
            </div>
            </div>
            <Modal
                isOpen = {this.state.showModal}
                isClose = {this.handleCloseModal}
                isOpenLogin = {this.state.showModalLogin}
                isCloseLogin = {this.handleCloseModalLogin}
                createNewuser = {this.createNewuser}
                clientIsLoggedIn = {this.state.clientIsLoggedIn}
                LoginSuccess = {this.LoginSuccess}
            />
            <CartModal
           
            addCartSuccess = {this.props.addCartSuccess}
            showCartModal = {this.state.showCartModal}
            closeCartModal = {this.handleCloseCartModal}
            item = {this.props.item}

            />

            </div>
        );
    }

}



const mapStateToProps = state => {
    return {
        clientIsLoggedIn: state.client.clientIsLoggedIn,
        clientInfor: state.client.clientInfor,
        priceClothing: state.cart.priceClothing
};}

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        
       // userLoginFail: () => dispatch(actions.userLoginFail()),
       clientProcessLogout: () => dispatch(actions.clientProcessLogout()),
      
        
       // userLoginFail: () => dispatch(actions.userLoginFail()),
        clientLoginSuccess: (clientInfor) => dispatch(actions.clientLoginSuccess(clientInfor)),
        userNotLogin: () => dispatch(actions.userNotLogin()),
        setInforCart: () => dispatch(actions.setInforCart())
};}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader) )





