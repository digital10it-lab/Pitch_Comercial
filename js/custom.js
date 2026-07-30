// js/custom.js
Reveal.initialize({
  hash: true,
  controls: true,
  progress: true,
  center: false,
  transition: 'fade',
  transitionSpeed: 'default',
  width: '100%',
  height: '100%',
  margin: 0
});

const allOverlays = ['world-overlay','mix-overlay','vg-overlay','factory-overlay','af-overlay','sw-overlay'];
Reveal.on('slidechanged', event => {
  allOverlays.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
});

document.getElementById('portfolioVideo').addEventListener('click', function() {
  this.muted = !this.muted;
});

function playNivelAnim(slide) {
  const els = slide.querySelectorAll('.nivel-shape, .nivel-title, .nivel-body');
  els.forEach(el => {
    el.classList.remove('anim-play');
    void el.offsetWidth;
    el.classList.add('anim-play');
  });
}

function playCharcoreAnim(slide) {
  const el = slide.querySelector('.charcore-text');
  if (!el) return;
  el.classList.remove('anim-play');
  void el.offsetWidth;
  el.classList.add('anim-play');
}

function playFactoryAnim(slide) {
  const el = slide.querySelector('.factory-box');
  if (!el) return;
  el.classList.remove('anim-play');
  void el.offsetWidth;
  el.classList.add('anim-play');
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.querySelector('.nivel-shape')) {
    playNivelAnim(event.currentSlide);
  }
  if (event.currentSlide.querySelector('.charcore-text')) {
    playCharcoreAnim(event.currentSlide);
  }
  if (event.currentSlide.querySelector('.factory-box')) {
    playFactoryAnim(event.currentSlide);
  }
});

Reveal.on('ready', event => {
  if (event.currentSlide.querySelector('.nivel-shape')) {
    playNivelAnim(event.currentSlide);
  }
  if (event.currentSlide.querySelector('.charcore-text')) {
    playCharcoreAnim(event.currentSlide);
  }
  if (event.currentSlide.querySelector('.factory-box')) {
    playFactoryAnim(event.currentSlide);
  }
});

const worldSegments = [
  {t:"Toda"},{t:"historia"},{t:"necesita"},{t:"contarse"},{t:"en"},{t:"un"},{t:"lugar.",hl:true},
  {t:"Desde"},{t:"el"},{t:"espacio",hl:true},{t:"más"},{t:"pequeño"},{t:"hasta"},{t:"el"},
  {t:"mundo",hl:true},{t:"más"},{t:"extenso."}
];

const worldWordsHTML = worldSegments
  .map(s => `<span class="word${s.hl ? ' hl' : ''}">${s.t}</span>`)
  .join(' ');

const worldOverlay = document.createElement('div');
worldOverlay.id = 'world-overlay';
worldOverlay.style.display = 'none';
worldOverlay.innerHTML = `
  <img class="world-bubble-img" src="assets/img/BurbujaWorldCore.png">
  <div class="world-text-wrap">
    <p id="world-text">${worldWordsHTML}</p>
  </div>
  <h3 class="world-title" id="world-title">WorldCore</h3>
`;
document.body.appendChild(worldOverlay);

let worldTimeouts = [];

function playWorldAnim() {
  worldTimeouts.forEach(t => clearTimeout(t));
  worldTimeouts = [];
  const words = worldOverlay.querySelectorAll('.word');
  const title = document.getElementById('world-title');
  words.forEach(w => w.classList.remove('visible'));
  title.classList.remove('show');

  words.forEach((w, i) => {
    const t = setTimeout(() => w.classList.add('visible'), i * 110);
    worldTimeouts.push(t);
  });

  const titleDelay = 500;
  const t2 = setTimeout(() => title.classList.add('show'), titleDelay);
  worldTimeouts.push(t2);
}

function resetWorldAnim() {
  worldTimeouts.forEach(t => clearTimeout(t));
  worldTimeouts = [];
  worldOverlay.querySelectorAll('.word').forEach(w => w.classList.remove('visible'));
  document.getElementById('world-title').classList.remove('show');
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'worldcore-slide') {
    worldOverlay.style.display = 'block';
    playWorldAnim();
  } else {
    worldOverlay.style.display = 'none';
    resetWorldAnim();
  }
});

