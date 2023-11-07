"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Ahmed Zakaria",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// 147 Creating DOM elements

const displayMovements = function (movements, sort = false) {
  // first empty the container outside:
  containerMovements.innerHTML = "";
  // the same as .textContent = 0 .

  const movs = sort
    ? movements.slice().sort((movA, movB) => movA - movB)
    : movements;

  // 2) here we specify this data
  movs.forEach(function (mov, i) {
    let type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    // 1) we want to insert html row with specific data
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// We dont want these function calls hardcoded, we want them to apply to the currentAccount that passes the test of login:
// console.log(displayMovements(account1.movements));
/////////////////////////////////////////////
///////////////////////////////////////////
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

/////////////////////////////////////////////////
const calcDisplaySummary = function (acc) {
  // const incomes = movements
  // for each specific account
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  // selecting and changing the content
  labelSumIn.textContent = `${incomes}€`;

  // for each specific account

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)}€ `;

  // for each specific account

  const interest = acc.movements
    .filter((mov) => mov > 0)
    // for each specific account

    .map((deposit) => (deposit * acc.interestRate) / 100)
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

////////////////////////////////////////////////////////////////
// 151
//> we want to create userName for each of the accounts array:
// first we will RECIEVE array of accounts in this function:

const createUserNames = function (accs) {
  // loop over the accounts array and do something 'add username property' to each element 'account'
  accs.forEach(function (acc) {
    // first we will modify OWNER to CREATE USERNAME'acc.owner.split...'
    // second we will we will attach the new property using'acc.username=acc.owner'
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      // SPLIT METHOD return AN ARRAY.
      // console.log(userName); //array of the name splitted

      .map(function (name) {
        return name[0];
      })
      // WHAT MAP DOES IS THAT IT **ALWAYS** creates NEW ARRAY 'return' with THE NEW VALUE that we pass in.' instead of the first for-of loop.
      // use console.log EVERY TIME you did new function.
      .join("");
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

btnLogin.addEventListener("click", function (e) {
  // pervent form from refresh
  e.preventDefault();
  //to check:
  // console.log('LOGIN');

  // check username === to the username inputted by the user in the input field, that will be the current account that we will do all the work on :
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  console.log(currentAccount);

  // check pin
  // to fix the error of not finding the account you typed,you can use :if(currentAccount && currentAccount.pin) or:
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //> Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    // change the opacity to 100 to show the ui:
    containerApp.style.opacity = 100;

    // Clear input fields: ofcourse it will be here after we log in
    inputLoginUsername.value = inputLoginPin.value = "";
    // Remove the focus off the input fields
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  // const recieverAccount = inputTransferTo.value
  // THE ABOVE is just setting the variable to the input, but i MUST first find the account which MATCHES the input:
  const recieverAccount = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
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
  inputTransferAmount.value = inputTransferTo.value = "";

  inputTransferAmount.blur();
});

// 161 some and every
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add +ve movement:
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  // Clear fields
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

btnClose.addEventListener("click", function (e) {
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
      (acc) => acc.userName === currentAccount.userName
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

  inputClosePin.value = inputCloseUsername.value = "";

  inputClosePin.blur();
});
/////////////////////////////////////////////////

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  // you cant just sort the array, you MUST DISPLAY it also
  sorted = !sorted;
});
