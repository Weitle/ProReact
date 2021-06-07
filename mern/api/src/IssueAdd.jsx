import React, { Component } from 'react';

class IssueAdd extends Component{
  constructor(){
    super();
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    const form = document.forms.issueAdd;
    const sampleIssue = {
      status: 'New',
      owner: form.owner.value,
      title: form.title.value
    }
    this.props.createIssue(sampleIssue);
    form.owner.value = '';
    form.title.value = '';
  }
  render(){
    return <form name="issueAdd" onSubmit={this.handleSubmit}>
      <input type="text" name="owner" placeholder="Owner" />
      <input type="text" name="title" placeholder="Title" />
      <button>Add</button>
    </form>
  }
}

export default IssueAdd;