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

];
export const classWeapons = [

];

export const shields = [];

export const chestArmors = [];
export const helmArmors = [];

describe('Convert format to nuxt/$content', function(){

  it('asdf', function(){
    //assert.strictEqual(1,1);//require assert
  });
});
