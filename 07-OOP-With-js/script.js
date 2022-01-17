'use strict';

/*
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

console.log(jonas.__proto__);
console.log(Person.prototype);
// Object.prototype (top of the prototype chain)
console.log(jonas.__proto__.__proto__);
// null
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3, 6, 9]; // new Array === [];
console.log(arr.__proto__);
console.log(arr.__proto__ == Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

*/

// Coding challenge #1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 115);
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
