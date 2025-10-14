const $ = (node) => (node = document.querySelector(node));

const map = $('.map');
const current = $('.current');
const mart = $('.mart');
const medi = $('.medi');

let isScale = false;

function handleCurrent(){
  isScale = true;
  const tl = gsap.timeline();
  tl.to(map, {scale:2,x:200,y:-200,duration:2 ,ease:'power3.inOut'})
    .to('#here',{y:-10,repeat:-1,yoyo:true})
}

function drowRoute(target,length){
  const tl = gsap.timeline({
    defaults: {
      duration:2
    }
  });
  tl.set(`${target} .pick`,{opacity:0})
    .to(map,{scale:1,x:0,y:0,duration: isScale ? 2 : 0})
    .set(`${target} .pick`,{opacity:1})
    .fromTo(`${target} .path`,{strokeDashoffset:length},{strokeDashoffset:0})
    .to(`${target} .pick`,{
      opacity:1,
      motionPath:{
        path: `${target} .path`,
        align: `${target} .path`,
        alignOrigin: [0.5, 0.5],
      }
    },'<')

    isScale = false;
}

function handleMart(){
  drowRoute('#emart',496)
  // const tl = gsap.timeline({
  //   defaults: {
  //     duration:2
  //   }
  // });
  // tl.set('${target} .pick',{opacity:0})
  //   .to(map,{scale:1,x:0,y:0})
  //   .set('${target} .pick',{opacity:1})
  //   .fromTo('${target} .path',{strokeDashoffset:length},{strokeDashoffset:0})
  //   .to('${target} .pick',{
  //     opacity:1,
  //     motionPath:{
  //       path: '#emart .path',
  //       align: '#emart .path',
  //       alignOrigin: [0.5, 0.5],
  //     }
  //   },'<')
}

function handleMedi(){
  drowRoute('#medi',604)
  // const tl = gsap.timeline({
  //   defaults: {
  //     duration:2
  //   }
  // });
  // tl.set('#medi .pick',{opacity:0})
  //   .to(map,{scale:1,x:0,y:0})
  //   .set('#medi .pick',{opacity:1})
  //   .fromTo('#medi .path',{strokeDashoffset:604},{strokeDashoffset:0})
  //   .to('#emart .pick',{
  //     opacity:1,
  //     motionPath:{
  //       path: '#medi .path',
  //       align: '#medi .path',
  //       alignOrigin: [0.5, 0.5],
  //     }
  //   },'<')
}


current.addEventListener('click',handleCurrent)
mart.addEventListener('click',handleMart)
medi.addEventListener('click',handleMedi)




