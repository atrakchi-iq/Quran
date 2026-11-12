/* Splash / opening screen - gift dedication. Load with: <script src="splash.js"></script> */
(function () {
  var CFG = {
    photo: 'muadhin.jpg',        /* put the photo in the repo root with this name */
    fallback: 'icons/icon-512.png',    /* shown until the photo exists */
    showMs: 15000,                /* total time on screen */
    skipAfterMs: 3000            /* tap-to-skip becomes available */
  };
  var force = /[?&]splash=1/.test(location.search);
  try { if (!force && sessionStorage.getItem('splash-done')) { return; } } catch (e) {}

  var css = '' +
  '#qsp{position:fixed;inset:0;z-index:99999;background:#292B27;color:#FBF8F0;display:flex;flex-direction:column;align-items:center;overflow-y:auto;' +
  'font-family:Cairo,"Segoe UI",Tahoma,Arial,sans-serif;direction:rtl;transition:opacity .45s ease;' +
  'background-image:linear-gradient(rgba(242,238,229,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(242,238,229,.05) 1px,transparent 1px);background-size:26px 26px}' +
  '#qsp.out{opacity:0}' +
  '#qsp .in{margin:auto;width:100%;max-width:520px;padding:20px 20px 24px;text-align:center}' +
  '#qsp .bsm{color:#BFE3C8;font-size:1.5rem;font-weight:600;line-height:1.6;margin:0 0 12px}' +
  '#qsp .ph{height:min(35vh,340px);aspect-ratio:4/5;margin:0 auto 16px;border:2px solid #BFE3C8;padding:5px;background:#34362F;border-radius:2px;box-sizing:content-box}' +
  '#qsp .ph img{width:100%;height:100%;object-fit:cover;object-position:50% 20%;display:block;border-radius:1px}' +
  '#qsp .tx{font-size:1.45rem;font-weight:700;line-height:1.95;color:#FFFFFF;margin:0 0 6px;padding-top:12px;border-top:2px solid #E8C79E;text-align:start}' +
  '#qsp .sg{display:block;width:max-content;margin:0 auto 0 0;text-align:center}' +
  '#qsp .sg svg{display:block;width:170px;height:auto;margin:0 auto 2px;color:#A9B6FF}' +
  '#qsp .sg span{display:block;font-size:1.15rem;font-weight:700;color:#E8C79E;line-height:1.7}' +
  '#qsp .sk{margin:14px 0 0;font-size:1rem;color:#BFE3C8;visibility:hidden}' +
  '#qsp .sk.on{visibility:visible}';

  var html = '' +
  '<div class="in">' +
  '<p class="bsm">بسم الله الرحمن الرحيم</p>' +
  '<div class="ph"><img id="qspImg" alt=""></div>' +
  '<p class="tx">«لا تنسوا مؤذن مسجد الحلواني، الحاج جمعة جاد الله الشريف، من صالح دعائكم»</p>' +
  '<div class="sg"><svg viewBox="0 0 1000 396" aria-hidden="true"><use href="#sig"/></svg><span>داود الاطرقجي للاستشارات الهندسية</span></div>' +
  '<p class="sk" id="qspSk">اضغط في أي مكان للمتابعة</p>' +
  '</div>';

  function start() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement('div'); box.id = 'qsp'; box.innerHTML = html;
    document.body.appendChild(box);

    var img = document.getElementById('qspImg');
    var triedFallback = false;
    img.onerror = function () {
      if (!triedFallback) { triedFallback = true; img.src = CFG.fallback; }
      else { img.style.display = 'none'; }
    };
    img.src = CFG.photo;

    var closed = false, canSkip = false;
    function close() {
      if (closed) return; closed = true;
      try { sessionStorage.setItem('splash-done', '1'); } catch (e) {}
      box.classList.add('out');
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); if (st.parentNode) st.parentNode.removeChild(st); }, 500);
    }
    setTimeout(function () { canSkip = true; document.getElementById('qspSk').classList.add('on'); }, CFG.skipAfterMs);
    box.addEventListener('click', function () { if (canSkip) close(); });
    setTimeout(close, CFG.showMs);
  }
  if (document.body) { start(); } else { document.addEventListener('DOMContentLoaded', start); }
})();
