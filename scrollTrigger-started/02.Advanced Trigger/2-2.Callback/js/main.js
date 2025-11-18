const h2 = document.querySelector('.section02 h2');

gsap.to(h2, {
  x: 200,
  scrollTrigger: {
    trigger: '.section02',
    start: '20% center',
    end: '80% center',
    scrub: true,
    markers: true,
    onEnter:()=>{
      h2.textContent = 'Enter';
    },
    onEnterBack:()=>{
      h2.textContent = 'Enter Back';
    },
    onLeave:()=>{
      h2.textContent = 'Leave';
    },
    onLeaveBack:()=>{
      h2.textContent = 'Leave Back';
    },
    onToggle:({direction})=>{
      if(direction === 1) {
        h2.style.color = 'red';
      } else {
        h2.style.color = 'blue';
      }
    },
    onRefresh:()=>{
      h2.textContent = 'Refresh';
    },
    onUpdate:({progress})=>{
      let prercentage = Math.round(progress * 100);
      h2.textContent = `${prercentage}%`;

      if(prercentage > 50) {
        gsap.set('.section02',{backgroundColor:'orange'})
      }else{
        gsap.set('.section02',{backgroundColor:'hotpink'})
    }
    },
  },
});

markers();