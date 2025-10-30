// 타임라인 자체를 멈추고 다시 재생 시키는 방법은?
// タイムライン自体を停止して再び再生する方法は？

let tl = gsap.timeline()
.to('.orange',{duration:2,x:300})
.addPause('>',gsap.delayedCall,[2,()=> tl.play()])
.to('.blue',{duration:2,x:300})

GSDevTools.create({animation:tl})

// const d =setTimeout(()=>{
//   sonsole.log('stop');
// },2000);
// clearTimeout(d);

// function wait(sec){
//   gsap.delayedCall(sec,()=>{
//     tl.play()
//   })
// }

// const t = gsap.delayedCall(2,()=>{
//   console.log('stop--');
// })