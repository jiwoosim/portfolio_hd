/* js/post.js — 게시물 상세 보기 + 관리자 에디터 */

const POST_STORAGE_KEY = 'jiwoo_posts';

/* ═══════════════════════════════
   기본 게시물 데이터
═══════════════════════════════ */
const DEFAULT_POSTS = [
  {
    id: 'post-1',
    projectId: 'p1',
    category: '수주·제안',
    tag: '전략기획 · 제안서 설계',
    title: '농협은행 통합 인증센터 20억 수주 기여 — CISO 거버넌스 스토리라인 재설계',
    date: '2024.09',
    kpis: [{ num: '20억', label: '수주' }, { num: '3대', label: '은행 활용' }],
    tags: ['제안서 설계', 'CISO', 'B2B 커뮤니케이션', '보안', '금융'],
    content: `## 배경 — 기술이 말을 잃는 순간

농협은행 CISO팀에 통합 인증센터 구축 제안을 앞두고, 최초 작성된 제안서를 검토했습니다. 문서는 정확했지만 **설득력이 없었습니다.**

생체인증·PKI·토큰 인증을 통합하는 기술 스펙이 장황하게 나열되어 있었고, 의사결정자인 CISO가 '왜 지금 이 시스템이 필요한가'를 판단할 근거가 빠져 있었습니다.

---

## 문제 정의 — CISO가 보는 세상으로

저는 제안서를 처음부터 다시 설계했습니다. 출발점은 단순한 질문이었습니다.

> "CISO는 무엇을 두려워하는가?"

규제 위반, 보안 사고 책임, 감사 대응 실패. 이 세 가지가 CISO의 실질적 리스크입니다.

---

## 재설계 스토리라인

기존의 기술 스펙 나열 대신, 다음 4단계 구조로 재설계했습니다.

<div class="highlight-box"><p><strong>규제 리스크 →</strong> 금융보안원 CISO 의무화, 전자금융거래법 개정 — 지금 하지 않으면 감사 대상<br><strong>책임 주체 →</strong> CISO 단독 책임 구조에서 통합 거버넌스 체계로 전환 필요<br><strong>운영 시나리오 →</strong> 사고 발생 시 대응 흐름 시뮬레이션으로 현실감 부여<br><strong>통합 아키텍처 →</strong> 그 위에서만 기술 스펙을 배치</p></div>

---

## 과정 — 3개사 경쟁 PT

3개 SI·보안 기업이 경쟁하는 PT였습니다. 저는 발표 전날까지 CISO 페르소나로 문서를 재독하며 "이 문장이 CISO의 두려움을 건드리는가"를 기준으로 편집했습니다.

---

## 결과

<div class="result-grid">
  <div class="result-item"><div class="result-num">20억</div><div class="result-label">수주 금액</div></div>
  <div class="result-item"><div class="result-num">3개사</div><div class="result-label">경쟁 PT 최종 선정</div></div>
  <div class="result-item"><div class="result-num">3대</div><div class="result-label">은행 전략 자료 확산</div></div>
</div>

농협은행 최종 선정 후, 신한·국민·우리은행 담당자들이 같은 제안서를 내부 전략 자료로 요청했습니다. **설득 구조 자체가 업계 표준이 된 것입니다.**

---

## 인사이트

기술 PR에서 가장 어려운 것은 '정확하게 쓰기'가 아닙니다. **의사결정자의 언어로 번역하기**입니다. CISO는 기술자가 아닌 경영자입니다. 그들이 보는 세상의 언어로 기술을 재배치할 때, 기술은 비로소 '선택'이 됩니다.`
  },
  {
    id: 'post-2',
    projectId: 'p2',
    category: '전시·DX',
    tag: '전시 DX · 리드 파이프라인',
    title: 'Intersec Dubai 2025 — DX 전환으로 유효 미팅 97% 상승, 기획 시스템 상용 출시',
    date: '2025.01',
    kpis: [{ num: '+97%', label: '유효미팅' }, { num: '54%', label: '리드 비중' }, { num: '상용 출시', label: '기획 시스템' }],
    tags: ['전시 기획', 'DX', '리드 파이프라인', '생체인증', '글로벌'],
    content: `## 배경 — 전시가 영업이 되려면

세계 최대 보안 전시회 Intersec Dubai 2025. 전년도 전시 결과를 분석하자 문제가 보였습니다.

부스는 화려했지만 **유효 미팅 비중이 32%에 불과**했습니다. 명함은 쌓였지만 실질적 구매 의향을 가진 리드는 적었습니다.

---

## 핵심 가설

> "방문객이 제품을 '경험'하면, 스스로 영업 파이프라인에 들어온다"

저는 전시 구조를 전면 재설계했습니다. 장비 나열형 부스에서 **'끊김없는 보안 운영 경험'** 플로우로 전환했습니다.

---

## 기획 핵심 — 생체인증 등록 시스템

R&D팀과 협업해 방문객이 부스에 입장하면 생체인증으로 등록하고, 이후 모든 체험이 해당 ID에 연결되는 시스템을 기획·개발했습니다.

<div class="highlight-box"><p><strong>등록 →</strong> 생체인증으로 방문객 ID 생성<br><strong>체험 →</strong> 각 솔루션 데모가 동일 ID로 연결<br><strong>상담 →</strong> 체험 이력이 영업팀에 실시간 공유<br><strong>사후 →</strong> 맞춤 팔로업 자동화</p></div>

---

## 결과

<div class="result-grid">
  <div class="result-item"><div class="result-num">+97%</div><div class="result-label">유효 미팅 증가</div></div>
  <div class="result-item"><div class="result-num">54%</div><div class="result-label">유효 리드 비중</div></div>
  <div class="result-item"><div class="result-num">+18%</div><div class="result-label">전체 미팅 증가</div></div>
  <div class="result-item"><div class="result-num">출시</div><div class="result-label">시스템 상용화</div></div>
</div>

기획한 방문객 등록 시스템은 전시 후 실제 상용 제품으로 출시되었습니다.

---

## 인사이트

전시는 브랜딩 행사가 아닙니다. **영업 파이프라인의 최상단**입니다. 방문객이 부스에서 제품을 '경험'하게 만들고, 그 경험이 자동으로 리드 데이터로 변환되는 구조를 설계할 때 전시는 진짜 자산이 됩니다.`
  },
  {
    id: 'post-3',
    projectId: 'p3',
    category: '디지털PR·GEO',
    tag: 'GEO · IA 설계 · 콘텐츠 퍼널',
    title: 'GEO 전략 도입 — AI 검색 선점, GA4 검색 유입 26%↑ · MQL 5건 확보',
    date: '2024.06',
    kpis: [{ num: '+26%', label: '검색 유입' }, { num: '5건', label: 'MQL' }, { num: 'AI 인용', label: 'GPT·Gemini' }],
    tags: ['GEO', 'AI 검색', 'SEO', 'IA 설계', 'WordPress', 'GA4'],
    content: `## 배경 — 검색이 바뀌고 있다

2024년 초, 저는 Google 검색 결과 상단에 AI 요약이 등장하기 시작한 것에 주목했습니다.

기존 SEO 방식으로는 AI 요약에 인용될 수 없다는 것을 파악하고, GEO(Generative Engine Optimization) 전략을 국내 B2B 보안 마케팅에 최초로 적용했습니다.

---

## GEO 전략의 핵심

> "AI가 답을 생성할 때, 가장 먼저 인용하는 소스가 되어라"

AI 검색 엔진은 권위 있는 구조화된 정보를 선호합니다.

<div class="highlight-box"><p><strong>IA(정보 아키텍처) 재설계 →</strong> 의사결정자별 질문 시나리오 기반으로 페이지 구조 재편<br><strong>콘텐츠 형식 →</strong> FAQ·비교표·정의 위주로 AI 인용 최적화<br><strong>권위 신호 →</strong> 규제·표준·수상 이력 등 외부 검증 요소 전면 배치</p></div>

---

## WordPress 직접 구축

기술팀에 의존하지 않고 WordPress로 홈페이지를 직접 구축했습니다. GEO 최적화 구조를 즉각 반영하기 위해서입니다.

---

## 결과

<div class="result-grid">
  <div class="result-item"><div class="result-num">+26%</div><div class="result-label">GA4 검색 유입</div></div>
  <div class="result-item"><div class="result-num">5건</div><div class="result-label">MQL 확보</div></div>
  <div class="result-item"><div class="result-num">3개</div><div class="result-label">AI 플랫폼 인용</div></div>
</div>

GPT, Gemini, Google AI에서 자사 솔루션이 우선 인용되기 시작했고, 인바운드 MQL 5건을 확보했습니다.

---

## 인사이트

GEO는 단순히 SEO의 다음 버전이 아닙니다. **AI가 답을 생성하는 방식 자체를 이해하고, 그 메커니즘에 맞게 콘텐츠를 재구조화하는 것**입니다. 현대오토에버와 같은 기술 기업은 이 전략을 통해 글로벌 시장에서 기술 신뢰 자산을 빠르게 구축할 수 있습니다.`
  },
  {
    id: 'post-4',
    projectId: 'p4',
    category: 'AI·자동화',
    tag: 'AI 자동화 · CRM 파이프라인',
    title: '파트너 DB 8,000건 AI 정제 자동화 — 공수 80% 절감, 데이터 정합도 96%',
    date: '2024.04',
    kpis: [{ num: '80%', label: '공수 절감' }, { num: '96%', label: '정합도' }],
    tags: ['Make', 'GPT API', 'CRM', '데이터 자동화', 'No-Code'],
    content: `## 배경 — 8,000건의 엉킨 데이터

파트너 관리 CRM에는 8,000건의 파트너 데이터가 있었지만, 실제 활용 가능한 데이터는 65%에 불과했습니다.

회사명 표기 불일치, 연락처 형식 혼재, 산업 분류 오류. 이 데이터를 수작업으로 정제하는 데 팀원 2명이 3주를 투입했습니다.

---

## 설계 — 7단계 자동화 파이프라인

저는 이 프로세스를 완전 자동화하기로 했습니다.

<div class="highlight-box"><p><strong>1단계 →</strong> Google Sheets에서 원본 데이터 읽기<br><strong>2단계 →</strong> Make 트리거로 배치 처리<br><strong>3단계 →</strong> ChatGPT API로 회사명·주소 정규화<br><strong>4단계 →</strong> 산업 분류 자동 태깅<br><strong>5단계 →</strong> 중복 제거 로직<br><strong>6단계 →</strong> 품질 검증 (신뢰도 점수 산출)<br><strong>7단계 →</strong> CRM 자동 업데이트</p></div>

---

## 핵심 — GPT 프롬프트 설계

단순히 API를 연결하는 것이 아니라, 각 데이터 유형에 맞는 프롬프트를 설계하는 것이 핵심이었습니다.

---

## 결과

<div class="result-grid">
  <div class="result-item"><div class="result-num">80%</div><div class="result-label">공수 절감</div></div>
  <div class="result-item"><div class="result-num">96%</div><div class="result-label">데이터 정합도</div></div>
  <div class="result-item"><div class="result-num">8,000건</div><div class="result-label">처리 완료</div></div>
</div>

기존 3주 작업이 4시간으로 단축되었고, 정합도는 65%에서 96%로 향상되었습니다.

---

## 인사이트

마케터가 코딩을 배울 필요는 없습니다. 하지만 **AI와 자동화 도구의 작동 원리를 이해하고, 마케팅 문제를 자동화 문제로 번역하는 능력**은 필수입니다. 이 역량이 현대오토에버 PR 업무에서도 뉴스 클리핑 자동화, 이슈 모니터링 파이프라인 구축에 즉시 적용 가능합니다.`
  },
  {
    id: 'post-5',
    projectId: 'p5',
    category: '브랜드',
    tag: '브랜드 전략 · 메시지 표준화',
    title: '사명 변경 브랜드 메시지 아키텍처 재설계 — 신한은행 "내부 자료로 활용 가능" 평가',
    date: '2024.03',
    kpis: [{ num: '↓70%', label: '설명 시간 절감' }],
    tags: ['브랜드 아키텍처', '메시지 표준화', '포지셔닝', '회사소개서'],
    content: `## 배경 — 사명이 바뀌면 이야기도 바뀐다

회사의 사명이 변경되었습니다. 이는 단순한 로고 교체가 아니라, **브랜드 정체성 전체를 재정의할 기회**였습니다.

기존 회사소개서는 '제품 공급자' 포지셔닝에 머물러 있었고, 신규 사명이 담고자 하는 '통합 보안 플랫폼 기업'의 가치를 전달하지 못했습니다.

---

## 재설계 원칙

저는 메시지 아키텍처를 세 층위로 재설계했습니다.

<div class="highlight-box"><p><strong>핵심 메시지 →</strong> "끊김 없는 보안 운영 경험" (단일 문장으로 포지셔닝)<br><strong>지지 메시지 →</strong> 기술력·운영 경험·규제 대응력 각각 2문장으로 압축<br><strong>증거 →</strong> 수상 이력·고객사·인증으로 신뢰 구조화</p></div>

---

## 적용 범위

영업·전시·파트너·온보딩 상황별로 공통 메시지를 기반으로 한 템플릿을 제작해 표준화했습니다.

---

## 결과

신한은행 미팅에서 담당자가 자발적으로 말했습니다.

> "기술 이해도가 높아 내부 설명 자료로 활용 가능할 것 같습니다"

---

## 인사이트

브랜드 메시지 아키텍처는 단순히 예쁜 문장을 만드는 것이 아닙니다. **의사결정자가 '이 회사를 왜 선택해야 하는가'에 대한 답을 스스로 구성할 수 있도록 정보를 배치하는 구조 설계**입니다.`
  },
  {
    id: 'post-6',
    projectId: 'p6',
    category: '브랜드',
    tag: '공공 PR · SNS 전략',
    title: '양천구청 홍보팀 인턴 — SNS 전략 제안으로 유튜브 구독자 4,000→12,000+ 성장',
    date: '2022.07',
    kpis: [{ num: '3배↑', label: '구독자' }],
    tags: ['공공 PR', 'SNS 전략', '숏폼', '유튜브', '콘텐츠 기획'],
    content: `## 배경 — 공공기관 SNS의 딜레마

양천구청 홍보팀 인턴으로 참여했을 때, 유튜브 구독자는 4,000명이었습니다.

콘텐츠는 성실했지만 **알고리즘의 언어로 말하지 못하고 있었습니다.** 긴 영상, 제목 없는 썸네일, 숏폼 부재.

---

## 제안 내용

저는 홍보팀장에게 다음 세 가지 전략 변화를 제안했습니다.

<div class="highlight-box"><p><strong>숏폼 우선 전략 →</strong> 유튜브 쇼츠를 메인 콘텐츠로 전환<br><strong>썸네일 가이드 →</strong> 텍스트 크기·색상·얼굴 비중 표준화<br><strong>제목 공식 →</strong> "양천구민이면 알아야 할 ○○" 포맷 적용</p></div>

---

## 결과

제안이 실제 채널 운영에 반영되었고, 이후 구독자가 12,000명을 넘어섰습니다.

<div class="result-grid">
  <div class="result-item"><div class="result-num">4,000</div><div class="result-label">이전 구독자</div></div>
  <div class="result-item"><div class="result-num">12,000+</div><div class="result-label">이후 구독자</div></div>
  <div class="result-item"><div class="result-num">3배</div><div class="result-label">성장률</div></div>
</div>

---

## 인사이트

공공 PR이든 기업 PR이든, 핵심은 같습니다. **대상 독자가 콘텐츠를 '발견'할 수 있는 구조를 먼저 만들어야 합니다.** 좋은 내용도 발견되지 않으면 존재하지 않는 것과 같습니다.`
  }
];

