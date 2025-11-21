ScrollTrigger.create({
  trigger: '.scroll-content',
  start: 'top top',
  end: 'bottom bottom',
  animation:gsap.from('.progress',{scaleY:0,transformOrigin:'center top',ease:'none'}),
  scrub:true,
})

markers();