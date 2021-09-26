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

export const weapons = [
'Axes',
'Bows',
'Crossbows',
'Daggers',
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
function readXLSX(filepath='~/static/rawFiles/socketItems.xlsx'){
  const wb = XLSX.readFile(filepath);
  const ws_name = "sheet1";
  const ws = wb.Sheets[ws_name];
  const rows = XLSX.utils.sheet_to_json(ws);
}
describe('Convert format to nuxt/$content', function(){

  it('Read xlsx file first', async function(){
    //assert.strictEqual(1,1);//require assert
    // const oData = await readXLSX();
    // console.log(oData);


  });
});
