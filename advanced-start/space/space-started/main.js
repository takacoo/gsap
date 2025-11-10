function toRadian(degree){
  return degree * (Math.PI / 180) //π = 180°
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
    x = Math.cos(toRadian(degree)) * radius; //三角関数を使ってx座標を計算
    y = -Math.sin(toRadian(degree)) * radius; //三角関数を使ってy座標を計算

    gsap.set('.moon', { x, y }) //moonの位置を設定
  }
  stopAnimation = requestAnimationFrame(planet) //requestAnimationFrameを使ってplanetを繰り返し実行
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