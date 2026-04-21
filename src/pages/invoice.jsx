import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import InvoiceCard from "../components/InvoiceCard";
import EmptyState from "../components/EmptyState";
import NewInvoiceDrawer from "../components/NewInvoiceDrawer";
import { initialInvoices } from "../components/invoiceData";

export default function Invoice() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [activeFilters, setActiveFilters] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered =
    activeFilters.length > 0
      ? invoices.filter((inv) => activeFilters.includes(inv.status))
      : invoices;

  const handleSave = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  return (
    <div style={styles.page}>
      <Sidebar />

      <main style={styles.main}>
        <div style={styles.content}>
          <Header
            total={filtered.length}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            onNewInvoice={() => setDrawerOpen(true)}
          />

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div>
              {filtered.map((inv) => (
                <InvoiceCard key={inv.id} invoice={inv} onClick={() => {}} />
              ))}
            </div>
          )}
        </div>
      </main>

      <NewInvoiceDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#F8F8FB",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "60px 24px 40px",
  },
  content: {
    width: "100%",
    maxWidth: 700,
  },
};