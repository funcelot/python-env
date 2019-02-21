const PythonShell = require('python-shell').PythonShell;
const python = require('python-env').python;
const pip = require('python-env').pip;
const path = require('path');
const fs = require('fs');
const json = { message: "OK" };
var appRouter = function (app) {

  app.get("/health", function (req, res) {
    res.status(200).send({ message: "OK" });

  });

  app.get('/', function (req, res) {
    res.render('html', { title: 'Markdown editor' });
  });

  app.get('/shell', function (req, res) {
    let options = {
      mode: 'text',
      pythonPath: 'c:\\Python37\\python.exe',
      scriptPath: 'c:\\Python37\\Scripts',
      args: ['-o', path.join(__dirname, 'files', 'output.xml'), path.join(__dirname, 'files', 'input.pdf')]
      //args: ['-t', 'xml', path.join(__dirname, 'files', 'input.pdf')]
    };
    function pdf2txt() {
      return new Promise((resolve, reject) => {
        PythonShell.run('pdf2txt.py', options, (err, output) => {
           if (err) 
             reject(err);
           else
           {
             let data = fs.readFileSync(path.join(__dirname, 'files', 'output.xml'), 'utf8');
             resolve(data);
           }
        });
      });
    }
    pdf2txt().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(400).send(err);
    });
  });

  app.get('/env', function (req, res) {
    function pdf2txt() {
      return new Promise((resolve, reject) => {
        async function main() {
          await pip(['install', '-r', 'requirements.txt']);
          const out = process.stdout;
          await python([path.join(__dirname,'pdf2txt.py'),'-o', path.join(__dirname, 'files', 'output.html'), path.join(__dirname, 'files', 'input.pdf')]);
          const data = out.read();
          resolve(data);
        }
        main();
      });
    }
    pdf2txt().then(data => {
      res.send(data);
    }).catch(err => {
      res.status(400).send(err);
    });
  });
}

module.exports = appRouter;