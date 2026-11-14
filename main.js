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
  else document.querySelectorAll(".js-size-wrap").forEach(function (n) { n.hidden = true; });
  setText(".js-year", String(new Date().getFullYear()));

  function newer(a, b) {
    var x = String(a || "").split("."), y = String(b || "").split(".");
    for (var i = 0; i < Math.max(x.length, y.length); i++) {
      var d = (parseInt(x[i], 10) || 0) - (parseInt(y[i], 10) || 0);
      if (d) return d > 0;
    }
    return false;
  }
  var newest = (cfg.LATEST || "").trim() || latest.version || "";
  if (newest) setText(".js-latest", newest);
  var mac = cfg.MAC || {};
  var linux = cfg.LINUX || {};
  var behind = [["Windows", latest.installer || latest.portable, latest.version], ["Mac", mac.available, mac.version], ["Linux", linux.available, linux.version]]
    .filter(function (p) { return p[1] && p[2] && newer(newest, p[2]); });
  function renderBehind() {
    if (!behind.length) return;
    var names = behind.map(function (p) { return p[0]; });
    var and = (dict[currentLang] || {})["up.and"] || " e ";
    var text = names.length > 1 ? names.slice(0, -1).join(", ") + and + names[names.length - 1] : names[0];
    var oldest = behind.reduce(function (a, p) { return newer(a, p[2]) ? p[2] : a; }, behind[0][2]);
    setText(".js-behind", text);
    setText(".js-behind-version", oldest);
  }
  renderBehind();
  if (behind.length) document.querySelectorAll(".js-update-note").forEach(function (n) { n.hidden = false; });

  function driveLink(id) {
    id = String(id || "").trim();
    return id ? "https://drive.google.com/uc?export=download&id=" + encodeURIComponent(id) : "";
  }
  var setupUrl = latest.installer ? driveLink(latest.installerId) : "";
  var portableUrl = latest.portable ? driveLink(latest.portableId) : "";
  var macUrl = mac.available ? driveLink(mac.fileId) : "";
  var linuxUrl = linux.available ? driveLink(linux.fileId) : "";

  function disable(a) {
    a.href = "#download";
    a.classList.add("is-disabled");
    a.setAttribute("aria-disabled", "true");
  }
  function bindLink(selector, url, show) {
    document.querySelectorAll(selector).forEach(function (a) {
      if (!show) return;
      a.hidden = false;
      if (!url) { disable(a); return; }
      a.href = url;
      a.rel = "noopener";
    });
  }
  bindLink(".js-download", setupUrl, true);
  bindLink(".js-portable", portableUrl, !!latest.portable);
  bindLink(".js-mac", macUrl, !!mac.available);
  bindLink(".js-linux", linuxUrl, !!linux.available);
  if (!setupUrl) document.querySelectorAll(".js-dl-note").forEach(function (n) { n.hidden = false; });
  [["mac", mac], ["linux", linux]].forEach(function (p) {
    if (!p[1].available) return;
    document.querySelectorAll(".js-" + p[0] + "-info").forEach(function (n) { n.hidden = false; });
    if (p[1].version) setText(".js-" + p[0] + "-version", p[1].version);
    if (p[1].size) setText(".js-" + p[0] + "-size", p[1].size);
    else document.querySelectorAll(".js-" + p[0] + "-size-wrap").forEach(function (n) { n.hidden = true; });
  });

  var donate = cfg.DONATE || {};
  var pixKey = (donate.pixKey || "").trim();
  var donateLinks = (donate.links || []).filter(function (l) {
    return l && /^https:\/\//.test(l.url || "") && (l.label || "").trim();
  });
  var donateSection = document.getElementById("apoie");
  if (donateSection && (pixKey || donateLinks.length)) {
    donateSection.hidden = false;
    document.querySelectorAll(".js-donate-nav, .js-donate-pill").forEach(function (a) { a.hidden = false; });
    var pixBox = donateSection.querySelector(".js-donate-pix");
    if (pixKey && pixBox) {
      pixBox.hidden = false;
      donateSection.querySelector(".js-pix-key").textContent = pixKey;
      var holder = (donate.pixHolder || "").trim();
      var holderEl = donateSection.querySelector(".js-pix-holder");
      if (holder && holderEl) {
        holderEl.textContent = holder;
        holderEl.hidden = false;
      }
      var copyBtn = donateSection.querySelector(".js-pix-copy");
      var copyLabel = copyBtn.querySelector("span");
      var copyTimer = null;
      copyBtn.addEventListener("click", function () {
        function done() {
          copyLabel.textContent = t("dn.copied", "Chave copiada");
          clearTimeout(copyTimer);
          copyTimer = setTimeout(function () { copyLabel.textContent = t("dn.copy", "Copiar chave"); }, 2000);
        }
        function fallback() {
          var area = document.createElement("textarea");
          area.value = pixKey;
          area.setAttribute("readonly", "");
          area.style.position = "fixed";
          area.style.opacity = "0";
          document.body.appendChild(area);
          area.select();
          try { document.execCommand("copy"); done(); } catch (e) {}
          document.body.removeChild(area);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(pixKey).then(done, fallback);
        } else {
          fallback();
        }
      });
    }
    var othersBox = donateSection.querySelector(".js-donate-others");
    if (donateLinks.length && othersBox) {
      othersBox.hidden = false;
      var linksEl = othersBox.querySelector(".js-donate-links");
      donateLinks.forEach(function (l) {
        var a = document.createElement("a");
        a.className = "btn btn-ghost";
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = l.label.trim();
        linksEl.appendChild(a);
      });
    }
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
  function fileCell(url, label, size) {
    var td = document.createElement("td");
    if (!label) {
      td.textContent = "–";
      td.className = "muted";
    } else if (url) {
      var a = document.createElement("a");
      a.href = url;
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
  function versionRows() {
    var rows = [];
    if (latest.version) rows.push({ os: t("vs.win", "Windows 10/11 (64 bits)"), version: latest.version, date: latest.date,
      installer: [setupUrl, latest.installer ? t("vs.installer", "Instalador") : "", latest.installerSize],
      portable: [portableUrl, latest.portable ? t("vs.portable", "Portátil") : "", latest.portableSize] });
    if (mac.available && mac.version) rows.push({ os: t("vs.mac", "macOS (Apple Silicon)"), version: mac.version, date: mac.date,
      installer: [macUrl, ".dmg", mac.size], portable: ["", "", ""] });
    if (linux.available && linux.version) rows.push({ os: t("vs.linux", "Linux x64"), version: linux.version, date: linux.date,
      installer: ["", "", ""], portable: [linuxUrl, ".tar.gz", linux.size] });
    return rows;
  }
  function renderVersions() {
    if (!versionsBody) return;
    versionsBody.textContent = "";
    versionRows().forEach(function (v) {
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.scope = "row";
      th.textContent = v.os;
      tr.appendChild(th);
      var ver = document.createElement("td");
      ver.textContent = v.version;
      tr.appendChild(ver);
      var td = document.createElement("td");
      td.textContent = fmtDate(v.date) || "–";
      tr.appendChild(td);
      tr.appendChild(fileCell(v.installer[0], v.installer[1], v.installer[2]));
      tr.appendChild(fileCell(v.portable[0], v.portable[1], v.portable[2]));
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
  var assuntoParam = null;
  try { assuntoParam = new URLSearchParams(location.search).get("assunto"); } catch (e) {}
  if (form && assuntoParam) {
    var sel = form.querySelector("select[name=assunto]");
    if (sel && sel.querySelector('option[value="' + assuntoParam.replace(/"/g, "") + '"]')) sel.value = assuntoParam;
  }
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
    renderBehind();
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
