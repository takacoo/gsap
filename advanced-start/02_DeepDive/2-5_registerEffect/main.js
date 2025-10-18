gsap.registerPlugin(GSDevTools, SplitText);//プラグインの登録

gsap.set('.stage',{autoAlpha:1})

gsap.registerEffect({
  name:'textEffect',
  extendTimeline:true,//trueにすると、タイムラインを継承することができる
  defaults:{
    y:-100, //yの箇所は自由に命名していい
    colors:['red','orange'],
  },
  effect:(target,config)=>{
    const split = new SplitText(target,{type:'chars'});

    const tl = gsap.timeline();
    tl.from(split.chars,{
      y:config.y,
      opacity:0,
      stagger:0.05,
    })
    .to(split.chars,{
      color:gsap.utils.wrap(config.colors)
    })
    return tl;
  }
})

const animation = gsap.timeline();

animation.textEffect('h1')
animation.textEffect('h2',{y:100,colors:['blue']})

// gsap.effects.textEffect('h1')
// gsap.effects.textEffect('h2',{y:100,colors:['blue']})//デフォルトは-100だが、個別に指定して変更することもできる


// const split = new SplitText('.stage h1',{type:'chars'});

// const tl = gsap.timeline();
// tl.from(split.chars,{
//   y:-100,
//   opacity:0,
//   stagger:0.05,
// })
// .to(split.chars,{
//   color:gsap.utils.wrap(['red','orange'])
// })
