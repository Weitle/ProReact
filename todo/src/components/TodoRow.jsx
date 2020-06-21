import React, { Component } from 'react';

class TodoRow extends Component {
  render() {
    const {item, toggleChecked} = this.props;
    return (
      <tr>
        <td>{item.action}</td>
        <td>
          <input type="checkbox" checked={item.done} onChange={toggleChecked} />
        </td>
      </tr>
    )
  }
}
 
export default TodoRow;