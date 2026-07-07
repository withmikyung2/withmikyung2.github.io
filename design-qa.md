# Design QA

final result: passed

## Self Check

1. Homepage structure
   - Changed from one long page to a short main page plus separate detail pages.
   - Main page now keeps only the hero, quick navigation cards, and representative summary.
   - Detail content moved to `wlc.html`, `notebook.html`, `education.html`, and `contact.html`.

2. Existing assets and brand
   - Preserved `assets/salmitda-logo.svg`, `assets/profile-photo.jpg`, `assets/favicon.svg`, and `contact.vcf`.
   - Organization name is consistently written as `삶잇다협동조합`.

3. Inquiry flow safety
   - Preserved the existing form and Google Sheets web-app post path.
   - Preserved compatibility hooks in the order `window.saveInquiry`, `window.submitInquiry`, Google Sheets, then `localStorage` fallback.
   - Added `quantity` and `region` fields for course, textbook, ending-note, and institution inquiries.

4. Customer-facing conversion paths
   - Top menu now links to separate pages instead of scrolling through a long one-page layout.
   - CTA links on content pages open `contact.html` and pass the inquiry category through the URL.
   - `script.js` reads the category query string and automatically selects the matching form option.

5. Responsive layout
   - Mobile visitors no longer need to scroll through all details on the homepage.
   - Each page is shorter and focused on one task.
   - Korean text uses `word-break: keep-all` and responsive stacking to reduce awkward line breaks.

## Automated Checks

- `node --check script.js`: passed.
- New page/link scan for `index.html`, `wlc.html`, `notebook.html`, `education.html`, and `contact.html`: passed.
- Form routing scan for `URLSearchParams` and Google Sheets connection: passed.
