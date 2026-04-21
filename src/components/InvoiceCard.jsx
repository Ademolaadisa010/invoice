import React from "react";

const statusStyles = {
  paid: { background: "#F3FBF4", color: "#33D69F", dot: "#33D69F" },
  pending: { background: "#FFF8F0", color: "#FF8F00", dot: "#FF8F00" },
  draft: { background: "#F4F4F8", color: "#373B53", dot: "#373B53" },
};

export default function InvoiceCard({ invoice, onClick }) {
  const { id, due, name, amount, status } = invoice;
  const badge = statusStyles[status] || statusStyles.draft;
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.id}>
        <span style={{ color: "#7E88C3" }}>#</span>
        {id}
      </div>
      <div style={styles.due}>Due {due}</div>
      <div style={styles.name}>{name}</div>
      <div style={styles.amount}>£ {amount}</div>
      <div style={styles.statusWrap}>
        <span
          style={{
            ...styles.badge,
            background: badge.background,
            color: badge.color,
          }}
        >
          <span
            style={{
              ...styles.dot,
              background: badge.dot,
            }}
          />
          {label}
        </span>
      </div>
      <svg width="7" height="11" viewBox="0 0 7 11" fill="none" style={{ marginLeft: 12, flexShrink: 0 }}>
        <path d="M1 1l4.5 4.5L1 10" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    border: "1px solid #F3F3F8",
    borderRadius: 8,
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "border-color 0.2s",
    marginBottom: 16,
  },
  id: {
    width: 100,
    fontWeight: 700,
    fontSize: 14,
    color: "#0C0E16",
  },
  due: {
    width: 145,
    fontSize: 13,
    color: "#7E88C3",
  },
  name: {
    flex: 1,
    fontSize: 13,
    color: "#858BB2",
  },
  amount: {
    width: 130,
    textAlign: "right",
    fontWeight: 700,
    fontSize: 15,
    color: "#0C0E16",
    marginRight: 20,
  },
  statusWrap: {
    width: 110,
    display: "flex",
    justifyContent: "center",
  },
  badge: {
    padding: "6px 18px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
};