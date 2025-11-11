gsap.to('.textContainer',{
  x(){
    return -(this.targets()[0].offsetWidth - innerWidth);
  },
  scrollTrigger:{
    trigger:'.demo-text',
    start:'20% center',
    end:'80% center',
    markers:true,
    scrub:1,
    onScrubComplete:()=>{
      console.log('complete');
    }
  }
})