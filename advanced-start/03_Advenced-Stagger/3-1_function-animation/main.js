// gsap.to('.box',{
//   y:(i,t,arr) => {

//     // if(i % 2 === 0) return 100;
//     // if(i > 5) return 0

//     if(t.classList.contains('orange')) return 0;

//     return 30 * i
//   },
//   // stagger:0.1,
// })

// function custom(i,t,arr) {
//   if(t.classList.contains('orange')) return 0
//   return 30 * i
// }

// gsap.to('.box',{
//   y:custom,
//   x:custom,
//   rotation: (i,t) => {
//     if(t.classList.contains('orange')) return 0
//     return 360
//   },
//   stagger:0.1,
// })

gsap.to('.blue,.pink',{
  rotation:(i,t) => {
    if(t.classList.contains('blue')) return 360
    return -360
  },
  // rotation: 360,
  repeat: -1,
  duration:(i,t) => {
    if(t.classList.contains('blue')) return 1
    return 0.5
  },
  // duration: 1,
  ease: 'none',
  stagger:0.1,
})