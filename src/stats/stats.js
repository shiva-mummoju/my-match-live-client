import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class Stats extends Component{

    backClicked = () => {
        console.log("Going back to the pre page");
        this.props.history.goBack();
    }

    render(){
        return (
        <div>
            <h1>This is stats component</h1>
            <br/>
            <button onClick={this.backClicked}   >Back</button>
        </div>)
    }
}

export default Stats;