# LingoUp Academy — Fast-track Language Learning

A responsive, accessible, multi-page website for a language school, built with vanilla HTML, CSS, and JavaScript.

**Live site:** [https://renanfpina.github.io/language-school-site/](https://renanfpina.github.io/language-school-site/)

---

## About

**LingoUp Academy** is a language school specializing in English, Spanish, and Mandarin for adults. The design follows a modern, energetic, and professional aesthetic — dark slate header/hero with light inner sections and vibrant accent colors.

### Visual Identity

| Role | Color | Hex |
|------|-------|-----|
| Primary (dark background) | Slate | `#1E293B` |
| Accent (buttons, highlights) | Emerald | `#10B981` |
| CTA (call-to-action) | Orange | `#F97316` |
| Neutral light (backgrounds) | Light Slate | `#F1F5F9` |
| Main text | Dark Slate | `#0F172A` |
| Secondary text | Medium Slate | `#475569` |

### Typography

| Role | Font | Style |
|------|------|-------|
| Headings | **Plus Jakarta Sans** | Sans-serif, modern, bold |
| Body / UI | **Inter** | Sans-serif, readable, clean |

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Hero, Courses (3 cards), Differentials, Testimonials, Contact CTA |
| `about.html` | School history, stats grid (5,000+ / 40+ / 15+ / 98%), Team (4 teachers) |
| `courses.html` | English, Spanish, and Mandarin course details |
| `blog.html` | Featured post, article grid, CTA banner |
| `blog-post.html` | Full article with sidebar (author, links, CTA) and related articles |
| `contact.html` | Contact info, map placeholder, and accessible enrollment form with JS validation |

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, flexbox, grid, responsive design
- **Vanilla JavaScript** — no frameworks or dependencies

### JavaScript Features (`assets/js/main.js`)

- `loadPartial()` — loads shared header/footer via `fetch()`
- `setActiveNav()` — highlights the current page link in the nav
- `initMobileNav()` — hamburger menu with keyboard and Escape key support
- `setFooterYear()` — dynamic year in the footer
- `initContactForm()` — form validation with ARIA live regions

### Internationalization (`assets/js/i18n.js`)

Full multi-language support with no external libraries.

| Feature | Detail |
|---------|--------|
| Languages | English (`en-us`), Portuguese (`pt-br`), Spanish (`es-es`), Mandarin (`zh-cn`) |
| Translation files | `assets/i18n/en-us.json`, `assets/i18n/pt-br.json`, `assets/i18n/es-es.json`, `assets/i18n/zh-cn.json` |
| Language switcher | EN / PT / 中文 / ES buttons in the header, persisted via `localStorage` |
| Text translation | `data-i18n="key"` attribute on HTML elements |
| Attribute translation | `data-i18n-attr="attribute:key"` (e.g. `aria-label`, `placeholder`, `alt`) |
| Default language | `en-us` (auto-detected from browser preference) |
| Coverage | All 6 pages, header and footer partials |

---

## Project Structure

```
language-school-site/
├── index.html
├── about.html
├── courses.html
├── blog.html
├── blog-post.html
├── contact.html
└── assets/
    ├── css/
    │   └── style.css
    ├── i18n/
    │   ├── en-us.json
    │   ├── es-es.json
    │   ├── pt-br.json
    │   └── zh-cn.json
    ├── js/
    │   ├── main.js
    │   └── i18n.js
    ├── partials/
    │   ├── header.html
    │   └── footer.html
    └── images/
        ├── hero/
        ├── blog/
        ├── courses/
        └── team/
```

---

## Image Credits

| File | Description | Source |
|------|-------------|--------|
| `assets/images/hero/hero-bg.jpg` | Language learning environment | Pexels |
| `assets/images/hero/about-story.jpg` | Classroom with teacher | Pexels |
| `assets/images/team/teacher-james.jpg` | James Carter (English teacher) | Pexels |
| `assets/images/team/teacher-sofia.jpg` | Sofía Ramírez (Spanish teacher) | Pexels |
| `assets/images/team/teacher-mei.jpg` | Mei Zhang (Mandarin teacher) | Pexels |
| `assets/images/team/teacher-liam.jpg` | Liam O'Brien (Academic Director) | RDNE Stock project — Pexels |
| `assets/images/blog/blog-featured.jpg` | Featured blog post image | Pexels |
| `assets/images/blog/blog-1.jpg` | Blog article thumbnail | Pexels |
| `assets/images/blog/blog-2.jpg` | Blog article thumbnail | Pexels |
| `assets/images/blog/blog-3.jpg` | Blog article thumbnail | Pexels |
| `assets/images/courses/english.jpg` | English course image | Pexels |
| `assets/images/courses/spanish.jpg` | Spanish course image | Pexels |
| `assets/images/courses/mandarin.jpg` | Mandarin course image | Pexels |

---

## Author

**Renan Pina**
- Email: [renanfpina@gmail.com](mailto:renanfpina@gmail.com)
- GitHub: [github.com/renanfpina](https://github.com/renanfpina)
- LinkedIn: [linkedin.com/in/renanfpina](https://linkedin.com/in/renanfpina)
