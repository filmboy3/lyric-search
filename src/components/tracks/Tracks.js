import React, { Component } from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { trackList, heading } = value;
          return trackList.length > 0 ? (
            <React.Fragment>
              <h3 className="text-center mb-4">{heading}</h3>
              <div className="row">
                {trackList.map(({ track }) => {
                  return <Track key={track.track_id} track={track} />;
                })}
              </div>
            </React.Fragment>
          ) : (
            <Spinner />
          );
        }}
      </Consumer>
    );
  }
}

export default Tracks;
