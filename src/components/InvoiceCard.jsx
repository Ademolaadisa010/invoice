import React from "react";
import { useColors } from "./Themecontext";
import { useBreakpoint } from "./useBreakpoint";

const badgeMap = {
  paid:    { bg: "#F3FBF4",                    color: "#33D69F", dot: "#33D69F" },
  pending: { bg: "#FFF8F0",                    color: "#FF8F00", dot: "#FF8F00" },
  draft:   { bg: "#F4F4F8",                    color: "#373B53", dot: "#373B53" },
};
const badgeMapDark = {
  paid:    { bg: "rgba(51,214,159,0.06)",      color: "#33D69F", dot: "#33D69F" },
  pending: { bg: "rgba(255,143,0,0.06)",       color: "#FF8F00", dot: "#FF8F00" },
  draft:   { bg: "rgba(223,227,250,0.06)",     color: "#DFE3FA", dot: "#DFE3FA" },
};

export default function InvoiceCard({ invoice, onClick }) {
  const c = useColors();
  const { isMobile, isTablet } = useBreakpoint();
  const { id, due, name, amount, status } = invoice;
  const isDark = c.bg === "#141625";
  const badge = (isDark ? badgeMapDark : badgeMap)[status] || badgeMap.draft;
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  const Arrow = () => (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 1l4.5 4.5L1 10" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Badge = () => (
    <span style={{ padding: "6px 18px", borderRadius: 6, fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6, background: badge.bg, color: badge.color, whiteSpace: "nowrap" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: badge.dot, flexShrink: 0 }} />
      {label}
    </span>
  );

  const cardBase = {
    background: c.surface,
    border: `1px solid ${c.cardBorder}`,
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 16,
    transition: "border-color 0.2s",
  };

  if (isMobile) {
    // Mobile: two-row card
    return (
      <div onClick={onClick} style={{ ...cardBase, padding: "24px" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C5DFA")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.cardBorder)}>
        {/* Row 1 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: c.text }}>
            <span style={{ color: "#7E88C3" }}>#</span>{id}
          </span>
          <span style={{ fontSize: 13, color: c.textMuted }}>{name}</span>
        </div>
        {/* Row 2 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 12, color: c.textMuted, marginBottom: 6 }}>Due {due}</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: c.text }}>£ {amount}</p>
          </div>
          <Badge />
        </div>
      </div>
    );
  }

  if (isTablet) {
    // Tablet: compact single row — matches the dark tablet screenshot
    return (
      <div onClick={onClick} style={{ ...cardBase, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C5DFA")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.cardBorder)}>
        <div style={{ width: 90, fontWeight: 700, fontSize: 14, color: c.text, flexShrink: 0 }}>
          <span style={{ color: "#7E88C3" }}>#</span>{id}
        </div>
        <div style={{ width: 120, fontSize: 13, color: c.textSecondary, flexShrink: 0 }}>Due {due}</div>
        <div style={{ flex: 1, fontSize: 13, color: c.textMuted, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginRight: 16, flexShrink: 0 }}>£ {amount}</div>
        <Badge />
        <div style={{ marginLeft: 8 }}><Arrow /></div>
      </div>
    );
  }

  // Desktop: full row
  return (
    <div onClick={onClick} style={{ ...cardBase, padding: "20px 24px", display: "flex", alignItems: "center" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7C5DFA")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.cardBorder)}>
      <div style={{ width: 100, fontWeight: 700, fontSize: 14, color: c.text }}>
        <span style={{ color: "#7E88C3" }}>#</span>{id}
      </div>
      <div style={{ width: 145, fontSize: 13, color: c.textSecondary }}>Due {due}</div>
      <div style={{ flex: 1, fontSize: 13, color: c.textMuted }}>{name}</div>
      <div style={{ width: 130, textAlign: "right", fontWeight: 700, fontSize: 15, color: c.text, marginRight: 20 }}>£ {amount}</div>
      <div style={{ width: 110, display: "flex", justifyContent: "center" }}><Badge /></div>
      <div style={{ marginLeft: 12 }}><Arrow /></div>
    </div>
  );
}