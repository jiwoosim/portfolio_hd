/* js/cms.js — 관리자 CMS (로그인 + 전체 페이지 텍스트 편집) */

const CMS_PASSWORD = 'jiwoo2026';
const STORAGE_KEY  = 'jiwoo_cms_content';

let cmsMode = false;
let cmsData  = {};

/* ═══════════════════════════════
   콘텐츠 데이터 (기본값)
═══════════════════════════════ */
const DEFAULT_CONTENT = {
  /* ── HOME ── */
  'slide-0-tag':   '농협은행 20억 수주 · Featured',
  'slide-0-title': '기술을 \'CISO 리스크\'로\n번역해 20억 수주를 이끌다',
  'slide-0-desc':  '규제 리스크 → 책임 주체 → 운영 시나리오 → 통합 아키텍처. 3개사 경쟁 PT에서 최종 선정',
  'slide-1-tag':   'Intersec Dubai 2025 · 전시 DX',
  'slide-1-title': '전시를 영업 파이프라인으로,\n유효 미팅 97% 상승',
  'slide-1-desc':  'R&D 협업으로 생체인증 등록 시스템 기획·개발, 실제 상용 제품으로 출시',
  'slide-2-tag':   'GEO 전략 · AI 검색 최적화',
  'slide-2-title': 'AI가 가장 먼저 인용하는\n콘텐츠 전략가',
  'slide-2-desc':  'GEO 선제 도입으로 검색 유입 26%↑, GPT·Gemini·Google AI에서 우선 인용 기반 확보',
  'biz-empty-title': '전략 수립부터 실무 완결까지,\n심지우의 핵심 역량',

  /* ── WHO IS SHE ── */
  'who-title':    '기술을 신뢰로,\n신뢰를 성과로.',
  'who-desc':     '기술을 \'비즈니스\'로 번역하는 전략형 B2B 마케터. 농협은행 통합 인증센터 20억 수주에 기여하고, GEO 전략으로 AI 검색 유입을 26% 끌어올린 심지우입니다.',
  'who-stat-0':   '20억',
  'who-stat-0-label': '수주 기여',
  'who-stat-1':   '97%',
  'who-stat-1-label': '유효미팅 증가',
  'who-stat-2':   '26%',
  'who-stat-2-label': 'AI 검색유입',
  'who-stat-3':   '2년+',
  'who-stat-3-label': 'B2B 실무',
  'who-motive-title':  '20억 수주를 이끈 기술 번역가,\n현대오토에버의 기술 신뢰를 설계하겠습니다',
  'who-quote':    'PR은 단순히 정보를 알리는 창구를 넘어, 데이터와 사실을 전략적으로 배열해 의사결정의 확신을 만드는 역할입니다.',
  'who-motive-body-1': '현대오토에버는 IT 서비스 기업을 넘어 SDV 전환과 \'피지컬 AI\' 시대를 주도하는 모빌리티 소프트웨어의 중추입니다. 저는 보안·SI 분야에서 기술을 경영진의 언어로 재구조화해 실질적 수주와 성장을 만들어왔습니다.',
  'who-motive-body-2': '농협은행 통합 인증센터 제안 시 기술 스펙 나열 대신 \'CISO 책임 하 통합 거버넌스\' 관점으로 스토리라인을 재설계해 20억 원 규모 수주에 기여한 경험을 바탕으로, 현대오토에버의 기술 가치를 시장의 신뢰로 연결하는 PR 담당자가 되겠습니다.',
  'who-growth-title':  '문제 발견과 돌파를 통해\n기술 가치를 증명해 온 성장',
  'who-growth-body-1': '저의 성장 과정은 주어진 역할에 머무르기보다, 기술이 제대로 평가받지 못하는 구조적 문제를 발견하고 이를 비즈니스 성과로 전환해 온 과정이었습니다.',
  'who-growth-body-2': '세계 최대 보안 전시회 Intersec Dubai 2025에서 "장비가 아닌 엔드투엔드 보안 운영 경험을 보여줘야 한다"는 문제의식으로 전시 기획 총괄을 자원했습니다.',
  'who-growth-body-3': '마케팅 메시지를 설계할 때도 기능 요약에 머무르지 않고, 제도적 배경·리스크 구조·기술 원리까지 파고들어 설득 가능한 스토리를 만드는 \'과몰입형 워커홀릭\'입니다.',

  /* ── VISION ── */
  'vision-title': '20억 수주를 이끈 기술 번역가,\n현대오토에버의 기술 신뢰를 설계하겠습니다',
  'vision-body':  '현대오토에버는 SDV 전환과 \'피지컬 AI\' 시대를 주도하는 모빌리티 소프트웨어의 중추입니다. 기술을 경영진의 언어로 재구조화해 수주를 견인하고, GEO 전략으로 AI 검색 유입을 끌어올린 경험을 바탕으로, 현대오토에버의 기술 가치를 시장의 신뢰로 연결하는 PR 담당자로서 두 가지 커리어 목표를 달성하겠습니다.',
  'goal-1-period': 'Short-Term Goal · 입사 후 1년',
  'goal-1-title':  '글로벌 모빌리티 이슈를 \'쟁점-영향-시사점\' 구조로 정리해 경영진 판단을 지원',
  'goal-1-body':   '단순 뉴스 클리핑을 넘어 SDV 전환·제조DX·사이버보안 등 현대오토에버 핵심 이슈를 인사이트 체계로 고도화하겠습니다. 유관부서와 협업해 이슈 대응 표준 프로세스를 구축하고, 경영진과 현업이 빠르고 정확하게 판단할 수 있도록 지원하겠습니다.',
  'goal-2-period': 'Long-Term Goal · 3년 후',
  'goal-2-title':  '\'One Message, Local Proof\' 원칙 아래 글로벌 기술 신뢰 자산 구축',
  'goal-2-body':   '현대오토에버의 핵심 기술과 사업 성과를 권역별 규제·시장 관행에 맞는 기술 백서와 사례형 콘텐츠로 자산화하겠습니다. GEO 역량을 더해 글로벌 시장에서 반복적으로 참조되는 신뢰도 높은 정보 자산으로 만들겠습니다.',
};