/* ═══════════════════════════════
   스토리지
═══════════════════════════════ */
let posts = [];

function postsInit() {
  const saved = localStorage.getItem(POST_STORAGE_KEY);
  posts = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_POSTS));
  // 관리자 CMS 카드 클릭 연결
  patchCardClicks();
}

function postsSave() {
  localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(posts));
}

/* ═══════════════════════════════
   카드 → 게시물 상세 연결
═══════════════════════════════ */
function patchCardClicks() {
  // 기존 pr-card 정적 HTML에 클릭 추가
  document.querySelectorAll('.pr-card[data-pid]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      if (e.target.closest('.cms-card-actions')) return; // CMS 버튼은 무시
      openPost(card.dataset.pid);
    });
  });
}

// CMS renderProjectCards 후에도 클릭 패치
const _origRender = window.renderProjectCards;
if (_origRender) {
  window.renderProjectCards = function() {
    _origRender();
    setTimeout(patchCardClicks, 50);
  };
}

/* ═══════════════════════════════
   게시물 상세 열기
═══════════════════════════════ */
function openPost(projectId) {
  // projectId로 posts에서 찾기
  const post = posts.find(p => p.projectId === projectId || p.id === projectId);
  if (!post) {
    // 게시물 없을 때 — 관리자면 에디터 열기, 아니면 안내
    if (window.cmsMode) {
      openEditor(null, projectId);
    } else {
      showNoPostMsg(projectId);
    }
    return;
  }
  renderPostPage(post);
}

