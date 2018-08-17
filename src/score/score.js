import React, { Component } from 'react';
import openSocket from 'socket.io-client';

class Score extends Component{
    socketView = null;

    constructor(props){
        super(props);
        this.state = props.location.state;
        console.log("current match" , this.state._id);
    }

    componentDidMount = () => {
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

        this.socket.on("bowled" , (payload) =>  {
            var balls = this.state.balls;
            balls.unshift({ballNumber: payload.ballNumber , ballDesc: payload.ballDesc});
            this.setState({balls: balls});
        });
    }

    

    onStatsClicked = () => {
        console.log("Going to the stats page");
        this.props.history.push("/stats");
    }

    render(){
        return (
            <div>
                <h1>Live Match</h1>
                <br/><br/><br/>
                
                {
                    this.state.balls.map((ball,id) => {
                        return (<p key={id}>{ball.ballDesc}</p>)
                    })
                }
                
                <br/><br/><br/>
                <button  onClick={this.onStatsClicked} >Stats</button>
            </div>
        )
    }
}

export default Score;