/* ── 프로젝트 카드 기본값 ── */
const DEFAULT_PROJECTS = [
  { id:'p1', category:'수주', tag:'전략기획 · 제안서 설계', bgClass:'pc-bg-1', badgeText:'수주·제안', imgTitle:'농협은행\n통합 인증센터',
    title:'농협은행 통합 인증센터 20억 수주 기여 — CISO 거버넌스 스토리라인 재설계',
    date:'2024.09',
    results:[{num:'20억',label:'수주'},{num:'3대',label:'은행 활용'}] },
  { id:'p2', category:'전시', tag:'전시 DX · 리드 파이프라인', bgClass:'pc-bg-2', badgeText:'전시·DX', imgTitle:'Intersec\nDubai 2025',
    title:'Intersec Dubai 2025 — DX 전환으로 유효 미팅 97% 상승, 기획 시스템 상용 출시',
    date:'2025.01',
    results:[{num:'+97%',label:'유효미팅'},{num:'54%',label:'리드 비중'}] },
  { id:'p3', category:'디지털', tag:'GEO · IA 설계 · 콘텐츠 퍼널', bgClass:'pc-bg-3', badgeText:'디지털PR·GEO', imgTitle:'GEO\nAI 검색 최적화',
    title:'GEO 전략 도입 — AI 검색 선점, GA4 검색 유입 26%↑ · MQL 5건 확보',
    date:'2024.06',
    results:[{num:'+26%',label:'검색 유입'},{num:'5건',label:'MQL'}] },
  { id:'p4', category:'자동화', tag:'AI 자동화 · CRM 파이프라인', bgClass:'pc-bg-4', badgeText:'AI·자동화', imgTitle:'Make +\nGPT API',
    title:'파트너 DB 8,000건 AI 정제 자동화 — 공수 80% 절감, 데이터 정합도 96%',
    date:'2024.04',
    results:[{num:'80%',label:'공수 절감'},{num:'96%',label:'정합도'}] },
  { id:'p5', category:'브랜드', tag:'브랜드 전략 · 메시지 표준화', bgClass:'pc-bg-5', badgeText:'브랜드', imgTitle:'브랜드 메시지\n아키텍처',
    title:'사명 변경 기반 브랜드 메시지 아키텍처 재설계 — 신한은행 "내부 자료로 활용 가능" 평가',
    date:'2024.03',
    results:[{num:'↓70%',label:'설명 시간'}] },
  { id:'p6', category:'브랜드', tag:'공공 PR · SNS 전략', bgClass:'pc-bg-6', badgeText:'공공 PR', imgTitle:'양천구청\n홍보팀',
    title:'양천구청 홍보팀 인턴 — SNS 전략 제안으로 유튜브 구독자 4,000→12,000+ 성장',
    date:'2022.07',
    results:[{num:'3배↑',label:'구독자'}] },
];

