import React from "react";

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoWrap}>
        <div style={styles.logoCircle}>
          <div style={styles.logoInner} />
        </div>
      </div>

      <div style={styles.bottomNav}>
        <button style={styles.iconBtn} aria-label="Toggle dark mode">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              fill="#858BB2"
            />
          </svg>
        </button>
        <hr style={styles.divider} />
        <div style={styles.avatar}>JD</div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 80,
    minHeight: "100vh",
    background: "#373B53",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "0 20px 20px 0",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    height: "100vh",
    zIndex: 400,
  },
  logoWrap: {
    width: 80,
    height: 80,
    background: "linear-gradient(180deg,#9277FF 0%,#7C5DFA 100%)",
    borderRadius: "0 20px 20px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 40,
    height: 40,
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoInner: {
    width: 20,
    height: 20,
    background: "#7C5DFA",
    borderRadius: "50% 50% 50% 0",
  },
  bottomNav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 24,
    gap: 0,
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "12px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: "100%",
    border: "none",
    borderTop: "1px solid #494E6E",
    margin: "8px 0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#7C5DFA",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },
};