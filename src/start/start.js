import React, { Component } from 'react';
import axios from "./../axios-config";


class Start extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestedMatchId : "",
      newmatch: {
        startedBy: 1,
        team1Name: "team 1",
        team2Name: "team 2",
        team1Players : [
          {playerNumber: 1,playerName: "Player 1", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 2,playerName: "Player 2", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 3,playerName: "Player 3", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 4,playerName: "Player 4", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 5,playerName: "Player 5", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 6,playerName: "Player 6", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 7,playerName: "Player 7", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 8,playerName: "Player 8", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 9,playerName: "Player 9", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 10,playerName: "Player 10", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 11,playerName: "Player 11", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
        ],
        team2Players : [
          {playerNumber: 1,playerName: "Player 1", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 2,playerName: "Player 2", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 3,playerName: "Player 3", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 4,playerName: "Player 4", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 5,playerName: "Player 5", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 6,playerName: "Player 6", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 7,playerName: "Player 7", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 8,playerName: "Player 8", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 9,playerName: "Player 9", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 10,playerName: "Player 10", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
          {playerNumber: 11,playerName: "Player 11", runsScored : 0, fours: 0, sixes: 0, ballsFaced: 0, wickets: 0, ballsBowled: 0,runsGiven: 0, maidens: 0},
        ],
      
        toss: 0,
        currentInninngs: 0,
        maxOvers: 0,
        team1Score: 0,
        team2Score: 0,
        balls: [
          {ballNumber: 0, ballDesc: "No ball has been bowled yet"},
        ],
        score: 0,
        overs: 0,
        currentStriker: 0,
        currentNonStriker: 0,
        currentBowler: 0
      }
    };
  }


  startNewMatch = () => {
    console.log("start new match clicked");
    axios.post("api/create" , this.state.newmatch).then((res) => {
      console.log("Match created successfully",res.data._id);
      this.setState({match_id : res.data._id});
    this.props.history.push("/teams" , this.state);
    }).catch((err) => {
      console.log("error has occurred" , err);
    });

    
  };

  resumeMatch = () => {
    axios.get("api/getmatch/" + this.state.requestedMatchId).then((res) => {
      console.log("resuming match" , res.data._id);
      this.props.history.push("/console" ,res.data );
    } , (err) => {
      console.log("error in getting match " , err);
    });
  };


  matchIdChanged = (event) => {
    this.setState({
      requestedMatchId: event.target.value,
    });
  }

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
        <input type="text"   onChange={this.matchIdChanged} value={this.state.requestedMatchId}  placeholder="Enter match id" />
        <button className="btn btn-primary" onClick={this.resumeMatch} >
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