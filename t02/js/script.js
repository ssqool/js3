'use strict';

class Human {
  constructor(firstName, lastName, gender, age, calories) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.calories = calories;
  }

  sleepFor() {
    dialog.textContent = 'I\'m sleeping';
    dialog.showModal();
    setTimeout(()=> {
      dialog.close();

      dialog.textContent = 'I\'m awake now';
      dialog.showModal();
      setTimeout(()=> {
        dialog.close();
      }, 1000)
    }, 2000)

  }
  feed() {
    dialog.textContent = 'Nom nom nom';
    dialog.showModal();
    setTimeout(()=> {
      dialog.close();
      human.calories += 200;
      humanProperties();
    }, 10000)
  }
}


class Superhero extends Human {
  constructor(firstName, lastName, gender, age, calories) {
    super(firstName, lastName, gender, age, calories);
  }

  fly() {
    dialog.textContent = 'I\'m flying!'
    dialog.showModal();
    setTimeout(()=> {
      dialog.close();
    }, 10000)
  }

  flightWithEvil() {
    dialog.textContent = 'Khhhh-chh... Bang-g-g-g... Evil is defeated!'
    dialog.showModal();
    setTimeout(()=> {
      dialog.close();
    }, 5000)
  }
}

let human = new Human('Vasyl', 'Makhno', 'man', 42, 521);
let hero = new Superhero('Molfar', 'Nechai', 'man', 22, 500);

const properties = document.querySelector('#properties');
const imageFace = document.querySelector('#head');
const dialog = document.querySelector('#dialog');

//human properties and abilities
function humanProperties() {
  imageFace.src = './assets/images/human.png'
  properties.innerHTML =`
    <button id="turning">Turn into superhero</button>
    <button id="eat">Eat</button>
    <button id="sleep">Sleep</button>
    <p>First name: ${human.firstName}</p>
    <p>Last name: ${human.lastName}</p>
    <p>Gender: ${human.gender}</p>
    <p>Age: ${human.age}</p>
    <p>Calories: <span class="calories">${human.calories}</span></p>
`

  const turning = document.querySelector('#turning');
  const eating = document.querySelector('#eat');
  const sleeping = document.querySelector('#sleep');



  sleeping.addEventListener('click', human.sleepFor)
  eating.addEventListener('click', human.feed);
  eating.addEventListener('click', humanProperties);
  turning.addEventListener('click',()=> (human.calories > 500) ?  heroProperties() : alert('Not enough calories to switch'));

}

humanProperties();

//hero properties and abilities
function heroProperties() {
  imageFace.src = './assets/images/magician.png'
  properties.innerHTML = `
    <button id="turn">Turn into human</button>
    <button id="fly">Fly</button>
    <button id="evilFight">Fight with evil</button>
    <p>First name: ${hero.firstName}</p>
    <p>Last name: ${hero.lastName}</p>
    <p>Gender: ${hero.gender}</p>
    <p>Age: ${hero.age}</p>
    <p>Calories: <span class="calories">${hero.calories}</span></p>
`
  const turn = document.querySelector('#turn');
  const fly = document.querySelector('#fly');
  const evilFight = document.querySelector('#evilFight');



  fly.addEventListener('click', hero.fly);
  evilFight.addEventListener('click', hero.flightWithEvil);
  turn.addEventListener('click', humanProperties);
}

//subtract calories

setInterval(()=> {
  human.calories--;
  document.querySelector('.calories').innerHTML = human.calories;
  human.calories < 1 ? human.calories = 1 : human.calories;
}, 200)
