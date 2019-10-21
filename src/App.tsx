import React, { Component } from 'react';
import { Button, Icon } from "semantic-ui-react";

import Menu from './modules/menu/components/Menu';
import ShowMe from "./modules/menu/components/ShowMe";

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const scopes = 'user-read-private user-read-email';
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;


class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = { tokenExpired: true };
  }

  componentDidMount() {
    const token: RegExpMatchArray | null = window.location.href.match(/access_token=(.*)/);
    const code: string | null = token && token[1];
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
    return REDIRECT_URI && 'https://accounts.spotify.com/authorize' +
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
              <ShowMe/>
              <p style={{ fontSize: '1em' }}>
                This application requires you to log into your Spotify account to search for Artists
              </p>
              <Button
                color='olive'
                href={ App.getAuthorizationUrl() }>
                <Icon name='spotify' /> Login to Spotify
              </Button>
            </div> :
              <Menu/>
          }
        </header>
      </div>
    );
  }
}

export default App;
