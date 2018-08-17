import React, { Component } from "react";
import axios from "./../axios-config";

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
    this.setState({ newmatch: newmatch });
  };

  startMatch = () => {
    this.updateAllTheNames();
    axios
      .post("api/update", this.state.newmatch)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/console", this.state.newmatch);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Enter the team names</h1>

        <br />
        <br />
        <br />
        <h1>Team 1</h1>
        <input type="text" id="team1" placeholder="enter team 1 name" />
        <br />
        <input type="text" id="1" placeholder="enter player 1 name" />
        <input type="text" id="2" placeholder="enter player 2 name" />
        <input type="text" id="3" placeholder="enter player 3 name" />
        <input type="text" id="4" placeholder="enter player 4 name" />
        <input type="text" id="5" placeholder="enter player 5 name" />
        <input type="text" id="6" placeholder="enter player 6 name" />
        <input type="text" id="7" placeholder="enter player 7 name" />
        <input type="text" id="8" placeholder="enter player 8 name" />
        <input type="text" id="9" placeholder="enter player 9 name" />
        <input type="text" id="10" placeholder="enter player 10 name" />
        <input type="text" id="11" placeholder="enter player 11 name" />
        <h1>Team 2 </h1>
        <input type="text" id="team2" placeholder="enter team 2 name" />
        <br />
        <input type="text" id="12" placeholder="enter player 1 name" />
        <input type="text" id="13" placeholder="enter player 2 name" />
        <input type="text" id="14" placeholder="enter player 3 name" />
        <input type="text" id="15" placeholder="enter player 4 name" />
        <input type="text" id="16" placeholder="enter player 5 name" />
        <input type="text" id="17" placeholder="enter player 6 name" />
        <input type="text" id="18" placeholder="enter player 7 name" />
        <input type="text" id="19" placeholder="enter player 8 name" />
        <input type="text" id="20" placeholder="enter player 9 name" />
        <input type="text" id="21" placeholder="enter player 10 name" />
        <input type="text" id="22" placeholder="enter player 11 name" />
        <br />
        <button className="btn btn-primary" onClick={this.startMatch}>
          Start the match
        </button>
      </div>
    );
  }
}

export default Teams;
