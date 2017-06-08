import React from 'react'
import axios from 'axios';

export default class DeviceData extends React.Component {
  static propTypes = {
    userID: React.PropTypes.string.isRequired,
    accessToken: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {data: [], error: ''};
  }

  componentDidMount() {
    this.UserData();
  }

  UserData() {
    const authStr = `Bearer ${this.props.accessToken}`;
    const url = `http://localhost:8009/data/${this.props.userID}`;
    console.log('Authorization: ', authStr);
    return axios.get(url, { headers: { Authorization: authStr }})
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
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
        <h3>Device Data</h3>
        <hr />
      </div>
      <div className="data-list">{ deviceData }</div>
      <div className="data-error">{ this.state.error }</div>
      <style jsx>{`
        .data-error {
          color: red;
        }
      `}</style>
    </div>
  }
}