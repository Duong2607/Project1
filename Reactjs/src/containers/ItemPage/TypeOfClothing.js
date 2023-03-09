
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter'
// import './TypeOfProduct.scss';
import { getClothingByType } from '../../services/clothingService';
import { withRouter } from 'react-router-dom';

class TypeOfProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrClothings: [],
            showList: false
        }
    }
    async componentDidMount() {
        let response = await getClothingByType(this.props.match.params.type);
        this.setState({
            arrClothings: response.clothings
        })
    }

    // render() {
    //     let arrClothings = this.state.arrClothings;
        

    //     return (
    //         <React.Fragment>
            //  <div className='home-main-content-container'> 
            

    // </div> </React.Fragment>
    //     );
    // }

    showClothingDetailPage(clothing) {
        this.props.history.push ({
        pathname: `/detail-clothing/${clothing.name}`,
        })
    }

    async showTypeOfClothing(type) {
        
        if(type=='all') {
            this.props.history.push ({
                pathname: `/for-him`
            })
        } else {
            this.props.history.push ({
                pathname: `/for-him/${type}`
            })
        }
        let response = await getClothingByType(this.props.match.params.type);

        await this.setState({
            arrClothings: response.clothings
        })
        console.log(this.state.arrClothings)
    }

    showlistkind() {
       if(this.state.showList){
        this.setState({
            showList:false
        })
       } else {
        this.setState({
            showList: true
        })
       }
    }

    render() {
        let arrClothings = this.state.arrClothings;
        return (
            <div className='for-him-page'>
    
                <div>
                <HomeHeader></HomeHeader>
                </div>
           
            <div></div>
            <div className='content'>  
                <div className='title'>
                    <h2>for him</h2>
                </div>
                <div className='list-kind-buttton' onClick={() => {this.showlistkind()}}>
                    <p>Danh Mục</p>
                    <i class=  {this.state.showList ? "fas fa-caret-up":"fas fa-sort-down"}  ></i>
                    {/* <i class="fas fa-sort-up"></i> */}
                </div>
                <div className='list-kind' >
                    <ul className='' style={{display: this.state.showList? 'grid' : 'none'}}>
                        <li className='sm:w-1/4'
                        onClick={() => {this.showTypeOfClothing('all')}}>
                            TẤT CẢ
                        </li >
                        <li className='sm:w-1/4'
                        onClick={() => {this.showTypeOfClothing('shirts')}}>
                            SƠ MI & ÁO KIỂU
                        </li >
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('tees')}}>
                            ÁO THUN
                        </li>
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('pants')}}>
                            QUẦN
                        </li>
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('woven')}}>
                            LEN DỆT
                        </li>
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('accessory')}}>
                            PHỤ KIỆN
                        </li>
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('jacket')}}>
                            ÁO BLAZER & ÁO KHOÁC
                        </li>
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('jeans')}}>
                            QUẦN BÒ
                        </li>
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('short')}}>
                            QUẦN SHORT
                        </li>
                        <li className=':w-1/4'
                        onClick={() => {this.showTypeOfClothing('shoe')}}>
                            GIÀY
                        </li>
                        <li className='sm:w-1/4'
                        onClick={() => {this.showTypeOfClothing('bag')}}>
                            TÚI & VÍ
                        </li>
                        <li className='sm:w-1/4'
                        onClick={() => {this.showTypeOfClothing('hoodie&sweater')}}>
                            HOODIES & SWEATSHIRT
                        </li>
                    </ul>
                </div>
                    <div className='row'> 
                        { arrClothings && arrClothings.map((item, index) => {
                            let img = item.img;
                            return(
                                
                                <div class="col-sm-6 col-lg-3 tee-item">
                                    <div className="card card-item">
                                        <div className='clothing-image' 
                                        style={{backgroundImage: `url(${item.img}`}}
                                        onClick={() => {this.showClothingDetailPage(item)}}>
                        
                                        </div>
                                        <div className='description'>
                                            <div className='clothing-name' 
                                            onClick={() => {this.showClothingDetailPage(item)}}>
                                            <a>{item.name}</a>
                                            </div>
                                            <div className='clothing-price'>
                                            
                                            {item.price}
                                            </div>
                                        </div>
                                        <div className='clothing-type'>
                                            {item.type}
                                            </div>
                                    </div>
                                </div>
                                
                            )
                            })
                            
                        }
                    
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
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(TypeOfProduct));
