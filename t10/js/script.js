'use strict'

let compareCounter = document.querySelector('#compare-counter');
let counterOfCard = 0;

let searchResult = document.querySelector('.search-result');
let searchingCard = document.querySelector('.searching-card');
const buttonSearch = document.querySelector('#button-search');
const buttonRandom = document.querySelector('#button-random');
let arr = [['Superhero', 'strength', 'intelligance', 'speed', 'durability', 'power', 'combat']];
let cardToAddId;

//Render Google Chart
function drawGoogleChart (arg) {
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(arg);

    var options = {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',

      },
      // backgroundColor: 'green',

    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}

//Searching card
const searchRequest = async (arg) => {
  const url = `https://superheroapi.com/api.php/101907825127433/search/${arg}`;
  // let f = url;
  const response = await fetch(url);
  const data = await response.json();
  const searchingCards = document.querySelector('.searching-card');
  try {
      for (let i = 0; i < data.results.length; i++) {
        searchingCards.insertAdjacentHTML('beforeend', `
          <div class="searching-characters hero${data.results[i].id}">
            <p class="bold-name">${data.results[i].name}</p>
            <p>${data.results[i].biography['full-name']}</p>
          </div>
        `)
      }
    let searchingCard = document.querySelector(`.searching-card`);
    console.log('oleg');
    searchingCard.addEventListener('click', (e) => {
      let target = e.target;
      let cardAllClasses = target.closest('.searching-characters').classList.value;
      let idFromCard = cardAllClasses.slice(cardAllClasses.indexOf('hero') + 4);
      compareCard(idFromCard);
    });
  } catch(err) {
    console.log(err);
    alert('character with given name not found');
  }
}

//Random card
const randomCard = async (arg) => {
  let url = `https://superheroapi.com/api.php/101907825127433/${arg}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const searchingCards = document.querySelector('.searching-card');
  searchingCard.innerHTML = '';
  searchingCards.insertAdjacentHTML('beforeend', `
          <div class="searching-characters hero${data.id}">
            <p class="bold-name">${data.name}</p>
            <p>${data.biography['full-name']}</p>
          </div>
        `);
  cardToAddId = data.id;
  let hero = document.querySelector(`.hero${data.id}`);
  hero.addEventListener('click', () => {compareCard(cardToAddId)});
}

//add card to compare
const compareCard = async (arg) => {
  let url = `https://superheroapi.com/api.php/101907825127433/${arg}/powerstats`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  let toAddInScheme = [];
  for(let key in data) {
    if (key !== 'response' && key !== 'id') {
      console.log(data.length)
      let temp = [];
      if (data[key] === 'null') {
        data[key] = 0;
      }
      temp.push(data[key]);
      toAddInScheme.push(temp);
    }
  }
  toAddInScheme = toAddInScheme
    .join(', ')
    .split(', ')
    .map((item,index) => index === 0 ? item : Number(item));
  arr.push(toAddInScheme);

  document.getElementById('columnchart_material').innerHTML = '';
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(arr);

    var options = {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      },
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

  counterOfCard += 1;
  compareCounter.textContent = counterOfCard;
  console.log(arr);
}

buttonSearch.addEventListener('click', () => {
  searchingCard.innerHTML = '';
  searchRequest(document.querySelector('#superhero-search').value);
  searchRequest(document.querySelector('#superhero-search').value);
  searchResult.style.display = 'block';

});

buttonRandom.addEventListener('click', () => {
  let rand = Math.round(1 - 0.5 + Math.random() * (732 - 1 + 1));
  randomCard(rand);
});