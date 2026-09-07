import { Stack } from '../utils/data-stractures.js';

export class Binary {
  toDecUtil(ns, b) {
    const a = String(ns);
    const stack = new Stack();
    var result = 0;
    var base = b;
    for (let i = 0; i < a.length; i++) {
      stack.add(Number(a[i]));
    }

    for (let i = 0; i < a.length; i++) {
      const value = stack.get();
      if (value == 1) {
        result += Math.pow(base, i);
      }
    }

    return result;
  }
  bin2dec(binary) {
    return this.toDecUtil(binary, 2);
  }

  oct2dec(octal) {
    return this.toDecUtil(octal, 8);
  }

  hex2dec(hexadecimal) {
    const hex = hexadecimal;
    const stack = new Stack();
    var result = 0;
    var base = 16;
    for (let i = 0; i < hex.length; i++) {
      stack.add(hex[i]);
    }

    for (let i = 0; i < hex.length; i++) {
      var value = stack.get().toUpperCase();
      switch (value) {
        case 'A':
          value = 10;
          break;
        case 'B':
          value = 11;
          break;
        case 'C':
          value = 12;
          break;
        case 'D':
          value = 13;
          break;
        case 'E':
          value = 14;
          break;
        case 'F':
          value = 15;
          break;
      }

      result += Math.pow(base, i) * value;
    }

    return result;
  }

  dec2bin(decimal) {
    var result = [];
    const stack = new Stack();

    for (let i = 0; decimal >= 1; i++) {
      if (decimal % 2 == 0) {
        stack.add(0);
        decimal = decimal / 2;
      } else {
        stack.add(1);
        decimal = Math.floor(decimal / 2);
      }
    }
    return Number(stack.dataset.reverse().join(''));
  }

  dec2oct(decimal) {
    const stack = new Stack();

    for (let i = 0; decimal >= 1; i++) {
      stack.add(Math.floor(decimal % 8));
      decimal = decimal / 8;
    }
    return Number(stack.dataset.reverse().join(''));
  }

  dec2hex(decimal) {
    const stack = new Stack();

    for (let i = 0; decimal >= 1; i++) {
      const value = Math.floor(decimal % 16);
      if (value > 9) {
        switch (value) {
          case 10:
            stack.add('A');
            break;
          case 11:
            stack.add('B');
            break;
          case 12:
            stack.add('C');
            break;
          case 13:
            stack.add('D');
            break;
          case 14:
            stack.add('E');
            break;
          case 15:
            stack.add('F');
            break;
        }
      } else {
        stack.add(value);
      }
      decimal = decimal / 16;
    }

    return String(stack.dataset.reverse().join(''));
  }
}


