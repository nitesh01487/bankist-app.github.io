'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Button Scrolling

btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    // getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
    // console.log(s1coords);
    // console.log(e.target.getBoundingClientRect());
    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    // The pageXOffset property returns the pixels a document has scrolled from the upper left corner of the window
    // The pageYOffset property returns the pixels a document has scrolled from the upper left corner of the window.

    // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

    // Scrolling (Old School Method)
    // window.scrollTo(
    //     s1coords.left + window.pageXOffset, 
    //     s1coords.top + window.pageYOffset
    // );
    // above we have for x we have distance of element from top of viewport + the viewport slide down
    // same is for y

    // new one
    // window.scrollTo({
    //     left : s1coords.left + window.pageXOffset,
    //     top : s1coords.top + window.pageYOffset,
    //     behavior : 'smooth',
    // });

    // modern one 
    section1.scrollIntoView({ behavior: 'smooth' });
});

// ////////////////////////////////////
// Page Navigation

// using forEach method
// document.querySelectorAll('.nav__link').forEach(function(el) {
//     el.addEventListener('click', function (e) {
//         e.preventDefault();
//         // console.log('LINK');
//         const id = this.getAttribute('href');
//         // we don't write this.href because we don't want absolute url we want just the attribute
//         console.log(id);
//         document.querySelector(id).scrollIntoView({behavior : 'smooth'});
//     });
// });
// we will not use 

// Implementing Page Navigation using Event Delegation
// 1. Add event Listner to common parent element
// 2. Determine what element originated the event 

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
        // console.log('LINK');
        const id = e.target.getAttribute('href');
        // we don't write this.href because we don't want absolute url we want just the attribute
        console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
})

// Tabbed Component

// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB'))); // we use event delegation

tabsContainer.addEventListener('click', function
    (e) {
    const clicked = e.target.closest('.operations__tab');
    console.log(clicked);

    // Guard clause
    if (!clicked) return;

    // remove active class
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))

    // Active tab
    clicked.classList.add('operations__tab--active');

    // Active content area
    document.querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`).classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

// by passing function who calls the funciton with argument
// nav.addEventListener('mouseover', function(e) {
//     // mouseover fired when our cusor enters the element or child of that event
//     handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function(e) {
//     // mouseout event fired when cursor leaves the element
//     handleHover(e, 1);
// });

// there is another method to do this by using bind method
// Passing "argument" into handler 
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// // Sticky Navigation
// const initialCords = section1.getBoundingClientRect();
// // console.log(initialCords);

// window.addEventListener('scroll', function() {
//     // console.log(window.scrollY);
//     if(window.scrollY > initialCords.top)
//         nav.classList.add('sticky');
//     else
//         nav.classList.remove('sticky');
// });

// Sticky navigation : Intersection Observer API (check web API of mdn docs)

// const obsCallback = function(entries, observer) {
//     entries.forEach(entry => {
//         console.log(entry);
//     })
// };

// const obsOptions = {
//     root : null,
//     // root is element that target intersecting
//     // by default we have set this to null 
//     // it is used when we call observe function of the api
//     threshold : [0, 1, 0.2]
//     // we can have multiple threshold in the form of array
//     // threshold is the percentage of intersection at which observer is called
//     // the 
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
// // here the IntersectionObserver API is observes the section1

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting)
        nav.classList.add('sticky');
    else
        nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
    // % will not here
});
headerObserver.observe(header);

// Revealing Elements on Scroll


// we add the section--hidden to every section which make them opaque and move them little down
// and when we remove them the move up little bit and visible

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})

//Lazy Loading Images
// Images load affect the performance 
// Low resolution is added in the begging and when the image enters the viewport the originala image loads in

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);

    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
    // 200px before we reach them
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider Component
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    let maxSlide = slides.length;

    // const slider = document.querySelector('.slider');
    // slider.style.transform = 'scale(0.4) translateX(-800px)';
    // slider.style.overflow = 'visible';

    // Functions

    const createDots = function () {
        console.log(slides.length);
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`)
        });
    };

    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
        document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    }

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => { s.style.transform = `translateX(${100 * (i - slide)}%)` }
        );
    };

    // to go to next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1)
            curSlide = 0;
        else
            curSlide++;
        goToSlide(curSlide);
        activateDot(curSlide)
    }

    // to go to prev slide
    const prevSlide = function () {
        if (curSlide === 0)
            curSlide = maxSlide - 1;
        else
            curSlide--;
        goToSlide(curSlide);
        activateDot(curSlide);
    }

    //
    const init = function () {
        // initialize the inilial translation
        goToSlide(0);
        createDots();
        activateDot(0);
    }

    init();

    // Event Handler
    btnRight.addEventListener('click', nextSlide);
    // curSlide = 1 : -100% 0% 100% 200%
    btnLeft.addEventListener('click', prevSlide);

    // arrow-key handling
    document.addEventListener('keydown', function (e) {
        console.log(e);
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide(); // short-cicuiting
    });

    // event handling by using event delegation
    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// ---------------------------------------------------------
console.log('------------------------Selecting, Creating And Deleting Elements In Javascript----------');

// Selecting Elements

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// This gives the NodeLists
// It got assigned at the time of creation and is static

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
console.log(allSections);

