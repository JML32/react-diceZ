import "../App.css";
import React, { Component } from "react";  
  
class RollButton extends Component {  
  constructor(props) {  
    super(props);  
     
  }  
  
  click= () => {
  	this.props.parentMethod();
  }
  
  render() {  
    return <div><button onClick={this.click}  className="buttonStop">
							 Bank & Pass
						</button></div>;  
  }  
}  
  
export default RollButton;