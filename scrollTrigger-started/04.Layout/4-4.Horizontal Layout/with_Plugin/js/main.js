ScrollTrigger.create({
  trigger: '.section02',
  start: 'left center',
  end: 'right center',
  markers:true,
  horizontal:true,
  scrub:true,
  animation:gsap.to('.box',{rotation:360}),
})

markers()