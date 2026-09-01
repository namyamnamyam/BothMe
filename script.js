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
  .character-modal{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;padding:28px;background:rgba(4,4,7,.84);backdrop-filter:blur(12px)}
  .character-modal.open{display:flex}
  .character-modal-panel{position:relative;width:min(850px,100%);max-height:min(86vh,900px);overflow:auto;border:1px solid rgba(216,177,95,.28);background:linear-gradient(145deg,#17171d,#0e0e12);box-shadow:0 30px 90px rgba(0,0,0,.55);padding:46px}
  .character-modal-close{position:absolute;top:16px;right:18px;width:40px;height:40px;border:1px solid var(--line);background:#111116;color:#ddd;cursor:pointer;font-size:1.25rem}
  .character-modal-close:hover{border-color:var(--gold);color:var(--gold-soft)}
  .modal-kicker{margin:0 52px 8px 0;color:var(--gold);font-size:.7rem;letter-spacing:.14em;font-weight:800}
  .modal-name{margin:0;font-size:clamp(2rem,5vw,3.4rem);line-height:1.12;letter-spacing:-.045em}
  .modal-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}
  .modal-meta span{padding:7px 10px;border:1px solid var(--line);font-size:.75rem;color:#ccc6bc}
  .modal-section{margin-top:30px;padding-top:24px;border-top:1px solid var(--line)}
  .modal-section small,.modal-ability small{display:block;color:#7f7a80;letter-spacing:.12em;margin-bottom:8px;font-size:.68rem}
  .modal-description{margin:0;color:#c5c0b7;font-size:.96rem;line-height:1.95;white-space:pre-line}
  .modal-ability{margin-top:30px;padding:26px;border-left:3px solid var(--gold);background:rgba(216,177,95,.055)}
  .modal-ability h4{margin:0 0 14px;font-size:1.45rem;color:#f1e6c6}
  .modal-ability p{margin:0;color:#bdb8af;line-height:1.95;white-space:pre-line}
  body.modal-open{overflow:hidden}
  @media (max-width:1100px){.hero h1{font-size:clamp(3rem,6.6vw,5.8rem)}}
  @media (max-width:720px){
    .hero-content{padding-inline:8px}
    .hero h1{font-size:clamp(2.75rem,13vw,4.6rem);line-height:1.1;padding-inline:.04em}
    .character-modal{padding:12px}
    .character-modal-panel{padding:34px 22px 28px;max-height:90vh}
  }
`;
document.head.appendChild(runtimeStyle);

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

const characterDetails = {
  '세라피나 루멘하임': '백금발 장발과 금안을 지닌 성녀. 기본적으로 자애롭고 다정하며 처음 만나는 사람도 선의로 대한다. 누군가 다치거나 곤란에 처하면 자신의 일보다 먼저 챙기는 편이고, 말투 역시 부드럽고 정중하다. 다만 성녀로서 보호받으며 자란 탓에 세상 물정에는 조금 어두워 평범한 상식에서 엉뚱한 모습을 보이기도 한다. 온화한 성격과 달리 악의가 명확한 상대나 타인을 해치는 행동 앞에서는 쉽게 물러서지 않으며, 필요할 때는 단호하게 선을 긋는다. 원작에서는 카일의 핵심 동료이자 용사 파티의 회복과 지원을 책임질 예정이었다.',
  '엘레나 프로스트하임': '백발 포니테일과 청안을 지닌 검성. 승부욕이 강하고 무엇이든 재능보다 반복 훈련과 분석으로 완성하려는 노력파다. 평소에는 차분하고 냉정하며 말수가 적고, 쓸데없는 대화를 길게 이어가는 것을 좋아하지 않는다. 강한 상대를 만나면 겉으로 흥분하기보다 조용히 움직임과 습관을 관찰하며 관심을 보인다. 패배했을 때도 변명하거나 감정적으로 굴기보다 패인을 정리하고 다시 검을 잡는다. 냉기가 능력에 포함되어 있지만 본질은 어디까지나 검술이며, 마법 검사처럼 냉기 마법을 난사하지 않는다. 원작에서는 전위의 핵심이자 가장 믿을 수 있는 정면 전투원이었다.',
  '세레나 아스트라': '백발 장발과 자안을 지녔고 거대한 보라색 마녀모자를 쓰는 대마법사. 언제나 나른하고 졸려 보이며 말과 행동도 느긋하다. 장소를 가리지 않고 잘 자고, 직접 몸을 움직여야 하는 일은 대체로 귀찮아한다. 하지만 위급한 순간이나 전투가 시작되면 흐릿하던 분위기가 사라지고 즉시 상황을 계산하는 천재형 마법사다. 친해진 상대에게는 업어 달라고 태연하게 부탁하거나 거절당하면 자신의 몸을 가볍게 만든 뒤 몰래 등에 올라타는 식의 뻔뻔한 장난도 친다. 원작에서는 순간이동, 방어, 단일 고화력과 광역 포격을 모두 담당하는 용사 파티의 핵심 마법 화력이었다.',
  '엘리시아 실바렌': '금발 장발과 녹안, 뚜렷한 엘프 귀를 지닌 하이엘프 궁수. 자신의 실력과 종족에 대한 자부심이 매우 강하며 초면의 인간을 은근히 아래로 보는 태도를 보일 때도 있다. 말투는 품위 있고 자신감이 넘치며, 상대가 부족하다고 판단하면 돌려 말하지 않고 냉정하게 평가한다. 대신 혈통이나 지위보다 실제 실력과 노력을 중요하게 보기 때문에 자신이 인정할 만한 모습을 보여준 사람에게는 평가를 확실히 바꾼다. 한번 동료로 인정한 상대에게는 의외로 책임감이 강하다. 원작에서는 정령과 활을 결합해 초장거리 저격, 정찰, 지형 장악을 맡는 후방 핵심 전투원이었다.',
  '레비아 나이트폴': '흑발 단발과 흑안을 지닌 암살자. 능글맞고 장난기가 많으며 처음 만난 사람에게도 자연스럽게 말을 걸어 상대의 반응을 떠보는 데 능하다. 눈치가 빠르고 거짓말과 연기에 익숙해 자신의 진짜 의도나 과거를 쉽게 드러내지 않는다. 친해지는 과정 자체는 빠르지만 관계가 깊어질수록 진심을 장난으로 넘기거나 먼저 한발 물러나는 버릇이 있다. 사람의 표정과 감정은 잘 읽으면서도 자신의 감정을 솔직하게 내놓는 일에는 서툴다. 원작에서는 그림자와 귀신을 이용한 잠입, 암살, 정찰, 정보 수집과 혼전 교란을 담당하며 정면전보다 보이지 않는 곳에서 전장을 흔드는 역할이었다.',
  '아우렐리아 폰 아르카디우스': '긴 금발과 적안을 지닌 발테리아 제국의 제1황녀이자 학생회장. 황족다운 품위와 냉정함을 갖췄지만 평소 학생들에게는 비교적 자애롭고 현실적으로 행동한다. 특히 재능 있고 유능한 사람을 발견하면 신분과 출신을 가리지 않고 자신의 시야 안에 두려 할 정도로 인재 욕심이 강하다. 말투는 언제나 차분하고 단정하며 감정을 쉽게 흐트러뜨리지 않는다. 다만 명백한 규칙 위반이나 큰 잘못 앞에서는 개인적 호감과 관계없이 냉정하게 처분한다. 학생회장이라는 위치뿐 아니라 황녀로서 사람과 조직을 다루는 데 익숙하며, 원작에서는 아카데미 내부의 최고 수준 학생 중 한 명이자 인간 측의 중요한 정치적 연결점이었다.',
  '세레네 아쿠아리스': '청발 장발 웨이브와 청안을 지닌 인어이자 학생회 부회장. 육지에서 생활할 때는 자연스럽게 두 다리 형태를 유지한다. 부드럽고 사교적인 태도로 누구와도 쉽게 대화를 이어가며 분위기를 조절하고 협상하는 데 매우 능하다. 겉으로는 항상 상냥하고 여유롭지만 실제로는 계산이 빠르고 정치 감각도 뛰어나 상대가 원하는 것과 숨기려는 것을 대화 중 자연스럽게 파악한다. 강압적으로 몰아붙이기보다 상대가 스스로 선택했다고 느끼게 만들며 자신이 원하는 방향으로 상황을 이끄는 타입이다. 원작에서는 학생회 내부의 실무와 조정 역할을 담당하는 동시에 물과 심해 생물을 이용한 대규모 전투에서도 강한 존재였다.',
  '카일렌 울프하르트': '회색 울프컷과 금안을 지닌 늑대 수인이자 학생회 선도부장. 무뚝뚝하고 직설적이며 규칙 위반을 매우 싫어한다. 말투가 짧고 다소 거칠어 처음에는 까다롭게 보이지만, 실제로는 주변 학생들을 누구보다 잘 살피고 누군가 다치거나 곤란한 상황에 처하면 가장 먼저 움직인다. 감사나 칭찬을 받으면 별것 아니라는 듯 퉁명스럽게 넘겨 버리는 편이다. 책임감과 행동력이 강해 말보다 직접 움직이는 성격이며, 선도부장답게 아카데미 내부의 문제 상황에 자주 개입한다. 원작에서는 강력한 근접 전투력과 추적 능력을 갖춘 상위권 학생으로 활약할 예정이었다.',
  '모르테아': '흑발 장발과 백안을 지닌 묵시록의 4기사 중 죽음의 기사. 감정 표현이 거의 없고 목소리와 표정의 변화도 매우 미세하다. 필요한 정보만 짧고 건조하게 전달하며 쓸데없는 말이나 과장된 충성 표현을 하지 않는다. 마왕에게 충성하지만 맹목적으로 아첨하기보다 새로운 마왕의 판단과 행동을 조용히 관찰하며 그 자격을 확인한다. 임무에서는 감정에 휘둘리지 않고 가장 위험한 적이나 반드시 제거해야 하는 강적을 맡는 처형자에 가깝다. 4기사 중에서도 특히 개인 전투와 강적 1대1 제거에 특화된 최상위 전력이며, 제1군단장 루나 블러드하트의 직속 상관이다.',
  '발카': '붉은 포니테일과 금안을 지닌 묵시록의 4기사 중 전쟁의 기사. 호전적이며 싸움과 강한 상대를 진심으로 좋아하고, 평소에도 훈련이나 모의전을 벌일 기회를 찾는다. 말투는 활기차고 거침없으며 격식을 크게 따지지 않는다. 그렇다고 전투밖에 모르는 단순한 광전사는 아니다. 실제 전쟁이 시작되면 개인적인 흥분을 억누르고 병력 배치, 소모, 장기전과 전선 운영을 냉정하게 판단하는 지휘관으로 변한다. 강한 부하와 적에게는 솔직하게 호감을 보이며 실력을 인정한다. 대규모 언데드 군단을 다루기 때문에 4기사 가운데 전면전과 장기전에서 가장 압도적인 영향력을 가진다.',
  '네피라': '진녹색 장발과 금안을 지닌 묵시록의 4기사 중 기아의 기사. 언제나 나른하고 느긋하며 귀찮은 일을 최대한 피하려 하지만 음식이 걸리면 태도가 눈에 띄게 적극적으로 변한다. 급한 상황에서도 말투와 표정에 큰 변화가 없고 힘이 빠져 있어 얼핏 무기력해 보인다. 그러나 전쟁의 보급, 자원, 식량, 장기적인 소모를 계산하는 상황에서는 매우 현실적이고 효율적인 판단을 내린다. 단순히 적을 쓰러뜨리는 것보다 적의 자원과 생명력을 서서히 고갈시켜 전쟁 자체를 지속할 수 없게 만드는 데 특화된 존재다. 제3군단장 리무아 벨루체가 그녀의 지휘 계통에 속한다.',
  '카시안': '흑발 장발과 금안을 지닌 묵시록의 4기사 중 정복의 기사. 오만하고 냉정한 지배자형 인물로 타인을 자연스럽게 자신보다 아래에 둔다. 목소리를 높이거나 감정을 폭발시키지 않아도 말투 자체가 명령조이며 상대를 압박한다. 적을 무조건 죽이고 파괴하는 것보다 굴복시키고 자신의 지배 아래 편입하는 것을 선호한다. 능력 있는 적을 만났을 때도 먼저 제거할 대상으로 보기보다 활용 가치가 있는지를 판단한다. 공포와 압박, 영역 지배를 통해 싸움이 시작되기도 전에 상대의 의지를 꺾는 데 능하다. 다른 4기사와 달리 전담 군단장은 두지 않으며 자신만의 방식으로 세력을 통제한다.',
  '루나 블러드하트': '백발 단발과 적안을 지닌 진조 뱀파이어이자 제1군단장. 마왕에 대한 충성심이 매우 강하고 임무와 전투에서는 냉정하고 유능한 지휘관이지만, 일상에서는 믿기 어려울 정도로 허당이다. 인간 사회의 평범한 상식이 부족해 자연스럽게 위장하려 할수록 오히려 더 수상한 행동을 하고, 실수한 뒤에는 아무 일도 없었다는 듯 태연한 척한다. 그러나 마왕의 안전이나 전투가 걸리는 순간에는 그런 허술함이 완전히 사라지고 즉시 본래의 판단력과 전투 감각을 되찾는다. 새 마왕이 인간 아카데미 학생이라는 사실을 알고 있는 극소수 간부 중 하나이며, 인간으로 위장해 가까운 거리에서 마왕을 보조할 수 있는 인물이다.',
  '엘리아 클라시에르': '하늘색에서 흰색으로 이어지는 긴 머리와 하늘빛 눈을 지닌 빙룡이자 제2군단장. 차분하고 무심하며 웬만한 상황에서는 좀처럼 동요하지 않는다. 말투도 담담하고 감정 변화가 적지만, 무표정한 얼굴로 은근한 장난을 치고 상대의 반응을 조용히 구경하는 면이 있다. 용족으로서의 자부심이 강하며 자신의 힘과 혈통에 대한 확신도 높다. 전투와 임무에서는 판단이 빠르고 불필요한 행동을 거의 하지 않으며, 본래의 거대한 빙룡 형태로 변신해 공중과 지상을 동시에 장악한다. 제2군단장으로서 전면전에서 광범위한 냉기와 빙결을 이용한 지형 통제와 공중 지원을 담당한다.',
  '리무아 벨루체': '밝은 청록빛의 반투명한 인간형 몸을 가진 슬라임이자 제3군단장. 인간처럼 또렷한 얼굴과 실루엣을 만들 수 있지만 본질적으로는 하나의 거대한 슬라임 생명체다. 해맑고 순진하며 호기심이 많아 궁금한 것이 생기면 바로 묻고 감정도 숨기지 않는다. 사람을 좋아하고 친해진 상대를 졸졸 따라다니며 칭찬받는 것을 매우 좋아한다. 인간 사회의 상식이 부족해 악의 없이 기묘하거나 당황스러운 행동을 할 때도 있다. 전투에서는 귀여운 평소 모습과 달리 몸을 군체로 분열하고, 넓은 지역을 점액으로 덮거나 물질을 부식시키는 방식으로 전장을 통째로 장악하는 제3군단의 핵심 전력이다.'
};

const abilityDetails = {
  '세라피나 루멘하임': '《여명》은 성녀의 권능과 빛 마법을 통합한 지원·회복·방어 특화 고유 능력이다. 《빛의 축복》은 지정한 아군의 신체 능력과 마력 운용 효율, 상태 이상 및 정신계 효과에 대한 저항력을 전반적으로 끌어올리며 다수에게 동시에 적용할 수도 있다. 《세인트 리커버리》는 단순한 외상 치료를 넘어 누적 피로, 마력 소모로 인한 탈진, 정신적 피로까지 완화해 전투 지속력을 높인다. 《태초의 빛》은 고밀도의 빛을 자유롭게 형성하는 상위 기능으로 광선, 폭발, 방패, 장벽, 범위 방어 등 공격과 방어 양쪽에 응용할 수 있다. 세라피나는 상황에 따라 후방 지원과 직접 전투를 자연스럽게 오갈 수 있다.',
  '엘레나 프로스트하임': '《영원의 겨울》은 마법 검사가 아니라 순수 검술을 중심으로 하며 냉기는 검술을 보조하는 수준으로만 사용한다. 《극야》는 검을 휘두른 뒤 짧은 지연을 두고 동일한 궤적을 따라 백색 검광이 한 번 더 베어내는 주력 참격으로, 첫 검격을 피하거나 막은 상대의 회피 타이밍까지 흔든다. 《빙검》은 참격에 약한 빙결과 회복 방해를 부여해 상처 회복과 움직임을 둔화시키며, 《설원》은 주변에 옅은 냉기를 퍼뜨려 발놀림과 균형을 방해하는 보조 영역이다. 강제 동결이나 대규모 얼음 생성보다 엘레나 자신의 검술 완성도가 모든 전투의 중심이다.',
  '세레나 아스트라': '《성야의 꿈》은 별과 우주 현상을 모티브로 한 초고위 마법 계열 고유 능력이다. 《초신성》은 별빛과 마력을 고밀도로 압축한 뒤 폭발시키는 고화력 공격으로 단일 표적 저격과 범위 폭발 양쪽에 응용할 수 있다. 《광년》은 자신이나 지정 대상을 순간적으로 다른 위치로 이동시키는 공간 이동 능력으로 회피, 구조, 진입에 활용된다. 《칠성》은 여러 겹의 별빛 장벽을 펼쳐 공격을 막고, 《성해 포화》는 수많은 별빛 탄환과 광구를 넓은 범위에 쏟아붓는 대규모 포격이다. 공격, 기동, 방어, 광역 화력을 한 고유 능력 안에서 모두 수행하는 높은 범용성이 가장 큰 특징이다.',
  '엘리시아 실바렌': '《세계수의 아이》는 활과 정령, 자연 환경을 결합해 장거리 사격과 지형 장악에 특화된 고유 능력이다. 《사대정령》은 바람·대지·물·불 정령의 힘을 빌려 화살의 속도와 궤도를 바꾸거나 속성을 부여하고, 방어와 지형 변화에도 응용한다. 《정령시》는 정령과 시야를 공유해 정찰, 감시, 사각 탐지, 초장거리 저격을 가능하게 한다. 《세계수의 숲》은 주변을 정령 친화적인 숲 형태의 영역으로 변화시켜 정령의 힘을 높이고 적의 이동과 시야를 방해한다. 조건이 갖춰지면 강력한 상위 정령이나 정령왕의 힘까지 끌어낼 수 있으며, 엘리시아의 전투는 어디까지나 활을 중심으로 전개된다.',
  '레비아 나이트폴': '《백귀야행》은 귀신과 그림자를 이용한 암살·잠입·정찰·정보전 특화 고유 능력이다. 《그림자 이동》은 서로 이어진 그림자 사이를 빠르게 오가며 추적 회피, 침투, 기습 위치 선점에 사용한다. 《귀영》은 자신의 존재감과 기척, 발소리와 흔적을 억제해 탐지를 어렵게 만든다. 《신출귀몰》은 귀신과 연계해 서로 다른 사각과 그림자에서 연속적으로 나타나 공격하는 기습 능력이다. 《개문》은 자신이 거느리는 귀신들을 한꺼번에 풀어 여러 방향에서 총공격을 가한다. 단독 암살뿐 아니라 적진 침투, 정보 수집, 혼전 교란, 다수전까지 대응할 수 있지만 정면 화력보다 위치와 기습을 활용할 때 진가를 발휘한다.',
  '아우렐리아 폰 아르카디우스': '《왕좌의 무게》는 황실의 권위와 중력을 결합한 통솔·제압형 고유 능력이다. 《황명》은 대상에게 강제성이 있는 명령을 내리며 자신보다 약한 상대일수록 효과가 강하다. 강자는 저항할 수 있지만 그 과정에서 부담이 발생한다. 《친위대》는 지정한 아군에게 작용하는 중력을 경감하고 신체 능력과 전투 효율을 강화한다. 《그라비오르》는 중력을 증가·감소·반전시키며 공격, 구속, 이동 보조에 자유롭게 응용한다. 《레갈리아》는 광범위 중력장을 펼쳐 적을 짓누르거나 띄우고 아군을 강화하며 약한 적에게 황명의 압박까지 더한다. 대신 레갈리아 사용 후 약 3시간 동안 《왕좌의 무게》 전체를 사용할 수 없다.',
  '세레네 아쿠아리스': '《심해의 문》은 물과 심해 생물을 지배하고 소환하는 광역 제어형 고유 능력이다. 《하이드로》는 물을 자유롭게 조작해 탄환, 칼날, 방패, 구속, 수류, 이동 보조 등 다양한 방식으로 활용한다. 《웨이브》는 대량의 물을 한꺼번에 밀어내 넓은 범위를 휩쓸고 적의 진형을 무너뜨리는 파도 공격이다. 《크라켄》은 최대 8개의 거대한 촉수를 소환해 여러 적을 동시에 타격하거나 붙잡고 이동을 봉쇄한다. 《레비아탄》은 거대한 해룡 형태의 심해 생물을 불러내는 상위 소환으로 강력한 수압 포격을 사용하며 추가적인 심해 생물까지 불러낼 수 있다. 물이 많은 환경에서는 활용 범위와 전장 장악력이 더욱 높아진다.',
  '카일렌 울프하르트': '《월하의 늑대왕》은 늑대 수인의 혈통과 달의 힘을 극대화하는 근접 전투형 고유 능력이다. 《늑대의 피》는 신체 일부 또는 전신을 늑대 형태로 변화시켜 힘, 속도, 반응 속도와 감각을 크게 강화한다. 《월광의 포효》는 주변 적을 잠시 경직시키고 아군의 전투 의지와 전투력을 높인다. 《펜리르의 후예》는 거대한 펜리르 형태로 변신하는 상위 능력이며 부분 변신과 완전 변신이 모두 가능하다. 완전 변신 중에는 《월광의 돌진》과 《달의 송곳니》를 사용할 수 있다. 보름달 아래에서는 자신과 주변 아군이 추가로 강화되며 포효를 통해 다수의 늑대 무리를 불러 전투에 참여시킬 수도 있다.',
  '모르테아': '《죽음의 수확》은 영혼을 직접 감지·절단·저장하는 강적 1대1 제거 특화 고유 능력이다. 《영혼 감지》는 주변 존재의 영혼 위치와 상태, 이상 여부를 파악한다. 《영혼 절단》은 육체가 아닌 영혼 자체에 직접 피해를 주기 때문에 일반적인 치유나 육체 재생만으로는 쉽게 회복되지 않는다. 《수확》은 모르테아가 직접 쓰러뜨리거나 죽인 존재의 영혼을 순수한 자원 형태로 저장하며 부활이나 언데드 생성과는 무관하다. 저장한 영혼은 《영혼 방출》로 에너지화하거나 《영혼 방패》로 방어하고 《영혼 강화》로 육체와 무기를 강화하는 데 소비한다. 저장 영혼 전부를 풀어 《영혼의 소용돌이》를 사용하면 보유량은 완전히 0이 된다.',
  '발카': '《불사의 군대》는 언데드 군단을 영구적으로 생산·보존·복원하며 대규모 전쟁과 장기전에 특화된 고유 능력이다. 《네크로맨시》는 영혼핵을 가진 영구 언데드를 제작하며 동시에 보유할 수 있는 숫자에 별도의 제한이 없다. 《광란의 시체》는 일반 시체에 마력을 과도하게 주입해 일시적으로 강력한 전투원으로 만들지만 사용이 끝나면 육체와 영혼핵이 함께 붕괴한다. 《그림자 공간》은 발카가 지배하는 언데드만 무제한으로 저장할 수 있는 전용 공간이다. 《윤회》는 육체가 파괴되어도 영혼핵이 남은 영구 언데드를 다시 재구성한다. 《시체 폭발》은 휘하 언데드를 폭발시켜 큰 피해를 주지만 사용된 개체의 영혼핵까지 완전히 소멸한다.',
  '네피라': '《무한한 허기》는 생명·마력·자원을 끊임없이 흡수하고 고갈시켜 장기전과 보급전에 강한 고유 능력이다. 상시 효과인 《허기의 저주》 때문에 네피라 본인도 아무리 먹어도 채워지지 않는 끝없는 공복을 느낀다. 《생명력 흡수》는 대상이 가진 생명력을 빼앗아 자신의 자원으로 축적한다. 《흉년》은 끝없이 굶주린 메뚜기 떼를 만들어 식량과 목재뿐 아니라 금속과 같은 단단한 자원까지 먹어치우게 한다. 《황폐화》는 넓은 지역의 자연 마력과 생명력을 흡수해 내부에 저장하고 해당 지역을 일시적으로 메마르고 황폐한 상태로 만든다. 흡수해 저장한 힘은 필요할 때 다시 방출해 자신의 전투 자원으로 활용할 수 있다.',
  '카시안': '《정복자》는 공포·압박·복종·영역 지배에 특화된 제압형 고유 능력이다. 《위압》은 카시안보다 약한 상대일수록 강한 공포와 위축을 느끼게 해 전투 의지와 행동력을 떨어뜨린다. 《압력》은 보이지 않는 힘으로 상대를 위에서 짓눌러 움직임을 제한하거나 강제로 무릎 꿇게 만들 수 있다. 《정복의 낙인》은 자신에게 패배하거나 스스로 복종한 대상에게 새기며, 낙인 대상이 카시안에게 적대할 때 능력과 마력 출력이 약화된다. 다만 절대적인 정신 지배나 세뇌는 아니다. 《군림》은 넓은 영역에 지배 압력을 펼쳐 적에게 공포와 압박을 주고 약자의 행동을 제한하며, 영역 내 아군에게는 공포 저항과 전투 의지를 강화한다.',
  '루나 블러드하트': '《피의 축제》는 자신의 피와 마기를 자유롭게 생성·변환·조작하는 전투형 혈마법 고유 능력이다. 《혈화》는 피를 불태워 지속적으로 타오르는 화염 공격을 만들고, 《폭혈》은 흩뿌린 피를 순간적으로 폭발시켜 강한 충격과 범위 피해를 일으킨다. 《혈독》은 자신의 피에 강한 독성을 부여해 접촉하거나 피격된 적을 지속적으로 약화시킨다. 《네이팜 블러드》는 혈화와 폭혈을 조합해 넓은 범위를 불타는 피와 연속 폭발로 뒤덮는 광역 공격이다. 《혈마》는 자신의 마기를 대량의 혈액으로 바꾸거나 혈액을 다시 마기로 되돌릴 수 있어 외부 혈액 공급 없이도 막대한 양의 피를 생성하고 전투 자원으로 순환시킬 수 있다.',
  '엘리아 클라시에르': '《절대영도》는 빙룡의 냉기와 빙결을 극한까지 끌어올려 넓은 전장을 제압하는 고유 능력이다. 《서리숨결》은 전방에 강력한 냉기 브레스를 뿜어 다수의 적과 주변 지형을 동시에 얼리고 이동 경로를 봉쇄한다. 《절대영도》는 넓은 범위의 온도를 급격하게 떨어뜨려 적의 움직임과 능력 사용을 방해하고 주변 환경 자체를 얼음 전장으로 바꾼다. 《용화》는 인간형 육체에서 본래의 거대한 빙룡 모습으로 완전히 변신하는 능력이다. 용화 상태에서는 비행 능력, 신체 능력, 방어력, 냉기의 출력과 범위가 크게 상승한다. 이를 통해 상공에서 냉기 브레스와 광역 빙결을 사용하며 공중과 지상을 동시에 제압할 수 있다.',
  '리무아 벨루체': '《군체생명》은 하나의 슬라임 육체를 자유롭게 분열·재조합·변형하는 군체형 고유 능력이다. 《부패》는 접촉한 물질을 빠르게 부식하고 용해하며 단단한 금속에도 효과를 발휘한다. 《점액》은 끈적한 점액을 대량으로 퍼뜨려 적을 붙잡거나 이동을 방해하고 넓은 지형을 장악하는 데 사용한다. 《슬라임 군체》와 《분열》을 이용하면 자신의 몸을 수많은 독립 개체로 나눠 동시에 움직일 수 있지만, 분열된 모든 개체의 전투력 총합은 언제나 원본의 100%를 유지한다. 《변형》은 팔다리, 체형, 얼굴과 외형을 자유롭게 바꿔 전투, 위장, 침투에 활용할 수 있으며 아무리 다른 모습으로 변해도 본질은 하나의 슬라임 생명체다.'
};

const modal = document.createElement('div');
modal.className = 'character-modal';
modal.setAttribute('aria-hidden', 'true');
modal.innerHTML = `
  <div class="character-modal-panel" role="dialog" aria-modal="true" aria-labelledby="character-modal-name">
    <button class="character-modal-close" type="button" aria-label="닫기">×</button>
    <p class="modal-kicker"></p>
    <h3 class="modal-name" id="character-modal-name"></h3>
    <div class="modal-meta"></div>
    <div class="modal-section">
      <small>CHARACTER</small>
      <p class="modal-description"></p>
    </div>
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
  const shortSummary = card.querySelector('p:not(.group)')?.textContent.trim() || '';
  const ability = card.querySelector('.ability b')?.textContent.trim() || '';

  modal.querySelector('.modal-kicker').textContent = group;
  modal.querySelector('.modal-name').textContent = name;
  modal.querySelector('.modal-meta').innerHTML = `<span>${level}</span><span>${group}</span>`;
  modal.querySelector('.modal-description').textContent = characterDetails[name] || shortSummary;
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