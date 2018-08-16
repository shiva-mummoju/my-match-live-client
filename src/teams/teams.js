import React, { Component } from 'react';

class Teams extends Component{

    startMatch = () => {
        console.log("names have been collected. Going to start match by going to console");
        this.props.history.push("/console");
    }

    render(){


        return  (
            <div>
                <h1>Enter the team names</h1>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <button className="btn btn-primary" onClick={this.startMatch} >Start the match</button>
            </div>
        
        );
    }
}

export default Teams;