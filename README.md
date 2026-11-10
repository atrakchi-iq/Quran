# المصحف المسموع — شرح للمالك

الرابط: https://quran.atrakchi.contact/  |  الاستضافة: Vercel  |  الكود: GitHub  |  النطاق: Squarespace Domains

## الملفات التي ترفعها إلى GitHub (جذر المشروع)
| الملف | ما هو |
|---|---|
| index.html | التطبيق (ألوان عائلة الاطرقجي + روابط الخصوصية والاستخدام + الشكر) |
| manifest.json | ملف التثبيت (لون الشريط والخلفية فحمي #292B27) |
| privacy.html | سياسة الخصوصية (رابطها يوضع في Play Console) |
| terms.html | اتفاقية الاستخدام |
| splash.js | الصفحة الافتتاحية (الإهداء) |
| README.md | هذا الملف |
| CLAUDE-NOTES.md | ملف لـ Claude في الجلسات القادمة |

ملفات لا تتغير ولا تُرفع الآن: مجلد `icons/` (الأيقونات). الصور لا تدخل الحزم.

## الصفحة الافتتاحية
- مدتها 7 ثوانٍ، ويمكن تجاوزها بلمسة بعد 3 ثوانٍ، وتظهر مرة واحدة في كل جلسة.
- لتجربتها مجدداً: افتح `https://quran.atrakchi.contact/?splash=1`
- **صورة المؤذن:** سمّها `muadhin.jpg` وارفعها إلى جذر المشروع (بجانب index.html). حتى ذلك الحين تظهر أيقونة البرنامج.
- لتغيير المدة: أول الملف `splash.js` (showMs بالملّي ثانية).

## Google Play
- رابط سياسة الخصوصية: https://quran.atrakchi.contact/privacy.html
- في Data safety: لا جمع بيانات من المطوّر. يتصل التطبيق بـ Quran.com (النص والصوت) وGoogle Fonts (الخطوط)، وهما مذكوران في السياسة.
- بصمة SHA-256 الخاصة بـ Google تُضاف إلى `.well-known/assetlinks.json` بعد أول رفع.

## ملاحظات
- لا توجد أوامر SQL ولا مواقع أخرى في هذه الجلسة.
- اللون الأساسي للتطبيق: #1E6B66 (ليلاً #7FC4BA)، وهو متغير `--accent` في index.html وصفحتي privacy/terms.
- الخط IBM Plex Sans Arabic غير مستخدم هنا (التطبيق يستخدم Cairo وAmiri Quran من Google Fonts).
