import React from 'react'
import AuthService from '../utils/AuthService'
import User from '../components/User'
import Login from '../components/Login'
import Logout from '../components/Logout'
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

  user() {
    if (this.state.loggedIn) {
      return (
        <div><User accessToken={this.auth.getAccessToken()}/></div>
      );
    }
  }

  loadTidepoolData() {
    if (this.state.loggedIn) {
      return (
        <div>
          <Logout/>
          {this.user()}
        </div>
      );
    }
    const nonce = Math.random().toString(36).substring(7);
    //will show the hosted version of "lock" 
    const authURL = `https://tidepool.auth0.com/authorize?scope=${AUTH_CONFIG.scope}&audience=${AUTH_CONFIG.audience}&response_type=${AUTH_CONFIG.responseType}&client_id=${AUTH_CONFIG.clientId}&redirect_uri=${AUTH_CONFIG.redirectUri}&nonce=${nonce}`
    //will redirect to the hosted tidepool login app
    //const loginURL = `http://localhost:3007?scope=${AUTH_CONFIG.scope}&audience=${AUTH_CONFIG.audience}&response_type=${AUTH_CONFIG.responseType}&client_id=${AUTH_CONFIG.clientId}&redirect_uri=${AUTH_CONFIG.redirectUri}&nonce=${nonce}`
    
    return (
      <a className="login" href={authURL}>
        Connect to Tidepool
      </a>
    );

    // return (
    //   <Login/>
    // );
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
        a.login {
          text-align: center;
          width: 20%;
          font: 15px Monaco;
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 16px 32px;
          text-decoration: none;
          margin: auto;
          cursor: pointer;
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