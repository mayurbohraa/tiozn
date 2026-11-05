const navbar = document.querySelector("#navbar");
const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = navbar.querySelector("#navbar-menu");
const desktopNavigation = window.matchMedia("(min-width: 1163px)");

navbarToggle.addEventListener("click", () => {
  const expanded = navbarToggle.getAttribute("aria-expanded") === "true";
  navbarToggle.setAttribute("aria-expanded", String(!expanded));
});

navbarMenu.addEventListener("click", (event) => {
  if (event.target.closest("a") || event.target === navbarMenu) {
    navbarToggle.setAttribute("aria-expanded", "false");
  }
});

navbar.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navbarToggle.getAttribute("aria-expanded") === "true") {
    navbarToggle.setAttribute("aria-expanded", "false");
    navbarToggle.focus();
  }
});

desktopNavigation.addEventListener("change", () => {
  navbarToggle.setAttribute("aria-expanded", "false");
});

navbar.setAttribute("data-menu-ready", "");

const scheduleLink = document.querySelector("#schedule-btn");
const scheduleDialog = document.querySelector("#schedule-dialog");

if (typeof scheduleDialog.showModal === "function") {
  scheduleLink.setAttribute("aria-haspopup", "dialog");

  scheduleLink.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    scheduleDialog.showModal();
  });
}

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const scroller = document.querySelector(".scroller");
const scrollerTrack = scroller.querySelector(".scroller__inner");
const guidanceCards = [...scrollerTrack.children];
let guidanceCopies = [];

function updateGuidanceCarousel() {
  guidanceCopies.forEach((copy) => copy.remove());
  guidanceCopies = [];
  const animate = !motionPreference.matches;
  scroller.toggleAttribute("data-animated", animate);

  if (animate) {
    scroller.scrollLeft = 0;
    guidanceCopies = guidanceCards.map((card) => {
      const copy = card.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      return copy;
    });
    scrollerTrack.append(...guidanceCopies);
  }
}

motionPreference.addEventListener("change", updateGuidanceCarousel);
updateGuidanceCarousel();

const portfolio = document.querySelector(".portfolio-carousel");
const portfolioCards = [...portfolio.querySelectorAll(".portfolio-card")];
const portfolioTabs = [...document.querySelectorAll(".portfolio-nav a")];

function selectPortfolio(index) {
  const card = portfolioCards[index];
  const left = card.offsetLeft - portfolioCards[0].offsetLeft;
  portfolio.scrollTo({
    left,
    behavior: motionPreference.matches ? "instant" : "smooth",
  });
}

portfolioTabs.forEach((tab, index) => {
  tab.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectPortfolio(index);
  });
});

function updatePortfolioSelection() {
  const index = portfolioCards.reduce((nearest, card, current) => {
    const distance = Math.abs(card.offsetLeft - portfolioCards[0].offsetLeft - portfolio.scrollLeft);
    const nearestDistance = Math.abs(portfolioCards[nearest].offsetLeft - portfolioCards[0].offsetLeft - portfolio.scrollLeft);
    return distance < nearestDistance ? current : nearest;
  }, 0);
  portfolioTabs.forEach((tab, current) => {
    if (current === index) tab.setAttribute("aria-current", "true");
    else tab.removeAttribute("aria-current");
  });
}

portfolio.addEventListener("scroll", updatePortfolioSelection, { passive: true });
portfolio.addEventListener("keydown", (event) => {
  if (event.target !== portfolio || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  const index = portfolioTabs.findIndex((tab) => tab.getAttribute("aria-current") === "true");
  const direction = event.key === "ArrowRight" ? 1 : -1;
  selectPortfolio((index + direction + portfolioCards.length) % portfolioCards.length);
});
updatePortfolioSelection();
