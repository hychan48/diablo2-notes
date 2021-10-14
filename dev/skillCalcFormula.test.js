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

const EnchantMinMulti = [1.5,3.5,5.5,7.5,9.5];
const EnchantMinC = [6.5, -9.5, -41.5, -85.5, -141.5]


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
    const Breakpoints = [8, 16,22,28,29]

    const i = 3;
    const val = EnchantMinC[i];
    const tmp = (EnchantData.emin / 2 ) - ( (i + 1) * EnchantMinMulti[i])
    assert.strictEqual(tmp, val)

  });
  it('Full Test algorithm for c', function(){


    EnchantMinC.forEach((val,i)=>{
      const tmp = (EnchantData.emin / 2 ) - (EnchantMinMulti[i])
      assert.strictEqual(tmp, val)
    });



  });



});
