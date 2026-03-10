/* js/cms-editor.js
   섹션별 ✏️ 편집 버튼 + 전용 모달 패널
   관리자 로그인 후 각 섹션 우측 상단에 편집 버튼 노출
*/

/* ═══════════════════════════════
   섹션 편집 정의
═══════════════════════════════ */
const SECTION_EDITORS = {

  /* ── 홈 히어로 슬라이드 ── */
  home: {
    label: '🏠 홈 히어로 슬라이드',
    icon: '🖼',
    targetSelector: '.ae-hero-main',
    fields: [
      { group: '슬라이드 1', fields: [
        { key: 'slide-0-tag',   label: '태그',   type: 'text' },
        { key: 'slide-0-title', label: '제목',   type: 'textarea' },
        { key: 'slide-0-desc',  label: '설명',   type: 'textarea' },
      ]},
      { group: '슬라이드 2', fields: [
        { key: 'slide-1-tag',   label: '태그',   type: 'text' },
        { key: 'slide-1-title', label: '제목',   type: 'textarea' },
        { key: 'slide-1-desc',  label: '설명',   type: 'textarea' },
      ]},
      { group: '슬라이드 3', fields: [
        { key: 'slide-2-tag',   label: '태그',   type: 'text' },
        { key: 'slide-2-title', label: '제목',   type: 'textarea' },
        { key: 'slide-2-desc',  label: '설명',   type: 'textarea' },
      ]},
    ]
  },

  /* ── Who is She ── */
  who: {
    label: '👤 Who is She',
    icon: '👤',
    targetSelector: '.who-intro',
    fields: [
      { group: '메인 소개', fields: [
        { key: 'who-title', label: '메인 타이틀', type: 'textarea' },
        { key: 'who-desc',  label: '소개 문구',   type: 'textarea' },
      ]},
      { group: '핵심 수치 (스탯)', fields: [
        { key: 'who-stat-0',       label: '수치 1 숫자',  type: 'text' },
        { key: 'who-stat-0-label', label: '수치 1 라벨',  type: 'text' },
        { key: 'who-stat-1',       label: '수치 2 숫자',  type: 'text' },
        { key: 'who-stat-1-label', label: '수치 2 라벨',  type: 'text' },
        { key: 'who-stat-2',       label: '수치 3 숫자',  type: 'text' },
        { key: 'who-stat-2-label', label: '수치 3 라벨',  type: 'text' },
        { key: 'who-stat-3',       label: '수치 4 숫자',  type: 'text' },
        { key: 'who-stat-3-label', label: '수치 4 라벨',  type: 'text' },
      ]},
      { group: '지원동기', fields: [
        { key: 'who-motive-title', label: '지원동기 제목', type: 'textarea' },
        { key: 'who-quote',        label: '인용구',        type: 'textarea' },
        { key: 'who-motive-body-1',label: '본문 1',        type: 'textarea' },
        { key: 'who-motive-body-2',label: '본문 2',        type: 'textarea' },
      ]},
      { group: '성장 스토리', fields: [
        { key: 'who-growth-title',  label: '성장 제목', type: 'textarea' },
        { key: 'who-growth-body-1', label: '본문 1',    type: 'textarea' },
        { key: 'who-growth-body-2', label: '본문 2',    type: 'textarea' },
        { key: 'who-growth-body-3', label: '본문 3',    type: 'textarea' },
      ]},
    ]
  },

  /* ── Inside & Insight 카드 ── */
  insight: {
    label: '📋 Inside & Insight 카드',
    icon: '📋',
    targetSelector: '#pr-card-grid',
    isCardEditor: true,   // 카드 에디터 모드
  },

  /* ── Vision ── */
  vision: {
    label: '🎯 Vision',
    icon: '🎯',
    targetSelector: '.vision-page',
    fields: [
      { group: 'Vision 선언', fields: [
        { key: 'vision-title', label: '비전 제목', type: 'textarea' },
        { key: 'vision-body',  label: '비전 본문', type: 'textarea' },
      ]},
      { group: '단기 목표 (1년)', fields: [
        { key: 'goal-1-title', label: '목표 제목', type: 'textarea' },
        { key: 'goal-1-body',  label: '목표 내용', type: 'textarea' },
      ]},
      { group: '장기 목표 (3년)', fields: [
        { key: 'goal-2-title', label: '목표 제목', type: 'textarea' },
        { key: 'goal-2-body',  label: '목표 내용', type: 'textarea' },
      ]},
    ]
  },
};

