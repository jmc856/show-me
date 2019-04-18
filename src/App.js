import React, { Component } from 'react';

import MainContainer from './modules/main/components/mainContainer';

import {Button, Icon} from "semantic-ui-react";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const scopes = 'user-read-private user-read-email';
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tokenExpired: true };
  }

  componentDidMount() {
    const code =
      window.location.href.match(/access_token=(.*)/) &&
      window.location.href.match(/access_token=(.*)/)[1];

    if (code) {
      const accessToken = code.split("&");
      const expires = parseInt(accessToken[2].split('=')[1]);
      const type = accessToken[1].split('=')[1];
      const expiresUnix = new Date().getTime() + expires;
      const token = {
        token: accessToken[0],
        type: type,
        expires: expiresUnix
      };
      window.localStorage.setItem('spotifyAccessToken', JSON.stringify(token));
      this.setState({tokenExpired: false})
    }
  }

  static getAuthorizationUrl() {
    return 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' +
      CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(REDIRECT_URI)
  }

  static _isSpotifyTokenExpired() {
    let expired = true;
    const token = window.localStorage.getItem('spotifyAccessToken');
    if (token && JSON.parse(token)) {
      let expires = JSON.parse(token).expires;
      expired = new Date().getTime() > expires;
    }
    return expired
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            App._isSpotifyTokenExpired() ?
            <div>
              <Button
                color='olive'
                href={ App.getAuthorizationUrl() }>
                <Icon name='spotify' /> Login to Spotify
              </Button>
            </div> :
              <MainContainer/>
          }
        </header>
      </div>
    );
  }
}

export default App;
