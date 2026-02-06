document.addEventListener("DOMContentLoaded", function () {
  // Logo hover effect
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    logoImg.addEventListener("mouseleave", function () {
      this.style.transform = "scale(0.95)";
    });
  }

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

  // User Simulator selection logic
  const userSimulatorSelect = document.getElementById("user-simulator-select");
  const dataUnavailableMessage = document.getElementById("data-unavailable-message");
  const allTableRows = document.querySelectorAll("tbody tr[data-user-simulator]");
  const allTableCards = document.querySelectorAll(".table-card");

  const setUserSimulator = (simulator) => {
    const isDeepSeek = simulator === "deepseek-v3.2";
    
    if (isDeepSeek) {
      // Show table cards (runmode logic will handle which one is visible)
      allTableCards.forEach((card) => {
        card.classList.remove("user-simulator-hidden");
      });
      
      // Show rows for DeepSeek-V3.2
      allTableRows.forEach((row) => {
        const rowSimulator = row.getAttribute("data-user-simulator");
        row.style.display = rowSimulator === simulator ? "" : "none";
      });

      // Hide unavailable message
      if (dataUnavailableMessage) {
        dataUnavailableMessage.classList.add("is-hidden");
      }
    } else {
      // Hide all table cards and show unavailable message
      allTableCards.forEach((card) => {
        card.classList.add("user-simulator-hidden");
      });

      // Show unavailable message
      if (dataUnavailableMessage) {
        dataUnavailableMessage.classList.remove("is-hidden");
      }
    }
  };

  if (userSimulatorSelect) {
    userSimulatorSelect.addEventListener("change", () => {
      setUserSimulator(userSimulatorSelect.value);
    });
    // Initialize with default value
    setUserSimulator(userSimulatorSelect.value);
  }
});
