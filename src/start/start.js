import React, { Component } from 'react';
import axios from "./../axios-config";
import Header from "./../components/header";
import Loadable from "react-loading-overlay";


class Start extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      requestedMatchId : "",
      newmatch: {
        startedBy: 1,
        toss: 0,
        currentBatting: 0,
        maxBalls: 0,
        balls: [
          {ballNumber: 0, ballDesc: "No ball has been bowled yet"},
        ],
        team: [
          {
            name: "Team 1",
            score: 0,
            ballsPlayed: 0,
            runRate: 0,
            currentStriker: 0,
            currentNonStriker: 0,
            currentBowler: 0,
            players : [
              {playerNumber: 1,playerName: "Player 1", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 2,playerName: "Player 2", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 3,playerName: "Player 3", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 4,playerName: "Player 4", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 5,playerName: "Player 5", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 6,playerName: "Player 6", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 7,playerName: "Player 7", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 8,playerName: "Player 8", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 9,playerName: "Player 9", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 10,playerName: "Player 10", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 11,playerName: "Player 11", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
            ]
          },
          {
            name: "Team 2",
            score: 0,
            ballsPlayed: 0,
            runRate: 0,
            currentStriker: 0,
            currentNonStriker: 0,
            currentBowler: 0,
            players : [
              {playerNumber: 1,playerName: "Player 1", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 2,playerName: "Player 2", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 3,playerName: "Player 3", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 4,playerName: "Player 4", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 5,playerName: "Player 5", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 6,playerName: "Player 6", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 7,playerName: "Player 7", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 8,playerName: "Player 8", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 9,playerName: "Player 9", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 10,playerName: "Player 10", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
              {playerNumber: 11,playerName: "Player 11", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0, out: 0},
            ]
          }
        ]
      }
    };
  }


  startNewMatch = () => {
    // console.log("start new match clicked");
    this.setState({loading:true});
    axios.post("api/create" , this.state.newmatch).then((res) => {
      console.log("Match created successfully",res.data._id);
      this.setState({match_id : res.data._id , loading: false});
    this.props.history.push("/teams" , this.state);
    }).catch((err) => {
      this.setState({loading: false});
      window.alert("Some error has occurred. try again");
    });

    
  }; 

  resumeMatch = () => {
    if(this.state.requestedMatchId){
      this.props.history.push("/console?id="   + this.state.requestedMatchId);
    }
    
  };


  matchIdChanged = (event) => {
    this.setState({
      requestedMatchId: event.target.value,
    });
  }

  render() {
    return (
      <Loadable   active={this.state.loading}
      spinner
      text='Loading..'>
      <div>
        <Header/>

        <div className="row home_main">
          <div className="row home_one">
            <div className="col-lg-3 col-sm-2 col-xs-1 " />
            <div className="col-lg-6 col-sm-8 col-xs-10  home_one_content">
              <div className="row home_one_content_one">
                <div className="col-lg-12 col-sm-12 col-xs-12  view_match">RESUME MATCH</div>
                <div className="col-lg-12 col-sm-12 col-xs-12 form-group">
                <input type="text"  className="matchid" onChange={this.matchIdChanged} value={this.state.requestedMatchId}  placeholder="Enter match id" />
                </div>
                <div className="col-lg-12 col-sm-12 col-xs-12 ">
                  <button
                    className="btn btn-primary viewButton"
                    onClick={this.resumeMatch}
                  >
                    Resume Match
                  </button>
                </div>
              </div>
              <div className="row home_one_content_two">
                <div className="col-lg-12 col-sm-12 col-xs-12  host_match">START NEW MATCH</div>
                <div className="col-lg-12 col-sm-12 col-xs-12 ">
                  <button  className="btn btn-primary viewButton bring_down" onClick={this.startNewMatch}>START</button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-2 col-xs-1 " />
          </div>
        </div>
        {/* <input type="text"   onChange={this.matchIdChanged} value={this.state.requestedMatchId}  placeholder="Enter match id" />
        <button className="btn btn-primary" onClick={this.resumeMatch} >
          resume match
        </button>
        <br />
        <br />
        <button className="btn btn-primary" onClick={this.startNewMatch}>
          Start new match
        </button> */}
      </div>
      </Loadable>
    );
  }
}

export default Start;