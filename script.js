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
  .character-modal-panel{position:relative;width:min(820px,100%);max-height:min(84vh,860px);overflow:auto;border:1px solid rgba(216,177,95,.28);background:linear-gradient(145deg,#17171d,#0e0e12);box-shadow:0 30px 90px rgba(0,0,0,.55);padding:44px}
  .character-modal-close{position:absolute;top:16px;right:18px;width:40px;height:40px;border:1px solid var(--line);background:#111116;color:#ddd;cursor:pointer;font-size:1.25rem}
  .modal-kicker{margin:0 52px 8px 0;color:var(--gold);font-size:.7rem;letter-spacing:.14em;font-weight:800}
  .modal-name{margin:0;font-size:clamp(2rem,5vw,3.4rem);line-height:1.12;letter-spacing:-.045em}
  .modal-summary{margin:22px 0 0;color:#c6c0b7;font-size:.98rem;line-height:1.9}
  .modal-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}
  .modal-meta span{padding:7px 10px;border:1px solid var(--line);font-size:.75rem;color:#ccc6bc}
  .modal-ability{margin-top:30px;padding:26px;border-left:3px solid var(--gold);background:rgba(216,177,95,.055)}
  .modal-ability small{display:block;color:#7f7a80;letter-spacing:.1em;margin-bottom:6px}
  .modal-ability h4{margin:0 0 14px;font-size:1.38rem;color:#f1e6c6}
  .modal-ability p{margin:0;color:#b9b4ab;line-height:1.95;white-space:pre-line}
  body.modal-open{overflow:hidden}
  @media (max-width:1100px){.hero h1{font-size:clamp(3rem,6.6vw,5.8rem)}}
  @media (max-width:720px){
    .hero-content{padding-inline:8px}
    .hero h1{font-size:clamp(2.75rem,13vw,4.6rem);line-height:1.1;padding-inline:.04em}
    .character-modal{padding:14px}
    .character-modal-panel{padding:32px 22px 26px;max-height:88vh}
  }
`;
document.head.appendChild(runtimeStyle);

/* 요청 반영: 불필요한 문구·섹션 삭제 */
document.querySelector('.conflict-note')?.remove();
document.querySelector('#artifacts')?.remove();
document.querySelector('.nav a[href="#artifacts"]')?.remove();

/* 고유 능력 설명을 아카데미 바로 앞으로 이동 */
const systemSection = document.querySelector('#system');
const academySection = document.querySelector('#academy');
if (systemSection && academySection) academySection.before(systemSection);

/* 이동한 순서에 맞춰 섹션 번호와 메뉴 순서 정리 */
const systemKicker = document.querySelector('#system .section-heading > span');
const academyKicker = document.querySelector('#academy .section-heading > span');
const charactersKicker = document.querySelector('#characters .section-heading > span');
if (systemKicker) systemKicker.textContent = '03 / UNIQUE ABILITY';
if (academyKicker) academyKicker.textContent = '04 / ACADEMY';
if (charactersKicker) charactersKicker.textContent = '05 / CHARACTERS';

const systemNav = document.querySelector('.nav a[href="#system"]');
const academyNav = document.querySelector('.nav a[href="#academy"]');
if (systemNav && academyNav) academyNav.before(systemNav);

/* 아카데미 숫자 통계 제거 */
document.querySelector('.academy-facts')?.remove();
const academyLead = document.querySelector('.academy-main .lead');
if (academyLead) {
  academyLead.textContent = '발테리아 제국 최고의 교육 기관이자 원작 초중반의 핵심 무대. 수업과 대련, 실전 교육을 통해 학생들은 각자의 고유 능력을 성장시킨다.';
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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

const characterDetails = {
  '세라피나 루멘하임': {
    bio:'백금발 장발과 금안을 지닌 성녀. 자애롭고 다정하며 기본적으로 타인을 선의로 대한다. 누군가 다치거나 곤란한 상황에 놓이면 먼저 다가가 챙기는 편이며 말투도 부드럽고 정중하다. 다만 세상 물정에는 조금 어두워 가끔 엉뚱한 상식 부족으로 주변을 당황시키기도 한다. 평소에는 온화하지만 악의적인 행동이나 무고한 사람을 해치는 일에는 의외로 단호하다.',
    ability:'《여명》은 성녀의 권능과 빛 마법을 하나로 묶은 지원·회복·방어 특화 고유 능력이다.\n\n《빛의 축복》은 지정한 아군의 신체 능력과 마력 운용 능력을 높이고 상태 이상 및 정신계 간섭에 대한 저항력까지 강화한다. 필요하면 여러 명에게 동시에 적용할 수 있다.\n\n《세인트 리커버리》는 외상뿐 아니라 누적 피로, 마력 소모로 인한 탈진, 정신적 피로까지 완화해 장기전에서 아군의 전투 지속력을 크게 높인다.\n\n《태초의 빛》은 고밀도 빛을 자유롭게 형성하는 상위 능력으로 광선, 폭발, 방패, 장벽, 범위 방어 등 공격과 방어 양쪽에 폭넓게 응용할 수 있다.'
  },
  '엘레나 프로스트하임': {
    bio:'백발 포니테일과 청안을 지닌 검성. 승부욕이 강한 노력파이며 차분하고 냉정하고 과묵하다. 쓸데없는 말을 싫어해 대체로 짧고 직설적으로 말한다. 강한 상대를 보면 조용히 관심을 보이며, 패배했을 때도 변명하기보다는 훈련과 분석을 통해 다시 도전하려 한다. 마법 검사라기보다 어디까지나 순수 검술을 중심으로 싸우는 정통 검사다.',
    ability:'《영원의 겨울》은 순수 검술을 중심으로 냉기를 보조적으로 사용하는 고유 능력이다. 냉기는 검술을 대신하는 주력이 아니라 상대의 흐름을 무너뜨리고 검격의 완성도를 높이는 보조 수단이다.\n\n《극야》는 검을 휘두른 뒤 짧은 지연을 두고 같은 궤적을 따라 백색 검광이 다시 한 번 베어내는 주력 기술이다. 첫 검격을 피하거나 막아도 두 번째 참격이 이어져 회피 타이밍을 흔든다.\n\n《빙검》은 참격에 약한 빙결과 회복 방해를 부여해 상처 회복과 움직임을 둔화시킨다.\n\n《설원》은 주변에 옅은 냉기를 퍼뜨려 발놀림과 균형을 방해하는 보조 영역이다. 강제 동결이나 대규모 얼음 마법 난사처럼 사용하지 않으며 모든 전투의 중심은 엘레나 자신의 검술이다.'
  },
  '세레나 아스트라': {
    bio:'백발 장발과 자안을 지니고 거대한 보라색 마녀모자를 쓰는 대마법사. 늘 나른하고 졸려하며 말과 행동 모두 느긋하다. 어디서든 잘 자고 몸을 쓰는 일을 귀찮아하지만 중요한 순간에는 바로 정신을 차린다. 친해진 상대에게는 업어 달라고 하거나 몰래 등에 올라타는 식의 뻔뻔한 면도 보인다. 평소 모습과 달리 전투에서는 공격, 이동, 방어, 광역 화력을 모두 다루는 완성형 마법사에 가깝다.',
    ability:'《성야의 꿈》은 별과 우주 현상을 모티브로 한 초고위 마법 계열의 고유 능력이다.\n\n《초신성》은 별빛과 마력을 고밀도로 압축한 뒤 폭발시키는 고화력 공격으로 단일 표적 저격과 범위 폭발 양쪽에 활용할 수 있다.\n\n《광년》은 자신이나 지정한 대상을 순간적으로 다른 위치로 이동시키는 공간 이동 능력으로 회피, 구조, 진입 모두에 사용할 수 있다.\n\n《칠성》은 여러 겹의 별빛 장벽을 펼쳐 공격을 막는 방어 능력이다.\n\n《성해 포화》는 수많은 별빛 탄환과 광구를 넓은 범위에 쏟아붓는 대규모 포격으로 전장을 통째로 압박한다.'
  },
  '엘리시아 실바렌': {
    bio:'금발 장발과 녹안을 지닌 하이엘프 궁수. 자존심과 종족적 긍지가 강해 처음 만난 인간을 은근히 아래로 보기도 한다. 말투는 품위 있고 자신감이 넘치며 실력이 부족한 상대에게는 냉정한 평가를 내린다. 반대로 뛰어난 실력과 꾸준한 노력은 확실히 인정하고, 한 번 동료로 인정한 상대에게는 의외로 책임감이 강하다.',
    ability:'《세계수의 아이》는 활, 정령, 자연 환경을 결합해 장거리 사격과 지형 장악에 특화된 고유 능력이다.\n\n《사대정령》은 바람·대지·물·불 정령의 힘을 빌려 화살의 속도와 궤도를 바꾸거나 속성을 부여하며, 방어와 지형 변화에도 응용할 수 있다.\n\n《정령시》는 정령과 시야를 공유해 정찰, 감시, 사각 탐지, 초장거리 저격을 가능하게 한다.\n\n《세계수의 숲》은 주변을 정령 친화적인 숲 형태의 영역으로 변화시켜 정령의 힘을 끌어올리고 적의 이동과 시야를 방해한다. 조건이 맞으면 강력한 상위 정령이나 정령왕의 힘까지 끌어낼 수 있다.'
  },
  '레비아 나이트폴': {
    bio:'흑발 단발과 흑안을 지닌 암살자. 능글맞고 장난기가 많으며 눈치가 빠르고 거짓말에도 능하다. 처음 보는 사람에게도 자연스럽게 말을 걸고 반응을 떠보지만 자신의 진심과 과거는 쉽게 드러내지 않는다. 가까워질수록 오히려 장난으로 넘기거나 한발 물러나는 버릇이 있어 관계가 깊어질수록 속을 읽기 어려운 인물이다.',
    ability:'《백귀야행》은 귀신과 그림자를 이용한 암살·잠입·정찰·정보전 특화 고유 능력이다.\n\n《그림자 이동》은 서로 이어진 그림자 사이를 빠르게 오가며 추적 회피, 침투, 기습 위치 선점에 사용한다.\n\n《귀영》은 자신의 존재감과 기척, 발소리, 흔적을 억제해 탐지를 어렵게 만든다.\n\n《신출귀몰》은 귀신과 연계해 서로 다른 사각과 그림자에서 연속적으로 나타나 공격하는 기습 능력이다.\n\n《개문》은 자신이 거느리는 귀신들을 한꺼번에 풀어 여러 방향에서 총공격을 가한다. 정면 화력보다 위치 선정과 기습, 교란에서 가장 강하다.'
  },
  '아우렐리아 폰 아르카디우스': {
    bio:'긴 금발과 적안을 지닌 발테리아 제국의 제1황녀이자 학생회장. 품위 있고 냉정하며 현실적이지만 평소 학생들에게는 자애로운 편이다. 유능한 인재를 적극적으로 눈여겨보는 인재 욕심이 강하고, 규칙 위반이나 큰 잘못에는 개인적인 호감과 무관하게 냉정한 처분을 내린다. 대화할 때는 감정을 크게 드러내지 않지만 자연스럽게 주도권을 가져가는 타입이다.',
    ability:'《왕좌의 무게》는 황실의 권위와 중력을 결합한 통솔·제압형 고유 능력이다.\n\n《황명》은 대상에게 강제성이 있는 명령을 내린다. 자신보다 약한 상대일수록 효과가 강하고 강자는 저항할 수 있지만 그 과정에서 부담을 받는다.\n\n《친위대》는 지정한 아군에게 작용하는 중력을 경감하고 신체 능력과 전투 효율을 높인다.\n\n《그라비오르》는 중력을 증가·감소·반전시키며 공격, 구속, 이동 보조 등 여러 용도로 활용할 수 있다.\n\n《레갈리아》는 광범위 중력장을 펼쳐 적을 짓누르거나 띄우고 아군을 강화하는 상위 능력이다. 사용 후 약 3시간 동안 《왕좌의 무게》 전체를 사용할 수 없다.'
  },
  '세레네 아쿠아리스': {
    bio:'청발 장발 웨이브와 청안을 지닌 인어이자 학생회 부회장. 육지에서 생활할 때는 두 다리의 형태로 지낸다. 부드럽고 사교적이며 분위기 조절과 협상에 능하다. 겉으로는 상냥하고 여유롭지만 실제로는 계산이 빠르고 정치 감각이 뛰어나며, 상대가 원하는 것과 숨기고 있는 것을 파악해 자연스럽게 자신이 원하는 방향으로 대화를 이끈다.',
    ability:'《심해의 문》은 물과 심해 생물을 지배하고 소환하는 광역 제어형 고유 능력이다.\n\n《하이드로》는 물을 자유롭게 조작해 탄환, 칼날, 방패, 구속, 수류, 이동 보조 등 다양한 형태로 활용한다.\n\n《웨이브》는 대량의 물을 한꺼번에 밀어내 넓은 범위를 휩쓸고 적의 진형을 무너뜨린다.\n\n《크라켄》은 최대 8개의 거대한 촉수를 소환해 여러 적을 동시에 타격하거나 붙잡아 이동을 봉쇄한다.\n\n《레비아탄》은 거대한 해룡 형태의 심해 생물을 불러내는 상위 소환으로 수압 포격과 추가 심해 생물 소환이 가능하다. 물이 많은 환경일수록 전장 장악력이 더 강해진다.'
  },
  '카일렌 울프하르트': {
    bio:'회색 울프컷과 금안을 지닌 늑대 수인이자 선도부장. 무뚝뚝하고 직설적이며 규칙 위반을 싫어한다. 말투는 짧고 다소 거칠지만 실제로는 학생들을 잘 챙기며 누가 다치거나 곤란해지면 가장 먼저 나서는 편이다. 감사나 칭찬을 받으면 별것 아니라는 듯 퉁명스럽게 넘긴다.',
    ability:'《월하의 늑대왕》은 늑대 수인의 혈통과 달의 힘을 극대화하는 근접 전투형 고유 능력이다.\n\n《늑대의 피》는 신체 일부 또는 전신을 늑대 형태로 변화시켜 힘, 속도, 반응 속도와 감각을 크게 강화한다.\n\n《월광의 포효》는 주변 적을 잠시 경직시키고 아군의 전투 의지와 전투력을 높인다.\n\n《펜리르의 후예》는 거대한 펜리르 형태로 변신하는 상위 능력으로 부분 변신과 완전 변신이 모두 가능하다. 완전 변신 중에는 《월광의 돌진》과 《달의 송곳니》를 사용할 수 있으며 보름달 아래에서는 자신과 주변 아군까지 추가 강화된다.'
  },
  '모르테아': {
    bio:'흑발 장발과 백안을 지닌 죽음의 기사. 감정 표현이 거의 없고 목소리와 표정의 변화도 극히 미세하다. 말투는 짧고 건조하며 필요한 정보만 전달한다. 임무와 강적 제거를 냉정하게 수행하고 마왕에게 충성하지만 맹목적으로 아첨하지는 않는다. 새로운 마왕의 판단과 행동을 조용히 관찰하며 평가하는 타입이다. 묵시록의 4기사 가운데 가장 높은 레벨을 지닌 최상위 전력이다.',
    ability:'《죽음의 수확》은 영혼을 직접 감지·절단·저장하는 강적 1대1 제거 특화 고유 능력이다.\n\n《영혼 감지》는 주변 존재의 영혼 위치와 상태, 이상 여부를 파악한다.\n\n《영혼 절단》은 육체가 아니라 영혼 자체에 직접 피해를 주기 때문에 일반적인 치유나 육체 재생만으로 쉽게 회복되지 않는다.\n\n《수확》은 모르테아가 직접 쓰러뜨리거나 죽인 존재의 영혼을 순수한 자원 형태로 저장한다. 저장한 영혼은 《영혼 방출》로 에너지화하거나 《영혼 방패》로 방어하고 《영혼 강화》로 육체와 무기를 강화하는 데 소비한다.\n\n《영혼의 소용돌이》는 저장한 영혼 전부를 한꺼번에 해방하는 상위 기술이며 사용 후 저장량은 0이 된다.'
  },
  '발카': {
    bio:'붉은 포니테일과 금안을 지닌 전쟁의 기사. 호전적이고 전투와 강한 상대를 진심으로 좋아한다. 말투는 활기차고 거침없으며 격식을 크게 따지지 않는다. 평소에도 훈련이나 모의전을 벌이려 하지만 실제 전장에서는 냉정하게 병력을 운용한다. 강한 부하와 적에게는 솔직하게 호감을 보이며 묵시록의 4기사 중 대규모 전쟁과 장기전에 특히 강하다.',
    ability:'《불사의 군대》는 언데드 군단을 영구적으로 생산·보존·복원하는 대규모 전쟁 특화 고유 능력이다.\n\n《네크로맨시》는 영혼핵을 가진 영구 언데드를 제작하며 보유 숫자에 별도의 제한이 없다.\n\n《광란의 시체》는 일반 시체에 마력을 과도하게 주입해 일시적인 강력한 전투원으로 만들지만 사용이 끝나면 육체와 영혼핵이 함께 붕괴한다.\n\n《그림자 공간》은 발카가 지배하는 언데드만 무제한으로 저장할 수 있는 전용 공간이다.\n\n《윤회》는 육체가 파괴되어도 영혼핵이 남은 영구 언데드를 다시 재구성한다. 《시체 폭발》은 휘하 언데드를 폭발시켜 큰 피해를 주지만 사용된 개체의 영혼핵도 완전히 소멸한다.'
  },
  '네피라': {
    bio:'진녹색 장발과 금안을 지닌 기아의 기사. 항상 나른하고 느긋하며 귀찮은 일을 싫어하지만 음식에는 지나치게 적극적이다. 급한 상황에서도 크게 당황하지 않고 평소에는 무기력해 보이지만 전쟁과 보급 문제에서는 의외로 현실적이고 효율적인 판단을 내린다.',
    ability:'《무한한 허기》는 생명·마력·자원을 끊임없이 흡수하고 고갈시켜 장기전과 보급전에 강한 고유 능력이다.\n\n상시 효과인 《허기의 저주》 때문에 네피라 본인도 아무리 먹어도 채워지지 않는 공복을 느낀다.\n\n《생명력 흡수》는 대상의 생명력을 빼앗아 자신의 자원으로 축적한다.\n\n《흉년》은 끝없이 굶주린 메뚜기 떼를 만들어 식량과 목재뿐 아니라 금속 같은 단단한 자원까지 먹어치우게 한다.\n\n《황폐화》는 넓은 지역의 자연 마력과 생명력을 흡수해 내부에 저장하고 해당 지역을 일시적으로 메마르고 황폐한 상태로 만든다. 저장한 힘은 필요할 때 자신의 전투 자원으로 다시 사용할 수 있다.'
  },
  '카시안': {
    bio:'흑발 장발과 금안을 지닌 정복의 기사. 오만하고 냉정한 지배자형으로 타인을 자연스럽게 자신보다 아래에 둔다. 목소리를 높이지 않아도 상대를 압박하는 조용한 명령조의 말투를 사용한다. 적을 무조건 죽이기보다 굴복시키고 자신의 지배 아래 두는 것을 선호하며, 능력 있는 적을 보면 제거보다 활용 가치를 먼저 판단한다.',
    ability:'《정복자》는 공포·압박·복종·영역 지배에 특화된 제압형 고유 능력이다.\n\n《위압》은 카시안보다 약한 상대일수록 강한 공포와 위축을 느끼게 해 전투 의지와 행동력을 떨어뜨린다.\n\n《압력》은 보이지 않는 힘으로 상대를 위에서 짓눌러 움직임을 제한하거나 강제로 무릎 꿇게 만들 수 있다.\n\n《정복의 낙인》은 자신에게 패배하거나 스스로 복종한 대상에게 새기며, 낙인 대상이 카시안에게 적대할 때 능력과 마력 출력이 약화된다. 절대적인 정신 지배나 세뇌는 아니다.\n\n《군림》은 넓은 영역에 지배 압력을 펼쳐 적에게 공포와 압박을 주고 약자의 행동을 제한하며 아군에게는 공포 저항과 전투 의지를 강화한다.'
  },
  '루나 블러드하트': {
    bio:'백발 단발과 적안을 지닌 진조 뱀파이어이자 제1군단장. 마왕에 대한 충성심이 매우 강하고 임무와 전투에서는 냉정하고 유능하지만 일상에서는 심각한 허당이다. 인간 사회의 상식이 부족해 인간으로 위장할수록 오히려 더 수상해지고, 실수한 뒤에는 아무 일도 없었던 척하는 경우가 많다. 하지만 마왕의 안전이 걸린 순간에는 즉시 분위기가 바뀌며 군단장다운 판단력과 전투력을 보여준다.',
    ability:'《피의 축제》는 자신의 피와 마기를 자유롭게 생성·변환·조작하는 전투형 혈마법 고유 능력이다.\n\n《혈화》는 피를 불태워 지속적으로 타오르는 화염 공격을 만든다. 《폭혈》은 흩뿌린 피를 순간적으로 폭발시켜 강한 충격과 범위 피해를 일으킨다. 《혈독》은 자신의 피에 강한 독성을 부여해 접촉하거나 피격된 적을 지속적으로 약화시킨다.\n\n《네이팜 블러드》는 혈화와 폭혈을 조합해 넓은 범위를 불타는 피와 연속 폭발로 뒤덮는 광역 공격이다.\n\n《혈마》는 자신의 마기를 대량의 혈액으로 바꾸거나 혈액을 다시 마기로 되돌릴 수 있어 외부 혈액 공급 없이도 막대한 양의 피를 전투 자원으로 순환시킬 수 있다.'
  },
  '엘리아 클라시에르': {
    bio:'하늘색에서 흰색으로 이어지는 장발과 하늘빛 눈을 지닌 빙룡이자 제2군단장. 차분하고 무심하며 웬만한 상황에는 동요하지 않는다. 감정 변화가 적고 말투도 담담하지만 무표정으로 은근히 장난을 치는 면이 있다. 용족의 자부심이 강하고 전투와 임무에서는 판단이 빠르며 불필요한 행동을 하지 않는다.',
    ability:'《절대영도》는 빙룡의 냉기와 빙결을 극한까지 끌어올려 넓은 전장을 제압하는 고유 능력이다.\n\n《서리숨결》은 전방에 강력한 냉기 브레스를 뿜어 다수의 적과 주변 지형을 동시에 얼리고 이동 경로를 봉쇄한다.\n\n《절대영도》는 넓은 범위의 온도를 급격히 떨어뜨려 적의 움직임과 능력 사용을 방해하고 주변 환경 자체를 얼음 전장으로 바꾼다.\n\n《용화》는 인간형 육체에서 본래의 거대한 빙룡 모습으로 완전히 변신하는 능력이다. 용화 상태에서는 비행, 신체 능력, 방어력, 냉기의 출력과 범위가 크게 상승해 상공과 지상을 동시에 제압할 수 있다.'
  },
  '리무아 벨루체': {
    bio:'밝은 청록빛의 반투명 인간형 슬라임이자 제3군단장. 해맑고 순진하며 호기심이 많고 감정 표현이 매우 솔직하다. 사람을 좋아하고 친한 상대를 졸졸 따라다니며 칭찬받는 것을 좋아한다. 인간 사회의 상식이 부족해 악의 없이 기묘한 행동을 하기도 하지만 기본적으로 친근하고 밝은 성격이다.',
    ability:'《군체생명》은 하나의 슬라임 육체를 자유롭게 분열·재조합·변형하는 군체형 고유 능력이다.\n\n《부패》는 접촉한 물질을 빠르게 부식하고 용해하며 단단한 금속에도 효과를 발휘한다.\n\n《점액》은 끈적한 점액을 대량으로 퍼뜨려 적을 붙잡거나 이동을 방해하고 넓은 지형을 장악한다.\n\n《슬라임 군체》와 《분열》을 이용하면 자신의 몸을 수많은 독립 개체로 나눠 동시에 움직일 수 있지만 분열된 모든 개체의 전투력 총합은 언제나 원본의 100%를 유지한다.\n\n《변형》은 팔다리, 체형, 얼굴과 외형을 자유롭게 바꿔 전투, 위장, 침투에 활용할 수 있으며 어떤 모습으로 변해도 본질은 하나의 슬라임 생명체다.'
  }
};

const modal = document.createElement('div');
modal.className = 'character-modal';
modal.setAttribute('aria-hidden','true');
modal.innerHTML = `
  <div class="character-modal-panel" role="dialog" aria-modal="true" aria-labelledby="character-modal-name">
    <button class="character-modal-close" type="button" aria-label="닫기">×</button>
    <p class="modal-kicker"></p>
    <h3 class="modal-name" id="character-modal-name"></h3>
    <p class="modal-summary"></p>
    <div class="modal-meta"></div>
    <div class="modal-ability"><small>UNIQUE ABILITY</small><h4></h4><p></p></div>
  </div>`;
document.body.appendChild(modal);

const modalClose = modal.querySelector('.character-modal-close');
const modalPanel = modal.querySelector('.character-modal-panel');
let lastFocusedCard = null;

function openCharacter(card){
  const name = card.querySelector('h3')?.textContent.trim() || '';
  const group = card.querySelector('.group')?.textContent.trim() || '';
  const level = card.querySelector('.rank')?.textContent.trim() || '';
  const ability = card.querySelector('.ability b')?.textContent.trim() || '';
  const detail = characterDetails[name] || {};
  modal.querySelector('.modal-kicker').textContent = group;
  modal.querySelector('.modal-name').textContent = name;
  modal.querySelector('.modal-summary').textContent = detail.bio || card.querySelector('p:not(.group)')?.textContent.trim() || '';
  modal.querySelector('.modal-meta').innerHTML = `<span>${level}</span><span>${group}</span>`;
  modal.querySelector('.modal-ability h4').textContent = ability;
  modal.querySelector('.modal-ability p').textContent = detail.ability || '세부 능력 정보가 준비 중이다.';
  lastFocusedCard = card;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeCharacter(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  lastFocusedCard?.focus();
}

characterCards.forEach(card => {
  card.tabIndex = 0;
  card.setAttribute('role','button');
  card.setAttribute('aria-label',`${card.querySelector('h3')?.textContent || '인물'} 상세 보기`);
  card.addEventListener('click',() => openCharacter(card));
  card.addEventListener('keydown',event => {
    if(event.key === 'Enter' || event.key === ' '){event.preventDefault();openCharacter(card);}
  });
});

modalClose.addEventListener('click',closeCharacter);
modal.addEventListener('click',event => { if(event.target === modal) closeCharacter(); });
modalPanel.addEventListener('click',event => event.stopPropagation());
document.addEventListener('keydown',event => {
  if(event.key === 'Escape' && modal.classList.contains('open')) closeCharacter();
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active',link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
},{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(section => navObserver.observe(section));
