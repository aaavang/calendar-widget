/*!
 * Google Calendar Event Cards for Squarespace
 * Usage: set window.GCW_DEFAULTS (API key, calendar ID, options) in Code Injection, load this
 * file after it, and put <div class="gcw"></div> in any Code Block. See README.md.
 */
(() => {
  if (document.getElementById('gcw-styles')) return;
  const style = document.createElement('style');
  style.id = 'gcw-styles';
  style.textContent = `
.gcw{
  --gcw-accent:#0f7b5f;
  --gcw-card:#ffffff;
  --gcw-text:#1c1d1f;
  --gcw-muted:#5f6368;
  --gcw-border:rgba(0,0,0,.08);
  --gcw-radius:16px;
  --gcw-shadow:0 1px 2px rgba(0,0,0,.05),0 8px 24px rgba(0,0,0,.07);
  --gcw-shadow-hover:0 2px 6px rgba(0,0,0,.08),0 18px 44px rgba(0,0,0,.14);
  display:block;width:100%;
  font-family:var(--body-font-font-family,inherit);
  color:var(--gcw-text);
}
.gcw *,.gcw *::before,.gcw *::after{box-sizing:border-box}
.gcw svg{fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.gcw p{margin:0}
.gcw button{appearance:none;-webkit-appearance:none;background:none;border:0;padding:0;margin:0;color:inherit;font:inherit;letter-spacing:inherit;text-transform:none;cursor:pointer}

.gcw .gcw-grid{display:grid;gap:clamp(16px,2.5vw,28px);grid-template-columns:repeat(auto-fill,minmax(min(100%,290px),1fr))}
.gcw.gcw--list .gcw-grid{grid-template-columns:1fr}

/* Carousel: cards per view adapt to the block's own width (container queries) */
.gcw .gcw-carousel{container-type:inline-size;position:relative}
.gcw .gcw-track{--per:1.15;--gap:16px;display:flex;gap:var(--gap);overflow-x:auto;overscroll-behavior-x:contain;
  scroll-snap-type:x mandatory;scroll-behavior:smooth;scroll-padding-inline:8px;scrollbar-width:none;
  padding:8px 8px 28px;margin:-8px -8px -20px}
.gcw .gcw-track::-webkit-scrollbar{display:none}
.gcw .gcw-track:focus-visible{outline:3px solid var(--gcw-accent);outline-offset:-3px;border-radius:var(--gcw-radius)}
.gcw .gcw-track>.gcw-card{flex:0 0 calc((100% - (var(--per) - 1) * var(--gap)) / var(--per));scroll-snap-align:start}
@container (min-width:560px){.gcw .gcw-track{--per:2;--gap:20px}}
@container (min-width:880px){.gcw .gcw-track{--per:3;--gap:24px}}
@container (min-width:1240px){.gcw .gcw-track{--per:4;--gap:28px}}
.gcw .gcw-nav{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:20px}
.gcw .gcw-nav[hidden]{display:none}
.gcw .gcw-nav-btn{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;flex:none;background:var(--gcw-card);color:var(--gcw-text);border:1px solid var(--gcw-border);box-shadow:var(--gcw-shadow);transition:background .2s ease,color .2s ease,opacity .2s ease}
.gcw .gcw-nav-btn:hover:not(:disabled){background:var(--gcw-accent);border-color:var(--gcw-accent);color:#fff}
.gcw .gcw-nav-btn:disabled{opacity:.35;cursor:default;box-shadow:none}
.gcw .gcw-nav-btn:focus-visible,.gcw .gcw-dot:focus-visible{outline:3px solid var(--gcw-accent);outline-offset:2px}
.gcw .gcw-nav-btn svg{width:20px;height:20px;stroke-width:2.2}
.gcw .gcw-dots{display:flex;align-items:center;flex-wrap:wrap;justify-content:center}
.gcw .gcw-dot{width:24px;height:24px;display:grid;place-items:center;border-radius:999px}
.gcw .gcw-dot::before{content:"";width:8px;height:8px;border-radius:999px;background:var(--gcw-text);opacity:.25;transition:width .25s ease,opacity .25s ease,background .25s ease}
.gcw .gcw-dot[aria-current="true"]{width:36px}
.gcw .gcw-dot[aria-current="true"]::before{width:24px;opacity:1;background:var(--gcw-accent)}
.gcw .gcw-count{min-width:5ch;text-align:center;font-size:.9rem;color:var(--gcw-muted);font-variant-numeric:tabular-nums}

/* Calendar: month grid, event days filled; titles appear when the block is wide enough */
.gcw .gcw-cal{container-type:inline-size;background:var(--gcw-card);color:var(--gcw-text);border:1px solid var(--gcw-border);border-radius:var(--gcw-radius);box-shadow:var(--gcw-shadow);padding:clamp(14px,3vw,28px)}
.gcw .gcw-cal-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.gcw .gcw-cal-title{font-size:clamp(1.2rem,2.5vw,1.6rem)}
.gcw .gcw-cal-nav{display:flex;align-items:center;gap:8px}
.gcw .gcw-cal-nav .gcw-nav-btn{width:40px;height:40px;box-shadow:none}
.gcw .gcw-cal-today{padding:9px 16px;border-radius:999px;border:1px solid var(--gcw-border);font-weight:600;font-size:.9rem;color:var(--gcw-accent)}
.gcw .gcw-cal-today:hover{background:color-mix(in srgb,var(--gcw-accent) 10%,transparent)}
.gcw .gcw-cal-today[hidden]{display:none}
.gcw .gcw-cal-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}
.gcw .gcw-cal-wd{padding:2px 0 8px;text-align:center;font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gcw-muted)}
.gcw .gcw-cal-day{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;aspect-ratio:1;min-width:0;border-radius:10px;font-size:.95rem;color:var(--gcw-text);background:color-mix(in srgb,var(--gcw-text) 4%,transparent)}
.gcw .gcw-cal-day.is-out{background:transparent;opacity:.35}
.gcw .gcw-cal-day.is-past:not(.has-events){color:var(--gcw-muted)}
.gcw .gcw-cal-num{display:grid;place-items:center;width:2em;height:2em;border-radius:50%;font-weight:600;line-height:1;flex:none}
.gcw .gcw-cal-day.is-today .gcw-cal-num{box-shadow:inset 0 0 0 2px var(--gcw-accent)}
.gcw .gcw-cal-day.has-events{background:var(--gcw-accent);color:#fff;cursor:pointer;transition:filter .2s ease}
.gcw .gcw-cal-day.has-events:hover{filter:brightness(1.12)}
.gcw .gcw-cal-day.has-events.is-past:not(.is-selected){opacity:.55}
.gcw .gcw-cal-day.is-today.has-events .gcw-cal-num{box-shadow:inset 0 0 0 2px #fff}
.gcw .gcw-cal-day.is-selected{box-shadow:0 0 0 2px var(--gcw-card),0 0 0 4px var(--gcw-text)}
.gcw .gcw-cal-day:focus-visible{outline:3px solid var(--gcw-text);outline-offset:3px}
.gcw .gcw-cal-evs{display:none}
@container (min-width:640px){
  .gcw .gcw-cal-grid{gap:6px}
  .gcw .gcw-cal-day{aspect-ratio:auto;min-height:92px;align-items:stretch;justify-content:flex-start;padding:6px;text-align:left}
  .gcw .gcw-cal-num{width:1.9em;height:1.9em;font-size:.9rem}
  .gcw .gcw-cal-evs{display:flex;flex-direction:column;gap:2px;margin-top:4px;min-width:0}
  .gcw .gcw-cal-ev{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;font-size:.75rem;font-weight:600;line-height:1.3}
  .gcw .gcw-cal-more{font-weight:400;opacity:.85}
}
.gcw .gcw-day{margin-top:20px;padding-top:16px;border-top:1px solid var(--gcw-border)}
.gcw .gcw-day-h{margin:0 0 6px;font-weight:700;font-size:1rem}
.gcw .gcw-cal-empty{margin:4px 0 0;font-size:.95rem;color:var(--gcw-muted)}
.gcw .gcw-row{position:relative;display:flex;align-items:center;gap:14px;padding:10px;margin:0 -10px;border-radius:12px;transition:background .2s ease}
.gcw .gcw-row:hover{background:color-mix(in srgb,var(--gcw-accent) 8%,transparent)}
.gcw .gcw-row:has(.gcw-more:focus-visible){outline:3px solid var(--gcw-accent);outline-offset:-3px}
.gcw .gcw-media.gcw-thumb{flex:none;width:88px;height:66px;aspect-ratio:auto;border-radius:10px}
.gcw .gcw-row-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
.gcw .gcw-row .gcw-title{font-size:1.05rem}
.gcw .gcw-row .gcw-chips{margin-top:0}
.gcw .gcw-row .gcw-more{margin:0;padding:0 4px;align-self:center;font-size:1.2rem}
.gcw .gcw-row:hover .gcw-arrow{transform:translateX(4px)}
@container (max-width:420px){.gcw .gcw-media.gcw-thumb{width:64px;height:64px}.gcw .gcw-row{gap:12px}}

.gcw .gcw-card{position:relative;display:flex;flex-direction:column;background:var(--gcw-card);color:var(--gcw-text);border:1px solid var(--gcw-border);border-radius:var(--gcw-radius);overflow:hidden;box-shadow:var(--gcw-shadow);transition:transform .25s ease,box-shadow .25s ease}
.gcw .gcw-card:hover{transform:translateY(-4px);box-shadow:var(--gcw-shadow-hover)}
.gcw .gcw-card:has(.gcw-more:focus-visible){outline:3px solid var(--gcw-accent);outline-offset:3px}

.gcw .gcw-media{position:relative;aspect-ratio:16/10;overflow:hidden;background:#e9ecef;flex:none}
.gcw .gcw-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.gcw .gcw-card:hover .gcw-img{transform:scale(1.05)}
.gcw.gcw--fit-contain .gcw-card .gcw-img{object-fit:contain}
.gcw.gcw--fit-contain .gcw-card:hover .gcw-img{transform:none}
.gcw .gcw-bg{position:absolute;inset:-24px;width:calc(100% + 48px);height:calc(100% + 48px);object-fit:cover;filter:blur(20px) saturate(1.2);opacity:.7}
.gcw .gcw-ph{position:absolute;inset:0;display:grid;place-items:center;color:rgba(255,255,255,.4);
  background:radial-gradient(circle at 25% 15%,color-mix(in srgb,var(--gcw-accent) 55%,#fff) 0,var(--gcw-accent) 55%,color-mix(in srgb,var(--gcw-accent) 65%,#000) 100%)}
.gcw .gcw-ph svg{width:30%;max-width:72px;height:auto;stroke-width:1.4}

.gcw .gcw-badge{position:absolute;top:14px;left:14px;z-index:1;min-width:60px;padding:8px 10px 7px;border-radius:12px;background:rgba(255,255,255,.95);color:#1c1d1f;text-align:center;line-height:1;box-shadow:0 4px 14px rgba(0,0,0,.18)}
.gcw .gcw-badge-m{display:block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gcw-accent)}
.gcw .gcw-badge-d{display:block;margin-top:4px;font-size:1.6rem;font-weight:700}
.gcw .gcw-badge-d.is-range{font-size:1.05rem;margin-top:6px}

.gcw .gcw-body{display:flex;flex-direction:column;gap:10px;padding:20px 22px 22px;flex:1;min-width:0}
.gcw .gcw-title{margin:0;font-family:var(--heading-font-font-family,inherit);font-size:1.25rem;line-height:1.25;font-weight:700;letter-spacing:normal;text-transform:none;color:inherit}
.gcw .gcw-meta{display:flex;gap:8px;align-items:flex-start;font-size:.9rem;line-height:1.4;color:var(--gcw-muted)}
.gcw .gcw-meta svg{flex:none;width:16px;height:16px;margin-top:2px;color:var(--gcw-accent)}
.gcw .gcw-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:-2px}
.gcw .gcw-chip{display:inline-flex;align-items:center;gap:6px;max-width:100%;padding:5px 12px 5px 10px;border-radius:999px;
  background:color-mix(in srgb,var(--gcw-accent) 12%,transparent);color:var(--gcw-accent);font-weight:700;font-size:.9rem;line-height:1.2}
.gcw .gcw-chip svg{flex:none;width:15px;height:15px;stroke-width:2}
.gcw .gcw-d-body .gcw-chips{margin-top:12px}
.gcw .gcw-d-body .gcw-chip{font-size:1rem;padding:6px 14px 6px 12px}
.gcw .gcw-field-label{font-weight:600}
.gcw .gcw-excerpt{margin-top:2px;font-size:.95rem;line-height:1.55;white-space:pre-line;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.gcw .gcw-more{margin-top:auto;padding-top:6px;align-self:flex-start;font-weight:600;font-size:.95rem;color:var(--gcw-accent)}
.gcw .gcw-more::after{content:"";position:absolute;inset:0;border-radius:inherit}
.gcw .gcw-more:focus{outline:none}
.gcw .gcw-arrow{display:inline-block;transition:transform .2s ease}
.gcw .gcw-card:hover .gcw-arrow{transform:translateX(4px)}

.gcw.gcw--list .gcw-card{flex-direction:row}
.gcw.gcw--list .gcw-media{flex:0 0 clamp(200px,36%,360px);aspect-ratio:auto;min-height:220px}
.gcw.gcw--list .gcw-body{padding:24px 28px}
.gcw.gcw--list .gcw-title{font-size:1.4rem}
@media (max-width:640px){
  .gcw.gcw--list .gcw-card{flex-direction:column}
  .gcw.gcw--list .gcw-media{flex:none;aspect-ratio:16/10;min-height:0}
  .gcw.gcw--list .gcw-body{padding:20px 22px 22px}
}

.gcw .gcw-msg{padding:48px 24px;text-align:center;border:1px dashed rgba(0,0,0,.18);border-radius:var(--gcw-radius);color:var(--gcw-muted);line-height:1.5}
.gcw .gcw-msg small{display:block;margin-top:8px;font-size:.8rem;opacity:.8}

.gcw .gcw-skel .gcw-media,.gcw .gcw-skel-line{background:linear-gradient(90deg,#eceff1 25%,#f7f8f9 50%,#eceff1 75%);background-size:200% 100%;animation:gcw-shimmer 1.4s infinite linear}
.gcw .gcw-skel-line{height:14px;border-radius:7px}
@keyframes gcw-shimmer{from{background-position:200% 0}to{background-position:-200% 0}}

/* Detail popup */
.gcw .gcw-dialog{width:min(760px,calc(100vw - 32px));max-width:none;max-height:calc(100dvh - 48px);padding:0;border:0;border-radius:20px;background:var(--gcw-card);color:var(--gcw-text);box-shadow:0 30px 80px rgba(0,0,0,.35);overflow:auto;overscroll-behavior:contain}
.gcw .gcw-dialog[open]{animation:gcw-pop .28s cubic-bezier(.2,.9,.3,1.2)}
.gcw .gcw-dialog::backdrop{background:rgba(12,14,18,.62);backdrop-filter:blur(4px)}
@keyframes gcw-pop{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}
.gcw .gcw-close-wrap{position:sticky;top:0;height:0;z-index:3;display:flex;justify-content:flex-end}
.gcw .gcw-close{width:40px;height:40px;margin:12px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.95);color:#1c1d1f;box-shadow:0 2px 10px rgba(0,0,0,.2)}
.gcw .gcw-close svg{width:20px;height:20px;stroke-width:2.2}
.gcw .gcw-close:focus-visible{outline:3px solid var(--gcw-accent);outline-offset:2px}
.gcw .gcw-d-media{aspect-ratio:auto;height:min(52vh,440px);background:#111}
.gcw .gcw-d-media .gcw-img{object-fit:contain}
.gcw .gcw-d-body{padding:28px 32px 32px}
.gcw .gcw-d-body .gcw-title{font-size:clamp(1.4rem,3vw,1.9rem)}
.gcw .gcw-d-meta{display:grid;gap:10px;margin:16px 0 0;padding:0;list-style:none}
.gcw .gcw-d-meta .gcw-meta{font-size:1rem;color:var(--gcw-text)}
.gcw .gcw-d-meta svg{width:18px;height:18px;margin-top:1px}
.gcw .gcw-desc{margin-top:20px;padding-top:20px;border-top:1px solid var(--gcw-border);font-size:1rem;line-height:1.65}
.gcw .gcw-desc:empty{display:none}
.gcw .gcw-desc p,.gcw .gcw-desc div{margin:0 0 .6em}
.gcw .gcw-desc ul,.gcw .gcw-desc ol{margin:.4em 0 .8em;padding-left:1.4em}
.gcw .gcw-d-body a:not(.gcw-btn){color:var(--gcw-accent);text-decoration:underline;text-underline-offset:2px;word-break:break-word}
.gcw .gcw-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
.gcw .gcw-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:999px;font-weight:600;font-size:.95rem;line-height:1;text-decoration:none;border:2px solid var(--gcw-accent);background:var(--gcw-accent);color:#fff;transition:filter .2s ease,background .2s ease}
.gcw .gcw-btn:hover{filter:brightness(1.1)}
.gcw .gcw-btn svg{width:18px;height:18px}
.gcw .gcw-btn--ghost{background:transparent;color:var(--gcw-accent)}
.gcw .gcw-btn--ghost:hover{filter:none;background:color-mix(in srgb,var(--gcw-accent) 10%,transparent)}
@media (max-width:640px){.gcw .gcw-d-body{padding:22px 20px 24px}}

@media (prefers-reduced-motion:reduce){
  .gcw *,.gcw *::before,.gcw *::after{animation:none!important;transition:none!important}
  .gcw .gcw-card:hover,.gcw .gcw-card:hover .gcw-img{transform:none}
  .gcw .gcw-track{scroll-behavior:auto}
}
`;
  (document.head || document.documentElement).appendChild(style);
})();

