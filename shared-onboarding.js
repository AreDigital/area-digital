/* =========================================================
   CÓDIGO COMPARTIDO de cliente.html y contrato.html
   Lo propio de cada página va en window.ONBOARDING (en cada HTML,
   antes de cargar este archivo): storeKey, docTitle, overridesEN,
   startTab, beforeInit.
   ========================================================= */
const OB = window.ONBOARDING || {};

/* =========================================================
   CONFIGURACIÓN
   ========================================================= */
const CONFIG = {
  ACTIVO: true,                     // true = enlace activo · false = muestra "Este enlace no está activo"
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxaoZRHyHVN9LRWJOg_YzPretS7gGNSAtBbHOdrMIzMV-GiYGxg25QnwMDz1Nd-MELN6A/exec',
  WHATSAPP: '573044790264'
};

/* Datos de Área Digital para el contrato */
const EMPRESA = {
  REPRESENTANTE: 'Isabella Posada Palacio',
  CC: '1.000.533.127',
  CIUDAD: 'Medellín',
  BANCO: 'Bancolombia',
  TIPO_CUENTA: 'ahorros',
  CUENTA: '31616045604',
  TITULAR: 'Isabella Posada Palacio'
};

/* =========================================================
   PLANES
   ========================================================= */
const PLANS = [
  { id:'presencia', name:'Presencia Activa', price:800000, priceUSD:250,
    f:[
      ['12 piezas de contenido al mes (2 a 3 publicaciones semanales)','12 content pieces per month (2 to 3 posts per week)'],
      ['Adaptación de las publicaciones a historias','Posts adapted to stories'],
      ['Planeación de contenido','Content planning'],
      ['Diseño y personalización','Design and customization'],
      ['Acompañamiento','Guidance']
    ],
    note:['Hacemos la planeación y el diseño, y entregamos el contenido listo para publicar.','We handle the planning and design, and deliver the content ready to publish.'] },
  { id:'gestion', name:'Gestión Completa', price:1600000, priceUSD:500,
    f:[
      ['Hasta 30 piezas de contenido al mes (posts, carruseles, reels e historias)','Up to 30 content pieces per month (posts, carousels, reels and stories)'],
      ['Planeación estratégica','Strategic planning'],
      ['Diseño y personalización','Design and customization'],
      ['Planeación y entrega de contenido listo para publicar','Planning and delivery of content ready to publish'],
      ['Configuración y conexión de redes','Social media setup and connection'],
      ['2 publicaciones de pauta al mes con estrategia definida','2 paid ad posts per month with a defined strategy'],
      ['Acompañamiento','Guidance'],
      ['ADN de marca, moodboard y manual de marca','Brand DNA, moodboard and brand guidelines']
    ] }
];
const ADDON = { name:'Gemini Pro', price:50000, priceUSD:20 };

/* Cuánto se paga realmente cada vez, según la frecuencia elegida (el valor del plan es mensual) */
const FREQ_INFO = {
  mensual:   { div:1, es:'/ mes',          en:'/ month' },
  quincenal: { div:2, es:'cada quincena',  en:'every two weeks' },
  semanal:   { div:4, es:'cada semana',    en:'every week' }
};

/* =========================================================
   PREGUNTAS DEL BRIEF
   t: area | text | email | tel | checks | radio
   req: true = obligatoria (el resto es opcional)
   ========================================================= */
const BRIEF = [
  { es:'Comencemos por conocerte', en:'Let’s start by getting to know you', q:[
    { id:'nombre', t:'text', req:true, es:'Nombre y apellido', en:'First and last name', ac:'name' },
    { id:'cedula', t:'text', req:true, es:'Cédula o NIT', en:'ID number or NIT', num:true },
    { id:'whatsapp', t:'tel', req:true, es:'¿Cuál es tu número de WhatsApp?', en:'What is your WhatsApp number?', ac:'tel' },
    { id:'correo', t:'email', req:true, es:'¿Cuál es tu correo electrónico?', en:'What is your email?', ac:'email',
      hes:'Ahí te enviamos la copia del contrato.', hen:'We will send your copy of the contract there.' }
  ]},
  { es:'Ahora hablemos de tu marca', en:'Now let’s talk about your brand', q:[
    { id:'marca', t:'text', es:'¿Cómo se llama tu marca o empresa?', en:'What is the name of your brand or company?', ac:'organization' },
    { id:'que_hace', t:'area', es:'Cuéntanos brevemente qué hace tu marca y qué ofrece a sus clientes.', en:'Tell us briefly what your brand does and what it offers its customers.' },
    { id:'web', t:'radio', es:'¿Actualmente tienes página web?', en:'Do you currently have a website?',
      o:[['Sí','Yes'],['No','No']], detail:['Si tu respuesta es sí, compártenos el enlace.','If yes, share the link with us.'] },
    { id:'redes', t:'checks', es:'¿En qué redes sociales está presente tu marca actualmente?', en:'Which social networks is your brand currently on?',
      o:[['Instagram','Instagram'],['Facebook','Facebook'],['TikTok','TikTok'],['LinkedIn','LinkedIn'],['Aún no tiene redes sociales','No social networks yet']], other:['Otra','Other'] }
  ]},
  { es:'¿En qué podemos ayudarte?', en:'How can we help you?', q:[
    { id:'servicios', t:'checks', es:'Selecciona los servicios que te interesan.', en:'Select the services you are interested in.',
      o:[['Crear una marca desde cero','Create a brand from scratch'],['Rediseñar mi marca','Redesign my brand'],['Diseño de logo e identidad visual','Logo and visual identity design'],['Creación de contenido','Content creation'],['Gestión de redes sociales','Social media management'],['Página web o Landing Page','Website or landing page'],['Publicidad en Meta Ads','Meta Ads advertising'],['Asesoría estratégica','Strategic consulting'],['Prefiero que ustedes me recomienden','I’d rather you recommend']], other:['Otro','Other'] }
  ]},
  { es:'Cuéntanos un poco más', en:'Tell us a little more', q:[
    { id:'motivacion', t:'area', es:'¿Qué te motivó a iniciar este proyecto o qué te gustaría lograr con él?', en:'What motivated you to start this project, or what would you like to achieve with it?' }
  ]},
  { es:'Imagina a tu cliente ideal', en:'Picture your ideal customer', q:[
    { id:'cliente_ideal', t:'area', es:'Describe a la persona a la que te gustaría llegar con tu marca.', en:'Describe the person you would like to reach with your brand.',
      hes:'No importa si aún no lo tienes completamente definido. Cuéntanos cómo imaginas a ese cliente.', hen:'It doesn’t matter if you haven’t fully defined it yet. Tell us how you picture that customer.' },
    { id:'no_cliente', t:'area', es:'¿Hay algún tipo de cliente al que definitivamente NO quieres llegar o con el que no te gustaría trabajar?', en:'Is there any type of customer you definitely do NOT want to reach or work with?' }
  ]},
  { es:'Hablemos de tu marca', en:'Let’s talk about your brand', q:[
    { id:'especial', t:'area', es:'¿Qué crees que hace especial a tu negocio o qué te gustaría que las personas recordaran de él?', en:'What do you think makes your business special, or what would you like people to remember about it?' },
    { id:'competencia', t:'area', es:'¿Quiénes consideras que son tu competencia? ¿Hay alguna marca a la que definitivamente NO te gustaría parecerte?', en:'Who do you consider your competitors? Is there any brand you definitely would NOT want to look like?' }
  ]},
  { es:'Inspíranos', en:'Inspire us', q:[
    { id:'referentes', t:'area', es:'¿Hay marcas, empresas o estilos que te gusten y te sirvan como referencia?', en:'Are there brands, companies or styles you like and that work as a reference?',
      hes:'Puedes compartir nombres, enlaces o incluso redes sociales.', hen:'You can share names, links or even social media accounts.' },
    { id:'no_gusta', t:'area', es:'¿Hay algo que definitivamente no te gustaría para tu marca?', en:'Is there anything you definitely would not want for your brand?' },
    { id:'colores', t:'area', es:'¿Hay colores que sientes que representan a tu marca? ¿Alguno que definitivamente no quieras usar?', en:'Are there colors you feel represent your brand? Any you definitely don’t want to use?' }
  ]},
  { es:'Percepción y tono de tu marca', en:'Perception and tone of your brand', q:[
    { id:'percepcion', t:'checks', es:'¿Cómo te gustaría que se perciba tu marca?', en:'How would you like your brand to be perceived?',
      o:[['Minimalista','Minimalist'],['Premium','Premium'],['Premium accesible','Accessible premium'],['Lujo / Exclusiva','Luxury / Exclusive'],['Artesanal','Handcrafted'],['Moderna / Tecnológica','Modern / Tech'],['Clásica / Tradicional','Classic / Traditional'],['Divertida / Juvenil','Fun / Youthful'],['Cercana / Accesible','Approachable / Accessible'],['Prefiero que ustedes me recomienden','I’d rather you recommend']], other:['Otra','Other'] },
    { id:'tono', t:'checks', es:'¿Cómo quieres que hable tu marca?', en:'How do you want your brand to speak?',
      hes:'Selecciona las opciones con las que más te identifiques.', hen:'Select the options you identify with the most.',
      o:[['Cercana','Approachable'],['Elegante','Elegant'],['Divertida','Fun'],['Educativa','Educational'],['Directa','Direct'],['Sofisticada','Sophisticated'],['Inspiradora','Inspiring'],['Formal','Formal'],['Prefiero que ustedes me recomienden','I’d rather you recommend']], other:['Otra','Other'] }
  ]},
  { es:'¿Con qué contamos actualmente?', en:'What do we have right now?', q:[
    { id:'activos', t:'checks', es:'Marca las opciones que ya tienes.', en:'Check the options you already have.',
      o:[['Logo','Logo'],['Manual de marca','Brand guidelines'],['Colores definidos','Defined colors'],['Tipografía','Typography'],['Fotografías','Photos'],['Videos','Videos'],['Página web','Website'],['Redes sociales','Social media'],['Dominio','Domain'],['Ninguno de los anteriores','None of the above']] }
  ]},
  { es:'Para finalizar', en:'To finish', q:[
    { id:'algo_mas', t:'area', opt:true, es:'¿Hay algo más que te gustaría contarnos o que consideres importante para este proyecto?', en:'Is there anything else you would like to tell us or that you consider important for this project?' }
  ]}
];

