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

function Creature(name, age, species) {
  this.name = name;
  this.age = age;
  this.species = species;
  this.say = () => {
    console.log(`Hello, my name is ${this.name}`);
  }
}

function Human(name, age, species, job){
  Creature.call(this, name, age, species);
  this.job = job;
}

function Dog(name, age, species, color){
  Creature.call(this, name, age, species);
  this.color = color;
}

function Vampire(name, age, species, job, title){
  Human.call(this, name, age, species, job);
  this.title = title;
}

Object.setPrototypeOf(Human.prototype, Creature.prototype);
Object.setPrototypeOf(Dog.prototype, Creature.prototype);
Object.setPrototypeOf(Vampire.prototype, Human.prototype);

let human = new Human('Oleg', 23, 'human', 'good');
let dog = new Dog('Chak', 5, 'dog', 'white');
let vampire = new Vampire('Volodya', 103, 'vampire', 'bloodeater', 'count');

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
      head.src = "./assets/images/human.png";
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
      head.src = "./assets/images/vampire.png";
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
      head.src = "./assets/images/dog.png";
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
  }

}