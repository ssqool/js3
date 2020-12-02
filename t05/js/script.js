'use strict';

let allValues = new Map();

let salads = new Map();
let mainDishes = new Map();
let deserts = new Map();
let drinks = new Map();

salads.set('Greek Salad', '$5.99');
salads.set('Caesar Salad', '$7.99');

mainDishes.set('Margherita Pizza', '$12.50');
mainDishes.set('Tomato Soup', '$6.99');
mainDishes.set('Burger', '$10.00');

deserts.set('Cheesecake', '$4.99');
deserts.set('Chocolate Ice-Cream', '$2.50');
deserts.set('Fruit Salad', '$3.99');

drinks.set('Lemonade', '$3.20');
drinks.set('Green Tea', '$1.50');
drinks.set('Coffee', '$1.99');

allValues.set('Salads', salads);
allValues.set('Main Dishes', mainDishes);
allValues.set('Deserts', deserts);
allValues.set('Drinks', drinks);

const menu = document.querySelector('.menu');

allValues.forEach((value, key) => {
  let valueClass = key.split(' ').join('');

  menu.insertAdjacentHTML('beforeend', `
    <div class="dish ${valueClass}"> 
      <h3>${key}</h3>
    </div>`)
  value.forEach((v, k) => {
    document.querySelector(`.${valueClass}`).insertAdjacentHTML('beforeend', `
      <p><span>${k}</span><span>${v}</span></p>
    `);
  })
})

console.log(allValues)