/* =========================================================
   TEXTOS DE INTERFAZ (EN). El español se toma del HTML.
   ========================================================= */
const translationsEN = {
  'page.eyebrow':'Área Digital',
  'page.title':'Let’s start your project',
  'page.copy':'&copy; 2024 Área Digital | All rights reserved.',
  'tab.plans':'Plans', 'tab.brief':'Brief', 'tab.contract':'Contract',
  'plans.title':'Social media management',
  'plans.sub':'Choose the plan for your brand. Then fill in the brief so we can get to know you, and at the end, review the contract and we\'ll get started with the planning.',
  'plans.currencyLabel':'Show prices in:',
  'plans.addon':'<strong>Optional add-on (any plan):</strong> if you want Gemini Pro, we include it for <span id="addonPriceDisplay">$50,000</span> more per month, while you work with us and the Google promotion is active.',
  'plans.contentT':'About the content',
  'plans.contentP':'For your brand to build credibility, we work with your own material: photos, videos and logo. In some cases we use artificial intelligence, but we always make sure the content feels like your brand.',
  'plans.condT':'Conditions',
  'plans.condL':'<li>Payment in advance: monthly, every two weeks or weekly, as you prefer.</li><li>Ad spend is paid separately.</li><li>If you want to understand the strategy or learn how we make the content, we teach you the process.</li>',
  'plans.next':'Next step: fill in the brief so we can get to know your brand and continue the process.',
  'ui.planChosen':'Chosen plan:', 'ui.changePlan':'Change plan',
  'ui.section':'Section', 'ui.of':'of', 'ui.saved':'✓ Saved on this device',
  'intro.welcome':'Welcome 👋',
  'intro.p1':'We’re glad you decided to work with us. This short form will help us get to know your project, understand your goals and build a strategy designed for your brand.',
  'intro.p2':'Don’t worry if you can’t answer a question. Tap <strong>Not sure yet</strong> and continue; we’ll help you complete it during the process.',
  'intro.note':'Questions marked with <span class="q-req">*</span> are required. Your answers are saved automatically on this device, so you can close the page and continue later.',
  'err.sendTitle':'Could not send.',
  'err.sendText':'Check your connection and try again. Your answers are still saved, nothing was lost.',
  'err.retry':'Try again',
  'err.accept':'To send, check that you have read and accept the contract.',
  'done.title':'We got your brief!',
  'done.text2':'Thank you for taking the time. The last step is to review and accept the contract.',
  'done.toContract':'Continue to the contract',
  'done.pdf':'Download PDF',
  'done.edit':'Make changes and send again',
  'c.title':'Service agreement',
  'c.sub':'Your details were filled in with what you wrote in the brief. Check them, complete what is missing and read the contract before accepting it.',
  'c.fieldsT':'Your details for the contract',
  'c.nombre':'First and last name', 'c.cc':'ID number or NIT', 'c.ciudad':'City where you live or where your company is',
  'c.pago':'How do you prefer to pay?', 'c.pagoM':'Monthly', 'c.pagoQ':'Every two weeks', 'c.pagoS':'Weekly',
  'c.langNote':'The contract is in Spanish because it is governed by Colombian law.',
  'c.acepto':'I have read and accept the contract',
  'c.send':'Accept and send contract',
  'cdone.title':'Contract sent!',
  'cdone.text':'We sent a copy to your email. The contract becomes effective with the first payment. When you make it, send us the receipt on WhatsApp.',
  'cdone.payT':'Payment details', 'cdone.savings':'Savings account', 'cdone.holder':'Account holder:', 'cdone.value':'Amount to pay now:',
  'cdone.wa':'Send receipt', 'cdone.team':'Talk to the team', 'cdone.teamNote':'We’re here in case you’d like to go over anything or have a question.', 'cdone.pdf':'Contract', 'cdone.cobro':'Payment request',
  'off.title':'This link is not active',
  'off.text':'If you need access, message us and we will help you.',
  'off.btn':'Message us on WhatsApp'
};
/* Textos que cambian desde JS */
if (OB.overridesEN) Object.assign(translationsEN, OB.overridesEN);
const UI_ES = { 'ui.prev':'&larr; Anterior', 'ui.next':'Siguiente &rarr;', 'ui.send':'Enviar brief', 'ui.sending':'Enviando…', 'ui.other':'¿Cuál?',
  'ui.choose':'Elegir este plan', 'ui.chosen':'✓ Plan elegido', 'ui.month':'/ mes', 'ui.planLabel':'Plan',
  'c.send':'Aceptar y enviar contrato', 'ui.dunno':'No sé todavía', 'err.pick':'Elige al menos una opción.',
  'hint.brief':'Primero elige un plan.', 'hint.contract':'El contrato se habilita cuando envíes el brief.',
  'err.req':'Responde esta pregunta.', 'err.email':'Escribe un correo válido.', 'err.other':'Cuéntanos cuál es la otra opción.', 'err.accept':'Para enviar, marca que leíste y aceptas el contrato.' };
Object.assign(translationsEN, { 'ui.prev':'&larr; Back', 'ui.next':'Next &rarr;', 'ui.send':'Send brief', 'ui.sending':'Sending…', 'ui.other':'Which one?',
  'ui.choose':'Choose this plan', 'ui.chosen':'✓ Plan chosen', 'ui.dunno':'Not sure yet', 'err.pick':'Choose at least one option.', 'ui.month':'/ month', 'ui.planLabel':'Plan',
  'hint.brief':'Choose a plan first.', 'hint.contract':'The contract unlocks when you send the brief.',
  'err.req':'Please answer this question.', 'err.email':'Please enter a valid email.', 'err.other':'Tell us which other option.' });

