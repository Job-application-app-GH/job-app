import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import loginImg from '../styles/logo3.svg'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="base-container">
      {/* <div className='header'>
     POSSIBLE.HEADER.HERE
    </div> */}
      <div className="login-img">
        <img src={loginImg} className="login-img-itself" alt="" />
      </div>
      <div className="form">
        <form
          onSubmit={(event) => handleSubmit(event, props.history)}
          name={name}
        >
          <div>
            <label htmlFor="email">
              <small className="login-words">Email</small>
            </label>
            <input className="form-group" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="password">
              <small className="login-words">Password</small>
            </label>
            <input
              className="form-group"
              name="password"
              type="password"
              required
            />
          </div>
          <br />
          <div>
            {/* <Link to="/home"> */}
            <button className="login-button" type="submit">
              {displayName}
            </button>
            {/* </Link> */}
          </div>
          {error && error.response && <div> {error.response.data} </div>}
          <br />
          <a href="/auth/google" className="signup-link">
            {displayName} with Google
          </a>
        </form>
      </div>
      <div>
        <Link to="/signup" className="signup-link">
          <h3>New to *appname*? Sign up here</h3>
        </Link>
      </div>
      {/* <div>
        <Link to="/signup" >
          <button >New to *appname*? Sign up here</button>
        </Link>
      </div> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, history) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, history))
    },
  }
}

const Login = connect(mapLogin, mapDispatch)(AuthForm)
export default Login
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
