# Portfolio/CV - Astro Project

A minimalistic portfolio/CV website built with Astro, Tailwind CSS, and vanilla JavaScript.

## 🚀 Features

- **Modular Structure**: Reusable components for easy maintenance and updates
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Multilingual Support**: Available in Spanish, English, and French
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Print-Friendly**: Optimized for printing as a traditional CV
- **Vanilla JavaScript**: No heavy frameworks, just clean, simple code

## 📂 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── Courses.astro
│   │   ├── Education.astro
│   │   ├── Experience.astro
│   │   ├── Footer.astro
│   │   ├── FurtherInfo.astro
│   │   ├── Hero.astro
│   │   ├── Languages.astro
│   │   ├── Navbar.astro
│   │   └── TechSkills.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── locales/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── fr.json
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   ├── activeNavLinks.js
│   │   ├── darkMode.js
│   │   └── languageSwitcher.js
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tailwind.config.cjs
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🎨 Customization

1. **Personal Information**: Update the content in each component to reflect your information
2. **Styling**: Modify the Tailwind classes or add custom CSS in `global.css`
3. **Languages**: Edit the JSON files in the `locales` directory to update translations

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🖨️ Print Version

The site is optimized for printing. When printing, the navigation and interactive elements are hidden, providing a clean CV format.