function showNoPostMsg(projectId) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;`;
  overlay.innerHTML = `
    <div style="background:#fff;padding:40px;max-width:380px;text-align:center;">
      <p style="font-size:14px;color:#555;margin-bottom:20px;line-height:1.7;">아직 작성된 게시물이 없습니다.<br>관리자 로그인 후 글을 작성할 수 있습니다.</p>
      <button onclick="this.parentElement.parentElement.remove()" style="padding:10px 28px;background:#002C5F;color:#fff;border:none;cursor:pointer;font-family:'Noto Sans KR',sans-serif;font-size:13px;">닫기</button>
    </div>`;
  document.body.appendChild(overlay);
}

function renderPostPage(post) {
  const page = document.getElementById('page-post');

  // 관련 게시물 (같은 카테고리, 자신 제외)
  const related = posts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

  page.innerHTML = `
    <div class="post-hero">
      <div class="post-hero-inner">
        <div class="post-back" onclick="closePost()">Inside &amp; Insight 목록으로</div>
        <p class="post-category">${post.category}</p>
        <h1 class="post-title">${post.title}</h1>
        <div class="post-meta">
          <span class="post-meta-item"><strong>날짜</strong> ${post.date}</span>
          <span class="post-meta-item"><strong>분류</strong> ${post.tag}</span>
        </div>
        ${post.kpis?.length ? `
        <div class="post-kpis">
          ${post.kpis.map(k => `
            <div class="post-kpi">
              <div class="post-kpi-num">${k.num}</div>
              <div class="post-kpi-label">${k.label}</div>
            </div>`).join('')}
        </div>` : ''}
        ${window.cmsMode ? `
        <div style="margin-top:20px;display:flex;gap:8px;">
          <button onclick="openEditor('${post.id}')" style="padding:8px 18px;background:rgba(0,170,210,.15);color:var(--blue);border:1px solid rgba(0,170,210,.3);font-size:12px;cursor:pointer;font-family:'Noto Sans KR',sans-serif;">✏️ 이 게시물 수정</button>
          <button onclick="deletePost('${post.id}')" style="padding:8px 18px;background:rgba(200,0,0,.1);color:#c00;border:1px solid rgba(200,0,0,.2);font-size:12px;cursor:pointer;font-family:'Noto Sans KR',sans-serif;">🗑 삭제</button>
        </div>` : ''}
      </div>
    </div>
    <div class="post-body-wrap">
      <div class="post-content">${renderMarkdown(post.content)}</div>
      ${post.tags?.length ? `
      <div class="post-tags">
        ${post.tags.map(t => `<span class="post-tag"># ${t}</span>`).join('')}
      </div>` : ''}
      ${related.length ? `
      <div class="post-related">
        <p class="post-related-title">Related Posts</p>
        <div class="post-related-grid">
          ${related.map(r => `
            <div class="post-related-card" onclick="openPost('${r.projectId}')">
              <p class="post-related-cat">${r.category}</p>
              <p class="post-related-ttl">${r.title}</p>
            </div>`).join('')}
        </div>
      </div>` : ''}
    </div>`;

  // 페이지 전환
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  page.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePost() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-insight').classList.add('active');
  window.scrollTo({ top: 0 });
}

