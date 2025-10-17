const $ = node => document.querySelector(node);

const h1 = $('h1');

//  callback -> 나중에 일어나는 일 後で怒ること

// onComplete → 完了した時
// onUpdate → 更新された時
// onStart → 開始した時
// onRepeat → 繰り返しの時

let count = 0;

gsap.to('.orange',{
  duration: 2.5,
  y: 100,
  // repeat: -1,
  // onComplete(){
  //   console.log('おわたん');
  // }
  onComplete: complete,
  onCompleteParams: ['オレンジ',3],//引数は配列で渡す
  ontimeupdate() {
    h1.textContent = `アニメーション再生中`;
  },
  // onRepeat() {
  //   ++count
  //   console.log(count);
  // }
})

// function complete(){
//   console.log('おわたー');
// }

function complete(color,number) {

  console.log(this); //window
  console.log(this.targets()); //[div.orange]

  // h1.textContent = color + 'のアニメーション終了'; ES5の書き方
  h1.textContent = `${color}のアニメーション終了`; //ES6の書き方

  gsap.to('.orange',{rotation:360})
}


// // メソッドについて
// const user = {
//   name: 'John',
//   age: 20,
//   sayHi: function() { //一般関数
//     console.log(this); //user
//   },
//   sayBye: () => { //アロー関数
//     console.log(this); //window
//   },

//   sayGood(){ //コンサイスメソッド
//     console.log(this); //user
//   }
// }

// user.sayHi()

class Tiger {
  constructor(target,name){
    this.animation = gsap.to(target, {
      x:100,
      onComplete: this.complete,
      callbackScope: this,
    })
    this.animation.pause();
    this.name = name;
  }
  start(){
    this.animation.play();
  }
  complete(){
    console.log(this);
    this.render();
  }
  render(){
    h1.textContent = `${this.name}のアニメーション終了`;
  }
}

const pink = new Tiger($('.pink'),'ピンク');
const green = new Tiger($('.green'),'緑');
const blue = new Tiger($('.blue'),'青');