const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { validateIssue } = require('./issue');

mongoose.connect("mongodb://localhost/issuetracker").then(()=>{
  console.log('Connect to issuetracker database...');
}).catch(err=>{
  console.log(`Connect to issuetracker database failed: ${ee.message}`);
  return;
});

// 创建 issue 模式和模型
const issueSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  effort: Number,
  created: {
    type: Date,
    required: true
  },
  due: Date,
  title: {
    type: String,
    required: true
  }
});
const Issue = mongoose.model('Issue', issueSchema);

const app = express();

const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';
if(enableHMR && (process.env.NODE_ENV !== 'production')){
  console.log('Adding dev middleware, enabling HMR');
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('./webpack.config.js');
  config.entry.app.push("webpack-hot-middleware/client");
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler))
}

app.use(bodyParser.json());

// 静态文件路由映射至 public 目录
app.use('/public', express.static('public'));

app.get('/api/issues', async(req, res)=>{
  const issues = await Issue.find();
  const meatdata = {total_count: issues.length};
  res.json({
    _metadata: meatdata,
    records: issues
  });
});

app.post('/api/issues', async(req, res)=>{
  const newIssue = req.body;
  newIssue.created = new Date();
  if(!newIssue.status)
    newIssue.status = 'New';
  const err = validateIssue(newIssue);
  if(err){
    res.status(422).json({message: `Invalid request: ${err}`});
    return;
  }
  //issues.push(newIssue);
  const issue = await Issue.create(newIssue);
  if(!issue){
    res.status(500).json({
      message: 'Insert issue failed.'
    });
    return;
  }
  res.json(issue);
});

app.get('/api/issues/:issue_id', async (req, res)=>{
  const issue = await Issue.findById(req.params.issue_id).select({status: 1, owner: 1, title: 1, due: 1, effort: 1});
  if(!issue){
    res.json({
      status: -1,
      message: 'issue is not exists.'
    });
    return;
  }
  
  res.json(issue); 
})

app.put('/api/issues/:issue_id', async(req, res)=>{
  const issueToUpdate = await Issue.findById(req.params.issue_id).select({status: 1, owner: 1, title: 1, due: 1, effort: 1});
  issueToUpdate.status = req.body.status || issueToUpdate.status;
  issueToUpdate.owner = req.body.owner || issueToUpdate.owner;
  issueToUpdate.title = req.body.title || issueToUpdate.title;
  if(req.body.effort){
    issueToUpdate['effort'] = parseInt(req.body.effort);
  }
  if(req.body.due){
    issueToUpdate['due'] = new Date(req.body.due);
  }
  const issueUpdated = await issueToUpdate.save();
  if(!issueUpdated){
    res.sataus(500).json({message: 'Update issue failed.'});
    return;
  }
  
  res.json(issueUpdated);
});

app.listen(3000, function(){
  console.log('App started on port 3000...');
});