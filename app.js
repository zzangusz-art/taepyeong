/* 태평 TAEPYEONG — 쇼핑몰 프론트 스크립트
 * 실제 상품 사진이 준비되면 PRODUCTS의 img 필드에 경로를 넣으면 일러스트 대신 사진이 표시됩니다.
 */

// ── 의류 실루엣 (사진 준비 전 임시 이미지) ──────────────────────────
const SHAPES = {
  pants: c => `<path fill="${c}" d="M30 10h40l5 102H56L50 42l-6 70H25z"/><path fill="rgba(0,0,0,.18)" d="M30 10h40v7H30z"/><path stroke="rgba(0,0,0,.2)" stroke-width="1" fill="none" d="M50 17v25M38 20l-2 12M62 20l2 12"/>`,
  jeans: c => `<path fill="${c}" d="M29 10h42l7 102H57L50 44l-7 68H22z"/><path fill="rgba(0,0,0,.2)" d="M29 10h42v7H29z"/><path stroke="rgba(255,255,255,.35)" stroke-width="1" fill="none" stroke-dasharray="2 2" d="M50 17v27M33 18q5 10 13 8M67 18q-5 10-13 8M30 100h18M52 100h21"/>`,
  tee: c => `<path fill="${c}" d="M30 14l12-4q8 7 16 0l12 4 18 16-10 11-6-6v73H28V35l-6 6-10-11z"/><path stroke="rgba(0,0,0,.18)" stroke-width="1.4" fill="none" d="M42 10q8 9 16 0"/>`,
  shirt: c => `<path fill="${c}" d="M32 12l12-4 6 8 6-8 12 4 16 12 8 66-10 2-10-50v66H28V42L18 92 8 90l8-66z"/><path stroke="rgba(0,0,0,.22)" stroke-width="1" fill="none" d="M44 8l6 10 6-10M50 18v90"/><g fill="rgba(0,0,0,.25)"><circle cx="50" cy="32" r="1.2"/><circle cx="50" cy="50" r="1.2"/><circle cx="50" cy="68" r="1.2"/><circle cx="50" cy="86" r="1.2"/></g>`,
  knit: c => `<path fill="${c}" d="M32 13l11-3q7 6 14 0l11 3 16 12 8 64-10 3-10-48v64H28V44L18 92 8 89l8-64z"/><path stroke="rgba(0,0,0,.16)" stroke-width="1" fill="none" d="M28 100h44M28 103h44M28 106h44M43 10q7 9 14 0M40 30v60M50 26v64M60 30v60"/>`,
  jacket: c => `<path fill="${c}" d="M30 14l10-6h20l10 6 18 12 6 64-12 3-8-50v65H26V43l-8 50-12-3 6-64z"/><path stroke="rgba(0,0,0,.28)" stroke-width="1.2" fill="none" d="M50 12v96M40 8l10 10 10-10M34 60h10M56 60h10"/><path fill="rgba(0,0,0,.15)" d="M26 102h48v6H26z"/>`,
  setup: c => `<path fill="${c}" d="M33 8q17-8 34 0l4 8 15 12 6 46-11 2-6-32v22H25V44l-6 32-11-2 6-46 15-12z"/><path fill="${c}" d="M30 72h40l3 44H55l-5-30-5 30H27z"/><path stroke="rgba(0,0,0,.22)" stroke-width="1" fill="none" d="M38 10q12 12 24 0M44 18v10M56 18v10M25 66h50M30 72h40"/>`,
};

