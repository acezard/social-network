import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_PROFILE
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case FETCH_PROFILE:
      return { ...state, message: action.payload }
  }

  return state
}
