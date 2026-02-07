document.addEventListener("DOMContentLoaded", function () {
  // Leaderboard data (rank will be calculated automatically based on accuracy)
  const leaderboardData = {
    "code": [
      {
        "model": "GPT-5.1-Codex",
        "date": "Jan 12, 2026",
        "accuracy": 54.9,
        "cost": 115.40
      },
      {
        "model": "Gemini 3 Flash",
        "date": "Dec 15, 2025",
        "accuracy": 53.3,
        "cost": 21.40
      },
      {
        "model": "Claude-Sonnet-4.5",
        "date": "Nov 28, 2025",
        "accuracy": 52.0,
        "cost": 114.00
      },
      {
        "model": "Kimi K2 Thinking",
        "date": "Oct 30, 2025",
        "accuracy": 49.7,
        "cost": 36.04
      },
      {
        "model": "Qwen3-235B-A22B",
        "date": "Sep 15, 2025",
        "accuracy": 38.2,
        "cost": 36.99
      },
      {
        "model": "GLM-4.7",
        "date": "Jul 28, 2025",
        "accuracy": 41.5,
        "cost": 24.74
      },
      {
        "model": "DeepSeek-V3.2",
        "date": "Jun 16, 2025",
        "accuracy": 44.8,
        "cost": 6.62
      },
      {
        "model": "Grok Code Fast 1",
        "date": "Apr 24, 2025",
        "accuracy": 30.1,
        "cost": 18.61
      },
      {
        "model": "DevStral 2",
        "date": "Apr 24, 2025",
        "accuracy": 33.3,
        "cost": 1.89
      },
      {
        "model": "GPT-4o",
        "date": "Apr 24, 2025",
        "accuracy": 16.7,
        "cost": 105.40
      }
    ],
    "flow": [
      {
        "model": "GPT-5.1-Codex",
        "date": "Jan 12, 2026",
        "accuracy": 34.6,
        "cost": 264.10
      },
      {
        "model": "Gemini 3 Flash",
        "date": "Dec 15, 2025",
        "accuracy": 22.2,
        "cost": 41.66
      },
      {
        "model": "Kimi K2 Thinking",
        "date": "Nov 28, 2025",
        "accuracy": 30.1,
        "cost": 75.04
      },
      {
        "model": "Grok Code Fast 1",
        "date": "Oct 30, 2025",
        "accuracy": 13.1,
        "cost": 35.56
      },
      {
        "model": "Claude-Sonnet-4.5",
        "date": "Sep 15, 2025",
        "accuracy": 24.5,
        "cost": 223.20
      },
      {
        "model": "Qwen3-235B-A22B",
        "date": "Jul 28, 2025",
        "accuracy": 19.3,
        "cost": 47.51
      },
      {
        "model": "GLM-4.7",
        "date": "Jun 16, 2025",
        "accuracy": 19.9,
        "cost": 53.88
      },
      {
        "model": "DeepSeek-V3.2",
        "date": "Apr 24, 2025",
        "accuracy": 15.7,
        "cost": 11.59
      }
    ]
  };

  // Load and render leaderboard data
  function loadLeaderboardData() {
    renderLeaderboard(leaderboardData);
  }

  function renderLeaderboard(data) {
    // Sort data by accuracy (descending) and calculate rank
    const sortedCode = [...data.code].sort((a, b) => b.accuracy - a.accuracy);
    const sortedFlow = [...data.flow].sort((a, b) => b.accuracy - a.accuracy);

    // Render Code mode table
    const codeTbody = document.querySelector('[data-runmode-table="code"] tbody');
    if (codeTbody) {
      codeTbody.innerHTML = sortedCode.map((item, index) => createTableRow(item, index + 1)).join("");
    }

    // Render Flow mode table
    const flowTbody = document.querySelector('[data-runmode-table="flow"] tbody');
    if (flowTbody) {
      flowTbody.innerHTML = sortedFlow.map((item, index) => createTableRow(item, index + 1)).join("");
    }

    // Re-initialize user simulator logic after rendering
    setTimeout(() => {
      if (userSimulatorSelect) {
        setUserSimulator(userSimulatorSelect.value);
      }
    }, 0);
  }

  function createTableRow(item, rank) {
    const crownIcon = rank <= 3 
      ? `<i class="fas fa-crown rank-crown ${getCrownClass(rank)}"></i>` 
      : "";
    const rankDisplay = crownIcon 
      ? `<span class="rank-num">${crownIcon}<span>${rank}</span></span>`
      : `<span class="rank-num">${rank}</span>`;

    return `
      <tr data-user-simulator="deepseek-v3.2">
        <td class="rank-cell">${rankDisplay}</td>
        <td>${item.model}</td>
        <td><span class="lb-date">${item.date}</span></td>
        <td class="accuracy-cell">
          <div class="accuracy-bar" style="width: ${item.accuracy}%"></div>
          <span class="accuracy-value">${item.accuracy}</span>
        </td>
        <td>${item.cost}</td>
      </tr>
    `;
  }

  function getCrownClass(rank) {
    if (rank === 1) return "gold";
    if (rank === 2) return "silver";
    if (rank === 3) return "bronze";
    return "";
  }

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
  const runmodeDescriptions = document.querySelectorAll("[data-runmode-desc]");
  const runmodeSelect = document.getElementById("runmode-select");

  const setRunmode = (mode) => {
    // Show/hide tables
    runmodeTables.forEach((tbl) => {
      const tmode = tbl.getAttribute("data-runmode-table");
      tbl.classList.toggle("is-hidden", tmode !== mode);
    });

    // Show/hide descriptions
    runmodeDescriptions.forEach((desc) => {
      const descMode = desc.getAttribute("data-runmode-desc");
      desc.classList.toggle("is-hidden", descMode !== mode);
    });
  };

  if (runmodeSelect) {
    const updateTables = () => setRunmode(runmodeSelect.value);
    runmodeSelect.addEventListener("change", updateTables);
    // Initialize with default value
    updateTables();
  }

  // User Simulator selection logic
  const userSimulatorSelect = document.getElementById("user-simulator-select");
  const dataUnavailableMessage = document.getElementById("data-unavailable-message");
  const allTableCards = document.querySelectorAll(".table-card");

  const setUserSimulator = (simulator) => {
    const isDeepSeek = simulator === "deepseek-v3.2";
    // Get table rows dynamically each time (in case data was just loaded)
    const allTableRows = document.querySelectorAll("tbody tr[data-user-simulator]");
    
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

  // Load leaderboard data on page load
  loadLeaderboardData();
});
