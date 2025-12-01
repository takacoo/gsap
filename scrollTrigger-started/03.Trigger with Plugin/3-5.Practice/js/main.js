barba.hooks.leave(()=>{
  ScrollTrigger.getAll().forEach(t=>t.kill())
})

barba.hooks.enter(()=>{
  scrollbar.update();
  scrollbar.scrollTo(0,0);
})

function pageLeave(){
  const scale = gsap.timeline()
  .to('.image_container',{scale:1,duration:1.5,ease:'power3.inOut'})
  .to('.image_container > div',{filter:'brightness(1)'})

  return scale
}

function main(){
  gsap.utils.toArray('nav li').forEach((li,i)=>{

    li.addEventListener('mouseenter',()=>{

      const exceptMe = `.image_container .cover:not(:nth-child(${i+1}))`;
      const me = `.image_container .cover:nth-child(${i+1})`;

      const navAnimation = gsap.timeline({defaults:{duration:.2}})
      .to('nav li',{opacity:.2})
      .to(li,{opacity:1},0)

      gsap.defaults({overwrite:'auto'})

      const imageAnimation = gsap.timeline()
      .to(exceptMe,{height:0,onComplete:()=>{
        gsap.set(me,{zIndex:++count},0)
      }})
      .to(me,{height:'100%'},0)
    })
  })
}

function rome(){
  console.log('rome');
}

function england(){
  console.log('england');
}

function india(){
  console.log('india');
}

function peru(){
  console.log('peru');
}

barba.init({
  views: [
    {namespace: 'main',beforeEnter:()=>main()},
    {namespace: 'rome',beforeEnter:()=>rome()},
    {namespace: 'england',beforeEnter:()=>england()},
    {namespace: 'india',beforeEnter:()=>india()},
    {namespace: 'peru',beforeEnter:()=>peru()},
  ],
  transitions: [
    {
      name:'default-transition',
      once:()=>markers(),
      leave:()=>{
        return pageLeave();
      },
      enter:()=>{

      },
    }
  ],
})