import React, { Component } from "react";
import openSocket from "socket.io-client";
import queryString from "query-string";

import axios from "./../axios-config";
import Header from "./../components/header";
import "./score.css";
import env from "./../environments";
import Loadable from "react-loading-overlay";

class Score extends Component {
  socketView = null;

  constructor(props){
    super(props);

    this.state = {
      loading:false,
    }
  }
 

  componentDidMount = () => {
    this.setState({loading: true});

    var params = queryString.parse(this.props.location.search);
    axios.get("api/getmatch/" + params.id).then(res => {
      console.log(res);
      this.setState({ match: res.data ,  loading:false });

      this.socket = openSocket(env.serverURL);
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
    }).catch(err => {
      window.alert("wrong match id");
      this.props.history.goBack();
    });
  };

  onStatsClicked = () => {
    console.log("Going to the stats page");
    this.props.history.push("/stats" , this.state.match);
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

      <Loadable   active={this.state.loading}
      spinner
      text='Loading..'>
      <div>

        <Header />
        {/* modal for sharing with friends */}
        
        {/* modal for choosing new bowler */}
       
        
        <div className="main">
          <div className="row ">
            <div className="col-lg-3 col-sm-2 col-xs-1" />
            <div className="col-lg-6 col-sm-8 col-xs-10 scorecard">
              <div className="row mainscore ">
                <div className="col-lg-12 col-sm-12  col-xs-12 nopadding">
                  <div className="row mainscore-score ">
                    {
                     (this.state && this.state.match) ? this.state.match.team[this.state.match.currentBatting].name : "NA"
                    }  &nbsp;
                    {
                      (this.state && this.state.match) ? this.state.match.team[this.state.match.currentBatting].score : "NA"
                    }/ 
                    {
                      (this.state && this.state.match) ? this.state.match.team[this.state.match.currentBatting].wickets : "NA"
                    }   <span> ({
                      (this.state && this.state.match) ? Math.floor(this.state.match.team[this.state.match.currentBatting].ballsPlayed /6 ): "NA"
                    }.{
                      (this.state && this.state.match) ? this.state.match.team[this.state.match.currentBatting].ballsPlayed %6 : "NA"
                    }) <br className="visible-xs"/>Rr: {(this.state && this.state.match) ? ((this.state.match.team[this.state.match.currentBatting].score /this.state.match.team[this.state.match.currentBatting].ballsPlayed)*6).toFixed(2) : '' } </span>
                    
                    <button
                      className="btn btn-info"
                      onClick={this.onStatsClicked}
                    >
                      Stats
                    </button>
                  </div>
                  <div className="row innings">Match Id: {this.state.match? this.state.match._id : ""}</div>
                  <div className="row innings">{(this.state && this.state.match)? this.state.match.status : ""}</div>
                </div>
              </div>
              <div className="row batsman ">
                <div className="col-lg-6 col-sm-6   col-xs-6 nopadding">BATSMAN &nbsp; 

                 </div>
                <div className="col-lg-1 col-sm-1  col-xs-1 nopadding">R</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 nopadding">B</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 nopadding">4</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 nopadding">6</div>
                <div className="col-lg-2 col-sm-2  col-xs-2 nopadding">sr</div>
              </div>
              <div className="row striker onlyTopPadding">
                <div className="col-lg-6 col-sm-6  col-xs-6 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].playerName: ""}* &nbsp; 

                </div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].runsScored: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].ballsFaced: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].fours: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].sixes: ""}</div>
                <div className="col-lg-2 col-sm-2  col-xs-2 onlyTopPadding">{(this.state && this.state.match)? (this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].runsScored / this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].ballsFaced * 100).toFixed(2) : "" }</div>
              </div>
              <div className="row striker onlyTopPadding">
                <div className="col-lg-6 col-sm-6  col-xs-6 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].playerName: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].runsScored: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].ballsFaced: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].fours: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].sixes: ""}</div>
                <div className="col-lg-2 col-sm-2  col-xs-2 onlyTopPadding">{(this.state && this.state.match)? (this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].runsScored / this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].ballsFaced * 100).toFixed(2) : "" }</div>
              </div>
              <div className="row bowler">
                <div className="col-lg-6 col-sm-6  col-xs-6 onlyTopPadding">BOWLER &nbsp;
                </div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">O</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">M</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">R</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">W</div>
                <div className="col-lg-2 col-sm-2  col-xs-2 onlyTopPadding">Eco</div>
              </div>
              <div className="row bowlerstats ">
                <div className="col-lg-6 col-sm-6  col-xs-6 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].playerName: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? Math.floor(this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].ballsBowled / 6): ""}.{(this.state && this.state.match)?this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].ballsBowled % 6: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].maidens: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].runsGiven: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 onlyTopPadding">{(this.state && this.state.match)? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].wickets: ""}</div>
                <div className="col-lg-2 col-sm-2  col-xs-2 onlyTopPadding">0</div>
              </div>
              
            </div>

            <div className="col-lg-3 col-sm-2 col-xs-1" />
          </div>
          <div className="row break">
            <div className="col-lg-3 col-sm-2  col-xs-1" />
            <div className="col-lg-6 col-sm-8   col-xs-10 scorecard ">
              <div className="col-lg-12   col-xs-12 nopadding ">
                <div className="row oneballdesc ">Live Updates</div>

                {(this.state && this.state.match) && 
                  this.state.match.balls.map((ball, id) => {
                    return (
                      <div className="row oneball " key={id}>
                        <div className="col-lg-1   col-xs-1  over">{ball.ballNumber}</div>
                        <div className="col-lg-11   col-xs-11">{ball.ballDesc}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-lg-3 col-sm-2  col-xs-1" />
          </div>
        </div>
        
      </div>

        </Loadable>
    );
  }
}

export default Score;
