# Design QA

final result: passed

## Self Check

1. Homepage purpose
   - Updated from a digital business-card style page to a practical application and sales inquiry page.
   - Primary actions now support WLC course application, AHA Sopoong ending-note purchase inquiry, and institutional education consultation.

2. Existing assets and brand
   - Preserved `assets/salmitda-logo.svg`, `assets/profile-photo.jpg`, `assets/favicon.svg`, and `contact.vcf`.
   - Organization name is consistently written as `삶잇다협동조합`.

3. Inquiry flow safety
   - Preserved the existing form and Google Sheets web-app post path.
   - Preserved compatibility hooks in the order `window.saveInquiry`, `window.submitInquiry`, Google Sheets, then `localStorage` fallback.
   - Added `quantity` and `region` fields for course, textbook, ending-note, and institution inquiries.

4. Customer-facing conversion paths
   - Added direct button presets so CTA clicks automatically select the matching inquiry category.
   - Added sections for official trust information, WLC curriculum, AHA Sopoong ending-note contents, institution education packages, FAQ, representative profile, and contact.

5. Responsive layout
   - Mobile remains single-column.
   - Wider screens use two-column hero, two-column program/schedule sections, three-column trust cards, and four-column institution package cards at large desktop width.
   - Korean text uses `word-break: keep-all` and responsive stacking to reduce awkward line breaks.

## Automated Checks

- `node --check script.js`: passed.
- CSS viewport-scaling scan for `clamp(` and `vw`: passed with no matches.
- Key content scan for `삶잇다협동조합`, `WLC 자격과정`, `아하소풍`, `엔딩노트`, and `data-preset-category`: passed.
