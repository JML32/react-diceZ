
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
  		turnScore: 0,
  		bankScore: 0,
		diceToReduce: 0,
		diceleft: 10 ,
  		dice: []
  	},
  	player2: {
  		id: 2,
  		name: 'Player2',
  		throwScore: 0,
  		turnScore: 0,
  		bankScore: 0,
		diceToReduce: 0,
		diceleft: 10 ,
  		dice: []
  	},
  	playerTurn: 'Player1',
  	maxScore: 200,
  	winner: '',
	newTurn: 'false',
	newGame: 'turn',
	totalDice: 10 
	  
  };
  
  stopAndEndTurn = tempPlayerTurn => {
  	console.log("end turn and swap player...");
  	let turnScore = 0;
  	let bankScore= 0;
  	//current turn is player 1, and then player 1 clicked 'End turn'
  	if(tempPlayerTurn === 'Player1'){
  		turnScore = this.state.player1.turnScore;
  		bankScore = this.state.player1.bankScore;
  		console.log("turnScore + bankScore:" + turnScore + bankScore);
  		this.setState(prevState => {
		  		let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
		  		player1.diceToReduce = 0;       // reset to zero 
		  		player1.turnScore = 0;
		  		player1.bankScore = bankScore + turnScore;  // recalcute the bank score, including last turn score
				player1.dice.splice(0, this.state.totalDice);			  
				player1.diceLeft = 0;
				player1.throwScore = 0;
			return { player1 }; });
			  
		this.setState(prevState => {
				let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
				player2.diceToReduce = 0;       // reset to zero 
				player2.turnScore = 0;
				//player1.bankScore = bankScore + turnScore;  // recalcute the bank score, including last turn score
				//player1.dice.splice(0, this.state.totalDice);					
				player2.diceLeft = 0;
				player2.throwScore = 0;   
			return { player2 }; });
						
		console.log("after set, swap to player 2");
		this.setState({playerTurn: 'player2'});
		this.setState({newTurn: "true"});
  	}else{
  		// current turn is player 2, and then player 2 clicked 'End turn'
  		turnScore = this.state.player2.turnScore;
  		bankScore = this.state.player2.bankScore;
  		console.log("turnScore + bankScore:" + turnScore + bankScore);
  		this.setState(prevState => {
		  		let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
		  		player2.diceToReduce = 0;       // reset to zero 
		  		player2.turnScore = 0;
		  		player2.bankScore = bankScore + turnScore;  // recalcute the bank score, including last turn score
				  player2.dice.splice(0, this.state.totalDice);
				  player2.throwScore = 0; 
				  player2.diceLeft = 0;
			return { player2 };  });
				  
		this.setState(prevState => {
				let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
				player1.diceToReduce = 0;       // reset to zero 
				player1.turnScore = 0;
				//player2.bankScore = bankScore + turnScore;  // recalcute the bank score, including last turn score
				//player2.dice.splice(0, this.state.totalDice);					
				player1.diceLeft = 0;
				player1.throwScore = 0;   
			return { player1 }; });
		console.log("after set, swap to player1");
		this.setState({playerTurn: 'Player1'});
  	}
  	if(bankScore >= this.state.maxScore ){ // winner if reach the max score
  		this.setState({winner: tempPlayerTurn});
  	}else{
  		// reset new turn to true
	  	this.setState({newTurn: 'true'});
		  window.alert("End " + tempPlayerTurn + "'s turn, the turn score, " 
		  +turnScore+ 
		  "  , will be added to bank score.\n\n"
		  + tempPlayerTurn + "'s bank score = " +bankScore+ " + " +turnScore+
		  "\n\nPlay passes to the next player !");
  	}
  	
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
  		}else if (this.state.playerTurn === 'Player1'){
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
  	if(tempPlayerTurn === 'Player1'){
  		console.log("player:  " + tempPlayerTurn);
		numberOfDice = numberOfDice - this.state.player1.diceToReduce;
		  console.log("numberOfDice:  " + numberOfDice);
		  console.log("this.state.player1.diceLeft:  " + this.state.player1.diceLeft);
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
      		
      		// check if throwScore is zero, reset the turnScore to zero
      		if(throwScore === 0 ){
      			console.log("throw score zero, reset turnScore, change to next player");
      			turnScore = 0;      			
      		}
      		turnScore = turnScore + throwScore;  // add the die score to the turn score
      		console.log("added turnScore:  " + turnScore);
      		// do not add to bank score first ------> bankScore = bankScore + throwScore;
      		//console.log("bankScore:  " + bankScore);
      		// need to add bankscore here
      		
      		this.setState(prevState => {
	  		let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
	  		player1.diceToReduce = tempDiceToReduce + player1.diceToReduce;       // update the name property, assign a new value     
	  		player1.turnScore = turnScore;
	  		//player1.bankScore = bankScore;
	  		player1.throwScore = throwScore;
			player1.dice = rolls;  	
			player1.diceLeft = numberOfDice;
					
			console.log("Player1>>>>>> diceLeft:  " + this.state.player1.diceLeft);
	  		console.log("setting state player1...");
	  		console.log(player1.diceToReduce);
	  		console.log(player1.dice);	           
	  		return { player1 };                                 // return new object player1 object
		});
		console.log("this.state.player1.diceToReduce:  " + this.state.player1.diceToReduce);
		if (throwScore === 0){
			//in case throw score is zero, actually 
			this.setState({playerTurn: 'player2'});
      			console.log("swap to player2 because throw score is zero");
				  this.setState({newTurn: "true"});  

				  window.alert("There are no remaining dice ! 1s and 6s score zero.\nSo, throw score is 0!\n\n" 
				  +tempPlayerTurn+ 
				  "'s turn score is wiped out. ( Turn score is 0 )\n"
				  +tempPlayerTurn+ "'s bank score = " +bankScore+ " + " +turnScore+
				  "\n\nPlay passes to the next player ! ");


		
			}/*else if( bankScore >= this.state.maxScore ){  // if there is winner
			this.setState({winner: 'Player1'});
		}else if((this.state.player1.diceToReduce + tempDiceToReduce) === this.state.totalDice){  // or there is NO more dice, change player's turn
			
      			this.setState({playerTurn: 'player2'});
      			console.log("swap to player2:  ");
      			this.setState({newTurn: "true"});      			
      		}*/
      		
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
      		// check if throwScore is zero, reset the turnScore to zero
      		if(throwScore === 0 ){
      			console.log("throw score zero, reset turnScore, change to next player");
      			turnScore = 0;      			
      		}
      		turnScore = turnScore + throwScore;  // add the die score to the turn score
      		console.log("added turnScore:  " + turnScore);
      		// do not add to bank score first ----> bankScore = bankScore + throwScore;
      		console.log("bankScore:  " + bankScore);
      		
      		
      		this.setState(prevState => {
  			let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
  			player2.diceToReduce = tempDiceToReduce + this.state.player2.diceToReduce;       // update the name property, assign a new value     
	  		player2.turnScore = turnScore;
	  		//player2.bankScore = bankScore;  //bank score is not added here
	  		player2.throwScore = throwScore;
			player2.dice = rolls;  	
			player2.diceLeft = numberOfDice;
			console.log("Player2 >>>>> diceLeft:  " + this.state.player2.diceLeft);
	  		console.log("setting state player2...");	  		           
  			return { player2 };                                 // return new object player2 object
		});
		if (throwScore === 0){
			//in case throw score is zero, actually 
			this.setState({playerTurn: 'Player1'});
      			console.log("swap to player1 because throw score is zero");
      			this.setState({newTurn: "true"});  
				  //window.alert("Throw score is zero, " + tempPlayerTurn + "'s turn score is wiped out.\n Roll the dice for the next player.");
				  window.alert("There are no remaining dice ! 1s and 6s score zero.\nSo, throw score is 0!\n\n" 
				  +tempPlayerTurn+ 
				  "'s turn score is wiped out. ( Turn score is 0 )\n"
				  +tempPlayerTurn+ "'s bank score = " +bankScore+ " + " +turnScore+
				  "\n\nPlay passes to the next player ! ");
				  
		}
      		/*if( bankScore >= this.state.maxScore ){ //if there is winner
			this.setState({winner: 'Player2'});
		}else if((this.state.player2.diceToReduce + tempDiceToReduce) === this.state.totalDice){  //or there is NO more dice
			
      			this.setState({playerTurn: 'Player1'});
      			console.log("swap to player1:  ");
      			this.setState({newTurn: "true"});       
      		}*/
  	}
  	
  };
  // rendering the dice image and the result panel
  render() {


  	//const { winner, playerTurn, player1, player2 } = this.props;
  	console.log("winner:  " + this.state.winner);
	console.log("playerTurn:  " + this.state.playerTurn);

  	
  	return(
  		<div className="App">
		<table class="center">
			<div class="row">
			<div class="column1"><img className="dice-image" src="die.png" alt=" " /></div>
			<div class="column2"><h3>10 Dice Rolling Game ! Who will be the first to score {this.state.maxScore} points ?</h3></div>
			</div>
		</table> 
			<h2>11s and 6s score zero and are removed before the next throw !<br/>
			  If the throw score is zero, player's turn score is wiped out.<br/>
			  Take your own risk!<br/></h2>
			  {
		        	Object.assign({}, this.state.player1).dice.map((roll, index) => (
		          	<DiceImage roll={roll} key={index} />
		          	))
		        }
					
					{
		        	Object.assign({}, this.state.player2).dice.map((roll, index) => (
		          	<DiceImage roll={roll} key={index} />
		          	))
			}
				<br/>
				<span className="countPlayer1">
		            Player1: rolled {this.state.player1.diceLeft} dice,
		            this roll's score is {this.state.player1.throwScore} {" "}	</span>
				<span className="countPlayer1b">
					( Total turn score of this round: {this.state.player1.turnScore} {" "} )</span>
				<br/>
				<span className="countPlayer2">
		            Player2: rolled {this.state.player2.diceLeft} dice,
					this roll's score is {this.state.player2.throwScore} {" "}</span>
				<span className="countPlayer2b">
					( Total turn score of this round: {this.state.player2.turnScore}  {" "})</span>
				<br/>         


			  Total Bank Score of Player 1: <span className="bankPlayer1">{this.state.player1.bankScore}</span>/{this.state.maxScore}
			  <br/>
			  Total Bank Score of Player 2: <span className="bankPlayer2">{this.state.player2.bankScore}</span>/{this.state.maxScore}

			  <Status winner={ this.state.winner }  playerTurn={ this.state.playerTurn } />
	


				<table class="center2">
				<div class="row">
			<div class="column3">
			 <div className="buttons">          
		          {[this.state.totalDice].map(number => { 
		            //number === 1 ? "die" : "dice";
		            return (
						
		              //<button
		              //  key={number}
		              //  onClick={() => this.diceRoll(number)}
		              //  className="buttonPlayer1"
		              //>
		              //  {this.state.playerTurn} : Click to Roll 
		              //</button>

					<button
					key={number}
					onClick={() => this.diceRoll(number)}
					className="buttonPlayer1"
					>Start Roll
					</button>
		            );
		            		          
		          })}
       
		        </div>
				</div>

			<div class="column4">
				<div className="buttons">
							
						<button onClick={() => this.stopAndEndTurn(this.state.playerTurn)}
							className="buttonStop"
						>
							 Stop & Bank
						</button>


					


				</div>
				
				</div>
			</div>
		</table> 
	
			
			
			

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
