// ===========================
// Markers Helper Function
// ===========================
// This function fixes GSAP markers position when using Smooth Scrollbar

const markers = () => {
  
  // Check if markers exist in the DOM
  if (document.querySelector('.gsap-marker-scroller-start')) {
    
    // Get all marker elements
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    // Update marker positions on scroll
    scrollbar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
};