import React, { useState, useEffect } from "react";
import { useColors } from "../components/Themecontext";

function buildInputStyle(c) {
  return {
    width: "100%",
    border: `1px solid ${c.border}`,
    borderRadius: 4,
    padding: "12px 16px",
    fontSize: 13,
    color: c.text,
    outline: "none",
    fontFamily: "inherit",
    background: c.inputBg,
  };
}

const labelStyle = (c) => ({
  display: "block",
  fontSize: 12,
  color: c.textSecondary,
  marginBottom: 8,
});

function FormInput({ value, onChange, placeholder, type = "text", c }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={buildInputStyle(c)}
    />
  );
}

function DrawerShell({ isOpen, onClose, title, children, footerLeft, footerRight, c }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{ position: "fixed", top: 0, left: 80, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 200 }}
        />
      )}
      <div
        style={{
          position: "fixed", top: 0, left: 80, bottom: 0, width: 540,
          background: c.surface, zIndex: 300, overflowY: "auto",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          borderRadius: "0 20px 20px 0", paddingBottom: 100,
        }}
      >
        <div style={{ padding: "48px 48px 0" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: c.text, marginBottom: 32 }}>{title}</h2>
          {children}
        </div>
        <div style={{ position: "sticky", bottom: 0, background: c.surface, padding: "20px 48px", display: "flex", gap: 8, borderTop: `1px solid ${c.border}`, marginTop: 32 }}>
          {footerLeft}
          <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>{footerRight}</div>
        </div>
      </div>
    </>
  );
}

function InvoiceForm({ data, onChange, c }) {
  const ls = labelStyle(c);
  const inp = buildInputStyle(c);
  const gridThree = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 };
  const gridTwo = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 };

  const field = (key) => ({
    value: data[key] || "",
    onChange: (val) => onChange(key, val),
  });

  const updateItem = (i, f, v) => {
    const items = [...data.items];
    items[i] = { ...items[i], [f]: f === "name" ? v : +v };
    onChange("items", items);
  };
  const addItem = () => onChange("items", [...data.items, { name: "", qty: 1, price: 0 }]);
  const removeItem = (i) => onChange("items", data.items.filter((_, idx) => idx !== i));

  return (
    <>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#7C5DFA", marginBottom: 20 }}>Bill From</p>
      <div style={{ marginBottom: 20 }}>
        <label style={ls}>Street Address</label>
        <FormInput {...field("fromStreet")} c={c} />
      </div>
      <div style={gridThree}>
        <div><label style={ls}>City</label><FormInput {...field("fromCity")} c={c} /></div>
        <div><label style={ls}>Post Code</label><FormInput {...field("fromPost")} c={c} /></div>
        <div><label style={ls}>Country</label><FormInput {...field("fromCountry")} c={c} /></div>
      </div>

      <p style={{ fontSize: 13, fontWeight: 700, color: "#7C5DFA", margin: "8px 0 20px" }}>Bill To</p>
      <div style={{ marginBottom: 20 }}><label style={ls}>Client's Name</label><FormInput {...field("name")} placeholder="e.g. Alex Grim" c={c} /></div>
      <div style={{ marginBottom: 20 }}><label style={ls}>Client's Email</label><FormInput {...field("email")} placeholder="e.g. alex@mail.com" type="email" c={c} /></div>
      <div style={{ marginBottom: 20 }}><label style={ls}>Street Address</label><FormInput {...field("toStreet")} placeholder="e.g. 84 Church Way" c={c} /></div>
      <div style={gridThree}>
        <div><label style={ls}>City</label><FormInput {...field("toCity")} c={c} /></div>
        <div><label style={ls}>Post Code</label><FormInput {...field("toPost")} c={c} /></div>
        <div><label style={ls}>Country</label><FormInput {...field("toCountry")} c={c} /></div>
      </div>

      <div style={gridTwo}>
        <div><label style={ls}>Invoice Date</label><FormInput {...field("invoiceDate")} c={c} /></div>
        <div>
          <label style={ls}>Payment Terms</label>
          <select value={data.paymentTerms || "Net 30 Days"} onChange={(e) => onChange("paymentTerms", e.target.value)} style={inp}>
            <option>Net 30 Days</option>
            <option>Net 14 Days</option>
            <option>Net 7 Days</option>
            <option>Net 1 Day</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}><label style={ls}>Project Description</label><FormInput {...field("description")} placeholder="e.g. Graphic Design" c={c} /></div>

      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#777F98", margin: "32px 0 16px" }}>Item List</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 56px 86px 76px 24px", gap: 12, marginBottom: 8 }}>
        {["Item Name", "Qty.", "Price", "Total", ""].map((h, i) => (
          <span key={i} style={{ fontSize: 12, color: c.textSecondary }}>{h}</span>
        ))}
      </div>
      {data.items.map((item, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 56px 86px 76px 24px", gap: 12, marginBottom: 12, alignItems: "center" }}>
          <input type="text" value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} style={inp} />
          <input type="number" value={item.qty} onChange={(e) => updateItem(i, "qty", e.target.value)} style={{ ...inp, textAlign: "center", padding: "12px 8px" }} />
          <input type="number" value={item.price} onChange={(e) => updateItem(i, "price", e.target.value)} style={{ ...inp, padding: "12px 8px" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: c.textMuted, paddingTop: 4 }}>{(item.qty * item.price).toFixed(2)}</span>
          <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted, fontSize: 16, padding: 4, lineHeight: 1 }}
            onMouseEnter={(e) => (e.target.style.color = "#EC5757")}
            onMouseLeave={(e) => (e.target.style.color = c.textMuted)}>✕</button>
        </div>
      ))}
      <button onClick={addItem} style={{ width: "100%", background: c.surface2, border: "none", borderRadius: 30, padding: 14, fontSize: 13, fontWeight: 700, color: c.textSecondary, cursor: "pointer", marginTop: 8 }}>
        + Add New Item
      </button>
    </>
  );
}

