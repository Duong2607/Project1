
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CollectionAvatar.scss';
import  {getDataCollectionApi} from "../../../services/collectionService";
import { withRouter } from 'react-router-dom';

class CollectionAvatar extends Component {
    constructor () {
        super();
        this.state = {
            childAvatar: '',
            collection: '',
        }}

        async componentDidMount() {
            let response = await getDataCollectionApi('November Collection');
            console.log(response);
            this.setState({
                collection: response.collection

                
            })

        }

        goToForHimPage = () => {
            this.props.history.push ({
              pathname: '/for-him',
              
          })
        
          }

    render() {
        
       let collection = this.state.collection
  
        return (
            <div className='section-collectionavatar'>
                <div className='main-image'>
                <div className='child-avatar' style={{backgroundImage: `url(${collection.child_avatar})`}}>
                </div>
                </div>
                <div className='type-image'>
                <div className='image-for-men' 
                onClick={() => {this.goToForHimPage()}}
                style={{backgroundImage: `url(${collection.image_for_men})`}}
                >
                </div>
                <div className='image-for-girl' style={{backgroundImage: `url(${collection.image_for_girl})`}}>
                </div>
                </div>


                 
            </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionAvatar));
