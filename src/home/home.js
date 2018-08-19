import React, { Component } from "react";
import axios from "./../axios-config";
// import { ClipLoader } from "react-spinners";
import Header from "./../components/header";
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

    this.props.history.push(
      "/score?id=" + document.getElementById("matchid").value
    );
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
        <Header />
        <div className="row home_main">
          <div className="row home_one">
            <div className="col-lg-3 col-sm-2 col-xs-1 " />
            <div className="col-lg-6 col-sm-8 col-xs-10  home_one_content">
              <div className="row home_one_content_one">
                <div className="col-lg-12 col-sm-12 col-xs-12  view_match">VIEW MATCH</div>
                <div className="col-lg-12 col-sm-12 col-xs-12 form-group">
                  <input
                    type="text"
                    className="matchid"
                    placeholder="enter the match id"
                  />
                </div>
                <div className="col-lg-12 col-sm-12 col-xs-12 ">
                  <button
                    className="btn btn-primary viewButton"
                    onClick={this.onViewMatchClicked}
                  >
                    View Match
                  </button>
                </div>
              </div>
              <div className="row home_one_content_two">
                <div className="col-lg-12 col-sm-12 col-xs-12  host_match">HOST A MATCH</div>
                <div className="col-lg-12 col-sm-12 col-xs-12 ">
                  <button  className="btn btn-primary viewButton bring_down" onClick={this.onHostClicked}>Host</button>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-2 col-xs-1 " />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
