---
name: apple-design
description: Apple.com-style marketing UI guidance (design tokens, typography, copywriting, image curation, layout patterns). Use when the user asks for an "Apple style" look, more whitespace and typographic restraint, crisper headline copy, or product-page sections (hero, feature grid, spec strip, scroll blocks) for the Karven storefront or any web page.
---

# Apple Design

Vendored from the MIT-licensed `chaos-xxl/apple-design-skill` (prompts only; see `LICENSE`). The original ships as a single `CLAUDE.md`; here each module is a reference file so only what is needed gets loaded.

## When to use

- The user asks for Apple-style pages, "más limpio", "más aire", "menos ruido", or "tipo apple.com".
- Writing or rewriting marketing copy that should read crisp and short.
- Designing a hero, product grid, feature cards, spec strip or scroll-animated section.

## How to apply it in this project

Karven already has a token system in `src/app/globals.css` (semantic `paper` / `ink` / `teal` tokens, light and dark themes). **Do not paste the `--apple-*` tokens into the project.** Translate the principles onto the existing tokens:

| Apple module says | In Karven do |
| --- | --- |
| backgrounds #FFFFFF / #F5F5F7 / #1D1D1F | `bg-paper`, `bg-paper-2`, `bg-paper-3`; dark sections only via the dark theme tokens |
| accent blue #0066CC | `text-teal` / `btn-teal` (brand accent), never blue |
| 980–1200 px content width | `.container-custom` (1320 px) or `max-w-5xl` for text-heavy blocks |
| section gap 80–120 px | `.section` |
| SF Pro font stack | Inter Tight (display) + Inter (body) already loaded in `layout.tsx` |
| 12–20 px radii, layered shadows | `rounded-2xl`, `.card`, `.panel`, `.glass` |

Keep the house rules from the React Bits work: no invented testimonials or round statistics, provisional images go through `.plate`, motion stays purposeful.

## References (load only what the task needs)

| File | Use it for |
| --- | --- |
| `references/design-tokens.md` | Spacing scale, radii, shadow recipes, gradients, breakpoints (734 / 1068 / 1440) |
| `references/typography.md` | Size and weight ladder for headline → subhead → body → caption, letter-spacing, line-height |
| `references/copywriting.md` | Headline patterns, "feature → benefit" phrasing, length limits, CTA wording. Copy is English-centric; keep Karven's Spanish formal "usted" register and technical vocabulary |
| `references/layout-patterns.md` | Hero, product grid, feature cards, spec strip, scroll-reveal section templates (HTML/CSS; translate to React + Tailwind) |
| `references/image-curation.md` | How to pick product photography (neutral background, single subject, consistent angle) and gradient fallbacks |

## Workflow

1. Read the one or two reference files relevant to the request.
2. Map every value to an existing Karven token or utility before writing code.
3. Prefer removing elements over adding them; whitespace and type hierarchy carry the design.
4. Keep copy short: one idea per headline, one sentence of support, one CTA.