Reveal.on('ready', event => {
  if (event.currentSlide.id === 'worldcore-slide') {
    worldOverlay.style.display = 'block';
    playWorldAnim();
  }
});

const mixOverlay = document.createElement('div');
mixOverlay.id = 'mix-overlay';
mixOverlay.style.display = 'none';
mixOverlay.innerHTML = `
  <img class="mix-image" src="assets/img/HPCompo.png">
  <div class="mix-panel">
    <img class="mix-panel-bg" src="assets/img/BurbujaMarketingMix.png">
    <p class="lead-sub">Une nuestros dos cores para crear una pieza completa. Con personajes memorables y un escenario que los complemente potencia tus campañas, proyectos o productos para alcanzar a tu público objetivo</p>
    <h3 class="core-title">Marketing Mix</h3>
  </div>
`;
document.body.appendChild(mixOverlay);

function playMixAnim() {
  const title = mixOverlay.querySelector('.core-title');
  const text = mixOverlay.querySelector('.lead-sub');
  [title, text].forEach(el => {
    el.classList.remove('anim-play');
    void el.offsetWidth;
  });
  title.classList.add('anim-play');
  text.classList.add('anim-play');
}

function resetMixAnim() {
  const title = mixOverlay.querySelector('.core-title');
  const text = mixOverlay.querySelector('.lead-sub');
  title.classList.remove('anim-play');
  text.classList.remove('anim-play');
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'marketing-mix-slide') {
    mixOverlay.style.display = 'block';
    playMixAnim();
  } else {
    mixOverlay.style.display = 'none';
    resetMixAnim();
  }
});
Reveal.on('ready', event => {
  if (event.currentSlide.id === 'marketing-mix-slide') {
    mixOverlay.style.display = 'block';
    playMixAnim();
  }
});

const vgSegments = [
  {t:"Expande"},{t:"tu"},{t:"equipo"},{t:"con"},{t:"nuestros"},{t:"Cores.",hl:true},
  {t:"Diseñamos"},{t:"personajes"},{t:"y"},{t:"escenarios"},{t:"optimizados"},{t:"para"},
  {t:"Unreal",hl:true},{t:"y"},{t:"Unity.",hl:true}
];

const vgWordsHTML = vgSegments
  .map(s => `<span class="word${s.hl ? ' hl' : ''}">${s.t}</span>`)
  .join(' ');

const vgOverlay = document.createElement('div');
vgOverlay.id = 'vg-overlay';
vgOverlay.style.display = 'none';
vgOverlay.innerHTML = `
  <div class="vg-bubble" id="vg-bubble">
    <img class="vg-bubble-bg" src="assets/img/BurbujaVideogameMix.png">
    <p id="vg-text">${vgWordsHTML}</p>
  </div>
  <h3 class="vg-title" id="vg-title">Videogame Mix</h3>
`;
document.body.appendChild(vgOverlay);

let vgTimeouts = [];

function playVgAnim() {
  vgTimeouts.forEach(t => clearTimeout(t));
  vgTimeouts = [];
  const words = vgOverlay.querySelectorAll('.word');
  const title = document.getElementById('vg-title');
  words.forEach(w => w.classList.remove('visible'));
  title.classList.remove('show');

  words.forEach((w, i) => {
    const t = setTimeout(() => w.classList.add('visible'), i * 110);
    vgTimeouts.push(t);
  });

  const titleDelay = 100;
  const t2 = setTimeout(() => title.classList.add('show'), titleDelay);
  vgTimeouts.push(t2);
}

function resetVgAnim() {
  vgTimeouts.forEach(t => clearTimeout(t));
  vgTimeouts = [];
  vgOverlay.querySelectorAll('.word').forEach(w => w.classList.remove('visible'));
  document.getElementById('vg-title').classList.remove('show');
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'videogamemix-slide') {
    vgOverlay.style.display = 'block';
    playVgAnim();
  } else {
    vgOverlay.style.display = 'none';
    resetVgAnim();
  }
});
Reveal.on('ready', event => {
  if (event.currentSlide.id === 'videogamemix-slide') {
    vgOverlay.style.display = 'block';
    playVgAnim();
  }
});

