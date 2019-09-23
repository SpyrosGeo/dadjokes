import React, { Component } from 'react';
import './Joke.css'

class Joke extends Component{


    getColor(){
        if(this.props.votes >= 5){
            return "#4CAF50";
        }else if (this.props.votes >=3){
            return "#FF9800";
        }else if (this.props.votes<= 0){
            return "#f44336";
        }
    }

// "em em-astonished"
// "em em-angry"
// "em em-anguished"
    getEmoji(){
        if (this.props.votes >= 5) {
            return "em em-astonished";
        } else if (this.props.votes >= 3) {
            return "em em-anguished";
        }else if (this.props.votes >= 0){
            return "em em-angry";
        } else if (this.props.votes < 0) {
            return "em em-face_vomiting";
        }
    }
    render(){
        const { upvote, downvote }=this.props;
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-circle-up" onClick={upvote}></i>
                    <span style={{borderColor:this.getColor()}}className="Joke-votes" >{this.props.votes}</span>
                    <i className=" fas fa-arrow-circle-down" onClick={downvote}></i>
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
                <div className="Joke-smiley" ><i className={this.getEmoji()}></i></div>
            </div>

        )
    }

}

export default Joke;