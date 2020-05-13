import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode'
import Axios from 'axios'

import store from './store';
import * as Types from './store/actions/types'

import Header from './Header';
import setAuthToken from './utils/setAuthToken'
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'

import packageJson from '../package.json';

axios.defaults.baseURL = packageJson.server_url;
var baseURL = packageJson.base_url;

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

export default class App extends Component {
    render() {
        return (

            <Router basename={baseURL}>
            	<Provider store = {store}>
    	            <div className="container">
    	                <Header />
    	            </div>
                </Provider>
            </Router>
        );
    }
}

