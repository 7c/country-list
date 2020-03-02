var recursive = require("recursive-readdir");
var path = require('path')
var fs = require('fs')
var dataFolder = path.join(__dirname,"../data")
var targetFolder = path.join(__dirname,"../deploy")

recursive(dataFolder, function (err, files) {
    var cnt = 0
    for(var file of files)
    {
        if (file.search(/country.json$/)<0) continue
        var m = file.match(/data\/(.*)\/country.json/)
        if (m.length==2) {
            var lang = m[1]
            fs.writeFileSync(path.join(targetFolder,lang+'.json'),fs.readFileSync(file,'utf8'))
            cnt++
        } else {
            console.log(`Cannot parse language from ${file}, what is wrong`)
            process.exit(1)
        }
    }
    console.log(`Processed ${cnt} files into ${targetFolder}`)
})