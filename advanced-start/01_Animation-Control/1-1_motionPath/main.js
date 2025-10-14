const $ = (node) => document.querySelector(node);

const tiger = $('#tiger');
const button = $('#button');
const time = $('#time');
const progressSlider = $('#progressSlider');

const animation =gsap.to(tiger,{
  duration:6,
  motionPath:{
    path: '#route',
    align: tiger,
  },

  // onUpdate:() => { //コールバック関数 持続的アップデート(アニメーションが動いている間上書きされ続ける)
  //   console.log('playing');
  // },
  // onComplete:() => { //コールバック関数
  //   button.textContent = 'start';
  // }

  onUpdate: update,
  onComplete: () => button.textContent = 'start',
})

function update(){
  time.textContent = animation.time().toFixed(2);
  progressSlider.value = animation.progress();
}

progressSlider.addEventListener('input',(e) => {
  const target = e.currentTarget;
  button.textContent = 'play';
  // console.log(target.value);
  animation.progress(target.value).pause();
})

function setButtonState(){
  button.textContent = animation.paused() ? 'play' : 'pause';
}

button.addEventListener('click',() => {
  animation.paused(!animation.paused()); // trueとfalseを切り替える
  if(animation.progress() === 1){
    animation.restart();
  }

  // if(animation.paused()){
  //   button.textContent = 'play';
  // }else{
  //   button.textContent = 'pause';
  // }

  // button.textContent = animation.paused() ? 'play' : 'pause';
  setButtonState();
});

const home = $('#home');
const mountain = $('#mountain');
const river = $('#river');
const company = $('#company');
const svg = $('svg');

svg.addEventListener('click',(e) => {
  const target = e.target.closest('g');
  if(!target) return;

  const id = target.getAttribute('id');
  if(!id){
    return;
  }

  if(id === "svg") return;

  let progress = 0;
  animation.pause();
  // console.log(id);
  switch(id){
    case 'river':
      progress = .47;
      break;
    case 'home':
      progress = 0;
      break;
    case 'mountain':
      progress = .21;
      break;
    case 'company':
      progress = 1;
      break;
  }
  gsap.to(animation,{progress:progress,duration:3})
  setButtonState();
})

// animation.pause();
// river.addEventListener('click',() => {
//   gsap.to(animation,{progress:.47,duration:3})
// })

// animation.pause();
// home.addEventListener('click',() => {
//   gsap.to(animation,{progress:0,duration:3})
// })

// animation.pause();
// mountain.addEventListener('click',() => {
//   gsap.to(animation,{progress:.21,duration:3})
// })

// animation.pause();
// company.addEventListener('click',() => {
//   gsap.to(animation,{progress:1,duration:3})
// })


// gsap.to(animation,{time:3,duration:5})
// gsap.to(animation,{progress:1,duration:1})
// gsap.to(animation,{timeScale:2,duration:1})


// animation.paused(ture);
// animation.reverse(true);

// setInterval(() => {
//   console.log(animation.time());
// }, 100);

// animation.progress();

// console.log(animation.progress());