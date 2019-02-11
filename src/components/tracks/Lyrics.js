import React, { Component } from "react";

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
          lyrics: lyrics
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
        let data = message.body.track;
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <h1>Lyrics</h1>
      </div>
    );
  }
}

export default Lyrics;
