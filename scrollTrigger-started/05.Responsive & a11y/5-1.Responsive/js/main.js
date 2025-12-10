const box = document.querySelector('.box');

// gsap.to(box,{
//   x:'100vw',
//   xPercent:-100,
//   yoyo:true,
//   repeat:-1,
//   duration:2,
//   ease:'power3.inOut',
// })

const mm = gsap.matchMedia();

// mm.add(('(max-width: 500px)'),(context)=>{
//   context.hello = function(){
//     return 'hello';
//   }

//   gsap.to(box,{
//     rotation:360,
//     duration:2,
//   })

//   console.log(context);
// })

// mm.add(('(min-width: 501px)'),()=>{
//   gsap.to(box,{
//     rotation:-360,
//     duration:2,
//   })
// })

// mm.add(('(max-width: 500px)'),(context)=>{
//   context.add('spin',()=>{
//     gsap.to(box,{
//       rotation:360,
//       duration:2,
//       repeat:-1,
//       ease:'none',
//     })
//     return () => {
//       box.removeEventListener('click',context.spin);
//     };
//   })

//   box.addEventListener('click',context.spin);

//   console.log(context);
// })

const options = {
  isMobile:'(max-width: 500px)',
  isDesktop:'(min-width: 501px)',
}

// mm.add(options.isMobile,(ctx)=>{
//   const {isMobile,isDesktop} = ctx.conditions;

//   gsap.to(box,{
//     rotation:isMobile ? 360 : -360,
//     duration:2,
//   })
// })

const wrapper = document.querySelector('.wrapper');

mm.add(options,(ctx)=>{
  const {isMobile,isDesktop} = ctx.conditions;

  gsap.to('.green',{
    rotation:isMobile ? 360 : -360,
  })
},wrapper)