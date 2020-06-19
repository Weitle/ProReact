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
      ],
      newItem:''
    }
  }

  // 切换用户名
  handleChangeUsername = ()=>{
    let {username} = this.state;
    username = username === 'Adam' ? 'Bob' : 'Adam';
    this.setState({username});
  }
  // 加载 todoList 表格
  renderItems = ()=>{
    const {todoItems} = this.state;
    return (
      <tbody>
        {todoItems.map(item=><tr key={item.action}>
        <td>{item.action}</td>
        <td>
          <input type="checkbox" checked={item.done} onChange={()=>this.toggleItemChecked(item)} />
        </td>
        </tr>)}
      </tbody>
    );
  }
  // 切换事件完成状态
  toggleItemChecked = (item)=>{
    const {todoItems} = this.state;
    todoItems.map(todo=>{
      if(todo.action === item.action){
        item.done = !item.done;
      }
    });
    this.setState({todoItems});
  }
  // 添加新事件
  updateNewItem = (event)=>{
    this.setState({newItem:event.target.value});
  }
  handleAddItem = ()=>{
    let {todoItems} = this.state;
    const item = {
      action:this.state.newItem,
      done:false
    };
    todoItems.push(item);
    this.setState({todoItems, newItem:''});    
  }
  render() {
    const {username, todoItems, newItem} = this.state;
    return (
      <div>
        <h4 className="bg-success text-white text-center p-2">{username}'s Todo List ({todoItems.filter(item=>!item.done).length} items to do)</h4>
        <button className="btn btn-success m-2" onClick={this.handleChangeUsername}>Change Username</button>
        <div className="container-fluid">
          <div className="my-1">
            <input className="form-control" value={newItem} onChange={this.updateNewItem} />
            <button className="btn btn-primary mt-1" onClick={this.handleAddItem}>Add</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            {this.renderItems()}
          </table>
        </div>
      </div>
    );
  }
}
 
export default App;
