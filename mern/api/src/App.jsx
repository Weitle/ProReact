const initIssues = [
  { id: 1, status: 'New', owner: 'Ravan', effort: 5, created: new Date('2018-08-15'), due: undefined, title: 'Error in console when clicking Add' },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2018-08-16'),
    due: new Date('2018-08-30'),
    title: 'Missing bottom border on panel'
  }
]

class IssueList extends React.Component{
  constructor(){
    super();
    this.state = {
      issues: []
    };
    //this.createIssue = this.createIssue.bind(this);
  }

  createIssue = (issue)=>{
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = [ ...this.state.issues ];
    newIssueList.push(issue);
    this.setState({
      issues: newIssueList
    })
  }

  // 模拟使用 ajax 方法从服务器获取数据
  loadData(){
    setTimeout(()=>{
      this.setState({
        issues: initIssues
      })
    }, 1000);
  }

  componentDidMount(){
    this.loadData();
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

class IssueFilter extends React.Component{
  render(){
    return <div>This is a placeholder for the issue filter.</div>;
  }
}

class IssueRow extends React.Component{
  render(){
    const { issue } = this.props;
    return <tr>
      <td>{ issue.id }</td>
      <td>{ issue.status }</td>
      <td>{ issue.owner }</td>
      <td>{ issue.created ? issue.created.toString() : '' }</td>
      <td>{ issue.effort }</td>
      <td>{ issue.due ? issue.due.toString() : '' }</td>
      <td>{ issue.title }</td>
    </tr>;
  }
}

class IssueTable extends React.Component{
  render(){
    const { issues } = this.props;
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
          issues.map(issue=><IssueRow key={ issue.id } issue={ issue } />)
        }
      </tbody>
    </table>
  }
}

class IssueAdd extends React.Component{
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
  }
  render(){
    return <form name="issueAdd" onSubmit={this.handleSubmit}>
      <input type="text" name="owner" placeholder="Owner" />
      <input type="text" name="title" placeholder="Title" />
      <button>Add</button>
    </form>
  }
}


const element = <IssueList />;

ReactDOM.render(element, document.getElementById('app'));