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

  var userInputLen = cleanLenRqst();

  return userInputLen;
}

function cleanLenRqst() {
  
  var enteredValue = prompt('How long would you like your password to be?\n(Response must be in numeric characters and passowrd length must be between 8 and 128 characters long)')
  
  return enteredValue;
}

function cleanLenRqstChar() {

}

function cleanLenRqstLen() {
  
}

// Click button to start

// Prompted for password criteria
  // 1. Prompt for password length
    // Verify that value entered is a numeric value
    // Verify that numberic value entered is between 8 and 128
  // 2. Prompt for lowercase characters
  // 3. Prompt to include uppercase characters
  // 4. Prompt to include numerals
  // 5. Prompt to include special characters
    // Verify that at least one character type was selected

// Function to return a randomly generated password bassed on user prompts
  // Function to determine ratio of selected character types



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