// 상품 데이터: cat=TOP|PANTS|SET|OUTER, rank=인기순위, d=등록순(작을수록 최신)
const PRODUCTS = [
  { id:1,  name:'태평 프로젝트 조거·와이드 자유선택 트레이닝 팬츠 (수선NO! 기장선택)', cat:'PANTS', shape:'pants',  color:'#2b2b2b', bg:'#e9e6df', price:27900, sizes:['28~30','32~34','36~38'], colors:['블랙','차콜','그레이'], sameday:true, rank:1, d:9 },
  { id:2,  name:'고탄력 볼륨 와이드 풀밴딩 투턱 청바지 (수선NO! 기장선택)', cat:'PANTS', shape:'jeans', color:'#5f7fa8', bg:'#e4e8ec', price:32800, sale:29800, sizes:['28~32','34~36','36~40'], colors:['연청','중청'], rank:2, d:12 },
  { id:3,  name:'뒷밴딩 고탄력 세미와이드 코튼 팬츠', cat:'PANTS', shape:'pants', color:'#cbb796', bg:'#f2eee6', price:32800, sale:29800, sizes:['28','30','32','34','36','38','40','42'], colors:['베이지','카키','블랙'], sameday:true, rank:3, d:15 },
  { id:4,  name:'비바람에도 태평한 나일론 투웨이 조거 셋업', cat:'SET', shape:'setup', color:'#3d4a3f', bg:'#e6e9e3', price:39900, sizes:['M','L','XL','2XL','3XL'], colors:['카키','블랙','네이비'], sameday:true, rank:4, d:7 },
  { id:5,  name:'베이스 플라이트 오버핏 MA-1 항공 점퍼', cat:'OUTER', shape:'jacket', color:'#4b5340', bg:'#ebe9e2', price:39800, sizes:['M','L','XL','2XL','3XL','4XL','5XL'], colors:['카키','블랙'], rank:5, d:4, isNew:true },
  { id:6,  name:'1+1 데일리핏 뒷밴딩 탄력 슬랙스 (수선NO! 기장선택)', cat:'PANTS', shape:'pants', color:'#3a3d44', bg:'#e8e8e8', price:44800, sizes:['28','30','32','34','36','38','40'], colors:['블랙','차콜','네이비','베이지'], oneplus:true, rank:6, d:18 },
  { id:7,  name:'워시드 오버핏 데님 셔츠', cat:'TOP', shape:'shirt', color:'#7e98b8', bg:'#e6ebf0', price:23800, sizes:['M~XL','XL~4XL'], colors:['연청','진청'], rank:7, d:10 },
  { id:8,  name:'시티 레터링 아트웍 드롭 오버핏 니트', cat:'TOP', shape:'knit', color:'#d8cfc0', bg:'#f3f0ea', price:25800, sizes:['FREE~4XL'], colors:['아이보리','차콜','브라운'], rank:8, d:2, isNew:true },
  { id:9,  name:'오버핏 피그먼트 스트링 와이드 셋업', cat:'SET', shape:'setup', color:'#8a7a66', bg:'#efebe4', price:79800, sale:59800, sizes:['M','L','XL','2XL'], colors:['브라운','차콜'], rank:9, d:20 },
  { id:10, name:'1+1 고탄력 와플 크루넥 긴팔 티셔츠', cat:'TOP', shape:'tee', color:'#f1ede6', bg:'#e2ded6', price:39800, sizes:['M','L','XL','2XL','3XL','4XL','5XL'], colors:['화이트','블랙','멜란지','네이비'], oneplus:true, sameday:true, rank:10, d:14 },
  { id:11, name:'코스트 A2 오버핏 바이커 레더 자켓', cat:'OUTER', shape:'jacket', color:'#222', bg:'#e6e3dd', price:63000, sizes:['M','L','XL','2XL','3XL','4XL','5XL'], colors:['블랙','브라운'], rank:11, d:6 },
  { id:12, name:'옥스포드 오버핏 베이직 셔츠', cat:'TOP', shape:'shirt', color:'#eef0f3', bg:'#dfe3e8', price:29800, sizes:['M','L','XL','2XL','3XL','4XL','5XL'], colors:['화이트','스카이','핑크'], rank:12, d:16 },
  { id:13, name:'안감 양털 발열 시티워커 자켓', cat:'OUTER', shape:'jacket', color:'#6b5a48', bg:'#eee8e0', price:28900, sizes:['S~L','XL~3XL'], colors:['브라운','블랙','아이보리'], sameday:true, rank:13, d:1, isNew:true },
  { id:14, name:'풀밴딩 논페이드 생지 와이드 청바지 (수선NO! 기장선택)', cat:'PANTS', shape:'jeans', color:'#2f3c58', bg:'#e3e5ea', price:29800, sizes:['28~30','32~34','36~38'], colors:['생지'], rank:14, d:11 },
  { id:15, name:'헤리티지 에브리데이 더블코튼 트레이닝 셋업', cat:'SET', shape:'setup', color:'#9aa0a6', bg:'#eceeef', price:68800, sale:65360, sizes:['M','XL','2XL','4XL'], colors:['멜란지','블랙','네이비'], rank:15, d:8 },
  { id:16, name:'클래식 케이블 드롭숄더 니트', cat:'TOP', shape:'knit', color:'#5a4b3c', bg:'#ece6de', price:34000, sizes:['FREE~4XL'], colors:['브라운','오트밀','블랙'], rank:16, d:3, isNew:true },
  { id:17, name:'1+1 쿨 릴렉스 비침없는 반팔 티셔츠', cat:'TOP', shape:'tee', color:'#1f1f1f', bg:'#e7e4de', price:42000, sale:39900, sizes:['M~L','XL','2XL~3XL'], colors:['블랙','화이트','그레이'], oneplus:true, rank:17, d:22 },
  { id:18, name:'융털 퀼팅 패딩 브이넥 깔깔이 자켓', cat:'OUTER', shape:'jacket', color:'#5d6650', bg:'#e9eae4', price:59800, sizes:['L~XL','2XL','3XL~4XL'], colors:['카키','블랙'], rank:18, d:5, isNew:true },
  { id:19, name:'TR 링클가공 고탄력 와이드 밴딩 슬랙스', cat:'PANTS', shape:'pants', color:'#55565a', bg:'#ebebeb', price:35000, sizes:['M','L','XL','2XL','3XL','4XL'], colors:['차콜','블랙','그레이'], rank:19, d:13 },
  { id:20, name:'웨일핀 골덴 코듀로이 긴팔 셔츠', cat:'TOP', shape:'shirt', color:'#a2774c', bg:'#f0e9e0', price:49000, sale:39200, sizes:['XL~2XL','3XL','4XL'], colors:['카멜','브라운','블랙'], rank:20, d:17 },
];