let currentLang = 'es';
let currentCurrency = 'cop';
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function t(key){ return currentLang === 'en' ? (translationsEN[key] || UI_ES[key] || '') : (UI_ES[key] || translationsES[key] || ''); }
const money = n => currentCurrency === 'usd' ? 'US$' + Math.round(n).toLocaleString('en-US') : '$' + Math.round(n).toLocaleString('es-CO');
const priceOf = obj => currentCurrency === 'usd' ? obj.priceUSD : obj.price;

/* =========================================================
   ESTADO (se guarda en este dispositivo)
   ========================================================= */
const STORE_KEY = OB.storeKey || 'ad_onboarding_v1';
let S = { plan:null, addon:false, briefSent:false, briefId:null, pendingBriefId:null, contractSent:false, pendingContractId:null, contractData:null, step:0, values:{} };
(function load(){ try { const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); if (s) S = Object.assign(S, s); } catch(e){} })();

const briefForm = document.getElementById('briefForm');
const contractForm = document.getElementById('contractForm');
const allInputs = () => document.querySelectorAll('#briefForm input, #briefForm textarea, #contractForm input');

function collectValues(){
  const v = {};
  allInputs().forEach(el => {
    if (!el.name) return;
    if (el.type === 'checkbox' || el.type === 'radio'){
      if (!v[el.name]) v[el.name] = [];
      if (el.checked) v[el.name].push(el.value);
    } else v[el.name] = el.value;
  });
  return v;
}
function persistNow(){
  S.values = collectValues();
  S.step = currentStep;
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch(e){}
}
let saveTimer = null;
function persist(showFlag){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    persistNow();
    if (showFlag){
      const flag = document.getElementById('savedFlag');
      flag.classList.add('show');
      clearTimeout(flag._t); flag._t = setTimeout(() => flag.classList.remove('show'), 1800);
    }
  }, 350);
}
function restoreValues(){
  const vals = S.values || {};
  allInputs().forEach(el => {
    if (!el.name || !(el.name in vals)) return;
    const v = vals[el.name];
    if (el.type === 'checkbox' || el.type === 'radio') el.checked = Array.isArray(v) && v.indexOf(el.value) !== -1;
    else el.value = v;
  });
}
const val = name => { const el = document.querySelector(`[name="${name}"]`); return el ? el.value.trim() : ''; };
const realVal = name => { const v = val(name); return (v === 'No sé todavía' || v === 'Not sure yet') ? '' : v; };

/* =========================================================
   PLANES
   ========================================================= */
function planObj(){ return PLANS.find(p => p.id === S.plan) || null; }
function planTotal(){ const p = planObj(); return p ? priceOf(p) + (S.addon ? priceOf(ADDON) : 0) : 0; }
function planText(){
  const p = planObj(); if (!p) return '';
  return p.name + ' — ' + money(priceOf(p)) + ' / mes' + (S.addon ? ' + ' + ADDON.name + ' ' + money(priceOf(ADDON)) + ' / mes' : '');
}

function buildPlans(){
  let h = '';
  PLANS.forEach(p => {
    translationsEN['plan.' + p.id + '.note'] = p.note ? p.note[1] : '';
    h += `<div class="plan" data-plan="${p.id}">
      <span class="plan-label" data-i18n="ui.planLabel">Plan</span>
      <div class="plan-name">${esc(p.name)}</div>
      <div class="plan-price">${money(priceOf(p))} <small data-i18n="ui.month">/ mes</small></div>
      <ul>`;
    p.f.forEach((f, i) => {
      translationsEN[`plan.${p.id}.f${i}`] = f[1];
      h += `<li data-i18n="plan.${p.id}.f${i}">${esc(f[0])}</li>`;
    });
    h += `</ul>`;
    if (p.note) h += `<p class="plan-note" data-i18n="plan.${p.id}.note">${esc(p.note[0])}</p>`;
    h += `<button type="button" class="btn btn-primary plan-choose" data-plan="${p.id}" data-i18n="ui.choose">Elegir este plan</button></div>`;
  });
  document.getElementById('plansWrap').innerHTML = h;
}

function refreshPlanUI(){
  document.querySelectorAll('.plan').forEach(card => {
    const sel = card.dataset.plan === S.plan;
    card.classList.toggle('selected', sel);
    const b = card.querySelector('.plan-choose');
    const key = sel ? 'ui.chosen' : 'ui.choose';
    b.setAttribute('data-i18n', key); b.innerHTML = t(key);
    b.classList.toggle('btn-ghost', sel); b.classList.toggle('btn-primary', !sel);
  });
  document.getElementById('addonCheck').checked = !!S.addon;
  document.getElementById('briefPlanName').textContent = planText();
  updateLocks();
  if (document.getElementById('contractDoc')) renderContract();
}

/* =========================================================
   BRIEF (formulario por pasos)
   ========================================================= */
function buildForm(){
  let html = '', n = 0;
  BRIEF.forEach((sec, si) => {
    translationsEN['b.s' + si] = sec.en;
    html += `<section class="step" data-step="${si}"><h2 class="step-title" data-i18n="b.s${si}">${esc(sec.es)}</h2>`;
    if (si === 0){
      html += `<div class="intro">
        <p><strong data-i18n="intro.welcome">Bienvenido 👋</strong></p>
        <p data-i18n="intro.p1">Nos alegra que hayas decidido trabajar con nosotros. Este breve formulario nos ayudará a conocer mejor tu proyecto, entender tus objetivos y construir una estrategia pensada para tu marca.</p>
        <p data-i18n="intro.p2">No te preocupes si no sabes responder alguna pregunta. Toca <strong>No sé todavía</strong> y continúa; nosotros te ayudamos a completarla durante el proceso.</p>
        <p class="note" data-i18n="intro.note">Las preguntas con <span class="q-req">*</span> son obligatorias. Tus respuestas se guardan solas en este dispositivo: puedes cerrar la página y continuar después.</p>
      </div>`;
    }
    sec.q.forEach(q => { if (si > 0) q.n = ++n; html += buildQuestion(q); });
    html += `<div class="step-nav">
        <button type="button" class="btn btn-ghost btn-prev" data-i18n="ui.prev">&larr; Anterior</button>
        ${si < BRIEF.length - 1
          ? `<button type="button" class="btn btn-primary btn-next" data-i18n="ui.next">Siguiente &rarr;</button>`
          : `<button type="submit" class="btn btn-primary btn-send" data-i18n="ui.send">Enviar brief</button>`}
      </div></section>`;
  });
  briefForm.innerHTML = html;
}