/* ═══════════════════════════════
   편집 버튼 주입
═══════════════════════════════ */
function injectSectionEditBtns() {
  removeSectionEditBtns();
  if (!window.cmsMode) return;

  const insertMap = [
    { sectionId: 'page-home',    editorKey: 'home',    anchorSel: '.ae-hero-main',    label: '히어로 슬라이드 편집' },
    { sectionId: 'page-who',     editorKey: 'who',     anchorSel: '.who-intro',       label: 'Who is She 편집' },
    { sectionId: 'page-insight', editorKey: 'insight', anchorSel: '.pr-section-hd',   label: '카드 추가/편집' },
    { sectionId: 'page-vision',  editorKey: 'vision',  anchorSel: '.vision-page',     label: 'Vision 편집' },
  ];

  insertMap.forEach(({ sectionId, editorKey, anchorSel, label }) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const anchor = section.querySelector(anchorSel) || section;
    anchor.style.position = 'relative';

    const btn = document.createElement('button');
    btn.className = 'sec-edit-btn';
    btn.dataset.editorKey = editorKey;
    btn.innerHTML = `✏️ ${label}`;
    btn.onclick = (e) => { e.stopPropagation(); openSectionEditor(editorKey); };
    anchor.appendChild(btn);
  });
}

function removeSectionEditBtns() {
  document.querySelectorAll('.sec-edit-btn').forEach(b => b.remove());
}

