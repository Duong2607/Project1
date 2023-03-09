import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import './ProductManage.scss';
import ProductList from './ProductList';
import CreatClothingPage from './CreatClothingPage';
class ProductManage extends Component {

    state = {
        hideshowbody: 'list' 
    }

    componentDidMount() {
    }

    showChoice (choice) {
        this.setState({
            hideshowbody: choice
        })
       
    }

    render() {
        return (
            <React.Fragment>
            <Header></Header>
           
                <nav id="sidebarMenu" class=" sidebar">
                    <div class="position-sticky">
                    <div class="list-group list-group-flush mx-3 mt-4">
                        <p
                        class="list-group-item list-group-item-action py-2 ripple"

                        aria-current="true"
                        onClick={() => {this.showChoice('list')}}
                        style = {{color: this.state.hideshowbody=='list'?'blue':'' }}
                        >
                        <span>Danh sách sản phẩm</span>
                        </p>
                        {/* <a href="#" class="list-group-item list-group-item-action py-2 ripple active">
                        <i class="fas fa-chart-area fa-fw me-3"></i><span>Webiste traffic</span>
                        </a> */}
                        <p class="list-group-item list-group-item-action py-2 ripple"
                        onClick={() => {this.showChoice('creat')}}
                        style = {{color: this.state.hideshowbody=='creat'?'blue':''}}
                        >
                        <span>Tạo sản phẩm</span></p
                        >
                    </div>
                    </div>
                </nav>
                {this.state.hideshowbody=='list'?
                
                <div className='product-list'>
                    <ProductList></ProductList>
                </div> 
                :
                <div className='creat-product'>
                <CreatClothingPage
                showChoice = {this.showChoice}
                ></CreatClothingPage>
                </div>
                
                
                }
                
                
           
           
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
