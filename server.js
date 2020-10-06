const bodyParser = require('body-parser');
const express = require('express');
const fileLogic = require('./CollectFileInformation');
const fs = require('fs');
const paths = require('./paths')
const port = 5000;
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getFile', function(req, res, next) {
    
    const path1 = paths.repos.repo1 + req.query.path
    const path2 = paths.repos.repo2 + req.query.path


        let lines1 = []
        let lines2 = []
        try {
            const data1 = fs.readFileSync(path1,{encoding:'utf8', flag:'r'}); 
            // console.log(data.length); 
            lines1 = data1.split(/\r?\n/)
            // lines1.forEach((line, i )=>{
            //     console.log(i + "|" + line )
            // })
        } catch ( boom ) {
            console.log(boom )
        }
    
        try {
            const data2 = fs.readFileSync(path2,{encoding:'utf8', flag:'r'}); 
            lines2 = data2.split(/\r?\n/)
            // lines2.forEach((line, i )=>{
            //     console.log(i + "|" + line )
            // })
        } catch ( boom ) {
            console.log(boom )
        }
    
        const results = {
            path1:path1,
            lines1:lines1,
            path2:path2,
            lines2:lines2
        }

        res.send(JSON.stringify(results))
})



app.get('/doTest', function(req, res, next) {
    
    const test = {
        msg:"This is a param test ",
        repo1:"repo1: " + req.query.repo1,
        repo2:"repo2: " + req.query.repo2
    }
    res.send(JSON.stringify(test))
})

app.get('/getData', function(req, res) {
    console.log("getData")

    const newRepo = paths.repos.repo1;
    const origRepo = paths.repos.repo2;

    const merged = fileLogic.getFiles(origRepo, newRepo);

    res.send(JSON.stringify(merged))
})


const about = () => `localhost:${port}/test.html\nlocalhost:${port}/view.html\nlocalhost:${port}/examine.html\n`
app.listen(port, () => console.log(about()));