import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_PROFILE
} from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser ({ email, password }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })

        window.localStorage.setItem('token', response.data.token)

        browserHistory.push('/userprofile')
      })

      // On fail
      .catch(() => {
        dispatch(authError('Bad Login Info'))
      })
  }
}

export function signupUser ({ email, password, firstName, lastName }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, firstName, lastName })
      .then(response => {
        dispatch({ type: AUTH_USER })

        window.localStorage.setItem('token', response.data.token)

        browserHistory.push('/userprofile')
      })

      // On fail
      .catch(response => dispatch(authError(response.data.error)))
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  window.localStorage.removeItem('token')

  return { type: UNAUTH_USER }
}

export function fetchProfile () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/userprofile`, {
      headers: { authorization: window.localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data.message
        })
      })
  }
}
