/* Splash / opening screen - gift dedication. Load with: <script src="splash.js"></script> */
(function () {
  var CFG = {
    photo: 'muadhin.jpg',        /* put the photo in the repo root with this name */
    fallback: 'icons/icon-512.png',    /* shown until the photo exists */
    showMs: 7000,                /* total time on screen */
    skipAfterMs: 3000            /* tap-to-skip becomes available */
  };
  var force = /[?&]splash=1/.test(location.search);
  try { if (!force && sessionStorage.getItem('splash-done')) { return; } } catch (e) {}

  var css = '' +
  '#qsp{position:fixed;inset:0;z-index:99999;background:#292B27;color:#F2EEE5;display:flex;flex-direction:column;align-items:center;overflow-y:auto;' +
  'font-family:Cairo,"Segoe UI",Tahoma,Arial,sans-serif;direction:rtl;transition:opacity .45s ease;' +
  'background-image:linear-gradient(rgba(242,238,229,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(242,238,229,.05) 1px,transparent 1px);background-size:26px 26px}' +
  '#qsp.out{opacity:0}' +
  '#qsp .in{margin:auto;width:100%;max-width:520px;padding:28px 22px;text-align:center}' +
  '#qsp .bsm{color:#A3C4AC;font-size:1.25rem;font-weight:600;margin:0 0 18px}' +
  '#qsp .ph{width:150px;height:150px;margin:0 auto 20px;border:2px solid #A3C4AC;padding:5px;background:#34362F;border-radius:2px}' +
  '#qsp .ph img{width:100%;height:100%;object-fit:cover;display:block;border-radius:1px}' +
  '#qsp .tx{font-size:1.35rem;font-weight:600;line-height:2.1;margin:0 0 16px;padding-top:14px;border-top:1.5px solid #C99A70}' +
  '#qsp .gf{font-size:.85rem;color:#A6A196;margin:0}' +
  '#qsp .gf::before{content:"";display:inline-block;width:9px;height:9px;background:#C99A70;margin-left:9px}' +
  '#qsp .sk{margin-top:16px;font-size:.85rem;color:#A3C4AC;visibility:hidden}' +
  '#qsp .sk.on{visibility:visible}';

  var html = '' +
  '<div class="in">' +
  '<p class="bsm">بسم الله الرحمن الرحيم</p>' +
  '<div class="ph"><img id="qspImg" alt=""></div>' +
  '<p class="tx">«لا تنسوا مؤذن مسجد الحلواني، السيد جمعة جاد الله الشريف، من صالح دعائكم.»</p>' +
  '<p class="gf">إهداءٌ من المطوّر: داود الاطرقجي للاستشارات الهندسية</p>' +
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
