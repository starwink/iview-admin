import fs from 'fs';
import path from 'path'
// import { fileURLToPath } from 'url';
// const __fileName=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__fileName);

function readFileFromDisk(filePath) {
    try {
        return fs.readFileSync(filePath, {encoding: 'utf-8'})
    } catch (e) {
        console.log(e);
        return false
    }
}


// let fileUri= path.join(__dirname,'mark.md')
let fileUri= '/Users/wink/work/project/statics-framework/iview-admin-framework/src/views/markdownEditor/markEditorClass/mark.md'
console.log(fileUri)
// console.log(fileUri)
// console.log(readFileSync(fileUri, 'utf8'))
const data = readFileFromDisk(fileUri);
console.log(data);
// const data = JSON.parse(readFileSync(fileUri, 'utf8'));
//  let data={}
export default '### imy /n `kyeword`';