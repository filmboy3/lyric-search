import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    id: ""
  };

  componentDidMount() {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
      }&apikey=${process.env.REACT_APP_MM_KEY}`
    )
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(({ message }) => {
        let lyrics = message.body.lyrics;
        this.setState({
          lyrics
        });
        return fetch(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(({ message }) => {
        let track = message.body.track;
        this.setState({
          track
        });
      });
  }

  render() {
    const { track, lyrics } = this.state;
    return (
      <div>
        <h1>Lyrics</h1>
        {Object.keys(track).length > 0 ? (
          <React.Fragment>
            <Link to="/" className="btn btn-dark btn-sm mb-4">
              Go Back
            </Link>
            <div className="card">
              <h5 className="card-header">
                {track.track_name} by{" "}
                <span className="text-secondary">{track.artist_name}</span>
              </h5>
              <div className="card-body">
                <p className="card-text">{lyrics.lyrics_body}</p>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default Lyrics;
