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

  submit_search = (dispatch, event) => {
    event.preventDefault();
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${
        this.state.trackTitle
      }&page_size=10&page=1&s_track_rating=desc&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    )
      .then(res => res.json())
      .catch(error => console.error("Error: ", error))
      .then(res => {
        console.log("Response: ", res);
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.message.body.track_list
        });
        this.setState({
          trackTitle: ""
        });
      });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.submit_search.bind(this, dispatch)}>
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