/* ═══════════════════════════════
   초기화
═══════════════════════════════ */
function cmsInit() {
  const saved = localStorage.getItem(STORAGE_KEY);
  cmsData = saved ? JSON.parse(saved) : { ...DEFAULT_CONTENT, projects: JSON.parse(JSON.stringify(DEFAULT_PROJECTS)) };
  if (!cmsData.projects) cmsData.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
  applyContent();
  renderProjectCards();
  injectCmsUI();
}

function cmsSave() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
}

/* ═══════════════════════════════
   콘텐츠 적용 (DOM → data)
═══════════════════════════════ */
function applyContent() {
  Object.entries(cmsData).forEach(([key, val]) => {
    if (key === 'projects') return;
    document.querySelectorAll(`[data-cms="${key}"]`).forEach(el => {
      el.innerHTML = val.replace(/\n/g, '<br>');
    });
  });
}

/* ═══════════════════════════════
   프로젝트 카드 렌더링
═══════════════════════════════ */
function renderProjectCards() {
  const grid = document.getElementById('pr-card-grid');
  if (!grid) return;
  grid.innerHTML = '';
  cmsData.projects.forEach(p => {
    const resultsHtml = p.results.map(r =>
      `<div class="pr-card-result-item"><div class="pcr-num">${r.num}</div><div class="pcr-label">${r.label}</div></div>`
    ).join('');
    const card = document.createElement('div');
    card.className = 'pr-card';
    card.dataset.category = p.category;
    card.dataset.pid = p.id;
    card.innerHTML = `
      <div class="pr-card-img">
        <div class="pr-card-img-bg ${p.bgClass}">
          <div class="pr-card-img-inner">
            <span class="pc-img-badge">${p.badgeText}</span>
            <span class="pc-img-title">${p.imgTitle.replace(/\n/g,'<br>')}</span>
          </div>
        </div>
      </div>
      <div class="pr-card-body">
        <p class="pr-card-tag"><span class="pr-card-tag-dot"></span>${p.tag}</p>
        <h3 class="pr-card-title">${p.title}</h3>
        <p class="pr-card-date">${p.date}</p>
        <div class="pr-card-result">${resultsHtml}</div>
        ${cmsMode ? `<div class="cms-card-actions">
          <button class="cms-card-btn" onclick="cmsEditCard('${p.id}')">✏️ 수정</button>
          <button class="cms-card-btn del" onclick="cmsDeleteCard('${p.id}')">🗑 삭제</button>
        </div>` : ''}
      </div>`;
    grid.appendChild(card);
  });
  const countEl = document.getElementById('pr-count');
  if (countEl) countEl.innerHTML = `총 <strong>${cmsData.projects.length}</strong>건`;
}

