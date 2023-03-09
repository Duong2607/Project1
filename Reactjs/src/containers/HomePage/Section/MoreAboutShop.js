
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreAboutShop.scss';
import '../../../../src/assets/images/store.jpeg'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getBlog} from "../../../services/blogService"
class MoreAboutShop extends Component {
    constructor () {
        super();
        this.state = {

        }}

        async componentDidMount() {
            let response = await getBlog();
            this.setState({
            arrBlogs: response.blogs
          })
        }
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2.2,
            slidesToScroll: 1,
          };
          let arrBlogs = this.state.arrBlogs
         
        return (
            <React.Fragment>
                <div className='image-about-shop'>
                    <div className='main-image' >
                        <div className='description'>
                            <h2>ssstutter</h2>
                            <p>Với thông điệp "Refined Life", 
                                SSStutter mong muốn đem đến 
                                cho khách hàng một lối sống tinh 
                                gọn bằng các sản phẩm thời trang tinh tế.</p>
                        </div>
                    </div>
                </div>
                <div className='blog'>
                     <div className='title'>
                        <h2>BLOG</h2>
                        <div className='line'></div>
                     </div>
                    <Slider {...settings}>
                    { arrBlogs && arrBlogs.map((item, index) => {
                    
                    return(
                  
                        <div  className='img-customize'>
                            <div className='blog-avatar' style={{backgroundImage: `url(${item.avatar}`}}>
                            
                            </div>
                            <div className='description'>
                                <div className='name-blog'>
                                    {item.name}
                                </div>
                            </div>
                       
                                <button type='button'>
                                    <h2> VIEW MORE</h2>
                                </button>
                
                            
                        </div>
  
                  )
                  })
                    
                }
                    </Slider>
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
export default connect(mapStateToProps, mapDispatchToProps)(MoreAboutShop);
