const split = new SplitText('h3',{type:'chars'})

const tl = gsap.timeline()
.from('.tiger',{duration:1,scale:0,ease:'back(3)'})
.from(split.chars,{duration:4,y:60,opacity:0,stagger:0.5,ease:'back(3)'})

ScrollTrigger.create({
  trigger:'.banner',
  start:'top center',
  // end:'+=1000',
  end: '200% center',
  // markers:true,
  pin:true,
  animation:tl,
  scrub:1,
  // pinSpacing:false,
  // pinType: 'transform',
})

ScrollTrigger.create({
  trigger:'.section03',
  start:'top',//top top　の省略（同じ場合は省略可）
  end:'bottom',
  markers:true,
  animation: gsap.to('.section03 h2',{rotation:360}),
  scrub:1,
})