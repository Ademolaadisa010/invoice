import React from "react";
import Empty from "../images/Email campaign_Flatline 2.png"

export default function EmptyState() {
  return (
    <div style={styles.wrap}>
      <img src={Empty} alt="empty"/>
      <h2 style={styles.title}>There is nothing here</h2>
      <p style={styles.body}>
        Create an invoice by clicking the{" "}
        <span style={{ color: "#888EB0" }}>New Invoice</span> button and get started
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
    padding: "10px 0",
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