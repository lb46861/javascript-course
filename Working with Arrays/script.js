'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${outcomes}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);
// WE USUALLY AVOID CHAINING METHODS THAT MUTATE OUR ORIGINAL ARRAY

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

// Using innerHTML means that any JavaScript references to the descendants of element will be removed. When you use insertAdjacentHTML , adding additional content will not corrupt the existing JS references and the existing nodes are not altered.

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// Does NOT MUTATE original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
console.log(arr.slice());
console.log([...arr]);

// SPLICE
// Difference with SLICE is that SPLICE actually MUTATES the original array
//console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(2, 2); // second number says numbers of elements we wwant to delete and first says from where to start
console.log(arr);

// REVERSE
// reverse MUTATES the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
// Does NOT MUTATE any of the involved arrays
arr = ['a', 'b', 'c', 'd', 'e'];
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
// Does NOT MUTATE the original array
console.log(letters.join('-'));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
  for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${i + 1}: You withrew ${Math.abs(movement)}`);
    }
  }
  console.log('--- FOREACH ---');
  movements.forEach(function (movement, i, arr) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${i + 1}: You withrew ${Math.abs(movement)}`);
    }
  });
  // 0: function(200)
  // 1: function(450)
  // 2: function(400)
  // ...
  
  // YOU CANOT BREAK OUT OF FOREACH LOOP, ONLY IN FOROF LOOP

  
  // MAP
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  currencies.forEach(function (value, key, map) {
    // similiar as in array ( element, index, whole array)
    console.log(`${key}: ${value}`);
  });
  
  // SET
  const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR', 'EUR']);
  currenciesUnique.forEach(function (value, _, map) {
    console.log(`${value}: ${value}`);
  });
  


// Coding challenge #1

// Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

function checkdogs(dogsJulia, dogsKate) {
  // const correctJulia = dogsJulia.slice()
  const correctJulia = [...dogsJulia];
  correctJulia.splice(0, 1);
  correctJulia.splice(-2);
  // const both = [...correctJulia, ...dogsKate];
  const both = correctJulia.concat(dogsKate);
  return both;
}

const both = checkdogs(julia, kate);
both.forEach(function (mov, i) {
  mov >= 3
    ? console.log(`Dog number ${i + 1} is an adult, and is ${mov} years old`)
    : console.log(
        `Dog number ${i + 1} is still a puppy 🐶, and is ${mov} years old`
      );
});


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
  //   return mov * eurToUsd;
  // });
  
  const movementsUSD = movements.map(mov => mov * eurToUsd);
  
  console.log(movements);
  
  console.log(movementsUSD);
  
  const movementsUSDFor = [];
  for (const mov of movements) movementsUSDFor.push(mov * eurToUsd);
  console.log(movementsUSDFor);
  
  const movementsDescriptions = movements.map(
    (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
      )}`
      );
      console.log(movementsDescriptions);
      


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// Same way we can make withdrawals with Array function
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//console.log(movements);

// accumulator is like a snowball

// const balance = movements.reduce(function (accumulator, curr, i, arr) {
//   console.log(`Iteration number ${i}: ${accumulator}`);
//   return accumulator + curr;
// }, 0);

const balance = movements.reduce((accumulator, curr) => accumulator + curr, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const maxValue = movements.reduce(
  (accumulator, curr) => (accumulator > curr ? accumulator : curr),
  movements[0]
);
console.log(maxValue);



// Coding challenge #2

// Test data:
// Data 1: [5, 2, 4, 1, 15, 8, 3]
// Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (dogsYears) {
  return dogsYears
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, newArr) => acc + age / newArr.length, 0);
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// Coding challenge #3

// Test data:
// Data 1: [5, 2, 4, 1, 15, 8, 3]
// Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = dogsYears =>
  dogsYears
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));



const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    //console.log(arr);
    return mov * eurToUsd;
  })
  //.map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD + '$');



// Test data:
// Data 1: [5, 2, 4, 1, 15, 8, 3]
// Data 2: [16, 6, 10, 5, 6, 1, 4]


// FIND METHOD
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

function returnAcc(accounts) {
  for (const acc of accounts) {
    if (acc.owner === 'Jessica Davis') return acc;
  }
}
const myacc = returnAcc(accounts);
console.log(myacc);
*/
