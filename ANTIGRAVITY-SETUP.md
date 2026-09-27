# Raptor Staffing Solutions

Animated recruitment and manpower website built with React 19, TypeScript and Tailwind CSS.

## Animation libraries

- GSAP + ScrollTrigger: scroll reveal and process animation
- React Spring: interactive service cards
- Anime.js: hero text entrance sequence
- Velocity.js: navigation feedback
- Three.js: animated hero particle field

## Run in Antigravity

1. Extract this ZIP or import the folder.
2. Open Antigravity's terminal in the project root.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal.

## Production build

```bash
npm run build
```

The main website code is in:

- `app/page.tsx` — page content, interactions and animations
- `app/globals.css` — responsive design and gradients
- `app/layout.tsx` — SEO title and description

Company confirmed email address: `raptorstaffingsolutions@gmail.com`. Formspree form integration configured with `NEXT_PUBLIC_FORMSPREE_FORM_ID` in `.env.local` / `.env.example`.
