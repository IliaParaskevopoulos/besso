/* Scales fixed-size design boards (iframes) to fit their column. Markup: <figure class="bd" data-w="1200"><iframe src="boards/x.html"></iframe></figure> */
{
  const fit = fig => {
    const fr = fig.querySelector('iframe');
    const w = +fig.dataset.w || 1200;
    let h = +fig.dataset.h || 900;
    try { const d = fr.contentDocument; if (d && d.body) h = Math.max(d.documentElement.scrollHeight, d.body.scrollHeight) || h; } catch (e) {}
    const s = Math.min(1, fig.clientWidth / w);
    fr.style.width = w + 'px';
    fr.style.height = h + 'px';
    fr.style.transform = 'scale(' + s + ')';
    fig.style.height = Math.ceil(h * s) + 'px';
  };
  const figs = [...document.querySelectorAll('figure.bd')];
  figs.forEach(f => {
    const fr = f.querySelector('iframe');
    fr.setAttribute('scrolling', 'no');
    fr.addEventListener('load', () => fit(f));
    fit(f);
  });
  const boardsRO = new ResizeObserver(entries => entries.forEach(e => fit(e.target)));
  figs.forEach(f => boardsRO.observe(f));
}
