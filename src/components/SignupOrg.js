import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'

/**
 * COMPONENT
 */
const SignUpOrg = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="companyName">
            <small>Company Name</small>
          </label>
          <input className="form-control" name="companyName" required />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input className="form-control" name="email" type="email" required />
        </div>
        <div>
          <div>
            <label htmlFor="location">
              <small>Location</small>
            </label>
            <input className="form-control" name="location" required />
          </div>

          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            className="form-control"
            name="password"
            type="password"
            required
          />
        </div>
        <div>
          <button>{displayName}</button>
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
    handleSubmit(evt) {
      evt.preventDefault()

      const companyName = evt.target.companyName.value
      const email = evt.target.email.value
      const location = evt.target.location.value
      const password = evt.target.password.value
      const userType = 'ORGANIZATION'
      console.log(companyName, email, location, password, userType)
      dispatch(signup(companyName, email, location, userType, password))
    },
  }
}

const SignupOrg = connect(mapSignup, mapDispatch)(SignUpOrg)
export default SignupOrg

/**
 * PROP TYPES
 */
SignUpOrg.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
