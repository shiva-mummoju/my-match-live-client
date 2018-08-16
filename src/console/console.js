import React, { Component } from 'react';

class Console extends Component{


    onStatsClicked = () => {
        console.log("going to the stats page");
        this.props.history.push("/stats");
    }

    render(){
        return (
            <div>
                <h1>This is the console</h1>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <button    onClick={this.onStatsClicked}   >Stats</button>
            </div>

        )
    }
}

export default Console;