import React, { useState } from "react";
import { useColors } from "./Themecontext";
import { useBreakpoint } from "./useBreakpoint";

const STATUSES = ["paid", "pending", "draft"];

export default function Header({ total, activeFilters, onFilterChange, onNewInvoice }) {
  const [open, setOpen] = useState(false);
  const c = useColors();
  const { isMobile } = useBreakpoint();

  const countLabel = isMobile
    ? `${total} invoice${total !== 1 ? "s" : ""}`
    : total === 0
    ? "No invoices"
    : `There are ${total} total invoice${total !== 1 ? "s" : ""}`;

  const toggle = (status) => {
    onFilterChange(
      activeFilters.includes(status)
        ? activeFilters.filter((f) => f !== status)
        : [...activeFilters, status]
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isMobile ? 24 : 40 }}>
      {/* Left: title */}
      <div>
        <h1 style={{ fontSize: isMobile ? 20 : 28, fontWeight: 700, color: c.text, marginBottom: 4 }}>Invoices</h1>
        <p style={{ fontSize: 13, color: c.textMuted }}>{countLabel}</p>
      </div>

      {/* Right: filter + new invoice */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 16 : 32 }}>
        {/* Filter */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOpen((o) => !o)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: c.text, padding: 0 }}
          >
            {isMobile ? "Filter" : "Filter by status"}
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}>
              <path d="M1 1l4.5 4.5L10 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {open && (
            <div style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)", background: c.surface, borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.25)", padding: "16px 20px", minWidth: 170, zIndex: 100, display: "flex", flexDirection: "column", gap: 12 }}>
              {STATUSES.map((s) => (
                <label key={s} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                  <div
                    onClick={() => toggle(s)}
                    style={{ width: 16, height: 16, borderRadius: 2, border: `1px solid ${activeFilters.includes(s) ? "#7C5DFA" : c.border}`, background: activeFilters.includes(s) ? "#7C5DFA" : c.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                  >
                    {activeFilters.includes(s) && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span onClick={() => toggle(s)} style={{ fontSize: 13, fontWeight: 700, color: c.text, userSelect: "none" }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* New Invoice button */}
        <button
          onClick={onNewInvoice}
          style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 14, background: "#7C5DFA", border: "none", borderRadius: 24, padding: isMobile ? "8px 12px 8px 8px" : "8px 16px 8px 8px", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
        >
          <span style={{ width: 32, height: 32, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1v9M1 5.5h9" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          {isMobile ? "New" : "New Invoice"}
        </button>
      </div>
    </div>
  );
}