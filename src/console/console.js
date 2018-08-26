import React, { Component } from "react";
import openSocket from "socket.io-client";
import queryString from "query-string";
import axios from "./../axios-config";
import Header from "./../components/header";
import Modal from "react-modal";
import "./console.css";
import env from "./../environments";
import {ToastContainer, toast } from 'react-toastify';


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
const toasterConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
  };
  
Modal.setAppElement("#root");

class Console extends Component {

  matchStack = null;
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      copyMessage: "click to copy",
      matchLink: "Currently Not available",
      button :  [0,0,0,0,0,0,0,0],
      extra : [0,0,0,0,0,0],
      currentOvers : 0.0,
      bowlerModalIsOpen: false,
      batsmanModalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openBowlerModal = this.openBowlerModal.bind(this);
    this.afterBowlerOpenModal = this.afterBowlerOpenModal.bind(this);
    this.closeBowlerModal = this.closeBowlerModal.bind(this);
    this.openBatsmanModal = this.openBatsmanModal.bind(this);
    this.afterBatsmanOpenModal = this.afterBatsmanOpenModal.bind(this);
    this.closeBatsmanModal = this.closeBatsmanModal.bind(this);
    this.matchStack = [];
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    console.log("open modal called");
  }

  openBowlerModal() {
    console.log("open bowler modal called");
    this.setState({bowlerModalIsOpen: true});
  }

  openBatsmanModal(){
    this.setState({batsmanModalIsOpen: true});
  }


  closeModal() {
    this.setState({ modalIsOpen: false, copyMessage: "click to copy" });
  }
  closeBowlerModal(){
    this.setState({bowlerModalIsOpen: false});
    // this is where we are going to display the batsman modal to ask for the new batsman.

  }
  closeBatsmanModal(){
    this.setState({batsmanModalIsOpen: false});
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }
  afterBowlerOpenModal(){
 }
 afterBatsmanOpenModal(){

 }
  socket = null;
  componentDidMount = () => {
    var params = queryString.parse(this.props.location.search);

    axios.get("api/getmatch/" + params.id).then(res => {
      this.setState({
        match: res.data,
        matchLink: env.clientURL + "score?id=" + res.data._id
      });
      this.matchStack.push(JSON.parse(JSON.stringify(res.data)));
      console.log(this.state);
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

    // check for start match end match conditions
    if (this.state.match.toss !== this.state.match.currentBatting) {
      // we are in the second innings
      if (this.state.match.team[this.state.match.currentBatting].wickets >= 10 || this.state.match.team[this.state.match.currentBatting].ballsPlayed >= this.state.match.maxBalls) {
        // the innings is over due to wickets
        // check for runs and declare winner
        console.log(this.state.match.team[this.state.match.currentBatting].wickets)
        if (this.state.match.team[this.state.match.currentBatting].score > this.state.match.team[this.state.match.currentBowling].score) {
          // secnd team batting has won!
          toast.success("team batting second has won the match", toasterConfig);
        } else {
          // .first team batting has won the match.
          toast.success("team batting first has won the match", toasterConfig);
        }
        return;
      } else {
        if (this.state.match.team[this.state.match.currentBatting].score > this.state.match.team[this.state.match.currentBowling].score) {
          toast.success("team batting second has won the match", toasterConfig);
          return;
        }
      }

    }


    // check for the pre bowler
    if (this.state.match.team[this.state.match.currentBowling].currentBowler === this.state.match.team[this.state.match.currentBowling].preBowler) {
      this.openBowlerModal();
      return;
    }
    // check for batsman are correct or not
    if(this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].out === 1 ){
      this.openBatsmanModal();
      toast.error("Current bastman is out. Select new batsman as striker");
    }
    
   var runForteam= 0;
   var addToBatsman = 1;
   var incBall = 1;
   var wicket = 0;
// 0 - wide 1 -nob 2- lb 3 - wicket 4- runout  5 - by 
    // check if we should add score to the team talle
    var extra = this.getWhichExtraSelected();
    console.log("extra selected = ", extra);
    // one run to be added to team for wide
    if(extra === 0 || extra === 1 ){
      runForteam = 1;
    }
// if it is a wide, then dont add the run to batsman tally
    if(extra === 0 || extra === 2 || extra === 5){
      addToBatsman = 0; 
    }
    // should we increment the ball count?
    if(extra === 0 || extra === 1){
      incBall = 0;
    }
// if it is a straight wicket, dont add score to batsman
    if(extra === 3){
      addToBatsman = 0;
      wicket = 1;
    }

    if(wicket){
      incBall =1;
    }



    var desc = document.getElementById("desc").value;
    var temp = -1;
    // if(desc.trim()){
    var msg = this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].playerName + " to " + this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].playerName + " , ";
    var run = this.getWhichRunSelected();
    msg = msg + " " + this.getExtraInWords(extra);
    msg = msg + " " + run + " runs " + desc;
    var match = this.state.match;
    // increasing team score && when there is no wicket
    if(wicket === 0){
      match.team[match.currentBatting].score = match.team[match.currentBatting].score + run + runForteam;
    }
    
    // increasing batsman score
    if(wicket ===0 && addToBatsman){
      match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].runsScored = match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].runsScored + run;
    }
    
    // increasing team balls played
    if(incBall){
      match.team[match.currentBatting].ballsPlayed = match.team[match.currentBatting].ballsPlayed + 1;
    // increasing batsman balls faced
    match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].ballsFaced = match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].ballsFaced + 1;
    }
    
    // if it is a four, increase boundary tally
    if (wicket===0 &&  addToBatsman &&  run === 4) {
      match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].fours = match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].fours + 1;
    }
    if (wicket === 0 && addToBatsman &&  run === 6) {
      match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].sixes = match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].sixes + 1;
    }

    // increasing the bowler balls bowled
    if(incBall){
      match.team[match.currentBowling].players[match.team[match.currentBowling].currentBowler].ballsBowled = match.team[match.currentBowling].players[match.team[match.currentBowling].currentBowler].ballsBowled + 1;
    }
    
    // increasing the bowler runs given
    if(extra !== 0 && extra !== 1 && extra!== 2 && extra!== 5 ){
      match.team[match.currentBowling].players[match.team[match.currentBowling].currentBowler].runsGiven = match.team[match.currentBowling].players[match.team[match.currentBowling].currentBowler].runsGiven + run  ;
    }
    
    



    // change the strike of the batsman when required. strike should change
    if (wicket === 0 && (run === 1 || run === 3)) {
      temp = match.team[match.currentBatting].currentStriker;
      match.team[match.currentBatting].currentStriker = match.team[match.currentBatting].currentNonStriker;
      match.team[match.currentBatting].currentNonStriker = temp;
    }

    // here we need to write logic to select the new batsman when the wicket == 0
    // open the batsman modal to choose new batsman
    // choose the next ready batsman and broadcast anyway
    if(wicket){
      // increment the numbe of wickets of the batting team
      match.team[match.currentBatting].wickets = match.team[match.currentBatting].wickets +1;
      // .increment wicket tally for the bowler
      match.team[match.currentBowling].players[match.team[match.currentBowling].currentBowler].wickets = match.team[match.currentBowling].players[match.team[match.currentBowling].currentBowler].wickets + 1;
      // setting out status for the batsman
      match.team[match.currentBatting].players[match.team[match.currentBatting].currentStriker].out = 1;
      //choosing the next in line as the striker
      for(var j = 0; j< 11; j++){
        if(match.team[match.currentBatting].players[j].out !== 1 && j!== match.team[match.currentBatting].currentNonStriker){
          match.team[match.currentBatting].currentStriker = j;
          toast.info("The new batsman on strike is "  + match.team[match.currentBatting].players[j].playerName  , toasterConfig );
          break;
        }
      }

    }

    

    // if after the increment of the ball, if it is divisible by 6, then change the bowler
    if (incBall && match.team[match.currentBatting].ballsPlayed % 6 === 0) {
      temp = match.team[match.currentBatting].currentStriker;
      match.team[match.currentBatting].currentStriker = match.team[match.currentBatting].currentNonStriker;
      match.team[match.currentBatting].currentNonStriker = temp;
      console.log("time to change the bowler!");
    }
    var teamBalls = String(Math.floor(match.team[match.currentBatting].ballsPlayed / 6)) + "." + String(match.team[match.currentBatting].ballsPlayed % 6);
    match.balls.unshift({
      ballNumber: teamBalls,
      ballDesc: msg
    });
    this.setState({
      match: match,
      button: [0, 0, 0, 0, 0, 0, 0, 0],
      extra: [0,0,0,0,0,0]
    });
    document.getElementById("desc").value = "";
    this.socket.emit("ball", this.state.match);


    // after we emit the details of the ball and before we select the new bowler, we need to check if the number of wickets 
    // equal to 10 or not
    // this is for the case when the first batting 
    if (this.state.match.toss === this.state.match.currentBatting) {
      if (this.state.match.team[this.state.match.currentBatting].wickets >= 10) {
        toast.error("The innings is over. Second innings is going to begin!", toasterConfig);
        // exchanging the current batting and current bowling
        temp = match.currentBatting;
        match.currentBatting = match.currentBowling;
        match.currentBowling = temp;
        this.setState({
          match: match
        });
        this.socket.emit("ball", this.state.match);
        toast.error(this.state.match.team[this.state.match.currentBatting] + " is batting right now!", toasterConfig);
        // making sure the match stack does not inccrase the size of 20
        this.matchStack.push(JSON.parse(JSON.stringify(this.state.match)));
        if (this.matchStack.length > 20) {
          this.matchStack.shift();
        }

        return;
      }
    }

    if (this.state.match.toss !== this.state.match.currentBatting) {
      // we are in the second innings
      if (this.state.match.team[this.state.match.currentBatting].wickets >= 10 || this.state.match.team[this.state.match.currentBatting].ballsPlayed >= this.state.match.maxBalls) {
        // the innings is over due to wickets
        // check for runs and declare winner
        console.log(this.state.match.team[this.state.match.currentBatting].wickets)
        if (this.state.match.team[this.state.match.currentBatting].score > this.state.match.team[this.state.match.currentBowling].score) {
          // secnd team batting has won!
          toast.success("team batting second has won the match", toasterConfig);
        } else {
          // .first team batting has won the match.
          toast.success("team batting first has won the match", toasterConfig);
        }
        this.matchStack.push(JSON.parse(JSON.stringify(this.state.match)));
        if (this.matchStack.length > 20) {
          this.matchStack.shift();
        }

        return;
      } else {
        if (this.state.match.team[this.state.match.currentBatting].score > this.state.match.team[this.state.match.currentBowling].score) {
          toast.success("team batting second has won the match", toasterConfig);
          this.matchStack.push(JSON.parse(JSON.stringify(this.state.match)));
          if (this.matchStack.length > 20) {
            this.matchStack.shift();
          }
          return;
        }
      }

    }


    // over is up. selecting new bowler
    if ( incBall && match.team[match.currentBatting].ballsPlayed % 6 === 0) {
      // set the preBowler as current bowler
      var ma = this.state.match;
      ma.team[ma.currentBowling].preBowler = ma.team[ma.currentBowling].currentBowler;
      this.setState({
        match: ma
      });
      this.socket.emit("ball", this.state.match);

      // openign the bowler modal
      setTimeout(() => {
        this.openBowlerModal();
      }, 1000);
    }

