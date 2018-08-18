import React, { Component } from "react";
import axios from "./../axios-config";
import { ClipLoader } from "react-spinners";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }


  setLoading = val => {
    this.setState({ loading: val });
  };

  onHostClicked = () => {
    console.log("Host button clicked");
    this.props.history.push("/start");
  };

  onViewMatchClicked = () => {
    console.log("View match clicked");
    // axios.get("api/getmatch/" + document.getElementById("matchid").value).then((res) => {
    //   console.log(res);
    //   this.props.history.push("/score" , res.data);
    // })

    this.props.history.push("/score?id=" +  document.getElementById("matchid").value);
    
  };

  testServerConnection = () => {
    this.setLoading(true);
    axios.get("test").then(res => {
      console.log(res.data.hello);
      this.setLoading(false);
    });
  };

  render() {
    return (
      <div>
        <h1>My Match Live</h1>
        <br />
        <br />
        <br />
        View Match
        <br />
        <br />
        <input type="text" id="matchid" placeholder="enter the match id" />
        <button className="btn btn-primary" onClick={this.onViewMatchClicked}>
          View Match
        </button>
        <br />
        <br />
        <button onClick={this.onHostClicked}>Host</button>
        <button onClick={this.testServerConnection}>Test Server Connection</button>
        <div className="sweet-loading">
          <ClipLoader
            className="override"
            sizeUnit={"px"}
            size={15}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default Home;
