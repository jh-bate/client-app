import React from 'react'
import axios from 'axios';

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
    const authStr = `Bearer ${this.props.accessToken}`;
    console.log('Authorization: ', authStr);

    return axios.get("https://tidepool.auth0.com/userinfo", { headers: { Authorization: authStr }})
      .then((response) => {
        const profileData = response.data;
        console.log('user profile:', profileData);
        if (profileData && profileData.sub) {
          const userID = profileData.sub.split("|")[1];
          const url = `https://dev-api.tidepool.org/data/${userID}`;
          axios.get(url, { headers: { Authorization: authStr }})
            .then((response) => {
              this.setState({ data: response.data });
            })
            .catch((error) => {
              this.setState({ dataError: error.message });
            });
        }
        this.setState({ profile: profileData });
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
        <h3>Profile</h3>
        <div className="data-error">{ this.state.profileError }</div>
        <hr />
      </div>
      <div className="user-name">{ this.state.profile.name }</div>
      <div className="header">
        <h3>Device Data</h3>
        <div className="data-error">{ this.state.dataError }</div>
        <hr />
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