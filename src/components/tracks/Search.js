import React, { Component } from "react";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: ""
  };

  updateTitle = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submit_search = event => {
    event.preventDefault();
    let trackTitle = this.state.trackTitle.replace(" ", "%20");
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    )
      .then(res => res.json())
      .catch(error => console.error("Error: ", error))
      .then(res => {
        console.log("Response: ", res);
        this.setState({
          trackTitle: ""
        });
      });
  };

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className="card card-body mb-4 p4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.submit_search}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.updateTitle}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
