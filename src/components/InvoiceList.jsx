import React, { useState } from "react";
import Header from "../components/header";
import InvoiceCard from "../components/InvoiceCard";
import EmptyState from "../components/EmptyState";
import { NewInvoiceDrawer } from "../components/InvoiceDrawer";
import { useColors } from "../components/Themecontext";

export default function InvoiceList({ invoices, onSelect, onAdd, onFilterChange, activeFilters }) {
  const c = useColors();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = activeFilters.length
    ? invoices.filter((inv) => activeFilters.includes(inv.status))
    : invoices;

  return (
    <div style={{ minHeight: "100vh", background: c.bg, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px 40px" }}>
        <Header
          total={filtered.length}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onNewInvoice={() => setDrawerOpen(true)}
        />
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div>{filtered.map((inv) => <InvoiceCard key={inv.id} invoice={inv} onClick={() => onSelect(inv.id)} />)}</div>
        )}
      </div>
      <NewInvoiceDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={onAdd} />
    </div>
  );
}