function buildQuestion(q){
  const key = q.id;
  const req = !q.opt;
  translationsEN['b.' + key] = q.en;
  if (q.hen) translationsEN['b.' + key + 'h'] = q.hen;
  const num = q.n ? `<span class="q-num">${String(q.n).padStart(2,'0')}</span>` : '';
  const star = req ? '<span class="q-req" aria-hidden="true">*</span>' : '';
  const forAttr = ['area','text','email','tel'].indexOf(q.t) !== -1 ? ` for="f_${key}"` : '';
  let h = `<div class="q" data-key="${key}" data-type="${q.t}" data-req="${req ? 1 : 0}">`;
  h += `<label class="q-label"${forAttr}>${num}<span data-i18n="b.${key}">${esc(q.es)}</span>${star}</label>`;
  if (q.hes) h += `<p class="q-help" data-i18n="b.${key}h">${esc(q.hes)}</p>`;

  if (q.t === 'area'){
    h += `<textarea id="f_${key}" name="${key}" rows="4"></textarea>`;
    if (q.n) h += `<button type="button" class="dunno-btn" data-i18n="ui.dunno">No sé todavía</button>`;
  } else if (q.t === 'text' || q.t === 'email' || q.t === 'tel'){
    const im = q.t === 'email' ? ' inputmode="email"' : q.t === 'tel' ? ' inputmode="tel"' : q.num ? ' inputmode="numeric"' : '';
    h += `<input type="${q.t}" id="f_${key}" name="${key}"${q.ac ? ` autocomplete="${q.ac}"` : ''}${im} />`;
    if (q.n) h += `<button type="button" class="dunno-btn" data-i18n="ui.dunno">No sé todavía</button>`;
  } else if (q.t === 'checks' || q.t === 'radio'){
    const type = q.t === 'checks' ? 'checkbox' : 'radio';
    h += `<div class="opts">`;
    q.o.forEach((o, i) => {
      translationsEN[`b.${key}o${i}`] = o[1];
      h += `<label class="opt"><input type="${type}" name="${key}" value="${esc(o[0])}" /><span data-i18n="b.${key}o${i}">${esc(o[0])}</span></label>`;
    });
    if (q.other){
      translationsEN[`b.${key}other`] = q.other[1];
      h += `<label class="opt"><input type="checkbox" name="${key}" value="__otro" class="other-toggle" /><span data-i18n="b.${key}other">${esc(q.other[0])}</span></label>`;
    }
    h += `</div>`;
    if (q.other) h += `<input type="text" class="other-input" name="${key}_otro" data-i18n-ph="ui.other" placeholder="¿Cuál?" />`;
    if (q.detail){
      translationsEN[`ph.${key}d`] = q.detail[1];
      h += `<input type="text" class="detail-input" name="${key}_detalle" data-i18n-ph="ph.${key}d" placeholder="${esc(q.detail[0])}" />`;
    }
  }
  h += `<p class="q-err" data-i18n="err.req">Responde esta pregunta.</p></div>`;
  return h;
}

/* =========================================================
   IDIOMA (mismo sistema del sitio + placeholders)
   ========================================================= */
buildPlans();
buildForm();
const translationsES = {};
const placeholdersES = {};
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (!(key in translationsES)) translationsES[key] = el.innerHTML;
});
document.querySelectorAll('[data-i18n-ph]').forEach(el => {
  const key = el.getAttribute('data-i18n-ph');
  if (!(key in placeholdersES)) placeholdersES[key] = el.getAttribute('placeholder');
});

function setLanguage(lang){
  currentLang = lang;
  const dict = lang === 'en' ? translationsEN : translationsES;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    let v = dict[key];
    if (lang === 'es' && UI_ES[key] !== undefined) v = UI_ES[key];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const v = lang === 'en' ? translationsEN[key] : (UI_ES[key] || placeholdersES[key]);
    if (v !== undefined) el.setAttribute('placeholder', v);
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-opt').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
  if (OB.docTitle) document.title = OB.docTitle[lang] || OB.docTitle.es;
  updateAddonPriceDisplay();
}
function toggleLang(){
  const next = currentLang === 'es' ? 'en' : 'es';
  setLanguage(next);
  try { localStorage.setItem('ad_lang', next); } catch(e){}
}

function updateAddonPriceDisplay(){
  const el = document.getElementById('addonPriceDisplay');
  if (el) el.textContent = money(priceOf(ADDON));
}

function setCurrency(cur){
  currentCurrency = cur;
  if (typeof buildPlans === 'function') buildPlans();
  if (typeof refreshPlanUI === 'function') refreshPlanUI();
  const bpn = document.getElementById('briefPlanName');
  if (bpn) bpn.textContent = planText();
  updateAddonPriceDisplay();
  document.querySelectorAll('.curr-opt').forEach(o => o.classList.toggle('active', o.dataset.currency === cur));
}
function toggleCurrency(){
  const next = currentCurrency === 'cop' ? 'usd' : 'cop';
  setCurrency(next);
  try { localStorage.setItem('ad_currency', next); } catch(e){}
}

/* =========================================================
   PESTAÑAS Y BLOQUEOS
   ========================================================= */
let currentTab = 'planes';
function isLocked(tab){
  if (tab === 'brief') return !S.plan;
  if (tab === 'contrato') return !S.briefSent;
  return false;
}
function updateLocks(){
  document.querySelectorAll('.tab-btn').forEach(b => {
    const locked = isLocked(b.dataset.tab);
    b.classList.toggle('locked', locked);
    const l = b.querySelector('.lock'); if (l) l.style.display = locked ? '' : 'none';
  });
}
function showHint(key){
  const h = document.getElementById('tabHint');
  h.setAttribute('data-i18n', key); h.innerHTML = t(key);
  h.classList.add('show'); clearTimeout(h._t); h._t = setTimeout(() => h.classList.remove('show'), 3000);
}
function setTab(tab, scroll){
  if (isLocked(tab)){ showHint(tab === 'brief' ? 'hint.brief' : 'hint.contract'); return; }
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(x => x.classList.toggle('active', x.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + tab));
  if (tab === 'contrato') { prefillContract(); renderContract(); }
  if (scroll) window.scrollTo({ top: 0, behavior:'smooth' });
}
document.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab, false)));

document.getElementById('plansWrap').addEventListener('click', e => {
  const b = e.target.closest('.plan-choose'); if (!b) return;
  S.plan = b.dataset.plan;
  refreshPlanUI(); persistNow();
  setTab('brief', true);
});
document.getElementById('addonCheck').addEventListener('change', e => {
  S.addon = e.target.checked; refreshPlanUI(); persistNow();
});
document.getElementById('changePlanBtn').addEventListener('click', () => setTab('planes', true));

/* =========================================================
   LÓGICA DE PREGUNTAS ("otro") Y VALIDACIÓN
   ========================================================= */
function refreshDynamic(){
  document.querySelectorAll('.q').forEach(q => {
    const other = q.querySelector('.other-toggle');
    const otherInput = q.querySelector('.other-input');
    if (other && otherInput) otherInput.classList.toggle('show', other.checked);
  });
}

function checkQuestion(q){
  const type = q.dataset.type;
  const req = q.dataset.req === '1';
  const err = q.querySelector('.q-err');
  let ok = true, msgKey = q.dataset.key === 'c_acepto' ? 'err.accept' : 'err.req';
  const otherT = q.querySelector('.other-toggle');
  const otherI = q.querySelector('.other-input');

  if (type === 'area' || type === 'text' || type === 'email' || type === 'tel'){
    const el = q.querySelector('textarea, input');
    const v = el.value.trim();
    if (req && !v) ok = false;
    else if (type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){ ok = false; msgKey = 'err.email'; }
  } else if (type === 'checks' || type === 'radio'){
    const any = q.querySelectorAll('.opts input:checked').length > 0;
    if (req && !any){ ok = false; if (q.dataset.key !== 'c_acepto') msgKey = 'err.pick'; }
    else if (otherT && otherT.checked && !otherI.value.trim()){ ok = false; msgKey = 'err.other'; }
  }
  q.classList.toggle('invalid', !ok);
  err.setAttribute('data-i18n', msgKey);
  err.innerHTML = t(msgKey);
  return ok;
}

function firstInvalid(root){
  let first = null;
  root.querySelectorAll('.q').forEach(q => { if (!checkQuestion(q) && !first) first = q; });
  return first;
}
function focusInvalid(q){
  q.scrollIntoView({ behavior:'smooth', block:'start' });
  const target = (q.querySelector('.other-input.show') && !q.querySelector('.other-input').value.trim() ? q.querySelector('.other-input') : null) ||
                 q.querySelector('textarea, input[type=text], input[type=email], input[type=tel]');
  if (target) setTimeout(() => target.focus({ preventScroll:true }), 450);
}

/* =========================================================
   PASOS DEL BRIEF
   ========================================================= */
let currentStep = 0;
const steps = () => briefForm.querySelectorAll('.step');
function showStep(i, scroll){
  const all = steps();
  currentStep = Math.max(0, Math.min(i, all.length - 1));
  all.forEach((s, k) => s.classList.toggle('active', k === currentStep));
  all[currentStep].querySelector('.btn-prev').hidden = currentStep === 0;
  document.getElementById('stepNow').textContent = currentStep + 1;
  document.getElementById('stepTotal').textContent = all.length;
  document.getElementById('progressFill').style.width = ((currentStep + 1) / all.length * 100) + '%';
  if (scroll) window.scrollTo({ top: document.querySelector('.tabs').offsetTop - 90, behavior:'smooth' });
  persistNow();
}
/* Guardar también al cerrar o cambiar de app */
window.addEventListener('pagehide', () => persistNow());
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') persistNow(); });

