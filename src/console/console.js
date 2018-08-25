import React, { Component } from "react";
import openSocket from "socket.io-client";
import queryString from "query-string";
import axios from "./../axios-config";
import Header from "./../components/header";
import Modal from "react-modal";
import "./console.css";
import env from "./../environments";

// var baseURL = "http://localhost:5000";
// var baseURL = "https://rocky-brook-58200.herokuapp.com";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("#root");

class Console extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      copyMessage: "click to copy",
      matchLink: "Currently Not available",
      button :  [0,0,0,0,0,0,0,0]
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    console.log("open modal called");
  }

  closeModal() {
    this.setState({ modalIsOpen: false, copyMessage: "click to copy" });
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  socket = null;

  ballNumber = 1;

  componentDidMount = () => {
    var params = queryString.parse(this.props.location.search);

    axios.get("api/getmatch/" + params.id).then(res => {
      this.setState({
        match: res.data,
        matchLink: env.clientURL + "score?id=" + res.data._id
      });
      this.socket = openSocket(env.serverURL);
      this.socket.on("connect", () => {
        this.socket.emit("join", this.state.match._id, err => {
          console.log(this.state);
          if (err) {
            console.log(err);
          } else {
            console.log(this.state);
            console.log("joined room", this.state.match._id);
          }
        });
      });
    });
  };

  onStatsClicked = () => {
    console.log("going to the stats page");
    this.props.history.push("/stats");
  };

  ballBowled = () => {
    var desc = document.getElementById("desc").value;
    var msg = "player 1 to player 2: " + desc;
    var match = this.state.match;
    match.balls.unshift({ ballNumber: this.ballNumber, ballDesc: msg });
    this.setState({ match: match });
    this.ballNumber = this.ballNumber + 1;
    document.getElementById("desc").value = "";
    // console.log(this.state);
    this.socket.emit("ball", this.state.match);
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.ballBowled();
    }
  };

  shareLink = () => {
    var textField = document.createElement("textarea");
    textField.innerText = this.state.matchLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    this.setState({ copyMessage: "message has been copied" });
  };

  getButtonClasses(num){
    var cla = "";
    if(!this.state.button[num]){
      cla = "col-lg-1 col-sm-1  col-xs-1 option";
    }else{
      cla = "col-lg-1 col-sm-1  col-xs-1 option blue";
    }
    return cla;
  }

  runButtonClicked(num){
    var button  = [0,0,0,0,0,0,0,0];
    button[num] = !this.state.button[num];
    this.setState({button: button});
  }

  

  render() {
    return (
      <div>
        <Header />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Match Modal"
        >
          <div className="mymodal" onClick={this.shareLink}>
            <div className="row modalHeader nomargin">
              <div className="col-lg-12 ">Share this with your friends</div>
            </div>
            <div className="row modalLink  nomargin">
              <div className="col-lg-12 matchLink" id="matchLinkElement">
                {this.state.matchLink}
              </div>
            </div>
            <div className="row modalCopy nomargin">
              <div className="col-lg-12 ">{this.state.copyMessage}</div>
            </div>
          </div>
        </Modal>
        <div className="main">
          <div className="row ">
            <div className="col-lg-3 col-sm-3 col-xs-1" />
            <div className="col-lg-6 col-sm-6 col-xs-10 scorecard">
              <div className="row mainscore ">
                <div className="col-lg-12 col-sm-12  col-xs-12">
                  <div className="row mainscore-score ">
                    ind 413 / 6 <span> (87.5 overs) crr: 3.53 </span>
                    <button
                      className="btn btn-info"
                      onClick={this.onStatsClicked}
                    >
                      Stats
                    </button>
                    <button className="btn btn-info" onClick={this.openModal}>
                      Share
                    </button>
                  </div>
                  <div className="row innings">ind chose to bat</div>
                </div>
                {/* <div className="col-lg-6 col-sm-6" /> */}
              </div>
              <div className="row batsman ">
                <div className="col-lg-6 col-sm-6   col-xs-6">BATSMAN</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">Runs</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">Balls</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">fours</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">six</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">sr</div>
              </div>
              <div className="row striker">
                <div className="col-lg-6 col-sm-6  col-xs-6">rishab</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">12</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">34</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">23</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">6</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">sr</div>
              </div>
              <div className="row striker ">
                <div className="col-lg-6 col-sm-6  col-xs-6">hardik</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">23</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">23</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">34</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">6</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">45</div>
              </div>
              <div className="row bowler">
                <div className="col-lg-6 col-sm-6  col-xs-6">BOWLER</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">O</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">M</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">R</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">W</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">Eco</div>
              </div>
              <div className="row bowlerstats ">
                <div className="col-lg-6 col-sm-6  col-xs-6">Stokes</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">4</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">3</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">23</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">23</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">12</div>
              </div>

              <div className="row info">OPTIONS</div>

              <div className="row  options">
                <div className={this.getButtonClasses(0)}
                 onClick={() => {this.runButtonClicked(0)}} >0</div>
                <div className={this.getButtonClasses(1)} 
                 onClick={() => {this.runButtonClicked(1)}} >1</div>
                <div className={this.getButtonClasses(2)}
                 onClick={() => {this.runButtonClicked(2)}} >2</div>
                <div className={this.getButtonClasses(3)}
                 onClick={() => {this.runButtonClicked(3)}} >3</div>
                <div className={this.getButtonClasses(4)}
                 onClick={() => {this.runButtonClicked(4)}} >4</div>
                <div className={this.getButtonClasses(5)}
                 onClick={() => {this.runButtonClicked(5)}} >5</div>
                <div className={this.getButtonClasses(6)}
                 onClick={() => {this.runButtonClicked(6)}} >6</div>
                <div className={this.getButtonClasses(7)}
                 onClick={() => {this.runButtonClicked(7)}} >7</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option">Wd</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option">Nb</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option">Lb</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option">W</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option">RO</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option">by</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option">U</div>
              </div>

              <div className="row msgbox ">
                <div className="col-lg-10 col-sm-10  col-xs-10 msgbox-text  ">
                  <textarea
                    type="text"
                    id="desc"
                    onKeyPress={this.handleKeyPress}
                    className="ballDesc  "
                  />
                </div>
                <div
                  className="col-lg-2 col-sm-2  col-xs-2 sendButton"
                  onClick={this.ballBowled}
                >
                  Send
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-3 col-xs-1" />
          </div>
          <div className="row break">
            <div className="col-lg-3 col-sm-3  col-xs-  col-xs-1" />
            <div className="col-lg-6 col-sm-6   col-xs-10 scorecard">
              <div className="col-lg-12   col-xs-12 ">
                <div className="row oneballdesc ">Live Updates</div>

                {this.state.match &&
                  this.state.match.balls.map((ball, id) => {
                    return (
                      <div className="row oneball " key={id}>
                        <div className="col-lg-1   col-xs-1 over">{ball.ballNumber}</div>
                        <div className="col-lg-11   col-xs-11">{ball.ballDesc}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-lg-3 col-sm-3  col-xs-3" />
          </div>
        </div>
      </div>
    );
  }
}

export default Console;
