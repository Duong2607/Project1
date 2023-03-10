
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CollectionAvatar.scss';
import { withRouter } from 'react-router-dom';

class CollectionAvatar extends Component {
    constructor () {
        super();
        this.state = {
        }}

        async componentDidMount() {
            
        }

        goToForHimPage = () => {
            this.props.history.push ({
              pathname: '/for-him',
          })
        }

    render() {
        
        return (
            <div className='section-collectionavatar'>
                <div className='main-image'>
                <div className='child-avatar' style={{backgroundImage: `url(https://dashboard.leanow.vn/upload/11-2022/1669103240542.jpeg)`}}>
                </div>
                </div>
                <div className='type-image'>
                <div className='image-for-men' 
                onClick={() => {this.goToForHimPage()}}
                style={{backgroundImage: `url(https://dashboard.leanow.vn/upload/12-2022/1669853008259.jpeg)`}}
                >
                </div>
                <div className='image-for-girl' style={{backgroundImage: `url(https://dashboard.leanow.vn/upload/12-2022/1669853043740.jpeg)`}}>
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
