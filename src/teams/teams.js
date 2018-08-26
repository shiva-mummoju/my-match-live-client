import React, { Component } from "react";
import axios from "./../axios-config";
import Header from "./../components/header";
import "./teams.css";

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = props.location.state;
  }

  componentDidMount = () => {
    var newmatch = this.state.newmatch;
    newmatch._id = this.state.match_id;
    this.setState({ newmatch: newmatch });
    document.getElementById("team1").value = "team1";
    document.getElementById("team2").value = "team2";
    document.getElementById("1").value = "player1";
    document.getElementById("2").value = "player2";
    document.getElementById("3").value = "player3";
    document.getElementById("4").value = "player4";
    document.getElementById("5").value = "player5";
    document.getElementById("6").value = "player6";
    document.getElementById("7").value = "player7";
    document.getElementById("8").value = "player8";
    document.getElementById("9").value = "player9";
    document.getElementById("10").value = "player10";
    document.getElementById("11").value = "player11";
    document.getElementById("12").value = "player1";
    document.getElementById("13").value = "player2";
    document.getElementById("14").value = "player3";
    document.getElementById("15").value = "player4";
    document.getElementById("16").value = "player5";
    document.getElementById("17").value = "player6";
    document.getElementById("18").value = "player7";
    document.getElementById("19").value = "player8";
    document.getElementById("20").value = "player9";
    document.getElementById("21").value = "player10";
    document.getElementById("22").value = "player11";
    document.getElementById("overs").value = 10;
    document.getElementById("toss").value = 0;
  };

  updateAllTheNames = () => {
    var newmatch = this.state.newmatch;
    newmatch.team[0].name = document.getElementById("team1").value;
    newmatch.team[1].name = document.getElementById("team2").value;
    newmatch.team[0].players[0].playerName = document.getElementById("1").value;
    newmatch.team[0].players[1].playerName = document.getElementById("2").value;
    newmatch.team[0].players[2].playerName = document.getElementById("3").value;
    newmatch.team[0].players[3].playerName = document.getElementById("4").value;
    newmatch.team[0].players[4].playerName = document.getElementById("5").value;
    newmatch.team[0].players[5].playerName = document.getElementById("6").value;
    newmatch.team[0].players[6].playerName = document.getElementById("7").value;
    newmatch.team[0].players[7].playerName = document.getElementById("8").value;
    newmatch.team[0].players[8].playerName = document.getElementById("9").value;
    newmatch.team[0].players[9].playerName = document.getElementById("10").value;
    newmatch.team[0].players[10].playerName = document.getElementById("11").value;
    newmatch.team[1].players[0].playerName = document.getElementById("12").value;
    newmatch.team[1].players[1].playerName = document.getElementById("13").value;
    newmatch.team[1].players[2].playerName = document.getElementById("14").value;
    newmatch.team[1].players[3].playerName = document.getElementById("15").value;
    newmatch.team[1].players[4].playerName = document.getElementById("16").value;
    newmatch.team[1].players[5].playerName = document.getElementById("17").value;
    newmatch.team[1].players[6].playerName = document.getElementById("18").value;
    newmatch.team[1].players[7].playerName = document.getElementById("19").value;
    newmatch.team[1].players[8].playerName = document.getElementById("20").value;
    newmatch.team[1].players[9].playerName = document.getElementById("21").value;
    newmatch.team[1].players[10].playerName = document.getElementById("22").value;
    newmatch.maxBalls = parseInt(document.getElementById("overs").value , 10) * 6;
    console.log("starting a match with balls ", newmatch.maxBalls);
    newmatch.toss = document.getElementById("toss").value;
    newmatch.currentBatting = newmatch.toss;
    newmatch.team[0].wickets = 0;
    newmatch.team[1].wickets = 0;
    newmatch.team[0].currentStriker = 0;
    newmatch.team[0].currentNonStriker = 1;
    newmatch.team[0].currentBowler = 10;
    newmatch.team[1].currentBowler = 10;
    newmatch.team[1].currentStriker = 0;
    newmatch.team[1].currentNonStriker = 1;
    newmatch.team[0].preBowler = -1;
    newmatch.team[1].preBowler = -1;
    if(newmatch.currentBatting === 1){
        newmatch.currentBowling = 0;
    }else
    newmatch.currentBowling = 1;


    if(newmatch.toss === 0){
        newmatch.status = "Team 0 has won the choice and are batting first!"
    }else{
        newmatch.status = "Team 1 has won the choice and are batting first!"
    }

    this.setState({ newmatch: newmatch });
  };

  startMatch = () => {
    this.updateAllTheNames();
    axios
      .post("api/update", this.state.newmatch)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/console?id=" + this.state.newmatch._id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Header/>
        <div className="row mainTeamDetails" >
    <div className="row">
        <div className="col-lg-12 col-xs-12  ">
            <div className="matchdetails">ENTER DETAILS OF THE MATCH</div>
        </div>
    </div>
    <div className="row">
        <div className="col-lg-6 col-sm-6 col-xs-12  teamDetailsCol ">
        <div className="teamdetails">
            <div className="row">
                <div className="col-lg-12 col-xs-12  teamname">TEAM 1 NAME</div>
                <div className="col-lg-12 col-xs-12   ">
                    <input type="text"  className="teamname_input" id="team1"  placeholder="enter team 1 name" />
                </div>
            </div>
            <div className="row players">
            <div className="col-lg-12 col-xs-12  teamname">PLAYER NAMES    </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="1" placeholder="enter player 1 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="2" placeholder="enter player 2 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="3" placeholder="enter player 3 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text"  className="playername_input" id="4" placeholder="enter player 4 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="5" placeholder="enter player 5 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="6" placeholder="enter player 6 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="7" placeholder="enter player 7 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text"  className="playername_input" id="8" placeholder="enter player 8 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text"  className="playername_input" id="9" placeholder="enter player 9 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="10" placeholder="enter player 10 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="11" placeholder="enter player 11 name" />
                </div>
            </div>
        </div></div>

        <div className="col-lg-6 col-sm-6  col-xs-12  teamDetailsCol">
        <div className="teamdetails">
            <div className="row">
                <div className="col-lg-12 col-xs-12  teamname">TEAM 2 NAME</div>
                <div className="col-lg-12 col-xs-12   ">
                    <input type="text" className="teamname_input" id="team2" placeholder="enter team 2 name" />
                </div>
            </div>
            <div className="row players">
              <div className="col-lg-12 col-xs-12  teamname">PLAYER NAMES    </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="12" placeholder="enter player 1 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="13" placeholder="enter player 2 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text"  className="playername_input"  id="14" placeholder="enter player 3 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="15" placeholder="enter player 4 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="16" placeholder="enter player 5 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="17" placeholder="enter player 6 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="18" placeholder="enter player 7 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="19" placeholder="enter player 8 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="20" placeholder="enter player 9 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="21" placeholder="enter player 10 name" />
                </div>
                <div className="col-lg-12 col-xs-12  player">
                    <input type="text" className="playername_input"  id="22" placeholder="enter player 11 name" />
                </div>
            </div>
            </div>
        </div>
    </div>
    <div className="row overs_element">
        <div className="col-lg-12 col-xs-12  teamname overs_heading">Overs</div>
        <div className="col-lg-12 col-xs-12  ">
            <input type="number" className="overs_input" id="overs" placeholder="Enter the overs of the match" />
        </div>
    </div>
    <div className="row overs_element">
        <div className="col-lg-12 col-xs-12  teamname toss_element">Who bats first?</div>
        <div className="col-lg-12 col-xs-12  ">
            <input type="number" className="overs_input" id="toss" placeholder="toss" />
        </div>
    </div>
    <div className="row">
        <div className="col-lg-12 col-xs-12  startMatchButtonElement">
            <button className="btn btn-primary startMatchButton" onClick={this.startMatch}>
                Start the match
            </button>
        </div>
    </div>
</div>

      </div>
    );
  }
}

export default Teams;
