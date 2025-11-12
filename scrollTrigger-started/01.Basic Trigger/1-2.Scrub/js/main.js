// gsap.to('.textContainer',{
//   x(){
//     return -(this.targets()[0].offsetWidth - innerWidth);
//   },
//   scrollTrigger:{
//     trigger:'.demo-text',
//     start:'20% center',
//     end:'80% center',
//     markers:true,
//     scrub:1,
//     onScrubComplete:()=>{
//       console.log('complete');
//     }
//   }
// })

// const textTween = gsap.to('.textContainer',{
//   x(){
//     return -(this.targets()[0].offsetWidth - innerWidth);
//   }
// })

// ScrollTrigger.create({
//   trigger:'.demo-text',
//   start:'20% center',
//   end:'80% center',
//   // markers:true,
//   scrub:1,
//   animation:textTween,
// })

// const imageTween = gsap.to('.imageContainer',{
//   x(){
//     return -(this.targets()[0].offsetWidth - innerWidth);
//   }
// })

// ScrollTrigger.create({
//   trigger:'.demo-image',
//   start:'20% center',
//   end:'80% center',
//   markers:true,
//   scrub:1,
//   animation:imageTween,
// })

gsap.utils.toArray('.section').forEach((section,index) => {
  const w = section.querySelector('.wrapper');

  if(w){
    let[x,xEnd] = index % 2 ? ['100%',(w.offsetWidth - innerWidth) * -1] : [(w.offsetWidth - innerWidth) * -1,0]

    gsap.fromTo(w,{x},{
      x:xEnd,
      scrollTrigger:{
        trigger:section,
        start:'20% center',
        end:'80% center',
        scrub:1,
        markers:true,
      }
    })
  }
})