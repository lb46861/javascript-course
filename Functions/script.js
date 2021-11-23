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
*/

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