/* ═══════════════════════════════
   로그인 UI 주입
═══════════════════════════════ */
function injectCmsUI() {
  // 관리자 버튼은 GNB에 있음 (gnb-admin-btn)

  // 로그인 모달
  const modal = document.createElement('div');
  modal.id = 'cms-login-modal';
  modal.innerHTML = `
    <div class="cms-modal-box">
      <div class="cms-modal-title">관리자 로그인</div>
      <input class="cms-modal-input" id="cms-pw-input" type="password" placeholder="비밀번호 입력" onkeydown="if(event.key==='Enter')cmsLogin()">
      <div style="display:flex;gap:8px;margin-top:16px;">
        <button class="cms-modal-btn" onclick="cmsLogin()">로그인</button>
        <button class="cms-modal-btn outline" onclick="closeLoginModal()">취소</button>
      </div>
      <p class="cms-modal-err" id="cms-login-err"></p>
    </div>`;
  document.body.appendChild(modal);

  // 편집 모달
  const editModal = document.createElement('div');
  editModal.id = 'cms-edit-modal';
  editModal.innerHTML = `
    <div class="cms-modal-box wide">
      <div class="cms-modal-title" id="cms-edit-title">콘텐츠 편집</div>
      <div id="cms-edit-fields"></div>
      <div style="display:flex;gap:8px;margin-top:20px;">
        <button class="cms-modal-btn" onclick="cmsEditSave()">저장</button>
        <button class="cms-modal-btn outline" onclick="closeEditModal()">취소</button>
      </div>
    </div>`;
  document.body.appendChild(editModal);

  // 카드 추가 모달
  const addModal = document.createElement('div');
  addModal.id = 'cms-add-modal';
  addModal.innerHTML = `
    <div class="cms-modal-box wide">
      <div class="cms-modal-title">프로젝트 추가</div>
      <div class="cms-add-fields">
        <label>카테고리</label>
        <select id="add-category" class="cms-modal-input">
          <option value="수주">수주·제안</option><option value="전시">전시·DX</option>
          <option value="디지털">디지털PR·GEO</option><option value="자동화">AI·자동화</option>
          <option value="브랜드">브랜드</option>
        </select>
        <label>태그 (예: 전략기획 · 제안서 설계)</label>
        <input id="add-tag" class="cms-modal-input" type="text">
        <label>카드 뱃지 텍스트</label>
        <input id="add-badge" class="cms-modal-input" type="text">
        <label>카드 이미지 제목 (줄바꿈은 \\n)</label>
        <input id="add-img-title" class="cms-modal-input" type="text">
        <label>프로젝트 제목</label>
        <input id="add-title" class="cms-modal-input" type="text">
        <label>날짜 (예: 2024.09)</label>
        <input id="add-date" class="cms-modal-input" type="text">
        <label>성과 1 숫자 (예: 20억)</label>
        <input id="add-r1-num" class="cms-modal-input" type="text">
        <label>성과 1 라벨 (예: 수주)</label>
        <input id="add-r1-label" class="cms-modal-input" type="text">
        <label>성과 2 숫자 (선택)</label>
        <input id="add-r2-num" class="cms-modal-input" type="text">
        <label>성과 2 라벨 (선택)</label>
        <input id="add-r2-label" class="cms-modal-input" type="text">
      </div>
      <div style="display:flex;gap:8px;margin-top:20px;">
        <button class="cms-modal-btn" onclick="cmsAddSave()">추가</button>
        <button class="cms-modal-btn outline" onclick="closeAddModal()">취소</button>
      </div>
    </div>`;
  document.body.appendChild(addModal);

  // CSS 주입
  const style = document.createElement('style');
  style.textContent = `
    #cms-login-btn-old {
      position:fixed; bottom:32px; right:32px; z-index:9999;
      width:44px; height:44px; border-radius:50%;
      background:var(--navy); color:#fff;
      display:flex; align-items:center; justify-content:center;
      font-size:18px; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,.25);
      transition:background .2s, transform .2s;
    }
    #cms-login-btn:hover { background:var(--blue); transform:scale(1.08); }
    #cms-login-btn.active { background:var(--blue); }

    #cms-login-modal, #cms-edit-modal, #cms-add-modal {
      display:none; position:fixed; inset:0; z-index:9998;
      background:rgba(0,0,0,.6); backdrop-filter:blur(4px);
      align-items:center; justify-content:center;
    }
    #cms-login-modal.open, #cms-edit-modal.open, #cms-add-modal.open { display:flex; }
    .cms-modal-box {
      background:#fff; width:100%; max-width:420px; padding:36px;
      box-shadow:0 20px 60px rgba(0,0,0,.25);
      animation: cmsSlideUp .3s ease;
    }
    .cms-modal-box.wide { max-width:600px; max-height:85vh; overflow-y:auto; }
    @keyframes cmsSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .cms-modal-title { font-size:18px; font-weight:700; color:var(--navy); margin-bottom:20px; }
    .cms-modal-input {
      width:100%; height:42px; padding:0 14px;
      border:1px solid var(--line); font-size:14px; font-family:'Noto Sans KR',sans-serif;
      color:var(--text); margin-bottom:4px;
    }
    .cms-modal-btn {
      flex:1; height:42px; background:var(--navy); color:#fff;
      font-size:13px; font-weight:500; font-family:'Noto Sans KR',sans-serif;
      letter-spacing:.04em; cursor:pointer; border:none; transition:background .2s;
    }
    .cms-modal-btn:hover { background:var(--blue); }
    .cms-modal-btn.outline { background:transparent; color:var(--navy); border:1px solid var(--navy); }
    .cms-modal-btn.outline:hover { background:var(--bg); }
    .cms-modal-err { font-size:12px; color:#e00; margin-top:8px; min-height:16px; }

    /* 편집 필드 */
    .cms-field { margin-bottom:16px; }
    .cms-field label { display:block; font-size:10px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--lgray); margin-bottom:6px; }
    .cms-field textarea { width:100%; min-height:80px; padding:10px 14px; border:1px solid var(--line); font-size:13px; font-family:'Noto Sans KR',sans-serif; color:var(--text); resize:vertical; line-height:1.6; }
    .cms-field input { width:100%; height:38px; padding:0 12px; border:1px solid var(--line); font-size:13px; font-family:'Noto Sans KR',sans-serif; color:var(--text); }

    /* CMS 모드 편집 가능 요소 */
    body.cms-active [data-cms] {
      outline:2px dashed rgba(0,170,210,.4);
      cursor:pointer; position:relative;
      transition:outline-color .2s;
    }
    body.cms-active [data-cms]:hover { outline-color:var(--blue); background:rgba(0,170,210,.04); }

    /* CMS 툴바 */
    #cms-toolbar {
      position:fixed; top:60px; left:0; right:0; z-index:999;
      background:var(--navy); color:#fff;
      padding:10px 40px; display:flex; align-items:center; gap:16px;
      font-size:12px; font-weight:500; letter-spacing:.04em;
      transform:translateY(-100%); transition:transform .3s;
    }
    #cms-toolbar.show { transform:translateY(0); }
    .cms-toolbar-label { color:var(--blue); margin-right:8px; }
    .cms-tb-btn {
      padding:6px 16px; background:rgba(255,255,255,.1); color:#fff;
      border:1px solid rgba(255,255,255,.2); font-size:11px; font-weight:500;
      font-family:'Noto Sans KR',sans-serif; cursor:pointer; letter-spacing:.06em;
      transition:background .2s;
    }
    .cms-tb-btn:hover { background:var(--blue); border-color:var(--blue); }
    .cms-tb-btn.danger { background:rgba(200,16,46,.15); border-color:rgba(200,16,46,.4); color:#ff6b6b; }
    .cms-tb-divider { width:1px; height:20px; background:rgba(255,255,255,.15); }

    /* 카드 버튼 */
    .cms-card-actions { display:flex; gap:6px; margin-top:12px; padding-top:12px; border-top:1px solid var(--line); }
    .cms-card-btn { padding:5px 12px; font-size:11px; font-family:'Noto Sans KR',sans-serif; cursor:pointer; border:1px solid var(--line); background:var(--bg); color:var(--text); transition:all .2s; }
    .cms-card-btn:hover { background:var(--navy); color:#fff; border-color:var(--navy); }
    .cms-card-btn.del { color:#c00; border-color:rgba(200,0,0,.2); }
    .cms-card-btn.del:hover { background:#c00; color:#fff; border-color:#c00; }

    /* 카드 추가 버튼 */
    #cms-add-card-btn {
      display:none; position:fixed; bottom:88px; right:32px; z-index:9999;
      padding:10px 20px; background:var(--blue); color:#fff;
      font-size:12px; font-weight:500; font-family:'Noto Sans KR',sans-serif;
      letter-spacing:.06em; cursor:pointer; border:none;
      box-shadow:0 4px 16px rgba(0,170,210,.35);
      transition:transform .2s;
    }
    #cms-add-card-btn:hover { transform:translateY(-2px); }

    .cms-add-fields label { display:block; font-size:11px; font-weight:500; color:var(--lgray); margin:12px 0 4px; letter-spacing:.1em; text-transform:uppercase; }

    /* 저장 토스트 */
    #cms-toast {
      position:fixed; bottom:100px; left:50%; transform:translateX(-50%) translateY(20px);
      background:var(--navy); color:#fff; padding:12px 28px;
      font-size:13px; font-weight:500; letter-spacing:.04em;
      opacity:0; transition:all .3s; pointer-events:none; z-index:9999;
    }
    #cms-toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
  `;
  document.head.appendChild(style);

  // 툴바
  const toolbar = document.createElement('div');
  toolbar.id = 'cms-toolbar';
  toolbar.innerHTML = `
    <span class="cms-toolbar-label">⚙ 관리자 모드</span>
    <span style="color:rgba(255,255,255,.5);font-size:11px;">텍스트를 클릭해서 수정하세요</span>
    <div class="cms-tb-divider"></div>
    <button class="cms-tb-btn" onclick="cmsSaveAll()">💾 전체 저장</button>
    <button class="cms-tb-btn" onclick="cmsReset()" style="margin-left:auto;">↺ 기본값 복원</button>
    <button class="cms-tb-btn danger" onclick="cmsLogout()">로그아웃</button>
  `;
  document.body.appendChild(toolbar);

  // 카드 추가 버튼
  const addBtn = document.createElement('button');
  addBtn.id = 'cms-add-card-btn';
  addBtn.textContent = '+ 프로젝트 추가';
  addBtn.onclick = showAddModal;
  document.body.appendChild(addBtn);

  // 토스트
  const toast = document.createElement('div');
  toast.id = 'cms-toast';
  toast.textContent = '✓ 저장되었습니다';
  document.body.appendChild(toast);

  // data-cms 클릭 이벤트
  document.addEventListener('click', e => {
    if (!cmsMode) return;
    const el = e.target.closest('[data-cms]');
    if (!el) return;
    openEditModal(el.dataset.cms, el);
  });
}

