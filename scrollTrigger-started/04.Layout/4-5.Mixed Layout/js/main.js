gsap.defaults({ease:'none'})

const sections = gsap.utils.toArray('.horizontal .section');

const end = document.querySelector('.last').getBoundingClientRect().left;

const tween = gsap.to(sections,{x: -end,})

ScrollTrigger.create({
  trigger:'.section02',
  start:'top top',
  end:'+=3000',
  animation:tween,
  pin:true,
  scrub:true,
  markers:true,
})

// ScrollTrigger.create({
//   trigger:'.h-section02',
//   start:'left center',
//   end:'right center',
//   horizontal:true,
//   containerAnimation:tween,
//   animation:gsap.to('.box',{rotation:360}),
//   scrub:true,
//   markers:true,
// })

const boxEnd = gsap.getProperty('.h-section02', 'width');
const boxWidth = gsap.getProperty('.box', 'width');

ScrollTrigger.create({
  trigger:'.h-section02',
  start:'left center',
  // end:'right center',
  end:`+-${boxEnd - boxWidth}`,
  horizontal:true,
  containerAnimation:tween,
  animation:gsap.to('.box',{
    x:(_,t)=>{
      return boxEnd - t.offsetWidth;
    },
    // rotation:360,
  }),
  scrub:true,
  markers:true,
})




markers();
