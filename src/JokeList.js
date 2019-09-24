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
            jokes: JSON.parse(window.localStorage.getItem("jokes") ||"[]"),
            isLoading:false
        }
        this.seenJokes = new Set();
        this.seenJokes.add(this.state.jokes.map(j => j.text));
        console.log(this.seenJokes);
        this.handleClick = this.handleClick.bind(this);
    }
        componentDidMount(){
        if(this.state.jokes.length===0) this.getJokes()

        }
    
        
    async getJokes(){
        try{
            let jokes = [];
            while (jokes.length < this.props.numJokesToGet) {
                let res = await Axios.get('https://icanhazdadjoke.com/', {
                    headers: {Accept: 'application/json'}
                });
                let newJoke = res.data.joke;
                if(!this.seenJokes.has(newJoke)){
                jokes.push({ id: uuid(), joke: newJoke, votes: 0 });
                }else{
                    console.log("Found Duplicate");
                    console.log(newJoke);
                }
            }
            this.setState(st =>({
                jokes: [...st.jokes,...jokes],
                isLoading:false
            }),
                () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
            //update localstorage
            
        } catch(e){
            alert(e)
            this.setState({
                isLoading:false
            })
        }
    }    

    handleVote(id,delta){
        this.setState(st =>({
            jokes: st.jokes.map(j =>
                j.id === id ? {...j,votes:j.votes+delta} :j
                )
        }),
        ()=> window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes)));
    }

    handleClick(){
        this.setState({
            isLoading:true
        },this.getJokes);
            
    }
    // jokeSort(){
    //     this.state.jokes.sort((a, b) => (
    //         b.votes - a.votes
    //     ))
    // }
    
        render(){
            if(this.state.isLoading){
                return (
                <div className="JokeList-spinner" >
                    <i className="fas fa-8x fa-frown-open fa-spin"/>
                        <h1 className="JokeList-title">Loading...</h1>
                </div>)
            }
        
        let jokes = this.state.jokes.sort((a, b) => (
            b.votes - a.votes
                     ))
            return (
                <div className="JokeList">
                    <div className="JokeList-sidebar" >
                        <h1 className="JokeList-title"><span> Sad</span> Jokes</h1>
                        <img 
                            src="https://image.flaticon.com/icons/svg/1430/1430489.svg" 
                        alt="icon"></img>
                        <button className='JokeList-getmore'onClick={this.handleClick}>New Jokes</button>
                    </div>
                    
                    <div className="JokeList-jokes">
                        {jokes.map((j)=>(
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