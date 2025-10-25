const {chars} = new SplitText('h1',{type:'chars'})

const disX = gsap.utils.distribute({
  base:-300,
  amount:600,
})

const tl = gsap.timeline({
  repeat:-1,//タイムラインを繰り返す
});

tl.from(chars,{
  y:gsap.utils.wrap([-10,10]),
  opacity:0,
  filter:'blur(10px)',//重くなるから10px以上はあまり使わない方がいい
  stagger:{
    each:0.1,
    from:'center',
  }
})
.to(chars,{
  delay:.5,
  x:disX,
  duration:3,
  ease:'power3.inOut',
})
.to(chars,{
  delay:-1,//マイナスの値を入れると前のアニメーションに食い込んで再生される
  opacity:0,
  filter:'blur(10px)',
  stagger:{
    each:0.1,
    from:'edges',
  }
})