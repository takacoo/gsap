const duration = 0.5
const pause = 1

const numberOfTargets = gsap.utils.toArray('.utils > div').length
const stagger = duration + pause

const delay = stagger * (numberOfTargets - 1) + pause

const tl = gsap.timeline();

gsap.set('.utils > div',{
  transformOrigin:'50% 50% -50'
})

tl.from('.utils > div',{
  rotationX:-90,
  // rotationY:-50,
  opacity:0,
  duration:duration,
  stagger:{
    each:stagger,
    repeat:-1,
    repeatDelay:delay,
  }
})

.to('.utils > div',{
  rotationX:90,
  // rotationY:50,
  opacity:0,
  duration:duration,
  stagger:{
    each:stagger,
    repeat:-1,
    repeatDelay:delay,
  }
},stagger)//.5秒後に実行

GSDevTools.create()