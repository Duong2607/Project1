import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreatNewAdmin.scss';
import { Button } from 'reactstrap';
import { handleCreatNewAdmin } from '../../../services/userService';
class CreatNewAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            first_Name: '',
            last_Name: ''
        }
    }
    
    async componentDidMount() {

    }

    handleOnChangeInput = (event, id) => {
        
        let copyState = {...this.state}; //lấy bản copy tránh lấy thẳng state
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
                if(i==2){
                    alert('Missing parameter: First Name');
                    break;
                } else if(i==3) {
                    alert('Missing parameter: Last Name');
                    break;
                } else {
                    alert('Missing parameter: '+arrInput[i]);
                    break;
                }  
            }
        }
        return isValid;
    }

    creatNewAdmin = async () => {
        let isValid= this.checkValideInput();
        if(isValid){
            let isCf = window.confirm('Xác nhận tạo');
            if(isCf) {
                try {
                    
                    let res = await handleCreatNewAdmin(this.state);
                    
                    if(res&&res.errCode===0) {
                        alert(res.errMessage);
                        
                        await this.setState({
                            email:'',
                            password: '',
                            last_Name: '',
                            first_Name: ''
                        })
                    }else {
                        alert(res.errMessage);
                    }
        
                } catch (error) {
                    console.log(error)
                }
            }
            
        }
      }
    

    render() {
        let copyState = {...this.state}; //lấy bản copy tránh lấy thẳng state
        
        return (
            <React.Fragment>
                <div className='body-fix-modal'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'email')}}
                                value={copyState.email}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input
                                type='password'
                                onChange={(event) => {this.handleOnChangeInput(event,'password')}}
                                value={copyState.password}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>First Name</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'first_Name')}}
                                value={copyState.first_Name}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Last Name</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'last_Name')}}
                                value={copyState.last_Name}
                                >
                                </input>
                            </div>
                            
                        </div>
                        <Button color="primary" 
                                className = 'px-5 creatbutton'
                                onClick={()=>this.creatNewAdmin()}
                                >Creat
                        </Button>
            </React.Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatNewAdmin);
