'use strict'

// //AJAX и общение с сервером: XMLHttpRequest
//
// let rub = document.querySelector('#rub');
// let dol = document.querySelector('#dol');
//
// rub.addEventListener('input', () => {
//   //создаем xmlrequest
//   const request = new XMLHttpRequest();
//
//   //.open() - собирает настройки которые помогут сделать запрос
//   //1.method - вид запроса (GET, POST)
//   //2.url - путь к нашему серверу
//   //3.async - асинхронный или не асихронный
//   //4.login 5.pass - некоторые запросы можно делать только авторизированным
//   // request.open(method, url, async, login, pass);
//   request.open('GET', 'obj.json');
//   //http заголовки
//   request.setRequestHeader('Content-type', 'application/json; charset=utf8');
//   //отправляем запрос
//   request.send();
//
//
//   //status - статус запросса(код состояния HTTP 404...)
//   //statusText - текстовое описание 404 и т.д.
//   //response - ответ от сервера
//   //readyState - текущие состояние запроса
//   request.addEventListener('load', ()=> {
//     if (request.status === 200) {
//       console.log(request.response);
//       const data = JSON.parse(request.response);
//       dol.value = rub.value * data.currency.usd ;
//     } else {
//       dol.value = 'Что-то пошло не так';
//     }
//   });
// });
//
// //Promise
//
// console.log('Запрос данных...');
//
// //помещаем в переменную с помощью конструктора промис во внутрь которой помещаем функцию
// //функия принимаем 2 аргумента(resolve - выполнилось правильно, reject - не правльно)
// const req = new Promise(function (resolve, reject){
//   setTimeout(()=> {
//     console.log('Подготовка данных...');
//
//     const product = {
//       name: 'TV',
//       price: 2000
//     };
//     //resolve - если все пошло правильно
//     //reject - если что-то пошло не так
//     resolve(product);
//   }, 2000);
//
// });
//
//
// //then - обрабатываем положительный результат(принимает аргумент resolve)
// //catch - обрабатываем отрицательный результат(принимает аргумент reject)
// req.then((product) => {
//   //возвращаем новый промис
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       product.state = 'order';
//       resolve(product);
//     }, 2000);
//   });
// }).then(data => {
//   data.modify = true;
//   return data;
// }).then(product => {
//   console.log(product);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       product.state = 'Order received';
//       //ошибка
//       reject();
//     }, 2000);
//   });
// }).then(data => {
//   console.log(data.state)
// }).catch(() => {
//   console.error('Произошла ошибка!')
//   //finally - по вызывается по завершению всей цепочки промисов(выполняется в любом исходе промисов)
// }).finally(() => {
//   console.log('Finally')
// });
//
//
// const test = time => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), time)
//   })
// }
// Promise.race([test(1000), test(2000)]).then(() => {
//   console.log('After finishing(promise1)');
// });
//
// Promise.all([test(1000), test(2000)]).then(() => {
//   console.log('After finishing(all)');
// });


// //fetch
// //Получаем данные (получаем url)
// fetch('http://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=71a37a77fd959a94e7a0e1a26cfe21c0')
//   //возвращается промис и обрабатываем с помощью цепочки then
//   //response распарсиваем json файл
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data)
//   })
//   .catch(() => console.error('sergey error'));
// //Получаем данные (получаем url)

function getFormattedDate(dateObject, day=0) {
  let todata = dateObject.getDate() + day < 10 ? `0${dateObject.getDate() + day}` : `${dateObject.getDate() + day}`;
  let tomonth = dateObject.getMonth() < 10 ? ("" + dateObject.getMonth()+1) : dateObject.getMonth()+1;

  return `${todata}.${tomonth}`;
}

function forecast (data, day) {
  document.querySelector('.weather').insertAdjacentHTML('beforeend', `
    <div class="card">
      <p class="date">${getFormattedDate(new Date(), day)}</p>
      <p class="align">${data.timezone}</p>
      <img src="https://openweathermap.org/img/wn/${data.daily[day].weather[0]['icon']}@2x.png" alt="sun">
      <p class="degree">${Math.round(data.daily[day].temp.day - 273)}&#176</p>
    </div>
    `);
}

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=50.43&lon=30.52&exclude={part}&appid=71a37a77fd959a94e7a0e1a26cfe21c0')
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    forecast (data, 0);
    forecast (data, 1);
    forecast (data, 2);
    forecast (data, 3);
    forecast (data, 4);
    forecast (data, 5);
    forecast (data, 6);
  })
  .catch(() => console.error('sergey error'));
//Получаем данные (получаем url)
