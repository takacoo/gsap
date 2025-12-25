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

/*----------------------------------------
	GSAP Defaults
----------------------------------------*/
gsap.defaults({
  ease: 'none',
});

/*----------------------------------------
	Master Timeline
----------------------------------------*/
const masterTimeline = gsap.timeline();

/*----------------------------------------
	Loading
----------------------------------------*/
const loadingTimeline = gsap.timeline();

// シルエット
loadingTimeline.to('.svg-left, .svg-right', {
  opacity: .7,
  x: 0,
  duration: 0.8,
  ease: 'back.out(1.7)',
  onComplete: () => {
    pulseAnimation.play();
  }
});
const pulseAnimation = gsap.to('.svg-left, .svg-right', {
  opacity: .7,
  duration: 2.5,
  ease: 'power2.inOut',
  repeat: -1,
  yoyo: true,
  paused: true
});

// プログレスバー
loadingTimeline.to('.loading-percent, .progress-bar-container', {
  opacity: 1,
  duration: 0.5,
  ease: 'power2.out',
  onStart: () => {
    pulseAnimation.play();
  }
}, '-=0.3');
loadingTimeline.to('.progress-bar-fill', {
  width: '100%',
  duration: 2.5,
  ease: 'power2.inOut',
  onUpdate: function() {
    const progress = Math.round(this.progress() * 100);
    const percentEl = document.querySelector('.loading-percent');
    if (percentEl) {
      percentEl.textContent = progress + '%';
    }
  }
}, '-=0.01')
.to('.gsap-fg', {
  clipPath: 'inset(0 0 0% 0)',
  duration: 2.5,
  ease: 'power5.in'
}, '<');

// シルエット動き
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

// ローディング完了
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

// ローディングフェードアウト
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


/*----------------------------------------
	Hero
----------------------------------------*/
const heroTimeline = gsap.timeline();

// 背景
heroTimeline.to('.hero-bg', {
  scale: 1.1,
  duration: .5,
  ease: 'power3.inOut'
});

// 左マッチョ
heroTimeline.fromTo('.hero-left',
  {
    opacity: 0,
    x: -100,
    y: 100
  },
  {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 1.5,
    ease: 'power2.out'
  },
  '-=0.5'
);

// 右マッチョ
heroTimeline.fromTo('.hero-right',
  {
    opacity: 0,
    x: 100,
    y: -100
  },
  {
    opacity: 1,
    x: 0,
    y: 0,
    duration: 1.5,
    ease: 'power2.out'
  },
  '-=1.3'
);

// タイトル
heroTimeline.add(() => {
  const heroTextSVG = document.querySelector('.hero-text-svg');
  if (!heroTextSVG) {
    console.error('hero-text-svg not found!');
    return;
  }
  const text = heroTextSVG.textContent.trim();
  heroTextSVG.textContent = '';
  // 分割
  const line1 = 'GSAP Animation ';
  const line2 = 'マッチョver.';
  let charIndex = 0;
  // 1行目
  line1.split('').forEach((char) => {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan.textContent = char;
    tspan.setAttribute('stroke-dasharray', '500');
    tspan.setAttribute('stroke-dashoffset', '500');
    const color = charIndex % 2 === 0 ? '#667eea' : '#764ba2';
    tspan.setAttribute('stroke', color);
    heroTextSVG.appendChild(tspan);
    charIndex++;
  });
  // 2行目
  line2.split('').forEach((char, index) => {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan.textContent = char;
    tspan.setAttribute('stroke-dasharray', '500');
    tspan.setAttribute('stroke-dashoffset', '500');
    tspan.setAttribute('font-size', '50');
    if (index === 0) {
      tspan.setAttribute('x', '50%');
      tspan.setAttribute('dy', '2em');
    }
    const color = charIndex % 2 === 0 ? '#667eea' : '#764ba2';
    tspan.setAttribute('stroke', color);
    heroTextSVG.appendChild(tspan);
    charIndex++;
  });
  const chars = heroTextSVG.querySelectorAll('tspan');
  chars.forEach((char, index) => {
    gsap.to(char, {
      strokeDashoffset: 0,
      duration: 0.5,
      delay: index * 0.08,
      ease: 'power2.inOut',
      onComplete: () => {
        const color = index % 2 === 0 ? '#667eea' : '#764ba2';
        gsap.to(char, {
          fill: color,
          duration: 0.3
        });
      }
    });
  });
}, '-=0.8');

// 左右マッチョふわふわ
heroTimeline.add(() => {
  gsap.set('.hero-left, .hero-right', {
    transformOrigin: '50% 50%'
  });
  gsap.to('.hero-left', {
    x: '+=15',
    y: '+=15',
    rotation: 8,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    repeatDelay: 0
  });
  gsap.to('.hero-right', {
    x: '-=15',
    y: '-=15',
    rotation: -8,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    repeatDelay: 0,
    delay: 0.6
  });
}, '+=0.5');


/*----------------------------------------
	Master Timeline Management
----------------------------------------*/
// masterTimeline.add(loadingTimeline);
masterTimeline.add(heroTimeline);



GSDevTools.create({
  animation: masterTimeline,
  container: document.body,
});

masterTimeline.play();