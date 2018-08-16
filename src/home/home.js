import React, { Component } from "react";

class Home extends Component {


     onHostClicked = () => {
         console.log("Host button clicked");
        this.props.history.push("/start");
    }


    onViewMatchClicked = () => {
        console.log("View match clicked");
        this.props.history.push("/score");
    }

  render() {
    return (
      <div>
        <h1>My Match Live</h1>
        <br />
        <br /><br />
        View Match<br /><br />
        <input type="text" placeholder="enter the match id" />
        <button  className="btn btn-primary"   onClick={this.onViewMatchClicked}>View Match</button>
        <br /><br />
        <button  onClick={this.onHostClicked}   >Host</button>
      </div>
    );
  }
}

export default Home;
