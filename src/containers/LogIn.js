import React, { Component } from 'react';
import Authenticate from 'react-openidconnect';
import OidcSettings from '../oidcsettings';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.userLoaded = this.userLoaded.bind(this);
        this.userUnLoaded = this.userUnLoaded.bind(this);

        this.state = { user: undefined };
    }

    userLoaded(user) {
        if (user)
            this.setState({ "user": user });
    }

    userUnLoaded() {
        this.setState({ "user": undefined });
    }

    NotAuthenticated() {
        return <div>You are not authenticated, please click here to authenticate.</div>;
    }

    render() {
        return (
            <Authenticate OidcSettings={OidcSettings} userLoaded={this.userLoaded} userunLoaded={this.userUnLoaded} renderNotAuthenticated={this.NotAuthenticated}>
            <div>If you see this you are authenticated.</div>
        </Authenticate>
        )
    }
}

export default LogIn;
