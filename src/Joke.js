import React, { Component } from 'react';
import './Joke.css'

class Joke extends Component{



    render(){
        const { upvote, downvote }=this.props;
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-ghost" onClick={upvote}></i>
                    <span className="Joke-votes" >{this.props.votes}</span>
                    <i className="fas fa-ghost" onClick={downvote}></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
            </div>

        )
    }

}

export default Joke;