briefForm.addEventListener('click', e => {
  if (e.target.closest('.btn-next')){
    const bad = firstInvalid(steps()[currentStep]);
    if (bad){ focusInvalid(bad); return; }
    showStep(currentStep + 1, true);
  } else if (e.target.closest('.btn-prev')){
    showStep(currentStep - 1, true);
  } else if (e.target.closest('.dunno-btn')){
    const q = e.target.closest('.q');
    const field = q.querySelector('textarea, input');
    field.value = t('ui.dunno');
    field.dispatchEvent(new Event('input', { bubbles:true }));
  }
});
[briefForm, contractForm].forEach(f => {
  f.addEventListener('input', e => {
    const q = e.target.closest('.q');
    if (q && q.classList.contains('invalid')) checkQuestion(q);
    if (f === contractForm) renderContract();
    persist(f === briefForm);
  });
  f.addEventListener('change', e => {
    refreshDynamic();
    const q = e.target.closest('.q');
    if (q && q.classList.contains('invalid')) checkQuestion(q);
    if (f === contractForm) renderContract();
    persist(f === briefForm);
  });
  f.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') e.preventDefault(); });
});

/* =========================================================
   ENVÍO (común)
   ========================================================= */
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
async function postJSON(payload){
  try {
    if (!/^https:\/\/script\.google\.com\//.test(CONFIG.SCRIPT_URL)) throw new Error('SCRIPT_URL sin configurar');
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60000);
    const res = await fetch(CONFIG.SCRIPT_URL, { method:'POST', body: JSON.stringify(payload), signal: ctrl.signal });
    clearTimeout(timer);
    const data = await res.json();
    return !!(data && data.ok);
  } catch(err){ return false; }
}
function setBtnBusy(btn, busy, key){
  btn.disabled = busy;
  const k = busy ? 'ui.sending' : key;
  btn.setAttribute('data-i18n', k); btn.innerHTML = t(k);
}

/* ---------- Brief ---------- */
function buildAnswers(){
  const fd = collectValues();
  const out = [{ clave:'plan', seccion:'Plan elegido', pregunta:'Plan elegido', respuesta: planText() }];
  BRIEF.forEach(sec => {
    sec.q.forEach(q => {
      const key = q.id;
      let a = '';
      if (q.t === 'checks' || q.t === 'radio'){
        const list = (fd[key] || []).filter(v => v !== '__otro');
        if ((fd[key] || []).indexOf('__otro') !== -1 && (fd[key + '_otro'] || '').trim()) list.push(q.other[0] + ': ' + fd[key + '_otro'].trim());
        a = list.join(', ');
        if (q.detail && (fd[key + '_detalle'] || '').trim()) a += (a ? ' — ' : '') + fd[key + '_detalle'].trim();
      } else {
        a = (fd[key] || '').trim();
      }
      out.push({ clave:key, seccion: sec.es, pregunta: (q.n ? q.n + '. ' : '') + q.es, respuesta: a });
    });
  });
  return out;
}

let sendingBrief = false;
async function sendBrief(){
  if (sendingBrief) return;
  const all = steps();
  for (let i = 0; i < all.length; i++){
    const bad = firstInvalid(all[i]);
    if (bad){ showStep(i, false); focusInvalid(bad); return; }
  }
  sendingBrief = true;
  const btn = briefForm.querySelector('.btn-send');
  setBtnBusy(btn, true, 'ui.send');
  document.getElementById('sendError').classList.remove('show');
  if (!S.pendingBriefId){ S.pendingBriefId = newId(); }
  persistNow();

  const ok = await postJSON({
    tipo:'brief', id:S.pendingBriefId, marca: realVal('marca') || '(sin marca)', cliente: val('nombre'),
    plan: planText(), idioma: currentLang, respuestas: buildAnswers()
  });
  sendingBrief = false;
  setBtnBusy(btn, false, 'ui.send');

  if (ok){
    S.briefId = S.pendingBriefId; S.pendingBriefId = null; S.briefSent = true;
    persistNow();
    updateLocks();
    showBriefDone();
  } else {
    const box = document.getElementById('sendError');
    box.classList.add('show');
    box.scrollIntoView({ behavior:'smooth', block:'center' });
  }
}
briefForm.addEventListener('submit', e => { e.preventDefault(); sendBrief(); });
document.getElementById('retryBtn').addEventListener('click', sendBrief);

function showBriefDone(){
  document.getElementById('formView').classList.add('hidden');
  document.getElementById('doneView').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior:'smooth' });
}
document.getElementById('editAgainBtn').addEventListener('click', () => {
  document.getElementById('doneView').classList.add('hidden');
  document.getElementById('formView').classList.remove('hidden');
  showStep(0, true);
});
document.getElementById('goContractBtn').addEventListener('click', () => setTab('contrato', true));

/* ---------- PDF (copia imprimible) ---------- */
function printHTML(html, fileName){
  let pv = document.getElementById('printView');
  if (!pv){ pv = document.createElement('div'); pv.id = 'printView'; document.body.appendChild(pv); }
  pv.innerHTML = html;
  const prevTitle = document.title;
  document.title = fileName;
  window.print();
  setTimeout(() => { document.title = prevTitle; }, 1000);
}
const fileSafe = s => (s || '').normalize('NFD').replace(/[^\w]/g,'');
const fechaHoy = () => new Date().toLocaleDateString('es-CO', { day:'numeric', month:'long', year:'numeric' });

document.getElementById('pdfBtn').addEventListener('click', () => {
  const marca = realVal('marca') || val('nombre');
  let h = `<h1>Brief — ${esc(marca)}</h1><p class="pv-meta">${esc(val('nombre'))} · ${esc(fechaHoy())} · Área Digital</p>`;
  let lastSec = '';
  buildAnswers().forEach(r => {
    if (r.seccion !== lastSec){ h += `<h2>${esc(r.seccion)}</h2>`; lastSec = r.seccion; }
    h += `<p class="pv-q">${esc(r.pregunta)}</p><p class="pv-a">${esc(r.respuesta || '—')}</p>`;
  });
  printHTML(h, 'Brief_' + fileSafe(marca));
});

/* =========================================================
   CONTRATO
   ========================================================= */
function prefillContract(){
  const n = document.querySelector('[name=c_nombre]');
  const c = document.querySelector('[name=c_cc]');
  if (!n.value.trim()) n.value = val('nombre');
  if (!c.value.trim()) c.value = val('cedula');
}

function contractData(fecha){
  const p = planObj();
  const pago = (collectValues().c_pago || [])[0] || '';
  return {
    nombre: val('c_nombre'), cc: val('c_cc'), ciudad: val('c_ciudad'), pago,
    marca: realVal('marca'), correo: val('correo'), whatsapp: val('whatsapp'),
    planNombre: p ? p.name : '', planValor: p ? money(priceOf(p)) : '',
    planF: p ? p.f.map(f => f[0]) : [], addon: !!S.addon,
    total: money(planTotal()), totalNum: planTotal(), fecha: fecha || fechaHoy()
  };
}

