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
});


