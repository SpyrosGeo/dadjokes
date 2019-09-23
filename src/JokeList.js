import React, { Component } from 'react';
import Axios from 'axios';
import Joke from './Joke';
import uuid from "uuid/v4";
import './JokeList.css';


class JokeList extends Component {

        static defaultProps = {
            numJokesToGet:10
        }

    constructor(props){
        super(props);
        this.state={
            jokes: []
            
        }
    }
    async componentDidMount(){
        
        let jokes =[];
        while(jokes.length < this.props.numJokesToGet){
    let res = await Axios.get('https://icanhazdadjoke.com/',{
        headers:{
            Accept:'application/json'
        }
    });
        jokes.push({ id:uuid(),joke:res.data.joke,votes:0 });
        }
        this.setState({
            jokes:jokes
        })
    }
    handleVote(id,delta){
        this.setState(st =>({
            jokes: st.jokes.map(j =>
                j.id === id ? {...j,votes:j.votes+delta} :j
                )
        }));
    }

        render(){
            return (

                <div className="JokeList">
                    <div className="JokeList-sidebar" >
                        <h1 className="JokeList-title"><span> Sad</span> Jokes</h1>
                        <img 
                        src="https://assets.dryicons.com/uploads/icon/svg/11391/1e47ef43-2c1f-4e54-bb55-5619ec342d3d.svg" 
                        alt="icon"></img>
                        <button className='JokeList-getmore'>New Jokes</button>
                    </div>
                    
                    <div className="JokeList-jokes">
                        {this.state.jokes.map((j)=>(
                        < Joke 
                        key={j.id}
                        votes={j.votes}
                        text={j.joke}
                        upvote={()=> this.handleVote(j.id,1)}
                        downvote={()=> this.handleVote(j.id,-1)}
                        />
                        ))}
                    </div>
                </div>
            )
        }
    }

export default JokeList ;