import React, { Component } from 'react';

class SimpleButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      hasButtonBeenClicked: false
    }
  }
  handleClick = ()=>{
    this.setState({
      counter:this.state.counter+1
    }, ()=>{
      this.setState({hasButtonBeenClicked:this.state.counter>0});
    });
    //this.props.callback();
  }
  render() {
    const {className, disabled, text} = this.props;
    const {counter, hasButtonBeenClicked} = this.state;
    return (
      <button onClick={this.handleClick}
        className={className}
        disabled={disabled === "true" || disabled === true}
      >
        {text} {counter}
        {hasButtonBeenClicked && <div>Button Clicked!</div>}
      </button>
    );
  }
}
 
export default SimpleButton;