


// 원운동, 원하는 각으로 이동, 진동, etc...]

// x 좌표 cos @ 
// y 좌표 sin @



function toRadian(degree){
  return degree * (Math.PI / 180)
}


function toDegree(radian){
  return radian * (180 / Math.PI)
}

const moon = document.querySelector('.moon');

let stopAnimation;
let degree = 45;
let radius = 250;
let x;
let y;


const fps = 30;
const interval = 1000 / fps;
let lastTime = performance.now();

function planet(){
  
  const now = performance.now();
  const delta = now - lastTime;

  if (delta > interval) {

    lastTime = now - (delta % interval);

    ++degree;

    x = Math.cos(toRadian(degree)) * radius;
    y = -Math.sin(toRadian(degree)) * radius;


    gsap.set('.moon', { x, y })

}
  stopAnimation = requestAnimationFrame(planet)
}

planet()



moon.addEventListener('mouseenter',()=>{
  cancelAnimationFrame(stopAnimation);
})




let toggle = false;


moon.addEventListener('click',()=>{
  

  if(!toggle){
    cancelAnimationFrame(stopAnimation);
    const tl = gsap.timeline();
    tl.to('.line,.earth',{opacity:0});
    tl.to('.moon',{duration:2,scale:20,x:-100,y:100,ease:'power2.inOut'});
    tl.to('.description > *',{x:0,stagger:0.2,opacity:1});

  }
  else{
    const tl = gsap.timeline();
    tl.to('.description > *',{x:100,opacity:0});
    tl.to('.moon',{
      duration:2,
      scale:1,
      x,
      y,
      ease:'power2.inOut'
    });
    tl.to('.line,.earth',{opacity:1,onComplete:planet});
    
  }
  

  toggle = !toggle;

})


























