const btnLeft = document.querySelector(".btn-left"),
  btnRight = document.querySelector(".btn-right"),
  slider = document.querySelector("#slider"),
  sliderSection = document.querySelectorAll(".slider-section");

btnLeft.addEventListener("click", (e) => moveToLeft());
btnRight.addEventListener("click", (e) => moveToRight());


let operation = 0,
  counter = 0,
  widthImg = 100 / sliderSection.length;

function moveToRight() {
  if (counter >= sliderSection.length - 1) {
    counter = 0;
    operation = 0;
    slider.style.transform = `translate(-${operation}%)`;
    slider.style.transition = "none";
    return;
  }

  counter++;
  operation = operation + widthImg;
  slider.style.transform = `translate(-${operation}%)`;
  slider.style.transition = "all ease .6s";
}

function moveToLeft() {
  counter--;
  if (counter < 0) {
    counter = sliderSection.length - 1;
    operation = widthImg * (sliderSection.length - 1);
    slider.style.transform = `translate(-${operation}%)`;
    slider.style.transition = "none";
    return;
  }
  operation = operation - widthImg;
  slider.style.transform = `translate(-${operation}%)`;
  slider.style.transition = "all ease .6s";
}

/* Para que solo se active el "setInterval" que desliza automáticamente las imágenes cuando el usuario esté en esa sección */

let observer;
let intervalId;

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      intervalId = setInterval(() => {
        moveToRight();
      }, 3000);
    } else {
      clearInterval(intervalId);
    }
  });
};

observer = new IntersectionObserver(callback, options);

const target = document.querySelector('.container-carousel');
observer.observe(target);
