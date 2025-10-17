const $ = node => document.querySelector(node);



gsap.to('svg',{autoAlpha:1})

const pixelSecond = 200;
const animation = gsap.timeline();

animation.to('#star',{duration:1,x:1150})
          .to('#circle',{duration:2,x:1150})
          .to('#square',{duration:1,x:1150})

const children = animation.getChildren();
// const chidrenList = children.length;

// for(let i = 0; i < chidrenList; i++){
//   // console.log(children[i].startTime());
//   gsap.set('#tween'+i,{x:children[i].startTime() * pixelSecond})
//   gsap.set('#rect'+i,{width:children[i].duration() * pixelSecond})
//   // console.log(children[i].duration());
// }

//↓forをforEachに変えた

children.forEach((item,index)=>{
  // console.log(item,index);
  gsap.set('#tween'+index,{x:item.startTime() * pixelSecond})
  gsap.set('#rect'+index,{width:item.duration() * pixelSecond})
})

const time = $('#time');
const maxX = animation.duration() * pixelSecond;

function handleMoveHead(){
  // console.log(animation.time().toFixed(1));
  gsap.set('#playhead',{x:animation.progress() * maxX})
}

animation.eventCallback('onUpdate',handleMoveHead)

const dragger = Draggable.create('#playhead',{
  type: 'x',
  cursor: 'pointer',
  trigger: '#timeline',
  bounds: {minX:0,maxX:maxX},
  onDrag(event){
    animation.pause()
    animation.progress(this.x / maxX) //this.xはドラッグしたx座標 それにmaxXを割ってprogressの0~1の値にする
  }
})

$('#play').addEventListener('click',()=>{animation.play()})
$('#pause').addEventListener('click',()=>{animation.pause()})
$('#reverse').addEventListener('click',()=>{animation.reverse()})





















