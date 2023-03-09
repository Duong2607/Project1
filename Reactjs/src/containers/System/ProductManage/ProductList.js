import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import './ProductList.scss'
import { getAllClothings, updateClothing, deleteClothing } from '../../../services/clothingService';
import FixClothingModal from './FixClothingModal';
const socket = io.connect("http://localhost:8080");

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clothings: null,
            showModalFix: false,
            idClothing: null,
            nameClothing: null,
            imgClothing: null,
            price: null,
            sum_size_1: null,
            sum_size_2: null,
            sum_size_3: null,
            sum_size_4: null,
            color: null,
            type: null,
            collection: null,

        }
     this.update = false
     this.hideModalFixClothing = this.hideModalFixClothing.bind(this);

    }

    async componentDidMount() {
        let clothing = await getAllClothings();
      
            this.setState({
                clothings: clothing.clothings,

            })

            socket.on('receive_order', async(data) => {
                if(data) {
                    console.log(data)
    
                }
                let clothing = await getAllClothings();
      
                this.setState({
                    clothings: clothing.clothings,

                })
            })
      }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    openModalFixClothing = (item) => {
        this.setState({
            showModalFix: true,
            idClothing: item._id,
            nameClothing: item.name,
            imgClothing: item.img,
            price: item.price,
            sum_size_1: item.sum_size_1,
            sum_size_2: item.sum_size_2,
            sum_size_3: item.sum_size_3,
            sum_size_4: item.sum_size_4,
            color: item.color,
            type: item.type,
            collection: item.collection_name
        })
        
    }

    hideModalFixClothing () {
        this.setState({
            showModalFix: false
        })
    }

    handleUpdateClothing = async (data) => {
        try {
            let res = await updateClothing(data);
            if(res&&res.errCode===0) {
                this.hideModalFixClothing();
                let clothing = await getAllClothings();
                this.setState({
                    clothings: clothing.clothings,

                })
                alert(res.errMessage);
            }else {
                alert(res.errMessage);
            }

        } catch (error) {
            console.log(error)
        }

    }

    handleDeleteClothing = async (id) => {
        let check = window.confirm('Xác nhận xóa');
        if(check) {
            try {

                let res = await deleteClothing(id);
                if(res&&res.errCode===0) {
                    let clothing = await getAllClothings();
                    this.setState({
                        clothings: clothing.clothings,
    
                    })
                    alert(res.errMessage);
                }else {
                    alert(res.errMessage);
                }
    
            } catch (error) {
                console.log(error)
            }
        }
        
    }


    render() {
       let clothings = this.state.clothings;
        return (
            <React.Fragment>
                
                <div className='productlist'>
                {this.state.showModalFix&&
                <FixClothingModal
                showModalFix = {this.state.showModalFix}
                hideModalFixClothing = {this.hideModalFixClothing}
                valueInput = {this.state}
                handleUpdateClothing = {this.handleUpdateClothing }
                />
                }    
                
                    <table>
                    <tr>
                        <th>Tên</th>
                        <th>Ảnh mô tả</th>
                        <th>Giá</th>
                        <th>Số lượng size 1</th>
                        <th>Số lượng size 2</th>
                        <th>Số lượng size 3</th>
                        <th>Số lượng size 4</th>
                        <th>Màu</th>
                        <th>
                            <div className='view-button fix'>
                                Sửa thông tin
                            </div>
                            
                        </th>
                        <th>
                            <div className='view-button delete'>
                                Xóa
                            </div>
                        </th>
                    </tr>
                    {clothings? clothings.map((item, index) => {
                        return(
                            <tr>
                                <th>{item.name}</th>
                                <th  
                                className='productimg'
                                style={{backgroundImage: `url(${item.img}`}}>

                                </th>
                                <th>{item.price}</th>
                                <th>{item.sum_size_1}</th>
                                <th>{item.sum_size_2}</th>
                                <th>{item.sum_size_3}</th>
                                <th>{item.sum_size_4}</th>
                                <th>{item.color}</th>
                                <th>
                                    <div className='view-button fix'
                                    onClick={async() => {
                                        await this.openModalFixClothing(item);
                                    }}
                                    >
                                        <i class="fa fa-wrench" aria-hidden="true"></i>
                                    </div>
                                    
                                </th>
                                <th>
                                    <div className='view-button delete'
                                    onClick={()=>{this.handleDeleteClothing(item._id)}}
                                    >
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </div>
                                </th>
                            </tr>
                        )
                    })

                    :<div>
                        </div>}
                    </table>
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
