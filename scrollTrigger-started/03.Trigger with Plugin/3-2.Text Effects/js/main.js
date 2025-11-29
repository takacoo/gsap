// const split = new SplitText('p',{type:'lines'});
// const splitCover = new SplitText('p',{type:'lines',linesClass:'cover'});

// split.lines.forEach((line,index)=>{
//   ScrollTrigger.create({
//     trigger:splitCover.lines[index],
//     start:'top 90%',
//     end:'bottom center',
//     scrub:true,
//     markers:true,
//     animation:gsap.from(line,{
//       y:300,
//       opacity:0,
//       filter:'blur(10px)',
//       transformOrigin:'50% 50% -50',
//       rotateX:-180
//     }),
//   })
// })

let split;

function init(){
  split = new SplitText('p',{type:'lines'});
  const splitCover = new SplitText('p',{type:'lines',linesClass:'cover'});

  split.lines.forEach((line,index)=>{
    ScrollTrigger.create({
      trigger:splitCover.lines[index],
      start:'top 90%',
      end:'bottom center',
      animation:gsap.from(line,{
        y:300,
        opacity:0,
        filter:'blur(10px)',
        transformOrigin:'50% 50% -50',
        rotateX:-180
      }),
      scrub:true,
      markers:true,
    })
  })
  markers()
}



const debounce = (callback,time = 500)=>{
  let timeOut;
  return function(...args){
    clearTimeout(timeOut)
    timeOut = setTimeout(()=>{
      callback.apply(this,args)
    },time)
  }
}

function killAll(){
  split.revert();
  ScrollTrigger.getAll().forEach(item=>item.kill());
  init();
}

window.addEventListener('resize',debounce(killAll),1000);

window.addEventListener('load',init);









