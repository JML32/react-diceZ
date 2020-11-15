import React, { Component } from "react";
import "./App.css";
import Status from './components/Status';
//import PropTypes from 'prop-types';

import one from "./assets/one.png";
import two from "./assets/two.png";
import three from "./assets/three.png";
import four from "./assets/four.png";
import five from "./assets/five.png";
import six from "./assets/six.png";

class App extends Component {
  
  
  state = {
  	player1: {
  		id: 1,
  		name: 'Player1',
  		throwScore: 0,
  		turanScore: 0,
  		bankScore: 0,
  		diceToReduce: 0,
  		dice: []
  	},
  	player2: {
  		id: 2,
  		name: 'Player2',
  		throwScore: 0,
  		turnScore: 0,
  		bankScore: 0,
  		diceToReduce: 0,
  		dice: []
  	},
  	playerTurn: 'player1',
  	maxScore: 200,
  	winner: '',
  	newTurn: 'false',
  	totalDice: 10    
  };
  
  // called when clicking the roll dice button
  diceRoll = numberOfDice => {
  	let rolls = [];  	
  	let throwScore = 0;
  	let turnScore = 0;
  	let bankScore = 0;
  	let tempDiceToReduce = 0;
  	let tempPlayerTurn = "";
  	console.log("this.state.playerTurn..." + this.state.playerTurn);	
  	// check if newly turn for other player first
  	if(this.state.newTurn === "true"){
  		// if it's a new turn, reset turn score, and the all the dice
  		if(this.state.playerTurn === 'player2'){
  			// reset the dice, and the turnScore for player1
  			this.setState(prevState => {
		  		let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
		  		player1.diceToReduce = 0;       // reset to zero 
		  		player1.turnScore = 0;
		  		
		  		player1.dice.splice(0, this.state.totalDice);
		  		
		  		console.log("resetting1...");	
		  		console.log("player1.dice..." + player1.dice);		  		           
		  		return { player1 }; 
		  	});
  		}else if (this.state.playerTurn === 'player1'){
  			// reset the dice, and the turnScore for player2
  			this.setState(prevState => {
		  		let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
		  		player2.diceToReduce = 0;       // reset to zero 
		  		player2.turnScore = 0;
		  		player2.dice.splice(0, this.state.totalDice);
		  		console.log("resetting2...");	
		  		console.log("player2.dice..." + player2.dice);	  		           
		  		return { player2 }; 
		  	});
  		}
  		// reset new turn to false
  		this.setState({newTurn: 'false'});
  	}
  	tempPlayerTurn = this.state.playerTurn;
  	console.log("tempPlayerTurn:  " + tempPlayerTurn);
  	if(tempPlayerTurn === 'player1'){
  		console.log("player:  " + tempPlayerTurn);
  		numberOfDice = numberOfDice - this.state.player1.diceToReduce;
  		console.log("numberOfDice:  " + numberOfDice);
  		// note that throw score will be reset to zero for every dice rolling
  		turnScore = this.state.player1.turnScore;
  		bankScore = this.state.player1.bankScore;
  		for (let i = 0; i < numberOfDice; i++) {
  			rolls[i] = Math.floor(Math.random() * 6) + 1;
  			if (rolls[i] !== 1 && rolls[i] !== 6){
  				throwScore += rolls[i];
  			}else{
  				tempDiceToReduce++; 
  			}
  		}
  		//print out the value for debug purpose 		
      		console.log("tempDiceToReduce:  " + tempDiceToReduce);
      		console.log("throwScore:  " + throwScore);
      		console.log("original turnScore:  " + turnScore);
      		turnScore = turnScore + throwScore;  // add the die score to the turn score
      		console.log("added turnScore:  " + turnScore);
      		bankScore = bankScore + throwScore;
      		console.log("bankScore:  " + bankScore);
      		// need to add bankscore here
      		
      		this.setState(prevState => {
	  		let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
	  		player1.diceToReduce = tempDiceToReduce + player1.diceToReduce;       // update the name property, assign a new value     
	  		player1.turnScore = turnScore;
	  		player1.bankScore = bankScore;
	  		player1.throwScore = throwScore;
	  		player1.dice = rolls;  	
	  		console.log("setting state player1...");
	  		console.log(player1.diceToReduce);
	  		console.log(player1.dice);	           
	  		return { player1 };                                 // return new object player1 object
		});
		console.log("this.state.player1.diceToReduce:  " + this.state.player1.diceToReduce);
		if( bankScore >= this.state.maxScore ){  // if there is winner
			this.setState({winner: 'Player1'});
		}else if((this.state.player1.diceToReduce + tempDiceToReduce) === this.state.totalDice){  // or there is NO more dice, change player's turn
			
      			this.setState({playerTurn: 'player2'});
      			console.log("swap to player2:  ");
      			this.setState({newTurn: "true"});      			
      		}
      		
  	}else{
  		console.log("player:  " + tempPlayerTurn);
  		numberOfDice = numberOfDice - this.state.player2.diceToReduce;
  		console.log("numberOfDice:  " + numberOfDice);
  		// note that throw score will be reset to zero for every dice rolling
  		turnScore = this.state.player2.turnScore;
  		bankScore = this.state.player2.bankScore;
  		for (let i = 0; i < numberOfDice; i++) {
  			rolls[i] = Math.floor(Math.random() * 6) + 1;
  			if (rolls[i] !== 1 && rolls[i] !== 6){
  				throwScore += rolls[i];
  			}else{
  				tempDiceToReduce++; 
  			}
  		}
  		//print out the value for debug      		
      		console.log("tempDiceToReduce:  " + tempDiceToReduce);
      		console.log("throwScore:  " + throwScore);
      		console.log("original turnScore:  " + turnScore);
      		turnScore = turnScore + throwScore;  // add the die score to the turn score
      		console.log("added turnScore:  " + turnScore);
      		bankScore = bankScore + throwScore;
      		console.log("bankScore:  " + bankScore);
      		
      		
      		this.setState(prevState => {
  			let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
  			player2.diceToReduce = tempDiceToReduce + this.state.player2.diceToReduce;       // update the name property, assign a new value     
	  		player2.turnScore = turnScore;
	  		player2.bankScore = bankScore;
	  		player2.throwScore = throwScore;
	  		player2.dice = rolls;  	
	  		console.log("setting state player2...");	  		           
  			return { player2 };                                 // return new object player2 object
		});
      		if( bankScore >= this.state.maxScore ){ //if there is winner
			this.setState({winner: 'Player2'});
		}else if((this.state.player2.diceToReduce + tempDiceToReduce) === this.state.totalDice){  //or there is NO more dice
			
      			this.setState({playerTurn: 'player1'});
      			console.log("swap to player1:  ");
      			this.setState({newTurn: "true"});       
      		}
  	}
  	
  };
  // rendering the dice image and the result panel
  render() {
  	//const { winner, playerTurn, player1, player2 } = this.props;
  	console.log("winner:  " + this.state.winner);
  	console.log("playerTurn:  " + this.state.playerTurn);
  	
  	return(
  		<div className="App">
  			<h1>Dice Roll: Be the first to score {this.state.maxScore} points</h1>
		        <div className="buttons">          
		          {[this.state.totalDice].map(number => { 
		            number === 1 ? "die" : "dice";
		            return (
		              <button
		                key={number}
		                onClick={() => this.diceRoll(number)}
		                className="button"
		              >
		                Click to roll with max. {number} x dice
		              </button>
		            );
		            		          
		          })}		          
		        </div>	
		        Player1: Throw Score: {this.state.player1.throwScore} Turn Score: {this.state.player1.turnScore} Bank Score: {this.state.player1.bankScore}<br/>	        
		        {
		        	Object.assign({}, this.state.player1).dice.map((roll, index) => (
		          	<DiceImage roll={roll} key={index} />
		          	))
		        }
		        <br/><br/>
		        Player2: Throw Score: {this.state.player2.throwScore} Turn Score: {this.state.player2.turnScore} Bank Score: {this.state.player2.bankScore}<br/>
		        {
		        	Object.assign({}, this.state.player2).dice.map((roll, index) => (
		          	<DiceImage roll={roll} key={index} />
		          	))
			}
			<br/>
			
			
			<br/>		
			<Status winner={ this.state.winner }  playerTurn={ this.state.playerTurn } />	
  		</div>  
  		 		
        
  	);
  }
   
  

  
}

const DiceImage = ({ roll }) => {
  if (roll === 1) {
    return <img className="dice-image" src={one} alt="1" />;
  } else if (roll === 2) {
    return <img className="dice-image" src={two} alt="2" />;
  } else if (roll === 3) {
    return <img className="dice-image" src={three} alt="3" />;
  } else if (roll === 4) {
    return <img className="dice-image" src={four} alt="4" />;
  } else if (roll === 5) {
    return <img className="dice-image" src={five} alt="5" />;
  } else if (roll === 6) {
    return <img className="dice-image" src={six} alt="6" />;
  }
};

export default App;
