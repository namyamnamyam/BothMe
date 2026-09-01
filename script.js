const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* iPad/태블릿에서 메인 타이틀이 잘리지 않도록 보정 + 인물 상세창 스타일 */
const runtimeStyle = document.createElement('style');
runtimeStyle.textContent = `
  .hero-content{width:min(100%,980px);max-width:980px;padding-inline:28px;overflow:visible}
  .hero h1{max-width:100%;font-size:clamp(3rem,7vw,6.35rem);line-height:1.08;letter-spacing:-.045em;padding:.06em .08em .12em;overflow:visible;word-break:keep-all}
  .hero h1 em{display:inline-block;padding-inline:.06em;font-family:'Noto Sans KR',system-ui,sans-serif;font-style:italic;line-height:1.08}
  .academy-main{min-height:180px;display:flex;align-items:center}
  .academy-main .lead{margin:0}
  .character-card{cursor:pointer;display:flex;flex-direction:column;outline:none}
  .character-card:focus-visible{border-color:var(--gold-soft);box-shadow:0 0 0 2px rgba(240,217,146,.18)}
  .character-card::after{content:'상세 보기  ↗';display:block;margin-top:auto;padding-top:16px;color:#6f6b72;font-size:.72rem;letter-spacing:.04em}
  .character-modal{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;padding:28px;background:rgba(4,4,7,.82);backdrop-filter:blur(12px)}
  .character-modal.open{display:flex}
  .character-modal-panel{position:relative;width:min(720px,100%);max-height:min(82vh,820px);overflow:auto;border:1px solid rgba(216,177,95,.28);background:linear-gradient(145deg,#17171d,#0e0e12);box-shadow:0 30px 90px rgba(0,0,0,.55);padding:42px}
  .character-modal-close{position:absolute;top:16px;right:18px;width:40px;height:40px;border:1px solid var(--line);background:#111116;color:#ddd;cursor:pointer;font-size:1.25rem}
  .character-modal-close:hover{border-color:var(--gold);color:var(--gold-soft)}
  .modal-kicker{margin:0 52px 8px 0;color:var(--gold);font-size:.7rem;letter-spacing:.14em;font-weight:800}
  .modal-name{margin:0;font-size:clamp(2rem,5vw,3.4rem);line-height:1.12;letter-spacing:-.045em}
  .modal-summary{margin:22px 0 0;color:#bdb8ae;font-size:.95rem}
  .modal-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
  .modal-meta span{padding:7px 10px;border:1px solid var(--line);font-size:.75rem;color:#ccc6bc}
  .modal-ability{margin-top:28px;padding:24px;border-left:3px solid var(--gold);background:rgba(216,177,95,.055)}
  .modal-ability small{display:block;color:#7f7a80;letter-spacing:.1em;margin-bottom:6px}
  .modal-ability h4{margin:0 0 12px;font-size:1.35rem;color:#f1e6c6}
  .modal-ability p{margin:0;color:#b9b4ab;line-height:1.8}
  body.modal-open{overflow:hidden}
  @media (max-width:1100px){
    .hero h1{font-size:clamp(3rem,6.6vw,5.8rem)}
  }
  @media (max-width:720px){
    .hero-content{padding-inline:8px}
    .hero h1{font-size:clamp(2.75rem,13vw,4.6rem);line-height:1.1;padding-inline:.04em}
    .character-modal{padding:14px}
    .character-modal-panel{padding:32px 22px 26px;max-height:88vh}
  }
`;
document.head.appendChild(runtimeStyle);

/* 숫자만 크게 보여주던 아카데미 통계는 제거 */
const academyFacts = document.querySelector('.academy-facts');
academyFacts?.remove();
const academyLead = document.querySelector('.academy-main .lead');
if (academyLead) {
  academyLead.textContent = '발테리아 제국 최고의 교육 기관이자 원작 초중반의 핵심 무대. 수업과 대련, 실전 교육을 통해 학생들은 각자의 고유 능력을 성장시킨다.';
}

const filterButtons = document.querySelectorAll('.filter-btn');
const characterCards = document.querySelectorAll('.character-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    characterCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.group !== filter;
    });
  });
});

