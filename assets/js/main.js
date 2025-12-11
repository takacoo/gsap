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

// ===========================
// Section 1: Hero Parallax
// ===========================
function heroParallax() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      // markers: true,
    }
  });

  gsap.utils.toArray('.parallax').forEach(layer => {
    const depth = layer.dataset.depth;
    const movement = -(layer.offsetHeight * depth);
    tl.to(layer, { y: movement, ease: 'none' }, 0);
  });
}

// ===========================
// Section 2: SVG Drawing + MotionPath
// ===========================
function svgAnimation() {
  const line = gsap.timeline()
    .from('.line01', { drawSVG: 0 }, .84)
    .from('.line02', { drawSVG: 0 }, 1.2)
    .from('.line03', { drawSVG: 0 }, 1.92)
    .from('.line04', { drawSVG: 0 }, 2.46)
    .from('.line05', { drawSVG: 0 }, 3.08);

  const pulse = gsap.timeline({
    defaults: {
      scale: 2,
      autoAlpha: 1,
      transformOrigin: 'center',
      ease: 'elastic(2.5,1)'
    },
  })
    .to('.ball02, .text01', {}, .84)
    .to('.ball03, .text02', {}, 1.2)
    .to('.ball04, .text03', {}, 1.92);

  const master = gsap.timeline()
    .to('.ball01', { autoAlpha: 1, duration: .05 })
    .from('.path', { drawSVG: 0, duration: 4 }, 0)
    .to('.ball01', {
      motionPath: {
        path: '.path',
        align: '.path',
        alignOrigin: [0.5, 0.5],
      },
      duration: 4,
    }, 0)
    .add(pulse, 0)
    .add(line, 0);

  ScrollTrigger.create({
    trigger: '.svg-section',
    start: 'top center',
    end: 'bottom center',
    animation: master,
    scrub: true,
    // markers: true,
  });
}

// ===========================
// Section 3: Text Effects (SplitText)
// ===========================
let split;

function textAnimation() {
  split = new SplitType('.text-container p', { types: 'lines' });
  const splitCover = new SplitType('.text-container p', { types: 'lines', lineClass: 'cover' });

  split.lines.forEach((line, index) => {
    ScrollTrigger.create({
      trigger: splitCover.lines[index],
      start: 'top 90%',
      end: 'bottom center',
      animation: gsap.from(line, {
        y: 300,
        opacity: 0,
        filter: 'blur(10px)',
        transformOrigin: '50% 50% -50',
        rotateX: -180
      }),
      scrub: true,
      // markers: true,
    });
  });
}

// Debounce function for resize
const debounce = (callback, time = 500) => {
  let timeOut;
  return function (...args) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      callback.apply(this, args);
    }, time);
  };
};

// Kill and reinitialize text animation on resize
function killTextAnimation() {
  if (split) {
    split.revert();
  }
  ScrollTrigger.getAll().forEach(item => {
    if (item.trigger && item.trigger.closest('.text-section')) {
      item.kill();
    }
  });
  textAnimation();
}

// ===========================
// Section 4: Horizontal Scroll Gallery
// ===========================
function horizontalScroll() {
  const wrapper = document.querySelector('.horizontal-content');
  const end = wrapper.scrollWidth - window.innerWidth;

  gsap.to(wrapper, {
    x: -end,
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-section',
      start: 'top top',
      end: '+=3000',
      scrub: 1,
      pin: true,
      // markers: true,
    }
  });
}