/* ═══════════════════════════════
   로그인 / 로그아웃
═══════════════════════════════ */
function showLoginModal() {
  document.getElementById('cms-login-modal').classList.add('open');
  setTimeout(() => document.getElementById('cms-pw-input')?.focus(), 100);
}
function closeLoginModal() {
  document.getElementById('cms-login-modal').classList.remove('open');
  document.getElementById('cms-pw-input').value = '';
  document.getElementById('cms-login-err').textContent = '';
}
function cmsLogin() {
  const pw = document.getElementById('cms-pw-input').value;
  if (pw === CMS_PASSWORD) {
    cmsMode = true;
    closeLoginModal();
    document.body.classList.add('cms-active');
    document.getElementById('cms-toolbar').classList.add('show');
    const ab = document.getElementById('gnb-admin-btn'); if(ab){ab.classList.add('active');} document.getElementById('gnb-admin-label').textContent='로그아웃';
    document.getElementById('cms-add-card-btn').style.display = 'block';
    renderProjectCards();
    showToast('관리자 모드 활성화');
  } else {
    document.getElementById('cms-login-err').textContent = '비밀번호가 틀렸습니다.';
    document.getElementById('cms-pw-input').value = '';
  }
}
function cmsLogout() {
  cmsMode = false;
  document.body.classList.remove('cms-active');
  document.getElementById('cms-toolbar').classList.remove('show');
  const loginBtn = document.getElementById('gnb-admin-btn'); if(loginBtn) loginBtn.classList.remove('active');
  const lbl = document.getElementById('gnb-admin-label'); if(lbl) lbl.textContent='관리자';
  document.getElementById('cms-add-card-btn').style.display = 'none';
  renderProjectCards();
  showToast('로그아웃됨');
}