/* Texto del contrato: bloques {h} título, {p} párrafo, {li:[]} lista. [[x]] = dato que se llena solo */
function contractBlocks(d){
  const F = (v, ph) => v ? `[[${v}]]` : `[[!${ph}]]`;
  const nombre = d.nombre || 'EL CLIENTE';
  const marcaFrase = d.marca ? `, en representación de la marca ${F(d.marca)}` : '';
  const B = [];
  B.push({ t:'title', x:'CONTRATO DE PRESTACIÓN DE SERVICIOS' });
  B.push({ p:`Entre los suscritos, ÁREA DIGITAL, representado por ${EMPRESA.REPRESENTANTE}, identificada con C.C. ${EMPRESA.CC}, en adelante "EL CONTRATISTA", y ${F(d.nombre, 'Nombre del cliente')}, identificado con C.C./NIT ${F(d.cc, 'Número')}${marcaFrase}, domiciliado en ${F(d.ciudad, 'Ciudad')}, en adelante "EL CLIENTE", acuerdan celebrar el presente contrato de prestación de servicios, regido por las siguientes cláusulas:` });

  B.push({ h:'PRIMERA: OBJETO' });
  B.push({ p:'El Contratista se obliga a prestar a EL CLIENTE servicios de marketing digital, que pueden incluir, según el plan contratado: gestión y publicidad en redes sociales, creación de contenido, branding e identidad de marca, y acompañamiento estratégico.' });

  B.push({ h:'SEGUNDA: PLAN, ALCANCE Y VALOR' });
  B.push({ p:'El plan contratado, sus entregables específicos y el valor mensual de los servicios corresponden a los definidos en la cotización enviada y aceptada por EL CLIENTE (Anexo — Cotización), la cual hace parte integral de este contrato. Cualquier cambio de plan deberá acordarse por escrito y quedará reflejado en una nueva cotización.' });

  B.push({ h:'TERCERA: DURACIÓN Y RENOVACIÓN' });
  B.push({ p:'El contrato tiene una duración inicial de tres (3) meses a partir de la fecha del primer pago realizado por EL CLIENTE — plazo recomendado para evaluar el comportamiento inicial de la marca. Al finalizar este periodo, se renueva automáticamente por periodos iguales, salvo que alguna de las partes manifieste por escrito su intención de no continuar, con mínimo 15 días calendario de anticipación.' });

  B.push({ h:'CUARTA: FORMA DE PAGO' });
  B.push({ p:`El valor se paga de forma anticipada y ${F(d.pago, 'mensual, quincenal o semanal')}, según lo elegido por EL CLIENTE, mediante transferencia a la cuenta de ${EMPRESA.TIPO_CUENTA} ${EMPRESA.BANCO} N.º ${EMPRESA.CUENTA}, a nombre de ${EMPRESA.TITULAR}. EL CLIENTE debe enviar el comprobante una vez realizada la transferencia. El incumplimiento en el pago faculta al Contratista a suspender los servicios hasta normalizar el pago, sin que esto constituya incumplimiento de su parte.` });
  B.push({ p:'Parágrafo: La inversión en pauta publicitaria (Meta Ads u otras plataformas) es independiente a los honorarios y se paga aparte, directamente por EL CLIENTE en la plataforma correspondiente.' });

  B.push({ h:'QUINTA: ENTREGABLES Y METODOLOGÍA' });
  B.push({ p:'Los entregables (cantidad y tipo de piezas, periodicidad) corresponden al plan contratado (Anexo — Cotización). El proceso de trabajo es:' });
  B.push({ li:[
    'Las primeras semanas del contrato son de exploración y ajuste de la línea gráfica y estratégica de la marca.',
    'Cada pieza entregada tiene un máximo de dos (2) rondas de ajustes. Cambios adicionales se cotizan como servicio aparte.',
    'EL CLIENTE cuenta con dos (2) días hábiles para dar retroalimentación sobre una pieza entregada. Si no se recibe respuesta en ese plazo, la pieza se da por aprobada tácitamente y se programa o publica según el cronograma.',
    'Una vez una pieza es aprobada o publicada, cualquier solicitud de cambio posterior se considera un servicio nuevo y se cotiza aparte; el Contratista no es responsable por el contenido una vez ha sido aprobado o publicado.',
    'El Contratista entrega las piezas gráficas, su respectivo copy y la parrilla de contenido organizada (calendario de publicación), listas para publicar. La publicación en el feed e historias de las redes sociales de EL CLIENTE es responsabilidad de este último, salvo que se acuerde explícitamente lo contrario. Si EL CLIENTE no puede publicar por sí mismo, el Contratista puede entregar los creativos día a día como apoyo adicional, sin que esto implique una obligación permanente de publicación.'
  ]});

  B.push({ h:'SEXTA: MATERIAL Y CONTENIDO' });
  B.push({ p:'El Contratista trabaja preferiblemente con material real y propio de la marca (fotos, videos, logo) para garantizar la credibilidad del contenido. En algunos casos puede apoyarse en inteligencia artificial para complementar el contenido, siempre respetando los lineamientos de marca definidos.' });
  B.push({ p:'EL CLIENTE debe entregar el material necesario con la anticipación acordada en el cronograma de trabajo. Si el material se entrega tarde, los plazos de entrega de las piezas se recorren en la misma proporción, sin que esto sea responsabilidad del Contratista.' });
  B.push({ p:'EL CLIENTE es responsable de la veracidad, legalidad y titularidad de derechos del material y la información que entrega al Contratista.' });

  B.push({ h:'SÉPTIMA: PAUTA PUBLICITARIA' });
  B.push({ p:'Cuando el plan incluya pauta, el Contratista es responsable de la configuración, ejecución, optimización y reporte de métricas de las campañas (alcance, interacción, tráfico y rendimiento de la inversión publicitaria). El cierre de venta o conversión final con el cliente o prospecto es responsabilidad exclusiva de EL CLIENTE o su equipo comercial. El Contratista no garantiza ni responde por resultados de venta derivados de la pauta, únicamente por la efectividad y optimización de la campaña.' });

  B.push({ h:'OCTAVA: ACOMPAÑAMIENTO' });
  B.push({ p:'El acompañamiento incluido en el servicio se brinda principalmente por WhatsApp, mediante tutoriales y masterclasses en video ya grabados, que se comparten según el proceso y la estrategia de trabajo. De ser necesario, las partes pueden acordar una o dos reuniones para resolver dudas puntuales; estas reuniones se programan de común acuerdo entre las partes y no son obligatorias. No incluye soporte técnico básico, instalación o configuración de aplicaciones, software o herramientas, ni formación personalizada en vivo. Si EL CLIENTE requiere apoyo adicional de este tipo, se cotiza como un servicio aparte.' });

  B.push({ h:'NOVENA: CANALES Y HORARIO DE ATENCIÓN' });
  B.push({ p:'La comunicación entre las partes se realiza por los canales acordados (WhatsApp, correo, reuniones programadas). El Contratista no está obligado a responder fuera del horario laboral acordado ni a atender solicitudes urgentes fuera del cronograma de trabajo establecido.' });

  B.push({ h:'DÉCIMA: OBLIGACIONES DEL CONTRATISTA' });
  B.push({ li:[
    'Ejecutar los servicios con diligencia y calidad profesional, conforme al plan y cronograma acordados.',
    'Mantener informado a EL CLIENTE sobre el avance y situaciones relevantes.',
    'Entregar reportes de métricas y resultados según la periodicidad acordada.',
    'Salvaguardar la confidencialidad de la información y accesos entregados por EL CLIENTE.'
  ]});

  B.push({ h:'DÉCIMA PRIMERA: OBLIGACIONES DE EL CLIENTE' });
  B.push({ li:[
    'Entregar oportunamente el material, información y accesos necesarios (redes sociales, plataformas) para la ejecución del servicio.',
    'Revisar y dar retroalimentación a las piezas dentro de los plazos acordados.',
    'Realizar los pagos anticipados en las fechas pactadas.',
    'Permitir la ejecución de las estrategias planteadas, sin perjuicio de que puedan ajustarse según el criterio profesional del Contratista.'
  ]});

  B.push({ h:'DÉCIMA SEGUNDA: RELACIÓN ENTRE LAS PARTES' });
  B.push({ p:'Este es un contrato de prestación de servicios independientes. No existe relación laboral, de subordinación ni exclusividad entre las partes. El Contratista determina sus propios métodos, horarios y herramientas de trabajo para cumplir con lo pactado.' });

  B.push({ h:'DÉCIMA TERCERA: RESULTADOS Y GARANTÍAS' });
  B.push({ p:'El Contratista se compromete a ejecutar sus funciones con diligencia y criterio profesional (obligación de medios, no de resultado). No garantiza resultados específicos de ventas, alcance o posicionamiento, ya que estos dependen de factores externos como el comportamiento del mercado, decisiones de algoritmos de las plataformas, políticas de terceros o la respuesta del público objetivo.' });

  B.push({ h:'DÉCIMA CUARTA: PROPIEDAD INTELECTUAL' });
  B.push({ p:'Los derechos sobre las piezas, diseños y demás creaciones realizadas por el Contratista se ceden a EL CLIENTE una vez verificado el pago correspondiente al periodo o proyecto. El Contratista se reserva el derecho de usar el trabajo realizado como parte de su portafolio o referencia comercial, salvo que EL CLIENTE indique expresamente lo contrario por escrito.' });

  B.push({ h:'DÉCIMA QUINTA: CONFIDENCIALIDAD' });
  B.push({ p:'Ambas partes se obligan a mantener confidencial la información técnica, estratégica o comercial compartida en el marco del contrato (contraseñas, fórmulas o recetas, información de clientes y proveedores, planes comerciales, información interna), durante la vigencia del contrato y hasta dos (2) años después de su finalización.' });

  B.push({ h:'DÉCIMA SEXTA: TERMINACIÓN' });
  B.push({ p:'Cualquiera de las partes puede terminar el contrato anticipadamente mediante aviso escrito con al menos 15 días calendario de antelación. Al finalizar el contrato, el Contratista entregará a EL CLIENTE toda la información y accesos pendientes, y recomendará el cambio de contraseñas de las redes sociales para proteger la integridad del material y el buen nombre de ambas partes.' });

  B.push({ h:'DÉCIMA SÉPTIMA: LEGISLACIÓN Y SOLUCIÓN DE CONFLICTOS' });
  B.push({ p:'Este contrato se rige por las leyes de la República de Colombia. Cualquier controversia se resolverá primero por negociación directa y, en su defecto, por tribunal de arbitramento.' });

  B.push({ h:'ACEPTACIÓN' });
  B.push({ p:`Este contrato se acepta electrónicamente al enviarlo y queda en firme con el primer pago realizado por ${F(nombre)}.` });
  B.push({ p:`Aceptado en ${EMPRESA.CIUDAD}, el ${d.fecha}.` });
  B.push({ parties:[
    ['EL CONTRATISTA', 'Área Digital', 'Representante: ' + EMPRESA.REPRESENTANTE, 'C.C. ' + EMPRESA.CC],
    ['EL CLIENTE', F(d.nombre, 'Nombre'), 'C.C./NIT: ' + F(d.cc, 'Número'), d.marca ? 'Marca: ' + F(d.marca) : '']
  ]});

  B.push({ h:'ANEXO — COTIZACIÓN' });
  B.push({ p:`Plan: ${F(d.planNombre, 'Plan')} — ${d.planValor} / mes` });
  if (d.planF.length) B.push({ li: d.planF });
  if (d.addon) B.push({ p:`Adicional: ${ADDON.name} — ${money(priceOf(ADDON))} / mes, mientras EL CLIENTE trabaje con el Contratista y la promoción de Google esté vigente.` });
  B.push({ p:`Valor total mensual: ${F(d.total, 'Valor')}. Forma de pago: ${F(d.pago, 'por definir')}. La inversión en pauta se paga aparte.` });
  return B;
}

