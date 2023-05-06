// Seleciona os elementos da calculadora
const display = document.querySelector('.calculator-display');
const buttons = document.querySelectorAll('.calculator-button');

// Inicializa as variáveis necessárias
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

// Adiciona um ouvinte de eventos para cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Lógica para cada botão
    switch (value) {
      case 'C':
        operand1 = null;
        operand2 = null;
        operator = null;
        result = null;
        display.textContent = '0';
        break;

      case '+':
      case '-':
      case 'x':
      case '/':
        if (operand1 === null) {
          operand1 = Number(display.textContent);
          operator = value;
          display.textContent = '';
        } else {
          operand2 = Number(display.textContent); // Se o usuário digitar um operador após ter digitado o primeiro operando
          result = calculate(operator, operand1, operand2); // o segundo operando é o próprio display
          operand1 = result; // Calcula o resultado e o armazena no primeiro operando
          operand2 = null; // Zera o segundo operando e o operador
          operator = value; // para que o usuário possa continuar calculando
          display.textContent = ''; // com o resultado obtido
        } 
        break;

      case '=':
        if (operand1 !== null && operand2 === null) { // Se o usuário apertar = sem ter digitado o segundo operando
          operand2 = Number(display.textContent); // o segundo operando é o próprio display
          result = calculate(operator, operand1, operand2); // Calcula o resultado
          operand1 = null; // Zera os operandos e o operador
          operand2 = null; // para que o usuário possa continuar calculando
          operator = null; // com o resultado obtido
          display.textContent = result.toString(); // Exibe o resultado
        }
        break;

      default:
        if (display.textContent === '0') { // Se o display estiver zerado, substitui o valor
          display.textContent = value; // do display pelo valor do botão
        } else { // Se o display não estiver zerado, concatena o valor do botão ao display
          display.textContent += value; // para formar um número
        }
    }
  });
});

// Função para realizar o cálculo com base nos operandos e no operador
function calculate(operator, operand1, operand2) {
  switch (operator) {
    case '+':
      return operand1 + operand2;

    case '-':
      return operand1 - operand2;

    case 'x':
      return operand1 * operand2;

    case '/':
      return operand1 / operand2;
  }
}
