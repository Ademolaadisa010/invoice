import React, { useState } from "react";
import { ThemeProvider, useColors } from "./components/Themecontext";
import { useLocalStorage } from "./components/useLocalStorage";
import { initialInvoices } from "./components/invoiceData";
import Sidebar from "./components/sidebar";
import InvoiceList from "./components/InvoiceList";
import InvoiceView from "./pages/InvoiceView";

function AppShell() {
  const c = useColors();
  const [invoices, setInvoices] = useLocalStorage("invoices", initialInvoices);

  // Migration: ensure every invoice has an items array (guards against old localStorage data)
  React.useEffect(() => {
    const needsFix = invoices.some((inv) => !Array.isArray(inv.items));
    if (needsFix) {
      setInvoices((prev) => prev.map((inv) => ({ items: [], ...inv })));
    }
  }, []); // eslint-disable-line
  const [activeFilters, setActiveFilters] = useLocalStorage("invoice-filters", []);
  const [selectedId, setSelectedId] = useState(null);

  const selected = invoices.find((inv) => inv.id === selectedId) || null;

  const handleAdd = (newInv) => setInvoices((prev) => [newInv, ...prev]);

  const handleUpdate = (updated) =>
    setInvoices((prev) => prev.map((inv) => (inv.id === updated.id ? updated : inv)));

  const handleDelete = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    setSelectedId(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: c.bg, transition: "background 0.3s" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        {selected ? (
          <InvoiceView
            invoice={selected}
            onBack={() => setSelectedId(null)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ) : (
          <InvoiceList
            invoices={invoices}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            onSelect={setSelectedId}
            onAdd={handleAdd}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}