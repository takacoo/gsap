// 375px以下の場合全体を可変させる
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value =
      window.outerWidth > 375
        ? 'width=device-width,initial-scale=1'
        : 'width=375';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  addEventListener('resize', switchViewport, false);
  switchViewport();
})();

// ===========================
// GSAP Defaults
// ===========================
gsap.defaults({
  ease: 'none',
});

// ローディングアニメーション
const loadingTimeline = gsap.timeline();

// 左右のSVGが登場
loadingTimeline.to('.svg-left', {
  opacity: .7,
  x: 0,
  duration: 0.8,
  ease: 'back.out(1.7)'
})
.to('.svg-right', {
  opacity: .7,
  x: 0,
  duration: 0.8,
  ease: 'back.out(1.7)'
}, '-=0.6');

// SVGの透明度が徐々に濃くなるアニメーション（別タイムライン）
const pulseAnimation = gsap.to('.svg-left, .svg-right', {
  opacity: .7,
  duration: 2.5,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true,
  paused: true
});

// パーセント表示とプログレスバーのフェードイン
loadingTimeline.to('.loader-percent, .progress-bar-container', {
  opacity: 1,
  duration: 0.5,
  ease: 'power2.out',
  onStart: () => {
    pulseAnimation.play();
  }
}, '-=0.3');

// プログレスバーとGSAP文字が同時に進むアニメーション
loadingTimeline.to('.progress-bar-fill', {
  width: '100%',
  duration: 2.5,
  ease: 'power2.inOut',
  onUpdate: function() {
    const progress = Math.round(this.progress() * 100);
    const percentEl = document.querySelector('.loader-percent');
    if (percentEl) {
      percentEl.textContent = progress + '%';
    }
  }
}, '-=0.01')
.to('.gsap-fg', {
  clipPath: 'inset(0 0 0% 0)', // 右から左に変更
  duration: 2.5,
  ease: 'power5.in'
}, '<'); // 同じタイミングで開始

// SVGが脈動するアニメーション
loadingTimeline.to('.svg-left, .svg-right', {
  scale: 1.1,
  duration: 0.3,
  yoyo: true,
  repeat: 1,
  ease: 'power2.inOut',
  onStart: () => {
    pulseAnimation.pause();
  }
}, '-=0.5');

// ローディング完了時のアニメーション
loadingTimeline.to('.svg-left', {
  x: -100,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.in'
})
.to('.svg-right', {
  x: 100,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.in'
}, '<');

// ローディング画面を上にスライドアウト
loadingTimeline.to('#loading', {
  y: '-100%',
  duration: 0.8,
  ease: 'power3.inOut',
  onComplete: () => {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
  }
}, '-=0.3');

// GSDevToolsでローディングタイムラインをデバッグ
GSDevTools.create({
  animation: loadingTimeline,
  container: document.body,
  paused: true // デバッグしやすいように最初は一時停止
});