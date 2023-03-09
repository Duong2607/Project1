
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter'
// import './DetailClothingPage.scss';
import { withRouter } from 'react-router-dom';
import './DetailClothingPage.scss';
import {getClothing} from '../.././services/clothingService'
import { addCart, checkSumClothing } from '../../services/cartService';
class DetailClothingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            clothing : '',
            idUser: '',
            idClothing: '',
            nameCLothing: '',
            priceClothing: '',
            sizeClothing: '',
            img: '',
            count: '',
            addCartSuccess: 0,
            status: true
        }
    }


    async componentDidMount() {
        let res = await getClothing(this.props.match.params.name)
        
            this.setState({
                clothing: res.clothing,
                idClothing: res.clothing._id,
                nameClothing: res.clothing.name,
                priceClothing: res.clothing.price,
                
                img: res.clothing.img,
            })
            if(this.props.clientIsLoggedIn){
                this.setState({
                    idUser: this.props.clientInfor._id,
                })
            }
           
        
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clientIsLoggedIn !== this.props.clientIsLoggedIn) {

            this.componentDidMount();

         }

    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['sizeClothing'];
        // for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[0]]){
                isValid = false;
                alert('Missing parameter: size');
        //         break;
            }
        // }
        return isValid;
      }

    selectSizeClothing = async(a) => {
        this.setState({
            sizeClothing: a
        })
       
        
       
            let data = await checkSumClothing(a,this.props.match.params.name);
        // console.log('??/',data)

            if(data.errCode===0) {
                this.setState({
                    status: false
                })

            }else {
                this.setState({
                    status: true
                })
                
            }
        
        
    }

    addToCart = async() =>{
        let isValid= this.checkValideInput();
        
        if(isValid){
            if(this.props.clientIsLoggedIn)
            {
                let data = await addCart(this.state)
                
                // if(data.errCode==0) {
                //     if(this.state.addCartSuccess == false) {
                //         this.setState({
                //             addCartSuccess: true
                //         })
                //     }
                //     else {
                //         this.setState({
                //             addCartSuccess: false
                //         })
                //     }
                // }
                if(data.errCode===2) {
                    alert(data.errMessage)
                }
                if(data.errCode===3) {
                    alert(data.errMessage)
                }
                if(this.state.addCartSuccess === false) {
                            this.setState({
                                addCartSuccess: true
                            })
                        }
                        else {
                            this.setState({
                                addCartSuccess: false
                            })
                        }
            } else {
                alert('bạn chưa đăng nhập')
            }
            
            }
            
        }
    


    render() {
        let clothing = this.state.clothing;
      

        return (
            
            <div className='detail-clothing-page'>
                
                <HomeHeader
                item = {this.state.clothing}
                addCartSuccess = {this.state.addCartSuccess}

                ></HomeHeader>
                
                <div className='detail-clothing-content'>
                    <div className='detail-clothing-image' style={{backgroundImage: `url(${clothing.img}`}}>

                    </div>
                    <div className='detail-clothing-info'>
                    <div className='name'>
                        <h2 onClick={() => {this.addToCart()}}>
                            {clothing.name}
                        </h2>
                    </div>
                    <div className='status'>
                        <h2>{this.state.status?this.state.sizeClothing?'Còn hàng':'':'Hết hàng'}</h2>
                    </div>
                    <div className='price'>
                        <h2>
                            {clothing.price}
                        </h2>
                    </div>
                    <div className='size'>
                        <ul>
                            <li onClick={() =>{this.selectSizeClothing('1')}} style={{border:this.state.sizeClothing===1? '1px solid black':''}}>1</li>
                            <li onClick={() =>{this.selectSizeClothing('2')}} style={{border:this.state.sizeClothing===2? '1px solid black':''}}>2</li>
                            <li onClick={() =>{this.selectSizeClothing('3')}} style={{border:this.state.sizeClothing===3? '1px solid black': ''}}>3</li>
                            <li onClick={() =>{this.selectSizeClothing('4')}} style={{border:this.state.sizeClothing===4? '1px solid black': ''}}>4</li>
                        </ul>
                    </div>
                    <div className='add-to-cart-button'>
                        <h2 onClick={() =>{this.addToCart()}}>THÊM VÀO GIỎ</h2>
                    </div>
                    
                    </div>
                    
                </div>
                <HomeFooter
                ></HomeFooter>
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

        };
    };
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClothingPage));
