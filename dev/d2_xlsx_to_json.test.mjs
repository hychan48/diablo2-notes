/**
yarn add mocha -D

package.json
  "imports": {
    "##/*": {
      "default": "./*"
    },
  },
  "type": "module",

  jsconfig.json
  {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "##/*": ["./*"]
    }
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}



*/
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const assert = require('assert');
// const {describe,it} = require('mocha');
import assert from 'node:assert';
import { describe, it} from 'mocha';
/*
1.
yarn add mocha @babel/polyfill @babel/register @babel/preset-env babel-plugin-module-resolver --dev
yarn add @babel/core --dev
2.
-r @babel/register -r babel-plugin-module-resolver

3.
.babelrc
{

  "presets": ["@babel/preset-env"],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test",
        "underscore": "lodash",

        "~": "./"
      }
    }]
  ]

}
test specific timeout
this.timeout(500);//500ms
*/
/**
 * Should put this somewhere safe
 * todo filepath needs to be initialized as well...
 * @param fileName .json
 * @param data will automatically be changed
 */
import fs from 'node:fs';
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}

import XLSX from 'xlsx'
describe('socketItems converter', function(){
  it('socketItems to socketItems.json', function(){
    //assert.strictEqual(1,1);//require assert
    let filepath = "static/rawFiles/socketItems.xlsx";
    const wb = XLSX.readFile(filepath);
    const ws_name = "Sheet1";
    const ws = wb.Sheets[ws_name];
    // const rows = XLSX.utils.sheet_to_json(ws);
    const rows = XLSX.utils.sheet_to_json(ws);
    let a = [
      {
        Item: 'Bone Knife',
        'Ilvl 1-25': 1,
        'Ilvl 26-40': 1,
        'Ilvl 41+': 1
      },]
    // console.log(rows);

    fs.writeFileSync("static/rawFiles/socketItems.json",JSON.stringify(rows));
  });
});
describe('areaLevel converter', function(){
  it('areaLevel to socketItems.json', function(){
    //assert.strictEqual(1,1);//require assert
    let filepath = "static/rawFiles/area_level.xlsx";
    const wb = XLSX.readFile(filepath);
    const ws_name = "Sheet1";
    const ws = wb.Sheets[ws_name];
    // const rows = XLSX.utils.sheet_to_json(ws);
    const rows = XLSX.utils.sheet_to_json(ws);
    let a = [{"Act":"Act 1","Normal alvl":1,"Nightmare alvl":36,"Hell alvl":67,"Level Name":"Blood Moor"}]
    // console.log(rows);

    fs.writeFileSync("static/rawFiles/area_level.json",JSON.stringify(rows));
  });
});