const factoryOverlay = document.createElement('div');
factoryOverlay.id = 'factory-overlay';
factoryOverlay.style.display = 'none';
factoryOverlay.innerHTML = `
  <video class="factory-img" src="assets/img/MIC_Compo.mp4" autoplay muted loop playsinline></video>
  <img class="factory-box-bg" src="assets/img/BurbujaRealitiesFactory.png">
  <div class="factory-box">
    <p class="lead-sub">Fundimos lo digital con lo real. Eleva tu proyecto con nuestros servicios más especializados y personalizados para generar resultados que desafían la percepción.
</p>
    <h3 class="factory-title">Realities<br>Factory</h3>
  </div>
`;
document.body.appendChild(factoryOverlay);

function playFactoryOverlayAnim() {
  const box = factoryOverlay.querySelector('.factory-box');
  box.classList.remove('anim-play');
  void box.offsetWidth;
  box.classList.add('anim-play');

  const video = factoryOverlay.querySelector('.factory-img');
  if (video) {
    video.currentTime = 0;
    video.play();
  }
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'realities-factory-slide') {
    factoryOverlay.style.display = 'block';
    playFactoryOverlayAnim();
  } else {
    factoryOverlay.style.display = 'none';
  }
});
Reveal.on('ready', event => {
  if (event.currentSlide.id === 'realities-factory-slide') {
    factoryOverlay.style.display = 'block';
    playFactoryOverlayAnim();
  }
});

const afSegments = [
  {t:"Construye"},{t:"tu"},{t:"producto"},{t:"animado",hl:true},{t:"desde"},{t:"cero.",br:true},
  {t:"Te"},{t:"ayudamos"},{t:"a"},{t:"fabricar"},{t:"la"},{t:"historia",hl:true},{t:"que",br:true},
  {t:"tu"},{t:"público"},{t:"amará."}
];

const afWordsHTML = afSegments
  .map(s => `<span class="word${s.hl ? ' hl' : ''}">${s.t}</span>${s.br ? '<br>' : ''}`)
  .join(' ');

const afOverlay = document.createElement('div');
afOverlay.id = 'af-overlay';
afOverlay.style.display = 'none';
afOverlay.innerHTML = `
  <img class="af-image" src="assets/img/Portafolioonline_D10.png">
  <div class="af-bubble">
    <img class="af-bubble-bg" src="assets/img/BurbujaVideogameMix.png">
    <p id="af-text">${afWordsHTML}</p>
  </div>
  <h3 class="af-title" id="af-title">Animation Factory</h3>
`;
document.body.appendChild(afOverlay);

let afTimeouts = [];

function playAfAnim() {
  afTimeouts.forEach(t => clearTimeout(t));
  afTimeouts = [];
  const words = afOverlay.querySelectorAll('.word');
  const title = document.getElementById('af-title');
  words.forEach(w => w.classList.remove('visible'));
  title.classList.remove('show');

  words.forEach((w, i) => {
    const t = setTimeout(() => w.classList.add('visible'), i * 110);
    afTimeouts.push(t);
  });

  const titleDelay = 100;
  const t2 = setTimeout(() => title.classList.add('show'), titleDelay);
  afTimeouts.push(t2);
}

function resetAfAnim() {
  afTimeouts.forEach(t => clearTimeout(t));
  afTimeouts = [];
  afOverlay.querySelectorAll('.word').forEach(w => w.classList.remove('visible'));
  document.getElementById('af-title').classList.remove('show');
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'animation-factory-slide') {
    afOverlay.style.display = 'block';
    playAfAnim();
  } else {
    afOverlay.style.display = 'none';
    resetAfAnim();
  }
});
Reveal.on('ready', event => {
  if (event.currentSlide.id === 'animation-factory-slide') {
    afOverlay.style.display = 'block';
    playAfAnim();
  }
});

const swOverlay = document.createElement('div');
swOverlay.id = 'sw-overlay';
swOverlay.style.display = 'none';
swOverlay.innerHTML = `
  <img class="sw-bg" src="assets/img/Fondooscuro.png">
  <video class="sw-video" src="assets/img/WebGL.mp4" muted loop playsinline autoplay></video>
  <div class="sw-title-block">
    <h3 class="sw-title">Showrooms<br>Factory</h3>
  </div>
  <div class="sw-blob">
    <img class="sw-blob-bg" src="assets/img/BurbujaShowroomsFactory.png">
    <p>¿Quieres mostrar tus productos de forma más inmersiva? Únete a la estrategia que está enamorando a las grandes marcas de la moda.</p>
  </div>
`;
document.body.appendChild(swOverlay);

