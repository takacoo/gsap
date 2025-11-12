// const tl = gsap.timeline()
// .to('.layer-bg',{y:-100})
// .to('.layer-1',{y:-50},0)
// .to('.layer-2',{y:-80},0)
// .to('.layer-3',{y:20},0)
// .to('.layer-4',{
//   y(){
//     return -(this.targets()[0].offsetHeight);
//   },ease:'none'
// },0)
// .to('.layer-overlay',{y:-60},0)

// //const tween = gsap.to('.layer-bg',{y:-100})

// ScrollTrigger.create({
//   trigger:'#hero',
//   start:'top top',
//   end:'bottom top',
//   scrub:true,
//   markers:true,
//   animation:tl,
// })

// gsap.utils.toArray('.parallax').forEach(layer => {
//   const depth = layer.dataset.depth;
//   const movement = -(layer.offsetHeight * depth);

//   ScrollTrigger.create({
//     trigger:'#hero',
//     start:'top top',
//     end:'bottom top',
//     scrub:true,
//     markers:true,
//     animation:gsap.to(layer,{y:movement,ease:'none'}),
//   })
// })

const tl = gsap.timeline({
  scrollTrigger:{
    trigger:'#hero',
    start:'top top',
    end:'bottom top',
    scrub:true,
    markers:true,
  }
})

gsap.utils.toArray('.parallax').forEach(layer => {
  const depth = layer.dataset.depth;
  const movement = -(layer.offsetHeight * depth);
  tl.to(layer,{y:movement,ease:'none'},0)
})