// This gives the HTMLCollections
// It updates live
document.getElementById('#section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

document.getElementsByClassName('btn');
// returns Live HTMLCollection

// Creating and inserting Elements

// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improving functionality and analytics.';
message.innerHTML = 'We use cookies for improving functionality and analytics. <button class = "btn btn--close-cookie">Got it!<button/>';

// header.prepend(message);
// Adds the element as first child of the selected element
header.append(message);
// both the prepend and append not happens at a time we must use the cloneNode attribute to add two unique element
// Adds the element as last child
// header.append(message.cloneNode(true));
// The cloneNode() method creates a copy of a node, and returns the clone. The cloneNode() method clones all attributes and their values. Set the deep parameter to true if you also want to clone descendants (children).

// header.before(message);
// before the header as sibling
// header.after(message);
// after the header as sibling

// Deleting elements

document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
        // message.remove();
        message.parentElement.removeChild(message);
    });

// ---------------------------------------------------------
console.log('------------------------Styles, Attributes and Classes----------');

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);
// not a inline
console.log(message.style.color);
// it is pre defined in stylesheet
// we won't be able to get the styles that are not inline and that are pre - described in css 
console.log(message.style.backgroundColor);

// we can still get them by using getComputedStyle
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangedred');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

// Non-standard
console.log(logo.designer);
// not able to read as not a standard attribute
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('C', 'j');
logo.classList.remove('C', 'j');
logo.classList.toggle('C', 'j');
logo.classList.contains('C', 'j'); // not

// Don't use because all the existing class and we can only be able to add single class
logo.className = 'jonas';

// ---------------------------------------------------------
console.log('------------------------Smooth Scrolling----------'); // ON LINE 41

// const btnScrollTo = document.querySelector('.btn--scroll-to');


// ---------------------------------------------------------
console.log('------------------------Types of Events and Event Handlers----------');

// Whenever a click or any hover occurs by the user it will happen the only thing is that we won't listen it

// 1st way of handling event
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
    alert('addEventListener ! You are reading the heading : D');
    // removes the event after event occurs once
    // h1.removeEventListener('mouseenter', alertH1);
};

// just remove
h1.removeEventListener('mouseenter', alertH1);

// after cestain time has passout
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// 2nd way of handling event
// it is a bit old school, now we use addeventlistner
// h1.onmouseenter = function (e) {
//     alert('onmouseenter ! You are reading the heading : D');
// };

// 3rd way of handling event
// using html attribute 

// ---------------------------------------------------------
console.log('------------------------Event Propagation_ Bubbling and Capturing----------');

// ---------------------------------------------------------
console.log('------------------------Event Propagation in Practise----------');

// // rgb(255, 255, 255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e){
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);

//     // Stop propagation
//     // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e){
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e){
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
// }
// // , true
// );

// // here we, have disscussed only the target and bubbling phase 
// // for event to occur in capturing phase set the third parameter of the function to true which by default false

// ---------------------------------------------------------
console.log('------------------------Event Delegation_ Implementing Page Navigation----------'); // ON LINE 73
// // Event Delegation is a pattern based upon the concept of Event Bubbling. It is an event-handling pattern that allows you to handle events at a higher level in the DOM tree other than the level where the event was first received.

// // ---------------------------------------------------------
// console.log('------------------------DOM Traversing----------'); 
// // used for traversing DOM

// // const h1 = document.querySelector('h1');

// // Going downwards : child
// console.log(h1.querySelectorAll('.highlight'));
// // querySelector finds the child no matter how the childs are deep
// // all the element child of h1 having class highlight will be selected
// console.log(h1.childNodes); // all childs nodelist (all descendentants)
// console.log(h1.children); // all childs HTMLCollection (works for direct children)
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards
// console.log(h1.parentNode);
// // to select direct parent
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// // it finds the parent no matters how the parent are far
// // we will use it very frequently for event delegation
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideway : siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el) {
//     if(el !== h1) {
//         el.style.transform = 'scale(0.5)';
//     }
// });

// ---------------------------------------------------------
console.log('------------------------Tabbed Component----------'); // LINE NO 105

// ---------------------------------------------------------
console.log('------------------------Passing Arguments to Event Handlers----------'); // LINE no 132

// ---------------------------------------------------------
console.log('------------------------Implementing a Sticky Navigation----------'); // LINE no 162

// ---------------------------------------------------------
console.log('------------------------A Better Way_ The Intersection Observer API----------'); // LINE no 174

// ---------------------------------------------------------
console.log('------------------------Revealing Elements On Scroll----------'); //LINE No 219

// ---------------------------------------------------------
console.log('------------------------Lazy Loading Image----------'); //LINE No 245

// network tab is used to control the loading of page:

// ---------------------------------------------------------
console.log('------------------------Building a Slider Component_1----------'); //LINE No 274

// ---------------------------------------------------------
console.log('------------------------Lifecycle DOM Events----------'); //LINE No 274
// Lifecycle means when the user access untill the user leaves

document.addEventListener('DOMContentLoaded', function(e) {
    // The DOMContentLoaded event fires when the HTML document has been completely parsed, and all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.
    // console.log('HTML parsed and DOM tree built!',e);
    // our javascript is only loaded once the html is compeletely parsed at the end of javascript file
});

window.addEventListener('load', function(e) {
    // The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets, scripts, iframes, and images. This is in contrast to DOMContentLoaded , which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
    // console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function(e) {
//     e.preventDefault();
//     // console.log(e);
//     e.returnValue = '';
//     //The beforeunload event is fired when the window, the document and its resources are about to be unloaded. The document is still visible and the event is still cancelable at this point. This event enables a web page to trigger a confirmation dialog asking the user if they really want to leave the page.
// });

// ---------------------------------------------------------
console.log('------------------------Efficient Script Loading_ defer and async----------'); //LINE No 274

// 1. Regular Method
// 2. Async (not executed in order)
// 3. Defer (executed in order)

// defer takes less time to fire DOMContentLoad event or to get page ready
// defer is best as stalled period to fetch different pages is less