/* ═══════════════════════════════
   편집 모달
═══════════════════════════════ */
let currentEditKey = null;

function openEditModal(key, el) {
  currentEditKey = key;
  const val = cmsData[key] || '';
  const label = el.dataset.cmsLabel || key;
  document.getElementById('cms-edit-title').textContent = `편집: ${label}`;
  const isLong = val.length > 60 || val.includes('\n');
  document.getElementById('cms-edit-fields').innerHTML = `
    <div class="cms-field">
      <label>${label}</label>
      ${isLong
        ? `<textarea id="cms-edit-val">${val}</textarea>`
        : `<input id="cms-edit-val" type="text" value="${val.replace(/"/g,'&quot;')}">`}
      <p style="font-size:11px;color:var(--lgray);margin-top:4px;">줄바꿈: \\n 입력</p>
    </div>`;
  document.getElementById('cms-edit-modal').classList.add('open');
  setTimeout(() => document.getElementById('cms-edit-val')?.focus(), 100);
}
function closeEditModal() {
  document.getElementById('cms-edit-modal').classList.remove('open');
  currentEditKey = null;
}
function cmsEditSave() {
  if (!currentEditKey) return;
  const val = document.getElementById('cms-edit-val').value;
  cmsData[currentEditKey] = val;
  applyContent();
  cmsSave();
  closeEditModal();
  showToast('저장됨');
}

/* ═══════════════════════════════
   카드 편집 / 삭제 / 추가
═══════════════════════════════ */
function cmsEditCard(id) {
  const p = cmsData.projects.find(x => x.id === id);
  if (!p) return;
  currentEditKey = '__card__' + id;
  document.getElementById('cms-edit-title').textContent = '프로젝트 편집';
  document.getElementById('cms-edit-fields').innerHTML = `
    <div class="cms-field"><label>카테고리</label>
      <select id="cms-edit-val" class="cms-modal-input" style="height:42px;">
        ${['수주','전시','디지털','자동화','브랜드'].map(c=>`<option value="${c}"${p.category===c?' selected':''}>${c}</option>`).join('')}
      </select></div>
    <div class="cms-field"><label>태그</label><input id="ev-tag" class="cms-modal-input" value="${p.tag}"></div>
    <div class="cms-field"><label>뱃지 텍스트</label><input id="ev-badge" class="cms-modal-input" value="${p.badgeText}"></div>
    <div class="cms-field"><label>이미지 제목 (줄바꿈 \\n)</label><input id="ev-imgtitle" class="cms-modal-input" value="${p.imgTitle}"></div>
    <div class="cms-field"><label>프로젝트 제목</label><textarea id="ev-title" style="width:100%;min-height:60px;padding:10px;border:1px solid var(--line);font-size:13px;">${p.title}</textarea></div>
    <div class="cms-field"><label>날짜</label><input id="ev-date" class="cms-modal-input" value="${p.date}"></div>
    <div class="cms-field"><label>성과 1 숫자</label><input id="ev-r1n" class="cms-modal-input" value="${p.results[0]?.num||''}"></div>
    <div class="cms-field"><label>성과 1 라벨</label><input id="ev-r1l" class="cms-modal-input" value="${p.results[0]?.label||''}"></div>
    <div class="cms-field"><label>성과 2 숫자 (선택)</label><input id="ev-r2n" class="cms-modal-input" value="${p.results[1]?.num||''}"></div>
    <div class="cms-field"><label>성과 2 라벨 (선택)</label><input id="ev-r2l" class="cms-modal-input" value="${p.results[1]?.label||''}"></div>`;
  document.getElementById('cms-edit-modal').classList.add('open');
}

const _origSave = window.cmsEditSave;
window.cmsEditSave = function() {
  if (currentEditKey && currentEditKey.startsWith('__card__')) {
    const id = currentEditKey.replace('__card__','');
    const p  = cmsData.projects.find(x => x.id === id);
    if (!p) return;
    p.category  = document.getElementById('cms-edit-val').value;
    p.tag       = document.getElementById('ev-tag').value;
    p.badgeText = document.getElementById('ev-badge').value;
    p.imgTitle  = document.getElementById('ev-imgtitle').value;
    p.title     = document.getElementById('ev-title').value;
    p.date      = document.getElementById('ev-date').value;
    const r1n = document.getElementById('ev-r1n').value;
    const r1l = document.getElementById('ev-r1l').value;
    const r2n = document.getElementById('ev-r2n').value;
    const r2l = document.getElementById('ev-r2l').value;
    p.results = [];
    if (r1n) p.results.push({num:r1n,label:r1l});
    if (r2n) p.results.push({num:r2n,label:r2l});
    cmsSave(); renderProjectCards(); closeEditModal(); showToast('저장됨');
    return;
  }
  cmsEditSave();
};

function cmsDeleteCard(id) {
  if (!confirm('이 프로젝트를 삭제할까요?')) return;
  cmsData.projects = cmsData.projects.filter(x => x.id !== id);
  cmsSave(); renderProjectCards(); showToast('삭제됨');
}

function showAddModal() {
  document.getElementById('cms-add-modal').classList.add('open');
}
function closeAddModal() {
  document.getElementById('cms-add-modal').classList.remove('open');
}
function cmsAddSave() {
  const bgClasses = ['pc-bg-1','pc-bg-2','pc-bg-3','pc-bg-4','pc-bg-5','pc-bg-6'];
  const newP = {
    id: 'p' + Date.now(),
    category:  document.getElementById('add-category').value,
    tag:       document.getElementById('add-tag').value,
    badgeText: document.getElementById('add-badge').value,
    imgTitle:  document.getElementById('add-img-title').value,
    title:     document.getElementById('add-title').value,
    date:      document.getElementById('add-date').value,
    bgClass:   bgClasses[cmsData.projects.length % 6],
    results:   []
  };
  const r1n = document.getElementById('add-r1-num').value;
  const r1l = document.getElementById('add-r1-label').value;
  const r2n = document.getElementById('add-r2-num').value;
  const r2l = document.getElementById('add-r2-label').value;
  if (r1n) newP.results.push({num:r1n,label:r1l});
  if (r2n) newP.results.push({num:r2n,label:r2l});
  cmsData.projects.push(newP);
  cmsSave(); renderProjectCards(); closeAddModal(); showToast('추가됨');
}

/* ═══════════════════════════════
   전체 저장 / 초기화
═══════════════════════════════ */
function cmsSaveAll() { cmsSave(); showToast('전체 저장 완료!'); }
function cmsReset() {
  if (!confirm('모든 내용을 기본값으로 복원할까요?')) return;
  cmsData = { ...DEFAULT_CONTENT, projects: JSON.parse(JSON.stringify(DEFAULT_PROJECTS)) };
  cmsSave(); applyContent(); renderProjectCards(); showToast('기본값으로 복원됨');
}

/* ═══════════════════════════════
   토스트
═══════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('cms-toast');
  t.textContent = '✓ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* 전역 */
window.cmsLogin = cmsLogin; window.cmsLogout = cmsLogout;
window.showLoginModal = showLoginModal; window.closeLoginModal = closeLoginModal;
window.openEditModal = openEditModal; window.closeEditModal = closeEditModal;
window.cmsEditSave = cmsEditSave;
window.cmsEditCard = cmsEditCard; window.cmsDeleteCard = cmsDeleteCard;
window.showAddModal = showAddModal; window.closeAddModal = closeAddModal;
window.cmsAddSave = cmsAddSave; window.cmsSaveAll = cmsSaveAll; window.cmsReset = cmsReset;

document.addEventListener('DOMContentLoaded', cmsInit);
