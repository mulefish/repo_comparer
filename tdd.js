const fs = require('fs');
const fileLogic = require('./CollectFileInformation');
const paths = require('./paths');
const readline = require('readline'); 
function test_recursive_file_reading() {
    const newRepo = paths.repos.repo1;
    const origRepo = paths.repos.repo2;
    const merged = fileLogic.getFiles(newRepo, origRepo);
    let count = 0; 
    for ( let directoryName in merged ) { 
        for ( file in merged[directoryName ]) {
            let obj = merged[directoryName ][file];
            count++; 
        }
    }

    if ( count > 0 ){ 
        console.log("PASS test_recursive_file_reading finding " + count )
    } else {
        console.log("FAIL test_recursive_file_reading " )
    }
}

function test_repo_names() {

    const repo1 = paths.repos.repo1;
    const repo2 = paths.repos.repo2;

    if ( repo1 && repo2 ) {
        console.log("PASS test_repo_names ") // with " + repo1 + " and " + repo2 )
    } else {
        console.log("FAIL test_repo_names because " + JSON.stringify(paths, null, 2 ))
    }
}

function test_read_file() {
    let lines1 = []
    let lines2 = []
    try {
        const path1 = paths.repos.repo1 + "/common/Components/ClearAccordian/ClearAccordian.jsx"   
        const data1 = fs.readFileSync(path1,{encoding:'utf8', flag:'r'}); 
        lines1 = data1.split(/\r?\n/)
    } catch ( boom ) {
        console.log(boom )
    }

    try {
        const path2 = paths.repos.repo2 + "/common/Components/ClearAccordian/ClearAccordian.jsx"   
        const data2 = fs.readFileSync(path2,{encoding:'utf8', flag:'r'}); 
        lines2 = data2.split(/\r?\n/)
    } catch ( boom ) {
        console.log(boom )
    }

    // console.log( lines1.length + " anad two is " + lines2.length )
    if ( lines1.length > 0 && lines2.length > 0 ) {
        console.log("PASS test_read_file ( lines1 is " + lines1.length )
    } else {
        console.log("FAIL test_read_file")
    }
}

test_recursive_file_reading()
test_repo_names()
test_read_file()