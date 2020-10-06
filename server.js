const bodyParser = require('body-parser');
const express = require('express');
const fileLogic = require('./CollectFileInformation');
const app = express();
const port = 5000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/doTest', function(req, res, next) {
    
    const test = {
        msg:"This is a test!!!query!!",
        repo1:"repo1: " + req.query.repo1,
        repo2:"repo2: " + req.query.repo2
    }
    res.send(JSON.stringify(test))
})

app.get('/getData', function(req, res) {
    console.log("getData")

    // const newRepo = "/Users/paul.montgomery/Desktop/<REDACTED>/working/<REDACTED>-admin-client/src/"
    // const origRepo = "/Users/paul.montgomery/Desktop/<REDACTED>/<REDACTED>-admin-client/src/";

    const merged = fileLogic.getFiles(origRepo, newRepo);

    res.send(JSON.stringify(merged))
})


const about = () => `localhost:${port}/test.html\nlocalhost:${port}/view.html\n`
app.listen(port, () => console.log(about()));