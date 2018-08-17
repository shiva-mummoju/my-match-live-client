import React, { Component } from 'react';
import openSocket from 'socket.io-client';

class Console extends Component{

    socket = null;

    ballNumber =  1;
    constructor(props) {
        super(props);
        this.state = props.location.state;
      }

    componentDidMount = () => {
        console.log(this.state);
        this.socket = openSocket('http://localhost:5000');

        this.socket.on("connect"  , () => {
            console.log("connected to server");
            this.socket.emit('join' , this.state._id , (err) => {
                if(err){console.log(err)}
                else{
                    console.log("joined room" , this.state._id);
                }
            });
        });




    }


    onStatsClicked = () => {
        console.log("going to the stats page");
        this.props.history.push("/stats");
    }


    ballBowled = () => {
        var desc = document.getElementById("desc").value;
        var balls = this.state.balls;
        balls.unshift({ballNumber: this.ballNumber, ballDesc: desc});
        this.setState({balls: balls});
        this.ballNumber = this.ballNumber  + 1;
        document.getElementById("desc").value = "";
        console.log(this.state);
        this.socket.emit("ball" , {ballNumber: this.ballNumber, ballDesc: desc , _id: this.state._id});
    }

    render(){
        return (
            <div>
                <h1>This is the console</h1>
                <br/><br/><br/><br/>
                
                {
                    this.state.balls.map((ball,id) => {
                        return (<p key={id}>{ball.ballDesc}</p>)
                    })
                }
                
                <br/><br/><br/><br/>
                <input type="text" placeholder="Enter ball desc" id="desc" />
                <button type="text" onClick={this.ballBowled}  >Send</button>


                <button    onClick={this.onStatsClicked}   >Stats</button>
            </div>

        )
    }
}

export default Console;