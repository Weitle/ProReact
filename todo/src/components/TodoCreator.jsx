import React, { Component } from 'react';

class TodoCreator extends Component {
  constructor(props){
    super(props);
    this.state = {
      newItem:''
    }
  }

  handleItemChange = (event)=>{
    this.setState({newItem:event.target.value});
  }
  // 调用父组件方法创建新事件
  handleAddItem = ()=>{
    this.props.callback(this.state.newItem);
    this.setState({newItem:''});
  }

  render() {
    const {newItem} = this.state;
    return (
      <div>
        <input type="text" className="form-control" value={newItem} onChange={this.handleItemChange} />
        <button className="btn btn-success mt-1" onClick={this.handleAddItem}>Add</button>
      </div>
    );
  }
}
 
export default TodoCreator;