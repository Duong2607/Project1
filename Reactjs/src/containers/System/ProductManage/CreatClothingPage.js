import React, { Component} from 'react';
import { connect } from 'react-redux';
import './CreatClothingPage.scss'
import { creatClothing } from '../../../services/clothingService';
import { Button} from 'reactstrap';
class CreatClothingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idClothing: '',
            nameClothing: '',
            imgClothing: '',
            price: '',
            sum_size_1: '',
            sum_size_2: '',
            sum_size_3: '',
            sum_size_4: '',
            collection: '',
            type: '',
            color: ''
        }
    }

    async componentDidMount() {
       
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeInput = (event, id) => {
        
        let copyState = {...this.state}; //lấy bản copy tránh lấy thẳng state
        copyState[id] = event.target.value;
        
        this.setState({
            ...copyState
        });
       
      }
      
      CreatClothing = async () => {
        let isValid= this.checkValideInput();
        let isValidNumber = this.checkValideNumberInput();
        if(isValid&&isValidNumber){
            let isCf = window.confirm('Xác nhận tạo');
            if(isCf) {
                try {
                    
                    let res = await creatClothing(this.state);
                    
                    if(res&&res.errCode===0) {
                        alert(res.errMessage);
                        
                        await this.setState({
                            idClothing: '',
                            nameClothing: '',
                            imgClothing: '',
                            price: '',
                            sum_size_1: '',
                            sum_size_2: '',
                            sum_size_3: '',
                            sum_size_4: '',
                            collection: '',
                            type: '',
                            color: ''
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

      checkValideInput = () => {
        let isValid = true;
        let arrInput = ['nameClothing', 'imgClothing', 'price','color','collection','type','sum_size_1', 'sum_size_2', 'sum_size_3', 'sum_size_4'];
        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: '+arrInput[i]);
                break;
            }
        }

        return isValid;
        
      }

      checkValideNumberInput = () => {
        let isValid = true;
        let arrInput = ['sum_size_1', 'sum_size_2', 'sum_size_3', 'sum_size_4'];
        for(let i = 0; i < arrInput.length; i++) {
            if(isNaN(Number(this.state[arrInput[i]])) ){
                isValid = false;
                alert('Fail parameter: '+arrInput[i]);
                break;
            }
        }

        return isValid;
        
    }


    render() {
        let copyState = {...this.state}; //lấy bản copy tránh lấy thẳng state

        return (
            <React.Fragment>
                
                        <div className='body-fix-modal'>
                            <div className='input-container'>
                                <label>Tên</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'nameClothing')}}
                                value={copyState.nameClothing}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>URL Ảnh</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'imgClothing')}}
                                value={copyState.imgClothing}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Giá</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'price')}}
                                value={copyState.price}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Màu</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'color')}}
                                value={copyState.color}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Collection</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'collection')}}
                                value={copyState.collection}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Type</label>
                                <select name="cars"
                                // onChange={(event) => {this.handleOnChangeInput(event,'type')}}
                                onChange={(event) => {this.handleOnChangeInput(event,'type')}}
                                >
                                    <option value="">Chọn loại sản phẩm</option>
                                    <option value="shirts">shirts</option>
                                    <option value="tees">tees</option>
                                    <option value="pants">pants</option>
                                    <option value="woven">woven</option>
                                    <option value="accessory">accessory</option>
                                    <option value="jacket">jacket</option>
                                    <option value="jeans">jeans</option>
                                    <option value="short">short</option>
                                    <option value="hoodie&sweater">shoe</option>
                                    <option value="bag">bag</option>
                                    <option value="hoodie&sweater">hoodie&sweater</option>
                                </select>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 1</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_1')}}
                                value={copyState.sum_size_1}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 2</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_2')}}
                                value={copyState.sum_size_2}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 3</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_3')}}
                                value={copyState.sum_size_3}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 4</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_4')}}
                                value={copyState.sum_size_4}
                                >
                                </input>
                            </div>
                            
                        </div>
                        <Button color="primary" 
                                className = 'px-5 creatbutton'
                                onClick={()=>this.CreatClothing()}
                                >Creat
                        </Button>
                               
                        
                    
                    
                 
                  
                
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatClothingPage);
