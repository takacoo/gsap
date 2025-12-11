// ===========================
// GSAP Plugin Registration
// ===========================
gsap.registerPlugin(ScrollTrigger);

// ===========================
// Smooth Scrollbar Settings
// ===========================
const container = document.querySelector('#container');

const defaultOptions = {
  damping: 0.1,
  alwaysShowTracks: true,
};

const scrollbar = Scrollbar.init(container, {
  ...defaultOptions
});

// ===========================
// ScrollTrigger Proxy Setup
// ===========================
ScrollTrigger.scrollerProxy(container, {
  scrollTop(value) {
    if (arguments.length) {
      scrollbar.scrollTop = value; // setter
    }
    return scrollbar.scrollTop; // getter
  },
});

// Update ScrollTrigger on scroll
scrollbar.addListener(ScrollTrigger.update);

// Set default scroller for all ScrollTriggers
ScrollTrigger.defaults({ scroller: container });

// ===========================
// Section Background Colors
// ===========================
const sectionColors = [
  '#f2eee5', // Section 1 (Hero)
  '#e5c1c5', // Section 2 (SVG)
  '#667eea', // Section 3 (Text) - gradient handled in CSS
  '#1a1a1a', // Section 4 (Horizontal)
  '#000000', // Section 5 (Canvas)
  '#f093fb', // Section 6 (Stagger) - gradient handled in CSS
  '#ffffff', // Section 7 (Progress)
  '#2c3e50', // Section 8 (Layered)
  '#000000'  // Footer
];

// Apply background colors to sections (optional - most are set in CSS)
// Uncomment if you want to dynamically set colors
// gsap.set('.section', { backgroundColor: gsap.utils.wrap(sectionColors) });