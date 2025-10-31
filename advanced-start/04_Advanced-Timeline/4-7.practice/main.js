// 1. [ ] 페이지별 enter / leave 애니메이션 구성
// 2. [ ] title enter / leave 애니메이션
// 3. [ ] section 정렬하기
// 4. [ ] event 연결하기
// 5. [ ] next와 current구분 후 애니메이션 재생
// 6. [ ] playing 상태 변수 제어
// 7. [ ] 시즌별 text 변경

// 1. [ ] ページ別 enter/leave アニメーションの設定
// 2. [ ] title enter / leave アニメーション
// 3. [ ] section 並べ替える
// 4. [ ] eventを接続する
// 5. [ ] nextとcurrent区切り後のアニメーション再生
// 6. [ ] playing 状態変数の制御
// 7. [ ] シーズン別のテキスト変更

function page01(){
  const page = '#page01';
  const enter = gsap.timeline({
    defaults:{
      duration:1,
      opacity:0,
    },
    paused:true,
  })
  .to(page,{opacity:1})
  .from(page + ' .bg',{scale:2})
  .from(page + ' .woody',{y:30},'-=.2')
  .from(page + ' .forky',{y:30},'-=.2')
  .from(page + ' .chair',{x:-30},'<')
  .from(page + ' .bag',{x:-30},'-=.5')
  .from(page + ' .jessie',{x:-30},'-=.5')
  .from(page + ' .toy > div',{duration:.1,y:30,stagger:.05},'-=.5')

  const leave = gsap.timeline({
    defaults:{
      duration:1,
      opacity:0,
    },
    paused:true,
  })
  .to(page + ' .toy > div',{duration:.1,y:30,stagger:.05},'-=.5')
  .to(page + ' .woody',{y:30},'-=.2')
  .to(page + ' .forky',{y:30},'-=.2')
  .to(page + ' .chair',{x:-30},'<')
  .to(page + ' .bag',{x:-30},'-=.5')
  .to(page + ' .jessie',{x:-30},'-=.5')
  .to(page + ' .bg',{duration:.2,scale:2,opacity:1},'<')
  .to(page,{},'<')

  return [enter,leave];
}



function page02(){
  const page = '#page02';
  const enter = gsap.timeline({
    defaults:{
      duration:1,
      opacity:0,
    },
    paused:true,
  })
  .to(page,{opacity:1})
  .from(page + ' .floor',{y:50},'<')
  .from(page + ' .left_bg',{x:-50},'<')
  .from(page + ' .right_bg',{x:50},'<')
  .from(page + ' .woody',{y:30})
  .from(page + ' .forky',{y:30},'-=.5')

  const leave = gsap.timeline({
    defaults:{
      duration:1,
      opacity:0,
    },
    paused:true,
  })
  .to(page + ' .woody',{y:30})
  .to(page + ' .forky',{y:30},'-=.5')
  .to(page + ' .floor',{y:50},'<')
  .to(page + ' .left_bg',{x:-50},'<')
  .to(page + ' .right_bg',{x:50},'<')
  .to(page,{},'<')

  return [enter,leave];
}


function page03(){
  const page = '#page03';
  const enter = gsap.timeline({
    defaults:{
      duration:1,
      opacity:0,
    },
    paused:true,
  })
  .to(page,{opacity:1})

  const leave = gsap.timeline({
    defaults:{
      duration:1,
      opacity:0,
    },
    paused:true,
  })

  return [enter,leave];
}

window.addEventListener('load',()=>{
  page03()[0].play();
})