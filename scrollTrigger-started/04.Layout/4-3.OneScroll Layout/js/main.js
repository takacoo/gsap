const state = {
  isPlaying: true,
}

let currentPageIndex = 1;

const sections = gsap.utils.toArray('.section');

const pages = {
  page01: {
    enter:()=>{
      console.log('page01 enter');
    },
    leave:()=>{
      console.log('page01 leave');
    }
  },
  page02: {
    enter:()=>{
      console.log('page02 enter');
    },
    leave:()=>{
      console.log('page02 leave');
    }
  },
  page03: {
    enter:()=>{
      console.log('page03 enter');

      if(!ScrollTrigger.getById('section03')){
        ScrollTrigger.create({
          trigger:'.depth_wrapper',
          start:'top top',
          end:'bottom bottom',
          markers:true,

          onLeaveBack:()=>transition(2),
          onLeave:()=>transition(4)
        })
      }

      markers();

    },
    leave:()=>{
      console.log('page03 leave');
    }
  },
  page04: {
    enter:()=>{
      console.log('page04 enter');
    },
    leave:()=>{
      console.log('page04 leave');
    }
  },
}

function globalLeave(){
  gsap.to('h2',{y:0,opacity:1})
}

function globalEnter(){
  gsap.to('h2',{y:30,opacity:0})
}

function transition(index,dir){

  const {page01,page02,page03,page04} = pages;
  currentPageIndex = index;

  gsap.to('.wrapper',{
    duration:1.5,
    ease:'expo.inOut',

    onStart:()=>{

      globalLeave();

      switch(dir === 'up' ? index - 1 : index + 1){
        case 1:page01.leave();break;
        case 2:page02.leave();break;
        case 3:page03.leave();break;
        case 4:page04.leave();break;
      }
    },

    y: -innerHeight * (index - 1),
    onComplete:()=>{
      state.isPlaying = true;

      globalEnter();

      switch(index){
        case 1:page01.enter();break;
        case 2:page02.enter();break;
        case 3:page03.enter();break;
        case 4:page04.enter();break;
      }
    }
  })
}

function handleWheel(e){

  let dir = e.deltaY < 0 ? 'up' : 'down';

  if(!state.isPlaying) return;

  state.isPlaying = false;

  if(currentPageIndex === 3){
    return;
  }

  if(dir === 'up'){
    if(currentPageIndex <= 1){
      state.isPlaying = true;
      return;
    }
    --currentPageIndex;
  }else{
    if(currentPageIndex >= sections.length){
      state.isPlaying = true;
      return;
    }
    ++currentPageIndex;
  }

  transition(currentPageIndex,dir)

}

container.addEventListener('wheel',handleWheel)