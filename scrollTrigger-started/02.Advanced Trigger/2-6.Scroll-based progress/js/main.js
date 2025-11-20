ScrollTrigger.create({
  trigger:'.progressHolder',
  start:'top ' + (document.querySelector('.section01').offsetHeight - 150),
  endTrigger:'.section03',
  end:'bottom bottom',
  animation:gsap.to('.progress',{scaleX:1,ease:'none'}),
  once:true,
  onUpdate:({progress})=>{
    document.querySelector('.percent span').textContent = Math.round(progress * 100);
  },
  pin:true,
  markers:true,
  scrub:true,
})


markers()