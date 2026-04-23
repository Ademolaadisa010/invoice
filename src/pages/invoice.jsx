import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import InvoiceCard from "../components/InvoiceCard";
import EmptyState from "../components/EmptyState";
import NewInvoiceDrawer from "../components/NewInvoiceDrawer";
import { initialInvoices } from "../components/invoiceData";
import "../mobile-style/invoice.css";

export default function Invoice() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered =
    activeFilters.length > 0
      ? invoices.filter((inv) => activeFilters.includes(inv.status))
      : invoices;

  const handleSave = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // run on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="invoice">
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
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    // padding: "60px 24px 40px",
  },
  content: {
    width: "100%",
    maxWidth: 700,
  },
};