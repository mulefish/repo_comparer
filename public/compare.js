let left_seen = {}
        let right_seen = {} 
        let left_ary = []
        let right_ary = [] 
        let loaded = 0 
        function doFileCompare(lines, whichSide, map, ary) {
            // var rawFile = new XMLHttpRequest(); // Hrm, seems that this is depreciated.
            // rawFile.open("GET", fileName, false);
            // rawFile.onreadystatechange = function() {
            //     if (rawFile.readyState === 4) {
            //         if (rawFile.status === 200 || rawFile.status == 0) {
            //             let x = rawFile.responseText;
            //             let lines = x.split(/\r?\n/)

                        lines.forEach((line) => {
                            line = line.trim()
                            if (map.hasOwnProperty(line)) {
                                map[line]++
                            } else {
                                map[line] = 1
                            }
                            ary.push(line)
                        })
        //         }
        //     }
        //     rawFile.send(null);
        }
        function doCompare() { 

            // left side
            let l_table = "<table>"
            left_ary.forEach((line, i)=> { 
                let css = "onlyLeft"
                if ( right_seen.hasOwnProperty(line)) {
                    css = "same"
                }
                line = line.split('  ').join('&nbsp;&nbsp');
                let num = "<td><div class=num>" + i + "&nbsp;&nbsp;</div></td>"
                let l = "<td><code class='" + css + "'>" + line + "  </code></td>"
                let row = "<tr>" + num + l + "</tr>"
                l_table += row
            })
            console.log(l_table)
            document.getElementById("leftFile").innerHTML = l_table

            // right side
            let r_table = "<table>"
            right_ary.forEach((line, i)=> { 
                let css = "onlyRight"
                if ( left_seen.hasOwnProperty(line)) {
                    css = "same"
                }
                line = line.split('  ').join('&nbsp;&nbsp');
                let num = "<td><div class=num>" + i + "&nbsp;&nbsp;</div></td>"
                let l = "<td><code class='" + css + "'>" + line + "  </code></td>"
                let row = "<tr>" + num + l + "</tr>"
                r_table += row
            })
            document.getElementById("rightFile").innerHTML = r_table

        }