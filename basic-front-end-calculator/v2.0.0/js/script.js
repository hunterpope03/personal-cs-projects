var val1 = '0'; 
var operator = ''; 
var val2 = '0'; 
var result = ''; 
$('#display').val(val1);

/**
 * Assigns the current value to be updated in the following functions. 
 * 
 * @return {string} - The value to be updated.
 */
function assignValue () {
  if (operator === '') {
    return val1;
  } else {
    return val2; 
  }
}

/**
 * Updates the proper value's global variable and the display. 
 * 
 * @param {string} value - The value to be updated.
 */
function updateValue (value) {
  if (operator === '') {
    val1 = value; 
    $('#display').val(val1);
  } else {
    val2 = value; 
    $('#display').val(val2);
  }
}

/**
 * Handles numerical input from the user. 
 * 
 * @param {string} value - The numerical value inputted by the user.
 */
function setValue (input) {
  let value = assignValue(); 

  if (input === '0') {
    if (value !== '0' && value !== '-0') { // prevent leading zeroes
      value += input
    }
  } else {
    if (value === '0') {
      value = input; 
    } else if (value === '-0') {
      value = '-' + input;
    } else {
      value += input
    }
  }

  updateValue(value)
}

/**
 * Handles operator input from the user.
 * 
 * @param {string} input - The operator value inputted by the user.
 */
function setOperator (input) {
  if (operator === '') {
      operator = input
      $('#display').val(val1);
    } else {
      calculate() // calculate upon pressing an operator after an expression has already been entered
      operator = input; 
    }
}

/**
 * Handles decimal input from the user.
 * 
 */
function setDecimal () {
    let value = assignValue(); 

    if (value.includes('.')) {
      if (value.indexOf('.') === (value.length - 1)) {
        value = value.slice(0, -1) // remove the decimal point if it is the last character
      } 
    } else {
      value += '.' // add the decimal point
      }

  updateValue(value)
}

/**
 * Handles unary input from the user.
 * 
 */
function setUnary () {
  let value = assignValue();

  if (value.includes('-')) {
    value = value.replace('-', '') // remove the negative sign
  } else {
    value = '-' + value // add the negative sign
  }

  updateValue(value)
}

/**
 * Deletes the last digit of the current value.
 * 
 */
function del () {
  let value = assignValue();

  if (value.length !== 1) {
    value = value.slice(0, -1) // remove one character
  } else {
    value = '0' // reset to 0 if the last digit is deleted
  }

  updateValue(value)
}

/**
 * Clears the display and resets all global variables.
 * 
 */
function clearAll () {
  val1 = '0'; 
  operator = ''; 
  val2 = '0'; 
  result = ''; 
  $('#display').val(val1);
}

/**
 * Calculates the current expression. 
 * 
 */
function calculate () {
  if (operator !== '') {
    if (operator === '+') {
      result = Number(val1) + Number(val2);
    }
    else if (operator === '-') {
      result = Number(val1) - Number(val2);
    } else if (operator === '*') {
      result = Number(val1) * Number(val2);
    } else if (operator === '÷') {
      if (val2 === '0') {
        $('#display').val('Error'); // handle division by zero
        val1 = '0';
        operator = '';
        val2 = '0';
        result = '';  
        return;  
      } else {
          result = Number(val1) - Number(val2);
        }
    }
    val1 = String(result);
    $('#display').val(val1);
    operator = '';
    val2 = '0'; // update global variables and display
  }
}

/**
 * Handles keyboard input from the user.
 * 
 * @param {object} e - The event object.
 */
document.addEventListener('keydown', function(e) {
  const keyActions = {
      '1': () => triggerButton("button[onclick=\"setValue('1')\"]"),
      '2': () => triggerButton("button[onclick=\"setValue('2')\"]"),
      '3': () => triggerButton("button[onclick=\"setValue('3')\"]"),
      '4': () => triggerButton("button[onclick=\"setValue('4')\"]"),
      '5': () => triggerButton("button[onclick=\"setValue('5')\"]"),
      '6': () => triggerButton("button[onclick=\"setValue('6')\"]"),
      '7': () => triggerButton("button[onclick=\"setValue('7')\"]"),
      '8': () => triggerButton("button[onclick=\"setValue('8')\"]"),
      '9': () => triggerButton("button[onclick=\"setValue('9')\"]"),
      '0': () => triggerButton("button[onclick=\"setValue('0')\"]"),
      '+': () => triggerButton("button[onclick=\"setOperator('+')\"]"),
      '-': () => triggerButton("button[onclick=\"setOperator('-')\"]"),
      '*': () => triggerButton("button[onclick=\"setOperator('*')\"]"),
      '/': () => triggerButton("button[onclick=\"setOperator('÷')\"]"),
      'Backspace': () => triggerButton("#delete-button"),
      'Escape': () => triggerButton("#clear-button"),
      '.': () => triggerButton("#decimal-button"),
      '±': () => triggerButton("#unary-button"),
      'Enter': () => triggerButton("#enter-button"),
      'Return': () => triggerButton("#enter-button"),
  };

  if (e.key === ' ') {
      e.preventDefault(); 
  }

  if (keyActions[e.key]) {
      keyActions[e.key]();
  }
});

/**
 * Triggers a button click event and adds an active class for visual feedback.
 * 
 * @param {string} selector - The CSS selector of the button to be triggered.
 */
function triggerButton(selector) {
    const button = document.querySelector(selector);
    if (button) {
        button.classList.add('active'); // add active class for visual feedback
        button.click();
        setTimeout(() => {
            button.classList.remove('active');
        }, 100);
    }
}