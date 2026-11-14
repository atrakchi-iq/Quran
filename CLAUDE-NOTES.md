# Notes for Claude — جمعة جاد الله – القرآن بدون نت (quran.atrakchi.contact)

Current state: **v16 (14 Nov 2026), SW VERSION `quran-v16`**. Keep this file updated every release (it replaces the old per-version history; v4–v14 summarised below).

## Owner & working rules
- Owner: Dawood Al-Atrakchi (older, retired engineer). Writes Arabic; reply in Arabic. Discuss first when he says "مناقشة", execute only after his go-ahead; do all pending changes in ONE delivery.
- He cannot download .js files from chat: deliver a .zip (fallback: .txt suffix). He uploads to GitHub himself: < 100 files per upload. Update packages: code only, no images. END of a session (not each step): one complete, non-duplicated keep-package (with icons/screenshots/muadhin.jpg), exactly two explanation files: README.md (for him) + this file (for Claude). Tell him if a file is missing.
- Audience of the app: elderly / low-education readers → keep UI as simple as possible; no extra buttons unless needed.
- Credit economy: he buys usage; avoid wasteful rebuilds.

## Name (30 chars exactly)
- name / title / header / Play: «جمعة جاد الله – القرآن بدون نت» (en-dash). manifest short_name «القرآن». Short description (67 chars): «المصحف كاملاً بدون نت لـ 7 قراء، دعواتكم للحاج جمعة جاد الله الشريف». Honorific is «الحاج». Older names («…بدون انترنت», short_name «القرآن بدون انترنت» / «القرآن الكريم») are obsolete.

## Architecture
- PWA, single `index.html` (RTL Arabic, offline-first), plus `splash.js`, `sw.js`, `quran-data.js`, `manifest.json`, `privacy.html`, `terms.html`, `play-store-listing.md`, `fonts/` (Amiri Quran, Cairo 400/600), `icons/`, `screenshots/`, `muadhin.jpg`, `.well-known/assetlinks.json`.
- Text: `quran-data.js` = Tanzil Uthmani v1.1 verbatim (CC BY 3.0, header comment: DO NOT EDIT) → `window.QURAN {n:names, v:verses, src, join}`. render() strips the 4 bismillah tokens (shown in `#bsm`); `wordsOf()` attaches pause signs to previous word, U+06DE to next, merges pairs listed in `QURAN.join` (15:7, 27:20, 36:22, 37:164, 41:47) so highlighting matches Quran.com segments.
- Audio + word timestamps: Quran.com API v4 `chapter_recitations?segments=true` (streamed or downloaded to IndexedDB `quran-offline`, key `reciter:surah` → {blob, stamps}). Sizes via `GET /chapter_recitations/{rec}` (`SIZES`). 7 reciters (ids 7,6,9,2,3,10,5). Download UI: ring panel `#pp`, `refreshDl()` sets label/icon/.done after save (v13 fix).
- localStorage: `surah`, `reciter`, `pos`, `pmode` (0 none /1 repeat /2 next surah), `fx-theme` (paper|night). Theme: `html[data-theme]`, head script sets it before paint.
- Media Session (metadata in load(), play/pause/stop/seek/prev/next, position state). Background play works with screen locked.
- **Wake Lock (v15):** `keepAwake()` at the end of index.html script: requests `navigator.wakeLock.request("screen")` on load, re-requests on `visibilitychange` (visible) and on first tap/key. No button by owner's choice; when he locks the screen with the hardware button the lock drops and audio continues. Fails silently on unsupported devices. No privacy impact.
- **Reading position (v16):** localStorage `pos` = "surah:verse" = first `.v` visible under the sticky header, saved on scroll (debounced 400 ms) and on `visibilitychange`→hidden (`savePos()`); `restorePos()` runs right after the first `load()` in init(): if `pos` surah == current surah it scrolls to that verse (re-applied once after `document.fonts.ready`), otherwise sets `pos` to `surah:1`. load() always `scrollTo(0,0)`, so a surah/reciter change starts at the top. No button; audio is NOT started from that verse. `history.scrollRestoration="manual"`.
- `sw.js`: app-shell cache, cache-first with background refresh, external origins not intercepted. Bump VERSION on EVERY change, together with `<span id="ver">` in index.html (Arabic-Indic digits + date) and README.
- Splash: 15 s, skip after 3 s, once per session, `?splash=1` forces; dua right + signature/name left. Signature = vector `<symbol id="sig">` right after `<body>`, reused by index.html and splash.js (no image).
- Style: Atrakchi Family Style (bands, thin borders, near-square corners, grid paper only on #hero/.ded/splash). Accent #1E6B66 / night #7FC4BA, band #292B27 / #141513. Owner removed ALL small square markers in the app (legal pages still have them). Dedication has NO final period. No "إهداء/أهديته" wording. Footer credit: «داود الاطرقجي للاستشارات الهندسية» → https://www.atrakchi.com/ (email only in privacy/terms).
- Legal: privacy.html / terms.html mention Quran.com + Google Fonts + Vercel logs; if features change (ads, analytics, accounts, tafsir from an online source) update them and the Play Data safety form.

## Deployment / Google Play
- GitHub → Vercel; domain Squarespace. TWA via PWABuilder, package `contact.atrakchi.quran.twa`; Play personal developer account, closed testing (12 testers / 14 days) before production. Because the TWA loads the live site, web updates do NOT affect the Play review or the uploaded Play screenshots.
- `.well-known/assetlinks.json` on GitHub holds the owner's 4 SHA-256 fingerprints: NEVER overwrite it or ship a copy for upload.
- Play screenshots must be ≤ 2:1 (1080×1920); manifest screenshots: phone-1..3 narrow 1080×1920, wide-1..2 1280×720 (rendered with Playwright, audio not live). `feature-graphic.png` (1024×500) is in the keep-package (supplied by the owner 14 Nov); Play Console only, not for GitHub.
- Update rule: tell the owner exactly which files to upload (v16: index.html, sw.js, README.md, CLAUDE-NOTES.md). Diff against his GitHub export when he supplies one. `quran-package-offline.zip` (10 Nov) is obsolete and removed; it may still sit on GitHub (he can delete it).

## History (short)
- v4: Family Style UI, download ring + sizes. v5: name, footer, theme toggle, version line. v6: manifest screenshots/shortcuts (`/?surah=N`). v7: Tanzil text replaced old file (provenance). v8: #mode button, honorific الحاج. v9: Media Session. v10: privacy rewrite, Play title 30 chars, assetlinks template, play-store-listing.md. v11: header/title = Play name, short_name «القرآن», new 1080×1920 screenshots, surah select fix on phones; owner verified on device: live audio/highlight/download/offline/background/lock screen/5 joined verses. v13: wording of download buttons, splash redesign, real muadhin.jpg, download-button refresh bug fixed. v14: dedication/signature layout (SVG). v15: Wake Lock; docs cleaned; obsolete offline zip removed. **v16: reading position remembered (`pos`).**

## Deferred ideas (owner postponed)
- Tafsir (e.g. Muyassar, check licence; offline text file) and verse search (index quran-data.js with diacritics stripped). Suggested together as one later release with a single large button. Also considered, not requested: font-size A+/A− buttons.
