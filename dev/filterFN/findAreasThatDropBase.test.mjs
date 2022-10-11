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

/**
 * Refactor later
 */
let d2DataRaw = JSON.parse(fs.readFileSync("static/s_content/d2_data_raw.json"));
let areaLevel = JSON.parse(fs.readFileSync("static/rawFiles/area_level.json"));

let {armor,misc,weapons,uniqueItems} = d2DataRaw;
// import * as _ from 'lodash'
import _ from 'lodash'
describe('findAreasThatDropBase', function(){
  it('findAreasThatDropBase - armor', function(){
    //assert.strictEqual(1,1);//require assert

    // console.log(d2DataRaw);
    // console.log(armor);
    let aArmorValues = Object.values(armor);
    // for (let i = 0; i < aArmorValues.length; i++) {
    //   const row = aArmorValues[i];
    //   const {name,type,level,cost} = row;
    //
    // }

    let out;
    // out = _.find(aArmorValues, function(o) { return o.age < 40; });
    let strToFind = 'monarch';
    //find one or filter?
    // out = _.filter(aArmorValues, function(o) {
    out = _.find(aArmorValues, function(o) {
      // return o.name < 40;
      const oReg = new RegExp(`${strToFind}`,"i")
      let bMatched = oReg.test(o.name);
      // console.log(o.name,bMatched);
      return bMatched;
    });
    // console.log(out);
    /* 2. find areas */
    const {level} = out;
    // {"Act":"Act 1","Normal alvl":1,"Nightmare alvl":36,"Hell alvl":67,"Level Name":"Blood Moor"}
    out = _.filter(areaLevel, function(o) {
      // return o.name < 40;
      const values = Object.values(o)
      const [act,a,b,c,location] = values;
      let bMatched = level <= a || level <= b || level <= c
      return bMatched;
    });
    // console.log(out);
    console.log(out.map(val => val["Level Name"]));

    //list of where level is greater than from area_level

  });

});