/* [[x]] → resaltado en pantalla / texto plano para el documento */
const fillHTML = s => esc(s).replace(/\[\[!(.*?)\]\]/g, '<span class="fill empty">[$1]</span>').replace(/\[\[(.*?)\]\]/g, '<span class="fill">$1</span>');
const fillPlain = s => String(s).replace(/\[\[!(.*?)\]\]/g, '[$1]').replace(/\[\[(.*?)\]\]/g, '$1');

function blocksToHTML(B, forPrint){
  const f = forPrint ? (s => esc(fillPlain(s))) : fillHTML;
  return B.map(b => {
    if (b.t === 'title') return forPrint ? `<h1 style="text-align:center">${esc(b.x)}</h1>` : `<h2>${esc(b.x)}</h2>`;
    if (b.h) return `<h4>${esc(b.h)}</h4>`;
    if (b.p) return `<p>${f(b.p)}</p>`;
    if (b.li) return `<ul>${b.li.map(x => `<li>${f(x)}</li>`).join('')}</ul>`;
    if (b.parties) return `<div class="parties">${b.parties.map(col => `<div>${col.filter(Boolean).map((x, i) => `<p>${i === 0 ? '<strong>' + esc(x) + '</strong>' : f(x)}</p>`).join('')}</div>`).join('')}</div>`;
    return '';
  }).join('');
}
function blocksToPlain(B){
  return B.map(b => {
    if (b.t === 'title') return { t:'title', x:b.x };
    if (b.h) return { t:'h', x:b.h };
    if (b.p) return { t:'p', x:fillPlain(b.p) };
    if (b.li) return { t:'li', x:b.li.map(fillPlain) };
    if (b.parties) return { t:'parties', x:b.parties.map(col => col.filter(Boolean).map(fillPlain)) };
    return null;
  }).filter(Boolean);
}

function renderContract(){
  const doc = document.getElementById('contractDoc');
  if (!doc) return;
  const d = S.contractSent && S.contractData ? S.contractData : contractData();
  doc.innerHTML = blocksToHTML(contractBlocks(d), false);
}

