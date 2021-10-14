// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const assert = require('assert');
// const {describe,it} = require('mocha');
import assert from 'assert';
import { describe, it} from 'mocha';
/*
npm install esm --save-dev
npm install module-alias --save-dev
npm i esm module-alias mocha --save-dev
  "_moduleAliases": {
    "@":"."
  }
-r esm -r module-alias/register

test specific timeout
this.timeout(500);//500ms


http://www.theamazonbasin.com/wiki/index.php?title=Enchant
*/
const XLSX = require('xlsx');
function exportToExcel(data,header,filename="out.xlsx"){
  const wb = XLSX.utils.book_new();
  const ws_name = "sheet1";

  //Full dump. probably want to do something special and or maybe add filteres
  const ws = XLSX.utils.json_to_sheet(
    data,
    {header},
    // ,{header:["S","h","e","e_1","t","J","S_1"]}
  );


  XLSX.utils.book_append_sheet(wb, ws, ws_name);
  XLSX.writeFile(wb, filename);
}
const EnchantData = {
  "skill": "Enchant",
  "charclass": "sor",
  "skilldesc": "enchant",
  "anim": "SC",
  "monanim": "xx",
  "auralencalc": "ln12",
  "aurastat1": "firemindam",
  "aurastat2": "firemaxdam",
  "aurastat3": "item_tohit_percent",
  "aurastatcalc1": "enma",
  "aurastatcalc2": "exma",
  "aurastatcalc3": "toht",
  "etype": "fire",
  "edmgsympercalc": "(skill('Warmth'.blvl))*par8",
  "id": 52,
  "reqlevel": 18,
  "maxlvl": 20,
  "reqskill1": 37,
  "reqskill2": 47,
  "minmana": 1,
  "manashift": 8,
  "mana": 25,
  "lvlmana": 1,
  "aurastate": 16,
  "param1": 3600,
  "param2": 600,
  "param3": 33,
  "param8": 9,
  "tohit": 20,
  "levtohit": 9,
  "hitshift": 7,
  "emin": 16,
  "eminlev1": 3,
  "eminlev2": 7,
  "eminlev3": 11,
  "eminlev4": 15,
  "eminlev5": 19,
  "emax": 20,
  "emaxlev1": 5,
  "emaxlev2": 9,
  "emaxlev3": 13,
  "emaxlev4": 17,
  "emaxlev5": 21,
  "costmult": 640,
  "costadd": 16000,
  "srvdofunc": 25,
  "enhanceable": 1
};

/**
 *  Enchant
 * https://www.theamazonbasin.com/wiki/index.php?title=Enchant
 */
// const EnchantMinMulti = [1.5,3.5,5.5,7.5,9.5];
// const EnchantMinC = [6.5, -9.5, -41.5, -85.5, -141.5];

/**
 *  cold bolt
 *  https://www.theamazonbasin.com/wiki/index.php?title=Ice_Bolt
 *
 *  */
// const EnchantMinMulti = [1,2,3,4,5];
// const EnchantMinC = [2, -6, -22, -44, -72];//ice bolt

/**
 * Fire bolt
 */
const EnchantMinMulti = [1.5,2,4,9,27];
const EnchantMinC = [1.5, -2.5, -34.5, -144.5, -648.5];//ice bolt

//hard coded breakpoitns
const Breakpoints = [
  [1,8], //1
  [9,16],//2
  [17,22],//3
  [23,28],//4
  [29,99]//5
];


describe('Sorc Enchant', function(){
  /**
   *
   */
  it('parseIntoArray', function(){
    return true;
    const input = EnchantData;
    const minMulti = [];
    for (let i = 1; i <= 5; i++) {
      const key = `eminlev${i}`;
      minMulti.push(input[key] / 2);
    }

    EnchantMinMulti.forEach((val,i) =>{
      assert.strictEqual(minMulti[i],val)
    })
  });

  it('Find the algorithm for c', function(){
    const N = 7;
    // ranges are weird for sure 8,8,5,5,99 - 28


    const i = 3;
    const val = EnchantMinC[i];
    const tmp = (EnchantData.emin / 2 ) - ( (i + 1) * EnchantMinMulti[i])
    assert.strictEqual(tmp, val)

  });
  it('Full Test algorithm for c', function(){


    const firstEle = EnchantMinC[0];
    // console.log(EnchantMinC.length);
    for (let i = 1; i < EnchantMinC.length; i++) {
      const val = EnchantMinC[i];
      // console.log(val);
      // const tmp = (EnchantData.emin / 2 ) - (EnchantMinMulti[i])
      const a15 =  EnchantMinMulti[i]
      const aC = val;
      const tmp = aC - firstEle
      // console.log(tmp, i, tmp  / Math.pow(2,i));
      // console.log(tmp, i, tmp  / Math.pow(2,EnchantMinMulti[i]));
      console.log(tmp, i, tmp  / EnchantMinMulti[i]);
      // console.log('a15',a15);
      // console.log('aC',aC);
      // assert.strictEqual(tmp, val)
    }
  });

  it('Graph Enchant data for level', function(){
    return true;
    /**
     * i is the index multipelr
     * j is the level
     * @type {*[]}
     */
    const aOut = [];//not a buffer cuz lazy
    for (let i = 0; i < Breakpoints.length; i++) {
      const ranges = Breakpoints[i];
      const [start, end] = ranges;
      for (let j = start; j <= end; j++) {
        const minDmg = EnchantMinMulti[i] * j + EnchantMinC[i];
        aOut.push({
          lvl:j,
          minDmg
        })
      }
    }

    /* make xlsx */
    exportToExcel(aOut,null,'dev/enchantMinDmg.xlsx')



  });
});
