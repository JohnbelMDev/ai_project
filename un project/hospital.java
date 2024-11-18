// object2.js
const object1 = require('./object1');

const object2 = {
  ask(name) {
    return `How are you, ${name}?`;
  },
  
  callObject1Method(name) {
    return object1.greet(name);
  }
};

module.exports = object2;


// import { Greeter } from './price.mjs';


// const difference = require('./price.mjs');
// const genome = require('./price.mjs');


// let male = ['G', 'C','A']
// // let 
// // let m = 
// // let humanMAss = 3.3m
// console.log(difference())
// // console.log(genome())