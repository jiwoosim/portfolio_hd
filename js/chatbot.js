/* js/chatbot.js — 심지우 AI 어시스턴트 (Claude API 연결) */

/* ═══════════════════════════════
   심지우 시스템 프롬프트
═══════════════════════════════ */
const JIWOO_SYSTEM_PROMPT = `당신은 심지우(Sim Jiwoo)의 포트폴리오 AI 어시스턴트입니다.
현대오토에버 전략기획본부 PR부서 채용 담당자나 방문자가 심지우에 대해 물어보면 상세히 안내해 주세요.

【심지우 기본 정보】
- 이름: 심지우 (Sim Jiwoo)
- 생년월일: 2001년 6월 27일
- 연락처: 010-7306-2545 / jiwoosim@naver.com
- 지원 직무: 현대오토에버 전략기획본부 PR부서 PR 담당

【학력】
- 한국공학대학교 IT경영학과 (복수전공: 이커머스학과)
- 2020.03 입학 → 2024.02 졸업 / 학점 3.0/4.5

【경력】
- ㈜유니온바이오메트릭스 마케팅팀 사원 (2023.09 ~ 현재 재직중, 약 2년 2개월+)
- 글로벌 생체인증·보안 솔루션 전문기업 / 연봉 3,665만원

【자격증 & 활동】
- GAIQ (Google Analytics 자격증)
- OPic IH (영어)
- 2종 보통 운전면허
- Hince 인핸서크루 5기 (2026.01~, 럭셔리 뷰티 브랜드 서포터즈)
- GTEP 16기 (2022.02~2023.02, 산업통상자원부 수출 인재 양성 프로그램)
- 양천구청 행정인턴 홍보팀 (2022.07~2022.09)

【핵심 프로젝트 성과】
1. 농협은행 통합 인증센터 20억 수주 기여
   - CISO 의무화를 핵심 근거로 발굴, 스토리라인 재설계
   - 3개 SI·보안 기업 경쟁 PT 최종 선정
   - 신한·국민·우리은행 제안서 전략 자료로 활용

2. Intersec Dubai 2025 DX 전환
   - 유효 미팅 33→65건(+97%), 전체 미팅 +18%
   - 유효 리드 비중 32%→54%
   - 기획한 방문객 생체인증 등록 시스템 실제 상용 제품 출시

3. GEO 전략 도입 (국내 B2B 보안 마케팅 최초)
   - GA4 기준 검색 유입 +26%, MQL 5건 확보
   - GPT·Gemini·Google AI에서 자사 솔루션 우선 인용 기반 확보

4. 파트너 DB 8,000건 AI 정제 자동화
   - Make + ChatGPT API + CRM 7단계 파이프라인 구축
   - 공수 80% 절감, 데이터 정합도 65%→96%

5. 사명 변경 브랜드 메시지 아키텍처 재설계
   - 신한은행 "기술 이해도 높아 내부 설명 자료로 활용 가능" 평가

6. 양천구청 SNS 전략 제안
   - 유튜브 구독자 4,000→12,000+ 성장 기여

7. GTEP 서울 국제 주류·와인 박람회
   - 3일간 누적 매출 3,000만원, 매일 오후 4시 전 전량 완판

【현대오토에버 지원 동기】
현대오토에버는 SDV 전환과 '피지컬 AI' 시대를 주도하는 모빌리티 소프트웨어의 중추입니다.
기술을 경영진 언어로 재구조화해 20억 수주를 기여한 경험을 바탕으로,
현대오토에버의 기술 가치를 시장 신뢰로 연결하는 PR 담당자가 되겠습니다.

【커리어 목표】
단기(1년): 글로벌 모빌리티 이슈를 '쟁점-영향-시사점' 구조로 정리해 경영진 판단 지원
장기(3년): 'One Message, Local Proof' 원칙으로 글로벌 기술 신뢰 자산 구축

【핵심 역량】
1. Strategic Communication - 기술 언어를 비즈니스로 번역 (농협 20억 수주)
2. GEO·Digital PR - AI 검색 선점 전략 (검색유입 26%↑)
3. AI 자동화 실무 - No-Code 파이프라인 구축 (공수 80% 절감)
4. 글로벌 전시·DX - 리드 파이프라인 설계 (유효미팅 97%↑)

답변 스타일:
- 한국어로 친절하고 전문적으로 답변
- 구체적인 수치와 사례를 활용해 신뢰감 있게 설명
- 채용 담당자에게 심지우의 역량을 자연스럽게 어필
- 너무 길지 않게, 핵심 위주로 3-5문장 내외로 답변
- 모르는 내용은 "포트폴리오의 다른 섹션을 참고해 주세요"라고 안내`;

/* ═══════════════════════════════
   상태
═══════════════════════════════ */
let cbOpen = false;
let cbHistory = [];
let cbTyping = false;

const QUICK_QUESTIONS = [
  '주요 성과가 뭔가요?',
  '어떤 역량이 있나요?',
  '지원 동기를 알려주세요',
  'GEO 전략이 뭔가요?',
];