// making sure the match stack does not inccrase the size of 20
    this.matchStack.push(JSON.parse(JSON.stringify(this.state.match)));
    if(this.matchStack.length > 20){
      this.matchStack.shift();
    }
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

  getExtraClasses(num){
    var cla = "";
    if(!this.state.extra[num]){
      cla = "col-lg-1 col-sm-1  col-xs-1 option";
    }else{
      cla = "col-lg-1 col-sm-1  col-xs-1 option blue";
    }
    return cla;
  }

  getExtraInWords(num){
    if(num === 0){
      return "wide";
    }else if(num === 1){
      return "No ball"
    }else if(num === 2){
      return "Legby";
    }else if(num === 3){
      return "Wicket";
    }else if(num === 4){
      return "Runout";
    }else if(num === 5){
      return "Bys";
    }else{
      return "";
    }
  }
  getWhichRunSelected(){
    for(var i =0;i < this.state.button.length; i++){
      if(this.state.button[i] !== 0){
        return i;
      }
    }
    return 0;
  }

  getWhichExtraSelected(){
    for(var i=0; i< this.state.extra.length; i++){
      if(this.state.extra[i] !== 0){
        return i;
      }
    }
     return  -1;
  }

  runButtonClicked(num){
    var button  = [0,0,0,0,0,0,0,0];
    button[num] = !this.state.button[num];
    this.setState({button: button});
  }

  extraButtonClicked(num){
    var extra = [0,0,0,0,0,0];
    extra[num] = !this.state.extra[num];
    this.setState({extra: extra});
  }

  changeStrike = () => {
    var match = this.state.match;
    var temp = match.team[match.currentBatting].currentStriker;
    match.team[match.currentBatting].currentStriker = match.team[match.currentBatting].currentNonStriker;
    match.team[match.currentBatting].currentNonStriker = temp;
    this.setState({match: match});
    this.socket.emit("ball", this.state.match);
  }

  selectThisBowler(num){
    if(num === this.state.match.team[this.state.match.currentBowling].preBowler){
      toast.error("You cannot select the same bowler as last over" , toasterConfig);
      return;
    }
    console.log("select this bowler called with " , num);
    var match = this.state.match;
    match.team[match.currentBowling].currentBowler = num;
    this.setState({match: match });
    this.closeBowlerModal();
    this.socket.emit("ball", this.state.match);
  }

  selectThisBatsman(num){
    if(num === this.state.match.team[this.state.match.currentBatting].currentNonStriker){
      toast.error("You cannot select the non striker!" , toasterConfig);
      return;
    }
    if(this.state.match.team[this.state.match.currentBatting].players[num].out === 1){
      toast.error("Please select a batsman who isnt out!" , toasterConfig);
      return;
    }
    var match = this.state.match;
    match.team[match.currentBatting].currentStriker = num;
    this.setState({match: match});
    this.closeBatsmanModal();
    this.socket.emit("ball", this.state.match);
  }


  doUndo =  ()=>{
    var r = window.confirm("are you sure you want to undo?");
    if(r){
      if(this.matchStack.length > 1){
        this.matchStack.pop();
        var lastState = JSON.parse(JSON.stringify(this.matchStack[this.matchStack.length-1]));
        this.setState({match: lastState});
        this.socket.emit("ball", lastState);
      }else{
        window.alert("undo not possible! Sorry");
      }

    }
  }

  render() {
    return (
      <div>

        <Header />
        {/* modal for sharing with friends */}
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
        {/* modal for choosing new bowler */}
        <Modal
          isOpen={this.state.bowlerModalIsOpen}
          onAfterOpen={this.afterBowlerOpenModal}
          onRequestClose={this.closeBowlerModal}
          style={customStyles}
          contentLabel="Bowler Modal"
        >
          <div className="mymodal" onClick={this.shareLink}>
            <div className="row modalHeader nomargin">
              <div className="col-lg-12 ">Choose the next bowler</div>
            </div>
            <div className="row modalLink  nomargin">
              <div className="col-lg-12 matchLink" id="matchLinkElement">
              <div  className="row bowlerSelectTitle" >
                      <div className="col-xs-8">Name</div>
                      <div className="col-xs-1" >O</div>
                      <div className="col-xs-1" >M</div>
                      <div className="col-xs-1" >R</div>
                      <div className="col-xs-1" >W</div>
                      </div>
                {
                  this.state.match && this.state.match.team[this.state.match.currentBowling].players.map((player , id) => {
                    return (
                      <div key={id} className="row bowlerSelect" onClick={() => {this.selectThisBowler(id)}}>
                      <div className="col-xs-8">{player.playerName}</div>
                      <div className="col-xs-1" >{Math.floor(player.ballsBowled / 6)}.{player.ballsBowled % 6 }</div>
                      <div className="col-xs-1" >{player.maidens}</div>
                      <div className="col-xs-1" >{player.runsGiven}</div>
                      <div className="col-xs-1" >{player.wickets}</div>
                      </div>
                    )
                  })

                }
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.batsmanModalIsOpen}
          onAfterOpen={this.afterBatsmanOpenModal}
          onRequestClose={this.closeBatsmanModal}
          style={customStyles}
          contentLabel="Bowler Modal"
        >
          <div className="mymodal" >
            <div className="row modalHeader nomargin">
              <div className="col-lg-12 ">Choose the Batsman</div>
            </div>
            <div className="row modalLink  nomargin">
              <div className="col-lg-12 matchLink" id="matchLinkElement">
              <div  className="row bowlerSelectTitle" >
                      <div className="col-xs-6">Name</div>
                      <div className="col-xs-2" >O</div>

                      <div className="col-xs-2" >R</div>
                      <div className="col-xs-2" >B</div>
                      </div>
                {
                  this.state.match && this.state.match.team[this.state.match.currentBatting].players.map((player , id) => {
                    return (
                      <div key={id} className="row bowlerSelect" onClick={() => {this.selectThisBatsman(id)}}>
                      <div className="col-xs-6">{player.playerName}</div>
                      <div className="col-xs-2" >{player.out ? "Out" : ""}</div>

                      <div className="col-xs-2" >{player.runsScored}</div>
                      <div className="col-xs-2" >{player.ballsFaced}</div>
                     
                      </div>
                    )
                  })

                }
              </div>
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
                    {
                     this.state.match ? this.state.match.team[this.state.match.currentBatting].name : "NA"
                    }  &nbsp;
                    {
                      this.state.match ? this.state.match.team[this.state.match.currentBatting].score : "NA"
                    }/ 
                    {
                      this.state.match ? this.state.match.team[this.state.match.currentBatting].wickets : "NA"
                    } <span> ({
                      this.state.match ? Math.floor(this.state.match.team[this.state.match.currentBatting].ballsPlayed /6 ): "NA"
                    }.{
                      this.state.match ? this.state.match.team[this.state.match.currentBatting].ballsPlayed %6 : "NA"
                    }) Rr: {this.state.match ? ((this.state.match.team[this.state.match.currentBatting].score /this.state.match.team[this.state.match.currentBatting].ballsPlayed)*6).toFixed(2) : '' } </span>
                    <button
                      className="btn btn-info"
                      onClick={this.onStatsClicked}
                    >
                      Stats
                    </button> &nbsp;
                    <button className="btn btn-info" onClick={this.openModal}>
                      Share
                    </button>
                  </div>
                  <div className="row innings">{this.state.match? this.state.match.team[this.state.match.toss].name : "NA"} won the toss and chose to bat</div>
                </div>
              </div>
              <div className="row batsman ">
                <div className="col-lg-6 col-sm-6   col-xs-6">BATSMAN &nbsp; 
                <button className="btn btn-info" onClick={this.changeStrike}>
                      Change Strike
                    </button>
                 </div>
                <div className="col-lg-1 col-sm-1  col-xs-1">R</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">B</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">4</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">6</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">sr</div>
              </div>
              <div className="row striker">
                <div className="col-lg-6 col-sm-6  col-xs-6">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].playerName: ""}* &nbsp; 
                <button
                      className="btn btn-info"
                      onClick={this.openBatsmanModal}
                    >
                      Change
                    </button>
                </div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].runsScored: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].ballsFaced: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].fours: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].sixes: ""}</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">{this.state.match? (this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].runsScored / this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentStriker].ballsFaced * 100).toFixed(2) : "" }</div>
              </div>
              <div className="row striker ">
                <div className="col-lg-6 col-sm-6  col-xs-6">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].playerName: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].runsScored: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].ballsFaced: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].fours: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].sixes: ""}</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">{this.state.match? (this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].runsScored / this.state.match.team[this.state.match.currentBatting].players[this.state.match.team[this.state.match.currentBatting].currentNonStriker].ballsFaced * 100).toFixed(2) : "" }</div>
              </div>
              <div className="row bowler">
                <div className="col-lg-6 col-sm-6  col-xs-6">BOWLER &nbsp;
                <button className="btn btn-info" onClick={this.openBowlerModal}>
                      Change Bowler
                    </button></div>
                <div className="col-lg-1 col-sm-1  col-xs-1">O</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">M</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">R</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">W</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">Eco</div>
              </div>
              <div className="row bowlerstats ">
                <div className="col-lg-6 col-sm-6  col-xs-6">{this.state.match? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].playerName: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? Math.floor(this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].ballsBowled / 6): ""}.{this.state.match?this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].ballsBowled % 6: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].maidens: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].runsGiven: ""}</div>
                <div className="col-lg-1 col-sm-1  col-xs-1">{this.state.match? this.state.match.team[this.state.match.currentBowling].players[this.state.match.team[this.state.match.currentBowling].currentBowler].wickets: ""}</div>
                <div className="col-lg-2 col-sm-2  col-xs-2">0</div>
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
                <div className={this.getExtraClasses(0)}
                onClick={() => {this.extraButtonClicked(0)}}>Wd</div>
                <div className={this.getExtraClasses(1)}
                onClick={() => {this.extraButtonClicked(1)}}>Nb</div>
                <div className={this.getExtraClasses(2)}
                onClick={() => {this.extraButtonClicked(2)}}>Lb</div>
                <div className={this.getExtraClasses(3)}
                onClick={() => {this.extraButtonClicked(3)}}>W</div>
                <div className={this.getExtraClasses(4)}
                onClick={() => {this.extraButtonClicked(4)}}>RO</div>
                <div className={this.getExtraClasses(5)}
                onClick={() => {this.extraButtonClicked(5)}}>by</div>
                <div className="col-lg-1 col-sm-1  col-xs-1 option"
                onClick={this.doUndo}
                >U</div>
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
        <ToastContainer />
      </div>
    );
  }
}

export default Console;
