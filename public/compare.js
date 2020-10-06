let left_seen = {}
let right_seen = {}
let left_ary = []
let right_ary = []
let loaded = 0

function doFileCompare(lines, whichSide, map, ary) {

    lines.forEach((line) => {
        line = line.trim()
        if (map.hasOwnProperty(line)) {
            map[line]++
        } else {
            map[line] = 1
        }
        ary.push(line)
    })
}

function doCompare() {

    // left side
    let l_table = "<table>"
    left_ary.forEach((line, i) => {
        let css = "onlyLeft"
        if (right_seen.hasOwnProperty(line)) {
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
    right_ary.forEach((line, i) => {
        let css = "onlyRight"
        if (left_seen.hasOwnProperty(line)) {
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