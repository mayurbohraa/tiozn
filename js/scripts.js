/* ----- Navbar toggle ----- */

const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");

let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => {
  if (isNavbarExpanded) {
    navbarToggle.setAttribute("aria-expanded", !isNavbarExpanded);
  }
  e.stopPropagation()
});
navbarMenu.addEventListener("click", toggleNavbarVisibility);

// Schedule Button Modal 
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("schedule-btn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.addEventListener('click', () => {
  modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
  modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})

// 

const scrollers = document.querySelectorAll('.scroller');
// console.log(scrollers)

const addAnimation = () => {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);


    const scrollerInner = scroller.querySelector('.scroller__inner');
    // console.log(scrollerInner)
    const scrollerInnerContent = Array.from(scrollerInner.children);
    // console.log(scrollerInnerContent)


    scrollerInnerContent.forEach(item => {
      const dupilcatedItem = item.cloneNode(true)
      // console.log(dupilcatedItem);

      dupilcatedItem.setAttribute('aria-hidden', true)

      scrollerInner.appendChild(dupilcatedItem)
    })
  })
}

addAnimation()

const sliderSpan = document.querySelector('#slider-span');
const links = document.querySelectorAll('.links');

const indicator = (e) => {
  sliderSpan.style.left = e.offsetLeft + 'px';
  sliderSpan.style.width = e.offsetWidth + 'px';
}

links.forEach((element, index) => {
  element.addEventListener('mouseover', (e) => {

    indicator(e.target);
  })
})