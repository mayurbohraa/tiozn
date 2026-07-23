# Tizon (Tizonn) Website

A single-page marketing website for **Tizon** (Tizonn Designing Services), a Delhi-based digital product development agency specializing in 3D/2D animation, graphic design, video editing, and VFX/CGI.

## Project Structure

```
TIOZN/
├── index.html          # Main page — all site content and inline scripts
├── css/
│   ├── styles.css          # Primary stylesheet
│   └── responsive.min.css  # Responsive/breakpoint styles
├── js/
│   └── scripts.js          # Custom site scripts
└── images/              # Logos, icons, portfolio and testimonial images
```

## Tech Stack

- HTML5 / CSS3 / vanilla JavaScript
- Bootstrap 5.3.1, Bootstrap Icons, Swiper 11, Tiny Slider, Slick Carousel, jQuery, Font Awesome (all via CDN)
- Calendly inline widget for call scheduling

No build step or package manager — all dependencies load via CDN.

## Running Locally

Open `index.html` directly in a browser, or serve the folder with any static file server:

```bash
npx serve .
```
