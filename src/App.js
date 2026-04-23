import React, { useState } from "react";
import { ThemeProvider, useColors } from "./components/Themecontext";
import { useLocalStorage } from "./components/useLocalStorage";
import { useBreakpoint } from "./components/useBreakpoint";
import { initialInvoices } from "./components/invoiceData";
import Sidebar from "./components/sidebar";
import InvoiceList from "./components/InvoiceList";
import InvoiceView from "./pages/InvoiceView";
import "./App.css"

function AppShell() {
  const c = useColors();
  const { isMobile } = useBreakpoint();
  const [invoices, setInvoices] = useLocalStorage("invoices", initialInvoices);
  const [activeFilters, setActiveFilters] = useLocalStorage("invoice-filters", []);
  const [selectedId, setSelectedId] = useState(null);

  // Migration: ensure every stored invoice has an items array
  React.useEffect(() => {
    const needsFix = invoices.some((inv) => !Array.isArray(inv.items));
    if (needsFix) {
      setInvoices((prev) => prev.map((inv) => ({ items: [], ...inv })));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = invoices.find((inv) => inv.id === selectedId) || null;
  const handleAdd    = (newInv)  => setInvoices((prev) => [newInv, ...prev]);
  const handleUpdate = (updated) => setInvoices((prev) => prev.map((inv) => inv.id === updated.id ? updated : inv));
  const handleDelete = (id)      => { setInvoices((prev) => prev.filter((inv) => inv.id !== id)); setSelectedId(null); };

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      minHeight: "100vh",
      background: c.bg,
      transition: "background 0.3s",
    }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
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