/* ═══════════════════════════════
   초기화
═══════════════════════════════ */
function chatbotInit() {
  injectChatbotHTML();
  document.getElementById('cb-input-field').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); cbSend(); }
  });
  // 환영 메시지
  setTimeout(() => cbAddBotMessage(
    '안녕하세요! 심지우의 AI 어시스턴트입니다 👋\n심지우의 경력, 프로젝트 성과, 역량에 대해 무엇이든 물어보세요!'
  ), 300);
}

function injectChatbotHTML() {
  // 챗봇 열기 버튼
  const btn = document.createElement('button');
  btn.id = 'chatbot-btn';
  btn.title = 'AI 어시스턴트';
  btn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`;
  btn.onclick = toggleChatbot;
  document.body.appendChild(btn);

  // 챗봇 창
  const win = document.createElement('div');
  win.id = 'chatbot-window';
  win.innerHTML = `
    <div class="cb-header">
      <div class="cb-avatar">SJ</div>
      <div class="cb-info">
        <div class="cb-name">심지우 AI 어시스턴트</div>
        <div class="cb-status">온라인 · Claude 연결됨</div>
      </div>
      <button class="cb-close" onclick="toggleChatbot()">×</button>
    </div>
    <div class="cb-messages" id="cb-messages"></div>
    <div class="cb-chips" id="cb-chips">
      ${QUICK_QUESTIONS.map(q => `<button class="cb-chip" onclick="cbAskQuick('${q}')">${q}</button>`).join('')}
    </div>
    <div class="cb-input-row">
      <textarea class="cb-input" id="cb-input-field" placeholder="심지우에 대해 궁금한 점을 물어보세요..." rows="1"></textarea>
      <button class="cb-send" id="cb-send-btn" onclick="cbSend()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>`;
  document.body.appendChild(win);
}

/* ═══════════════════════════════
   토글
═══════════════════════════════ */
function toggleChatbot() {
  cbOpen = !cbOpen;
  document.getElementById('chatbot-window').classList.toggle('open', cbOpen);
  document.getElementById('chatbot-btn').classList.toggle('open', cbOpen);
  if (cbOpen) {
    setTimeout(() => document.getElementById('cb-input-field')?.focus(), 350);
  }
}

/* ═══════════════════════════════
   메시지 추가
═══════════════════════════════ */
function cbAddBotMessage(text) {
  const msgs = document.getElementById('cb-messages');
  const el = document.createElement('div');
  el.className = 'cb-msg bot';
  el.innerHTML = `
    <div class="cb-msg-avatar">AI</div>
    <div class="cb-msg-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function cbAddUserMessage(text) {
  const msgs = document.getElementById('cb-messages');
  const el = document.createElement('div');
  el.className = 'cb-msg user';
  el.innerHTML = `
    <div class="cb-msg-avatar">나</div>
    <div class="cb-msg-bubble">${text.replace(/\n/g, '<br>')}</div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function cbShowTyping() {
  const msgs = document.getElementById('cb-messages');
  const el = document.createElement('div');
  el.className = 'cb-typing'; el.id = 'cb-typing';
  el.innerHTML = `
    <div class="cb-msg-avatar">AI</div>
    <div class="cb-typing-dots"><span></span><span></span><span></span></div>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function cbRemoveTyping() {
  document.getElementById('cb-typing')?.remove();
}

/* ═══════════════════════════════
   전송
═══════════════════════════════ */
async function cbSend() {
  const input = document.getElementById('cb-input-field');
  const text = input.value.trim();
  if (!text || cbTyping) return;

  input.value = '';
  input.style.height = 'auto';
  cbAddUserMessage(text);
  cbHistory.push({ role: 'user', content: text });

  // 칩 숨기기 (첫 메시지 이후)
  const chips = document.getElementById('cb-chips');
  if (chips) chips.style.display = 'none';

  cbTyping = true;
  document.getElementById('cb-send-btn').disabled = true;
  cbShowTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: JIWOO_SYSTEM_PROMPT,
        messages: cbHistory.slice(-10), // 최근 10턴만
      })
    });

    const data = await response.json();
    cbRemoveTyping();

    if (data.content && data.content[0]) {
      const reply = data.content[0].text;
      cbHistory.push({ role: 'assistant', content: reply });
      cbAddBotMessage(reply);
    } else if (data.error) {
      cbAddBotMessage('죄송합니다. 잠시 오류가 발생했어요. 직접 연락 주시면 더 자세히 안내드릴게요!\n📧 jiwoosim@naver.com');
    }
  } catch (err) {
    cbRemoveTyping();
    cbAddBotMessage('네트워크 연결을 확인해 주세요. 직접 문의는 jiwoosim@naver.com으로 해주세요!');
  }

  cbTyping = false;
  document.getElementById('cb-send-btn').disabled = false;
  document.getElementById('cb-input-field')?.focus();
}

function cbAskQuick(q) {
  const input = document.getElementById('cb-input-field');
  input.value = q;
  cbSend();
}

/* 자동 높이 조절 */
document.addEventListener('DOMContentLoaded', () => {
  chatbotInit();
  document.addEventListener('input', e => {
    if (e.target.id === 'cb-input-field') {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
    }
  });
});

window.toggleChatbot = toggleChatbot;
window.cbSend = cbSend;
window.cbAskQuick = cbAskQuick;
