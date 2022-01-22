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

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};
Person.hey();
// jonas.hey();

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

// ES6 CLasses

// class expresssion
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // All methods that are writen outisde of the constructor will be in prototype of the object and not on the object themsleve

  // Instance methods
  // Methods will be added to .prototype property which are prototypes of objects created by this class
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1999);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype);

console.log(PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. CLasses are NOT hoisted
// 2. CLasses are first-class citites, just like functions, we can cast them into functions and also return them from the functions
// 3. The body of the classes is always executed in STRICT mode

const walter = new PersonCl('Walter White', 1998);

PersonCl.hey();

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 1999;
console.log(steven);
steven.calcAge();

console.log(steven.__proto__);
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2000);
sarah.calcAge();

// Coding Challenge #2

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const bmwCl = new CarCl('bmw', 120);
console.log(bmwCl);
bmwCl.accelerate();
bmwCl.accelerate();
bmwCl.brake();
bmwCl.speedUS = 50;
console.log(bmwCl);
console.log(bmwCl.speedUS);



const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);



// Coding challenge #3

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
console.log(bmw);

const EV = function (make, speed, battery) {
  Car.call(this, make, speed);
  this.battery = battery;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.battery = chargeTo;
};

// Child class can overwrite method that it enherited from parent class
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.battery -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.battery}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();

tesla.accelerate();

EV.prototype.constructor = EV;
console.log(EV.prototype.constructor);

 */

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // All methods that are writen outisde of the constructor will be in prototype of the object and not on the object themsleve

  // Instance methods
  // Methods will be added to .prototype property which are prototypes of objects created by this class
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  // If we dont have any new members for StudentCl we do not need a constructor but in this case we are adding "course"
  constructor(fullName, birthYear, course) {
    // super Always needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(`I'm ${2022 - this.birthYear} years old student.`);
  }
}

const Martha = new StudentCl('Martha Jones', 2005, 'Computer Science');
Martha.introduce();
Martha.calcAge();
