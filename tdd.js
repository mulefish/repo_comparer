const fileLogic = require('./CollectFileInformation');

function test_recursive_file_reading() {
    // TODO: Get paths from a config or something
    // const newRepo = "/Users/paul.montgomery/Desktop/<REDACTED>/working/<REDACTED>-admin-client/src/"
    // const origRepo = "/Users/paul.montgomery/Desktop/<REDACTED>/<REDACTED>-admin-client/src/";

    const newRepo = "/Users/paul.montgomery/Desktop/maritz/working/maritz-admin-client/src/"
    const origRepo = "/Users/paul.montgomery/Desktop/maritz/maritz-admin-client/src/";

    const merged = fileLogic.getFiles(newRepo, origRepo);
    let count = 0; 
    for ( let directoryName in merged ) { 
        console.log( directoryName )
        for ( file in merged[directoryName ]) {
            let obj = merged[directoryName ][file];
            console.log( obj )
            count++; 
        }
    }

    if ( count > 0 ){ 
        console.log("PASS with " + count )
    } else {
        console.log("F!AIL with " + count )
    }
}
test_recursive_file_reading()