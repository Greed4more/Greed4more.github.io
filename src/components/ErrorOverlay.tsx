import React from "react";

export function ErrorOverlay({ error, stack }: { error: string; stack?: string }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      padding: 24,
      zIndex: 999999,
      fontFamily: "monospace",
      overflow: "auto"
    }}>
      <h2 style={{ marginTop: 0 }}>Application error</h2>
      <pre style={{ whiteSpace: "pre-wrap", color: "#fff" }}>{error}</pre>
      {stack && (
        <details style={{ marginTop: 12, color: "#ddd" }}>
          <summary>Stack trace</summary>
          <pre style={{ whiteSpace: "pre-wrap", color: "#ddd" }}>{stack}</pre>
        </details>
      )}
    </div>
  );
}

export function installErrorOverlay() {
  // Render overlay into a dedicated container so it doesn't interfere with React root
  const mountId = "__error_overlay__";
  let container = document.getElementById(mountId);
  if (!container) {
    container = document.createElement("div");
    container.id = mountId;
    document.body.appendChild(container);
  }

  function show(error: string, stack?: string) {
    try {
      // Use simple innerHTML to avoid relying on React if it's failing early
      container!.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.85);color:#fff;padding:24px;z-index:999999;font-family:monospace;overflow:auto;">
          <h2 style="margin-top:0">Application error</h2>
          <pre style="white-space:pre-wrap;color:#fff">${escapeHtml(error)}</pre>
          ${stack ? `<details style="margin-top:12px;color:#ddd"><summary>Stack trace</summary><pre style="white-space:pre-wrap;color:#ddd">${escapeHtml(stack)}</pre></details>` : ""}
        </div>
      `;
    } catch (e) {
      // ignore
    }
  }

  function escapeHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  window.addEventListener("error", (ev) => {
    try {
      const msg = ev.error ? (ev.error.stack || ev.error.message || String(ev.error)) : ev.message || "Unknown error";
      show(msg, ev.error && ev.error.stack ? ev.error.stack : undefined);
    } catch (e) {}
  });

  window.addEventListener("unhandledrejection", (ev) => {
    try {
      const reason = ev.reason ? (ev.reason.stack || ev.reason.message || String(ev.reason)) : String(ev);
      show(String(reason), ev.reason && ev.reason.stack ? ev.reason.stack : undefined);
    } catch (e) {}
  });

  return {
    show,
  };
}
