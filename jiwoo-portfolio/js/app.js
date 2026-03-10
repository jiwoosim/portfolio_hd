/* js/app.js — 페이지 전환 · 슬라이드 · 애니메이션 */

/* ═══════════════════════════════
   페이지 전환 (SPA)
═══════════════════════════════ */
const PAGES = ['home', 'who', 'skill', 'insight', 'vision'];

function showPage(id) {
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    const nav = document.getElementById('nav-' + p);
    if (el) el.classList.remove('active');
    if (nav) nav.classList.remove('active');
  });

  const target = document.getElementById('page-' + id);
  const navEl  = document.getElementById('nav-' + id);
  if (target) target.classList.add('active');
  if (navEl)  navEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 페이지별 초기화
  if (id === 'skill')   setTimeout(animateBars, 300);
  if (id === 'insight') initInsightTabs();

  // reveal 재트리거
  setTimeout(() => triggerReveal('#page-' + id), 80);
}

/* ═══════════════════════════════
   히어로 슬라이드
═══════════════════════════════ */
let curSlide = 0;
const SLIDE_COUNT = 3;
let slideTimer = null;

function goSlide(n) {
  const prev = document.getElementById('slide-' + curSlide);
  const dots  = document.querySelectorAll('.hs-dot');
  if (prev) prev.classList.remove('active');
  if (dots[curSlide]) dots[curSlide].classList.remove('on');

  curSlide = n;
  const next = document.getElementById('slide-' + curSlide);
  if (next) next.classList.add('active');
  if (dots[curSlide]) dots[curSlide].classList.add('on');

  resetSlideTimer();
}
function nextSlide() { goSlide((curSlide + 1) % SLIDE_COUNT); }
function prevSlide() { goSlide((curSlide - 1 + SLIDE_COUNT) % SLIDE_COUNT); }
function resetSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 4500);
}

/* ═══════════════════════════════
   스킬바 애니메이션
═══════════════════════════════ */
function animateBars() {
  document.querySelectorAll('.sb-bar').forEach(b => b.classList.add('animated'));
}

/* ═══════════════════════════════
   Scroll Reveal
═══════════════════════════════ */
function triggerReveal(scope) {
  const els = document.querySelectorAll((scope || '') + ' .reveal');
  els.forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), i * 100);
  });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.07 });

function observeReveals() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ═══════════════════════════════
   Insight 탭 전환
═══════════════════════════════ */
const INSIGHT_TABS = ['뉴스', '블로그', '인사이트', '수주 프로젝트'];

function initInsightTabs() {
  // 탭은 이미 HTML에서 렌더링됨; 첫 탭 활성화만
}

function switchInsightTab(tab) {
  document.querySelectorAll('.pr-tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('pr-tab-' + tab);
  if (el) el.classList.add('active');

  // 탭별 카드 필터
  document.querySelectorAll('.pr-card').forEach(card => {
    const category = card.dataset.category || '';
    if (tab === '전체' || category === tab) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  // 카운트 업데이트
  const visible = document.querySelectorAll('.pr-card:not([style*="none"])').length;
  const countEl = document.getElementById('pr-count');
  if (countEl) countEl.innerHTML = `총 <strong>${visible}</strong>건`;
}

/* ═══════════════════════════════
   검색 기능
═══════════════════════════════ */
function searchCards() {
  const q = document.getElementById('pr-search-input')?.value?.toLowerCase() || '';
  document.querySelectorAll('.pr-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
  const visible = document.querySelectorAll('.pr-card:not([style*="none"])').length;
  const countEl = document.getElementById('pr-count');
  if (countEl) countEl.innerHTML = `총 <strong>${visible}</strong>건`;
}

/* ═══════════════════════════════
   초기화
═══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  observeReveals();
  resetSlideTimer();
  // 홈 초기 reveal
  setTimeout(() => triggerReveal('#page-home'), 200);
});

// 전역 노출 (onclick 사용)
window.showPage  = showPage;
window.goSlide   = goSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.switchInsightTab = switchInsightTab;
window.searchCards = searchCards;
