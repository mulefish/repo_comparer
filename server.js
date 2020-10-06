const express = require('express');
const fileLogic = require('./CollectFileInformation');
///
const app = express();
const path = require("path")
const port = 5000;
app.use(express.static('public'));

app.get('/doTest', function(req, res) {
    const test = {
        msg:"This is a test.."
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