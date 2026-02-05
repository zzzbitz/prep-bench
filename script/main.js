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

  const runmodeTables = document.querySelectorAll("[data-runmode-table]");
  const runmodeTabs = document.querySelectorAll(".runmode-tab");
  const runmodeSelect = document.querySelector(".runmode-select");

  const setRunmode = (mode) => {
    runmodeTables.forEach((tbl) => {
      const tmode = tbl.getAttribute("data-runmode-table");
      tbl.classList.toggle("is-hidden", tmode !== mode);
    });

    runmodeTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.getAttribute("data-runmode") === mode);
    });
  };

  if (runmodeTabs.length > 0) {
    runmodeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const mode = tab.getAttribute("data-runmode");
        if (mode) setRunmode(mode);
      });
    });

    const defaultTab =
      document.querySelector(".runmode-tab.is-active") || runmodeTabs[0];
    const defaultMode = defaultTab
      ? defaultTab.getAttribute("data-runmode")
      : null;
    if (defaultMode) setRunmode(defaultMode);
  } else if (runmodeSelect) {
    const updateTables = () => setRunmode(runmodeSelect.value);
    runmodeSelect.addEventListener("change", updateTables);
    updateTables();
  }
});
