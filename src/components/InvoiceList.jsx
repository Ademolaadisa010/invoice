import React, { useState } from "react";
import Header from "./header";
import InvoiceCard from "./InvoiceCard";
import EmptyState from "./EmptyState";
import { NewInvoiceDrawer } from "./InvoiceDrawer";
import { useColors } from "./Themecontext";
import { useBreakpoint } from "./useBreakpoint";

export default function InvoiceList({ invoices, onSelect, onAdd, onFilterChange, activeFilters }) {
  const c = useColors();
  const { isMobile } = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = activeFilters.length
    ? invoices.filter((inv) => activeFilters.includes(inv.status))
    : invoices;

  return (
    <div style={{ minHeight: "100vh", background: c.bg, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: isMobile ? "32px 24px" : "60px 32px 40px" }}>
        <Header
          total={filtered.length}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onNewInvoice={() => setDrawerOpen(true)}
        />
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {filtered.map((inv) => (
              <InvoiceCard key={inv.id} invoice={inv} onClick={() => onSelect(inv.id)} />
            ))}
          </div>
        )}
      </div>
      <NewInvoiceDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onSave={onAdd} />
    </div>
  );
}