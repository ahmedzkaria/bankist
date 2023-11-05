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

// 147 Creating DOM elements

const displayMovements = function (movements) {
  // first empty the container outside:
  containerMovements.innerHTML = '';
  // the same as .textContent = 0 .

  // 2) here we specify this data
  movements.forEach(function (mov, i) {
    let type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // 1) we want to insert html row with specific data
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// We dont want these function calls hardcoded, we want them to apply to the currentAccount that passes the test of login:
// console.log(displayMovements(account1.movements));
////
// Calculate Balance 'after reduce'

const calcDisplayBalance = function (acc) {
  // Creating balance property on each account

  // read the movements of the account, and CREATE balance property based on this movements
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  });

  labelBalance.textContent = `${acc.balance}€`;
};

// We dont want these function calls hardcoded, we want them to apply to the currentAccount that passes the test of login:
// console.log(calcDisplayBalance(account1.movements));

const calcDisplaySummary = function (acc) {
  // const incomes = movements
  // for each specific account
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  // selecting and changing the content
  labelSumIn.textContent = `${incomes}€`;

  // for each specific account

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€ `;

  // for each specific account

  const interest = acc.movements
    .filter(mov => mov > 0)
    // for each specific account

    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// We dont want these function calls hardcoded, we want them to apply to the currentAccount that passes the test of login:
// calcDisplaySummary(account1.movements);
///////////////////////////////////////
// Computing usernames
//stw

//FOR_OF --HARD-- -Map will automaticaly make NEW ARRAY ,so you JUST need to .split then map then join:
// const createUserName = function (user) {
// TO MAKE IT ARRAY WITH ELEMENTS:
// const userNameSplitted = user.split(' ');
// const newUserName = [];
// HERE I MUST LOOP OVER 'userNameSplitted' TO LOOP OVER EACH:
// console.log(userNameSplitted);
// for (const indivCharacters of userNameSplitted) {
// ABOVE means SLICE INDIVIDUAL CHARACTERS FROM 0 to 1.
// newUserName.push(indivCharacters.slice(0, 1));

// console.log(newUserName);
//   }
//   const finaluserName = newUserName.join('');
//   console.log(finaluserName);
// };

// console.log(createUserName('Steven Thomas Williams'));
// console.log(newUserName);
// ABOVE IS --HARD--

// INSTEAD DO THAT

// const createUserNames = function (user) {
//   const userName = user
//     .toLowerCase()
//     .split(' ')
//     // SPLIT METHOD return AN ARRAY.
//     // console.log(userName); //array of the name splitted

//     .map(function (name) {
//       return name[0];
//     })
//     // WHAT MAP DOES IS THAT IT **ALWAYS** creates NEW ARRAY 'return' with THE NEW VALUE that we pass in.' instead of the first for-of loop.
//     // use console.log EVERY TIME you did new function.
//     .join('');
//   // console.log(userName);
//   return userName;
//   // we MUST return userName here
// };
// console.log(createUserNames('Steven Thomas Williams'));

//> we want to create userName for each of the accounts array:
// first we will RECIEVE array of accounts in this function:

const createUserNames = function (accs) {
  // loop over the accounts array and do something 'add username property' to each element 'account'
  accs.forEach(function (acc) {
    // first we will modify OWNER to CREATE USERNAME'acc.owner.split...'
    // second we will we will attach the new property using'acc.username=acc.owner'
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      // SPLIT METHOD return AN ARRAY.
      // console.log(userName); //array of the name splitted

      .map(function (name) {
        return name[0];
      })
      // WHAT MAP DOES IS THAT IT **ALWAYS** creates NEW ARRAY 'return' with THE NEW VALUE that we pass in.' instead of the first for-of loop.
      // use console.log EVERY TIME you did new function.
      .join('');
    // console.log(userName);

    //> here we will NOT return anything bec we just need the side effect of adding a property,we dont want return the userName itself like is=n the first one.
  });
};

console.log(createUserNames(accounts));
// console.log(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  //   // Display balance
  calcDisplayBalance(acc);
  //   // we selected movements bec that is the data, balance is just a variable in that function.

  //   // Display summary
  // the whole account to display interestrate
  calcDisplaySummary(acc);
};

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // pervent form from refresh
  e.preventDefault();
  //to check:
  // console.log('LOGIN');

  // check username === to the username inputted by the user in the input field, that will be the current account that we will do all the work on :
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  console.log(currentAccount);

  // check pin
  // to fix the error of not finding the account you typed,you can use :if(currentAccount && currentAccount.pin) or:
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //> Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // change the opacity to 100 to show the ui:
    containerApp.style.opacity = 100;

    // Clear input fields: ofcourse it will be here after we log in
    inputLoginUsername.value = inputLoginPin.value = '';
    // Remove the focus off the input fields
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  // const recieverAccount = inputTransferTo.value
  // THE ABOVE is just setting the variable to the input, but i MUST first find the account which MATCHES the input:
  const recieverAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  ); // IMP: we captured this in a variable bec this will produce a value,UNLIKE the next event which just checking and based on the check do this

  console.log(amount, recieverAccount);

  if (
    amount > 0 &&
    recieverAccount &&
    recieverAccount.userName !== currentAccount.userName &&
    currentAccount.balance >= amount
  ) {
    // Doing the transfer
    recieverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);

    // Update UI
    updateUI(currentAccount);
  }

  // Clear input fields:
  inputTransferAmount.value = inputTransferTo.value = '';

  inputTransferAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //here we DONT wanna find an account with specific conditions'recieved account' that we will push values to him, here we just wanna CHECK if the values inputted arethe same as currentAcc, and we will not capture 'SAVE' a value bec there is no value that will come out like an account or anything:

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // ALWAYS use console to check if the condition is working first:
    // console.log('closed');

    // here you wanna set the condition to be true if the above is true, so repeat it:
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    console.log(index);

    // Delete account
    // splice method mutate the array, no need to capture the value, bec splice() returns new array with the removed part, and mutate the original array:
    accounts.splice(index, 1);

    // LogOut Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear fields : Outside before the condition and logout bec the inputs wll remains FULL even after you logoUt
  // Above is Wrong , bec when i press the btn, this is the first thing that will happen and that is wrong
  // so it MUSt be AFTER logout ,

  inputClosePin.value = inputCloseUsername.value = '';

  inputClosePin.blur();
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
// Simple array methods:
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE
console.log(arr.slice(1, 4));
console.log(arr.slice(1, -2));
console.log(arr.slice(-1));

//SPLICE
// console.log(arr.splice(1,2));
console.log(arr);
console.log(arr.splice(-1));
console.log(arr);

//REVERSE
const arr2 = ['f', 'g', 'h', 'i'];
console.log(arr2.reverse());

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);

//JOIN
console.log(letters.join('-'));

////////////////////////////////////////
// at method .. NOT studied

////////////////////////////////////
// forEach
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}:You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}:You withdrew ${Math.abs(movement)}`);
  }
}

