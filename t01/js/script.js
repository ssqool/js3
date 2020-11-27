"use strict";

class Film {
  constructor(option) {
    this.name = option.name
    this.idd = option.idd
    this.premier = option.premier
    this.actors = option.actors
    this.description = option.description
    this.image = option.image
    this.favorite = option.favorite
  }

  addToFavorite() {
    this.favorite = true;
  }

  removeFromFavorite() {
    this.favorite = false;
  }
}

const buttonAll = document.querySelector('.all');
const favorite = document.querySelector('.favorite');

const films = [
  new Film({
  name: 'The Green Mile',
  idd: 'greenMile',
  premier: '1999',
  actors: ['Tom Hanks', 'David Morse', 'Michael Jeter', 'Barry Pepper'],
  description: 'American fantasy drama film written and directed by Frank Darabont and based on Stephen King\'s 1996 novel of the same name. It stars Tom Hanks as a death row corrections officer during the Great Depression who witnesses supernatural events that occur after an enigmatic inmate (Michael Clarke Duncan) is brought to his facility. David Morse, Bonnie Hunt, Doug Hutchison and James Cromwell appear in supporting roles.',
  image: 'http://baskino.me/uploads/images/2012/381/eulx363.jpg',
  favorite: false
}),
  new Film({
    name: 'Forrest Gump',
    idd: 'forrestGump',
    premier: '1994',
    actors: ['Tom Hanks', 'Robin Wright', 'Sally Field', 'Gary Sinise'],
    description: 'American epic romantic comedy-drama film directed by Robert Zemeckis and written by Eric Roth. It is based on the 1986 novel of the same name by Winston Groom and stars Tom Hanks, Robin Wright, Gary Sinise, Mykelti Williamson and Sally Field. The story depicts several decades in the life of Forrest Gump (Hanks), a slow-witted but kind-hearted man from Alabama who witnesses and unwittingly influences several defining historical events in the 20th century United States. The film differs substantially from the novel.',
    image: 'http://baskino.me/uploads/images/2012/263/ofyr402.jpg',
    favorite: false
  }),
  new Film({
    name: 'Leon',
    idd: 'leon',
    premier: '1994',
    actors: ['Jean Reno', 'Gary Oldman', 'Danny Aiello', 'Natalie Portman'],
    description: 'Léon is an Italian hitman living a solitary life in New York City\'s Little Italy. His work comes from a mafioso named "Old Tony". One day, Léon meets Mathilda Lando, a lonely 12-year-old girl',
    image: 'http://baskino.me/uploads/images/2012/604/dynm385.jpg',
    favorite: false
  }),
  new Film({
    name: 'WALL-E',
    idd: 'walle',
    premier: '2008',
    actors: ['Ben Burtt', 'Elissa Knight', 'Jeff Garlin', 'Fred Willard'],
    description: 'WALL-E, short for Waste Allocation Load Lifter Earth-class, is the last robot left on Earth. He spends his days tidying up the planet, one piece of garbage at a time. But during 700 years, WALL-E has developed a personality, and he\'s more than a little lonely.',
    image: 'http://baskino.me/uploads/images/2011/956/sxyj923.jpg',
    favorite: false
  }),
  new Film({
    name: 'Joker',
    idd: 'joker',
    premier: '2019',
    actors: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz', 'Frances Conroy'],
    description: 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character.',
    image: 'http://baskino.me/uploads/images/2019/986/utnf344.jpg',
    favorite: false
  }),
  new Film({
    name: 'Spider-Man',
    idd: 'spiderMan',
    premier: '2002',
    actors: ['Tobey Maguire', 'Willem Dafoe', 'Kirsten Dunst', 'James Franco'],
    description: 'Spider-Man is a 2002 American superhero film based on the Marvel Comics character of the same name. Directed by Sam Raimi from a screenplay by David Koepp, it is the first installment in the Spider-Man trilogy, and stars Tobey Maguire as the title character, alongside Willem Dafoe, Kirsten Dunst, James Franco, Cliff Robertson, and Rosemary Harris. The film centers on outcast teen genius Peter Parker, who develops spider-like superhuman abilities after being bitten by a genetically-altered spider.',
    image: 'http://baskino.me/uploads/images/2012/824/eamt856.jpg',
    favorite: false
  })
];

let set = new Set();