/* ═══════════════════════════════
   마크다운 렌더러 (심플)
═══════════════════════════════ */
function renderMarkdown(md) {
  if (!md) return '';
  let html = md
    // HTML 블록은 그대로
    .replace(/(<div[\s\S]*?<\/div>)/g, m => m)
    // h2
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // h3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // hr
    .replace(/^---$/gm, '<hr>')
    // ul
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // 줄바꿈 → p (빈 줄 기준)
    .split('\n\n').map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<blockquote') || block.startsWith('<hr') || block.startsWith('<div') || block.startsWith('<li')) return block;
      if (block.includes('<li>')) return `<ul>${block}</ul>`;
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');
  return html;
}

/* ═══════════════════════════════
   에디터
═══════════════════════════════ */
let editingPostId = null;
let editingProjectId = null;

function openEditor(postId, projectId) {
  editingPostId   = postId   || null;
  editingProjectId = projectId || null;

  const post = postId ? posts.find(p => p.id === postId) : null;
  const page = document.getElementById('page-editor');

  page.innerHTML = `
    <div class="editor-wrap">
      <div class="editor-header">
        <div class="editor-title-area">
          <h2 class="editor-page-title">${post ? '게시물 수정' : '새 게시물 작성'}</h2>
          <span class="editor-badge">Admin</span>
        </div>
        <div class="editor-actions">
          <button class="editor-btn secondary" onclick="cancelEditor()">취소</button>
          <button class="editor-btn primary" onclick="savePost()">발행하기</button>
        </div>
      </div>

      <div class="editor-field">
        <label class="editor-label">카테고리</label>
        <select id="ed-category" class="editor-select">
          ${['수주·제안','전시·DX','디지털PR·GEO','AI·자동화','브랜드','공공PR','기타'].map(c =>
            `<option value="${c}"${post?.category===c?' selected':''}>${c}</option>`
          ).join('')}
        </select>
      </div>

      <div class="editor-field">
        <label class="editor-label">태그 라인 (예: 전략기획 · 제안서 설계)</label>
        <input id="ed-tag" class="editor-input" type="text" placeholder="전략기획 · 제안서 설계" value="${post?.tag||''}">
      </div>

      <div class="editor-field">
        <label class="editor-label">제목</label>
        <input id="ed-title" class="editor-input" type="text" placeholder="게시물 제목을 입력하세요" value="${post?.title||''}">
      </div>

      <div class="editor-row">
        <div class="editor-field">
          <label class="editor-label">날짜</label>
          <input id="ed-date" class="editor-input" type="text" placeholder="2024.09" value="${post?.date||''}">
        </div>
        <div class="editor-field">
          <label class="editor-label">태그 (쉼표로 구분)</label>
          <input id="ed-tags" class="editor-input" type="text" placeholder="GEO, AI검색, 전략기획" value="${post?.tags?.join(', ')||''}">
        </div>
      </div>

      <div class="editor-field">
        <label class="editor-label">KPI 수치</label>
        <div class="kpi-rows" id="kpi-rows">
          ${(post?.kpis || [{num:'',label:''}]).map((k,i) => `
            <div class="kpi-row" id="kpi-row-${i}">
              <input type="text" placeholder="수치 (예: +97%)" value="${k.num}" data-kpi-num="${i}">
              <input type="text" placeholder="라벨 (예: 유효미팅)" value="${k.label}" data-kpi-label="${i}">
              <button class="kpi-del-btn" onclick="removeKpiRow(${i})">×</button>
            </div>`).join('')}
        </div>
        <button class="kpi-add-btn" onclick="addKpiRow()">+ KPI 추가</button>
      </div>

      <div class="editor-field">
        <label class="editor-label">
          본문
          <span style="font-weight:300;color:#aaa;margin-left:8px;">## 제목2 / ### 제목3 / **굵게** / > 인용 / --- 구분선</span>
        </label>
        <div class="editor-toolbar">
          <button class="editor-tool" title="제목2" onclick="insertMd('## ')">H2</button>
          <button class="editor-tool" title="제목3" onclick="insertMd('### ')">H3</button>
          <div class="editor-tool-divider"></div>
          <button class="editor-tool" title="굵게" onclick="wrapMd('**','**')"><b>B</b></button>
          <button class="editor-tool" title="기울임" onclick="wrapMd('*','*')"><i>I</i></button>
          <div class="editor-tool-divider"></div>
          <button class="editor-tool" title="인용" onclick="insertMd('> ')">❝</button>
          <button class="editor-tool" title="목록" onclick="insertMd('- ')">≡</button>
          <button class="editor-tool" title="구분선" onclick="insertMd('\n---\n')">—</button>
          <div class="editor-tool-divider"></div>
          <button class="editor-tool" title="하이라이트 박스 삽입" onclick="insertHighlight()" style="font-size:11px;width:auto;padding:0 8px;">박스</button>
          <button class="editor-tool" title="결과 그리드 삽입" onclick="insertResultGrid()" style="font-size:11px;width:auto;padding:0 8px;">결과표</button>
          <div class="editor-tool-divider"></div>
          <button class="editor-tool" title="미리보기 토글" onclick="togglePreview()" style="font-size:11px;width:auto;padding:0 10px;margin-left:auto;">미리보기</button>
        </div>
        <textarea id="ed-content" class="editor-textarea" placeholder="본문을 입력하세요. ## 제목, **굵게**, > 인용 등의 마크다운을 사용할 수 있습니다.">${post?.content||''}</textarea>
        <div class="editor-preview" id="ed-preview">
          <p class="editor-preview-label">Preview</p>
          <div class="post-content" id="ed-preview-content"></div>
        </div>
      </div>
    </div>`;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  page.classList.add('active');
  window.scrollTo({ top: 0 });
}

