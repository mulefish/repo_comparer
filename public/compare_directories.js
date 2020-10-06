function getFile(path) {

    const url = `http://localhost:5000/getFile?path=${path}`
    sendGet(url).then(data => {

        left_seen = {}
        left_ary = []
        doFileCompare(data['lines1'], "leftFile", left_seen, left_ary)

        right_seen = {}
        right_ary = []
        doFileCompare(data['lines2'], "rightFile", right_seen,right_ary)


        doCompare()

    }); 
}

function getData(winnow=false) { 
    const url = 'http://localhost:5000/getData'
    sendGet(url).then(data => {
        table = "<table border='1'>"
        table += "<tr><th>bytes1</th><th>bytes2</th><th>name</th></tr>"
        
        for ( let directoryName in data ) {

            let entry = `<tr><td>dir</td><td colspan='2'>${directoryName}</td></tr>`
            let useThisEntry = false; 
            for ( file in data[directoryName ]) {
                const obj = data[directoryName ][file];

                let css = "matched"; 
                if ( obj.hex1 !== obj.hex2 ){
                    css = "different"
                }

                if ( obj.hex1 !== obj.hex2 || winnow == false ) {
                    let row = `<tr class='${css}'>`;
                    row += "<td>" + obj.bytes1 + "</td>";
                    row += "<td>" + obj.bytes2 + "</td>";
                    row += `<td><a href='#' onClick=getFile('${directoryName}/${obj.file}')>${obj.file}</a></td>`;
                    row += "</tr>";
                    entry += row;
                    useThisEntry = true; 
                }
            }
            if ( winnow == true) {
                if ( useThisEntry == true ) {
                    table += entry;
                }
            } else {
                table += entry;
            }
        }
        table += "</table>";
        document.getElementById("context").innerHTML = table;
    }); 
}