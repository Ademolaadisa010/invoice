import React, { useState } from "react";
import { useColors } from "../components/Themecontext";
import { useBreakpoint } from "../components/useBreakpoint";
import { EditInvoiceDrawer } from "../components/InvoiceDrawer";
import DeleteModal from "../components/DeleteModal";

const badgeMap = {
  paid:    { bg: "#F3FBF4",                color: "#33D69F", dot: "#33D69F" },
  pending: { bg: "#FFF8F0",                color: "#FF8F00", dot: "#FF8F00" },
  draft:   { bg: "#F4F4F8",                color: "#373B53", dot: "#373B53" },
};
const badgeMapDark = {
  paid:    { bg: "rgba(51,214,159,0.06)",  color: "#33D69F", dot: "#33D69F" },
  pending: { bg: "rgba(255,143,0,0.06)",   color: "#FF8F00", dot: "#FF8F00" },
  draft:   { bg: "rgba(223,227,250,0.06)", color: "#DFE3FA", dot: "#DFE3FA" },
};

export default function InvoiceView({ invoice, onBack, onUpdate, onDelete }) {
  const c = useColors();
  const { isMobile, isTablet } = useBreakpoint();
  const isDark = c.bg === "#141625";
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const realBadge = (isDark ? badgeMapDark : badgeMap)[invoice.status] || badgeMap.draft;
  const label = invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1);
  const total = (invoice.items || []).reduce((s, it) => s + it.qty * it.price, 0)
    || parseFloat((invoice.amount || "0").replace(/,/g, ""));

  const handleMarkPaid = () => onUpdate({ ...invoice, status: "paid" });
  const handleDelete = (id) => { onDelete(id); onBack(); };

  const pad = isMobile ? "24px" : isTablet ? "32px" : "48px";

  const ActionButtons = () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button onClick={() => setEditOpen(true)}
        style={{ background: c.surface2, border: "none", borderRadius: 24, padding: "12px 24px", fontSize: 13, fontWeight: 700, color: c.textSecondary, cursor: "pointer" }}>
        Edit
      </button>
      <button onClick={() => setDeleteTarget(invoice)}
        style={{ background: "#EC5757", border: "none", borderRadius: 24, padding: "12px 24px", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}>
        Delete
      </button>
      {invoice.status !== "paid" && (
        <button onClick={handleMarkPaid}
          style={{ background: "#7C5DFA", border: "none", borderRadius: 24, padding: "12px 24px", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}>
          Mark as Paid
        </button>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: c.bg, transition: "background 0.3s", padding: isMobile ? "24px 0 80px" : "48px 0" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: `0 ${isMobile ? "24px" : "32px"}` }}>

        {/* Go back */}
        <button onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: c.text, marginBottom: isMobile ? 24 : 32, padding: 0 }}>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path d="M6 1L1.5 5.5 6 10" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Go back
        </button>

        {/* Status bar */}
        <div style={{ background: c.surface, borderRadius: 8, padding: `16px ${pad}`, display: "flex", alignItems: "center", marginBottom: 16, gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: c.textMuted }}>Status</span>
          <span style={{ padding: "6px 20px", borderRadius: 6, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8, background: realBadge.bg, color: realBadge.color }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: realBadge.dot }} />{label}
          </span>
          {/* On tablet/desktop, buttons go in status bar */}
          {!isMobile && <div style={{ marginLeft: "auto" }}><ActionButtons /></div>}
        </div>

        {/* Invoice body */}
        <div style={{ background: c.surface, borderRadius: 8, padding: pad }}>

          {/* Top: ID + from address */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, flexWrap: isMobile ? "wrap" : "nowrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 4 }}>
                <span style={{ color: "#7E88C3" }}>#</span>{invoice.id}
              </p>
              <p style={{ fontSize: 13, color: c.textMuted }}>{invoice.description}</p>
            </div>
            <div style={{ textAlign: isMobile ? "left" : "right", fontSize: 13, color: c.textMuted, lineHeight: 1.8 }}>
              <p>{invoice.fromStreet}</p>
              <p>{invoice.fromCity}</p>
              <p>{invoice.fromPost}</p>
              <p>{invoice.fromCountry}</p>
            </div>
          </div>

          {/* Info grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: isMobile ? "24px 16px" : 24,
            marginBottom: 40,
          }}>
            {/* Dates */}
            <div>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 8 }}>Invoice Date</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 24 }}>{invoice.invoiceDate || invoice.due}</p>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 8 }}>Payment Due</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{invoice.paymentDue || invoice.due}</p>
            </div>
            {/* Bill To */}
            <div>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 8 }}>Bill To</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 8 }}>{invoice.name}</p>
              <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.8 }}>
                {invoice.toStreet}<br />{invoice.toCity}<br />{invoice.toPost}<br />{invoice.toCountry}
              </p>
            </div>
            {/* Sent To — on mobile spans 2 cols */}
            <div style={isMobile ? { gridColumn: "1 / -1" } : {}}>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 8 }}>Sent to</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{invoice.email}</p>
            </div>
          </div>

          {/* Item table */}
          <div style={{ background: c.surface2, borderRadius: "8px 8px 0 0", padding: isMobile ? "24px 16px" : 32 }}>
            {!isMobile && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px 100px", gap: 16, marginBottom: 20 }}>
                {["Item Name", "QTY.", "Price", "Total"].map((h, i) => (
                  <span key={i} style={{ fontSize: 13, color: c.textMuted, textAlign: i > 0 ? "right" : "left" }}>{h}</span>
                ))}
              </div>
            )}
            {(invoice.items || []).map((item, i) => (
              isMobile ? (
                // Mobile: stacked item rows
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 4 }}>{item.name}</p>
                    <p style={{ fontSize: 13, color: c.textMuted }}>{item.qty} x £ {item.price.toFixed(2)}</p>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: c.text }}>£ {(item.qty * item.price).toFixed(2)}</span>
                </div>
              ) : (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 60px 100px 100px", gap: 16, marginBottom: 16, alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: c.text }}>{item.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: c.textMuted, textAlign: "right" }}>{item.qty}</span>
                  <span style={{ fontSize: 13, color: c.textMuted, textAlign: "right" }}>£ {item.price.toFixed(2)}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: c.text, textAlign: "right" }}>£ {(item.qty * item.price).toFixed(2)}</span>
                </div>
              )
            ))}
          </div>

          {/* Amount Due */}
          <div style={{ background: isDark ? "#0C0E16" : "#373B53", borderRadius: "0 0 8px 8px", padding: isMobile ? "20px 16px" : "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "white" }}>Amount Due</span>
            <span style={{ fontSize: isMobile ? 18 : 24, fontWeight: 700, color: "white" }}>
              £ {total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: sticky footer with action buttons */}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: c.surface, padding: "16px 24px", display: "flex", justifyContent: "center", gap: 8, boxShadow: "0 -4px 20px rgba(0,0,0,0.1)", zIndex: 100 }}>
          <ActionButtons />
        </div>
      )}

      <EditInvoiceDrawer isOpen={editOpen} invoice={invoice} onClose={() => setEditOpen(false)} onSave={(u) => onUpdate(u)} />
      <DeleteModal invoice={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </div>
  );
}