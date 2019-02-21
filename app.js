//const spdy = require('spdy');
//const fs = require('fs');
const port = 5003;
const express = require('express');
const express_hbs = require('express-handlebars');
const hbs = require("hbs");
const api = require('./api');
const app = express();
const os = require('os');
const path = require('path');

api(app);

app.use(express.static(path.join(__dirname, '/public')));

app.engine('hbs', express_hbs({
  defaultLayout: 'app',
  extname: 'hbs'
}));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.set('view engine', 'hbs');
app.enable('view cache');

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Host', os.hostname());
  next();
});

app.listen(port, function () {
  console.log('Vue.js app listening on port ' + port + '!')
});

/*
const options = {
  cert: fs.readFileSync(path.join(__dirname, '/cert/server.crt')),
  key:  fs.readFileSync(path.join(__dirname, '/cert/server.key')),
  ca:  fs.readFileSync(path.join(__dirname, '/cert/server.csr')),
};

spdy
  .createServer(options, app)
  .listen(port, (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log('Vue.js app listening on port ' + port + '!');
  });
*/