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
    document.getElementById("team1").value = "team 1";
    document.getElementById("team2").value = "team 2";
    document.getElementById("1").value = "player 1";
    document.getElementById("2").value = "player 2";
    document.getElementById("3").value = "player 3";
    document.getElementById("4").value = "player 4";
    document.getElementById("5").value = "player 5";
    document.getElementById("6").value = "player 6";
    document.getElementById("7").value = "player 7";
    document.getElementById("8").value = "player 8";
    document.getElementById("9").value = "player 9";
    document.getElementById("10").value = "player 10";
    document.getElementById("11").value = "player 11";
    document.getElementById("12").value = "player 1";
    document.getElementById("13").value = "player 2";
    document.getElementById("14").value = "player 3";
    document.getElementById("15").value = "player 4";
    document.getElementById("16").value = "player 5";
    document.getElementById("17").value = "player 6";
    document.getElementById("18").value = "player 7";
    document.getElementById("19").value = "player 8";
    document.getElementById("20").value = "player 9";
    document.getElementById("21").value = "player 10";
    document.getElementById("22").value = "player 11";
    document.getElementById("overs").value = 10;
    document.getElementById("toss").value = 1;
  };

  updateAllTheNames = () => {
    var newmatch = this.state.newmatch;
    newmatch.team1Name = document.getElementById("team1").value;
    newmatch.team2Name = document.getElementById("team2").value;
    newmatch.team1Players[0].playerName = document.getElementById("1").value;
    newmatch.team1Players[1].playerName = document.getElementById("2").value;
    newmatch.team1Players[2].playerName = document.getElementById("3").value;
    newmatch.team1Players[3].playerName = document.getElementById("4").value;
    newmatch.team1Players[4].playerName = document.getElementById("5").value;
    newmatch.team1Players[5].playerName = document.getElementById("6").value;
    newmatch.team1Players[6].playerName = document.getElementById("7").value;
    newmatch.team1Players[7].playerName = document.getElementById("8").value;
    newmatch.team1Players[8].playerName = document.getElementById("9").value;
    newmatch.team1Players[9].playerName = document.getElementById("10").value;
    newmatch.team1Players[10].playerName = document.getElementById("11").value;
    newmatch.team2Players[0].playerName = document.getElementById("12").value;
    newmatch.team2Players[1].playerName = document.getElementById("13").value;
    newmatch.team2Players[2].playerName = document.getElementById("14").value;
    newmatch.team2Players[3].playerName = document.getElementById("15").value;
    newmatch.team2Players[4].playerName = document.getElementById("16").value;
    newmatch.team2Players[5].playerName = document.getElementById("17").value;
    newmatch.team2Players[6].playerName = document.getElementById("18").value;
    newmatch.team2Players[7].playerName = document.getElementById("19").value;
    newmatch.team2Players[8].playerName = document.getElementById("20").value;
    newmatch.team2Players[9].playerName = document.getElementById("21").value;
    newmatch.team2Players[10].playerName = document.getElementById("22").value;
    newmatch.maxOvers = document.getElementById("overs").value;
    newmatch.toss = document.getElementById("toss").value;
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
