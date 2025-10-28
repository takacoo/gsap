// gsap.to('.tiger > div',{
//   y:100,
//   // repeat:-1,
//   // yoyo:true,
//   stagger:{
//     each:0.1,
//     repeat:-1,
//     yoyo:true,
//   }
// })
// divに指定→全部のdivに適用
// staggerに指定→tigerの中の個々のdivに適用


const l = 8 * 13;

for(let i = 0; i < l; i++){
  let template = /* html */`
    <div class="box" data-index="${i}"></div>
  `
  document.querySelector('.stage')?.insertAdjacentHTML('beforeend',template)

}

gsap.to('.box',{
  duration:1,
  scale:0.2,
  // repeat:-1,
  // yoyo:true,
  ease:'power1.inOut',
  stagger:{
    each:0.1,
    grid: [8,13],//auto
    from:'center',
    // axis:'y',
    repeat:-1,
    yoyo:true,
  }
})

// gridを指定することにより、全体に適用されるアニメーションを制御することができる。













