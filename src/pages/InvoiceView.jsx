import React, { useState } from "react";
import { useColors } from "../components/Themecontext";
import { EditInvoiceDrawer } from "../components/InvoiceDrawer";
import DeleteModal from "../components/DeleteModal";

const badgeMap = {
  paid: { bg: "#F3FBF4", color: "#33D69F", dot: "#33D69F" },
  pending: { bg: "#FFF8F0", color: "#FF8F00", dot: "#FF8F00" },
  draft: { bg: "#F4F4F8", color: "#373B53", dot: "#373B53" },
};
const badgeMapDark = {
  paid: { bg: "rgba(51,214,159,0.06)", color: "#33D69F", dot: "#33D69F" },
  pending: { bg: "rgba(255,143,0,0.06)", color: "#FF8F00", dot: "#FF8F00" },
  draft: { bg: "rgba(223,227,250,0.06)", color: "#DFE3FA", dot: "#DFE3FA" },
};

export default function InvoiceView({ invoice, onBack, onUpdate, onDelete }) {
  const c = useColors();
  const isDark = c.bg === "#141625";
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // const badge = (isDark ? badgeMapDark : badgeMapDark)[invoice.status] || badgeMap[invoice.status];
  const realBadge = (isDark ? badgeMapDark : badgeMap)[invoice.status] || badgeMap.draft;
  const label = invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1);

  const total = (invoice.items || []).reduce((s, it) => s + it.qty * it.price, 0) || parseFloat((invoice.amount || "0").replace(/,/g, ""));

  const handleMarkPaid = () => onUpdate({ ...invoice, status: "paid" });
  const handleDelete = (id) => { onDelete(id); onBack(); };
  const handleEdit = (updated) => onUpdate(updated);

  return (
    <div style={{ minHeight: "100vh", background: c.bg, transition: "background 0.3s", padding: "48px 0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>

        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: c.text, marginBottom: 32, padding: 0 }}>
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
            <path d="M6 1L1.5 5.5 6 10" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Go back
        </button>

        <div style={{ background: c.surface, borderRadius: 8, padding: "20px 32px", display: "flex", alignItems: "center", marginBottom: 24, gap: 16 }}>
          <span style={{ fontSize: 13, color: c.textMuted, marginRight: 16 }}>Status</span>
          <span style={{ padding: "6px 20px", borderRadius: 6, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8, background: realBadge.bg, color: realBadge.color }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: realBadge.dot }} />{label}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button onClick={() => setEditOpen(true)} style={{ background: c.surface2, border: "none", borderRadius: 24, padding: "12px 24px", fontSize: 13, fontWeight: 700, color: c.textSecondary, cursor: "pointer" }}>Edit</button>
            <button onClick={() => setDeleteTarget(invoice)} style={{ background: "#EC5757", border: "none", borderRadius: 24, padding: "12px 24px", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}>Delete</button>
            {invoice.status !== "paid" && (
              <button onClick={handleMarkPaid} style={{ background: "#7C5DFA", border: "none", borderRadius: 24, padding: "12px 24px", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}>Mark as Paid</button>
            )}
          </div>
        </div>

        <div style={{ background: c.surface, borderRadius: 8, padding: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: c.text, marginBottom: 4 }}>
                <span style={{ color: "#7E88C3" }}>#</span>{invoice.id}
              </p>
              <p style={{ fontSize: 13, color: c.textMuted }}>{invoice.description}</p>
            </div>
            <div style={{ textAlign: "right", fontSize: 13, color: c.textMuted, lineHeight: 1.8 }}>
              <p>{invoice.fromStreet}</p>
              <p>{invoice.fromCity}</p>
              <p>{invoice.fromPost}</p>
              <p>{invoice.fromCountry}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 48 }}>
            <div>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 8 }}>Invoice Date</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{invoice.invoiceDate || invoice.due}</p>
              <p style={{ fontSize: 13, color: c.textMuted, marginTop: 24, marginBottom: 8 }}>Payment Due</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{invoice.paymentDue || invoice.due}</p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 8 }}>Bill To</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 8 }}>{invoice.name}</p>
              <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.8 }}>
                {invoice.toStreet}<br />{invoice.toCity}<br />{invoice.toPost}<br />{invoice.toCountry}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 8 }}>Sent to</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{invoice.email}</p>
            </div>
          </div>

          <div style={{ background: c.surface2, borderRadius: "8px 8px 0 0", padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 120px", gap: 16, marginBottom: 24 }}>
              {["Item Name", "QTY.", "Price", "Total"].map((h, i) => (
                <span key={i} style={{ fontSize: 13, color: c.textMuted, textAlign: i > 0 ? "right" : "left" }}>{h}</span>
              ))}
            </div>
            {(invoice.items || []).map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 120px", gap: 16, marginBottom: 16, alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: c.text }}>{item.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: c.textMuted, textAlign: "right" }}>{item.qty}</span>
                <span style={{ fontSize: 13, color: c.textMuted, textAlign: "right" }}>£ {item.price.toFixed(2)}</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: c.text, textAlign: "right" }}>£ {(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#373B53", borderRadius: "0 0 8px 8px", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "white" }}>Amount Due</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: "white" }}>£ {total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
        </div>
      </div>

      <EditInvoiceDrawer isOpen={editOpen} invoice={invoice} onClose={() => setEditOpen(false)} onSave={handleEdit} />
      <DeleteModal invoice={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </div>
  );
}