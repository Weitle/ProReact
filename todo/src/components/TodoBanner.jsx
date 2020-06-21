import React, { Component } from 'react';

class TodoBanner extends Component {
  render() {
    const {username, tasks} = this.props; 
    return (
      <h4 className="bg-success text-white text-center p-2">
        {username}'s To Do List
        ({tasks.filter(t=>!t.done).length} items to do)
      </h4>
    );
  }
}
 
export default TodoBanner;