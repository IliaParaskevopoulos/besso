/* Shared site menu. Each page loads this with data-page="<id>" right after <body>. */
{
  try {
    const me = document.currentScript;
    const page = (me && me.dataset.page) || '';
    const items = [
      { id: 'home', label: 'Home', href: 'index.html' },
      { id: 'pmm', label: 'Product Marketing', children: [
        { id: 'positioning', label: 'Positioning Map', href: 'positioning.html', note: 'Five decisions and two competitor maps' },
        { id: 'messaging', label: 'Messaging House', href: 'messaging-house.html', note: 'Core message, three pillars, pitches' },
        { id: 'icp', label: 'ICP & Buyer Personas', href: 'icp.html', note: 'Who buys, who decides, how to reach them' },
        { id: 'vp', label: 'Value Propositions', href: 'value-propositions.html', note: 'One canvas per ICP' }
      ]},
      { id: 'sales', label: 'Sales Enablement', children: [
        { id: 'battlecards', label: 'Battlecards', href: 'battlecards.html', note: 'Four alternatives and doing nothing' },
        { id: 'objections', label: 'Objection Handling', href: 'objection-handling.html', note: '13 objections, 9 tough questions' }
      ]},
      { id: 'b2b', label: 'B2B Outreach', href: 'b2b-outreach.html' },
      { id: 'tim', label: 'TIM MVP', href: 'tim-mvp.html' },
      { id: 'web', label: 'Website Build', href: 'website-build.html' }
    ];

    if (!document.querySelector('link[href*="Montserrat"]')) {
      const f = document.createElement('link');
      f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
      document.head.appendChild(f);
    }

    const css = document.createElement('style');
    css.textContent = `
.sn{background:#702963;color:#fff;font:500 14.5px/1.3 Montserrat,system-ui,sans-serif;position:relative;z-index:30;border-bottom:1px solid rgba(255,255,255,.18)}
.sn *{box-sizing:border-box}
.sn-in{max-width:1360px;margin:0 auto;padding:0 max(3vw,16px);display:flex;flex-wrap:wrap;align-items:center;gap:4px 14px;min-height:60px}
.sn-brand{color:#fff;text-decoration:none;font-weight:700;font-size:15px;margin-inline-end:auto;padding:10px 0;white-space:nowrap}
.sn-brand span{font-weight:400;color:#f0dceb}
.sn-list{display:flex;flex-wrap:wrap;gap:2px;margin:0;padding:0;list-style:none}
.sn-list>li{position:relative}
.sn a.sn-l,.sn button.sn-l{display:flex;align-items:center;gap:6px;min-height:44px;padding:0 10px;color:#fff;text-decoration:none;background:none;border:0;border-radius:6px;font:inherit;cursor:pointer;white-space:nowrap}
.sn .sn-l:hover{background:rgba(255,255,255,.12)}
.sn .sn-l:focus-visible,.sn-menu a:focus-visible{outline:3px solid #fff;outline-offset:1px}
.sn .sn-l[aria-current=page]{box-shadow:inset 0 -3px 0 #fff;border-radius:6px 6px 0 0}
.sn-car{width:9px;height:9px;border:solid currentColor;border-width:0 2px 2px 0;transform:translateY(-2px) rotate(45deg);transition:transform .15s}
.sn-open>.sn-l .sn-car{transform:translateY(2px) rotate(-135deg)}
.sn-menu{display:none;position:absolute;top:100%;left:0;min-width:280px;margin:6px 0 0;padding:6px;list-style:none;background:#fff;color:#1F1A1E;border-radius:10px;box-shadow:0 14px 34px rgba(31,26,30,.25)}
.sn-open>.sn-menu{display:block}
.sn-menu a{display:block;padding:10px 12px;border-radius:7px;color:#1F1A1E;text-decoration:none;font-weight:600}
.sn-menu a small{display:block;font-weight:400;color:#5f5560;font-size:13px;margin-top:2px}
.sn-menu a:hover{background:#F6F1F5}
.sn-menu a[aria-current=page]{background:#f1e3ed;color:#702963}
@media(max-width:720px){.sn-in{padding-block:6px}.sn-brand{width:100%}.sn-list{width:100%}.sn-menu{position:static;box-shadow:none;margin:0 0 6px;min-width:0}.sn-list>li.sn-open{width:100%}}
@media(prefers-reduced-motion:reduce){.sn-car{transition:none}}
`;
    document.head.appendChild(css);

    const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const cur = id => id === page ? ' aria-current="page"' : '';
    const li = items.map(it => {
      if (!it.children) return `<li><a class="sn-l" href="${it.href}"${cur(it.id)}>${esc(it.label)}</a></li>`;
      const inside = it.children.some(c => c.id === page);
      return `<li class="sn-dd"><button class="sn-l" type="button" aria-expanded="false" aria-controls="sn-m-${it.id}"${inside ? ' aria-current="page"' : ''}>${esc(it.label)}<i class="sn-car" aria-hidden="true"></i></button>`
        + `<ul class="sn-menu" id="sn-m-${it.id}">` + it.children.map(c => `<li><a href="${c.href}"${cur(c.id)}>${esc(c.label)}<small>${esc(c.note)}</small></a></li>`).join('') + `</ul></li>`;
    }).join('');

    const bar = document.createElement('div');
    bar.className = 'sn';
    bar.setAttribute('role', 'navigation');
    bar.setAttribute('aria-label', 'Site');
    bar.innerHTML = `<div class="sn-in"><a class="sn-brand" href="index.html">Ilia Paraskevopoulos <span>× besso</span></a><ul class="sn-list">${li}</ul></div>`;
    document.body.insertBefore(bar, document.body.firstChild);

    const close = except => bar.querySelectorAll('.sn-dd').forEach(d => {
      if (d === except) return;
      d.classList.remove('sn-open');
      d.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    bar.querySelectorAll('.sn-dd').forEach(d => {
      const b = d.querySelector('button');
      b.addEventListener('click', e => {
        e.stopPropagation();
        const open = !d.classList.contains('sn-open');
        close(d);
        d.classList.toggle('sn-open', open);
        b.setAttribute('aria-expanded', String(open));
      });
    });
    document.addEventListener('click', e => { if (!bar.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  } catch (err) { /* the page still works without the menu */ }
}
