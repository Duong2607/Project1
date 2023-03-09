import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Modal.scss'
import { withRouter } from 'react-router-dom';

class Modal extends Component {
    constructor () {
        super();
        this.state = {
          showModal: false,
          email: '',
          password: '',
          first_Name: '',
          last_Name: ''
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }

     async componentDidMount() {
        

      }

      

      handleOpenModal (clientIsLoggedIn) {
        if(!clientIsLoggedIn){
        this.setState({ showModal: true });
        }
      }

      handleCloseModal = (event) => {
        // a = false;
        // console.log(a);
       
        event.stopPropagation();
      }
   
      handleOnChangeInput = (event, id) => {
        
        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
      } 

      checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'first_Name', 'last_Name'];
        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: '+arrInput[i]);
                break;
            }
        }
        return isValid;
      }

      checkValideInputClient = () => {
        let isValid = true;
        let arrInput = ['email', 'password'];
        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: '+arrInput[i]);
                break;
            }
        }
        return isValid;
      }

      handleAddNewUser = () => {
        let isValid= this.checkValideInput();
        if(isValid){
            this.props.createNewuser(this.state);
        }
      }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        let isValid= this.checkValideInputClient();
        if(isValid){
            

            this.props.LoginSuccess(this.state);
           
        }
       
    }
    render() {

        

        return (
            <React.Fragment>
            <div className="modal"  tabindex="-1" role="dialog" 
            style={{display: this.props.isOpen ? 'block' : 'none'}}
            onClick={() => {this.props.isClose()}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content"
                    onClick={(event) => {this.handleCloseModal(event)}}
                    >
                            <div className="modal-header md-hd">
                                <h5 className="modal-title">Đăng ký</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {this.props.isClose()}}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div className="modal-body dien-thong-tin">
                            <div   className='form-dang-ky'>
                                <div className='private-infor'>
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnChangeInput(event,'email')}}
                                    value={ this.state.email }
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="mat_khau">Mật khẩu</label>
                                    <input 
                                    type="password" 
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnChangeInput(event, 'password')}}
                                    value={this.state.password}
                                    />
                                </div>
                                </div>
                                <div className='users-name'>
                                <div className="form-group">
                                    <label for="first-Name">Họ</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnChangeInput(event, 'first_Name')}}
                                    value={this.state.first_Name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="last-Name">Tên</label>
                                    <input 
                                    type="text"
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnChangeInput(event,'last_Name')}}
                                    value={this.state.last_Name}
                                    />
                                </div>
                                </div>
                                <div className='submit-node'>
                                <button 
                                type="submit" 
                                className="btn btn-primary"
                                onClick={() => {this.handleAddNewUser()}}
                                >Submit
                                </button>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>

            <div className="modal"  tabindex="-1" role="dialog" 
            style={{display: this.props.isOpenLogin ? 'block' : 'none'}}
            onClick={() => {this.props.isCloseLogin()}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content"
                    onClick={(event) => {this.handleCloseModal(event)}}
                    >
                            <div className="modal-header md-hd">
                                <h5 className="modal-title">Đăng nhập</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {this.props.isCloseLogin()}}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div className="modal-body dien-thong-tin">
                            <div className='form-dang-ky'>
                                <div className='private-infor'>
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnChangeInput(event,'email')}}
                                    value={ this.state.email }
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="mat_khau">Mật khẩu</label>
                                    <input type="password" 
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnChangeInput(event,'password')}}
                                    value={this.state.password}
                                    />
                                </div>
                                </div>
                                <div className='submit-node'>
                                <button type="submit" 
                                className="btn btn-primary"
                                onClick={()=> {this.handleLogin()}}>Submit</button>
                                </div>
                            </div>
                        </div>
                    
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
        clientInfor: state.client.clientInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        
       // userLoginFail: () => dispatch(actions.userLoginFail()),
        clientLoginSuccess: (userInfor) => dispatch(actions.clientLoginSuccess(userInfor))
    };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Modal));
