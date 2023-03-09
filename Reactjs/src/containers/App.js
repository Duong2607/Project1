import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated} from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';

import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js';
import CheckOutPage from './checkout/CheckOutPage';
import CustomScrollbars from '../components/CustomScrollbars';
import AccountPage from './account/AccountPage';
import ForHimPage from './ItemPage/ForHimPage';
import DetailClothingPage from './ItemPage/DetailClothingPage';
import TypeOfClothing from './ItemPage/TypeOfClothing';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                      
                        {this.props.clientIsLoggedIn && <Header />}

                        <span className="content-container">
                        
                        <CustomScrollbars style ={{ height: '100vh', width: '100%', }}>
                            <Switch>
                            <Route path={'/detail-clothing/:name'} component={(DetailClothingPage)} />
                            <Route path={'/for-him/:type'} component={(TypeOfClothing)} />
                            <Route path={'/checkout'} component={(CheckOutPage)} />
                            <Route path={'/account'} component={(AccountPage)} />
                            <Route path={'/for-him'} component={(ForHimPage)} />
                            <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                            <Route path={path.HOME} exact component={(Home)} />
                            <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                            <Route path={path.HOMEPAGE} component={(HomePage)} />

                            </Switch>
                            </CustomScrollbars>

                        </span>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.clientIsLoggedIn,
        clientInfor: state.client.clientInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);