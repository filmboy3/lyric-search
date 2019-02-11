import React, { Component } from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { trackList } = value;
          return trackList.length > 0 ? <h1>Tracks Loaded</h1> : <Spinner />;
        }}
      </Consumer>
    );
  }
}

export default Tracks;
