const duration = 0.5

const tl = gsap.timeline();

gsap.set('.utils > div',{
  transformOrigin:'50% 50% -50'
})

tl.from('.utils > div',{
  rotationX:-90,
  // rotationY:-50,
  opacity:0,
  stagger:duration
})

.to('.utils > div',{
  rotationX:90,
  // rotationY:50,
  opacity:0,
  stagger:duration,
},duration)//.5秒後に実行

GSDevTools.create()