const abilityDetails = {
  '세라피나 루멘하임': '성녀의 권능과 빛을 다루는 지원·회복·방어 특화 능력. 《빛의 축복》으로 아군을 강화하고, 《세인트 리커버리》로 부상과 피로를 회복시키며, 《태초의 빛》을 공격·방어·장벽으로 응용한다.',
  '엘레나 프로스트하임': '순수 검술을 중심으로 냉기를 보조적으로 사용하는 능력. 《극야》는 검격 뒤 같은 궤적을 다시 베는 지연 검광이며, 《빙검》과 《설원》은 회복과 움직임을 방해한다.',
  '세레나 아스트라': '별과 우주 현상을 모티브로 한 초고위 마법. 《초신성》의 폭발 화력, 《광년》의 공간 이동, 《칠성》의 방어, 《성해 포화》의 광역 포격을 다룬다.',
  '엘리시아 실바렌': '활과 정령, 자연 환경을 결합한 장거리 전투 능력. 《사대정령》으로 화살과 지형에 속성을 더하고, 《정령시》로 정찰·저격하며, 《세계수의 숲》으로 전장을 정령 친화 영역으로 바꾼다.',
  '레비아 나이트폴': '귀신과 그림자를 이용하는 암살·잠입·정보전 능력. 《그림자 이동》, 《귀영》, 《신출귀몰》로 사각을 장악하고 《개문》으로 거느린 귀신들을 총동원한다.',
  '아우렐리아 폰 아르카디우스': '황실의 권위와 중력을 결합한 통솔·제압형 능력. 《황명》으로 명령의 압박을 가하고, 《친위대》로 아군을 강화하며, 《그라비오르》와 《레갈리아》로 중력장을 지배한다.',
  '세레네 아쿠아리스': '물과 심해 생물을 지배하는 광역 제어 능력. 《하이드로》와 《웨이브》로 물을 조작하고, 《크라켄》의 거대 촉수와 《레비아탄》의 심해 해룡을 소환한다.',
  '카일렌 울프하르트': '늑대 수인의 혈통과 달의 힘을 극대화하는 근접 능력. 《늑대의 피》로 신체를 강화하고, 《월광의 포효》로 전장을 흔들며, 《펜리르의 후예》로 거대한 펜리르 형태까지 변신한다.',
  '모르테아': '영혼을 직접 감지·절단·저장하는 강적 제거 특화 능력. 쓰러뜨린 적의 영혼을 자원으로 저장해 방출·방어·강화에 소비하며, 모든 저장 영혼을 한꺼번에 해방할 수도 있다.',
  '발카': '영구 언데드 군단을 생산·보존·복원하는 대규모 전쟁 특화 능력. 언데드를 그림자 공간에 저장하고 영혼핵이 남으면 복원하며, 필요할 경우 휘하 개체를 폭발시켜 화력으로 전환한다.',
  '네피라': '생명·마력·자원을 끝없이 흡수하고 고갈시키는 장기전 능력. 생명력을 빼앗고 모든 것을 먹어치우는 메뚜기 떼를 만들며, 넓은 지역의 자연 마력까지 흡수해 저장한다.',
  '카시안': '공포·압박·복종·영역 지배에 특화된 능력. 《위압》과 《압력》으로 약자를 굴복시키고, 《정복의 낙인》과 《군림》으로 패배한 적과 넓은 전장을 자신의 지배 아래 둔다.',
  '루나 블러드하트': '자신의 피와 마기를 자유롭게 생성·변환·조작하는 혈마법. 《혈화》, 《폭혈》, 《혈독》을 조합해 공격하며 《네이팜 블러드》로 광역을 뒤덮고, 《혈마》로 마기와 혈액을 서로 전환한다.',
  '엘리아 클라시에르': '빙룡의 냉기와 빙결을 극한까지 끌어올리는 광역 제압 능력. 《서리숨결》과 《절대영도》로 전장을 얼리고, 《용화》를 통해 본래의 거대한 빙룡으로 변신한다.',
  '리무아 벨루체': '슬라임 육체를 자유롭게 분열·재조합·변형하는 군체형 능력. 물질을 부식시키고 점액으로 구속하며, 수많은 개체로 분열하거나 외형을 바꿔 전투·침투에 활용한다.'
};

const modal = document.createElement('div');
modal.className = 'character-modal';
modal.setAttribute('aria-hidden', 'true');
modal.innerHTML = `
  <div class="character-modal-panel" role="dialog" aria-modal="true" aria-labelledby="character-modal-name">
    <button class="character-modal-close" type="button" aria-label="닫기">×</button>
    <p class="modal-kicker"></p>
    <h3 class="modal-name" id="character-modal-name"></h3>
    <p class="modal-summary"></p>
    <div class="modal-meta"></div>
    <div class="modal-ability">
      <small>UNIQUE ABILITY</small>
      <h4></h4>
      <p></p>
    </div>
  </div>
`;
document.body.appendChild(modal);

const modalClose = modal.querySelector('.character-modal-close');
const modalPanel = modal.querySelector('.character-modal-panel');
let lastFocusedCard = null;

function openCharacter(card) {
  const name = card.querySelector('h3')?.textContent.trim() || '';
  const group = card.querySelector('.group')?.textContent.trim() || '';
  const level = card.querySelector('.rank')?.textContent.trim() || '';
  const summary = card.querySelector('p:not(.group)')?.textContent.trim() || '';
  const ability = card.querySelector('.ability b')?.textContent.trim() || '';

  modal.querySelector('.modal-kicker').textContent = group;
  modal.querySelector('.modal-name').textContent = name;
  modal.querySelector('.modal-summary').textContent = summary;
  modal.querySelector('.modal-meta').innerHTML = `<span>${level}</span><span>${group}</span>`;
  modal.querySelector('.modal-ability h4').textContent = ability;
  modal.querySelector('.modal-ability p').textContent = abilityDetails[name] || '세부 능력 정보가 준비 중이다.';

  lastFocusedCard = card;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeCharacter() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocusedCard?.focus();
}

characterCards.forEach(card => {
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${card.querySelector('h3')?.textContent || '인물'} 상세 보기`);
  card.addEventListener('click', () => openCharacter(card));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCharacter(card);
    }
  });
});

modalClose.addEventListener('click', closeCharacter);
modal.addEventListener('click', event => {
  if (event.target === modal) closeCharacter();
});
modalPanel.addEventListener('click', event => event.stopPropagation());
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeCharacter();
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));
