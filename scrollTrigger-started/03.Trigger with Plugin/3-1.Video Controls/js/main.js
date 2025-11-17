const container = document.querySelector('#container');
const scrollbar = Scrollbar.init(container,{
  damping: .1,//値が少ないほど滑る
  alweyShowTracks: true,//スクロールしてなくてもスクロールバー表示
})

markers()