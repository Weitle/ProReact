const express = require('express');

const app = express();

// 静态文件路由映射至 public 目录
app.use(express.static('public'));

app.listen(3000, function(){
  console.log('App started on port 3000...');
});