// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

var intDict = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var alphaDict = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var specialDict = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+'];

function generatePassword() {

  var userInputLen = rqstPassLen();
  if (userInputLen === false) {
    return 'Request Cancelled';
  } else {
    var userInputLwrCase = rqstChrType('lower-case characters (a-z)');
    var userInputUprCase = rqstChrType('upper-case characters (A-Z)');
    var userInputNumber = rqstChrType('numbers (0-9)');
    var userInputSpclChar = rqstChrType('special characters (!, @, &, etc.)');
    console.log(userInputLwrCase);
    console.log(userInputUprCase);
    console.log(userInputNumber);
    console.log(userInputSpclChar);
    var characterAmounts = randCharAmounts(userInputLen, [userInputLwrCase, userInputUprCase, userInputNumber, userInputSpclChar]);
    console.log(characterAmounts);
    var generatedCharMap = characterMap(userInputLen, characterAmounts);
    console.log(generatedCharMap);
    var generatedPassword = assignRandChar(generatedCharMap);
    
    return generatedPassword;
  }
 
}

function rqstPassLen() {
  
  var enteredValue = prompt('How long would you like your password to be?\n(Response must be in numeric characters and passowrd length must be between 8 and 128 characters long)')

  if (enteredValue === null) {
    return false;
  }

  enteredValue = verPassLen(enteredValue);

  return enteredValue;
}

function rqstNewPassLen(error) {

  var errorMsg = {
    invalidCharacters: 'contains non-numeric characters.  Please only use 0-9.',
    invalidSizeSmall: 'is too small.  Please enter a number between 8 and 128.',
    invalidSizeLarge: 'is too large.  Please enter a number between 8 and 128.'
  };

  var enteredValue = prompt('Sorry!  Looks like your requested length ' + errorMsg[error]);

  if (enteredValue === null) {
    return false;
  }

  enteredValue = verPassLen(enteredValue);

  return enteredValue;

}

function verPassLen(passLength) {

  var valid;

  valid = verPassLenChar(passLength);

  if (valid === 'valid') {

    valid = verPassLenVal(passLength);

  }
  
  if (valid !== 'valid') {

    passLength = rqstNewPassLen(valid);
  
  }

  return passLength;

}

function verPassLenChar(requestedPassword) {
  var reqstIsNumbers = 'valid';
    for (i = 0; i < requestedPassword.length; i++) {
      if (intDict.indexOf(requestedPassword[i]) === -1) {
        reqstIsNumbers = 'invalidCharacters';
      }
    }
  return reqstIsNumbers;
}

function verPassLenVal(requestedPassword) {
  var rqstIsInRange;

  if(parseInt(requestedPassword) < 8) {
    rqstIsInRange = 'invalidSizeSmall';
  } else if (parseInt(requestedPassword) > 128) {
    rqstIsInRange = 'invalidSizeLarge';
  } else {
    rqstIsInRange = 'valid';
  }

  return rqstIsInRange;

}

function rqstChrType(typeMsg) {

  var includeType = confirm('Click "OK" to include ' + typeMsg + ' in your generated password.  Click "Cancel" to exclude them.');

  return includeType;
}

function randCharAmounts(passwordLength, usedTypesArray) {
  //console.log(passwordLength);
  //console.log(usedTypesArray);
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
  //console.log(numOfCharTypes);
  //console.log(denominator);
  //console.log(totalReserved);

  for (var j = 0; j < numOfCharTypes.length; j++) {
    if (numOfCharTypes[j] > 0) {
      numOfCharTypes[j] = Math.round((numOfCharTypes[j]/denominator)*(passwordLength-totalReserved)) + 1;
    }
  }

  //console.log(numOfCharTypes);
  return numOfCharTypes;
}

function characterMap(passwordLength, characterAmounts) {
  var remainingCharacters = passwordLength;
  var individualCharacters = characterAmounts;
  var characterMap = '';
  while (remainingCharacters > 0) {
    var randFour = Math.floor(Math.random()*4);
    if (individualCharacters[randFour] > 0) {
      if (randFour === 0) {
        characterMap = characterMap + 'L';
      } else if (randFour === 1) {
        characterMap = characterMap + 'U';
      } else if (randFour === 2) {
        characterMap = characterMap + 'N';
      } else {
        characterMap = characterMap + 'S';
      } 
      remainingCharacters = remainingCharacters - 1;
      individualCharacters[randFour] = individualCharacters[randFour] - 1;

    }
  }
  return characterMap;
}

function assignRandChar(characterMap) {
  
  var finalPassword = '';
  for (var i = 0; i < characterMap.length; i++) {
    var temp
    if (characterMap[i] === 'L') {
      temp = alphaDict[Math.floor(Math.random() * alphaDict.length)];
    } else if (characterMap[i] === "U") {
      temp = alphaDict[Math.floor(Math.random() * alphaDict.length)].toUpperCase();
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
