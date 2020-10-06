const fileLogic = require('./CollectFileInformation');
const paths = require('./paths')
function test_recursive_file_reading() {
    // TODO: Get paths from a config or something
    // const newRepo = "/Users/paul.montgomery/Desktop/<REDACTED>/working/<REDACTED>-admin-client/src/"
    // const origRepo = "/Users/paul.montgomery/Desktop/<REDACTED>/<REDACTED>-admin-client/src/";


    const merged = fileLogic.getFiles(newRepo, origRepo);
    let count = 0; 
    for ( let directoryName in merged ) { 
        //console.log( directoryName )
        for ( file in merged[directoryName ]) {
            let obj = merged[directoryName ][file];
            //console.log( obj )
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
        console.log("PASS test_repo_names with " + repo1 + " and " + repo2 )
    } else {
        console.log("FAIL test_repo_names because " + JSON.stringify(paths, null, 2 ))
    }
}
test_recursive_file_reading()
test_repo_names()