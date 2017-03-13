import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class UserProfile extends Component {
  componentWillMount () {
    this.props.fetchProfile()
  }

  render () {
    return (
      <div className="col-md-4">{this.props.message}</div>
    )
  }
}

function mapStateToProps (state) {
  return { message: state.auth.message }
}

export default connect(mapStateToProps, actions)(UserProfile)
