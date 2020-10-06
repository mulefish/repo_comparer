const crypto = require('crypto');
const fs = require('fs');
const path = require("path")

function getHashcode(filename) { 
    let file_buffer = fs.readFileSync(filename);
    let sum = crypto.createHash('sha256');
    sum.update(file_buffer);
    const hex = sum.digest('hex');
    
    return hex; 
    
}

const getFiles = (newRepo, origRepo) => {
    const getAllFiles = function(dirPath, origPath, arrayOfFiles) {
        files = fs.readdirSync(dirPath)
        arrayOfFiles = arrayOfFiles || []

        files.forEach(function(file) {

            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, origPath, arrayOfFiles)
            } else {
                if (file.includes(".js")) {
                    let p = dirPath.replace(origPath, "");
                    let fullpath = path.join(dirPath, "/", file);
                    const stats = fs.statSync(fullpath)
                    // arrayOfFiles.push(fullname)
                    let hex = getHashcode(dirPath + "/" + file); 
                    const obj = {
                        file: file,
                        path: p,
                        bytes: stats['size'],
                        hex:hex
                    }
                    arrayOfFiles.push(obj)
                }
            }
        })
        return arrayOfFiles
    }

    const convert = (L) => {
        // Convert a L to a HoL
        let obj = {};
        L.forEach((item) => {
            const directoryName = item.path;
            if (!obj.hasOwnProperty(directoryName)) {
                obj[directoryName] = []
            }
            obj[directoryName].push(item)
        })
        return obj;
    }

    const data1 = getAllFiles(origRepo, origRepo, [])
    const data2 = getAllFiles(newRepo, newRepo, [])

    const data1Obj = convert(data1);
    const data2Obj = convert(data2);
    const merged = {}
    for (directoryName in data1Obj) {
        let ary = data1Obj[directoryName]
        merged[directoryName] = {}
        ary.forEach((item) => {
            merged[directoryName][item.file] = {
                'data1': true,
                'bytes1': item.bytes,
                'file': item.file,
                'data2': false,
                'bytes2': 0,
                'hex1':item.hex,
                'hex2':0
            }
        })
    }
    for ( directoryName in data2Obj ) {
        let ary = data2Obj[directoryName]

        if ( merged.hasOwnProperty(directoryName)) {
            ary.forEach((item)=>{

                if ( merged[directoryName].hasOwnProperty(item.file)) {
                    merged[directoryName][item.file]['data2'] = true;
                    merged[directoryName][item.file]['bytes2'] = item.bytes;    
                    merged[directoryName][item.file]['hex2'] = item.hex;    
                } else {
                    merged[directoryName][item.file] = {
                        'data1': false,
                        'bytes1': 0,
                        'file': item.file,
                        'data2': true,
                        'bytes2': item.bytes,
                        'hex1':0,
                        'hex2':item.hex
        
                    }
                }
            })
        } else {
            merged[directoryName] = {}
            merged[directoryName][item.file] = {
                'data1': false,
                'bytes1': 0,
                'file': item.file,
                'data2': true,
                'bytes2': item.bytes,
                'hex1': 0,
                'hex2': item.hex
            }
        }
    }
    return merged

}
exports.getFiles = getFiles;
