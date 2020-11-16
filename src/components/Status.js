import "../App.css";
import React, { Component } from 'react';
import PropTypes from 'prop-types';



export class Status extends Component {
	render(){
		const { winner, playerTurn } = this.props;
		if(winner){
			return(<div className="sum"><br/>Winner:  {winner}<br/></div>);
		}else{
			return(<div><br/> Currrent Player :  {playerTurn}<br/> (  All 1s & 6s are removed !!  )<br/><br/> </div>);
		}
			
		
	}
}

Status.propTypes = {
	winner: PropTypes.string.isRequired,
	playerTurn: PropTypes.string.isRequired,
};
Status.displayName = 'Status';


export default Status;