const HERO = [
  { tag:'NEW ARRIVAL', title:'가을엔 태평하게,<br>와이드 생지 데님', desc:'풀밴딩 · 기장선택 가능 · 신상 5% 할인', shape:'jeans', color:'#2f3c58', bg:'linear-gradient(160deg,#8fa3b8,#4b5d74)', cat:'PANTS' },
  { tag:'BEST SETUP', title:'비바람에도 끄떡없는<br>나일론 투웨이 셋업', desc:'상하의 세트 39,900원 · 당일발송', shape:'setup', color:'#3d4a3f', bg:'linear-gradient(160deg,#a8b29a,#56604f)', cat:'SET' },
  { tag:'OUTER WEEK', title:'올겨울 첫 아우터,<br>MA-1 항공 점퍼', desc:'M~5XL 빅사이즈까지 · 무료배송', shape:'jacket', color:'#2c2f26', bg:'linear-gradient(160deg,#c9b99b,#7d6c52)', cat:'OUTER' },
  { tag:'1+1 EVENT', title:'두 장 사면 더 태평,<br>데일리 티셔츠 1+1', desc:'와플 · 쿨 릴렉스 · 무지 티 모음', shape:'tee', color:'#f1ede6', bg:'linear-gradient(160deg,#5b5b5b,#262626)', cat:'1+1' },
  { tag:'KNIT SEASON', title:'포근한 드롭숄더,<br>니트 컬렉션', desc:'FREE~4XL 루즈핏', shape:'knit', color:'#d8cfc0', bg:'linear-gradient(160deg,#b7a48c,#6a5844)', cat:'TOP' },
  { tag:'SALE', title:'시즌오프<br>최대 25% 할인', desc:'셋업 · 셔츠 · 슬랙스 한정수량', shape:'shirt', color:'#a2774c', bg:'linear-gradient(160deg,#c47a62,#7a3b2a)', cat:'SALE' },
];

const REVIEWS = [
  { pid:2,  stars:5, text:'허리 32인데 밴딩이라 정말 편해요. 기장 선택해서 수선 안 하고 바로 입었습니다. 핏도 와이드하게 잘 떨어져요.', user:'kim***', info:'175cm / 72kg · L 구매' },
  { pid:4,  stars:5, text:'셋업으로 사서 따로따로도 입고 있습니다. 비 오는 날에도 금방 말라서 출퇴근용으로 최고예요.', user:'park***', info:'180cm / 78kg · XL 구매' },
  { pid:10, stars:4, text:'1+1이라 블랙·화이트 같이 샀는데 두께감 적당하고 목이 안 늘어나네요. 재구매 의사 있습니다.', user:'lee***', info:'170cm / 65kg · M 구매' },
  { pid:5,  stars:5, text:'2XL 찾기 힘든데 여기는 5XL까지 있어서 좋아요. 어깨 넉넉하고 기장도 딱 좋습니다. 배송도 하루 만에 왔어요.', user:'choi***', info:'183cm / 95kg · 3XL 구매' },
];