function render() {
  buttonAll.style.background = 'blue';
  favorite.style.background = 'dodgerblue';

  let film1 = document.querySelector('.film');
  let image = document.querySelector('.image');
  let allList = document.querySelector('.list');
  allList.innerHTML = `
          <ul>
            <li class="a">${films[0].name}</li>
            <li>${films[1].name}</li>
            <li>${films[2].name}</li>
            <li>${films[3].name}</li>
            <li>${films[4].name}</li>
            <li>${films[5].name}</li>
          </ul>
      `
  let list = document.querySelectorAll('li');
  Array.from(list).map(item =>{
    item.addEventListener('click', (e) => {

      Array.from(list).map(item => item.classList.remove('a'));
      let target = e.target;
      let b = films.filter(item => item.name.includes(target.textContent));
      film1.innerHTML = `
          <div class="first-line">
            <h2>${b[0].name}</h2>
            <div class="like ${b[0].idd}" ${b[0].favorite === true ? `style="color: red"` : ''}>&#9829</div>
          </div>
          <p>${b[0].premier}</p>
          <div class="actors">
            <div class="first-actor actor">${b[0].actors[0]}</div>
            <div class="second-actor actor">${b[0].actors[1]}</div>
            <div class="third-actor actor">${b[0].actors[2]}</div>
            <div class="fourth-actor actor">${b[0].actors[3]}</div>
          </div>
          <p>${b[0].description}</p>
        </div>
        `;
      image.innerHTML = `
    <div class="image">
          <img class="film-image" src="${b[0].image}" alt="">
        </div>
    `;

      target.classList.add('a');
      let like = document.querySelector('.like');
      like.addEventListener('click', (e)=> {
        if (b[0].favorite === true) {
          b[0].removeFromFavorite();
          e.target.style.color = 'grey';
          set.delete(b[0]);
        } else {
          b[0].addToFavorite();
          set.add(b[0]);
          e.target.style.color = 'red';
        }
      });
    });
  });
}

render();



  buttonAll.addEventListener('click', render);




function fav() {

  favorite.addEventListener('click', (e) => {
    let arrayFromSet = Array.from(set);
    let film1 = document.querySelector('.film');
    let image = document.querySelector('.image');
    let allList = document.querySelector('.list');
    let setLength = arrayFromSet.length;

    buttonAll.style.background = 'dodgerblue';
    favorite.style.background = 'blue';

    allList.innerHTML = `
          <ul>
            <li class="a">${setLength > 0 ? arrayFromSet[0].name : ''}</li>
            <li>${setLength > 1 ? arrayFromSet[1].name : ''}</li>
            <li>${setLength > 2 ? arrayFromSet[2].name : ''}</li>
            <li>${setLength > 3 ? arrayFromSet[3].name : ''}</li>
            <li>${setLength > 4 ? arrayFromSet[4].name : ''}</li>
            <li>${setLength > 5 ? arrayFromSet[5].name : ''}</li>
          </ul>
      `

    let list = document.querySelectorAll('li');

    Array.from(list).map(item => {
      item.addEventListener('click', (e) => {

        Array.from(list).map(item => item.classList.remove('a'));

        let target = e.target;
        let b = films.filter(item => item.name.includes(target.textContent));

        film1.innerHTML = `
          <div class="first-line">
            <h2>${b[0].name}</h2>
            <div class="like ${b[0].idd}" ${b[0].favorite === true ? `style="color: red"` : ''}>&#9829</div>
          </div>
          <p>${b[0].premier}</p>
          <div class="actors">
            <div class="first-actor actor">${b[0].actors[0]}</div>
            <div class="second-actor actor">${b[0].actors[1]}</div>
            <div class="third-actor actor">${b[0].actors[2]}</div>
            <div class="fourth-actor actor">${b[0].actors[3]}</div>
          </div>
          <p>${b[0].description}</p>
          </div>`;
        image.innerHTML = `
          <div class="image">
            <img class="film-image" src="${b[0].image}" alt="">
          </div>`;

        target.classList.add('a');

        let like = document.querySelector('.like');

        like.addEventListener('click', (e) => {
          if (b[0].favorite === true) {
            b[0].removeFromFavorite();
            e.target.style.color = 'grey';
            set.delete(b[0]);
            return fav();
          } else {
            b[0].addToFavorite();
            set.add(b[0]);
            e.target.style.color = 'red';
          }
        });
      });
    });
  });
}
fav();






