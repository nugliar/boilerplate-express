var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
})

app.route('/:word/echo')
  .get((req, res) => {
    res.send({echo: req.params.word})
  })

app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  })

app.route('/json')
  .get((req, res) => {
    res.json({message: process.env.MESSAGE_STYLE === 'uppercase' ?
      "HELLO JSON" :
      "Hello json"})
  })

module.exports = app;
