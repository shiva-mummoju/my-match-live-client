import React, { Component } from "react";
import openSocket from "socket.io-client";
import queryString from "query-string";

import axios from "./../axios-config";
import Header from "./../components/header";
import "./score.css";

// var baseURL = "http://localhost:5000";
var baseURL = "https://rocky-brook-58200.herokuapp.com";

class Score extends Component {
  socketView = null;

  componentDidMount = () => {
    // this.setState({match: this.props.location.state});
    // console.log("props inside the score" , this.props);

    var params = queryString.parse(this.props.location.search);
    axios.get("api/getmatch/" + params.id).then(res => {
      console.log(res);
      this.setState({ match: res.data });

      this.socket = openSocket(baseURL);
      this.socket.on("connect", () => {
        console.log("connected to server");

        this.socket.emit("join", this.state.match._id, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("joined room", this.state.match._id);
          }
        });
      });

      this.socket.on("bowled", payload => {
        //   console.log("ball recieved", payload);
        this.setState({ match: payload });
      });
    });
  };

  onStatsClicked = () => {
    console.log("Going to the stats page");
    this.props.history.push("/stats");
  };

  renderBalls = () => {
    if (this.state.match) {
      this.state.match.balls.map((ball, id) => {
        return <p key={id}>{ball.ballDesc}</p>;
      });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="main">
          <div className="row ">
            <div className="col-lg-3 col-sm-3" />
            <div className="col-lg-6 col-sm-6 scorecard">
              <div className="row mainscore ">
                <div className="col-lg-12 col-sm-12">
                  <div className="row mainscore-score ">
                    ind 413 / 6 <span> (87.5 overs) crr: 3.53 </span>
                    <button
                      className="btn btn-info"
                      onClick={this.onStatsClicked}
                    >
                      Stats
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={this.onStatsClicked}
                    >
                      Share
                    </button>
                  </div>
                  <div className="row innings">ind chose to bat</div>
                </div>
                {/* <div className="col-lg-6 col-sm-6" /> */}
              </div>
              <div className="row batsman ">
                <div className="col-lg-6 col-sm-6 ">BATSMAN</div>
                <div className="col-lg-1 col-sm-1">Runs</div>
                <div className="col-lg-1 col-sm-1">Balls</div>
                <div className="col-lg-1 col-sm-1">fours</div>
                <div className="col-lg-1 col-sm-1">six</div>
                <div className="col-lg-2 col-sm-2">sr</div>
              </div>
              <div className="row striker">
                <div className="col-lg-6 col-sm-6">rishab</div>
                <div className="col-lg-1 col-sm-1">12</div>
                <div className="col-lg-1 col-sm-1">34</div>
                <div className="col-lg-1 col-sm-1">23</div>
                <div className="col-lg-1 col-sm-1">6</div>
                <div className="col-lg-2 col-sm-2">sr</div>
              </div>
              <div className="row striker ">
                <div className="col-lg-6 col-sm-6">hardik</div>
                <div className="col-lg-1 col-sm-1">23</div>
                <div className="col-lg-1 col-sm-1">23</div>
                <div className="col-lg-1 col-sm-1">34</div>
                <div className="col-lg-1 col-sm-1">6</div>
                <div className="col-lg-2 col-sm-2">45</div>
              </div>
              <div className="row bowler">
                <div className="col-lg-6 col-sm-6">BOWLER</div>
                <div className="col-lg-1 col-sm-1">O</div>
                <div className="col-lg-1 col-sm-1">M</div>
                <div className="col-lg-1 col-sm-1">R</div>
                <div className="col-lg-1 col-sm-1">W</div>
                <div className="col-lg-2 col-sm-2">Eco</div>
              </div>
              <div className="row bowlerstats ">
                <div className="col-lg-6 col-sm-6">Stokes</div>
                <div className="col-lg-1 col-sm-1">4</div>
                <div className="col-lg-1 col-sm-1">3</div>
                <div className="col-lg-1 col-sm-1">23</div>
                <div className="col-lg-1 col-sm-1">23</div>
                <div className="col-lg-2 col-sm-2">12</div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-3" />
          </div>

          <div className="row break">
            <div className="col-lg-3 col-sm-3" />
            <div className="col-lg-6 col-sm-6 scorecard">
              <div className="col-lg-12  ">
                <div className="row oneballdesc ">Live Updates</div>

                {this.state &&
                  this.state.match.balls.map((ball, id) => {
                    return (
                      <div className="row oneball " key={id}>
                        <div className="col-lg-1 over">{ball.ballNumber}</div>
                        <div className="col-lg-11">{ball.ballDesc}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-lg-3 col-sm-3" />
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
