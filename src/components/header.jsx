import React, { useState } from "react";

const STATUSES = ["paid", "pending", "draft"];

export default function Header({ total, activeFilters, onFilterChange, onNewInvoice }) {
  const [open, setOpen] = useState(false);

  const toggle = (status) => {
    onFilterChange(
      activeFilters.includes(status)
        ? activeFilters.filter((f) => f !== status)
        : [...activeFilters, status]
    );
  };

  const countLabel =
    total === 0 ? "No invoices" : `There are ${total} total invoice${total !== 1 ? "s" : ""}`;

  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>Invoices</h1>
        <p style={styles.subtitle}>{countLabel}</p>
      </div>

      <div style={styles.actions}>
        {/* Filter */}
        <div style={styles.filterWrap}>
          <button style={styles.filterBtn} onClick={() => setOpen((o) => !o)}>
            <span style={styles.filterText}>Filter by status</span>
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            >
              <path d="M1 1l4.5 4.5L10 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {open && (
            <div style={styles.dropdown}>
              {STATUSES.map((s) => (
                <label key={s} style={styles.filterOption}>
                  <div
                    style={{
                      ...styles.checkbox,
                      background: activeFilters.includes(s) ? "#7C5DFA" : "white",
                      borderColor: activeFilters.includes(s) ? "#7C5DFA" : "#DFE3FA",
                    }}
                    onClick={() => toggle(s)}
                  >
                    {activeFilters.includes(s) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={styles.filterLabel} onClick={() => toggle(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* New Invoice */}
        <button style={styles.newBtn} onClick={onNewInvoice}>
          <span style={styles.plusCircle}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1v9M1 5.5h9" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          New Invoice
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#0C0E16",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#888EB0",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 32,
  },
  filterWrap: {
    position: "relative",
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    color: "#0C0E16",
    padding: 0,
  },
  filterText: {
    color: "#0C0E16",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 12px)",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    borderRadius: 8,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    padding: "16px 20px",
    minWidth: 180,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  filterOption: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    border: "1px solid #DFE3FA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "#0C0E16",
    cursor: "pointer",
    userSelect: "none",
  },
  newBtn: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#7C5DFA",
    border: "none",
    borderRadius: 24,
    padding: "8px 16px 8px 8px",
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  plusCircle: {
    width: 32,
    height: 32,
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};