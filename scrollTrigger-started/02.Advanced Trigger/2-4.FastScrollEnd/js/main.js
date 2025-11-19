const goToTop = gsap.timeline()
.to('.goToTop img',{y:0,opacity:1,ease:'back.out(3)'})
.to('.goToTop a',{y:0,opacity:1,ease:'back.out(3)'},'-=.3')

ScrollTrigger.create({
  trigger:'.scroll-content',
  start:'20% top',
  end:'bottom center',
  animation:goToTop,
  markers:true,
  toggleActions:'play none none reverse',
  // toggleClass:'active',
  toggleClass:{
    targets:['.goToTop','.scroll-content'],
    className:'active',
  }
})

const topButton = document.querySelector('.goToTop');
topButton.addEventListener('click',()=>{
  scrollbar.scrollTo(0,0,600,{
    ease:'power2.inOut',
    callback:()=>{
      console.log('done!');
    }
  });
})
markers()