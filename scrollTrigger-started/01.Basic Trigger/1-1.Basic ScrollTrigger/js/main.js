// tweeinの中に結びつけて使う
// gsap.to('.tiger',{
//   x:500,
//   rotation:360,
//   duration:3,
//   // scrollTrigger:{
//   //   trigger:'.tigerSection',
//   //   start:'10% center',
//   //   end:'30% 10%',
//   //   markers:true,
//   //   id:'tiger',
//   // }
// })

// コンストラクターを使う
const tween = gsap.to('.tiger',{
  x:500,
  rotation:360,
  duration:3,
})

ScrollTrigger.create({ //Sは大文字
  trigger:'.tigerSection',
  start:'top center',
  end:'bottom 25%',
  markers:true,
  id:'tiger',
  animation:tween,
  toggleActions:'restart none reverse pause',//enter leave enterBack leaveBack
})