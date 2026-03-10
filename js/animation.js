/* js/animation.js — 시네마틱 애니메이션 시스템 */

/* ═══════════════════════════════
   1. 페이지 전환 — 슬라이드 + 페이드
═══════════════════════════════ */
function animPageOut(cb) {
  const overlay = document.getElementById('page-transition');
  overlay.style.transform = 'scaleY(0)';
  overlay.style.transformOrigin = 'bottom';
  overlay.style.transition = 'none';
  overlay.style.opacity = '1';
  requestAnimationFrame(() => {
    overlay.style.transition = 'transform .45s cubic-bezier(.76,0,.24,1)';
    overlay.style.transform = 'scaleY(1)';
    overlay.style.transformOrigin = 'bottom';
    setTimeout(cb, 450);
  });
}
function animPageIn() {
  const overlay = document.getElementById('page-transition');
  overlay.style.transformOrigin = 'top';
  overlay.style.transition = 'transform .45s cubic-bezier(.76,0,.24,1)';
  overlay.style.transform = 'scaleY(0)';
}

/* ═══════════════════════════════
   2. 카운터 애니메이션 (숫자 올라가기)
═══════════════════════════════ */
function animateCounter(el) {
  const text = el.textContent.trim();
  const match = text.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  if (!match) return;
  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr);
  const isInt = !numStr.includes('.');
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
    const current = target * eased;
    el.textContent = prefix + (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ═══════════════════════════════
   3. 텍스트 분해 애니메이션 (단어 단위)
═══════════════════════════════ */
function splitTextAnimate(el, delay = 0) {
  const text = el.innerText;
  const words = text.split(' ');
  el.innerHTML = words.map((w, i) =>
    `<span class="word-wrap"><span class="word" style="animation-delay:${delay + i * 60}ms">${w}</span></span>`
  ).join(' ');
}

/* ═══════════════════════════════
   4. 파티클 배경 (히어로)
═══════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 55;
  const particles = Array.from({length: PARTICLE_COUNT}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .35,
    vy: (Math.random() - .5) * .35,
    r: Math.random() * 1.5 + .5,
    opacity: Math.random() * .4 + .1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 연결선
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,170,210,${.12 * (1 - dist/130)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      });
    });

    // 점
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,170,210,${p.opacity})`;
      ctx.fill();

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══════════════════════════════
   5. Magnetic 버튼 효과
═══════════════════════════════ */
function initMagneticButtons() {
  document.querySelectorAll('.gnb-cta, .cms-modal-btn, .hs-arr').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * .25;
      const dy = (e.clientY - cy) * .25;
      btn.style.transform = `translate(${dx}px,${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ═══════════════════════════════
   6. 스크롤 기반 패럴랙스
═══════════════════════════════ */
function initParallax() {
  const hero = document.querySelector('.hero-main');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const active = hero.querySelector('.hero-slide.active .hs-bg');
    if (active) active.style.transform = `translateY(${y * .25}px)`;
  }, { passive: true });
}

/* ═══════════════════════════════
   7. 카드 호버 — 3D Tilt
═══════════════════════════════ */
function initTiltCards() {
  document.querySelectorAll('.pr-card, .skill-card, .ig-card, .biz-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - .5;
      const y = (e.clientY - rect.top)  / rect.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      card.style.transition = 'transform .1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .4s ease';
    });
  });
}

/* ═══════════════════════════════
   8. 스크롤 진행 바
═══════════════════════════════ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position:fixed; top:60px; left:0; right:0; height:2px;
    background:var(--blue); z-index:999; transform-origin:left;
    transform:scaleX(0); transition:transform .1s linear;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? window.scrollY / total : 0;
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
}

/* ═══════════════════════════════
   9. 숫자 카운터 — IntersectionObserver
═══════════════════════════════ */
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const nums = e.target.querySelectorAll('.who-stat-num, .kv-stat-num, .pir-num, .ig-result-num, .pcr-num');
      nums.forEach(n => animateCounter(n));
      io.unobserve(e.target);
    });
  }, { threshold: .4 });

  document.querySelectorAll('.who-stats, .kv-meta, .proj-item-result, .ig-result, .pr-card-result').forEach(el => io.observe(el));
}

/* ═══════════════════════════════
   10. 커스텀 커서
═══════════════════════════════ */
function initCursor() {
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.style.cssText = `
    position:fixed; width:10px; height:10px; border-radius:50%;
    background:var(--blue); pointer-events:none; z-index:99999;
    transform:translate(-50%,-50%); transition:transform .1s, width .25s, height .25s, opacity .25s;
    mix-blend-mode:screen; opacity:.8;
  `;
  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  ring.style.cssText = `
    position:fixed; width:36px; height:36px; border-radius:50%;
    border:1px solid rgba(0,170,210,.4); pointer-events:none; z-index:99998;
    transform:translate(-50%,-50%); transition:left .12s ease, top .12s ease, width .25s, height .25s;
  `;
  document.body.appendChild(cursor);
  document.body.appendChild(ring);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    ring.style.left   = mx + 'px'; ring.style.top   = my + 'px';
  });

  document.querySelectorAll('a, button, [onclick], .pr-card, .ig-card, .biz-card, [data-cms]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '16px'; cursor.style.height = '16px';
      ring.style.width = '52px'; ring.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px'; cursor.style.height = '10px';
      ring.style.width = '36px'; ring.style.height = '36px';
    });
  });
}

/* ═══════════════════════════════
   11. 히어로 텍스트 타이핑
═══════════════════════════════ */
function typeText(el, text, speed = 40) {
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, speed);
    }
  }
  type();
}

/* ═══════════════════════════════
   초기화
═══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // 페이지 전환 오버레이 생성
  const overlay = document.createElement('div');
  overlay.id = 'page-transition';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9990;
    background:var(--navy); pointer-events:none;
    transform:scaleY(0); transform-origin:top;
  `;
  document.body.appendChild(overlay);

  // CSS 주입
  const style = document.createElement('style');
  style.textContent = `
    /* 단어 애니메이션 */
    .word-wrap { display:inline-block; overflow:hidden; vertical-align:bottom; }
    .word {
      display:inline-block;
      animation: wordIn .65s cubic-bezier(.16,1,.3,1) both;
    }
    @keyframes wordIn {
      from { opacity:0; transform:translateY(100%); }
      to   { opacity:1; transform:translateY(0); }
    }

    /* 라인 드로우 */
    @keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }

    /* 섹션 슬라이드인 */
    .reveal {
      opacity:0;
      transform:translateY(40px);
      transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
    }
    .reveal.in { opacity:1; transform:translateY(0); }
    .reveal-left  { transform:translateX(-40px) !important; }
    .reveal-right { transform:translateX(40px) !important;  }
    .reveal-left.in, .reveal-right.in { transform:translateX(0) !important; }
    .reveal-scale  { transform:scale(.92) !important; }
    .reveal-scale.in { transform:scale(1) !important; }

    /* GNB 스크롤 쉐도우 */
    .gnb.scrolled { box-shadow:0 2px 20px rgba(0,0,0,.08); }

    /* 카드 트랜지션 */
    .pr-card, .skill-card, .ig-card {
      transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
      will-change: transform;
    }

    /* 스킬바 */
    .sb-bar { transition: transform 1.4s cubic-bezier(.16,1,.3,1) !important; }

    /* 히어로 슬라이드 */
    .hero-slide { transition: opacity .9s cubic-bezier(.16,1,.3,1) !important; }
    .hs-content > * {
      opacity:0; transform:translateY(18px);
      transition:opacity .7s ease, transform .7s ease;
    }
    .hero-slide.active .hs-content > * { opacity:1; transform:translateY(0); }
    .hero-slide.active .hs-content > *:nth-child(1) { transition-delay:.1s; }
    .hero-slide.active .hs-content > *:nth-child(2) { transition-delay:.25s; }
    .hero-slide.active .hs-content > *:nth-child(3) { transition-delay:.4s; }

    /* 비전 카드 호버 */
    .vp-goal { transition:background .25s, transform .35s cubic-bezier(.16,1,.3,1); }
    .vp-goal:hover { transform:translateY(-4px); }

    /* 푸터 링크 */
    .ft-link { transition:color .2s, padding-left .2s; }
    .ft-link:hover { padding-left:6px; }

    /* biz 카드 */
    .biz-card { transition:filter .3s, transform .35s cubic-bezier(.16,1,.3,1) !important; }
    .biz-card:hover { transform:translateY(-6px) !important; }

    /* PR 카드 이미지 */
    .pr-card-img { overflow:hidden; }
    .pr-card-img-bg { transition:transform .5s cubic-bezier(.16,1,.3,1) !important; }

    /* 다크 카드 화살표 회전 */
    .ig-dark-arrow { transition:all .3s cubic-bezier(.16,1,.3,1) !important; }
    .ig-dark-card:hover .ig-dark-arrow { transform:rotate(-45deg) !important; }
  `;
  document.head.appendChild(style);

  // 각 기능 초기화
  initParticles();
  initScrollProgress();
  initCounters();
  initCursor();

  // GNB 스크롤 쉐도우
  window.addEventListener('scroll', () => {
    document.querySelector('.gnb')?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // 카드 tilt — 초기 + 페이지 전환 후 재실행
  setTimeout(initTiltCards, 500);
  setTimeout(initMagneticButtons, 500);
});

/* 페이지 전환에 애니메이션 연결 */
const _origShowPage = window.showPage;
window.showPage = function(id) {
  animPageOut(() => {
    _origShowPage(id);
    setTimeout(() => {
      animPageIn();
      initTiltCards();
      initMagneticButtons();
      initCounters();
    }, 80);
  });
};

window.initTiltCards      = initTiltCards;
window.initMagneticButtons = initMagneticButtons;
window.splitTextAnimate    = splitTextAnimate;
