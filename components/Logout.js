import React from 'react'

import AuthService from '../utils/AuthService'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.auth = new AuthService();
    }

    handleLogout() {
        this.auth.logout();
    }

    render() {
        return <div>
             <form onSubmit={this.handleLogout}>
                <input type="submit" value="Logout" />
            </form>
            <style jsx>{`
            form {
                text-align: center;
                font: 15px Monaco;
            }
            input[type=submit] {
                width: 20%;
                font: 15px Monaco;
                background-color: #0b9eb3;
                border: none;
                color: white;
                padding: 16px 32px;
                text-decoration: none;
                margin: 4px 2px;
                cursor: pointer;
            }
            `}</style>
        </div>
    }
}