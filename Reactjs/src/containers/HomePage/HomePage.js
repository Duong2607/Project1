import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import Collection from './Section/Collection';
import CollectionAvatar from './Section/CollectionAvatar';
import MoreAboutShop from './Section/MoreAboutShop';
class HomePage extends Component {

    render() {
        // const { clientIsLoggedIn } = this.props;
        // if(clientIsLoggedIn){

        // }
        // let linkToRedirect = clientIsLoggedIn ? '/system/user-manage' : '/login';
        // //let linkToRedirect ='/home';

        // return (
        //     <Redirect to={linkToRedirect} />
        // );
        return (
            <div className='homepage'>
            
                <HomeHeader></HomeHeader>
            
            
                <CollectionAvatar>
                </CollectionAvatar>
           
            
                <Collection>
                </Collection>

                <MoreAboutShop>
                </MoreAboutShop>
            
           
                <HomeFooter>
                    
                </HomeFooter>
           
            
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        clientIsLoggedIn: state.user.clientIsLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