console.log('----FOREACH-----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}:You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}:You withdrew ${Math.abs(mov)}`);
  }
});

// 0:function(200)
// 1:function(450)
// 2:function(-400)

////////////////////////////////
// Coding Challenge 1 #
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2, 2);
  console.log(dogsJuliaCorrected);
  const newCorrectedData = dogsJuliaCorrected.concat(dogsKate);
  console.log(newCorrectedData);

  newCorrectedData.forEach(function (dogAge, i) {
    const dogType = dogAge >= 3 ? 'an adult' : 'a puppy';
    console.log(
      ` Dog number ${i + 1} is ${dogType} and is ${dogAge} years old. `
    );
  });
};

console.log(checkDogs(dogsJulia, dogsKate));

///////////////////////////////
// map method

// const euroToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
// });

console.log(movements); // still the same , 'not mutated'
// console.log(movementsUSD);

// We can do the above with forof,, but now it is better to use Functional Programming.
const movementsUSD = movements.map(mov => {
  return mov * euroToUsd;
});

console.log(movementsUSD);

////////////////////////////////
// 152- filter method
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

// INSTEAD OF using PUSH method

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawels = movements.filter(function (mov) {
  return mov < 0;
});

console.log(withdrawels);
/////////////////////////
// reduce method

// acc -> SNOWBALL
const balance = movements.reduce(function (acc, curr, i, arr) {
  // just to show details:
  console.log(`Iteration ${i} : ${acc}`);

  return acc + curr;
}, 0);

