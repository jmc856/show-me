import React, { Component } from 'react';

import { Header } from "semantic-ui-react";


const style = {
  header: {
    fontSize: '4em',
    fontWeight: 'normal',
    marginBottom: '1em',
  }
};


class ShowMe extends Component {
  render() {
    return (
      <div>
        <Header
          as='h2'
          content='Show Me'
          inverted
          style={style.header}
      />
      </div>
    );
  }
}

export default ShowMe;
