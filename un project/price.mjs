
// object1.js
const object2 = require('./object2');

const object1 = {
  greet(name) {
    return `Hello, ${name}!`;
  },
  
  callObject2Method(name) {
    return object2.ask(name);
  }
};

module.exports = object1;


// export function Price {

//   difference() {
//   console.log("jjjj")
//     return Math.abs(Math.max());
//   }

//    genome() {
//     console.log('Hif')
      
//     }

//   } 
 