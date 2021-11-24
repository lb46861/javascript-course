'use strict';

/*
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES 5
  //numPassengers = numPassengers || 1;
  //price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000);


const flight = 'LH234';
const lovre = {
  name: 'Lovre B',
  passport: 8591431243,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 8591431243) alert('Checked in');
  else alert('Wrong passport');
};

checkIn(flight, lovre);
// const flightNum = flight;
// const passenger = jonas;
console.log(flight);
console.log(lovre);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(lovre);
checkIn(flight, lovre);
// We are passing the reference TO the function but not BY the function !



const oneWord = function (str) {
  //return str.replaceAll(' ', '').toLowerCase();
  return str.replaceAll(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by function: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// in transformer function we are passing the call back function and then transformer function will call those call back function

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);
// in this example addEventListener is High-Order function and high5 is call-back function

['lovre', 'stipe', 'duje'].forEach(high5);

*/

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const myGreet = greet('Hey');
myGreet('Lovre');
myGreet('Duje ');

greet('Hello')('Duje');

const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Lovre');
