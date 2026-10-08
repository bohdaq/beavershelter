(function () {
  "use strict";

  // Rok w stopce
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu mobilne
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    nav.classList.toggle("is-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Filtrowanie podopiecznych
  var chips = document.querySelectorAll(".chip");
  var cards = document.querySelectorAll(".card");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.dataset.filter;
      chips.forEach(function (c) {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-pressed", String(c === chip));
      });
      cards.forEach(function (card) {
        var tags = card.dataset.tags.split(" ");
        card.hidden = filter !== "all" && tags.indexOf(filter) === -1;
      });
    });
  });

  // Kwoty darowizny
  var amountInfo = {
    20: "20 zł to zapas jabłek i marchwi dla bobrzątka na kilka dni.",
    50: "50 zł to tygodniowy zapas świeżych gałązek dla jednego bobra.",
    100: "100 zł pokrywa koszt badania weterynaryjnego jednego podopiecznego."
  };
  var amounts = document.querySelectorAll(".amount");
  var info = document.querySelector(".amount-info");
  amounts.forEach(function (btn) {
    btn.addEventListener("click", function () {
      amounts.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      info.textContent = amountInfo[btn.dataset.amount];
    });
  });

  // Animowane liczniki
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10);
    if (reduceMotion) { el.textContent = target; return; }
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Pojawianie się sekcji przy przewijaniu
  var revealEls = document.querySelectorAll(".section-head, .feature-list li, .card, .help-card, .hours, .faq details, .callout");
  var counters = document.querySelectorAll(".stat-num");

  if ("IntersectionObserver" in window) {
    revealEls.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (el.classList.contains("stat-num")) animateCount(el);
        else el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
    counters.forEach(function (el) { io.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.count; });
  }

  // Formularz kontaktowy (walidacja po stronie przeglądarki)
  var form = document.querySelector(".contact-form");
  var status = form.querySelector(".form-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (input) {
      var valid = input.type === "checkbox" ? input.checked : input.value.trim() !== "" && input.checkValidity();
      var wrapper = input.closest(".field") || input.closest(".consent");
      wrapper.classList.toggle("has-error", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      status.className = "form-status err";
      status.textContent = "Uzupełnij poprawnie wszystkie wymagane pola.";
      return;
    }
    var name = form.elements.name.value.trim().split(" ")[0];
    status.className = "form-status ok";
    status.textContent = "Dziękujemy, " + name + "! Odpowiemy najszybciej, jak to możliwe. 🦫";
    form.reset();
  });
})();
