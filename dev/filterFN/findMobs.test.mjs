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
let {monsters,monstersEx,monLvl,monType,monProp,superUniques} = d2DataRaw;
// import * as _ from 'lodash'
import _ from 'lodash'
describe('findMobs.test.mjs', function(){
  it('findMobs.test.mjs - fire', function(){
    //assert.strictEqual(1,1);//require assert

    // console.log(d2DataRaw);
    // console.log(armor);
    // console.log(monsters);
    const cow = {            "resdmn": 33,
      "resman": 15,//magic
      "resfin": 25,//fire
      "reslin": 25,//light
      "rescon": 25,//cold
      "respon": 25,//poi
      "resdmh": 50,//phy
      "resmah": 33,
      "resfih": 50,
      "reslih": 50,
      "rescoh": 50,
      "respoh": 33,
      "levelh":81,
      "namestr": "Hell Bovine",
    }
    let aMonsters = Object.values(monsters);
    // for (let i = 0; i < aArmorValues.length; i++) {
    //   const row = aArmorValues[i];
    //   const {name,type,level,cost} = row;
    //
    // }

    let out;
    out = _.filter(aMonsters, function(o) {
      return o.resfih <= 0;
    });

    console.log(out.map(val => val.namestr));

  });

});
