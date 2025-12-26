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
	Rotation
----------------------------------------*/
// マーキーテキストアニメーション
const initMarquee = () => {
  // 上のマーキー（右から左）
  const track = document.querySelector('.rotation-marquee:not(.-bottom) .rotation-marquee__track');
  if (track) {
    const firstTitle = track.querySelector('.rotation-title');
    if (firstTitle) {
      const titleWidth = firstTitle.offsetWidth + 100;
      // 右から左へ
      gsap.to(track, {
        x: -titleWidth,
        duration: 10,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % titleWidth)
        }
      });
      const titles = track.querySelectorAll('.rotation-title');
      titles.forEach(title => {
        gsap.to(title, {
          backgroundPosition: '200% center',
          duration: 3,
          ease: 'none',
          repeat: -1
        });
      });
    }
  }
  // 下のマーキー（左から右）
  const trackBottom = document.querySelector('.rotation-marquee.-bottom .rotation-marquee__track');
  if (trackBottom) {
    const firstTitle = trackBottom.querySelector('.rotation-title');
    if (firstTitle) {
      const titleWidth = firstTitle.offsetWidth + 100;
      // 初期位置を左端に設定
      gsap.set(trackBottom, { x: -titleWidth });
      // 左から右へ
      gsap.to(trackBottom, {
        x: 0,
        duration: 10,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const val = parseFloat(x);
            return val >= 0 ? -titleWidth : val;
          })
        }
      });
      const titles = trackBottom.querySelectorAll('.rotation-title');
      titles.forEach(title => {
        gsap.to(title, {
          backgroundPosition: '200% center',
          duration: 3,
          ease: 'none',
          repeat: -1
        });
      });
    }
  }
};

const rotationViewer = {
  currentIndex: 0,
  totalImages: 12,
  isPlaying: false,
  autoPlayInterval: null,
  images: [],
  observer: null,
  init() {
    this.images = document.querySelectorAll('.rotation-img');
    this.totalImages = this.images.length;
    // ボタン要素取得
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playBtn = document.getElementById('playBtn');
    // イベントリスナー設定
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (playBtn) playBtn.addEventListener('click', () => this.togglePlay());
    // 初期表示
    this.showImage(0);
    this.updateIndexDisplay();
    // キーボード操作
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === ' ') {
        e.preventDefault();
        this.togglePlay();
      }
    });
    // ドラッグ操作
    this.setupDragControls();
    // IntersectionObserver でセクション検知
    this.setupSectionObserver();
  },
  showImage(index) {
    // 現在の画像をフェードアウト
    if (this.images[this.currentIndex]) {
      gsap.to(this.images[this.currentIndex], {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.inOut'
      });
    }
    this.currentIndex = index;
    if (this.images[this.currentIndex]) {
      gsap.to(this.images[this.currentIndex], {
        opacity: 1,
        duration: 0.15,
        ease: 'power2.inOut'
      });
    }
    this.updateIndexDisplay();
    // BANG! 表示チェック
    this.checkBang();
  },
  next() {
    const nextIndex = (this.currentIndex + 1) % this.totalImages;
    this.showImage(nextIndex);
  },
  prev() {
    const prevIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    this.showImage(prevIndex);
  },
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    if (this.isPlaying) {
      // 再生開始
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, 150);
    } else {
      // 再生停止
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  },
  updateIndexDisplay() {
    const currentIndexEl = document.getElementById('currentIndex');
    const totalIndexEl = document.getElementById('totalIndex');
    if (currentIndexEl) {
      currentIndexEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
    }
    if (totalIndexEl) {
      totalIndexEl.textContent = String(this.totalImages).padStart(2, '0');
    }
  },
  checkBang() {
    const bangRight = document.querySelector('.rotation-bang.-right');
    const bangLeft = document.querySelector('.rotation-bang.-left');
    // right
    if (this.currentIndex === 9 && bangRight) {
      gsap.to(bangRight, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(2)',
        onComplete: () => {
          gsap.to(bangRight, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            delay: 0.3,
            ease: 'back.in(2)'
          });
        }
      });
    }
    // left
    if (this.currentIndex === 3 && bangLeft) {
      gsap.to(bangLeft, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'back.out(2)',
        onComplete: () => {
          gsap.to(bangLeft, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            delay: 0.3,
            ease: 'back.in(2)'
          });
        }
      });
    }
  },
  setupDragControls() {
    const container = document.querySelector('.rotation-container');
    if (!container) return;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    const sensitivity = 30;
    const onStart = (e) => {
      isDragging = true;
      startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      currentX = startX;
      if (this.isPlaying) {
        this.togglePlay();
      }
    };
    const onMove = (e) => {
      if (!isDragging) return;
      currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const deltaX = currentX - startX;
      if (Math.abs(deltaX) >= sensitivity) {
        if (deltaX > 0) {
          this.prev();
        } else {
          this.next();
        }
        startX = currentX;
      }
    };
    const onEnd = () => {
      isDragging = false;
    };
    // マウスイベント
    container.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    // タッチイベント
    container.addEventListener('touchstart', onStart, { passive: true });
    container.addEventListener('touchmove', onMove, { passive: true });
    container.addEventListener('touchend', onEnd);
    // ドラッグ時の画像選択を防ぐ
    container.style.userSelect = 'none';
    container.style.webkitUserSelect = 'none';
  },
  setupSectionObserver() {
    const section = document.getElementById('rotation');
    if (!section) return;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // セクションに入ったら自動再生開始
          if (!this.isPlaying) {
            this.togglePlay();
          }
        } else {
          // セクションから出たら再生停止
          if (this.isPlaying) {
            this.togglePlay();
          }
        }
      });
    }, {
      threshold: 0.5 // セクションの50%が表示されたら検知
    });
    this.observer.observe(section);
  }
};

/*----------------------------------------
	Master Timeline Management
----------------------------------------*/
masterTimeline.add(loadingTimeline);
masterTimeline.add(heroTimeline);

// 360度ビューアーの初期化
document.addEventListener('DOMContentLoaded', () => {
  rotationViewer.init();
  initMarquee();
});

GSDevTools.create({
  animation: masterTimeline,
  container: document.body,
});

masterTimeline.play();