import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'Adam',
      todoItems:[
        {action:'Buy Flowers', done:false},
        {action:'Get Shoes', done:false},
        {action:'Collect Tickets', done:true},
        {action:'Call Joe', done:false}
      ]
    }
  }

  // 切换用户名
  handleChangeUsername = ()=>{
    let {username} = this.state;
    username = username === 'Adam' ? 'Bob' : 'Adam';
    this.setState({username});
  }
  render() {
    const {username, todoItems} = this.state;
    return (
      <div>
        <h4 className="bg-success text-white text-center p-2">{username}'s Todo List ({todoItems.filter(item=>!item.done).length} items to do)</h4>
        <button className="btn btn-success m-2" onClick={this.handleChangeUsername}>Change Username</button>
      </div>
    );
  }
}
 
export default App;