/* ═══════════════════════════════
   섹션 에디터 모달 열기
═══════════════════════════════ */
function openSectionEditor(key) {
  const def = SECTION_EDITORS[key];
  if (!def) return;

  if (def.isCardEditor) {
    // 카드 에디터는 기존 cms.js의 카드 추가 모달 사용
    showAddModal && showAddModal();
    return;
  }

  const modal = document.getElementById('sec-editor-modal');
  const title = document.getElementById('sec-editor-title');
  const body  = document.getElementById('sec-editor-body');

  title.textContent = def.label;
  body.innerHTML = '';

  // 그룹별 필드 렌더링
  def.fields.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'sec-group';
    groupEl.innerHTML = `<div class="sec-group-label">${group.group}</div>`;

    group.fields.forEach(f => {
      const val = (window.cmsData && window.cmsData[f.key]) || '';
      const fieldEl = document.createElement('div');
      fieldEl.className = 'sec-field';
      fieldEl.innerHTML = `
        <label class="sec-field-label">${f.label}</label>
        ${f.type === 'textarea'
          ? `<textarea class="sec-field-input" data-key="${f.key}" rows="3">${val}</textarea>`
          : `<input class="sec-field-input" type="text" data-key="${f.key}" value="${val.replace(/"/g,'&quot;')}">`
        }`;
      groupEl.appendChild(fieldEl);
    });
    body.appendChild(groupEl);
  });

  modal.classList.add('open');
  // 현재 편집 섹션 저장
  modal.dataset.currentKey = key;
}

function closeSectionEditor() {
  document.getElementById('sec-editor-modal').classList.remove('open');
}

function saveSectionEditor() {
  const modal = document.getElementById('sec-editor-modal');
  const inputs = modal.querySelectorAll('.sec-field-input[data-key]');
  inputs.forEach(el => {
    const key = el.dataset.key;
    const val = el.value;
    if (window.cmsData) window.cmsData[key] = val;
    // DOM 즉시 반영
    document.querySelectorAll(`[data-cms="${key}"]`).forEach(domEl => {
      domEl.innerHTML = val.replace(/\n/g, '<br>');
    });
  });
  window.cmsSave && window.cmsSave();
  closeSectionEditor();
  showSecToast('저장 완료!');
}

/* ═══════════════════════════════
   모달 + CSS 주입
═══════════════════════════════ */
function injectSectionEditorUI() {
  // 모달
  const modal = document.createElement('div');
  modal.id = 'sec-editor-modal';
  modal.innerHTML = `
    <div class="sec-modal-box">
      <div class="sec-modal-header">
        <h3 class="sec-modal-title" id="sec-editor-title">편집</h3>
        <button class="sec-modal-close" onclick="closeSectionEditor()">×</button>
      </div>
      <div class="sec-modal-body" id="sec-editor-body"></div>
      <div class="sec-modal-footer">
        <button class="sec-modal-save" onclick="saveSectionEditor()">💾 저장하기</button>
        <button class="sec-modal-cancel" onclick="closeSectionEditor()">취소</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  // 토스트
  const toast = document.createElement('div');
  toast.id = 'sec-toast';
  document.body.appendChild(toast);

  // CSS
  const style = document.createElement('style');
  style.textContent = `
    /* ── 섹션 편집 버튼 ── */
    .sec-edit-btn {
      position: absolute; top: 12px; right: 12px; z-index: 500;
      padding: 7px 16px; background: rgba(0,44,95,.92);
      color: #fff; border: 1px solid rgba(255,255,255,.15);
      font-size: 12px; font-weight: 500;
      font-family: 'Noto Sans KR', sans-serif;
      letter-spacing: .04em; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,.3);
      transition: background .2s, transform .2s;
      border-radius: 4px;
      white-space: nowrap;
    }
    .sec-edit-btn:hover { background: #00aad2; transform: translateY(-1px); }

    /* ── 섹션 에디터 모달 ── */
    #sec-editor-modal {
      display: none; position: fixed; inset: 0; z-index: 9995;
      background: rgba(0,0,0,.55); backdrop-filter: blur(4px);
      align-items: flex-start; justify-content: flex-end;
      padding: 72px 20px 20px 0;
    }
    #sec-editor-modal.open { display: flex; }

    .sec-modal-box {
      width: 420px; max-height: calc(100vh - 96px);
      background: #fff; display: flex; flex-direction: column;
      box-shadow: 0 24px 64px rgba(0,0,0,.25);
      animation: secSlideIn .3s cubic-bezier(.16,1,.3,1);
      border-radius: 2px;
    }
    @keyframes secSlideIn {
      from { opacity:0; transform:translateX(24px); }
      to   { opacity:1; transform:translateX(0); }
    }

    .sec-modal-header {
      padding: 18px 20px 16px;
      border-bottom: 1px solid #eee;
      display: flex; align-items: center; justify-content: space-between;
      background: #002C5F; flex-shrink: 0;
    }
    .sec-modal-title { font-size: 15px; font-weight: 700; color: #fff; }
    .sec-modal-close {
      width: 28px; height: 28px; background: rgba(255,255,255,.1);
      border: none; color: #fff; font-size: 18px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      border-radius: 50%; transition: background .2s;
    }
    .sec-modal-close:hover { background: rgba(255,255,255,.2); }

    .sec-modal-body {
      flex: 1; overflow-y: auto; padding: 16px 20px;
    }
    .sec-modal-body::-webkit-scrollbar { width: 4px; }
    .sec-modal-body::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

    .sec-group { margin-bottom: 20px; }
    .sec-group-label {
      font-size: 10px; font-weight: 700; letter-spacing: .16em;
      text-transform: uppercase; color: #00aad2;
      padding-bottom: 8px; border-bottom: 1px solid #eee;
      margin-bottom: 12px;
    }
    .sec-field { margin-bottom: 12px; }
    .sec-field-label {
      display: block; font-size: 11px; font-weight: 500;
      color: #888; letter-spacing: .06em; margin-bottom: 5px;
      text-transform: uppercase;
    }
    .sec-field-input {
      width: 100%; padding: 8px 12px;
      border: 1px solid #e0e0e0; font-size: 13px;
      font-family: 'Noto Sans KR', sans-serif; color: #111;
      background: #fafafa; resize: vertical; line-height: 1.6;
      transition: border-color .2s;
    }
    .sec-field-input:focus { outline: none; border-color: #002C5F; background: #fff; }

    .sec-modal-footer {
      padding: 12px 20px; border-top: 1px solid #eee;
      display: flex; gap: 8px; flex-shrink: 0;
    }
    .sec-modal-save {
      flex: 1; height: 40px; background: #002C5F; color: #fff;
      border: none; font-size: 13px; font-weight: 500;
      font-family: 'Noto Sans KR', sans-serif; cursor: pointer;
      letter-spacing: .04em; transition: background .2s;
    }
    .sec-modal-save:hover { background: #00aad2; }
    .sec-modal-cancel {
      height: 40px; padding: 0 20px;
      background: transparent; color: #666;
      border: 1px solid #e0e0e0; font-size: 13px;
      font-family: 'Noto Sans KR', sans-serif; cursor: pointer;
      transition: all .2s;
    }
    .sec-modal-cancel:hover { background: #f5f5f5; }

    /* 토스트 */
    #sec-toast {
      position: fixed; bottom: 32px; left: 50%;
      transform: translateX(-50%) translateY(16px);
      background: #002C5F; color: #fff;
      padding: 12px 28px; font-size: 13px; font-weight: 500;
      font-family: 'Noto Sans KR', sans-serif; letter-spacing: .04em;
      opacity: 0; pointer-events: none; z-index: 9999;
      transition: all .3s; border-radius: 4px;
    }
    #sec-toast.show {
      opacity: 1; transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);
}

function showSecToast(msg) {
  const t = document.getElementById('sec-toast');
  if (!t) return;
  t.textContent = '✓ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* ═══════════════════════════════
   showPage 훅 — 페이지 이동 시 버튼 재주입
═══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  injectSectionEditorUI();

  // 기존 showPage 패치
  const _orig = window.showPage;
  window.showPage = function(id) {
    _orig && _orig(id);
    setTimeout(() => { if (window.cmsMode) injectSectionEditBtns(); }, 80);
  };

  // CMS 로그인/로그아웃 훅
  const _origLogin = window.cmsLogin;
  window.cmsLogin = function() {
    _origLogin && _origLogin();
    setTimeout(injectSectionEditBtns, 100);
  };

  const _origLogout = window.cmsLogout;
  window.cmsLogout = function() {
    _origLogout && _origLogout();
    removeSectionEditBtns();
  };
});

window.openSectionEditor  = openSectionEditor;
window.closeSectionEditor = closeSectionEditor;
window.saveSectionEditor  = saveSectionEditor;
window.injectSectionEditBtns = injectSectionEditBtns;
window.removeSectionEditBtns = removeSectionEditBtns;
