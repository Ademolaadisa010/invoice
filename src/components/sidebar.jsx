import React from "react";
import { useTheme } from "./Themecontext";
import { useBreakpoint } from "./useBreakpoint";
import Profile from "../images/Oval.png"
import Toggle from "../images/toggle.png"
import Logo from "../images/Combined Shape.png"
import bg from "../images/bg.png"

export default function Sidebar() {
  const { dark, toggle } = useTheme();
  const { isMobile } = useBreakpoint();

  if (isMobile) {
    return (
      <header style={{
        width: "100%",
        height: 72,
        background: dark ? "#1E2139" : "#373B53",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 400,
        transition: "background 0.3s",
        flexShrink: 0,
      }}>
        <div style={{ width: 80, height: 80, backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover", borderRadius: "0 20px 20px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={Logo} alt="logo" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <button type="button" onClick={(e) => { e.stopPropagation(); toggle(); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0 20px", height: 72, display: "flex", alignItems: "center" }}>
            {dark
              ? <img src={Toggle} alt="toggle" />
              : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="#858BB2" /></svg>
            }
          </button>
          <div style={{ width: 1, height: 72, background: "#494E6E" }} />
          <div style={{ width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={Profile} alt="profile" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <aside style={{
      width: 80,
      minHeight: "100vh",
      background: dark ? "#1E2139" : "#373B53",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "0 20px 20px 0",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      height: "100vh",
      zIndex: 400,
      transition: "background 0.3s",
    }}>
      <div style={{ width: 80, height: 80, backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover", borderRadius: "0 20px 20px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={Logo} alt="logo" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 24 }}>
        <button type="button" onClick={(e) => { e.stopPropagation(); toggle(); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 8px", display: "flex", alignItems: "center", justifyContent: "center", outline: "none" }}>
          {dark
            ? <img src={Toggle} alt="toggle" />
            : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="#858BB2" /></svg>
          }
        </button>
        <hr style={{ width: "100%", border: "none", borderTop: "1px solid #494E6E", margin: "8px 0" }} />
        <img src={Profile} alt="profile" />
      </div>
    </aside>
  );
}