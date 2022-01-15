'use strict';

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this, instead we will use prototypes and prototype inheritance, with this if we have 1000 objects function will be copied 1000 times
  //   this.calcAge = function () {
  //     console.log(2022 - this.birthYear);
  //   };
};

// We call Constructor with NEW keyword
const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} empty object is created
// 2. function is called, this keyword is set to new empty object {}
// 3. {} is linked to a prototype
// 4. function automatically returns object

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1999);
console.log(matilda, jack);

const jay = 'Jay';

console.log(jonas instanceof Person);
console.log(jay instanceof Person);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// Person.prototype is prototype of jonas, matilda, jack
// Person.prototype is not prototype of Person
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// .prototypeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('species')); // Gives false because its in the prototype property of person, not directly on the object, Person doesnt have its OWN property for species
console.log(jonas.hasOwnProperty('firstName'));