// ── 유틸 ─────────────────────────────────────────────
const $ = s => document.querySelector(s);
const won = n => n.toLocaleString('ko-KR') + '원';
const nowPrice = p => p.sale || p.price;
const rate = p => p.sale ? Math.round((1 - p.sale / p.price) * 100) : 0;
const art = (shape, color, bg) =>
  `<div class="art" style="background:${bg}"><svg viewBox="0 0 100 120" aria-hidden="true">${SHAPES[shape](color)}</svg></div>`;
const pArt = p => p.img
  ? `<div class="art"><img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover"></div>`
  : art(p.shape, p.color, p.bg);

function priceHtml(p) {
  return `<div class="price">${p.sale ? `<span class="rate">${rate(p)}%</span>` : ''}<span class="now">${won(nowPrice(p))}</span>${p.sale ? `<span class="old">${won(p.price)}</span>` : ''}</div>`;
}

function cardHtml(p, rankNo) {
  const badges = [p.oneplus && '<span class="badge b-11">1+1</span>', p.isNew && '<span class="badge b-new">NEW</span>', p.sale && '<span class="badge">SALE</span>'].filter(Boolean).join('');
  return `<article class="card" data-id="${p.id}">
    <div class="thumb">
      ${rankNo ? `<span class="rank">${rankNo}</span>` : ''}
      ${pArt(p)}
      <div class="badges">${badges}</div>
      <button class="quick" data-quick="${p.id}" aria-label="장바구니 담기"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg></button>
    </div>
    <p class="name">${p.name}</p>
    ${priceHtml(p)}
    <p class="sizes">${p.sizes.join(', ')}</p>
    ${p.sameday ? '<span class="ship">2시 이전 당일발송!</span>' : ''}
  </article>`;
}

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('on'), 1800);
}

// ── 메인 배너 ────────────────────────────────────────
let heroIdx = 0;
function perView() { return innerWidth <= 600 ? 1 : innerWidth <= 900 ? 2 : 3; }
function renderHero() {
  $('#heroTrack').innerHTML = HERO.map(h => `
    <a class="hero-slide" href="#best" data-cat="${h.cat}">
      <div class="art" style="background:${h.bg}"><svg viewBox="0 0 100 120" aria-hidden="true">${SHAPES[h.shape](h.color)}</svg></div>
      <div class="copy"><span class="tag">${h.tag}</span><h3>${h.title}</h3><p>${h.desc}</p></div>
    </a>`).join('');
  renderDots();
}
function renderDots() {
  const pages = Math.ceil(HERO.length / perView());
  $('#heroDots').innerHTML = Array.from({ length: pages }, (_, i) =>
    `<button class="${i === heroIdx ? 'on' : ''}" data-dot="${i}" aria-label="${i + 1}번 배너"></button>`).join('');
}
function goHero(i) {
  const pages = Math.ceil(HERO.length / perView());
  heroIdx = (i + pages) % pages;
  $('#heroTrack').style.transform = `translateX(-${heroIdx * 100}%)`;
  renderDots();
}
let heroTimer = setInterval(() => goHero(heroIdx + 1), 5000);
$('#heroDots').addEventListener('click', e => {
  const b = e.target.closest('[data-dot]');
  if (!b) return;
  clearInterval(heroTimer);
  goHero(+b.dataset.dot);
  heroTimer = setInterval(() => goHero(heroIdx + 1), 5000);
});
addEventListener('resize', () => goHero(Math.min(heroIdx, Math.ceil(HERO.length / perView()) - 1)));

// ── WEEKLY BEST ──────────────────────────────────────
function renderWeekly(tab = 'ALL') {
  const list = PRODUCTS.filter(p => tab === 'ALL' || p.cat === tab).sort((a, b) => a.rank - b.rank).slice(0, 10);
  $('#weeklyRow').innerHTML = list.map((p, i) => cardHtml(p, i + 1)).join('');
  $('#weeklyRow').scrollLeft = 0;
}
$('#weeklyTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-tab]');
  if (!b) return;
  document.querySelectorAll('#weeklyTabs button').forEach(x => x.classList.toggle('on', x === b));
  renderWeekly(b.dataset.tab);
});
document.querySelectorAll('[data-slide]').forEach(btn => btn.addEventListener('click', () => {
  const row = $('#weeklyRow');
  row.scrollBy({ left: row.clientWidth * +btn.dataset.slide, behavior: 'smooth' });
}));

