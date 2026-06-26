# Design QA

final result: passed with note

## Self Check

1. Mobile horizontal scroll
   - Passed by CSS safeguards: `box-sizing: border-box`, `overflow-x: hidden`, `width: min(100%, var(--max))`, wrapped Korean text, single-column mobile layout, and a small-screen rule below `379px`.

2. Responsive layout
   - Passed by mobile-first CSS with breakpoints at `560px` and `780px`.
   - Mobile uses stacked buttons, stacked profile/contact sections, and a hamburger menu.
   - Wider screens use horizontal navigation, two-column hero, two-column contact cards, and a wider `980px` page shell.

3. Thumb-friendly buttons
   - Passed. Primary action buttons use at least `48px` height and the menu button is `44px` square.

4. GitHub Pages/static site compatibility
   - Passed. The site remains a static `index.html` with relative paths to `style.css`, `script.js`, `contact.vcf`, and `assets/*`.

5. SEO and favicon tags in `<head>`
   - Passed. `lang="ko"`, viewport, title, description, robots, canonical, Open Graph tags, favicon, alternate icon, and theme color are present.

6. Email links
   - Passed. All three visible email actions use `mailto:withmikyung2@gmail.com` with a consistent Korean inquiry subject.
   - `contact.vcf` still contains the same email address.

7. Profile image rendering
   - Passed by file reference check. The hero, profile section, and `og:image` reference `assets/profile-photo.jpg`; favicon uses `assets/favicon.svg`.

## Automated Checks

- `script.js` syntax check: passed with `node --check script.js`.
- Favicon file presence check: passed.
- Static file references for email links and favicon: passed.
- CSS responsive breakpoint presence check: passed.

## Render Check Note

The in-app browser blocked direct `file://` navigation, and the local server process did not remain reachable long enough for browser verification in this environment. Manual browser review is recommended after opening `index.html` or serving the folder locally.
