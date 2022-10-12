let cap = {  "cap":
    {
      "name": "Cap/hat",
      "code": "cap",
      "namestr": "cap",
      "normcode": "cap",
      "ubercode": "xap",
      "ultracode": "uap",
      "invfile": "invcap",
      "uniqueinvfile": "invcapu",
      "setinvfile": "invcapu",
      "type": "helm",
      "spawnable": 1,
      "version": 0,
      "minac": 3,
      "maxac": 5,
      "speed": 0,
      "reqstr": 0,
      "block": 0,
      "durability": 12,
      "nodurability": 0,
      "level": 1,
      "levelreq": 0,
      "cost": 64,
      "bitfield1": 1,
      "invwidth": 2,
      "invheight": 2,
      "hasinv": 1,
      "gemsockets": 2,
      "gemapplytype": 1,
      "unique": 0,
      "belt": 0,
      "mindam": 0,
      "maxdam": 0,
      "invtrans": 8,
      "skipname": 0,
      "hd": "helmet/cap_hat"
    },}

let nCap = {  "xap":
    {
      "name": "War Hat",
      "code": "xap",
      "namestr": "xap",
      "normcode": "cap",
      "ubercode": "xap",
      "ultracode": "uap",
      "invfile": "invcap",
      "type": "helm",
      "spawnable": 1,
      "version": 0,
      "minac": 45,
      "maxac": 53,
      "speed": 0,
      "reqstr": 20,
      "block": 0,
      "durability": 12,
      "nodurability": 0,
      "level": 34,
      "levelreq": 22,
      "cost": 13560,
      "bitfield1": 1,
      "invwidth": 2,
      "invheight": 2,
      "hasinv": 1,
      "gemsockets": 2,
      "gemapplytype": 1,
      "unique": 0,
      "belt": 0,
      "mindam": 0,
      "maxdam": 0,
      "invtrans": 8,
      "skipname": 0,
      "hd": "helmet/cap_hat"
    },}

let hCap = {  "uap":
    {
      "name": "Shako",
      "code": "uap",
      "namestr": "uap",
      "normcode": "cap",
      "ubercode": "xap",
      "ultracode": "uap",
      "invfile": "invcap",
      "type": "helm",
      "spawnable": 1,
      "version": 100,
      "minac": 98,
      "maxac": 141,
      "speed": 0,
      "reqstr": 50,
      "block": 0,
      "durability": 12,
      "nodurability": 0,
      "level": 58,
      "levelreq": 43,
      "cost": 56307,
      "bitfield1": 1,
      "invwidth": 2,
      "invheight": 2,
      "hasinv": 1,
      "gemsockets": 2,
      "gemapplytype": 1,
      "unique": 0,
      "belt": 0,
      "mindam": 0,
      "maxdam": 0,
      "invtrans": 8,
      "skipname": 0,
      "hd": "helmet/cap_hat"
    },}
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
import XLSX from 'xlsx'
function writeToFile(fileName,data,space=2){
  const sFileName = /\./.test(fileName) ? fileName : fileName + '.json';
  const filePath = `dev/pbs/test/${sFileName}`
  fs.writeFileSync(filePath,
    typeof data === 'string' ? data :JSON.stringify(data,null,+space)
  );
}
let d2DataRaw = JSON.parse(fs.readFileSync("static/s_content/d2_data_raw.json"));
let {armor,misc,weapons,uniqueItems} = d2DataRaw;
import _ from "lodash"
describe('findNormExElite', function(){
  it('create excel armor', function(){
    //assert.strictEqual(1,1);//require assert
    //            "hd": "helmet/mask"
    let out;
    out = _.groupBy(Object.values(armor),"hd")

    const oGroupedByValues = Object.values(out);
    let oSheet = [];
    for (let i = 0; i < oGroupedByValues.length; i++) {
      const row = oGroupedByValues[i];
      try{
        assert.strictEqual(row.length, 3);
        //assume sorted
        const normal=row[0].name,
          type=row[0].hd.split('/')[0],
        exceptional=row[1].name,
        elite=row[2].name;

        oSheet.push(
          // normal,exceptional,elite,type
          {normal, exceptional, elite, type}

        )

      }catch (e) {
        /**
         * Circlets are weird. ignoring for now
         * https://diablo-archive.fandom.com/wiki/Circlets_(Diablo_II)#:~:text=The%20Circlet%20is%20equivalent%20to,circlets%20when%20they%20are%20dropped.
         */
        if(row[0]?.type !== 'circ'){
          console.error(row)
        }
      }
    }
    // console.log(oSheet);

    const ws = XLSX.utils.json_to_sheet(oSheet)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "static/rawFiles/armor_by_quality_and_type.xlsx");

    // console.log(out);
  });

  it('create excel weapon', function(){
    //assert.strictEqual(1,1);//require assert
    //            "hd": "helmet/mask"
    let out;
    out = _.groupBy(Object.values(weapons),"hd")

    const oGroupedByValues = Object.values(out);
    let oSheet = [];
    for (let i = 0; i < oGroupedByValues.length; i++) {
      const row = oGroupedByValues[i];
      try{
        assert.strictEqual(row.length, 3);
        //assume sorted
        const normal=row[0].name,
          type=row[0].hd.split('/')[0],
          exceptional=row[1].name,
          elite=row[2].name;

        oSheet.push(
          // normal,exceptional,elite,type
          {normal, exceptional, elite, type}

        )

      }catch (e) {
        /**
         * type tpot
         */
        if(row[0]?.type !== 'tpot'){

        }
        else if(row[0]?.unique !== 1){

        }
        else{
          console.error(row)
        }
      }
    }
    // console.log(oSheet);

    const ws = XLSX.utils.json_to_sheet(oSheet)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "static/rawFiles/weapon_by_quality_and_type.xlsx");

    // console.log(out);
  });
});
