import React from 'react'
import axios from 'axios';

import { AUTH_CONFIG } from '../utils/auth0Config';

export default class User extends React.Component {
  static propTypes = {
    accessToken: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {profile: {}, data: [], dataError: '', profileError: ''};
  }

  componentDidMount() {
    this.Data();
  }

  Data() {

    const bearerToken = `Bearer ${this.props.accessToken}`;

    return axios.get(`https://${AUTH_CONFIG.domain}/userinfo`, { headers: { Authorization: bearerToken }})
      .then((response) => {
        const profileData = response.data;
        if (profileData && profileData.sub) {
          const userID = profileData.sub.split("|")[1];
          const url = `${AUTH_CONFIG.tidepoolAPI}/data/${userID}`;
          axios.get(url, { headers: { Authorization: bearerToken }})
            .then((response) => {
              this.setState({ data: response.data });
            })
            .catch((error) => {
              this.setState({ dataError: error.message });
            });
        }
      })
      .catch((error) => {
        this.setState({ profileError: error.message });
      });
  }

  render() {
    const deviceData = this.state.data.map((item, i) => {
      return <div>
        <span>{new Date(item.time).toDateString()}:  {item.type} {item.subType}</span>
      </div>
    });
    return <div id="layout-content" className="layout-content-wrapper">
      <div className="header">
        <div className="data-error">{ this.state.dataError }</div>
      </div>
      <div className="user-device-data">{ deviceData }</div>
      <style jsx>{`
        .data-error {
          color: red;
        }
      `}</style>
    </div>
  }
}