console.log(balance);

// WITH FOR-OF lOOP

let sum = 0;
for (let mov of movements) {
  sum += mov;
} // for-of does not accept return??

console.log(sum);

// Max value
const maxValue = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc; // if true the acc will stays the same in thenext iteration
  } else {
    return mov; // return this as the new acc in the next iteration
  }
}, movements[0]);

console.log(maxValue);
///////////////////////////////
// Coding Challenge 2 //IMPOOOR//
const calcAvgHumanAge = function (ages) {
  const humanAges = ages.map(dogAge =>
    // if (dogAge <= 2) {
    //   return  2 * dogAge;
    // } else if (dogAge > 2) {
    //   return 16 + dogAge * 4;
    // }

    // this has return value automaticly
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  ); // till here me

  // return humanAge;
  // IMP : you should use return in JavaScript when you want to stop the execution of a function and return a value to its caller.

  // you want to complete calculations .. so here you can just log the first value to the console
  // console.log(humanAge);

  const adultHumans = humanAges.filter(humanAge => {
    return humanAge >= 18;
  });

  //just to make sure
  // console.log(adultHumans);

  const avgAdultAges =
    adultHumans.reduce((acc, age) => {
      return acc + age;
    }, 0) / adultHumans.length;
  //to make sure
  // console.log(adultAgeSum);

  //intead of doing this: just add / adultHumans.length at the end
  // const avgAdultAges = adultAgeSum / adultHumans.length;

  return avgAdultAges;
};
console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));

/* 
me
// use the value 'array' coming out from this function by storing it into variable:
const humanAges = calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);


calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3])
const adultHumans = humanAges.filter(humanAge => {
  return humanAge >= 18;
});

console.log(adultHumans);

const adultAgeSum = adultHumans.reduce((acc, age) => {
  return acc + age;
}, 0);

console.log(adultAgeSum);

console.log(adultHumans.length);
const avgAdultAges = adultAgeSum / adultHumans.length;
console.log(avgAdultAges);
me
*/

///////////////////////////
// 155 - Magic of Chaining methods

const euroToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => {
    return mov > 0;
  })
  .map((mov, i, arr) => {
    // console.log(arr); just to check the value
    return mov * euroToUsd;
  })
  .reduce((acc, mov) => {
    return acc + mov;
  }, 0);
// every method returns new array ,except reduce 'returns value'

console.log(totalDepositsUSD);
////////////////////////////////////
// Coding Chalenge 3

/*
const calcAvgHumanAge = function (ages) {
  const humanAges = ages.map(dogAge =>
    // if (dogAge <= 2) {
    //   return  2 * dogAge;
    // } else if (dogAge > 2) {
    //   return 16 + dogAge * 4;
    // }

    // this has return value automaticly:
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  ); // till here me.

  // return humanAge;
  // IMP : you should use return in JavaScript when you want to stop the execution of a function and return a value to its caller.

  ///> IMP: you want to complete calculations .. so here you can just log the first value to the console:
  // console.log(humanAge);

  const adultHumans = humanAges.filter(humanAge => {
    return humanAge >= 18;
  });

  //just to make sure:
  // console.log(adultHumans);

  const avgAdultAges =
    adultHumans.reduce((acc, age) => {
      return acc + age;
    }, 0) / adultHumans.length;
  //to make sure:
  // console.log(adultAgeSum);

  //intead of doing this: just add / adultHumans.length at the end of the above method.
  // const avgAdultAges = adultAgeSum / adultHumans.length;

  return avgAdultAges;
};
console.log(calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]));
*/
///////
// you should not use {} with arrow funcs
const calcAvgHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => {
      return age >= 18;
    })
    .reduce((acc, age, i, arr) => {
      return acc + age / arr.length;
    }, 0);
// /adults.length does not exist so this is the ony way by using the arr in .map
const avg1 = calcAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);

console.log(avg1);
//////////////////////////////////////
// 157- the find method

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// for (let acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }
