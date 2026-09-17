let [stack, result_display, result_display_meta, expression_display, inputs] = [
  new Stack(),
  document.querySelector('.display .result-display .result'),
  document.querySelector('.display .result-display .meta'),
  document.querySelector('.display .expression-display .expression'),
  document.querySelectorAll('.inputs .input'),
];

window.addEventListener('keydown', (event) => {
  const keyboard_inputs = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '-',
    '+',
    '/',
    '*',
  ];
  if (keyboard_inputs.indexOf(event.key) != -1) {
    result_display.textContent = event.key;
    expression_display.textContent += event.key;
  } else {
    switch (event.key) {
      case 'Backspace' || 'Delete':
        let expression = expression_display.textContent.split('');
        expression.pop();
        expression_display.textContent = expression.join('');
        break;

      case 'Enter':
        result_display_meta.textContent = 'answer';
        result_display.textContent = eval(expression_display.textContent);
        storage.setData('result_display', result_display.textContent);
        storage.setData('last-item', '=');
        break;

      case 'Escape':
        window.history.back();
        break;
    }
  }
});

inputs.forEach((option) => {
  option.addEventListener('click', () => {
    let key = option.dataset.value;
    switch (key) {
      case 'pow':
        const square = Math.pow(expression_display.textContent, 2);
        result_display.textContent = square;
        stack.add(square);
        break;
      case 'root':
        const square_root = Math.sqrt(expression_display.textContent);
        result_display.textContent = square_root;
        stack.add(square_root);
        break;
      case 'fact':
        let factorial = 1;
        let integer = expression_display.textContent;
        while (integer >= 1) {
          factorial *= integer--;
        }
        result_display.textContent = factorial;
        stack.add(factorial);
        break;
      case 'del':
        let expression = expression_display.textContent.split('');
        expression.pop();
        expression_display.textContent = expression.join('');
        break;
      case '%':
        const percent = result_display.textContent / 100;
        result_display.textContent = percent;
        stack.add(percent);
        break;
      case 'C':
        result_display.textContent = '';
        stack.clear();
        break;
      case 'CE':
        expression_display.textContent = result_display.textContent = '';
        stack.clear();
        break;
      case '=':
        result_display_meta.textContent = 'answer';
        const equal = eval(expression_display.textContent);
        result_display.textContent = equal;
        stack.add(equal);
        break;
      default:
        if (!stack.empty()) {
          expression_display.textContent = stack.get() + key;
          result_display.textContent = key;
        } else {
          expression_display.textContent += key;
          result_display.textContent = key;
        }
        break;
    }
  });
});
