import React, { Component } from 'react';

class VisibilityControl extends Component {
  render() {
    const {visible, label, toggleVisibility} = this.props;
    return (
      <div className="form-check">
        <input type="checkbox" className="form-check-input" value={visible} onChange={toggleVisibility} />
        <label className="form-check-label">Show {label}</label>
      </div>
      
    );
  }
}
 
export default VisibilityControl;