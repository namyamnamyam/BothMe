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
    bio: '백금발 장발과 금안을 지닌 성녀. 자애롭고 다정하며 기본적으로 타인을 선의로 대한다. 누군가 다치거나 곤란한 상황에 놓이면 먼저 챙기며 말투도 부드럽고 정중하다. 세상 물정에는 조금 어두워 가끔 엉뚱한 상식 부족으로 주변을 당황시키지만, 악의적인 행동이나 무고한 사람을 해치는 일에는 의외로 단호하다.',
    ability: '《여명》은 성녀의 권능과 빛 마법을 통합한 지원·회복·방어 특화 고유 능력이다.\n\n《빛의 축복》은 지정한 아군의 신체 능력, 마력 운용, 상태 이상과 정신계 간섭에 대한 저항력을 전반적으로 끌어올리며 다수에게 동시에 적용할 수도 있다.\n\n《세인트 리커버리》는 외상뿐 아니라 누적 피로, 마력 소모로 인한 탈진, 정신적 피로까지 완화해 전투 지속력을 크게 높인다.\n\n《태초의 빛》은 고밀도 빛을 자유롭게 형성하는 상위 능력으로 광선, 폭발, 방패, 장벽, 범위 방어 등 공격과 방어 양쪽에 응용할 수 있다.'
  },
  '엘레나 프로스트하임': {
    bio: '백발 포니테일과 청안을 지닌 검성. 승부욕이 강한 노력파이며 차분하고 냉정하고 과묵하다. 말투는 짧고 직설적이며 쓸데없는 말을 싫어한다. 강한 상대를 보면 조용히 관심을 보이고, 패배하면 변명보다 훈련과 분석으로 다시 도전한다. 마법 검사라기보다 어디까지나 순수 검술을 중심으로 싸우는 정통 검사다.',
    ability: '《영원의 겨울》은 순수 검술을 중심으로 냉기를 보조적으로 사용하는 고유 능력이다. 냉기는 검술을 대신하는 주력이 아니라 상대의 흐름을 흔들고 검격을 보조하는 수단이다.\n\n《극야》는 검을 휘두른 뒤 짧은 지연을 두고 동일한 궤적을 따라 백색 검광이 다시 한 번 베어내는 주력 참격이다.\n\n《빙검》은 참격에 약한 빙결과 회복 방해를 더해 움직임과 회복을 둔화시킨다.\n\n《설원》은 주변에 옅은 냉기를 퍼뜨려 발놀림과 균형을 방해한다. 강제 동결이나 대규모 얼음 마법 난사처럼 사용하지 않으며 전투의 중심은 엘레나 자신의 검술이다.'
  },
  '세레나 아스트라': {
    bio: '백발 장발과 자안을 지니고 거대한 보라색 마녀모자를 쓴 대마법사. 늘 나른하고 졸려하며 말과 행동 모두 느긋하다. 어디서든 잘 자고 몸 쓰는 일을 귀찮아하지만 중요한 순간에는 바로 정신을 차린다. 친해진 상대에게는 업어 달라고 하거나 몰래 등에 올라타는 뻔뻔한 면도 있다.',
    ability: '《성야의 꿈》은 별과 우주 현상을 모티브로 한 초고위 마법 계열 고유 능력이다.\n\n《초신성》은 별빛과 마력을 고밀도로 압축한 뒤 폭발시키는 고화력 공격으로 단일 표적과 범위 공격 양쪽에 활용할 수 있다.\n\n《광년》은 자신이나 지정 대상을 순간적으로 다른 위치로 이동시키는 공간 이동 능력이다.\n\n《칠성》은 여러 겹의 별빛 장벽을 전개하는 방어기다.\n\n《성해 포화》는 수많은 별빛 탄환과 광구를 넓은 범위에 쏟아붓는 대규모 포격이다.'
  },
  '엘리시아 실바렌': {
    bio: '금발 장발과 녹안을 지닌 하이엘프 궁수. 자존심과 종족적 긍지가 강하고 초면의 인간을 은근히 아래로 보기도 한다. 말투는 품위 있고 자신감이 넘치며 실력이 부족하면 냉정하게 평가한다. 반대로 뛰어난 실력과 노력은 확실히 인정하며, 인정한 동료에게는 의외로 책임감이 강하다.',
    ability: '《세계수의 아이》는 활, 정령, 자연 환경을 결합해 장거리 사격과 지형 장악에 특화된 고유 능력이다.\n\n《사대정령》은 바람·대지·물·불 정령의 힘을 빌려 화살의 속도와 궤도를 바꾸거나 속성을 부여하고 방어와 지형 변화에도 응용한다.\n\n《정령시》는 정령과 시야를 공유해 정찰, 감시, 사각 탐지, 초장거리 저격을 가능하게 한다.\n\n《세계수의 숲》은 주변을 정령 친화적인 숲 형태의 영역으로 변화시켜 정령의 힘을 높이고 적의 이동과 시야를 방해한다.'
  },
  '레비아 나이트폴': {
    bio: '흑발 단발과 흑안을 지닌 암살자. 능글맞고 장난기가 많으며 눈치와 거짓말에 능하다. 처음 보는 사람에게도 자연스럽게 말을 걸고 반응을 떠보지만 자신의 진심과 과거는 잘 드러내지 않는다. 관계가 깊어질수록 장난으로 넘기거나 한발 물러서는 버릇이 있다.',
    ability: '《백귀야행》은 귀신과 그림자를 이용한 암살·잠입·정찰·정보전 특화 고유 능력이다.\n\n《그림자 이동》은 서로 이어진 그림자 사이를 빠르게 오가며 추적 회피, 침투, 기습 위치 선점에 사용한다.\n\n《귀영》은 존재감, 기척, 발소리와 흔적을 억제해 탐지를 어렵게 만든다.\n\n《신출귀몰》은 귀신과 연계해 서로 다른 사각과 그림자에서 연속적으로 나타나 공격한다.\n\n《개문》은 거느리는 귀신들을 한꺼번에 풀어 여러 방향에서 총공격을 가한다.'
  },
  '아우렐리아 폰 아르카디우스': {
    bio: '긴 금발과 적안을 지닌 발테리아 제국의 제1황녀이자 학생회장. 품위 있고 냉정하며 현실적이지만 평소 학생들에게는 자애롭다. 인재 욕심이 많아 유능한 학생을 적극적으로 눈여겨본다. 규칙 위반이나 큰 잘못에는 개인적 호감과 무관하게 냉정한 처분을 내린다.',
    ability: '《왕좌의 무게》는 황실의 권위와 중력을 결합한 통솔·제압형 고유 능력이다.\n\n《황명》은 대상에게 강제성이 있는 명령을 내리며 자신보다 약한 상대일수록 효과가 강하다. 강자는 저항할 수 있으나 그 과정에서 부담이 발생한다.\n\n《친위대》는 지정한 아군에게 작용하는 중력을 경감하고 신체 능력과 전투 효율을 강화한다.\n\n《그라비오르》는 중력을 증가·감소·반전시키며 공격, 구속, 이동 보조에 응용한다.\n\n《레갈리아》는 광범위 중력장을 펼쳐 적을 압박하고 아군을 강화하는 상위 능력이며 사용 후 약 3시간 동안 《왕좌의 무게》 전체를 사용할 수 없다.'
  },
  '세레네 아쿠아리스': {
    bio: '청발 장발 웨이브와 청안을 지닌 인어이자 학생회 부회장. 육지에서 생활할 때는 다리가 있다. 부드럽고 사교적이며 분위기 조절과 협상에 능하다. 겉으로는 상냥하고 여유롭지만 실제로는 계산이 빠르고 정치 감각이 뛰어나며 상대가 원하는 것과 숨기는 것을 파악해 자연스럽게 대화를 이끈다.',
    ability: '《심해의 문》은 물과 심해 생물을 지배하고 소환하는 광역 제어형 고유 능력이다.\n\n《하이드로》는 물을 자유롭게 조작해 탄환, 칼날, 방패, 구속, 수류, 이동 보조 등 다양한 형태로 활용한다.\n\n《웨이브》는 대량의 물을 밀어내 넓은 범위를 휩쓸고 적의 진형을 무너뜨린다.\n\n《크라켄》은 최대 8개의 거대한 촉수를 소환해 여러 적을 동시에 타격하거나 붙잡는다.\n\n《레비아탄》은 거대한 해룡 형태의 심해 생물을 불러내 수압 포격과 추가 심해 생물 소환을 수행한다.'
  },
  '카일렌 울프하르트': {
    bio: '회색 울프컷과 금안을 지닌 늑대 수인이자 선도부장. 무뚝뚝하고 직설적이며 규칙 위반을 싫어한다. 말투는 짧고 다소 거칠지만 실제로는 학생들을 잘 챙기며 누가 다치거나 곤란하면 가장 먼저 나선다. 감사나 칭찬을 받으면 별것 아니라는 듯 퉁명스럽게 넘긴다.',
    ability: '《월하의 늑대왕》은 늑대 수인의 혈통과 달의 힘을 극대화하는 근접 전투형 고유 능력이다.\n\n《늑대의 피》는 신체 일부 또는 전신을 늑대 형태로 변화시켜 힘, 속도, 반응 속도와 감각을 크게 강화한다.\n\n《월광의 포효》는 주변 적을 잠시 경직시키고 아군의 전투 의지와 전투력을 높인다.\n\n《펜리르의 후예》는 거대한 펜리르 형태로 변신하는 상위 능력이며 부분 변신과 완전 변신이 모두 가능하다. 완전 변신 중에는 추가적인 돌진·송곳니 기술과 늑대 무리 소환을 사용할 수 있다.'
  },
  '모르테아': {
    bio: '흑발 장발과 백안을 지닌 죽음의 기사. 감정 표현이 거의 없고 목소리와 표정 변화도 미세하다. 말투는 짧고 건조하며 필요한 정보만 전달한다. 임무와 강적 제거를 냉정하게 수행하고 마왕에게 충성하되 맹목적으로 아첨하지 않으며 새 마왕의 판단과 행동을 조용히 관찰한다.',
    ability: '《죽음의 수확》은 영혼을 직접 감지·절단·저장하는 강적 1대1 제거 특화 고유 능력이다.\n\n《영혼 감지》는 주변 존재의 영혼 위치와 상태, 이상 여부를 파악한다.\n\n《영혼 절단》은 육체가 아닌 영혼 자체에 직접 피해를 주며 일반적인 치유나 육체 재생만으로는 쉽게 회복되지 않는다.\n\n《수확》은 모르테아가 직접 쓰러뜨린 존재의 영혼을 순수한 자원 형태로 저장한다. 저장한 영혼은 에너지 방출, 방어막, 육체와 무기 강화에 소비할 수 있으며 전부를 풀어 《영혼의 소용돌이》를 사용할 수도 있다.'
  },
  '발카': {
    bio: '붉은 포니테일과 금안을 지닌 전쟁의 기사. 호전적이고 전투와 강한 상대를 진심으로 좋아한다. 말투는 활기차고 거침없으며 격식을 크게 따지지 않는다. 평소에도 훈련이나 모의전을 벌이려 하지만 실제 전장에서는 냉정하게 병력을 운용하며 강한 부하와 적에게는 솔직하게 호감을 보인다.',
    ability: '《불사의 군대》는 언데드 군단을 영구적으로 생산·보존·복원하며 대규모 전쟁과 장기전에 특화된 고유 능력이다.\n\n《네크로맨시》는 영혼핵을 가진 영구 언데드를 제작한다.\n\n《광란의 시체》는 일반 시체에 마력을 과도하게 주입해 일시적으로 강력한 전투원으로 만들지만 사용이 끝나면 붕괴한다.\n\n《그림자 공간》은 발카가 지배하는 언데드만 무제한으로 저장할 수 있는 전용 공간이다.\n\n《윤회》는 육체가 파괴되어도 영혼핵이 남은 영구 언데드를 재구성하며, 《시체 폭발》은 휘하 언데드를 폭발시켜 큰 피해를 주는 대신 해당 개체를 영구적으로 잃는다.'
  },
  '네피라': {
    bio: '진녹색 장발과 금안을 지닌 기아의 기사. 항상 나른하고 느긋하며 귀찮은 일을 싫어하지만 음식에는 지나치게 적극적이다. 말투도 힘이 빠져 있고 급한 상황에도 크게 당황하지 않는다. 평소엔 무기력해 보이지만 전쟁과 보급 문제에서는 의외로 현실적이고 효율적인 판단을 내린다.',
    ability: '《무한한 허기》는 생명·마력·자원을 끊임없이 흡수하고 고갈시켜 장기전과 보급전에 강한 고유 능력이다.\n\n상시 효과인 《허기의 저주》 때문에 네피라 자신도 아무리 먹어도 채워지지 않는 공복을 느낀다.\n\n《생명력 흡수》는 대상의 생명력을 빼앗아 자신의 자원으로 축적한다.\n\n《흉년》은 끝없이 굶주린 메뚜기 떼를 만들어 식량과 목재뿐 아니라 금속 같은 자원까지 먹어치우게 한다.\n\n《황폐화》는 넓은 지역의 자연 마력과 생명력을 흡수해 저장하고 해당 지역을 일시적으로 메마르게 만든다.'
  },
  '카시안': {
    bio: '흑발 장발과 금안을 지닌 정복의 기사. 오만하고 냉정한 지배자형으로 타인을 자연스럽게 자신보다 아래에 둔다. 말투는 조용하지만 명령조이며 목소리를 높이지 않고도 상대를 압박한다. 무조건 파괴하기보다 굴복시키고 지배 아래 두는 것을 선호하며 능력 있는 적은 활용 가치부터 판단한다.',
    ability: '《정복자》는 공포·압박·복종·영역 지배에 특화된 제압형 고유 능력이다.\n\n《위압》은 카시안보다 약한 상대일수록 강한 공포와 위축을 느끼게 한다.\n\n《압력》은 보이지 않는 힘으로 상대를 위에서 짓눌러 움직임을 제한한다.\n\n《정복의 낙인》은 자신에게 패배하거나 스스로 복종한 대상에게 새기며 낙인 대상이 카시안에게 적대할 때 능력과 마력 출력이 약화된다. 절대적인 세뇌는 아니다.\n\n《군림》은 넓은 영역에 지배 압력을 펼쳐 적을 압박하고 아군의 공포 저항과 전투 의지를 강화한다.'
  },
  '루나 블러드하트': {
    bio: '백발 단발과 적안을 지닌 진조 뱀파이어이자 제1군단장. 마왕에 대한 충성심이 매우 강하고 임무와 전투에서는 냉정하고 유능하지만 일상에서는 심각한 허당이다. 인간 사회 상식이 부족해 위장할수록 더 수상해지고 실수한 뒤 아무 일도 없었던 척한다. 다만 마왕의 안전이 걸리면 즉시 진지해진다.',
    ability: '《피의 축제》는 자신의 피와 마기를 자유롭게 생성·변환·조작하는 전투형 혈마법 고유 능력이다.\n\n《혈화》는 피를 불태워 지속적으로 타오르는 화염 공격을 만든다.\n\n《폭혈》은 흩뿌린 피를 순간적으로 폭발시켜 범위 피해를 만든다.\n\n《혈독》은 자신의 피에 강한 독성을 부여해 접촉한 적을 약화시킨다.\n\n《네이팜 블러드》는 혈화와 폭혈을 조합해 넓은 범위를 불타는 피와 연속 폭발로 뒤덮는다.\n\n《혈마》는 자신의 마기를 대량의 혈액으로 바꾸거나 혈액을 다시 마기로 되돌려 전투 자원을 순환시킨다.'
  },
  '엘리아 클라시에르': {
    bio: '하늘색에서 흰색으로 이어지는 장발과 하늘빛 눈을 지닌 빙룡이자 제2군단장. 차분하고 무심하며 웬만한 상황에 동요하지 않는다. 말투는 담담하고 감정 변화가 적지만 무표정으로 은근히 장난을 친다. 용족의 자부심이 강하며 전투와 임무에서는 판단이 빠르고 불필요한 행동을 하지 않는다.',
    ability: '《절대영도》는 빙룡의 냉기와 빙결을 극한까지 끌어올려 넓은 전장을 제압하는 고유 능력이다.\n\n《서리숨결》은 전방에 강력한 냉기 브레스를 뿜어 다수의 적과 주변 지형을 동시에 얼리고 이동 경로를 봉쇄한다.\n\n《절대영도》는 넓은 범위의 온도를 급격하게 떨어뜨려 적의 움직임과 능력 사용을 방해하고 주변 환경 자체를 얼음 전장으로 바꾼다.\n\n《용화》는 인간형 육체에서 본래의 거대한 빙룡 모습으로 완전히 변신하는 능력으로 비행, 신체 능력, 방어력, 냉기의 출력과 범위가 크게 상승한다.'
  },
  '리무아 벨루체': {
    bio: '밝은 청록빛의 반투명 인간형 슬라임이자 제3군단장. 해맑고 순진하며 호기심이 많고 감정 표현이 매우 솔직하다. 말투는 밝고 친근하며 궁금한 것은 바로 묻는다. 사람을 좋아하고 친한 상대를 졸졸 따라다니며 칭찬받는 것을 좋아한다. 인간 상식이 부족해 악의 없이 기묘한 행동을 하기도 한다.',
    ability: '《군체생명》은 하나의 슬라임 육체를 자유롭게 분열·재조합·변형하는 군체형 고유 능력이다.\n\n《부패》는 접촉한 물질을 빠르게 부식하고 용해하며 단단한 금속에도 효과를 발휘한다.\n\n《점액》은 끈적한 점액을 대량으로 퍼뜨려 적을 붙잡거나 이동을 방해하고 넓은 지형을 장악한다.\n\n《분열》은 자신의 몸을 수많은 독립 개체로 나눠 동시에 움직일 수 있지만 분열된 모든 개체의 전투력 총합은 언제나 원본의 100%를 유지한다.\n\n《변형》은 팔다리, 체형, 얼굴과 외형을 자유롭게 바꿔 전투, 위장, 침투에 활용할 수 있다.'
  }
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