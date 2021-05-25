const initIssues = [{
  id: 1,
  status: 'New',
  owner: 'Ravan',
  effort: 5,
  created: new Date('2018-08-15'),
  due: undefined,
  title: 'Error in console when clicking Add'
}, {
  id: 2,
  status: 'Assigned',
  owner: 'Eddie',
  effort: 14,
  created: new Date('2018-08-16'),
  due: new Date('2018-08-30'),
  title: 'Missing bottom border on panel'
}];

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    }; //this.createIssue = this.createIssue.bind(this);
  }

  createIssue = issue => {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = [...this.state.issues];
    newIssueList.push(issue);
    this.setState({
      issues: newIssueList
    });
  }; // 模拟使用 ajax 方法从服务器获取数据

  loadData() {
    setTimeout(() => {
      this.setState({
        issues: initIssues
      });
    }, 1000);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Issues Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }));
  }

}

class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the issue filter.");
  }

}

class IssueRow extends React.Component {
  render() {
    const {
      issue
    } = this.props;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created ? issue.created.toString() : ''), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toString() : ''), /*#__PURE__*/React.createElement("td", null, issue.title));
  }

}

class IssueTable extends React.Component {
  render() {
    const {
      issues
    } = this.props;
    return /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    }))));
  }

}

class IssueAdd extends React.Component {
  constructor() {
    super(); //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const sampleIssue = {
      status: 'New',
      owner: form.owner.value,
      title: form.title.value
    };
    this.props.createIssue(sampleIssue);
  };

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Title"
    }), /*#__PURE__*/React.createElement("button", null, "Add"));
  }

}

const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('app'));