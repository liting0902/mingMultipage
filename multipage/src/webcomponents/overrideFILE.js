const fs = require('fs')
const path = require('path')

let fileName = 'loginElement.htm'
let srcPath = path.join(__dirname, fileName);
let toPath = path.join(__dirname, '../../dist/webcomponents/',fileName);
let content = fs.readFileSync(srcPath,"utf8");
//console.log(content)
fs.writeFileSync(toPath,content);