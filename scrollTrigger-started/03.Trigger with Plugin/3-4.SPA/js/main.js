barba.hooks.leave(() => {
  ScrollTrigger.getAll().forEach(t=>t.kill())
})

barba.hooks.after(() => {
  scrollbar.update(),
  scrollbar.scrollTo(0,0)

  markers()
})

function pageLeave(target){
  const tl = gsap.timeline()
  .to('h2',{y:30})
  .to(target,{opacity:0},0)
  return tl
}

function pageEnter(target){
  const tl = gsap.timeline()
  .from('h2',{y:-30})
  .from(target,{opacity:0},0)
  return tl
}

function home(){
  ScrollTrigger.create({
    trigger: '.section03',
    start: 'top center',
    end: 'bottom center',
    animation:gsap.to('.box',{x:300}),
    scrub:true,
    markers:true,
  })
}

function about(){
  ScrollTrigger.create({
    trigger: '.section03',
    start: 'top center',
    end: 'bottom center',
    animation:gsap.to('.box',{x:200,rotation:360}),
    scrub:true,
    markers:true,
  })
}

function contact(){
  ScrollTrigger.create({
    trigger: '.section03',
    start: 'top center',
    end: 'bottom center',
    animation:gsap.to('.box',{x:200,rotation:180,y:100}),
    scrub:true,
    markers:true,
  })
}

barba.init({
  views: [
    {namespace: 'home',beforeEnter:() => home()},
    {namespace: 'about',beforeEnter:() => about()},
    {namespace: 'contact',beforeEnter:() => contact()}
  ],
  transitions: [
    {
      name:'opacity-transition',
      leave:({current}) => pageLeave(current.container),
      enter({next}) {
        pageEnter(next.container)
      },
      once:() => markers()
    }
  ]
})

// この書き方だとページ遷移後に再度実行されない
// ScrollTrigger.create({
//   trigger: '.section03',
//   start: 'top center',
//   end: 'bottom center',
//   animation:gsap.to('.box',{x:300}),
//   scrub:true,
//   markers:true,
// })