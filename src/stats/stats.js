import React, { Component } from 'react';
import Header from "./../components/header";
import "./stats.css";

class Stats extends Component{

    constructor(props){
        super(props);
        this.state = {
            match: props.location.state,
            firstbatting : null,
            firstBowling: null,
            secondBatting: null,
            secondBowling: null
        }


        var firstBattin;
        var firstBowlin;
        var secondBattin;
        var secondBowlin;
        firstBattin = this.state.match.toss;
        console.log("first batting, ", firstBattin);
        if(firstBattin === 0){
            firstBowlin = 1;
            secondBattin = 1;
            secondBowlin = 0;
        }else{
            // firstbatting = 1
            firstBowlin = 0;
            secondBattin = 0;
            secondBowlin = 1;
        }
        
       this.state.firstbatting = firstBattin;
       this.state.firstBowling = firstBowlin;
       this.state.secondBatting = secondBattin;
       this.state.secondBowling = secondBowlin;
        console.log(this.state);
    }   


    componentWillMount(){
        
    }

    backClicked = () => {
        console.log("Going back to the pre page");
        this.props.history.goBack();
    }

    render(){
        return (
        <div>
            <Header />
            <button onClick={this.backClicked}   >Back</button>

            <div className="row  nopadding">
    <div className="col-lg-1 col-sm-1 col-xs-1 nopadding"></div>
    <div className="col-lg-10 col-sm-10 col-xs-10 stats nopadding">
        <div className="row batting-one">
        <div className="col-lg-12 col-sm-12 col-xs-12 heading-stats white">First Innings</div>
            <div className="col-lg-12 col-sm-12 col-xs-12 heading-stats">
            <div className="row battings-stats">
                    <div className="col-xs-2">Name</div>
                    <div className="col-xs-2">S</div>
                    <div className="col-xs-2">B</div>
                    <div className="col-xs-2">F</div>
                    <div className="col-xs-2">S</div>
                    <div className="col-xs-2">SR</div>
                </div>
            </div>
            <div className="col-lg-12 col-sm-12 col-xs-12 peoplestats">
            <div className="row battings-stats">
            {
                this.state && this.state.match  && this.state.match.team[this.state.firstbatting].players.map((player , id) => {
                    return <div key={id}><div className="col-xs-2">{player.playerName}</div>
                    <div className="col-xs-2">{player.runsScored}</div>
                    <div className="col-xs-2">{player.ballsFaced}</div>
                    <div className="col-xs-2">{player.fours}</div>
                    <div className="col-xs-2">{player.sixes}</div>
                    <div className="col-xs-2">{(player.runsScored / player.ballsFaced * 100).toFixed(2)}</div>
                    </div>
                })
            }
                    
                </div>
            </div>
        </div>
        <div className="row bowling-one">
        
            <div className="col-lg-12 col-sm-12 col-xs-12 heading-stats">
            <div className="row battings-stats">
                    <div className="col-xs-2">Name</div>
                    <div className="col-xs-2">R</div>
                    <div className="col-xs-2">M</div>
                    <div className="col-xs-2">O</div>
                    <div className="col-xs-2">W</div>
                    <div className="col-xs-2">SR</div>
                </div></div>
            <div className="col-lg-12 col-sm-12 col-xs-12 peoplestats">
            {
                this.state && this.state.match  && this.state.match.team[this.state.firstBowling].players.filter((player, id) => {
                    if(player.ballsBowled > 0){
                        return true;
                    }else{
                        return false;
                    }
                }).map((player , id) => {
                    return <div key={id}><div className="col-xs-2">{player.playerName}</div>
                    <div className="col-xs-2">{Math.floor(player.ballsBowled/ 6)}:{player.ballsBowled%6} </div>
                    <div className="col-xs-2">{player.maidens}</div>
                    <div className="col-xs-2">{player.runsGiven}</div>
                    <div className="col-xs-2">{player.wickets}</div>
                    <div className="col-xs-2">0</div>
                    </div>
                })
            }
            
            </div>
        </div>
        <div className="row batting-two">
        <div className="col-lg-12 col-sm-12 col-xs-12 heading-stats white">Second Innings</div>
            <div className="col-lg-12 col-sm-12 col-xs-12 heading-stats">
            <div className="row battings-stats">
                    <div className="col-xs-2">Name</div>
                    <div className="col-xs-2">S</div>
                    <div className="col-xs-2">B</div>
                    <div className="col-xs-2">F</div>
                    <div className="col-xs-2">S</div>
                    <div className="col-xs-2">SR</div>
                </div></div>
            <div className="col-lg-12 col-sm-12 col-xs-12 peoplestats">
            <div className="row battings-stats">
            {
                this.state && this.state.match  && this.state.match.team[this.state.secondBatting].players.map((player , id) => {
                    return <div key={id}><div className="col-xs-2">{player.playerName}</div>
                    <div className="col-xs-2">{player.runsScored}</div>
                    <div className="col-xs-2">{player.ballsFaced}</div>
                    <div className="col-xs-2">{player.fours}</div>
                    <div className="col-xs-2">{player.sixes}</div>
                    <div className="col-xs-2">{(player.runsScored / player.ballsFaced * 100).toFixed(2)}</div>
                    </div>
                })
            }
                </div></div>
        </div>
        <div className="row bowling-two">
            <div className="col-lg-12 col-sm-12 col-xs-12 heading-stats">
            <div className="row battings-stats">
                    <div className="col-xs-2">Name</div>
                    <div className="col-xs-2">B</div>
                    <div className="col-xs-2">M</div>
                    <div className="col-xs-2">O</div>
                    <div className="col-xs-2">W</div>
                    <div className="col-xs-2">E</div>
                </div></div>
            <div className="col-lg-12 col-sm-12 col-xs-12 peoplestats">
            <div className="row battings-stats">
            {
                this.state && this.state.match  && this.state.match.team[this.state.secondBowling].players.filter((player, id) => {
                    if(player.ballsBowled > 0){
                        return true;
                    }else{
                        return false;
                    }
                }).map((player , id) => {
                    return <div key={id}><div className="col-xs-2">{player.playerName}</div>
                    <div className="col-xs-2">{Math.floor(player.ballsBowled/ 6)}:{player.ballsBowled%6} </div>
                    <div className="col-xs-2">{player.maidens}</div>
                    <div className="col-xs-2">{player.runsGiven}</div>
                    <div className="col-xs-2">{player.wickets}</div>
                    <div className="col-xs-2">0</div>
                    </div>
                })
            }
                </div></div>
        </div>
    </div>
    <div className="col-lg-1 col-sm-1 col-xs-1 nopadding"></div>
</div>
        </div>)
    }
}

export default Stats;