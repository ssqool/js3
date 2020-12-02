'use strict'

const magician = {
  hat: './assets/images/hat.png',
  _getPortrait() {
    if (this._portrait) return this._portrait;
    else return'./assets/images/magician.png';
    },
  'do magic'(){
    console.log(`ABRACADABRA
    The prototype of ${this.name} is `);
    console.log(Object.getPrototypeOf(this));
  }
};

//using mixin
let useMixin = {
  howl() {
    console.log('ARH-WOOOOOOOOOOOOOOOOOOOO');
  }
}

//create all classes
class Creature {
  constructor(name, age, species, portrait) {
    this.name = name;
    this.age = age;
    this.species = species;
    this._portrait = portrait;
  }

  say() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

class Human extends Creature {
  constructor(name, age, species, portrait, job) {
    super(name, age, species, portrait);
    this.job = job;
  }
}

class Dog extends Creature {
  constructor(name, age, species, portrait, color) {
    super(name, age, species, portrait);
    this.color = color;
  }
}

class Vampire extends Human {
  constructor(name, age, species, portrait, job, title) {
    super(name, age, species, portrait, job);
    this.title = title;
  }
}

class Werewolf extends Human {
  constructor(name, age, species, portrait, job) {
    super(name, age, species, portrait, job);
    this._isWolf = false;
  }

  transform() {
    if(this._isWolf === true) {
      this._isWolf = false;
      this.species = 'human';
      this._portrait = './assets/images/human.png';
      renderWerewolf();
    } else if(this._isWolf === false) {
      this._isWolf = true;
      this.species = 'werewolf';
      this._portrait = './assets/images/werewolf.png';
      renderWerewolf();
    }
  }
}

//set prototypes
Object.setPrototypeOf(Human.prototype, Creature.prototype);
Object.setPrototypeOf(Dog.prototype, Creature.prototype);
Object.setPrototypeOf(Vampire.prototype, Human.prototype);
Object.setPrototypeOf(Werewolf.prototype, Human.prototype);

//copy property from 'useMixin' (mixin)
Object.assign(Werewolf.prototype, useMixin);

let human = new Human('Oleg', 23, 'human','./assets/images/human.png','teacher');
let dog = new Dog('Chak', 5, 'dog', './assets/images/dog.png', 'white');
let vampire = new Vampire('Volodya', 103, 'vampire', './assets/images/vampire.png','bloodeater', 'count');
let werewolf = new Werewolf('Oleg', 23, 'human', './assets/images/human.png', 'teacher')

//render all
function changeStatus(element) {
  let head = document.querySelector('#head');
  let properties = document.querySelector('#properties');
  let active = document.querySelectorAll('.protoBtn')

  Array.from(active).map(item => item.classList.remove('active'))

  switch (element.textContent) {
    case 'no prototype' :
      Object.setPrototypeOf(magician, Object.prototype);
      head.src = "./assets/images/magician.png";
      properties.innerHTML = '';
      properties.insertAdjacentHTML('beforeend',
        `<button class="" onclick="magician['do magic']()">DO MAGIC</button>`);
      active[0].classList.add('active');
      break;
    case 'human prototype' :
      Object.setPrototypeOf(magician, human);
      head.src = human._portrait;
      properties.innerHTML = '';
      properties.insertAdjacentHTML('beforeend',
        `<button onclick="magician['do magic']()">DO MAGIC</button>
            <button onclick="human.say()">SAY HELLO</button>
            <br>name: ${human.name}
            <br>age: ${human.age}
            <br>species: ${human.species}
            <br>job: ${human.job}`);
      active[1].classList.add('active');
      break;
    case 'vampire prototype':
      Object.setPrototypeOf(magician, vampire);
      head.src = vampire._portrait;
      properties.innerHTML = '';
      properties.insertAdjacentHTML('beforeend',
        `<button onclick="magician['do magic']()">DO MAGIC</button>
            <button onclick="vampire.say()">SAY HELLO</button>
            <br>name: ${vampire.name}
            <br>age: ${vampire.age}
            <br>species: ${vampire.species}
            <br>job: ${vampire.job}
            <br>title: ${vampire.title}`);
      active[2].classList.add('active');
      break;
    case 'dog prototype':
      Object.setPrototypeOf(magician, dog);
      head.src = dog._portrait;
      properties.innerHTML = '';
      properties.insertAdjacentHTML('beforeend',
        `<button onclick="magician['do magic']()">DO MAGIC</button>
            <button onclick="dog.say()">SAY HELLO</button>
            <br>name: ${dog.name}
            <br>age: ${dog.age}
            <br>species: ${dog.species}
            <br>job: ${dog.color}`);
      active[3].classList.add('active');
      break;
    case 'werewolf prototype' :
      renderWerewolf();
      active[4].classList.add('active');
      break;
  }

}

//warewolf function
function renderWerewolf() {
  Object.setPrototypeOf(magician, werewolf);
  head.src = werewolf._portrait;
  properties.innerHTML = '';
  properties.insertAdjacentHTML('beforeend',
    `<button onclick="magician['do magic']()">DO MAGIC</button>
            <button onclick="werewolf.say()">SAY HELLO</button>
            <button onclick="werewolf.transform()" onclick="changeStatus">TRANSFORM</button>
            ${werewolf._isWolf === true ? `<button onclick="werewolf.howl()" >HOWL</button>` : ''}
            <br>name: ${werewolf.name}
            <br>age: ${werewolf.age}
            <br>species: ${werewolf.species}
            <br>job: ${werewolf.job}`);
}
