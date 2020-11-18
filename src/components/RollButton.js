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
							 Stop & Bank
						</button></div>;  
  }  
}  
  
export default RollButton;