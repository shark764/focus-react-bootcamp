var on = false,
  lastprinted = '',
  currentfunc = '',
  memory;

function testoverflow() {
  var overflowflag;
  if (memory >= 1000000000000) {
    turn('error');
    overflowflag = true;
  } else overflowflag = false;
  return overflowflag;
}

function findmaxlength(location) {
  var maxlength = 12;
  if (location.indexOf('-', 0) !== -1) {
    maxlength++;
  }
  if (location.indexOf('.', 0) !== -1) {
    maxlength++;
  }
  return maxlength;
}

function showresult(lg, hf) {
  memory = memory.toString();
  memory = parseFloat(memory.substring(0, findmaxlength(memory)));
  document.calculator.display.value = memory;
  lastprinted = lg;
  currentfunc = hf;
}

function turn(onoff) {
  if (onoff === 'ce') {
    if (on) {
      document.calculator.display.value = '0';
    }
  } else {
    switch (onoff) {
      case 'onc':
        document.calculator.display.value = '0';
        on = true;
        break;
      case 'error':
        document.calculator.display.value = 'ERROR';
        break;
      case 'off':
        document.calculator.display.value = '';
        on = false;
        break;
      default:
        break;
    }
    currentfunc = '';
    memory = null;
  }
  lastprinted = '';
}

function number(input) {
  if (on) {
    if (document.calculator.display.value.length < findmaxlength(document.calculator.display.value) || lastprinted !== 'number') {
      if (!(document.calculator.display.value === '0' && (input === '00' || input === '0'))) {
        if (lastprinted === 'number' && document.calculator.display.value !== '0') {
          document.calculator.display.value += input;
          lastprinted = 'number';
        } else if (input !== '00') {
          document.calculator.display.value = input;
          lastprinted = 'number';
        }
      }
    }
  }
}

function func(symbool) {
  if (on && document.calculator.display.value !== 'ERROR') {
    if (memory === null) {
      memory = parseFloat(document.calculator.display.value);
      lastprinted = 'func';
      currentfunc = symbool;
    } else if (document.calculator.display.value === '0' && currentfunc === '/') {
      turn('error');
    } else {
      eval('memory = ' + memory + currentfunc + '(' + document.calculator.display.value + ');');
      if (!testoverflow()) {showresult('func', symbool);}
    }
  }
}

function result(name) {
  var value;
  if (on && document.calculator.display.value !== 'ERROR') {
    if (memory !== null) {
      value = document.calculator.display.value;
      if (name === 'procent'){ value = (memory * parseFloat(document.calculator.display.value)) / 100;}
      eval('memory = ' + memory + currentfunc + '(' + value + ');');
      if (!testoverflow()) {
        showresult('name', '');
        memory = null;
      }
    }
  }
}

function dot() {
  var maxlength = 12;
  if (on && document.calculator.display.value !== 'ERROR') {
    if (document.calculator.display.value.indexOf('-', 0) !== -1) {maxlength++;}
    if (
      (lastprinted === 'number' || (document.calculator.display.value = '0')) &&
      !(document.calculator.display.value.length >= maxlength) &&
      document.calculator.display.value.indexOf('.', 0) === -1
    ) {
      document.calculator.display.value += '.';
      lastprinted = 'number';
    }
  }
}

function negative() {
  if (on && lastprinted === 'number' && document.calculator.display.value !== 'ERROR') {
    if (document.calculator.display.value.indexOf('-', 0) === -1){ document.calculator.display.value = '-' + document.calculator.display.value;}
    else {document.calculator.display.value = document.calculator.display.value.substring(1, 14);}
  }
}
