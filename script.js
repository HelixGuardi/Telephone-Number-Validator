const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

/*
NECESITAMOS: (todo list)
  - Saber si el número es valido o no | HECHO
  - Mensaje del resultado | HECHO
  - Mensaje de error (Alert) | HECHO
*/

const isValidNumber = input => {
  if (input === '') {
    alert('Please provide a phone number');
    resultsDiv.className = 'hide-result'
    return;
  } else {
    resultsDiv.className = 'show-result'
  }

  const countryCode = '^(1\\s?)?';
  /*
    ^ --> inicio de la cadena
    (1\\s?)? --> el número 1 es el código de país [opcional]
                  --> el 1 PUEDE estar presente [1 o '']
                  --> PUEDE estar seguido por un espacio o no [' ' o '']
                  --> Todo es opcional [el código puede estar o no]
   */

  const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';
  /*
    El código de area en este caso puede venir en dos formatos:
      --> \\([0-9]{3}\\) ,es decir, tres dígitos dentro de paréntesis
      --> [0-9]{3} ,es decir, simplemente tres dígitos sin paréntesis
  */

  const spaceDashes = '[\\s\\-]?';
  /*
    Un espacio (\s) o un guión (-) opcional también
  */

  const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$';
  /*
    [0-9]{3} --> tres dígitos
    [\\s\\-]? --> espacio o guión opcional
    [0-9]{4} --> Cuatro dígitos
    $ --> fin de la cadena
  */

  const phoneRegex = new RegExp(
    `${countryCode}${areaCode}${spaceDashes}${phoneNumber}`
  )
  /*
  utilizo el constructor "new RegExp()" porque es útil cuando se quiere 
  construir dinámicamente una expresión regular con strings
  */

  const resultText = document.createElement('p');
  resultText.className = 'result-message';
  phoneRegex.test(input) ? (resultText.style.color = 'green') : (resultText.style.color = 'red')
  resultText.textContent = `${phoneRegex.test(input) ? 'Valid' : 'Invalid'} US number: ${input}`
  resultsDiv.appendChild(resultText)
  resultsDiv.scrollTop = resultsDiv.scrollHeight;
  resultsDiv.scrollTo({
    top: resultsDiv.scrollHeight,
    behavior: 'smooth'
  });
};

//BOTONES
checkBtn.addEventListener('click', () => {
  isValidNumber(userInput.value);
  userInput.value = '';
});

userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    isValidNumber(userInput.value);
    userInput.value = '';
  }
});

clearBtn.addEventListener('click', () => {
  resultsDiv.className = 'hide-result'
  resultsDiv.textContent = '';
})
