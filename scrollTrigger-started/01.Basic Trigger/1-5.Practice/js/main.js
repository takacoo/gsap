// const tween = gsap.fromTo('.wrapper.text',
// {x:'100%'},
// {x(){return -(this.targets()[0].scrollWidth - innerWidth)}})

// // const tween = gsap.fromTo('.wrapper.text',
// // {x(){return -(this.targets()[0].scrollWidth - innerWidth)}},
// // {x:'100%'})

// ScrollTrigger.create({
//   trigger:'.demo-text',
//   scrub:true,
//   markers:true,
//   animation:tween,
// })

// gsap.utils.toArray('section').forEach((section,index)=>{
//   const w = section.querySelector('.wrapper');

//   if(w){
//     const [x,xEnd] = index % 2 ? ['100%',(w.scrollWidth - innerWidth) * -1] : [-(w.scrollWidth),0]
//     console.log(x,xEnd);

//     gsap.fromTo(w,{x},{
//       x:xEnd,
//       scrollTrigger:{
//         trigger:section,
//         scrub:.5,
//       }
//     })
//   }
// })

const showDemo = () => {
  gsap.to('.loader',{autoAlpha:0})
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0,0);
  
  gsap.utils.toArray('section').forEach((section,index)=>{
    const w = section.querySelector('.wrapper');
  
    if(w){
      const [x,xEnd] = index % 2 ? ['100%',(w.scrollWidth - innerWidth) * -1] : [-(w.scrollWidth),0]
      // console.log(x,xEnd);
  
      gsap.fromTo(w,{x},{
        x:xEnd,
        scrollTrigger:{
          trigger:section,
          scrub:.5,
        }
      })
    }
  })
}

const awsome = () => {
  const tl = gsap.timeline({
    defaults:{
      ease:'none',
    }
  })
  .from('.awsome .text',{x:innerWidth})
  .to('.awsome .text',{scale:50,xPercent:-200})
  .to('body',{duration:.3,backgroundColor:'#000'},'-=.5')

  ScrollTrigger.create({
    trigger:'.awsome',
    start:'top top',
    end:'+=3000',
    pin:true,
    scrub:1,
    animation:tl,
  })
}

const tryNow = () => {
  ScrollTrigger.create({
    trigger:'.try',
    start:'top top',
    end:'+=2000',
    scrub:true,
    pin:true,
    animation:gsap.from('.try .text',{y:50,opacity:0}),
  })
}

const init = () => {
  showDemo();
  awsome();
  tryNow();
}

const img = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');
// const img = document.querySelectorAll('img');
// const img = Array.from(document.querySelectorAll('img'));
// const img = Array.prototype.slice.call(document.querySelectorAll('img'));
// const img = [...document.querySelectorAll('img')];

// imagesLoaded(img).on('progress',(instance)=>{
//   // loader.textContent = Math.round(instance.progressedCount * 100 / img.length) + '%'
//   loader.textContent = `${Math.round(instance.progressedCount * 100 / img.length)}%`
// })

const updateProgress = (instance) => {
  // loader.textContent = Math.round(instance.progressedCount * 100 / img.length) + '%'
  loader.textContent = `${Math.round(instance.progressedCount * 100 / img.length)}%`
}

// .on('always',()=>{
//   init();
// })

imagesLoaded(img)
.on('progress',updateProgress)
.on('always',init)