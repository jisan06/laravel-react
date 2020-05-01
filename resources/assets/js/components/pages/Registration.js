import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/actions/authActions";

class Registration extends React.Component {
	state = {
	    name: "",
	    email: "",
	    password: "",
	    confirm_password: "",
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
	    let { name, email, password, confirm_password } = this.state;
	    this.props.register(
	    	{ name, email, password, confirm_password },
      			this.props.history
      		);
	  };

	render(){
		let { name, email, password, confirm_password, error } = this.state;
		return(
			<div className="row">
		        <div className="col-md-6 offset-md-3">
		          <h3 className="text-center">Register Here</h3>
		          <form onSubmit={this.submitHandler}>
		          	<div className="form-group">
		              <label htmlFor="name"> Name: </label>
		              <input
		                type="text"
		                className={
		                  error.name ? "form-control is-invalid" : "form-control"
		                }
		                placeholder="Enter Your Name"
		                name="name"
		                id="name"
		                value={name}
		                onChange={this.changeHandler}
		              />
		              {error.name && (
		                <div className="invalid-feedback">{error.name}</div>
		              )}
		            </div>

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

		            <div className="form-group">
		              <label htmlFor="confirm-password">Confirm Password: </label>
		              <input
		                type="password"
		                className="form-control"
		                className={
		                  error.confirm_password ? "form-control is-invalid" : "form-control"
		                }
		                name="confirm_password"
		                id="confirm_password"
		                value={confirm_password}
		                onChange={this.changeHandler}
		              />
		              {error.confirm_password && (
		                <div className="invalid-feedback">{error.confirm_password}</div>
		              )}
		            </div>
		            <button className="btn btn-primary my-3 d-block">Register</button>
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
  { register }
)(Registration);