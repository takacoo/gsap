//textPluginを使う時
// gsap.to('.big',{
//   duration:2,
//   text: {
//     value:'Hello world dayo',
//     delimiter:' ',//スペースで区切る
//   },
//   repeat:1,
//   yoyo:true,
//   repeatDelay:1,
// })

gsap.to('.cursor',{
  duration:1,
  opacity:0,
  repeat:-1,
  yoyo:true,
  repeatDelay:.4,
})

const text = ['html','css','javascript','react','next.js','typescript'];

function typing(arr){
  const tl = gsap.timeline()
  .to('.big',{
    duration:arr[0]==='javascript' ? 1.2 : .5,
    text: {
      value:arr[0],
      repeat:1,
      yoyo:true,
      repeatDelay:1,
    },
  })

  arr.push(arr.shift())

  gsap.delayedCall(3,typing,[arr])
}

typing(text)