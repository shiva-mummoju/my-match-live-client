import React, { Component } from 'react';

class Score extends Component{

    onStatsClicked = () => {
        console.log("Going to the stats page");
        this.props.history.push("/stats");
    }

    render(){
        return (
            <div>
                <h1>Live Match</h1>
                <br/><br/><br/><br/><br/><br/>
                <button  onClick={this.onStatsClicked} >Stats</button>
            </div>
        )
    }
}

export default Score;