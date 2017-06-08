import React, { PropTypes } from 'react'
import Router from 'next/router'
import AuthService from '../../utils/AuthService'

export default class SignedIn extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired
  }
  componentDidMount () {
    this.auth = new AuthService();
    this.auth.handleAuthentication();
    Router.push('/');
  }
  render () {
    return null;
  }
}