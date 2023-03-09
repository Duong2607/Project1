
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Collection.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClothings } from '../../../services/clothingService';
import  {getDataCollectionApi} from "../../../services/collectionService"
import { withRouter } from 'react-router-dom';

class Collection extends Component {
    constructor () {
        super();
        this.state = {
          collection: ''
        }}
        async componentDidMount() {
          let response = await getAllClothings();
          this.setState({
              arrClothings: response.clothings
          })
          let data = await getDataCollectionApi('November Collection');
          this.setState({
              collection: data.collection
          })
         
      }    
      

        goToForHimPage(){
          this.props.history.push ({
            pathname: '/for-him',
            
        })
        }
        
    
    render() {
      let arrClothings = this.state.arrClothings;
      let collection = this.state.collection;
      console.log('data',collection.image1_for_slider)
  
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4.2,
            slidesToScroll: 1,
          };
          let settings2 = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          };
        return (
          <React.Fragment>
            <div className='section-collection'>
              <div className='tiltle'>
                <h2>BỘ SƯU TẬP MỚI</h2>
                <div className='line'></div>

              </div>
              <div className='content-collection'>
                <Slider {...settings}>
                { arrClothings && arrClothings.map((item, index) => {
                    
                    return(
                    
                  <div  className='img-customize'>
                    <div className='clothing-image' style={{backgroundImage: `url(${item.img}`}}>
                    
                    </div>
                      <div className='description'>
                        <div className='clothing-name'>
                          {item.name}
                        </div>
                        <div className='clothing-price'>
                          {item.price}
                        </div>
                        
                      </div>
                  </div>
                  )
                  })
                    
                }
                  
                </Slider>
              </div>
              <div className='leave-to-page-collection'>
                <div className='leave-button' onClick={() => {this.goToForHimPage()}}>
                  <h2>Xem thêm</h2>
                  </div>
              </div>

            </div>
            <div className='collection-demo'> 
              <Slider {...settings2}>
                <div className='collection-demo-content'>
                  <div className='image-for-slider' style={{backgroundImage: `url(${collection.image1_for_slider}`}}>
                </div>
                </div>
                <div className='collection-demo-content'>
                  <div className='image-for-slider' style={{backgroundImage: `url(${collection.image2_for_slider}`}}>
                </div>
                </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Collection));