function cancelEditor() {
  document.getElementById('page-editor').classList.remove('active');
  if (editingPostId) {
    // 수정 중이었으면 해당 게시물로 복귀
    const post = posts.find(p => p.id === editingPostId);
    if (post) { renderPostPage(post); return; }
  }
  document.getElementById('page-insight').classList.add('active');
}

function savePost() {
  const title = document.getElementById('ed-title').value.trim();
  if (!title) { alert('제목을 입력해주세요.'); return; }

  const kpis = [];
  document.querySelectorAll('[data-kpi-num]').forEach(el => {
    const i = el.dataset.kpiNum;
    const num = el.value.trim();
    const label = document.querySelector(`[data-kpi-label="${i}"]`)?.value.trim() || '';
    if (num) kpis.push({ num, label });
  });

  const postData = {
    id:         editingPostId || ('post-' + Date.now()),
    projectId:  editingProjectId || editingPostId || ('post-' + Date.now()),
    category:   document.getElementById('ed-category').value,
    tag:        document.getElementById('ed-tag').value,
    title,
    date:       document.getElementById('ed-date').value,
    kpis,
    tags:       document.getElementById('ed-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    content:    document.getElementById('ed-content').value,
  };

  if (editingPostId) {
    const idx = posts.findIndex(p => p.id === editingPostId);
    if (idx >= 0) posts[idx] = postData;
    else posts.push(postData);
  } else {
    posts.push(postData);
  }

  postsSave();
  renderPostPage(postData);
}

function deletePost(postId) {
  if (!confirm('이 게시물을 삭제할까요?')) return;
  posts = posts.filter(p => p.id !== postId);
  postsSave();
  closePost();
}

/* ═══════════════════════════════
   에디터 헬퍼
═══════════════════════════════ */
let kpiCount = 1;
function addKpiRow() {
  const rows = document.getElementById('kpi-rows');
  const i = Date.now();
  const row = document.createElement('div');
  row.className = 'kpi-row'; row.id = 'kpi-row-' + i;
  row.innerHTML = `
    <input type="text" placeholder="수치" data-kpi-num="${i}">
    <input type="text" placeholder="라벨" data-kpi-label="${i}">
    <button class="kpi-del-btn" onclick="removeKpiRow(${i})">×</button>`;
  rows.appendChild(row);
}
function removeKpiRow(i) {
  document.getElementById('kpi-row-' + i)?.remove();
}

function insertMd(text) {
  const ta = document.getElementById('ed-content');
  if (!ta) return;
  const s = ta.selectionStart;
  ta.value = ta.value.slice(0, s) + text + ta.value.slice(s);
  ta.selectionStart = ta.selectionEnd = s + text.length;
  ta.focus();
}

function wrapMd(before, after) {
  const ta = document.getElementById('ed-content');
  if (!ta) return;
  const s = ta.selectionStart, e = ta.selectionEnd;
  const sel = ta.value.slice(s, e) || '텍스트';
  ta.value = ta.value.slice(0, s) + before + sel + after + ta.value.slice(e);
  ta.focus();
}

function insertHighlight() {
  insertMd('\n<div class="highlight-box"><p><strong>항목 →</strong> 내용<br><strong>항목 →</strong> 내용</p></div>\n');
}

function insertResultGrid() {
  insertMd('\n<div class="result-grid">\n  <div class="result-item"><div class="result-num">수치</div><div class="result-label">라벨</div></div>\n  <div class="result-item"><div class="result-num">수치</div><div class="result-label">라벨</div></div>\n</div>\n');
}

function togglePreview() {
  const preview = document.getElementById('ed-preview');
  const content = document.getElementById('ed-content');
  if (!preview) return;
  const isShow = preview.classList.toggle('show');
  if (isShow) {
    document.getElementById('ed-preview-content').innerHTML = renderMarkdown(content.value);
  }
}

/* 전역 노출 */
window.openPost      = openPost;
window.closePost     = closePost;
window.openEditor    = openEditor;
window.cancelEditor  = cancelEditor;
window.savePost      = savePost;
window.deletePost    = deletePost;
window.addKpiRow     = addKpiRow;
window.removeKpiRow  = removeKpiRow;
window.insertMd      = insertMd;
window.wrapMd        = wrapMd;
window.insertHighlight   = insertHighlight;
window.insertResultGrid  = insertResultGrid;
window.togglePreview     = togglePreview;
window.renderMarkdown    = renderMarkdown;
window.patchCardClicks   = patchCardClicks;

document.addEventListener('DOMContentLoaded', postsInit);
