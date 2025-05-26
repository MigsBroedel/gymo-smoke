# Gymo Landing Page

This project is a Next.js app with internationalization (i18n) support, using TypeScript and Tailwind CSS. It is designed to be easy to run and extend. This guide will help you understand how locale (language) support works and how to run the app locally.

## Table of Contents

- [Project Structure](#project-structure)
- [Locale (i18n) Setup](#locale-i18n-setup)
- [Running the App Locally](#running-the-app-locally)
- [Useful Commands](#useful-commands)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

- `app/` — Main Next.js app directory. Contains pages and layouts.
  - `[locale]/` — Dynamic folder for each supported language (e.g., `en`, `pt`).
  - `LocaleProvider.tsx` — Handles locale context and switching.
- `i18n/` — Internationalization logic and API requests.
  - `request.ts` — Handles locale data fetching.
- `public/locales/` — Contains translation files for each language.
  - `en/common.json` — English translations.
  - `pt/common.json` — Portuguese translations.
- `next-intl.config.js` — Configuration for the `next-intl` library.

## Locale (i18n) Setup

This app uses [next-intl](https://github.com/amannn/next-intl) for internationalization.

- **Locale Detection:**
  - The app detects the user's preferred language from the URL (e.g., `/en`, `/pt`).
  - If no locale is specified, it defaults to English (`en`).
- **Translation Files:**
  - Located in `public/locales/{locale}/common.json`.
  - Each JSON file contains key-value pairs for translated strings.
- **Switching Locales:**
  - The locale can be changed by navigating to a different locale path (e.g., `/pt/home`).
  - The `LocaleProvider` ensures the correct translations are loaded.

## Running the App Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [pnpm](https://pnpm.io/) (or use `npm`/`yarn` if you prefer)

### Steps

1. **Install dependencies:**

   ```sh
   pnpm install
   ```

2. **Run the development server:**

   ```sh
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **View in different locales:**
   - English: [http://localhost:3000/en](http://localhost:3000/en)
   - Portuguese: [http://localhost:3000/pt](http://localhost:3000/pt)

## Useful Commands

- `pnpm dev` — Start the development server
- `pnpm build` — Build the app for production
- `pnpm start` — Start the production server

## Troubleshooting

- If you add a new language, create a new folder in `public/locales/` (e.g., `es/` for Spanish) and add a `common.json` file.
- If you see missing translations, check the JSON files for missing keys.
- For any issues, check the terminal output for errors.

---

**Happy coding!** If you have questions, check the documentation for [Next.js](https://nextjs.org/) and [next-intl](https://github.com/amannn/next-intl).
