
import React, { Component } from "react";
import "./App.css";
import Status from './components/Status';

import RollButton from './components/RollButton';

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
	totalDice: 10 ,
	showButton: true
	  
  };
  
  
    

  
  stopAndEndTurn = tempPlayerTurn => {

  	console.log("end turn and swap player...");
  	let turnScore = 0;
	let bankScore= 0;
	let winnerScore=0;
  	//current turn is player 1, and then player 1 clicked 'End turn'
  	if(tempPlayerTurn === 'Player1'){
  		  turnScore = this.state.player1.turnScore;
		  bankScore = this.state.player1.bankScore;
		  winnerScore =  turnScore + bankScore;

		if( winnerScore >= this.state.maxScore ){  // if there is winner
			  this.setState({winner: 'Player1'});
			  this.setState({showButton: false});
			  window.alert("Winner: Player1's bank score is " +winnerScore+ ".\nPlease press 'F5' to have new game.");
			  this.setState(prevState => {
				let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
				player1.bankScore = winnerScore;        		           
				return { player1 };
			});
			  
/*
			  this.setState(prevState => {
				let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
				player1.diceToReduce = 0;       // reset to zero 
				player1.turnScore = 0;
				player1.bankScore = 0;  // reset Player 1
			    player1.dice = [];			  
			    player1.diceLeft = 0;
			    player1.throwScore = 0;
		      return { player1 }; });
			
	  		  this.setState(prevState => {
			    let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
			    player2.diceToReduce = 0;       // reset Player2
			    player2.turnScore = 0;				
				player2.diceLeft = 0;
				player2.bankScore = 0;
				player2.throwScore = 0;   
				player2.dice = [ ];
			  return { player2 }; });
			  
			  this.playerTurn=' ';
			  this.maxScore= 0;
			  this.winner= '';
			  this.newTurn= 'false';
			  this.totalDice= 0; 
*/
		  }else {
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
				player2.diceLeft = 0;
				player2.throwScore = 0;   
				return { player2 }; });
						
				console.log("after set, swap to player 2");
				this.setState({playerTurn: 'player2'});
				this.setState({newTurn: "true"});
		  }
  	}else {
  		// current turn is player 2, and then player 2 clicked 'End turn'
  		turnScore = this.state.player2.turnScore;
		bankScore = this.state.player2.bankScore;
		winnerScore =  turnScore + bankScore;

	
		if( winnerScore >= this.state.maxScore ){  // if there is winner
				this.setState({winner: 'Player2'});
				this.setState({showButton: false});
				window.alert("Winner: Player2's bank score is " +winnerScore+ ".\nPlease press 'F5' to have new game.");
				this.setState(prevState => {
					let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
					player2.bankScore = winnerScore;        		           
					return { player2 };
				});
				
			}
			else{
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
				player1.diceLeft = 0;
				player1.throwScore = 0;   
				return { player1 }; });

				this.setState({playerTurn: 'Player1'});
			}
  	}
  	if(bankScore >= this.state.maxScore ){ // winner if reach the max score
		  this.setState({winner: tempPlayerTurn});
		  this.setState({showButton: false});
		  window.alert("Winner: " + tempPlayerTurn + "'s bank score is " +bankScore+ "!!!");
	  }
	  /*else{
  		// reset new turn to true
	  	  this.setState({newTurn: 'true'});
		  window.alert("End " + tempPlayerTurn + "'s turn, the turn score, " 
		  +turnScore+ 
		  "  , will be added to bank score.\n\n"
		  + tempPlayerTurn + "'s bank score = " +bankScore+ " + " +turnScore+
		  "\n\nPlay passes to the next player !");
  	  }*/
  	
  };
  
  // called when clicking the roll dice button
  diceRoll = numberOfDice => {
  	let rolls = [];  	
  	let throwScore = 0;
  	let turnScore = 0;
	let bankScore = 0;
	let winnerScore = 0;
  	let tempDiceToReduce = 0;
  	let tempPlayerTurn = "";
	
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
		  		return { player1 }; 
		  	});
  		}else if (this.state.playerTurn === 'Player1'){
  			// reset the dice, and the turnScore for player2
  			this.setState(prevState => {
		  		let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
		  		player2.diceToReduce = 0;       // reset to zero 
		  		player2.turnScore = 0;
		  		player2.dice.splice(0, this.state.totalDice);	  		           
		  		return { player2 }; 
		  	});
  		}
  		// reset new turn to false
  		this.setState({newTurn: 'false'});
  	}
  	tempPlayerTurn = this.state.playerTurn;
  	if(tempPlayerTurn === 'Player1'){
		numberOfDice = numberOfDice - this.state.player1.diceToReduce;
  		// note that throw score will be reset to zero for every dice rolling
  		turnScore = this.state.player1.turnScore;
		bankScore = this.state.player1.bankScore;
		winnerScore = turnScore + bankScore;

		if( winnerScore >= this.state.maxScore ){  // if there is winner
				this.setState({winner: 'Player1'});
				this.setState({showButton: false});
				window.alert("Winner: Player1's bank score is " +winnerScore+ ".\nPlease press 'F5' to have new game.");
				this.setState(prevState => {
					let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
					player1.bankScore = winnerScore;        		           
					return { player1 };
				});

			}

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
      			turnScore = 0;      			
      		}
      		turnScore = turnScore + throwScore;  // add the die score to the turn score     		
      		this.setState(prevState => {
	  		let player1 = Object.assign({}, prevState.player1);  // creating copy of state variable player1
	  		player1.diceToReduce = tempDiceToReduce + player1.diceToReduce;       // update the name property, assign a new value     
	  		player1.turnScore = turnScore;
	  		player1.throwScore = throwScore;
			player1.dice = rolls;  	
			player1.diceLeft = numberOfDice;        
	  		return { player1 };                                 // return new object player1 object
        });

		if (throwScore === 0){
			//in case throw score is zero, actually 
			this.setState({playerTurn: 'player2'});
				  this.setState({newTurn: "true"});  

				  window.alert("There are no remaining dice ! 1s and 6s score zero.\nSo, throw score is 0!\n\n" 
				  +tempPlayerTurn+ 
				  "'s turn score is wiped out. ( Turn score is 0 )\n"
				  +tempPlayerTurn+ "'s bank score = " +bankScore+ " + " +turnScore+
				  "\n\nPlay passes to the next player ! ");		
			}
      		
  	}else{
		numberOfDice = numberOfDice - this.state.player2.diceToReduce;
  		// note that throw score will be reset to zero for every dice rolling
  		turnScore = this.state.player2.turnScore;
		bankScore = this.state.player2.bankScore;
		winnerScore = turnScore + bankScore;
		
		  if( winnerScore >= this.state.maxScore ){  // if there is winner
				  this.setState({winner: 'Player2'});
				  this.setState({showButton: false});
				  window.alert("Winner: Player2's bank score is " +winnerScore+ ".\nPlease press 'F5' to have new game.");
				  this.setState(prevState => {
					  let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
					  player2.bankScore = winnerScore;        		           
					  return { player2 };
				  });
			  }
  		for (let i = 0; i < numberOfDice; i++) {
  			rolls[i] = Math.floor(Math.random() * 6) + 1;
  			if (rolls[i] !== 1 && rolls[i] !== 6){
  				throwScore += rolls[i];
  			}else{
  				tempDiceToReduce++; 
  			}
  		}

      		// check if throwScore is zero, reset the turnScore to zero
      		if(throwScore === 0 ){
      			turnScore = 0;      			
      		}
      		turnScore = turnScore + throwScore;  // add the die score to the turn score		
      		this.setState(prevState => {
  			let player2 = Object.assign({}, prevState.player2);  // creating copy of state variable player1
  			player2.diceToReduce = tempDiceToReduce + this.state.player2.diceToReduce;       // update the name property, assign a new value     
	  		player2.turnScore = turnScore;
	  		player2.throwScore = throwScore;
			player2.dice = rolls;  	
			player2.diceLeft = numberOfDice;	  		           
  			return { player2 };                                 // return new object player2 object
		});
		if (throwScore === 0){
			//in case throw score is zero, actually 
			this.setState({playerTurn: 'Player1'});
      			this.setState({newTurn: "true"});  
				  //window.alert("Throw score is zero, " + tempPlayerTurn + "'s turn score is wiped out.\n Roll the dice for the next player.");
				  window.alert("There are no remaining dice ! 1s and 6s score zero.\nSo, throw score is 0!\n\n" 
				  +tempPlayerTurn+ 
				  "'s turn score is wiped out. ( Turn score is 0 )\n"
				  +tempPlayerTurn+ "'s bank score = " +bankScore+ " + " +turnScore+
				  "\n\nPlay passes to the next player ! ");
				  
		}
  	}
  };


  // rendering the dice image and the result panel
  render() {
 
  	return(
		
  		<div className="App">
            <table class="center">
                <div class="row">
                <div class="column1"><img className="dice-image" src="die.png" alt=" " /></div>
                <div class="column2"><h3>10 Dice Rolling Game ! Who will be the first to score {this.state.maxScore} points ?</h3></div>
                </div>
            </table> 
			<h2>1s and 6s are removed before the next throw and the throw score is zero.<br/>All remaining dice values are added up to make the throw score.<br/>
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
		            return (
                            <button 
                            key={number}
                            onClick={() => this.diceRoll(number)}
                            className="buttonPlayer1" hidden={!this.state.showButton}
                            >Start Roll
					        </button>
		                    );
		            		          
		            })}
		        </div><br/></div>
			    
				<div class="column4">
				<div className="buttons">
						{ this.state.showButton && 	
						<RollButton parentMethod={() => this.stopAndEndTurn(this.state.playerTurn)}/>
						}
						</div></div></div>
						
		        </table> </div> 
		        
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
