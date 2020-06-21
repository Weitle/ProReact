import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0
    }
  }

  isEven = (value)=>{
    return value/2 === 0 ? 'Even' : 'Odd';
  }

  handleClick = ()=>{
    this.setState({
      count: this.state.count + 1
    });
  }
  getClassName = (value)=>{
    return value % 2 === 0 ? "bg-success text-white" : "bg-secondary text-white"
  }

  render() {
    const {count} = this.state;
    return (
      <div className="container-fluid p-4">
        <table className="table table-striped table-bordered table-sm">
          <thead className={this.getClassName(count)}>
            <tr>
              <th>Value</th>
              <th>Even?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{count}</td>
              <td>{this.isEven(count)}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-success m-2" onClick={this.handleClick}>Click Me</button>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="">City:</label>
          <input type="text" className="form-control" />
        </div>
      </div>
    );
  }
}
 
export default App;
