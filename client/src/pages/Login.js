import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions/authActions";

class Login extends React.Component {
	state = {
	    email: "",
	    password: "",
	    error: {}
	  };

	static getDerivedStateFromProps(nextProps, prevState) {
	    if (
	      JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)
	    ) {
	      return {
	        error: nextProps.auth.error
	      };
	    }
	    return null;
	}

	  changeHandler = event => {
	    this.setState({
	      [event.target.name]: event.target.value
	    });
	  };

	  submitHandler = event => {
	    event.preventDefault();
	    let { email, password } = this.state;
	    this.props.login(
	    	{ email, password },
      			this.props.history
      		);
	  };

	render(){
		let { email, password, error } = this.state;
		return(
			<div className="row">
		        <div className="col-md-6 offset-md-3">
		          <h3 className="text-center">Login Here</h3>
		          <form onSubmit={this.submitHandler}>
		            <div className="form-group">
		              <label htmlFor="email"> Email Address: </label>
		              <input
		                type="email"
		                className={
		                  error.email ? "form-control is-invalid" : "form-control"
		                }
		                placeholder="Enter Your Email Address"
		                name="email"
		                id="email"
		                value={email}
		                onChange={this.changeHandler}
		              />
		              {error.email && (
		                <div className="invalid-feedback">{error.email}</div>
		              )}
		            </div>

		            <div className="form-group">
		              <label htmlFor="password"> Password: </label>
		              <input
		                type="password"
		                className={
		                  error.password ? "form-control is-invalid" : "form-control"
		                }
		                placeholder="Enter Your Password"
		                name="password"
		                id="password"
		                value={password}
		                onChange={this.changeHandler}
		              />
		              {error.password && (
		                <div className="invalid-feedback">{error.password}</div>
		              )}
		            </div>
		            <button className="btn btn-primary my-3 d-block">Login</button>
		          </form>
		        </div>
		    </div>
		);
	}
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);