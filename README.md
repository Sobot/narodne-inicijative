# Националне иницијативе - Упутство

Веб апликација за помоћ грађанима у припреми и подношењу националних иницијатива у Србији.

## Функционалности

- Унос података о иницијативи
- Генерисање потребних докумената
- Упутство за дигитално потписивање
- Помоћ при слању иницијативе општини

## Технологије

- Next.js 14
- TypeScript
- Material-UI
- React Hook Form
- html2pdf.js
- date-fns

## Потребни услови

- Node.js 18 или новији
- npm или yarn

## Инсталација

1. Клонирајте репозиторијум:
```bash
git clone https://github.com/yourusername/narodne-inicijative.git
cd narodne-inicijative
```

2. Инсталирајте зависности:
```bash
npm install
# или
yarn install
```

3. Покрените развојни сервер:
```bash
npm run dev
# или
yarn dev
```

4. Отворите [http://localhost:3000](http://localhost:3000) у вашем претраживачу.

## Структура пројекта

```
src/
  ├── app/              # Next.js App Router компоненте
  ├── components/       # React компоненте
  ├── data/            # Статички подаци
  └── types/           # TypeScript типови
```

## Развој

- `npm run dev` - Покреће развојни сервер
- `npm run build` - Гради продукцијску верзију
- `npm run start` - Покреће продукцијски сервер
- `npm run lint` - Проверава код са ESLint-ом

## Лиценца

MIT