// ── BEST ITEM / 카테고리 ─────────────────────────────
const CAT_INFO = {
  ALL:    ['BEST ITEM', '태평에서 가장 많이 찾는 스테디셀러'],
  NEW:    ['NEW 5%', '이번 주 새로 들어온 신상품, 5% 할인 중'],
  '1+1':  ['1+1', '두 장 사면 더 태평한 1+1 기획전'],
  SET:    ['SETUP', '고민 없이 한 벌, 셋업 할인'],
  PANTS:  ['PANTS', '수선 없이 기장 선택, 태평 하의'],
  OUTER:  ['OUTER', '가을·겨울 아우터 모음'],
  TOP:    ['TOP', '티셔츠 · 셔츠 · 니트'],
  SALE:   ['SALE', '한정수량 특가 상품'],
};
let state = { cat: 'ALL', sort: 'best', q: '' };

function renderBest() {
  let list = PRODUCTS.filter(p => {
    if (state.q) return p.name.includes(state.q);
    switch (state.cat) {
      case 'NEW': return p.isNew;
      case '1+1': return p.oneplus;
      case 'SALE': return p.sale;
      case 'ALL': return true;
      default: return p.cat === state.cat;
    }
  });
  const sorters = { best: (a, b) => a.rank - b.rank, new: (a, b) => a.d - b.d, low: (a, b) => nowPrice(a) - nowPrice(b), high: (a, b) => nowPrice(b) - nowPrice(a) };
  list.sort(sorters[state.sort]);
  const [title, desc] = state.q ? [`"${state.q}" 검색 결과`, '검색어가 포함된 상품입니다'] : CAT_INFO[state.cat];
  $('#bestTitle').textContent = title;
  $('#bestDesc').textContent = desc;
  $('#bestCount').textContent = `총 ${list.length}개`;
  $('#bestGrid').innerHTML = list.length ? list.map(p => cardHtml(p)).join('') : '<p class="empty">해당하는 상품이 없습니다.</p>';
}
$('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderBest(); });
document.addEventListener('click', e => {
  const a = e.target.closest('[data-cat]');
  if (!a) return;
  state.cat = a.dataset.cat;
  state.q = '';
  $('#searchInput').value = '';
  renderBest();
  closeAll();
});

// 검색
$('[data-open-search]').addEventListener('click', () => {
  const bar = $('#searchBar');
  bar.hidden = !bar.hidden;
  if (!bar.hidden) $('#searchInput').focus();
});
$('#searchInput').addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  state.q = e.target.value.trim();
  renderBest();
  $('#best').scrollIntoView();
});

// ── 리뷰 ─────────────────────────────────────────────
$('#reviewList').innerHTML = REVIEWS.map(r => {
  const p = PRODUCTS.find(x => x.id === r.pid);
  return `<div class="review">
    <span class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
    <p>${r.text}</p>
    <div class="meta"><b>${r.user}</b> · ${r.info}<br>${p.name}</div>
  </div>`;
}).join('');

// ── 상품 상세 모달 ───────────────────────────────────
let pick = {};
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  pick = { id, size: null, color: p.colors[0] };
  $('#modalBody').innerHTML = `
    <div class="pd-img">${pArt(p)}</div>
    <div class="pd-info">
      <h3>${p.name}</h3>
      ${priceHtml(p)}
      <div class="pd-meta">
        배송 · ${nowPrice(p) >= 50000 ? '무료배송' : '3,000원 (5만원 이상 무료)'}<br>
        ${p.sameday ? '<b style="color:var(--accent)">오후 2시 이전 주문 시 당일발송</b><br>' : ''}
        적립 · 구매금액의 1% 적립
      </div>
      <span class="opt-label">COLOR</span>
      <div class="opt-group" data-opt="color">${p.colors.map((c, i) => `<button class="${i ? '' : 'on'}" data-v="${c}">${c}</button>`).join('')}</div>
      <span class="opt-label">SIZE</span>
      <div class="opt-group" data-opt="size">${p.sizes.map(s => `<button data-v="${s}">${s}</button>`).join('')}</div>
      <div class="pd-actions">
        <button class="btn-line" data-add>장바구니</button>
        <button class="btn-primary" style="margin:0" data-buy>바로구매</button>
      </div>
    </div>`;
  open('#productModal');
}
$('#modalBody').addEventListener('click', e => {
  const opt = e.target.closest('.opt-group button');
  if (opt) {
    const group = opt.parentElement;
    group.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === opt));
    pick[group.dataset.opt] = opt.dataset.v;
    return;
  }
  if (e.target.closest('[data-add]') || e.target.closest('[data-buy]')) {
    if (!pick.size) return toast('사이즈를 선택해주세요');
    addToCart(pick.id, pick.size, pick.color);
    closeAll();
    if (e.target.closest('[data-buy]')) setTimeout(() => open('#cartDrawer'), 250);
  }
});

