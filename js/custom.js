// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 2.5;

// additional varibles for slides
const totalSlideAmount = 12;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = $('#presentation', window.parent.document).attr('data-request-url');
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay, className) {
  const allElements = document.querySelectorAll(`${className}[data-number]`);

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 1.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

// function that type text from scretch
function typewriterEffect(selector, duration, delay) {
  const el = document.querySelector(selector);
  const innerText = el.getAttribute('data-text');

  gsap.to(el, {
    duration: duration,
    text: innerText,
    ease: 'none',
    delay,
  });
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    gsap.from('.slide--1__right h1', { opacity: 0, duration: 0.65, delay: 1, y: '45%' });
    gsap.from('.slide--1__right .text-box h2', { opacity: 0, duration: 0.75, delay: 1.5, x: '-45%' });
    gsap.from('.slide--1__right .text-box p', { opacity: 0, duration: 0.75, delay: 1.5, x: '45%' });
    nextArrowDelay = 2.5;
  },
  2: () => {
    gsap.from('.slide--2__block.first', { opacity: 0, duration: 0.65, delay: 1, x: '35%', y: '35%' });
    gsap.from('.slide--2__block.second', { opacity: 0, duration: 0.75, delay: 1.5, x: '35%', y: '35%' });
    gsap.from('.slide--2__block.third', { opacity: 0, duration: 0.75, delay: 2, x: '35%', y: '35%' });
    nextArrowDelay = 3;
  },
  3: () => {
    $('.slide--3__left-icon img.icon').on('click', function() {
      $(this).parent().addClass('active');

      gsap.to('.slide--3__left-icon img.arrow', { opacity: 1, duration: 0.75, delay: 0.5 });
      gsap.to('.slide--3__left-bottles img', { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to('.slide--3__left-top', { opacity: 1, duration: 0.75, delay: 1.5, y: 0 });
      gsap.to('.slide--3__left-usage, .slide--3__right .line, .slide--3__right-content', { opacity: 1, duration: 0.75, delay: 2, x: 0 });
      gsap.to('.slide--3__icons', { opacity: 1, duration: 0.75, delay: 2.5 });

      if ($('.slide--3__left-icon').hasClass('active')) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 3.5 * 1000);
      }
    })
  },
  4: () => {
    $('.slide--4__left-icon img.icon').on('click', function() {
      $(this).parent().addClass('active');

      gsap.to('.slide--4__left-icon img.arrow', { opacity: 1, duration: 0.75, delay: 0.5 });
      gsap.to('.slide--4__left-bottles img', { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to('.slide--4__left-top', { opacity: 1, duration: 0.75, delay: 1.5, y: 0 });
      gsap.to('.slide--4__left-usage, .slide--4__right .line, .slide--4__right-content', { opacity: 1, duration: 0.75, delay: 2, x: 0 });
      gsap.to('.slide--4__icons', { opacity: 1, duration: 0.75, delay: 2.5 });

      if ($('.slide--4__left-icon').hasClass('active')) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 3.5 * 1000);
      }
    })
  },
  5: () => {
    $('.slide--5__left-icon img.icon').on('click', function() {
      $(this).parent().addClass('active');

      gsap.to('.slide--5__left-icon img.arrow', { opacity: 1, duration: 0.75, delay: 0.5 });
      gsap.to('.slide--5__left-bottles img', { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to('.slide--5__left-top', { opacity: 1, duration: 0.75, delay: 1.5, y: 0 });
      gsap.to('.slide--5__left-usage, .slide--5__right .line, .slide--5__right-content', { opacity: 1, duration: 0.75, delay: 2, x: 0 });
      gsap.to('.slide--5__icons', { opacity: 1, duration: 0.75, delay: 2.5 });

      if ($('.slide--5__left-icon').hasClass('active')) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 3.5 * 1000);
      }
    })
  },
  6: () => {
    $('.slide--6__block img').on('click', function() {
      const slideBlock = $(this).closest('.slide--6__block');
      const description = slideBlock.find('.description');

      slideBlock.addClass('active');
      gsap.to(description, { opacity: 1, duration: 0.75, delay: 0.5, x: 0 });

      if ($('.slide--6__block.active').length === 2) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 1.5 * 1000);
      }
    })
  },
  7: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    $('.slide--7__block .img img').on('click', function() {
      const slideBlock = $(this).closest('.slide--7__block');

      slideBlock.addClass('active');

      gsap.to(slideBlock.find('.time'), { opacity: 1, duration: 0.75, delay: 0.5, y: 0 });
      gsap.to(slideBlock.find('h3'), { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to(slideBlock.find('.description > p.blue-accent'), { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to(slideBlock.find('.slide--7__ingridients'), { opacity: 1, duration: 0.75, delay: 1.5, y: 0 });
      gsap.to(slideBlock.find('.slide--7__usage'), { opacity: 1, duration: 0.75, delay: 2, y: 0 });

      if ($('.slide--7__block.active').length === 2) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 3 * 1000);
      }
    })
  },
  8: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');

    $('.slide--8__left-bottles img').on('click', function() {
      $(this).parent().addClass('active');

      gsap.to('.slide--8__right h2', { opacity: 1, duration: 0.75, delay: 0.5 });
      gsap.to('.slide--8__right h3', { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to('.slide--8__right-content > p.coral-accent', { opacity: 1, duration: 0.75, delay: 1.5 });
      gsap.to('.slide--8__right p.coral, .slide--8__right .line, .slide--8__blocks, .slide--8__left-usage', { opacity: 1, duration: 0.75, delay: 2, x: 0 });
      gsap.to('.slide--8__icons', { opacity: 1, duration: 0.75, delay: 2.5, x: 0 });

      if ($('.slide--8__left-bottles').hasClass('active')) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 3.5 * 1000);
      }
    })
  },
  9: () => {
    $('.arrow--prev').addClass('arrow--white');
    $('.arrow--next').addClass('arrow--white');
    $('.slide--9__block .img img').on('click', function() {
      const slideBlock = $(this).closest('.slide--9__block');

      slideBlock.addClass('active');

      gsap.to(slideBlock.find('.time'), { opacity: 1, duration: 0.75, delay: 0.5, y: 0 });
      gsap.to(slideBlock.find('h3'), { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to(slideBlock.find('.description > p.coral-accent'), { opacity: 1, duration: 0.75, delay: 1 });
      gsap.to(slideBlock.find('.slide--9__ingridients'), { opacity: 1, duration: 0.75, delay: 1.5, y: 0 });
      gsap.to(slideBlock.find('.slide--9__usage'), { opacity: 1, duration: 0.75, delay: 2, y: 0 });

      if ($('.slide--9__block.active').length === 2) {
        nextButtonTimeout = setTimeout(() => {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }, 3 * 1000);
      }
    })
  },
  10: () => {
    $('.arrow--prev').removeClass('arrow--white');
    $('.arrow--next').removeClass('arrow--white');
    $('.slide--10__bottles').on('click', function() {
      $(this).addClass('active');

      const timeline = gsap.timeline();
      const bottles = $(this).find('.slide--10__bottle');

      bottles.each(function (i) {
        timeline.to( $(this), { opacity: 1, scale: 1, duration: 0.75 }, i * 0.5);
      });

      timeline.to($(this).parent().find('.decorator'), { opacity: 1, duration: 0.5, y: 0 });
      timeline.to($(this).parent().find('.time'), { opacity: 1, duration: 0.5, y: 0 });

      timeline.call(() => {
        if ($('.slide--10__bottles.active').length === 3) {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }
      });
    });
  },
  11: () => {
    clearTimeout(lastSlideActionTimeout);
    $('.slide--11__bottles').on('click', function() {
      $(this).addClass('active');

      const timeline = gsap.timeline();
      const bottles = $(this).find('.slide--11__bottle');

      bottles.each(function (i) {
        timeline.to( $(this), { opacity: 1, scale: 1, duration: 0.75 }, i * 0.5);
      });

      timeline.to($(this).parent().find('.decorator'), { opacity: 1, duration: 0.5, y: 0 });
      timeline.to($(this).parent().find('.time'), { opacity: 1, duration: 0.5, y: 0 });

      timeline.call(() => {
        if ($('.slide--11__bottles.active').length === 3) {
          $(nextSlideButton).removeClass(hiddenArrowClass);
          $(prevSlideButton).removeClass(hiddenArrowClass);
        }
      });
    });
  },
  12: () => {
    gsap.from('.slide--12 .animate--1', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--12 .animate--2', { opacity: 0, duration: 0.75, delay: 1.5, x: '-25%' });
    gsap.from('.slide--12 .animate--3', { opacity: 0, duration: 0.5, delay: 1.5, scaleY: 0 });
    gsap.from('.slide--12 .animate--4', { opacity: 0, duration: 0.75, delay: 1.5, x: '25%' });
    gsap.from('.slide--12 .animate--5', { opacity: 0, duration: 0.75, delay: 2 });

    lastSlideActionTimeout = setTimeout(() => {
      lastSlideAction();
    }, 8.5 * 1000);
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);

  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  switch (currentSlide) {
    case 0:
      break;
    case 1:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      break;
    case totalSlideAmount:
      $(prevSlideButton).removeClass(hiddenArrowClass);
      break;
    default:
      nextButtonTimeout = setTimeout(() => {
        $(nextSlideButton).removeClass(hiddenArrowClass);
        $(prevSlideButton).removeClass(hiddenArrowClass);
      }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);
  updateNavigationButtons(newSlideNum);
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});