// ─── New Invoice Drawer ───────────────────────────────────────────────────────
const BLANK = {
  fromStreet: "19 Union Terrace", fromCity: "London", fromPost: "E1 3EZ", fromCountry: "United Kingdom",
  name: "", email: "", toStreet: "", toCity: "", toPost: "", toCountry: "",
  invoiceDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  paymentTerms: "Net 30 Days", description: "", items: [],
};

export function NewInvoiceDrawer({ isOpen, onClose, onSave }) {
  const c = useColors();
  const [data, setData] = useState(BLANK);

  useEffect(() => { if (isOpen) setData(BLANK); }, [isOpen]);

  const field = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const buildInvoice = (status) => {
    const total = data.items.reduce((s, it) => s + it.qty * it.price, 0);
    return {
      ...data,
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      due: data.invoiceDate || "TBD",
      paymentDue: data.invoiceDate || "TBD",
      amount: total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      status,
    };
  };

  return (
    <DrawerShell
      isOpen={isOpen} onClose={onClose} title="New Invoice" c={c}
      footerLeft={
        <button onClick={onClose} style={{ background: c.surface2, border: "none", borderRadius: 24, padding: "14px 24px", fontSize: 13, fontWeight: 700, color: c.textSecondary, cursor: "pointer" }}>Discard</button>
      }
      footerRight={
        <>
          <button onClick={() => { onSave(buildInvoice("draft")); onClose(); }} style={{ background: "#373B53", border: "none", borderRadius: 24, padding: "14px 24px", fontSize: 13, fontWeight: 700, color: "#888EB0", cursor: "pointer" }}>Save as Draft</button>
          <button onClick={() => { if (!data.name.trim()) return; onSave(buildInvoice("pending")); onClose(); }} style={{ background: "#7C5DFA", border: "none", borderRadius: 24, padding: "14px 24px", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}>Save &amp; Send</button>
        </>
      }
    >
      <InvoiceForm data={data} onChange={field} c={c} />
    </DrawerShell>
  );
}

// ─── Edit Invoice Drawer ──────────────────────────────────────────────────────
export function EditInvoiceDrawer({ isOpen, invoice, onClose, onSave }) {
  const c = useColors();
  const [data, setData] = useState(invoice || {});

  useEffect(() => { if (invoice) setData({ ...invoice }); }, [invoice]);

  const field = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const handleSave = () => {
    const total = data.items.reduce((s, it) => s + it.qty * it.price, 0);
    onSave({ ...data, amount: total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") });
    onClose();
  };

  return (
    <DrawerShell
      isOpen={isOpen} onClose={onClose}
      title={<>Edit <span style={{ color: c.textMuted }}>#{invoice?.id}</span></>}
      c={c}
      footerLeft={null}
      footerRight={
        <>
          <button onClick={onClose} style={{ background: c.surface2, border: "none", borderRadius: 24, padding: "14px 24px", fontSize: 13, fontWeight: 700, color: c.textSecondary, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ background: "#7C5DFA", border: "none", borderRadius: 24, padding: "14px 24px", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer" }}>Save Changes</button>
        </>
      }
    >
      <InvoiceForm data={data} onChange={field} c={c} />
    </DrawerShell>
  );
}