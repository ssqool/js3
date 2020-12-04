'use strict';

const chatMessage = document.querySelector('.chat-message');
const inputText = document.querySelector('#input-text');
const inputButton = document.querySelector('#input-button');

function userTextContent(arg) {
  chatMessage.insertAdjacentHTML('afterbegin', `
    <div class="dialog-user">
      <div class="message-user">${arg}</div>
    </div>
  `);
}

function jarvisTextContent(arg) {
  chatMessage.insertAdjacentHTML('afterbegin', `
    <div class="dialog-jarvis">
      <div class="message-jarvis">${arg}</div>
    </div>
  `);
}

function* generateSequence() {
  yield 'Hello, I am J.A.R.V.I.S.';
  yield 'I believe I\'ve already said it, but, sure, hello again!';
  yield 'You are malfunctioning.';
  yield 'I believe your intentions to be hostile.';
  return 'I will not respond to that.';
}

let generator = generateSequence();
let one = generator;

inputButton.addEventListener('click', () => {
  userTextContent(inputText.value);
  setTimeout(()=> {
    if(inputText.value === 'hi' || inputText.value === 'hello' || inputText.value === 'bonjour') {
      if(one.done === true) {
        jarvisTextContent('I will not respond to that.');
      } else {
        one = generator.next();
        jarvisTextContent(one.value);
      }
    } else {
      jarvisTextContent('I don\'t understand.');
    }
    inputText.value = '';
  },200)
})
