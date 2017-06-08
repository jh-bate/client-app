import React from 'react'
import AuthService from '../utils/AuthService'
import DeviceData from '../components/DeviceData'
import { AUTH_CONFIG } from '../utils/auth0Config';

export default class extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { loggedIn: false }
  }

  componentDidMount() {
    this.auth = new AuthService();
    this.setState({ 
      loggedIn: this.auth.loggedIn(),
      accessToken: this.auth.getAccessToken(),
     })
  }

  userData() {
    if (this.state.loggedIn) {
      return (
        <div><DeviceData userID="423b3dcf31"  accessToken={this.auth.getAccessToken()} /></div>
      );
    }
  }

  loadTidepoolData() {
    if (this.state.loggedIn) {
      return this.userData();
    }
    const nonce = Math.random().toString(36).substring(7);
    const authURL = `https://tidepool.auth0.com/authorize?scope=${AUTH_CONFIG.scope}&audience=${AUTH_CONFIG.audience}&response_type=${AUTH_CONFIG.responseType}&client_id=${AUTH_CONFIG.clientId}&redirect_uri=${AUTH_CONFIG.redirectUri}&nonce=${nonce}`
    return (
      <a href={authURL}>
        Connect to Tidepool
      </a>
    );
  }

  render () {
   
    return (
      <div className='app'>
      <div className='header'>
        <h3>Your Acesulfame K</h3>
      </div>
      <div>
        { this.loadTidepoolData() }
      </div>
      <style jsx>{`
        .app {
          text-align: center;
        }
        .header {
          font: 15px Monaco;
        }
        table {
          font-family: Arial;
          margin: 25px auto;
          border-collapse: collapse;
          border: 1px solid #eee;
          border-bottom: 2px solid #00cccc;
        }
        td {
          color: #999;
          border: 1px solid #eee;
          padding: 12px 35px;
          border-collapse: collapse;
        }
        hr {
          height: 1px;
          border: 0;
          color: #333;
          background-color: #333;
          width: 60%;
        } 
      `}</style>
      </div>
    )
  }
}