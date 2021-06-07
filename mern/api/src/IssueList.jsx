import React, { Component } from 'react';
import axios from 'axios';
import IssueFilter from './IssueFilter.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueTable from './IssueTable.jsx';

class IssueList extends Component{
  constructor(){
    super();
    this.state = {
      issues: []
    };
    //this.createIssue = this.createIssue.bind(this);
  }

  createIssue = (issue)=>{
    axios.post('/api/issues', issue).then(response=>{
      //console.log(response);
      if(response.statusText === 'OK'){
        const issue = response.data;
        issue.created = new Date(issue.created);
        if(issue.due)
          issue.due = new Date(issue.due);
        const newIssues = [...this.state.issues];
        newIssues.push(issue);
        this.setState({
          issues: newIssues
        });
      } else{
        const err = response.data;
        alert(`Failed to add issue: ${err.message}`);
      }
    }).catch(err=>{
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  componentDidMount(){
    axios.get('/api/issues').then(({data})=>{
      console.log(`Total count of records: ${data._metadata.total_count}`);
      data.records.forEach(issue=>{
        issue.created = new Date(issue.created);
        if(issue.due){
          issue.due = new Date(issue.due);
        }
      });
      this.setState({issues: data.records});
    }).catch(err=>{
      console.log(`Error: ${err.message}`);
    });
  }

  render(){
    return <div>
      <h1>Issues Tracker</h1>
      <IssueFilter />
      <hr/>
      <IssueTable  issues={ this.state.issues }/>
      <hr/>
      <IssueAdd createIssue={this.createIssue}/>
    </div>;
  }
}

export default IssueList;