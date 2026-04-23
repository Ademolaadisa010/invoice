# Invoice App

A fully responsive invoice management application built with React. Create, view, edit, delete, and filter invoices with full dark mode support and persistent localStorage state.

---

## Screenshots

| Light Mode | Dark Mode |
|---|---|
| Invoice list, detail view, and create form | Full dark theme across all screens |

---

## Features

- **Invoice List** — view all invoices with ID, due date, client name, amount, and status badge
- **Invoice Detail** — full invoice view with billing info, item breakdown, and amount due
- **Create Invoice** — slide-in drawer form with Bill From, Bill To, item list, and payment terms
- **Edit Invoice** — pre-filled drawer form to update any invoice field
- **Delete Invoice** — confirmation modal before permanent deletion
- **Mark as Paid** — instantly update a pending or draft invoice to paid
- **Filter by Status** — filter invoices by Paid, Pending, or Draft (multi-select)
- **Dark / Light Mode** — toggle via the moon/sun icon in the sidebar, persisted across sessions
- **localStorage Persistence** — all invoice data and preferences survive page refreshes
- **Fully Responsive** — three layouts for Mobile (≤600px), Tablet (601–900px), and Desktop (>900px)

---

## Tech Stack

- **React 18** — functional components, hooks only
- **No external UI libraries** — all styles are inline React style objects
- **No router** — view state managed via `useState` in `App.jsx`
- **localStorage** — custom `useLocalStorage` hook for data persistence

---

## Project Structure

```
src/
├── App.jsx                 # Root component — layout, routing, global state
├── ThemeContext.jsx         # Dark/light mode context + useColors() hook
├── invoiceData.js           # Seed data (7 invoices, loaded on first visit)
├── useLocalStorage.js       # Custom hook for localStorage-backed state
├── useBreakpoint.js         # Custom hook for responsive breakpoints
│
├── Sidebar.jsx              # Vertical nav (desktop/tablet) / top bar (mobile)
├── Header.jsx               # Page title, filter dropdown, New Invoice button
├── InvoiceList.jsx          # Invoice list page
├── InvoiceCard.jsx          # Single invoice row/card (3 responsive layouts)
├── EmptyState.jsx           # Illustrated empty state when no invoices match
├── InvoiceView.jsx          # Invoice detail page
├── InvoiceDrawers.jsx       # New Invoice + Edit Invoice slide-in drawers
└── DeleteModal.jsx          # Delete confirmation modal
```

---

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Ademolaadisa010/invoice.git
cd invoice-app

# Install dependencies
npx create-react-app . --template minimal
# or if already scaffolded:
npm install
```

### Add the source files

Copy all `.jsx` and `.js` files from this project into your `src/` directory, then update your entry point:

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Run the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | ≤ 600px | Top navigation bar, stacked card rows, sticky action footer |
| Tablet | 601px – 900px | Vertical sidebar, compact single-row cards |
| Desktop | > 900px | Vertical sidebar, full-width invoice rows |

---

## Data & State

### localStorage Keys

| Key | Type | Description |
|---|---|---|
| `invoices` | `Invoice[]` | Full array of all invoice objects |
| `invoice-filters` | `string[]` | Active status filters (`paid`, `pending`, `draft`) |
| `invoice-dark-mode` | `boolean` | Dark mode preference |

### Invoice Object Shape

```js
{
  id:           string,   // e.g. "XM9141"
  due:          string,   // e.g. "20 Sep 2021"
  invoiceDate:  string,
  paymentDue:   string,
  paymentTerms: string,   // "Net 30 Days" | "Net 14 Days" | "Net 7 Days" | "Net 1 Day"
  description:  string,
  name:         string,   // client name
  email:        string,
  fromStreet:   string,
  fromCity:     string,
  fromPost:     string,
  fromCountry:  string,
  toStreet:     string,
  toCity:       string,
  toPost:       string,
  toCountry:    string,
  amount:       string,   // formatted, e.g. "556.00"
  status:       "paid" | "pending" | "draft",
  items: [
    { name: string, qty: number, price: number }
  ]
}
```

---

## Resetting Data

To reset all invoices back to the seed data, open your browser DevTools:

```
Application → Local Storage → http://localhost:3000 → Delete all keys
```

Then refresh the page.

---

## Customisation

### Changing the colour theme

Edit the color values in `ThemeContext.jsx` inside the `useColors()` function:

```js
export function useColors() {
  const { dark } = useTheme();
  return {
    bg:      dark ? "#141625" : "#F8F8FB",
    surface: dark ? "#1E2139" : "#FFFFFF",
    // ... etc
  };
}
```

### Adding new payment terms

Edit the `<select>` options inside `InvoiceDrawers.jsx` in the `InvoiceForm` component.

### Changing breakpoints

Edit the pixel values in `useBreakpoint.js`:

```js
return {
  isMobile:  width <= 600,   // adjust as needed
  isTablet:  width > 600 && width <= 900,
  isDesktop: width > 900,
};
```

---

## License

MIT