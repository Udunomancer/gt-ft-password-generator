// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

var intDict = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var alphaDict = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
var specialDict = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
];

function generatePassword() {
  //Function to generate a random password
  //Input: None
  //Output: a generated password OR 'Request Cancelled' if user cancels the password length prompt

  var userInputLen = rqstPassLen();
  if (userInputLen === false) {
    return "Request Cancelled - Password Length Not Selected";
  } else {
    var userInputCharTypes = [
      rqstChrType("lower-case characters (a-z)"),
      rqstChrType("upper-case characters (A-Z)"),
      rqstChrType("numbers (0-9)"),
      rqstChrType("special characters (!, @, &, etc.)"),
    ];
    if (
      !userInputCharTypes[0] &&
      !userInputCharTypes[1] &&
      !userInputCharTypes[2] &&
      !userInputCharTypes[3]
    ) {
      return "Request Cancelled - No Character Types Selected";
    } else {
      var characterAmounts = randCharAmounts(userInputLen, userInputCharTypes);
      var generatedCharMap = characterMap(userInputLen, characterAmounts);
      var generatedPassword = assignRandChar(generatedCharMap);

      return generatedPassword;
    }
  }
}

function rqstPassLen() {
  //Function to request a valid password length from the user
  //Input: None
  //Output: A password length ('string') OR false (boolean) if user cancels on prompt

  var enteredValue = prompt(
    "How long would you like your password to be?\n(Response must be in numeric characters and passowrd length must be between 8 and 128 characters long)"
  );

  if (enteredValue === null) {
    return false;
  }

  enteredValue = verPassLen(enteredValue);

  return enteredValue;
}

function rqstNewPassLen(error) {
  //Function to re-request a valid password length from the user
  //Input: password length rejection reason ('string')
  //Output: A password length ('string') OR false (boolean) if user cancels on prompt

  var errorMsg = {
    invalidCharacters: "contains non-numeric characters.  Please only use 0-9.",
    invalidSizeSmall: "is too small.  Please enter a number between 8 and 128.",
    invalidSizeLarge: "is too large.  Please enter a number between 8 and 128.",
  };

  var enteredValue = prompt(
    "Sorry!  Looks like your requested length " + errorMsg[error]
  );

  if (enteredValue === null) {
    return false;
  }

  enteredValue = verPassLen(enteredValue);

  return enteredValue;
}

function verPassLen(passLength) {
  //Function to verify that user requested password length is valid for purpose of password generator
  //Input: user input ('string')
  //Output: valid ('string') if password length is valid

  var valid;

  valid = verPassLenChar(passLength);

  if (valid === "valid") {
    valid = verPassLenVal(passLength);
  }

  if (valid !== "valid") {
    passLength = rqstNewPassLen(valid);
  }

  return passLength;
}

function verPassLenChar(requestedPassword) {
  //Function to verify that all characters in the requested password length are numbers
  //DID NOT USE ParseInt because ParseInt will return an int in situations where numbers AND letters are entered (ex: parseInt(123abc would return 123))
  //Input: User requested password length (string)
  //Output: ('string') 'valid' if password only contains numbers, 'invalidCharacters' if password length contains characters other than numbers

  var reqstIsNumbers = "valid";
  for (i = 0; i < requestedPassword.length; i++) {
    if (intDict.indexOf(requestedPassword[i]) === -1) {
      reqstIsNumbers = "invalidCharacters";
    }
  }
  return reqstIsNumbers;
}

function verPassLenVal(requestedPassword) {
  //Function to verify that requested password length is within accepted range (8<= x <= 128)
  //Input: User requested password length (string)
  //Output: ('string') 'valid' if password length only contains numbers, 'invalidSizeSmall' if password length too short, 'invalidSizeLarge' if password length too long

  var rqstIsInRange;

  if (parseInt(requestedPassword) < 8) {
    rqstIsInRange = "invalidSizeSmall";
  } else if (parseInt(requestedPassword) > 128) {
    rqstIsInRange = "invalidSizeLarge";
  } else {
    rqstIsInRange = "valid";
  }

  return rqstIsInRange;
}

function rqstChrType(typeMsg) {
  //Function to prompt the user if they would like to include a specific character type
  //Input: ('string') message to specify which character type
  //Output: (boolean) true to include character type, false to exclude

  var includeType = confirm(
    'Click "OK" to include ' +
      typeMsg +
      ' in your generated password.  Click "Cancel" to exclude them.'
  );

  return includeType;
}

function randCharAmounts(passwordLength, usedTypesArray) {
  //Function to randomly assign total # of instances of selected character types in final password
  //Input: requested password length (string) AND selected character types (array of booleans)
  //Output: total # of instances of each character type (array of numbers)

  var numOfCharTypes = [];
  var denominator = 0;
  var totalReserved = 0;
  for (var i = 0; i < usedTypesArray.length; i++) {
    if (usedTypesArray[i]) {
      numOfCharTypes[i] = Math.random();
      totalReserved = totalReserved + 1;
    } else {
      numOfCharTypes[i] = 0;
    }
    denominator = denominator + numOfCharTypes[i];
  }

  for (var j = 0; j < numOfCharTypes.length; j++) {
    if (numOfCharTypes[j] > 0) {
      numOfCharTypes[j] =
        Math.round(
          (numOfCharTypes[j] / denominator) * (passwordLength - totalReserved)
        ) + 1;
    }
  }

  return numOfCharTypes;
}

function characterMap(passwordLength, characterAmounts) {
  //Function to map out what character types will occur where in the final password
  //Input: Password length (string) AND character amounts (array of numbers)
  //Output: (string) character types mapped out in their final positions

  var remainingCharacters = passwordLength;
  var individualCharacters = characterAmounts;
  var characterMap = "";
  while (remainingCharacters > 0) {
    var randFour = Math.floor(Math.random() * 4);
    if (individualCharacters[randFour] > 0) {
      if (randFour === 0) {
        characterMap = characterMap + "L";
      } else if (randFour === 1) {
        characterMap = characterMap + "U";
      } else if (randFour === 2) {
        characterMap = characterMap + "N";
      } else {
        characterMap = characterMap + "S";
      }
      remainingCharacters = remainingCharacters - 1;
      individualCharacters[randFour] = individualCharacters[randFour] - 1;
    }
  }

  return characterMap;
}

function assignRandChar(characterMap) {
  //Function to randomly assign a character type in each position of the final password
  //Input: character map of the password (string)
  //Output: Final password (string)

  var finalPassword = "";
  for (var i = 0; i < characterMap.length; i++) {
    var temp;
    if (characterMap[i] === "L") {
      temp = alphaDict[Math.floor(Math.random() * alphaDict.length)];
    } else if (characterMap[i] === "U") {
      temp = alphaDict[
        Math.floor(Math.random() * alphaDict.length)
      ].toUpperCase();
    } else if (characterMap[i] === "N") {
      temp = intDict[Math.floor(Math.random() * intDict.length)];
    } else {
      temp = specialDict[Math.floor(Math.random() * specialDict.length)];
    }

    finalPassword = finalPassword + temp;
  }

  return finalPassword;
}

generateBtn.addEventListener("click", writePassword);