// ===========================
// Section 5: Canvas Video Scrub
// ===========================
function canvasAnimation() {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const frameCount = 50; // 簡易版：50フレーム
  const currentFrame = (index) => {
    // デモ用：ダミー画像を使用
    // 実際のプロジェクトでは画像シーケンスのパスを指定
    return `https://picsum.photos/800/600?random=${index}`;
  };

  const videoSection = {
    frame: 0
  };

  // Create image array
  const images = Array(frameCount).fill(null).map((_, i) => {
    const img = new Image();
    img.src = currentFrame(i);
    return img;
  });

  const tl = gsap.timeline()
    .to(videoSection, { frame: frameCount - 1, snap: 'frame', ease: 'none' })
    .to('#canvas', { filter: 'brightness(2)', scale: 1.5 }, 0);

  ScrollTrigger.create({
    trigger: '.canvas-section',
    start: 'top top',
    pin: true,
    end: '+=3000',
    scrub: true,
    animation: tl,
    onUpdate: render,
    // markers: true,
  });

  images[0].onload = render;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = images[videoSection.frame];
    if (img.complete) {
      // Center the image
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }

  // Render after a delay to ensure images are loaded
  setTimeout(() => {
    render();
  }, 1000);
}

// ===========================
// Section 6: 3D Stagger Animation
// ===========================
function staggerAnimation() {
  const duration = 0.5;
  const pause = 1;
  const numberOfTargets = gsap.utils.toArray('.utils > div').length;
  const stagger = duration + pause;
  const delay = stagger * (numberOfTargets - 1) + pause;

  gsap.set('.utils > div', {
    transformOrigin: '50% 50% -50'
  });

  const tl = gsap.timeline();

  tl.from('.utils > div', {
    rotationX: -90,
    opacity: 0,
    duration: duration,
    stagger: {
      each: stagger,
      repeat: -1,
      repeatDelay: delay,
    }
  })
  .to('.utils > div', {
    rotationX: 90,
    opacity: 0,
    duration: duration,
    stagger: {
      each: stagger,
      repeat: -1,
      repeatDelay: delay,
    }
  }, stagger);
}

// ===========================
// Section 7: Scroll Progress
// ===========================
function progressAnimation() {
  // Progress Bar
  ScrollTrigger.create({
    trigger: '.progressHolder',
    start: 'top 100px',
    endTrigger: '.progress-section',
    end: 'bottom bottom',
    animation: gsap.to('.progress', { scaleX: 1, ease: 'none' }),
    onUpdate: ({ progress }) => {
      document.querySelector('.percent span').textContent = Math.round(progress * 100);
    },
    pin: true,
    pinSpacing: false,
    // markers: true,
    scrub: true,
  });

  // SVG Progress Shapes
  const circle = document.querySelector('.circleContainer circle');
  const rect = document.querySelector('.rectContainer rect');

  const progressSVG = gsap.timeline({
    defaults: {
      ease: 'none',
    }
  })
    .from(circle, { drawSVG: 0 })
    .from(rect, { drawSVG: 0 }, 0);

  ScrollTrigger.create({
    trigger: '.scroll-content',
    start: 'top top',
    end: 'bottom bottom',
    animation: progressSVG,
    scrub: true,
    // markers: true,
  });
}

// ===========================
// Section 8: Layered Pinning
// ===========================
function layeredPinning() {
  const layers = gsap.utils.toArray('.layer');

  layers.forEach((layer, index) => {
    const isLast = index === layers.length - 1;
    
    ScrollTrigger.create({
      trigger: layer,
      start: 'top top',
      end: isLast ? '+=1000' : 'bottom top',
      pin: true,
      pinSpacing: false,
      // markers: true,
    });

    // Slide in animation for each layer (except first)
    if (index > 0) {
      gsap.from(layer, {
        xPercent: index % 2 ? 100 : -100,
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'top top',
          scrub: 1,
          // markers: true,
        }
      });
    }
  });
}

// ===========================
// Initialize All Animations
// ===========================
function init() {
  heroParallax();
  svgAnimation();
  textAnimation();
  horizontalScroll();
  canvasAnimation();
  staggerAnimation();
  progressAnimation();
  layeredPinning();
  markers(); // Call markers helper
}

// ===========================
// Event Listeners
// ===========================
window.addEventListener('load', init);
window.addEventListener('resize', debounce(killTextAnimation, 1000));