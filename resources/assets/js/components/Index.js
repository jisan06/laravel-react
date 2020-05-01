import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode'
import store from './store';
import * as Types from './store/actions/types'

import Header from './Header';
import Footer from './Footer';
import setAuthToken from './utils/setAuthToken'

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const token = localStorage.getItem('auth_token')
if (token) {
    let decode = jwtDecode(token)
    setAuthToken(token)
    store.dispatch({
        type: Types.SET_USER,
        payload: {
            user: decode
        }
    })
}

export default class Index extends Component {
    render() {
        return (
        	<Provider store = {store}>
	            <div className="container">
	                <Header />
	            </div>
            </Provider>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
