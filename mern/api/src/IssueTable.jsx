import React from 'react';

function IssueRow(props){
  const { issue } = props;
  return <tr>
    <td>{ issue._id }</td>
    <td>{ issue.status }</td>
    <td>{ issue.owner }</td>
    <td>{ issue.created ? issue.created.toString() : '' }</td>
    <td>{ issue.effort }</td>
    <td>{ issue.due ? issue.due.toString() : '' }</td>
    <td>{ issue.title }</td>
  </tr>;
}

function IssueTable({ issues }){
  return <table className="bordered-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th>Owner</th>
        <th>Created</th>
        <th>Effort</th>
        <th>Due</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {
        issues.map(issue=><IssueRow key={ issue._id } issue={ issue } />)
      }
    </tbody>
  </table>;
}

export default IssueTable;