import React from "react";
import { useColors } from "./Themecontext";

export default function DeleteModal({ invoice, onCancel, onConfirm }) {
  const c = useColors();
  if (!invoice) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: c.surface, borderRadius: 8, padding: "32px 24px", width: "100%", maxWidth: 480, boxShadow: "0 10px 40px rgba(0,0,0,0.25)" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: c.text, marginBottom: 16 }}>Confirm Deletion</h2>
        <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.8, marginBottom: 32 }}>
          Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            onClick={onCancel}
            style={{ background: c.surface2, border: "none", borderRadius: 24, padding: "14px 24px", fontSize: 13, fontWeight: 700, color: c.textSecondary, cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(invoice.id)}
            style={{ background: "#EC5757", border: "none", borderRadius: 24, padding: "14px 24px", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}