(() => {
  if (window.__gcwLoaded) { window.__gcwInit && window.__gcwInit(); return; }
  window.__gcwLoaded = true;

  const API = 'https://www.googleapis.com/calendar/v3/calendars/';
  const DAY = 864e5;
  const ICON = {
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    video: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/></svg>',
    cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    music: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
    person: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9.5a2.5 2.5 0 0 0 0 5V18h18v-3.5a2.5 2.5 0 0 1 0-5V6H3z"/><path d="M15 6v2M15 11v2M15 16v2"/></svg>',
    info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.5v.01"/></svg>'
  };

  // ---------- Description fields ----------
  // Every description line like "Band: Speed Dial" becomes its own detail line on the card.
  // Labels listed here get an icon (others get a generic one) and appear first, in this order.
  // "highlight" fields show as a colored chip under the event name. Case doesn't matter.
  // Override the whole list with GCW_DEFAULTS.fields (same shape).
  const FIELDS = (window.GCW_DEFAULTS && window.GCW_DEFAULTS.fields) || [
    { labels: ['band', 'music', 'musicians', 'live music'], icon: 'music', highlight: true },
    { labels: ['caller', 'called by'], icon: 'mic' },
    { labels: ['teacher', 'instructor', 'taught by'], icon: 'person' },
    { labels: ['cost', 'price', 'admission', 'tickets'], icon: 'ticket' }
  ];
  const PLACEHOLDER = `<div class="gcw-ph">${ICON.cal}</div>`;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // ---------- Images ----------
  const IMG_EXT = /\.(jpe?g|png|gif|webp|avif)(?:[?#]|$)/i;
  const IMG_HOST = /^https?:\/\/(?:images\.squarespace-cdn\.com|lh\d\.googleusercontent\.com|images\.unsplash\.com|i\.imgur\.com)\//i;
  const driveId = url => {
    const m = String(url).match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=|thumbnail\?(?:[^#]*&)?id=)([\w-]{10,})/);
    return m && m[1];
  };
  const driveThumb = id => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;
  const toImageUrl = url => {
    if (!url) return null;
    const id = driveId(url);
    if (id) return driveThumb(id);
    return IMG_EXT.test(url) || IMG_HOST.test(url) ? url : null;
  };

  // ---------- Description: find image, sanitize HTML ----------
  const KEEP = new Set(['A', 'B', 'STRONG', 'I', 'EM', 'U', 'BR', 'P', 'UL', 'OL', 'LI', 'SPAN', 'DIV']);
  const DROP = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'svg', 'SVG']);
  const LABEL = /(?:^|\s)(?:image|img|photo|picture|flyer)\s*:\s*$/i;

  function processDescription(raw) {
    let html = raw || '';
    if (!/<\/?[a-z][^>]*>/i.test(html)) {
      html = esc(html)
        .replace(/https?:\/\/[^\s<]*[^\s<.,;:!?)\]]/g, u => `<a href="${u}">${u}</a>`)
        .replace(/\r?\n/g, '<br>');
    } else {
      // Google Calendar often mixes HTML with plain newlines; keep those as line breaks too,
      // except right next to block tags (lists, paragraphs) where they're just formatting.
      const BLOCK = '(?:ul|ol|li|p|div)';
      html = html.replace(/\r?\n/g, '<br>')
        .replace(new RegExp(`(?:<br>\\s*)+(?=<\\/?${BLOCK}\\b)`, 'gi'), '')
        .replace(new RegExp(`(<\\/?${BLOCK}\\b[^>]*>)(?:\\s*<br>)+`, 'gi'), '$1');
    }
    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
    const root = doc.body.firstElementChild;
    let image = null;

    const removeWithLabel = node => {
      const prev = node.previousSibling;
      if (prev && prev.nodeType === 3) prev.nodeValue = prev.nodeValue.replace(LABEL, '');
      node.remove();
    };

    root.querySelectorAll('img').forEach(img => {
      image = image || toImageUrl(img.getAttribute('src'));
      removeWithLabel(img);
    });
    if (!image) {
      for (const a of root.querySelectorAll('a[href]')) {
        const u = toImageUrl(a.getAttribute('href'));
        if (u) { image = u; removeWithLabel(a); break; }
      }
    }
    if (!image) {
      const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n; (n = walker.nextNode());) {
        const hit = (n.nodeValue.match(/https?:\/\/[^\s<>"']+/g) || []).find(toImageUrl);
        if (hit) {
          image = toImageUrl(hit);
          n.nodeValue = n.nodeValue.replace(new RegExp(`(?:\\b(?:image|img|photo|picture|flyer)\\s*:\\s*)?${escRe(hit)}`, 'i'), '');
          break;
        }
      }
    }

    (function clean(el) {
      for (const child of [...el.childNodes]) {
        if (child.nodeType === 3) continue;
        if (child.nodeType !== 1 || DROP.has(child.tagName)) { child.remove(); continue; }
        clean(child);
        if (!KEEP.has(child.tagName)) { child.replaceWith(...child.childNodes); continue; }
        const href = child.getAttribute('href');
        for (const at of [...child.attributes]) child.removeAttribute(at.name);
        if (child.tagName === 'A') {
          if (href && /^(https?:|mailto:|tel:)/i.test(href.trim())) {
            child.setAttribute('href', href.trim());
            child.setAttribute('target', '_blank');
            child.setAttribute('rel', 'noopener');
          } else child.replaceWith(...child.childNodes);
        }
      }
    })(root);

    const fields = extractFields(root);

    // Trim leading/trailing line breaks and blank text left behind by the removed image link
    const blank = n => n && ((n.nodeType === 3 && !n.nodeValue.trim()) || n.nodeName === 'BR');
    while (blank(root.firstChild)) root.firstChild.remove();
    while (blank(root.lastChild)) root.lastChild.remove();
    root.innerHTML = root.innerHTML.replace(/(?:<br>\s*){3,}/g, '<br><br>');

    const plain = root.cloneNode(true);
    plain.querySelectorAll('br,p,div,li').forEach(n => n.after('\n'));
    const text = plain.textContent
      .replace(/[^\S\n]+/g, ' ')
      .replace(/ *\n */g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    return { image, html: root.innerHTML, text, fields };
  }

  // Pull "Label: value" lines (each on its own line) out of the description
  const GENERIC = { icon: 'info' };
  function extractFields(root) {
    const found = [];
    const isBlock = n => n.nodeType === 1 && /^(P|DIV|LI|UL|OL)$/.test(n.tagName);
    for (const box of [root, ...root.querySelectorAll('p,div,li')]) {
      let line = [];
      const flush = br => {
        // Label: starts with a letter, ends with a letter or ")", so times like "7:30" don't count
        const m = line.map(n => n.textContent).join('').trim()
          .match(/^([A-Za-zÀ-ɏ][^:\n]{0,28}[A-Za-zÀ-ɏ)])\s*:\s*(.+)$/);
        if (m && !m[2].startsWith('//')) {
          const label = m[1].trim();
          const def = FIELDS.find(f => f.labels.includes(label.toLowerCase())) || GENERIC;
          const key = def === GENERIC ? `label:${label.toLowerCase()}` : def;
          if (!found.some(f => f.key === key)) {
            const a = line.map(n => (n.nodeName === 'A' ? n : n.querySelector && n.querySelector('a'))).find(Boolean);
            const value = m[2].trim();
            found.push({ key, def, label, value, href: a ? a.getAttribute('href') : isUrl(value) ? value : '' });
          }
          line.forEach(n => n.remove());
          if (br) br.remove();
        }
        line = [];
      };
      for (const n of [...box.childNodes]) {
        if (n.nodeName === 'BR') flush(n);
        else if (isBlock(n)) flush(null);
        else line.push(n);
      }
      flush(null);
    }
    // Drop paragraphs/list items left empty
    root.querySelectorAll('p,div,li').forEach(n => { if (!n.textContent.trim()) n.remove(); });
    root.querySelectorAll('ul,ol').forEach(n => { if (!n.children.length) n.remove(); });
    return [...FIELDS.flatMap(def => found.filter(f => f.def === def)), ...found.filter(f => f.def === GENERIC)];
  }

  // ---------- Dates ----------
  const ymdToDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const partsIn = (date, tz) => {
    const o = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(date).forEach(p => { o[p.type] = p.value; });
    return o;
  };
  const range = (f, a, b) => (f.formatRange ? f.formatRange(a, b) : `${f.format(a)} – ${f.format(b)}`);

  function whenText(e, locale) {
    const base = { weekday: 'short', month: 'short', day: 'numeric', timeZone: e.ftz };
    if (e.allDay) {
      const f = new Intl.DateTimeFormat(locale, base);
      return e.multiDay ? range(f, e.start, e.end) : `${f.format(e.start)} · All day`;
    }
    return range(new Intl.DateTimeFormat(locale, { ...base, hour: 'numeric', minute: '2-digit' }), e.start, e.end);
  }

  function normalize(ev, tz) {
    const allDay = !!ev.start.date;
    const ftz = allDay ? 'UTC' : tz;
    const start = allDay ? ymdToDate(ev.start.date) : new Date(ev.start.dateTime);
    const end = allDay ? new Date(+ymdToDate(ev.end.date) - DAY) : new Date(ev.end.dateTime);
    const sp = partsIn(start, ftz), ep = partsIn(end, ftz);
    const desc = processDescription(ev.description);
    const att = (ev.attachments || []).find(a => /^image\//.test(a.mimeType || '') && (a.fileId || driveId(a.fileUrl)));
    return {
      title: ev.summary || 'Untitled event',
      allDay, ftz, start, end, sp, ep,
      multiDay: `${sp.year}${sp.month}${sp.day}` !== `${ep.year}${ep.month}${ep.day}`,
      sortKey: `${sp.year}-${sp.month}-${sp.day}T${allDay ? '00:00' : `${sp.hour}:${sp.minute}`}`,
      location: (ev.location || '').trim(),
      image: att ? driveThumb(att.fileId || driveId(att.fileUrl)) : desc.image,
      html: desc.html,
      text: desc.text,
      fields: desc.fields,
      link: ev.htmlLink || ''
    };
  }

  function addToCalendarUrl(e) {
    const stamp = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const ymd = d => d.toISOString().slice(0, 10).replace(/-/g, '');
    const dates = e.allDay ? `${ymd(e.start)}/${ymd(new Date(+e.end + DAY))}` : `${stamp(e.start)}/${stamp(e.end)}`;
    const p = new URLSearchParams({ action: 'TEMPLATE', text: e.title, dates, details: [...e.fields.map(f => `${f.label}: ${f.value}`), e.text].filter(Boolean).join('\n\n').slice(0, 1500), location: e.location });
    return `https://calendar.google.com/calendar/render?${p}`;
  }

  // ---------- Rendering ----------
  const isUrl = s => /^https?:\/\//i.test(s);

  function mediaHTML(e, cfg, inDialog) {
    const src = e.image || cfg.fallback;
    if (!src) return PLACEHOLDER;
    const bg = inDialog || cfg.fit === 'contain' ? `<img class="gcw-bg" src="${esc(src)}" alt="" aria-hidden="true" loading="lazy">` : '';
    return `${bg}<img class="gcw-img" src="${esc(src)}" alt="${inDialog ? esc(e.title) : ''}" loading="lazy" decoding="async">`;
  }

  function badgeHTML(e, cfg) {
    const month = new Intl.DateTimeFormat(cfg.locale, { month: 'short', timeZone: e.ftz }).format(e.start).replace('.', '');
    const d1 = String(+e.sp.day), d2 = String(+e.ep.day);
    const sameMonthRange = e.multiDay && e.sp.month === e.ep.month && e.sp.year === e.ep.year;
    return `<div class="gcw-badge" aria-hidden="true"><span class="gcw-badge-m">${esc(month)}</span>` +
      `<span class="gcw-badge-d${sameMonthRange ? ' is-range' : ''}">${sameMonthRange ? `${d1}–${d2}` : d1}</span></div>`;
  }

  // Long URLs read as their site name ("Tickets: eventbrite.com"); links are clickable in the popup
  const shortValue = f => (isUrl(f.value) ? f.value.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/.*$/, '') : f.value);
  const fieldHTML = (f, linked) => {
    const value = linked && f.href
      ? `<a href="${esc(f.href)}" target="_blank" rel="noopener">${esc(shortValue(f))}</a>`
      : esc(shortValue(f));
    return `${ICON[f.def.icon] || ''}<span><span class="gcw-field-label">${esc(f.label)}:</span> ${value}</span>`;
  };
  const highlightHTML = e => {
    const chips = e.fields.filter(f => f.def.highlight);
    return chips.length
      ? `<div class="gcw-chips">${chips.map(f => `<span class="gcw-chip" title="${esc(f.label)}">${ICON[f.def.icon] || ''}<span>${esc(f.value)}</span></span>`).join('')}</div>`
      : '';
  };

  function cardHTML(e, i, cfg) {
    const loc = e.location ? `<p class="gcw-meta">${isUrl(e.location) ? ICON.video : ICON.pin}<span>${isUrl(e.location) ? 'Online' : esc(e.location)}</span></p>` : '';
    const extra = e.fields.filter(f => !f.def.highlight).map(f => `<p class="gcw-meta">${fieldHTML(f)}</p>`).join('');
    return `<article class="gcw-card">
      <div class="gcw-media">${mediaHTML(e, cfg, false)}${badgeHTML(e, cfg)}</div>
      <div class="gcw-body">
        <h3 class="gcw-title">${esc(e.title)}</h3>
        ${highlightHTML(e)}
        <p class="gcw-meta">${ICON.clock}<span>${esc(whenText(e, cfg.locale))}</span></p>
        ${loc}
        ${extra}
        ${cfg.showDescription && e.text ? `<p class="gcw-excerpt">${esc(e.text.replace(/\n{2,}/g, '\n'))}</p>` : ''}
        <button type="button" class="gcw-more" data-i="${i}" aria-haspopup="dialog">Event details <span class="gcw-arrow" aria-hidden="true">→</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">: ${esc(e.title)}</span></button>
      </div>
    </article>`;
  }

  function dialogHTML(e, cfg) {
    let loc = '', mapBtn = '';
    if (e.location) {
      if (isUrl(e.location)) {
        loc = `<li class="gcw-meta">${ICON.video}<a href="${esc(e.location)}" target="_blank" rel="noopener">Join online</a></li>`;
      } else {
        const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.location)}`;
        loc = `<li class="gcw-meta">${ICON.pin}<a href="${esc(map)}" target="_blank" rel="noopener">${esc(e.location)}</a></li>`;
        mapBtn = `<a class="gcw-btn gcw-btn--ghost" href="${esc(map)}" target="_blank" rel="noopener">${ICON.pin}Directions</a>`;
      }
    }
    return `<div class="gcw-close-wrap"><button type="button" class="gcw-close" aria-label="Close">${ICON.close}</button></div>
      <div class="gcw-media gcw-d-media">${mediaHTML(e, cfg, true)}</div>
      <div class="gcw-d-body">
        <h3 class="gcw-title" id="${cfg.uid}-title">${esc(e.title)}</h3>
        ${highlightHTML(e)}
        <ul class="gcw-d-meta">
          <li class="gcw-meta">${ICON.clock}<span>${esc(whenText(e, cfg.locale))}</span></li>
          ${loc}
          ${e.fields.filter(f => !f.def.highlight).map(f => `<li class="gcw-meta">${fieldHTML(f, true)}</li>`).join('')}
        </ul>
        ${cfg.showDescription ? `<div class="gcw-desc">${e.html}</div>` : ''}
        <div class="gcw-actions">
          <a class="gcw-btn" href="${esc(addToCalendarUrl(e))}" target="_blank" rel="noopener">${ICON.plus}Add to my calendar</a>
          ${mapBtn}
        </div>
      </div>`;
  }

  function skeleton(n, layout) {
    const card = `<div class="gcw-card gcw-skel" aria-hidden="true"><div class="gcw-media"></div><div class="gcw-body">
      <div class="gcw-skel-line" style="width:70%;height:20px"></div><div class="gcw-skel-line" style="width:50%"></div>
      <div class="gcw-skel-line" style="width:90%"></div><div class="gcw-skel-line" style="width:80%"></div></div></div>`;
    if (layout === 'calendar') {
      return '<div class="gcw-skel-line" aria-busy="true" style="height:420px;border-radius:var(--gcw-radius)"></div>';
    }
    return layout === 'carousel'
      ? `<div class="gcw-carousel" aria-busy="true"><div class="gcw-track">${card.repeat(n)}</div></div>`
      : `<div class="gcw-grid" aria-busy="true">${card.repeat(n)}</div>`;
  }

  function carouselHTML(cards) {
    return `<div class="gcw-carousel">
      <div class="gcw-track" tabindex="0" role="region" aria-label="Upcoming events (scroll sideways for more)">${cards}</div>
      <div class="gcw-nav" hidden>
        <button type="button" class="gcw-nav-btn gcw-prev" aria-label="Previous events">${ICON.left}</button>
        <div class="gcw-dots"></div>
        <button type="button" class="gcw-nav-btn gcw-next" aria-label="More events">${ICON.right}</button>
      </div>
    </div>`;
  }

  // Arrows, page dots (or a "2 / 14" counter when there are many pages), swipe is native scrolling
  function setupCarousel(el) {
    const track = el.querySelector('.gcw-track');
    const nav = el.querySelector('.gcw-nav');
    const dots = nav.querySelector('.gcw-dots');
    const prev = nav.querySelector('.gcw-prev');
    const next = nav.querySelector('.gcw-next');
    const cards = [...track.children];
    let perView = 1, pages = 1, step = 1;

    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const current = () => (track.scrollLeft >= maxScroll() - 4 ? pages - 1 : Math.round(track.scrollLeft / (step * perView)));
    const go = p => track.scrollTo({ left: Math.max(0, p) * perView * step });

    function update() {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= maxScroll() - 4;
      const p = current();
      dots.querySelectorAll('.gcw-dot').forEach((d, i) => d.setAttribute('aria-current', String(i === p)));
      const count = dots.querySelector('.gcw-count');
      if (count) count.textContent = `${p + 1} / ${pages}`;
    }
    function measure() {
      step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
      perView = Math.max(1, Math.round(el.querySelector('.gcw-carousel').clientWidth / step));
      pages = Math.ceil(cards.length / perView);
      nav.hidden = maxScroll() <= 4;
      dots.innerHTML = pages > 8
        ? '<span class="gcw-count" aria-live="polite"></span>'
        : Array.from({ length: pages }, (_, i) =>
            `<button type="button" class="gcw-dot" aria-label="Page ${i + 1} of ${pages}"></button>`).join('');
      update();
    }

    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    dots.addEventListener('click', e => {
      const dot = e.target.closest('.gcw-dot');
      if (dot) go([...dots.children].indexOf(dot));
    });
    track.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(measure).observe(track);
  }

  const message = (el, text, detail) => {
    el.innerHTML = `<div class="gcw-msg">${esc(text)}${detail ? `<small>${esc(detail)}</small>` : ''}</div>`;
  };

  // ---------- Calendar (month view) ----------
  // Days are handled as UTC midnights keyed 'YYYY-MM-DD', so daylight saving never shifts a day.
  const keyOf = d => d.toISOString().slice(0, 10);
  const keyFromParts = p => `${p.year}-${p.month}-${p.day}`;

  function setupCalendar(el, events, cfg, tz) {
    const root = el.querySelector('.gcw-cal');
    const fmt = opts => new Intl.DateTimeFormat(cfg.locale, { ...opts, timeZone: 'UTC' });
    const dayLabel = fmt({ weekday: 'long', month: 'long', day: 'numeric' });
    const todayKey = keyFromParts(partsIn(new Date(), tz));
    const today = ymdToDate(todayKey);

    // Which days each event covers (multi-day events fill every day they span)
    const byDay = new Map();
    events.forEach((e, i) => {
      const last = e.allDay ? e.ep : partsIn(new Date(Math.max(+e.start, +e.end - 1)), e.ftz);
      let t = +ymdToDate(keyFromParts(e.sp));
      const end = Math.min(+ymdToDate(keyFromParts(last)), t + 62 * DAY);
      for (; t <= end; t += DAY) {
        const k = keyOf(new Date(t));
        if (!byDay.has(k)) byDay.set(k, []);
        byDay.get(k).push(i);
      }
    });
    const days = [...byDay.keys()].sort();

    // Start on today if it has events, otherwise the next day that does
    let selected = byDay.has(todayKey) ? todayKey : days.find(k => k >= todayKey) || null;
    const startDate = ymdToDate(selected || todayKey);
    let y = startDate.getUTCFullYear(), m = startDate.getUTCMonth();
    const monthIndex = d => d.getUTCFullYear() * 12 + d.getUTCMonth();
    const minMonth = monthIndex(today);
    const maxMonth = Math.max(minMonth, days.length ? monthIndex(ymdToDate(days[days.length - 1])) : minMonth);

    const weekdays = Array.from({ length: 7 }, (_, i) => {
      const d = Date.UTC(2023, 0, 1 + ((i + cfg.weekStart) % 7)); // Jan 1, 2023 was a Sunday
      return `<span class="gcw-cal-wd" aria-hidden="true">${esc(fmt({ weekday: 'short' }).format(d))}</span>`;
    }).join('');

    function dayPanel() {
      if (!selected) return events.length ? '' : `<div class="gcw-day"><p class="gcw-cal-empty">${esc(cfg.empty)}</p></div>`;
      const rows = (byDay.get(selected) || []).map(j => {
        const e = events[j];
        const loc = e.location ? `<p class="gcw-meta">${isUrl(e.location) ? ICON.video : ICON.pin}<span>${isUrl(e.location) ? 'Online' : esc(e.location)}</span></p>` : '';
        return `<div class="gcw-row">
          <div class="gcw-media gcw-thumb">${mediaHTML(e, cfg, false)}</div>
          <div class="gcw-row-body">
            <h4 class="gcw-title">${esc(e.title)}</h4>
            ${highlightHTML(e)}
            <p class="gcw-meta">${ICON.clock}<span>${esc(whenText(e, cfg.locale))}</span></p>
            ${loc}
          </div>
          <button type="button" class="gcw-more" data-i="${j}" aria-haspopup="dialog" aria-label="Event details: ${esc(e.title)}"><span class="gcw-arrow" aria-hidden="true">→</span></button>
        </div>`;
      }).join('');
      return `<div class="gcw-day"><p class="gcw-day-h">${esc(dayLabel.format(ymdToDate(selected)))}</p>
        ${rows || '<p class="gcw-cal-empty">No events on this day.</p>'}</div>`;
    }

    function render() {
      const first = Date.UTC(y, m, 1);
      const lead = (new Date(first).getUTCDay() - cfg.weekStart + 7) % 7;
      const cellCount = Math.ceil((lead + new Date(Date.UTC(y, m + 1, 0)).getUTCDate()) / 7) * 7;
      let grid = '';
      for (let i = 0; i < cellCount; i++) {
        const date = new Date(first + (i - lead) * DAY);
        const k = keyOf(date);
        const idx = byDay.get(k) || [];
        const cls = ['gcw-cal-day', date.getUTCMonth() !== m && 'is-out', k < todayKey && 'is-past',
          k === todayKey && 'is-today', idx.length && 'has-events', k === selected && 'is-selected'].filter(Boolean).join(' ');
        const num = `<span class="gcw-cal-num">${date.getUTCDate()}</span>`;
        if (!idx.length) { grid += `<div class="${cls}">${num}</div>`; continue; }
        const titles = idx.slice(0, 2).map(j => `<span class="gcw-cal-ev">${esc(events[j].title)}</span>`).join('') +
          (idx.length > 2 ? `<span class="gcw-cal-ev gcw-cal-more">+${idx.length - 2} more</span>` : '');
        grid += `<button type="button" class="${cls}" data-day="${k}" aria-pressed="${k === selected}"
          aria-label="${esc(dayLabel.format(date))}: ${idx.length} event${idx.length > 1 ? 's' : ''}">${num}<span class="gcw-cal-evs" aria-hidden="true">${titles}</span></button>`;
      }
      const ym = y * 12 + m;
      root.innerHTML = `
        <div class="gcw-cal-head">
          <h3 class="gcw-title gcw-cal-title" aria-live="polite">${esc(fmt({ month: 'long', year: 'numeric' }).format(first))}</h3>
          <div class="gcw-cal-nav">
            <button type="button" class="gcw-cal-today"${ym === minMonth ? ' hidden' : ''}>Today</button>
            <button type="button" class="gcw-nav-btn gcw-cal-prev" aria-label="Previous month"${ym <= minMonth ? ' disabled' : ''}>${ICON.left}</button>
            <button type="button" class="gcw-nav-btn gcw-cal-next" aria-label="Next month"${ym >= maxMonth ? ' disabled' : ''}>${ICON.right}</button>
          </div>
        </div>
        <div class="gcw-cal-grid">${weekdays}${grid}</div>
        ${dayPanel()}`;
    }

    root.addEventListener('click', ev => {
      const t = ev.target;
      let focus;
      const day = t.closest('.gcw-cal-day[data-day]');
      if (day) {
        selected = day.dataset.day;
        const d = ymdToDate(selected);
        y = d.getUTCFullYear(); m = d.getUTCMonth();
        focus = `[data-day="${selected}"]`;
      } else if (t.closest('.gcw-cal-prev')) { m--; focus = '.gcw-cal-prev'; }
      else if (t.closest('.gcw-cal-next')) { m++; focus = '.gcw-cal-next'; }
      else if (t.closest('.gcw-cal-today')) {
        y = today.getUTCFullYear(); m = today.getUTCMonth(); focus = '.gcw-cal-next';
        if (byDay.has(todayKey)) selected = todayKey;
      } else return;
      if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
      render();
      const f = root.querySelector(focus);
      if (f && !f.disabled) f.focus();
    });
    render();
  }

  // ---------- Data ----------
  async function fetchCalendar(id, cfg) {
    if (cfg.apiKey === 'DEMO' && window.GCW_MOCK) return window.GCW_MOCK;
    const now = new Date();
    // The calendar view also shows earlier events from the current month
    const from = cfg.layout === 'calendar' ? new Date(now.getFullYear(), now.getMonth(), 1) : now;
    const q = new URLSearchParams({
      key: cfg.apiKey,
      singleEvents: 'true',
      orderBy: 'startTime',
      timeMin: from.toISOString(),
      timeMax: new Date(+now + cfg.days * DAY).toISOString(),
      maxResults: String(Math.min(cfg.max, 250))
    });
    const res = await fetch(`${API}${encodeURIComponent(id)}/events?${q}`);
    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try { detail += ` – ${(await res.json()).error.message}`; } catch (_) { /* no JSON body */ }
      throw new Error(`${id}: ${detail}`);
    }
    return res.json();
  }

  let uidCounter = 0;
  async function mount(el) {
    // Site-wide defaults (window.GCW_DEFAULTS), overridden by any data-* set on this block
    const d = Object.assign({}, window.GCW_DEFAULTS);
    for (const [k, v] of Object.entries(el.dataset)) if (v !== '') d[k] = v;
    const layout = ['grid', 'list', 'carousel', 'calendar'].includes(d.layout) ? d.layout : 'carousel';
    const cfg = {
      uid: `gcw${++uidCounter}`,
      apiKey: String(d.apiKey || '').trim(),
      calendars: String(d.calendarId || '').split(',').map(s => s.trim()).filter(Boolean),
      // The calendar view shows every event in range, not just the next few
      max: layout === 'calendar' ? 250 : Math.max(1, parseInt(d.maxEvents, 10) || 9),
      days: Math.max(1, parseInt(d.daysAhead, 10) || 365),
      layout,
      weekStart: /^(1|mon)/i.test(String(d.weekStart || '')) ? 1 : 0,
      fit: d.imageFit === 'contain' ? 'contain' : 'cover',
      fallback: String(d.fallbackImage || '').trim(),
      tz: String(d.timeZone || '').trim(),
      empty: d.emptyText || 'No upcoming events right now. Check back soon!',
      locale: d.locale || undefined,
      showDescription: String(d.showDescription) === 'true'
    };
    if (d.accent) el.style.setProperty('--gcw-accent', d.accent);
    el.classList.add(`gcw--${cfg.layout}`, `gcw--fit-${cfg.fit}`);

    // Show technical error details only in the editor, Safe Preview (a frame), or local testing
    let framed = true;
    try { framed = window.top !== window; } catch (_) { /* cross-origin frame */ }
    const isEditor = framed || !location.hostname || /squarespace\.com$/.test(location.hostname) ||
      /^(localhost|127\.0\.0\.1)$/.test(location.hostname) || location.protocol === 'file:';
    if (!cfg.apiKey || cfg.apiKey === 'YOUR_GOOGLE_API_KEY' || !cfg.calendars.length || /^your_calendar_id/.test(cfg.calendars[0])) {
      return message(el, 'Calendar widget: set your Google API key and calendar ID in GCW_DEFAULTS (Code Injection) or on this block.');
    }
    el.innerHTML = skeleton(Math.min(cfg.max, 3), cfg.layout);

    let events, tz;
    try {
      const results = await Promise.all(cfg.calendars.map(id => fetchCalendar(id, cfg)));
      tz = cfg.tz || results[0].timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      events = results
        .flatMap(r => r.items || [])
        .filter(ev => ev.status !== 'cancelled' && ev.start && (ev.start.date || ev.start.dateTime))
        .map(ev => normalize(ev, tz))
        .sort((a, b) => (a.sortKey < b.sortKey ? -1 : a.sortKey > b.sortKey ? 1 : 0))
        .slice(0, cfg.max);
    } catch (err) {
      console.error('[calendar widget]', err);
      if (/referer null/i.test(err.message)) {
        // Squarespace's Safe Preview runs code in an isolated frame that sends no website address
        return message(el, "Events can't load in Safe Preview, because it hides your site's address from Google.",
          'This is expected. View the published page in a private window to check the widget.');
      }
      // Only site editors (on *.squarespace.com) see the technical detail.
      return message(el, "Sorry, we couldn't load upcoming events right now.", isEditor ? err.message : '');
    }
    if (!events.length && cfg.layout !== 'calendar') return message(el, cfg.empty);

    let body;
    if (cfg.layout === 'calendar') body = '<div class="gcw-cal"></div>';
    else {
      const cards = events.map((e, i) => cardHTML(e, i, cfg)).join('');
      body = cfg.layout === 'carousel' ? carouselHTML(cards) : `<div class="gcw-grid">${cards}</div>`;
    }
    el.innerHTML = `${body}<dialog class="gcw-dialog" aria-labelledby="${cfg.uid}-title"></dialog>`;
    const dlg = el.querySelector('.gcw-dialog');
    if (cfg.layout === 'carousel') setupCarousel(el);
    if (cfg.layout === 'calendar') setupCalendar(el, events, cfg, tz);

    el.addEventListener('click', ev => {
      const more = ev.target.closest('.gcw-more');
      if (more) {
        dlg.innerHTML = dialogHTML(events[+more.dataset.i], cfg);
        document.documentElement.style.overflow = 'hidden';
        dlg.showModal();
        dlg.scrollTop = 0;
        dlg.querySelector('.gcw-close').focus();
        return;
      }
      if (ev.target === dlg || ev.target.closest('.gcw-close')) dlg.close();
    });
    dlg.addEventListener('close', () => { document.documentElement.style.overflow = ''; });

    // Broken or private images fall back to the placeholder
    el.addEventListener('error', ev => {
      const media = ev.target instanceof HTMLImageElement && ev.target.closest('.gcw-media');
      if (!media || media.dataset.failed) return;
      media.dataset.failed = '1';
      media.querySelectorAll('.gcw-img,.gcw-bg').forEach(n => n.remove());
      media.insertAdjacentHTML('afterbegin', PLACEHOLDER);
    }, true);
  }

  function init() {
    document.querySelectorAll('.gcw:not([data-gcw-ready])').forEach(el => {
      el.setAttribute('data-gcw-ready', '');
      mount(el);
    });
  }
  window.__gcwInit = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('mercury:load', init); // Squarespace 7.0 AJAX page loads
  // Catch blocks added after load (e.g. while editing a page in Squarespace).
  // The observer batches changes itself, and init() only touches new .gcw blocks.
  new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
})();
