gsap.utils.toArray('.section').forEach((section,index) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    // end: '+=4000',
    scrub: true,
    pin: true,
    pinSpacing: false,
    markers: true,
    snap: {
      snapTo:1,
      duration:1,
      ease: 'power4.inOut',
    }
  })
})








markers()

