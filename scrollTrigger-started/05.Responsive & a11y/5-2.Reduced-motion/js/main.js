const mm = gsap.matchMedia();

const options = {
  isMobile:'(max-width: 500px)',
  isDesktop:'(min-width: 501px)',
  reducedMotion:('prefers-reduced-motion: reduce'),
}

// mm.add(options,(ctx)=>{
//   const {isMobile,isDesktop,reducedMotion} = ctx.conditions;

//   if(!reducedMotion){
//     gsap.to('.box',{
//       scale:isMobile ? 4 : 10,
//       rotation:360,
//       yoyo:true,
//       repeat:-1,
//       ease:'none',
//     })
//   }
// })

// mm.add(options,(ctx)=>{
//   const {isMobile,isDesktop,reducedMotion} = ctx.conditions;

//   gsap.to('.box',{
//     scale:reducedMotion ? 1 : isMobile ? 4 : 10,
//     rotation:360,
//     yoyo:true,
//     repeat:-1,
//     ease:'none',
//   })
// })

const checkbox = document.querySelector('#motionToggle');
checkbox.checked = window.matchMedia('prefers-reduced-motion: reduce').matches;
checkbox.addEventListener('change',gsap.matchMediaRefresh)

mm.add(options,(ctx)=>{
  let {isMobile,isDesktop,reducedMotion} = ctx.conditions;
  reducedMotion = checkbox.checked;

  if(!reducedMotion){
    ScrollTrigger.create({
      trigger:'.section03',
      start:'top center',
      end:'bottom center',
      scrub:true,
      // markers:true,
      animation:gsap.to('.orange',{rotation:360})
    })
  }
})