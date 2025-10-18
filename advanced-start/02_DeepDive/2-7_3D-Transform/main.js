gsap.set('.box',{transfromPerspective:600})

gsap.to('.box',{
  rotationY:360,
  duration:8,
  ease:'none',
  transformOrigin:'50% 50% 200',
})



GSDevTools.create()