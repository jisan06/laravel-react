import React, { Component } from 'react';
import { Link, Route, Switch, withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import PublicHeader from './pages/PublicHeader';
import PrivateHeader from './pages/PrivateHeader';
import Home from './Home';
import About from './About';
import Category from './category/Index';
import Post from './post/Index';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Error404 from './Error404';

class Header extends Component {
    render() {
        return (
            <div>
                {
                    this.props.auth.isAuthenticated ?
                        <PrivateHeader />
                    :
                        <PublicHeader />
                }

                <div className='row'>
                    <div className='col-md-12'>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/about' component={About} />

                            <PrivateRoute exact path='/category' component={Category} />
                            <PrivateRoute exact path="/category/add" component={Category} />
                            <PrivateRoute exact path="/category/edit/:id" component={Category} />

                            <PrivateRoute exact path='/post' component={Post} />
                            <PrivateRoute exact path="/post/add" component={Post} />
                            <PrivateRoute exact path="/post/edit/:id" component={Post} />

                            <SignRoute exact path='/login' component={props => <Login {...props} />} />
                            <SignRoute exact path='/registration' component={props => <Registration {...props} />} />


                            <Route exact path="/*" component={Error404} />
                        </Switch>
                    </div>
                </div>
            </div>

        );
    }
}

const SignRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => localStorage.getItem('auth_token')
      ? (<Redirect to='/' />)
      : (<Component {...props} />)
  } />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => localStorage.getItem('auth_token')
      ? (<Component {...props} />)
      : (<Redirect to='/login' />)
  } />
)

const mapStateToProps = state => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps)(Header))
//export default Header