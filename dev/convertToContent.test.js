// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const assert = require('assert');
// const {describe,it} = require('mocha');
import assert from 'assert';
// import { describe, it} from 'mocha';

import {describe,it} from "mocha";


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
*/


/**
 * SocketItem.xlsx - append weapon / armor type to the file
 *
 * might want to find the unmappable ones first..
 *
 * https://diablo2.diablowiki.net/Sockets
 *
 * only chest, helm, shield and weapons
 *
 */

//need to change the name to singular case...
export const weapons = [
'Axes',
'Bows',
'Crossbows',
'Daggers',//Knife?
'Javelins',
'Maces',
'Polearms',
'Scepters',
'Spears',
'Staves',
'Swords',
'Throwing',
'Wands'
];
/**
 *  generated by code. then modifed manually
 *  stave.. is staff. and dagger is knife? or is it both
 *
 *  Throwing no rune world, jave / spear do though
 *
 *  */
export const singularWeapons = [
  "Axe","Bow","Crossbow","Dagger",
  // "Javelin",
  "Mace","Polearm","Scepter","Spear",
  // "Stave"
  "Staff"
  ,"Sword"
  // ,"Throwing"
  ,"Wand"
];




export const classWeapons = [
// • Ama Weapons
'Claws',
// Helms,//barb
// • Druid Helms
// • Necro Totems, //heads
// • Pal Shields
// 'orbs',• Sorc Orbs
];

export const shields = [];//should be straight forward?

export const chestArmors = [];//chest?
export const helmArmors = [];//helm / head? it shouldnt matter i guess?

const XLSX = require('xlsx');
import path from 'path';
import pluralize from 'pluralize';
function readXLSX(filepath=path.resolve('static/rawFiles/socketItems.xlsx')){
// function readXLSX(filepath='~/static/rawFiles/socketItems.xlsx'){
  const wb = XLSX.readFile(filepath);
  const ws_name = "Sheet1";
  const ws = wb.Sheets[ws_name];
  const rows = XLSX.utils.sheet_to_json(ws);
  return rows;
}

const _ = require('lodash');

import fs from 'fs'
// const {ERR_GSC} = require(path.resolve("server/dev/GatherSysConfig/constants.js"));
describe('Convert format to nuxt/$content', function(){

  let socketItemXLSXJSON;
  let itemNames;//item names only... i.e. 'Bone Knife'
  it('Read xlsx file first', function(){
    //assert.strictEqual(1,1);//require assert
    // const oData = await readXLSX();
    // console.log(oData);
    const aOData = readXLSX();
    socketItemXLSXJSON = aOData;

  });
  it('generate singular weapons array',function(){
    return true;
    // const single = pluralize.singular('singles') //=> "singular"
    // console.log(single);
    const singular = weapons.map(plural =>{
      return pluralize.singular(plural);
    });
    console.log(JSON.stringify(singular));
  })
  /**
   * Return a list that is not used
   *
   * which in weapons is not used?
   */
  it('check which singular weapon isnt used', function(){
    itemNames = socketItemXLSXJSON.map(val => val.Item);
    // console.log(itemNames);
    //['Bone Knife']

    /**
     * Bubble sort test
     * raw as in it shows null
     */
    const usedWeaponsRaw = singularWeapons.map(singularWeapon =>{
      for (let i = 0; i < itemNames.length; i++) {
        // const itemName = itemNames[i];
        const itemName = itemNames[i];

        const oRegex = new RegExp(singularWeapon,'i')
        /* found. ie.e /Axe/i.test(something axe) */
        if(oRegex.test(itemName)){
          // console.log(singularWeapon);
          return singularWeapon;
        }
      }

    });

    const usedWeapons = usedWeaponsRaw.filter(val => val);
    const notUsedWeapons =
      _.differenceWith(singularWeapons, usedWeapons, _.isEqual);

    console.log(notUsedWeapons);
    //[ 'Javelin', 'Polearm', 'Stave', 'Throwing' ]
    // console.log('length difference', weapons.length - notUsedWeapons.length );
    assert.strictEqual(singularWeapons.length - usedWeaponsRaw.length, 0)
    // assert.strictEqual(notUsedWeapons.length, 4);
    /**
     * stave to staff
     * removed throwing, jav
     *
     * this might not be the best idea... might be better just to get each weapon and map it
     *
     */
    assert.strictEqual(notUsedWeapons.length, 3);




  })
});

const D2DataRaw = require(path.resolve('static/s_content/d2_data_raw.json'))
const FILEOUT_PATH = 'content/d2_data_content.json'
describe('Convert d2_data_raw.json for nuxt/$content', function(){
  let oOut;

  /**
   * smaller sample size
   * i want
   *
   * from weapons:{
   *   hax:{
   *     name,type,etc...
   *   }
   * };
   * to ...[id, than used computed?
   *
   * content is
   * title,
   *
   * oh right.. it caches
   */
  it('Generate only weapons first',function(){
    const {weapons} = D2DataRaw;
    // oOut = weapons;//og
    //want slug as id i think
    //then replace oOut.
    //so for each key.
    oOut = [];
    const tmp = Object.entries(weapons);
    // console.log(tmp[0]);

    oOut = tmp.map(([key,value])=>{
      // console.log(key,value);
      //or just change slug to code... in this instance
      return {
        slug:key,//should append the parent's name...
        //i think it's same as code
        // ...value,

        title:'tsup',
        description:'dsup',
        // html:"<br/>"


      }

    });

    console.log(oOut.length);





  });

  it('finally writes to file',function(){
    fs.writeFileSync(FILEOUT_PATH,
      JSON.stringify(oOut))
  });

});


