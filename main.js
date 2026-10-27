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


  var currentLang = "pt";
  var formMsgs = {
    pt: { sending: "Enviando...", ok: "Mensagem enviada. Responderemos no e-mail informado.", fail: "Não foi possível enviar agora. Tente novamente em alguns minutos.", invalid: "Preencha nome, e-mail válido e mensagem." },
    es: { sending: "Enviando...", ok: "Mensaje enviado. Responderemos al correo indicado.", fail: "No fue posible enviar ahora. Inténtalo de nuevo en unos minutos.", invalid: "Completa nombre, correo válido y mensaje." },
    en: { sending: "Sending...", ok: "Message sent. We will reply to the e-mail you provided.", fail: "Could not send right now. Please try again in a few minutes.", invalid: "Please fill in name, a valid e-mail and message." }
  };
  var form = document.getElementById("supportForm");
  var formKey = (cfg.FORM_ACCESS_KEY || "").trim();
  var statusEl = form.querySelector(".form-status");
  if (!formKey) {
    form.querySelectorAll("input, select, textarea, button").forEach(function (el) { el.disabled = true; });
    form.querySelector(".js-support-soon").hidden = false;
  }
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!formKey) return;
    var m = formMsgs[currentLang] || formMsgs.pt;
    if (!form.checkValidity()) {
      statusEl.textContent = m.invalid;
      statusEl.className = "form-status err";
      return;
    }
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    if (data.botcheck) return;
    delete data.botcheck;
    data.access_key = formKey;
    data.subject = "Suporte Silo IDE: " + data.assunto + " - " + data.nome;
    data.from_name = "Site Silo Tecnologia";
    data.replyto = data.email;
    data.idioma = currentLang;
    var btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    statusEl.textContent = m.sending;
    statusEl.className = "form-status";
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    }).then(function (r) { return r.json(); }).then(function (res) {
      if (!res.success) throw new Error(res.message);
      statusEl.textContent = m.ok;
      statusEl.className = "form-status ok";
      form.reset();
    }).catch(function () {
      statusEl.textContent = m.fail;
      statusEl.className = "form-status err";
    }).then(function () { btn.disabled = false; });
  });

  function apply(lang) {
    currentLang = lang;
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
