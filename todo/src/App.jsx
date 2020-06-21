import React, { Component } from 'react';
import TodoBanner from './components/TodoBanner';
import TodoRow from './components/TodoRow';
import TodoCreator from './components/TodoCreator';
import VisibilityControl from './components/VisibilityControl';
import SimpleButton from './components/SimpleButton';

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
      showCompleted: false      // 是否显示已经完成的任务
    }
  }
  // 数据持久化，使用 localStorage
  componentDidMount(){
    let data = localStorage.getItem('todos');
    this.setState(
      data !== null ? JSON.parse(data) : {
        username: 'Adam',
        todoItems:[
          {action:'Buy Flowers', done:false},
          {action:'Get Shoes', done:false},
          {action:'Collect Tickets', done:true},
          {action:'Call Joe', done:false}
        ],
        showCompleted:false
      }
    )
  }

  // 切换用户名
  /*
  handleChangeUsername = ()=>{
    let {username} = this.state;
    username = username === 'Adam' ? 'Bob' : 'Adam';
    this.setState({username});
  }*/
  // 加载 todoList 表格
  todoRows = (isDone)=>{
    const {todoItems} = this.state;
    const toShowItems = todoItems.filter(item=>item.done === isDone);
    return (
      toShowItems.map(item=><TodoRow key={item.action} item={item} toggleChecked={()=>this.toggleItemChecked(item)} />)
    )
  }
  // 切换事件完成状态
  toggleItemChecked = (item)=>{
    const {todoItems} = this.state;
    todoItems.map(todo=>{
      if(todo.action === item.action){
        item.done = !item.done;
      }
    });
    this.setState({todoItems}, ()=>localStorage.setItem('todos', JSON.stringify(this.state)));
  }
  // 添加新事件
  /*
  updateNewItem = (event)=>{
    this.setState({newItem:event.target.value});
  }*/
  handleAddItem = (action)=>{
    let {todoItems} = this.state;
    if(!todoItems.find(item=>item.action === action)){
      this.setState({
        todoItems: [...todoItems, {action:action, done:false}]
      }, ()=>{
        localStorage.setItem('todos', JSON.stringify(this.state))
      });
    }
  }
  // 切换是否显示已完成任务
  toggleVisibility = ()=>{
    this.setState({showCompleted:!this.state.showCompleted}, ()=>{
      localStorage.setItem('todos', JSON.stringify(this.state));
    });
  }
  render() {
    const {username, todoItems, showCompleted} = this.state;
    return (
      <div>
        <TodoBanner username={username} tasks={todoItems} />
        <div className="container-fluid">
          <div className="my-1">
            <TodoCreator callback={this.handleAddItem} />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.todoRows(false)}
            </tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl label="Completed Tasks" visible={showCompleted} toggleVisibility={this.toggleVisibility} />
          </div>
          {showCompleted && (todoItems.filter(item=>item.done).length > 0) ? <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.todoRows(true)}
            </tbody>
          </table> : null}

          <SimpleButton className="btn btn-primary" text="Primary" />
        </div>
      </div>
    );
  }
}
 
export default App;