function playSwAnim() {
  const title = swOverlay.querySelector('.sw-title-block');
  const blob = swOverlay.querySelector('.sw-blob');
  [title, blob].forEach(el => {
    el.classList.remove('anim-play');
    void el.offsetWidth;
  });
  title.classList.add('anim-play');
  blob.classList.add('anim-play');
  const video = swOverlay.querySelector('.sw-video');
  video.currentTime = 0;
  video.play();
  video.onended = () => { video.currentTime = 0; video.play(); };
}
function resetSwAnim() {
  swOverlay.querySelector('.sw-title-block').classList.remove('anim-play');
  swOverlay.querySelector('.sw-blob').classList.remove('anim-play');
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'showrooms-factory-slide') {
    swOverlay.style.display = 'block';
    playSwAnim();
  } else {
    swOverlay.style.display = 'none';
    resetSwAnim();
  }
});
Reveal.on('ready', event => {
  if (event.currentSlide.id === 'showrooms-factory-slide') {
    swOverlay.style.display = 'block';
    playSwAnim();
  }
});

const tlClosingWords = ["...Y","continuaremos","haciendo","lo","que","mejor","sabemos","hacer."];
const tlClosingEl = document.getElementById('tl-closing-text');
tlClosingEl.innerHTML = tlClosingWords.map(w => `<span class="word">${w}</span>`).join(' ');

let tlTimeouts = [];

function playTl2026Anim(slide) {
  tlTimeouts.forEach(t => clearTimeout(t));
  tlTimeouts = [];

  const col = slide.querySelector('#tl-col-2026');
  col.classList.remove('anim-play');
  void col.offsetWidth;
  col.classList.add('anim-play');

  const words = tlClosingEl.querySelectorAll('.word');
  words.forEach(w => w.classList.remove('visible'));

  words.forEach((w, i) => {
    const t = setTimeout(() => w.classList.add('visible'), 700 + i * 180);
    tlTimeouts.push(t);
  });
}

function resetTl2026Anim() {
  tlTimeouts.forEach(t => clearTimeout(t));
  tlTimeouts = [];
  tlClosingEl.querySelectorAll('.word').forEach(w => w.classList.remove('visible'));
  const col = document.getElementById('tl-col-2026');
  if (col) col.classList.remove('anim-play');
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'timeline-2026-slide') {
    playTl2026Anim(event.currentSlide);
  } else {
    resetTl2026Anim();
  }
});

Reveal.on('ready', event => {
  if (event.currentSlide.id === 'timeline-2026-slide') {
    playTl2026Anim(event.currentSlide);
  }
});

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const prefix = el.dataset.prefix || '';
  const duration = 4000; // ms
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(eased * target);
    el.textContent = prefix + current;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = prefix + target;
    }
  }
  requestAnimationFrame(step);
}

function playClientsCountAnim() {
  const stats = document.querySelectorAll('#clients-slide .client-stat-num');
  stats.forEach(el => {
    el.textContent = (el.dataset.prefix || '') + '0';
    animateCount(el);
  });
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.id === 'clients-slide') {
    playClientsCountAnim();
  }
});

Reveal.on('ready', event => {
  if (event.currentSlide.id === 'clients-slide') {
    playClientsCountAnim();
  }
});

function playTestifyAnim(slide) {
  const marks = slide.querySelectorAll('.quote-mark');
  const quotes = slide.querySelectorAll('.testify-quote');
  const authors = slide.querySelectorAll('.testify-author');
  [...marks, ...quotes, ...authors].forEach(el => {
    el.classList.remove('anim-play');
    void el.offsetWidth;
    el.classList.add('anim-play');
  });
}

Reveal.on('slidechanged', event => {
  if (event.currentSlide.querySelector('.testify-grid')) {
    playTestifyAnim(event.currentSlide);
  }
});

Reveal.on('ready', event => {
  if (event.currentSlide.querySelector('.testify-grid')) {
    playTestifyAnim(event.currentSlide);
  }
});
