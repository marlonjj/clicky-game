import React, { Component } from 'react';
import './App.css';
import characters from './characters.json';
import Character from './components/Character';

class App extends Component {
  state = {
    message: "Choose an Image",
    currentScore: 0,
    topScore: 0,
    characters: characters,
    clickedChars: []
  }

  componentDidMount(){
    this.shuffle();
  }

  shuffle() {
    let tempArr = this.state.characters
    for(let n = 0; n<characters.length; n++) {
      for(let i = 0; i<characters.length; i++){
        const randomSpot = Math.floor(Math.random() * (i + 1));
        const temp = tempArr[i];
        tempArr[i] = tempArr[randomSpot];
        tempArr[randomSpot] = temp;
      }
    }
    this.setState({
      characters: tempArr
    })
  }

  selected = (event) => {
    if(this.state.clickedChars.includes(event.target.id)){
      // console.log("lost " + this.state.clickedChars)
      this.endGame()
    }
    else {
      let joined = this.state.clickedChars.concat(event.target.id);

      let current = this.state.currentScore + 1

      let top;
      current > this.state.topScore ? top = current : top = this.state.topScore

      this.setState({
        message: "Choose an Image",
        currentScore: current,
        clickedChars: joined,
        topScore: top
      })
      this.shuffle();
      // console.log(this.state.message);
    }
  }

  endGame() {
    this.setState({
      currentScore: 0,
      message: "Game Over, Try again!",
      clickedChars: []
    })
    this.shuffle();
  }

  render() {
    return (
    <wrapper>
      <div id='menu'>
        <h1>Clicky Anime Game!</h1>
        <h2>Click images to increase your score, but don't choose one you've already chosen</h2>
        <h3>{this.state.message}</h3>
      </div>
      
      <div id='scores'>
        <h2>Current Score: {this.state.currentScore}</h2>
        <h2>Top Score: {this.state.topScore}</h2>
      </div>
      <div id='pics'>
      {this.state.characters.map(character =>{
        return(
            <Character 
            id={character.id} 
            image={character.image}
            onClick={this.selected}/>         
        )
      })
      }
      </div>
    </wrapper>
    );
  }
}

export default App;