document.addEventListener('click', e => {
  const q = e.target.closest('[data-quick]');
  if (q) {
    e.stopPropagation();
    return openProduct(+q.dataset.quick);
  }
  const card = e.target.closest('.card');
  if (card) openProduct(+card.dataset.id);
});

// ── 장바구니 (브라우저 저장) ─────────────────────────
let cart = [];
try { cart = JSON.parse(localStorage.getItem('tp_cart')) || []; } catch { cart = []; }
const saveCart = () => { try { localStorage.setItem('tp_cart', JSON.stringify(cart)); } catch {} };

function addToCart(id, size, color) {
  const key = `${id}|${size}|${color}`;
  const hit = cart.find(c => c.key === key);
  hit ? hit.qty++ : cart.push({ key, id, size, color, qty: 1 });
  saveCart();
  renderCart();
  toast('장바구니에 담았습니다');
}
function renderCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  $('#cartCount').textContent = count;
  const sub = cart.reduce((s, c) => s + nowPrice(PRODUCTS.find(p => p.id === c.id)) * c.qty, 0);
  const ship = sub === 0 || sub >= 50000 ? 0 : 3000;
  $('#cartSub').textContent = won(sub);
  $('#cartShip').textContent = ship ? won(ship) : (sub ? '무료' : '0원');
  $('#cartTotal').textContent = won(sub + ship);
  $('#cartList').innerHTML = cart.length ? cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    return `<div class="cart-item" data-key="${c.key}">
      <div class="mini">${pArt(p)}</div>
      <div><p class="ci-name">${p.name}</p><p class="ci-opt">${c.color} / ${c.size}</p>
        <div class="qty"><button data-q="-1" aria-label="수량 감소">−</button><span>${c.qty}</span><button data-q="1" aria-label="수량 증가">+</button></div></div>
      <div class="ci-right"><b>${won(nowPrice(p) * c.qty)}</b><button class="ci-del" data-del>삭제</button></div>
    </div>`;
  }).join('') : '<p class="cart-empty">장바구니가 비어 있습니다.</p>';
}
$('#cartList').addEventListener('click', e => {
  const row = e.target.closest('.cart-item');
  if (!row) return;
  const item = cart.find(c => c.key === row.dataset.key);
  const q = e.target.closest('[data-q]');
  if (q) item.qty = Math.max(1, item.qty + +q.dataset.q);
  if (e.target.closest('[data-del]')) cart = cart.filter(c => c !== item);
  saveCart();
  renderCart();
});
$('#checkoutBtn').addEventListener('click', () => {
  if (!cart.length) return toast('장바구니가 비어 있습니다');
  toast('결제 기능은 쇼핑몰 솔루션(카페24 등) 연동 후 활성화됩니다');
});

// ── 드로어 / 모달 열고 닫기 ──────────────────────────
function open(sel) {
  closeAll();
  $(sel).classList.add('on');
  $(sel).setAttribute('aria-hidden', 'false');
  $('#dim').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeAll() {
  document.querySelectorAll('.drawer.on, .modal.on').forEach(el => { el.classList.remove('on'); el.setAttribute('aria-hidden', 'true'); });
  $('#dim').classList.remove('on');
  document.body.style.overflow = '';
}
$('[data-open-cart]').addEventListener('click', () => open('#cartDrawer'));
$('[data-open-menu]').addEventListener('click', () => open('#menuDrawer'));
$('#dim').addEventListener('click', closeAll);
$('#productModal').addEventListener('click', e => { if (e.target.id === 'productModal') closeAll(); });
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeAll));
addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

// ── 시작 ─────────────────────────────────────────────
renderHero();
renderWeekly();
renderBest();
renderCart();
