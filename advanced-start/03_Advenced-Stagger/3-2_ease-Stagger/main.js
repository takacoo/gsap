gsap.from('.stage > div',{
  duration:2,
  opacity:0,
  scale:0,
  // ease:'power1.inOut',//opacity.scaleの速度
  stagger: {
    each:0.2,
    ease:'power3',//staggerの速度
  }
})