'use strict';

/////////////////////////////////
/////////  Bankist App  /////////
/////////////////////////////////

const account1 = {
  owner: 'Mohammed Ariby',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-03-07T17:01:17.194Z',
    '2023-03-12T23:36:17.929Z',
    '2023-03-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  transferRate: 0.93,
  locale: 'en-UK', // de-DE
};

const account2 = {
  owner: 'Rabaye Gwawey',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2023-03-10T17:01:17.194Z',
    '2023-03-11T23:36:17.929Z',
    '2023-03-14T10:51:36.790Z',
  ],
  currency: 'USD',
  transferRate: 1.07,
  locale: 'en-UK',
};

const account3 = {
  owner: 'Nooradeen Absent',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2023-03-07T17:01:17.194Z',
    '2023-03-12T23:36:17.929Z',
    '2023-03-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  transferRate: 0.93,
  locale: 'en-UK', // de-DE
};

const account4 = {
  owner: 'Abd alhakim Attrah',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2020-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2023-03-07T17:01:17.194Z',
    '2023-03-12T23:36:17.929Z',
    '2023-03-13T10:51:36.790Z',
  ],
  currency: 'USD',
  transferRate: 1.07,
  locale: 'en-US',
};

const account5 = {
  owner: 'Hatem Albah',
  movements: [430, 1000, 700, 50, 90, -230],
  interestRate: 0.8,
  pin: 5555,

  movementsDates: [
    '2019-01-25T14:18:46.235Z',
    '2020-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2023-03-07T17:01:17.194Z',
    '2023-03-12T23:36:17.929Z',
    '2023-03-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  transferRate: 0.93,
  locale: 'de-DE',
};
const account6 = {
  owner: 'Ahmed Ariby',
  movements: [-430, 1000, 700, 500, 90, -230],
  interestRate: 1.9,
  pin: 6666,

  movementsDates: [
    '2019-01-25T14:18:46.235Z',
    '2020-01-25T14:18:46.235Z',
    '2021-02-07T16:33:06.386Z',
    '2023-03-07T17:01:17.194Z',
    '2023-03-12T23:36:17.929Z',
    '2023-03-13T10:51:36.790Z',
  ],
  currency: 'EUR',
  transferRate: 0.93,
  locale: 'de-DE',
};

const accounts = [account1, account2, account3, account4, account5, account6];

/////////////////////////////////////////////////
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
const menu = document.querySelector('.menu');
const login = document.querySelector('.login');
const myMediaQuery = window.matchMedia('(max-width: 767px)');

/////////////////////////////////////////////////
// Functions

// Creat Date and Time
const formateMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // new methods
  return new Intl.DateTimeFormat(locale).format(date);
};

// Formate Currency
const formateCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Display Movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formateMovementsDate(date, acc.locale);

    const formattedMov = formateCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Display Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formateCur(acc.balance, acc.locale, acc.currency);
};

// Display Summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formateCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formateCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formateCur(interest, acc.locale, acc.currency);
};

// Create UserNames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// Update User Interface
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Log Out Timer
const startLogOutTimer = function () {
  const startTime = 10;
  let time = startTime * 60;
  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');

    labelTimer.textContent = `${min}:${sec}`;

    if (min == 0 && sec == 0) {
      clearInterval(counter);
      containerApp.style.opacity = 0;
      time = startTime * 60;
      labelWelcome.textContent = 'Log in to get started';
      labelWelcome.style.color = '#444';
    }
    time--;
  };
  tick();
  const counter = setInterval(tick, 1000);
  return counter;
};

// Event handlers (Log In)
let currentAccount, counter, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    labelWelcome.style.color = '#39b385';

    // set Date Time

    const displayTime = function () {
      const now = new Date();
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };
      // New methods

      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);
    };
    displayTime();
    timer = setInterval(displayTime, 1000);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (counter) clearInterval(counter);
    counter = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent = 'Incorrect username or password';
    labelWelcome.style.color = 'red';
    containerApp.style.opacity = 0;
    if (timer) clearInterval(timer);
  }
});

// Transfer Money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);

    // Transfer Money (USD to EUR) or ( EUR to USD)
    if (currentAccount.currency !== receiverAcc.currency) {
      receiverAcc.movements.push(amount * receiverAcc.transferRate);
    } else {
      receiverAcc.movements.push(amount);
    }

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Resset counter
    clearInterval(counter);
    counter = startLogOutTimer();
    if (timer) clearInterval(timer);

    // Border Transfer input
    inputTransferTo.style.border = 'none';
    inputTransferAmount.style.border = 'none';
  } else {
    // Border Transfer input
    inputTransferTo.style.border = '1px solid orangered';
    inputTransferAmount.style.border = '1px solid orangered';

    inputTransferTo.focus();
  }
});

// Get Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Resset counter
      clearInterval(counter);
      counter = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

// Close Account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    labelWelcome.textContent = 'Log in to get started';
    labelWelcome.style.color = '#444';
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// Display Movements Sorted
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  btnSort.style.color = '#f6f6f6';
  // Resset counter
  clearInterval(counter);
  counter = startLogOutTimer();
});

// Display Drop Menu
if (myMediaQuery) {
  menu.addEventListener('click', function () {
    login.style.display = 'flex';
  });
}
if (myMediaQuery) {
  containerApp.addEventListener('click', function () {
    login.style.display = 'none';
  });
}
