let val1 = '0';
let operator = '';
let val2 = '0';
let result = '';
$('#display').val(val1);

function setValue (input) {
    let val = '' 
    if (operator === '') { // adjust val1 if operator is not assigned
        val = val1; 
    } else { // adjust val2 if operator is set
        val = val2; 
    }

    if (input === '0') {
        if (val !== '0' && val !== '-0') { // prevent leading zeroes
            val += input;
        }
    } else {
        if (val === '0') { // replace starting 0 with value 
            val = input;
        } else if (val === '-0') { // replace -0 with negative value
            val = '-' + input;
        } else { // append value 
            val += input;
        }
    }

    if (operator === '') { // update and display val1
        val1 = val; 
        $('#display').val(val1);
    } else { // update and display val2
        val2 = val; 
        $('#display').val(val2);
    }
}

function setOperator (input) {
    if (operator === '') { // update operator if it has not yet been assigned
        operator = input
        $('#display').val(val1);
    } else { // calculate and update operator
        calculate()
        operator = input; 
    }
}

function setDecimal() {
    let val = ''
    if (operator === '') {
        val = val1; 
    } else {
        val = val2; 
    }

    if (val.includes('.')) { 
        if (val.indexOf('.') === (val.length - 1)) { // remove decimal if it is in the last position of the string
            val = val.slice(0, -1)
        }
    } else {
        val += '.' // append decimal
    }

    if (operator === '') {
        val1 = val; 
        $('#display').val(val1);
    } else {
        val2 = val; 
        $('#display').val(val2);
    }
}

function setUnary() {
    let val = ''
    if (operator === '') {
        val = val1; 
    } else {
        val = val2; 
    }

    if (val.includes('-')) { // remove negative sign if it is already in string
        val = val.slice(1)
    } else { // add negative sign
        val = '-' + val
    }

    if (operator === '') {
        val1 = val; 
        $('#display').val(val1);
    } else {
        val2 = val; 
        $('#display').val(val2);
    }
}

function del() {
    let val = ''
    if (operator === '') {
        val = val1; 
    } else {
        val = val2; 
    }

    if (val.length !== 1) { // remove last position
        val = val.slice(0, -1)
    } else { // update value to zero if all of the string is deleted
        val = '0'
    }

    if (operator === '') {
        val1 = val; 
        $('#display').val(val1);
    } else {
        val2 = val; 
        $('#display').val(val2);
    }
}

function clearAll() { // reset all variables
    val1 = '0';
    operator = '';
    val2 = '0';
    result = '';
    $('#display').val(val1);
}

function calculate() {
    if (operator !== '') {
        if (operator === '+') {
            result = Number(val1) + Number(val2);
        }
        else if (operator === '-') {
            result = Number(val1) - Number(val2);
        }
        else if (operator === '*') {
            result = Number(val1) * Number(val2);
        }
        else if (operator === '÷') {
            if (Number(val2) === 0) { // handle division by zero
                $('#display').val('Error');
                val1 = '0';
                operator = '';
                val2 = '0';
                result = '';  
                return;  
            } else {
                result = Number(val1) / Number(val2);
            }
        }
        val1 = String(result); // update val1 to the calculation
        $('#display').val(val1); 
        operator = ''; // reset other variables
        val2 = '0';
    }
}