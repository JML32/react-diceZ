import "../App.css";
import React, { Component } from 'react';
import PropTypes from 'prop-types';



export class Status extends Component {
	render(){
		const { winner, playerTurn } = this.props;
		if(winner){
			return(<div className="winner"><br/>Winner:  {winner}<br/></div>);
		}else{
			return(<div><h1><br/> Currrent Player :  {playerTurn}<br/> </h1> </div>);
		}
			
		
	}
}

Status.propTypes = {
	winner: PropTypes.string.isRequired,
	playerTurn: PropTypes.string.isRequired,
};
Status.displayName = 'Status';


export default Status;

