(function () {
  var cfg = window.SILO_CONFIG || {};
  var dict = window.SILO_I18N || {};
  var currentLang = "pt";
  var htmlLang = { pt: "pt-BR", es: "es", en: "en" };
  var nodes = document.querySelectorAll("[data-i18n]");
  var original = [];
  nodes.forEach(function (n) { original.push(n.textContent); });

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (n) { n.textContent = value; });
  }
  var versions = cfg.VERSIONS || [];
  var latest = versions[0] || {};
  if (latest.version) setText(".js-version", latest.version);
  if (latest.installerSize) setText(".js-size", latest.installerSize);
  setText(".js-year", String(new Date().getFullYear()));

  var url = (latest.installerUrl || "").trim();
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

  var portable = (latest.portableUrl || "").trim();
  if (portable) {
    document.querySelectorAll(".js-portable").forEach(function (a) {
      a.href = portable;
      a.rel = "noopener";
      a.hidden = false;
    });
  }

  function t(key, fallback) {
    var d = dict[currentLang];
    return d && d[key] ? d[key] : fallback;
  }
  function fmtDate(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return currentLang === "en" ? p[1] + "/" + p[2] + "/" + p[0] : p[2] + "/" + p[1] + "/" + p[0];
  }
  function anchor(v) { return "v" + v.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }
  function fileCell(href, label, size) {
    var td = document.createElement("td");
    if (href) {
      var a = document.createElement("a");
      a.href = href;
      a.rel = "noopener";
      a.textContent = label + (size ? " · " + size : "");
      td.appendChild(a);
    } else {
      var s = document.createElement("span");
      s.className = "muted";
      s.textContent = t("vs.soon", "em breve");
      td.appendChild(s);
    }
    return td;
  }
  var versionsBody = document.getElementById("versionsBody");
  function renderVersions() {
    if (!versionsBody) return;
    versionsBody.textContent = "";
    versions.forEach(function (v, i) {
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.scope = "row";
      th.textContent = v.version;
      if (i === 0) {
        var tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = t("vs.current", "atual");
        th.appendChild(tag);
      }
      tr.appendChild(th);
      var td = document.createElement("td");
      td.textContent = fmtDate(v.date) || "–";
      tr.appendChild(td);
      tr.appendChild(fileCell(v.installerUrl, t("vs.installer", "Instalador"), v.installerSize));
      tr.appendChild(fileCell(v.portableUrl, t("vs.portable", "Portátil"), v.portableSize));
      var notes = document.createElement("td");
      var na = document.createElement("a");
      na.href = "releases.html#" + anchor(v.version);
      na.textContent = t("vs.notes", "O que mudou");
      notes.appendChild(na);
      tr.appendChild(notes);
      versionsBody.appendChild(tr);
    });
  }

  var formMsgs = {
    pt: { sending: "Enviando...", ok: "Mensagem enviada. Responderemos no e-mail informado.", fail: "Não foi possível enviar agora. Tente novamente em alguns minutos.", invalid: "Preencha nome, e-mail válido e mensagem." },
    es: { sending: "Enviando...", ok: "Mensaje enviado. Responderemos al correo indicado.", fail: "No fue posible enviar ahora. Inténtalo de nuevo en unos minutos.", invalid: "Completa nombre, correo válido y mensaje." },
    en: { sending: "Sending...", ok: "Message sent. We will reply to the e-mail you provided.", fail: "Could not send right now. Please try again in a few minutes.", invalid: "Please fill in name, a valid e-mail and message." }
  };
  var form = document.getElementById("supportForm");
  var formKey = (cfg.FORM_ACCESS_KEY || "").trim();
  var statusEl = form && form.querySelector(".form-status");
  if (form && !formKey) {
    form.querySelectorAll("input, select, textarea, button").forEach(function (el) { el.disabled = true; });
    form.querySelector(".js-support-soon").hidden = false;
  }
  if (form) form.addEventListener("submit", function (ev) {
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
    renderVersions();
    document.dispatchEvent(new CustomEvent("silo-lang", { detail: lang }));
  }

  var saved = null;
  try { saved = localStorage.getItem("silo-lang"); } catch (e) {}
  if (!saved) {
    var nav = (navigator.language || "pt").slice(0, 2).toLowerCase();
    saved = dict[nav] ? nav : "pt";
  }
  if (saved !== "pt") apply(saved); else renderVersions();

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
  });

  var menuBtn = document.getElementById("menuBtn");
  var navEl = document.getElementById("nav");
  if (menuBtn && navEl) menuBtn.addEventListener("click", function () {
    var open = navEl.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  if (navEl) navEl.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navEl.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
})();
