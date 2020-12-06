'use strict'


//looking for a attribute
const images = document.querySelectorAll('[data-src]')


//Обработчик события
function preloadImage(img) {
  const src = img.getAttribute('data-src');
  if(!src) {
    return;
  } else {
    img.src = src;
  }
}
let loadingCounter = document.querySelector('.loading-counter');
console.log(loadingCounter+1);
let counter = 0;

//root - тот элемента омносительно которого отслеживаем(не юзабельный в данном случае)
//rootMargin - если хотим учесть отступыж
//threshold - порог срабатывания(когда объект(изображения) пересикает зону видимости)
const imgOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px 0px -300px 0px'
}

//создаем экземпляр объекта (который позволяет отслеживать и выполнять какие-то действия по мере попадения объекта в область видимости)
// 1параметр - функция которая реагирует
// 2параметр - option
const imgObserver = new IntersectionObserver((entries, imgOption) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      console.log(entry.intersectionRatio);
      // на сколько зашла картинка на экран
      if (entry.intersectionRatio > 0.5) {
        counter++;
        loadingCounter.innerHTML = counter;
      }
      imgObserver.unobserve(entry.target)
    }
  });
}, imgOption);


//следим за элементами image
images.forEach(image => {
  // setTimeout(()=> {
  //   imgObserver.observe(image);
  // }, 2000)
  //observe - следит зашла ли картинка в область видимости
  imgObserver.observe(image);
});


