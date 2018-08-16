import React, { Component } from 'react';

class Start extends Component {
  startNewMatch = () => {
    console.log("start new match clicked");
    this.props.history.push("/teams");
  };

  resumeMatch = () => {
    console.log("resume match clicked");
    this.props.history.push("/console");
  };

  render() {
    return (
      <div>
        <h1>Host a match</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <input type="text" placeholder="Enter match id" />
        <button className="btn btn-primary" onClick={this.resumeMatch}>
          resume match
        </button>
        <br />
        <br />
        <button className="btn btn-primary" onClick={this.startNewMatch}>
          Start new match
        </button>
      </div>
    );
  }
}

export default Start;