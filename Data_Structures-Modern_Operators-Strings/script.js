'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced objest literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} by ${time}.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  // OLD WAY of declaring function in object
  orderPizza: function (mainIngredient, ...other) {
    console.log(mainIngredient);
    console.log(other);
  },
};

console.log('a+very+nice+string'.split('+'));
console.log('Lovre Begs'.split(' '));

const [firstName, lastName] = 'Lovre Begs'.split(' ');
// console.log(firstName, lastName);

const fullName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(fullName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('lovrenos begos');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Lovre'.padStart(25, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + ''; // String(number)
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(4337891234619234));
console.log(maskCreditCard('4337891234619234'));

// Repeat
const message2 = 'Bad weather... All departues delayed... ';
console.log(message2.repeat(10));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${`👨‍✈️`.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(9);

/* 

const airline = 'TAP Air Portugal';
console.log(airline.toLocaleLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnaS'; // should be Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toLocaleUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Check email
const email = 'hello@gmail.com';
const loginEmail = '  Hello@Gmail.Com \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replacing
const priceEU = '288,97€';
const priceUS = priceEU.replace('€', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23.';
console.log(announcement);
//console.log(announcement.replace('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the new Airbus family');
} else console.log('Not part of the new Airbus family');

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLocaleLowerCase();
  baggage.includes('knife') || baggage.includes('lighter')
    ? console.log('You are not allowed on board')
    : console.log('Welcome aboard!');
};
checkBaggage('I have a laptop, some Food and a Lighter');
checkBaggage('Sandwich and keys');
checkBaggage('Got some snacks, mobile phone, and a pocket knife');


const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r')); // first time finding letter r
console.log(airline.lastIndexOf('r')); // last time finding letter r
console.log(airline.indexOf('Portugal')); // case sensitive

console.log(airline.slice(4));
console.log(airline.slice(4, 7)); // starts from 4, stops on 6, 7-4 = 3, it will write 4th, 5th and 6th

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  s === 'B' || s === 'E'
    ? console.log('You got middle seat')
    : console.log('You got premium seat');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// methods work on string becasue whenever we call a method an a string js automatically converts string primitive to string object with the same content and then on that object the methods is being called, this process is being called BOXING, it takes string and puts in to a box which is the object

console.log(new String('jonas'));
console.log(typeof new String('jonas')); // this happens when we call method on string, and when method is done object is converted back to primitive string
console.log(typeof new String('jonas').slice(1));



// CODING CHALLENGE #3

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🃏 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🃏 Substitution'],
  [64, '🟨 Yellow card'],
  [69, '🟥 Red card'],
  [70, '🃏 Substitution'],
  [72, '🃏 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🟨 Yellow card'],
]);



// 1.
// const events = new Set();
// for (const item of gameEvents.values()) {
//   events.add(item);
// }
// const newArr = [...events];
// console.log(newArr);
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
gameEvents.delete(64);

// 3.
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

const lastMinute = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${lastMinute / gameEvents.size} minutes`
);

// 4.
for (let [key, value] of gameEvents) {
  const mystr =
    key <= 45
      ? `[FIRST HALF] ${key}: ${value}`
      : `[SECOND HALF] ${key}: ${value}`;
  console.log(mystr);
}



const question = new Map([
  ['question', 'What is the best programming language in the world ?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);
console.log(question);

console.log(Object.entries(openingHours));
// Conver object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer?'));
const answer = 3;
console.log(answer);

console.log(question.get(answer === question.get('correct')));

// Converting map to array
console.log([...question]);
//console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);


const rest = new Map();S
rest.set('name', 'Classico Italiano'); // Similiar as .add in SETS
rest.set(1, 'Florence, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
//rest.clear();
const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr));


const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Rissotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Rissotto');
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
console.log(new Set('LovreTestLovreTest').size);




//  CODING CHALLENGE #2
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...players) {
    let sum = 0;
    for (let i = 0; i < players.length; i++) {
      console.log(players[i]);
      sum += 1;
    }
    console.log(`Total goals: ${sum}`);
  },
};

// 1.
for (let [i, j] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${j}`);
}

// 2.
const myOdds = Object.values(game.odds);
let averageOdd = 0;
for (const i of myOdds) {
  averageOdd += i;
}
console.log(averageOdd / myOdds.length);

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamOption = team === 'x' ? 'draw' : game[team];
  console.log(`Odd of ${teamOption}: ${odd}`);
}

// 4. BONUS
let scorers = {};
for (let player of game.scored.values()) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);



// Property NAMES
const properties = Object.keys(openingHours);
//console.log(properties);

let openStr = `We are open on ${properties.length} days in week: `;

for (const day of properties) {
  openStr += `${day} `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
//console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}



if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// Here it gives error because it canot read open from undefined(mon does not exist)
//console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

console.log(restaurant.openingHours.fri?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we are open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');
console.log(restaurant.orderRissotto?.(0, 1) ?? 'Method does not exist.');

// Arrays
const users = [{ name: 'lovre', email: 'lovre@gmail.com' }];

console.log(users[0]?.name ?? 'User array empty.');

if (users.length > 0) console.log(users[0].name);
else console.log('User array empty.');


const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

//console.log([...menu.entries()]);



// CODING CHALLENGE #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...players) {
    let sum = 0;
    for (let i = 0; i < players.length; i++) {
      console.log(players[i]);
      sum += 1;
    }
    console.log(`Total goals: ${sum}`);
  },
};

const [players1, players2] = game.players;
//console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
//console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
//console.log(allPlayers);

const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
//console.log(playersFinal);

// Nested destruction
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
//game.printGoals(...game.scored);

team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');


restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// NUllish: null and undefined (NOT 0 or '')
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);



console.log('--- OR ---');
// LOGICAL OPERATORS
// They can use any data type, trturn any data type, short-circuiting
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('--- AND ---');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Jonas' && 23 && null && 'Lovre');

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza &&
  restaurant.orderPizza('mushrooms', 'spinach', 'pineapple');


// 1) Destructing

// SPREAD beacuse on RIGHT side of =
const arr = [1, 2, ...[3, 4]];
console.log(arr);

// REST because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , rissotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, rissotto, otherFood);

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);
const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushroooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushroooms');


const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// Spread operator
const goodNewArr = [1, 2, ...arr];
console.log(goodNewArr);

console.log(...goodNewArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Chicken', 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Spread operator works on all types of iterables, most of built in data structures except objects

// Iterables : arrays, strings, maps, sets
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
// We can use spread operator ONLY when building an array or when we pass values into a function
console.log(...str);
// console.log(`${...str} Schmedtman`); // This will not work

// Example how to use spread operator
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1 ?"),
  // prompt(' Ingredient 2 ?'),
  // prompt('Ingredient 3 ?'),
];
console.log(ingredients);

restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = {
  foundingYear: 1980,
  ...restaurant,
  founder: 'Guisseppe',
};
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Palace';
console.log(restaurantCopy.name + ' - ' + restaurant.name);

// Object destructing

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});


const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: myHours,
  categories: tags,
} = restaurant;

console.log(restaurantName, myHours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: openHours, close: closeHours },
} = openingHours;
console.log(openHours, closeHours);



// Destructing arrays
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // destructing array into 3 variables, original array is not effected
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// First way of switching 2 varibales
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Second way of switching 2 variables
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Recieve 2 return values from a function
//console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructing
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
