document.addEventListener("DOMContentLoaded", function () {
  const scrollButtons = document.querySelectorAll("[data-scroll-target]");

  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scroll-target");
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const copyBtn = document.querySelector(".citation-copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const targetId = copyBtn.getAttribute("data-copy-target");
      const codeEl = targetId ? document.getElementById(targetId) : null;
      if (!codeEl) return;
      const text = codeEl.textContent || "";
      if (!text) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
        } finally {
          document.body.removeChild(textarea);
        }
      }

      const original = copyBtn.textContent;
      copyBtn.textContent = "Copied";
      setTimeout(() => {
        copyBtn.textContent = original;
      }, 1500);
    });
  }

  const runmodeSelect = document.querySelector(".runmode-select");
  const runmodeTables = document.querySelectorAll("[data-runmode-table]");

  if (runmodeSelect) {
    const updateTables = () => {
      const mode = runmodeSelect.value;
      runmodeTables.forEach((tbl) => {
        const tmode = tbl.getAttribute("data-runmode-table");
        tbl.style.display = tmode === mode ? "" : "none";
      });
    };

    runmodeSelect.addEventListener("change", updateTables);
    updateTables();
  }
});