let sendingContract = false;
async function sendContract(){
  if (sendingContract) return;
  const bad = firstInvalid(contractForm);
  if (bad){ focusInvalid(bad); return; }
  sendingContract = true;
  const btn = document.getElementById('contractSendBtn');
  setBtnBusy(btn, true, 'c.send');
  document.getElementById('cSendError').classList.remove('show');
  if (!S.pendingContractId) S.pendingContractId = newId();
  persistNow();

  const ahora = new Date();
  const d = contractData(ahora.toLocaleDateString('es-CO', { day:'numeric', month:'long', year:'numeric', timeZone:'America/Bogota' }) + ' a las ' + ahora.toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit', timeZone:'America/Bogota' }));
  const ok = await postJSON({
    tipo:'contrato', id:S.pendingContractId, briefId:S.briefId,
    nombre:d.nombre, cc:d.cc, ciudad:d.ciudad, correo:d.correo, whatsapp:d.whatsapp, marca:d.marca,
    plan: planText(), total:d.total, pago:d.pago, fechaTexto:d.fecha,
    bloques: blocksToPlain(contractBlocks(d))
  });
  sendingContract = false;
  setBtnBusy(btn, false, 'c.send');

  if (ok){
    S.contractSent = true; S.contractData = d; S.pendingContractId = null;
    persistNow();
    showContractDone();
  } else {
    const box = document.getElementById('cSendError');
    box.classList.add('show');
    box.scrollIntoView({ behavior:'smooth', block:'center' });
  }
}
contractForm.addEventListener('submit', e => { e.preventDefault(); sendContract(); });
document.getElementById('cRetryBtn').addEventListener('click', sendContract);

function showContractDone(){
  const d = S.contractData || contractData();
  document.getElementById('contractView').classList.add('hidden');
  document.getElementById('contractDoneView').classList.remove('hidden');
  const freq = FREQ_INFO[d.pago] || FREQ_INFO.mensual;
  const amountNow = money((d.totalNum != null ? d.totalNum : planTotal()) / freq.div);
  document.getElementById('payValue').innerHTML = esc(amountNow) + ' <span class="pay-freq">' + esc(currentLang === 'en' ? freq.en : freq.es) + '</span>';
  const msg = `¡Hola! Soy ${d.nombre}${d.marca ? ' de ' + d.marca : ''}. Envío el comprobante del primer pago del plan ${d.planNombre}.`;
  document.getElementById('waProofBtn').href = 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent(msg);
  setTeamLink();
  window.scrollTo({ top: 0, behavior:'smooth' });
}
function setTeamLink(){
  const d = S.contractData || contractData();
  const msg = currentLang === 'en'
    ? `Hi! I'm ${d.nombre}${d.marca ? ' from ' + d.marca : ''}. I've sent you the brief and the contract. Can we coordinate the next steps?`
    : `¡Hola! Soy ${d.nombre}${d.marca ? ' de ' + d.marca : ''}. Ya les envié el brief y el contrato. ¿Podemos coordinar los siguientes pasos?`;
  document.getElementById('waTeamBtn').href = 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent(msg);
}
// se recalcula al hacer clic, por si el cliente cambió de idioma después de enviar
document.getElementById('waTeamBtn').addEventListener('click', setTeamLink);
document.getElementById('contractPdfBtn').addEventListener('click', () => {
  const d = S.contractData || contractData();
  printHTML(blocksToHTML(contractBlocks(d), true), 'Contrato_AreaDigital_' + fileSafe(d.nombre));
});

/* ---------- Cuenta de cobro (PDF sencillo, no somos empresa constituida) ---------- */
function cuentaCobroHTML(d){
  const freq = FREQ_INFO[d.pago] || FREQ_INFO.mensual;
  const amountNow = money((d.totalNum != null ? d.totalNum : planTotal()) / freq.div);
  const logoSrc = (document.querySelector('.logo-img') || {}).src || '';
  return `<style>
    .cc-wrap{max-width:620px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;}
    .cc-head{display:flex;justify-content:space-between;align-items:center;border-bottom:2.5pt solid #0a2540;padding-bottom:10pt;margin-bottom:18pt;}
    .cc-head img{height:28px;display:block;}
    .cc-logo-box{background:#0a2540;padding:8pt 16pt;border-radius:6pt;display:inline-flex;align-items:center;}
    .cc-ttl{font-size:15pt;color:#0a2540;font-weight:800;}
    .cc-date{font-size:9pt;color:#666;margin-top:2pt;}
    .cc-row{display:flex;gap:14pt;margin-bottom:14pt;}
    .cc-box{flex:1;border:1pt solid #ddd;border-radius:5pt;padding:9pt 11pt;}
    .cc-lbl{font-size:8pt;text-transform:uppercase;letter-spacing:0.5pt;color:#888;margin-bottom:5pt;}
    .cc-line{font-size:10.5pt;margin:2pt 0;}
    .cc-value{text-align:center;background:#0a2540;color:#fff;border-radius:6pt;padding:14pt;margin:16pt 0;}
    .cc-value .l{font-size:8.5pt;text-transform:uppercase;letter-spacing:1pt;opacity:0.85;}
    .cc-value .a{font-size:22pt;font-weight:800;margin:3pt 0;}
    .cc-value .f{font-size:9.5pt;opacity:0.9;}
    .cc-sec{margin:12pt 0;}
    .cc-pay{border:1pt solid #ddd;border-radius:5pt;padding:10pt 12pt;margin-top:6pt;}
    .cc-foot{margin-top:22pt;font-size:8.5pt;color:#777;border-top:1pt solid #eee;padding-top:8pt;}
  </style>
  <div class="cc-wrap">
    <div class="cc-head">
      ${logoSrc ? `<div class="cc-logo-box"><img src="${logoSrc}" alt="Área Digital" /></div>` : `<div class="cc-ttl">ÁREA DIGITAL</div>`}
      <div style="text-align:right">
        <div class="cc-ttl">Cuenta de cobro</div>
        <div class="cc-date">${esc(d.fecha)}</div>
      </div>
    </div>
    <div class="cc-row">
      <div class="cc-box">
        <div class="cc-lbl">Cobra</div>
        <div class="cc-line"><strong>${esc(EMPRESA.TITULAR)}</strong></div>
        <div class="cc-line">C.C. ${esc(EMPRESA.CC)}</div>
        <div class="cc-line">Área Digital</div>
      </div>
      <div class="cc-box">
        <div class="cc-lbl">A nombre de</div>
        <div class="cc-line"><strong>${esc(d.nombre)}</strong></div>
        <div class="cc-line">C.C./NIT ${esc(d.cc)}</div>
        <div class="cc-line">${d.marca ? esc(d.marca) + ' · ' : ''}${esc(d.ciudad)}</div>
      </div>
    </div>
    <div class="cc-value">
      <div class="l">Valor a pagar</div>
      <div class="a">${esc(amountNow)}</div>
      <div class="f">${esc(freq.es)}</div>
    </div>
    <div class="cc-sec">
      <div class="cc-lbl">Concepto</div>
      <div class="cc-line">Pago ${esc(freq.es)} correspondiente al plan <strong>${esc(d.planNombre)}</strong> de manejo de redes sociales y marketing digital, prestado por Área Digital. Valor mensual del plan: ${esc(d.total)}.</div>
    </div>
    <div class="cc-pay">
      <div class="cc-lbl">Forma de pago</div>
      <div class="cc-line"><strong>Banco:</strong> ${esc(EMPRESA.BANCO)}</div>
      <div class="cc-line"><strong>Tipo de cuenta:</strong> ${esc(EMPRESA.TIPO_CUENTA)}</div>
      <div class="cc-line"><strong>Número de cuenta:</strong> ${esc(EMPRESA.CUENTA)}</div>
      <div class="cc-line"><strong>Titular:</strong> ${esc(EMPRESA.TITULAR)}</div>
      <div class="cc-line" style="margin-top:8pt">Una vez hecho el pago, envía el comprobante por WhatsApp al +57 304 479 0264. ¡Gracias!</div>
    </div>
    <div class="cc-foot">Documento informativo de cobro — no constituye factura electrónica. Área Digital.</div>
  </div>`;
}
document.getElementById('cuentaCobroBtn').addEventListener('click', () => {
  const d = S.contractData || contractData();
  printHTML(cuentaCobroHTML(d), 'CuentaDeCobro_AreaDigital_' + fileSafe(d.nombre));
});

/* =========================================================
   INICIO
   ========================================================= */
if (!CONFIG.ACTIVO){
  document.getElementById('activeView').classList.add('hidden');
  document.getElementById('inactiveView').classList.remove('hidden');
}

(function init(){
  if (typeof OB.beforeInit === 'function') OB.beforeInit(S);
  restoreValues();
  refreshDynamic();
  refreshPlanUI();
  showStep(S.step || 0, false);
  if (S.briefSent) showBriefDone();
  if (S.contractSent) showContractDone();
  const start = typeof OB.startTab === 'function' ? OB.startTab(S) : (S.briefSent ? 'contrato' : (S.plan ? 'brief' : 'planes'));
  setTab(start, false);
})();

(function initLang(){
  let saved = null;
  try { saved = localStorage.getItem('ad_lang'); } catch(e){}
  if (saved === 'en' || saved === 'es') { setLanguage(saved); return; }

  setLanguage('es');

  const spanishSpeaking = ['ES','MX','CO','AR','PE','CL','VE','EC','GT','CU','BO','DO','HN','PY','SV','NI','CR','PA','UY','GQ','PR'];
  const browserLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
  if (browserLang.startsWith('es')) return;

  fetch('https://ipapi.co/json/', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      let stillNoPref = false;
      try { stillNoPref = !localStorage.getItem('ad_lang'); } catch(e){ stillNoPref = true; }
      if (!stillNoPref) return;
      if (data && data.country_code && !spanishSpeaking.includes(data.country_code)) {
        setLanguage('en');
      }
    })
    .catch(() => {
      if (!browserLang.startsWith('es')) setLanguage('en');
    });
})();

(function initCurrency(){
  let saved = null;
  try { saved = localStorage.getItem('ad_currency'); } catch(e){}
  if (saved === 'usd' || saved === 'cop') { setCurrency(saved); return; }

  fetch('https://ipapi.co/json/', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      let stillNoPref = false;
      try { stillNoPref = !localStorage.getItem('ad_currency'); } catch(e){ stillNoPref = true; }
      if (!stillNoPref) return;
      if (data && data.country_code && data.country_code !== 'CO') setCurrency('usd');
    })
    .catch(() => {});
})();
