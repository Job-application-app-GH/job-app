import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const SignUp = (props) => {
  // const redirectToType = () => {
  //   console.log('props->', props)
  //   props.history.push('/signup/type')
  // }
  const {name, displayName, handleSubmit, error} = props
  // console.log('PROPS_>', this.props)
  return (
    <div className="signin-container">
      <form
        onSubmit={(event) => handleSubmit(event, props.history)}
        name={name}
      >
        <div className="login-words">
          <label htmlFor="email">
            <small>Email:</small>
          </label>
          <input className="form-control" name="email" type="email" required />
        </div>
        <div className="login-words">
          <label htmlFor="password">
            <small className="login-words">Password:</small>
          </label>
          <input
            className="form-control"
            name="password"
            type="password"
            required
          />
        </div>

        <div>
          {/* <Link to="/profile/type"> */}
          <button
            type="submit"
            // onClick={redirectToType}
            className="signup-button"
          >
            {displayName}
          </button>
          {/* </Link> */}
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <br />
        <a href="/auth/google" className="btn btn-success">
          {displayName} with Google
        </a>
      </form>
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

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt, history) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(signup(email, password, history))
    },
  }
}

export default connect(mapSignup, mapDispatch)(SignUp)

/**
 * PROP TYPES
 */
SignUp.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
