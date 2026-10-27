(function () {
  var cfg = window.SILO_CONFIG || {};
  var dict = window.SILO_I18N || {};
  var htmlLang = { pt: "pt-BR", es: "es", en: "en" };
  var nodes = document.querySelectorAll("[data-i18n]");
  var original = [];
  nodes.forEach(function (n) { original.push(n.textContent); });

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (n) { n.textContent = value; });
  }
  if (cfg.VERSION) setText(".js-version", cfg.VERSION);
  if (cfg.INSTALLER_SIZE) setText(".js-size", cfg.INSTALLER_SIZE);
  setText(".js-year", String(new Date().getFullYear()));

  var url = (cfg.DOWNLOAD_URL || "").trim();
  document.querySelectorAll(".js-download").forEach(function (a) {
    if (url) {
      a.href = url;
      a.rel = "noopener";
    } else {
      a.href = "#download";
      a.classList.add("is-disabled");
      a.setAttribute("aria-disabled", "true");
    }
  });
  if (!url) document.querySelectorAll(".js-dl-note").forEach(function (n) { n.hidden = false; });

  var portable = (cfg.PORTABLE_URL || "").trim();
  if (portable) {
    document.querySelectorAll(".js-portable").forEach(function (a) {
      a.href = portable;
      a.rel = "noopener";
      a.hidden = false;
    });
  }

  var support = (cfg.SUPPORT_CONTACT || "").trim();
  if (support) {
    var link = document.querySelector(".js-support");
    link.href = support.indexOf("@") > 0 && support.indexOf(":") < 0 ? "mailto:" + support : support;
    link.hidden = false;
    document.querySelector(".js-support-soon").hidden = true;
  }

  function apply(lang) {
    var d = dict[lang];
    nodes.forEach(function (n, i) {
      var key = n.getAttribute("data-i18n");
      n.textContent = d && d[key] ? d[key] : original[i];
    });
    document.documentElement.lang = htmlLang[lang] || "pt-BR";
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    try { localStorage.setItem("silo-lang", lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("silo-lang"); } catch (e) {}
  if (!saved) {
    var nav = (navigator.language || "pt").slice(0, 2).toLowerCase();
    saved = dict[nav] ? nav : "pt";
  }
  if (saved !== "pt") apply(saved);

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
  });

  var menuBtn = document.getElementById("menuBtn");
  var navEl = document.getElementById("nav");
  menuBtn.addEventListener("click", function () {
    var open = navEl.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  navEl.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navEl.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
})();
