import React, { Component} from 'react';
import { connect } from 'react-redux';
import './FixClothingModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from "lodash";
class FixClothingModal extends Component {

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
            color: '',
            type: '',
            collection: '',
        }
    }

    async componentDidMount() {
        if(this.props.valueInput&& !_.isEmpty(this.props.valueInput)) {
            await this.setState({
                idClothing: this.props.valueInput.idClothing,
                nameClothing: this.props.valueInput.nameClothing,
                imgClothing: this.props.valueInput.imgClothing,
                price: this.props.valueInput.price,
                sum_size_1: this.props.valueInput.sum_size_1,
                sum_size_2: this.props.valueInput.sum_size_2,
                sum_size_3: this.props.valueInput.sum_size_3,
                sum_size_4: this.props.valueInput.sum_size_4,
                color: this.props.valueInput.color,
                type: this.props.valueInput.type,
                collection: this.props.valueInput.collection,
               })
        }
       
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
      
      UpdateClothing = async () => {
        let isValid= this.checkValideInput();
        let isValidNumber = this.checkValideNumberInput();
        if(isValid&&isValidNumber){
            await this.props.handleUpdateClothing(this.state);
            
        }
      }

      checkValideInput = () => {
        let isValid = true;
        let arrInput = ['nameClothing', 'imgClothing', 'price','color'];
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
            if(!String(this.state[arrInput[i]])){
                isValid = false;
                alert('Missing parameter: '+arrInput[i]);
                break;
            }
        }

        return isValid;
        
    }


    render() {
        let copyState = {...this.state}; //lấy bản copy tránh lấy thẳng state

        return (
            <React.Fragment>
                <Modal 
                isOpen={this.props.showModalFix} 
                toggle={()=>this.props.hideModalFixClothing()} 
                size="lg"
                className='fixmodal'
                >
                    <ModalHeader 
                    toggle={
                        async()=>{await this.props.hideModalFixClothing();
                        }
                    }
                    style = {{backgroundColor: '#0071ba'}}
                    >Sửa thông tin sản phẩm</ModalHeader>
                    <ModalBody>
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
                                onChange={(event) => {this.handleOnChangeInput(event,'type')}}
                                value={copyState.type}
                                >
                                    <option value="shirts">shirts</option>
                                    <option value="tees">tees</option>
                                    <option value="pants">pants</option>
                                    <option value="woven">woven</option>
                                    <option value="accessory">accessory</option>
                                    <option value="jacket">jacket</option>
                                    <option value="jeans">jeans</option>
                                    <option value="short">short</option>
                                    <option value="shoe">shoe</option>
                                    <option value="bag">bag</option>
                                    <option value="hoodie&sweater">hoodie&sweater</option>
                                </select>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 1</label>
                                <input
                                type='number'
                                min={0}
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_1')}}
                                value={copyState.sum_size_1}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 2</label>
                                <input
                                type='number'
                                min={0}
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_2')}}
                                value={copyState.sum_size_2}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 3</label>
                                <input
                                type='number'
                                min={0}
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_2')}}
                                value={copyState.sum_size_3}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Số lượng size 4</label>
                                <input
                                type='number'
                                min={0}
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_2')}}
                                value={copyState.sum_size_4}
                                >
                                </input>
                            </div>
                            <div className='input-container'>
                                <label>Màu</label>
                                <input
                                type='text'
                                onChange={(event) => {this.handleOnChangeInput(event,'sum_size_2')}}
                                value={copyState.color}
                                >
                                </input>
                            </div>
                        </div>
                        
                    
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" 
                    className = 'px-3'
                    onClick={()=>this.UpdateClothing()}
                    >Save Changes
                    </Button>
                    <Button color="secondary" 
                    className = 'px-3'
                    onClick={()=>this.props.hideModalFixClothing()}
                    >Close
                    </Button>
                    </ModalFooter>
                </Modal>
                 
                  
                
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

export default connect(mapStateToProps, mapDispatchToProps)(FixClothingModal);
