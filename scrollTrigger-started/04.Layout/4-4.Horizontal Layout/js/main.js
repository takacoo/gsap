gsap.defaults({
  ease:'none',
})

// 全体を横に押し出す
// const horizontal = gsap.to('.wrapper',{
//   x:(_,t)=>{
//     return -(t.scrollWidth - innerWidth);
//   }
// })

// ScrollTrigger.create({
//   trigger:'.hero',
//   start:'top top',
//   end:()=>'+=' + innerHeight * 2,
//   markers:true,
//   pin:true,
//   animation:horizontal,
//   scrub:true,
// })

// 1セクションごとに横に押し出す
const sections = gsap.utils.toArray('.section');

const tween =gsap.to(sections,{
  xPercent:-100 * (sections.length - 1),
  scrollTrigger:{
    trigger:'.hero',
    scrub:1,
    pin:true,
    end:()=>'+=' + innerWidth * 2,
  }
})

ScrollTrigger.create({
  trigger:'.section02',
  start:'left center',
  end:'right center',
  horizontal:true,
  containerAnimation:tween,
  animation:gsap.to('.box',{rotation:360}),
  scrub:true,
  markers:true,
})



markers()