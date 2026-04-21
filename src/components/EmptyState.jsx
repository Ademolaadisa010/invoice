import React from "react";

export default function EmptyState() {
  return (
    <div style={styles.wrap}>
      <svg width="120" height="120" viewBox="0 0 200 200" fill="none" style={{ marginBottom: 40 }}>
        <circle cx="100" cy="100" r="80" fill="#F9FAFE" />
        <rect x="55" y="72" width="90" height="10" rx="5" fill="#DFE3FA" />
        <rect x="55" y="92" width="68" height="10" rx="5" fill="#DFE3FA" />
        <rect x="55" y="112" width="80" height="10" rx="5" fill="#DFE3FA" />
        <rect x="55" y="132" width="55" height="10" rx="5" fill="#DFE3FA" />
        <circle cx="142" cy="72" r="28" fill="#7C5DFA" opacity="0.9" />
        <path d="M142 60v24M130 72h24" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <h2 style={styles.title}>There is nothing here</h2>
      <p style={styles.body}>
        Create an invoice by clicking the{" "}
        <strong style={{ color: "#0C0E16" }}>New Invoice</strong> button and get started
      </p>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 0",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0C0E16",
    marginBottom: 12,
  },
  body: {
    fontSize: 13,
    color: "#888EB0",
    lineHeight: 1.9,
    maxWidth: 240,
  },
};