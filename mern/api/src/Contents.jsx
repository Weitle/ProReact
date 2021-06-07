import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';

const NotFound = ()=><h1>Page Not Found.</h1>

const Contents = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route path="/issues" component={IssueList} />
      <Route path="/report" component={IssueReport} />
      <Route component={NotFound} />
    </Switch>
  );
}
 
export default Contents;