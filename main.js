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
  var behind = [["Windows", latest.installer || latest.portable, latest.version], ["Mac", (cfg.MAC || {}).available, (cfg.MAC || {}).version], ["Linux", (cfg.LINUX || {}).available, (cfg.LINUX || {}).version]]
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

  var requestUrl = (cfg.DOWNLOAD_REQUEST_URL || "").trim();
  var mac = cfg.MAC || {};
  var linux = cfg.LINUX || {};
  var hasWin = !!latest.installer;
  var hasPortable = !!latest.portable;
  var hasMac = !!mac.available;
  var hasLinux = !!linux.available;

  function disable(a) {
    a.href = "#download";
    a.classList.add("is-disabled");
    a.setAttribute("aria-disabled", "true");
  }
  function bindRequest(selector, platform, show) {
    document.querySelectorAll(selector).forEach(function (a) {
      if (!show) return;
      a.hidden = false;
      if (!requestUrl) { disable(a); return; }
      if (!document.getElementById("dlDialog")) { a.href = "index.html#pedir"; return; }
      a.href = "#download";
      a.setAttribute("data-platform", platform);
      a.classList.add("js-request");
    });
  }
  document.querySelectorAll(".js-download").forEach(function (a) { if (!hasWin) disable(a); });
  bindRequest(".js-download", "win", hasWin);
  bindRequest(".js-portable", "win", hasPortable);
  bindRequest(".js-mac", "mac", hasMac);
  bindRequest(".js-linux", "linux", hasLinux);
  if (!requestUrl || !hasWin) document.querySelectorAll(".js-dl-note").forEach(function (n) { n.hidden = false; });
  if (requestUrl) document.querySelectorAll(".js-dl-how").forEach(function (n) { n.hidden = false; });

  if (hasMac) {
    document.querySelectorAll(".js-mac-info").forEach(function (n) { n.hidden = false; });
    if (mac.version) setText(".js-mac-version", mac.version);
    if (mac.size) setText(".js-mac-size", mac.size);
  }
  if (hasLinux) {
    document.querySelectorAll(".js-linux-info").forEach(function (n) { n.hidden = false; });
    if (linux.version) setText(".js-linux-version", linux.version);
    if (linux.size) setText(".js-linux-size", linux.size);
  }

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
  function fileCell(available, label, size) {
    var td = document.createElement("td");
    if (available && requestUrl) {
      var a = document.createElement("a");
      a.href = "#download";
      a.className = "js-request";
      a.setAttribute("data-platform", "win");
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
      tr.appendChild(fileCell(i === 0 && v.installer, t("vs.installer", "Instalador"), v.installerSize));
      tr.appendChild(fileCell(i === 0 && v.portable, t("vs.portable", "Portátil"), v.portableSize));
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

  var reqMsgs = {
    pt: { sending: "Enviando pedido...", ok: "Pedido enviado. Chave do pedido: {key}. Você recebe o link para baixar no seu e-mail assim que o pedido for aprovado.", again: "Já recebemos este pedido. Chave: {key}. Aguarde o e-mail com o link.", busy: "Muitos pedidos agora. Tente de novo em alguns minutos.", fail: "Não foi possível enviar o pedido agora. Tente de novo em alguns minutos.", invalid: "Preencha nome, e-mail válido e sistema." },
    es: { sending: "Enviando solicitud...", ok: "Solicitud enviada. Clave de la solicitud: {key}. Recibirás el enlace de descarga en tu correo en cuanto se apruebe.", again: "Ya recibimos esta solicitud. Clave: {key}. Espera el correo con el enlace.", busy: "Hay muchas solicitudes ahora. Inténtalo de nuevo en unos minutos.", fail: "No fue posible enviar la solicitud ahora. Inténtalo de nuevo en unos minutos.", invalid: "Completa nombre, correo válido y sistema." },
    en: { sending: "Sending request...", ok: "Request sent. Request key: {key}. You will get the download link by e-mail as soon as it is approved.", again: "We already have this request. Key: {key}. Please wait for the e-mail with the link.", busy: "Too many requests right now. Please try again in a few minutes.", fail: "Could not send the request right now. Please try again in a few minutes.", invalid: "Please fill in name, a valid e-mail and system." }
  };
  var dlDialog = document.getElementById("dlDialog");
  var dlForm = document.getElementById("dlForm");
  var dlStatus = dlForm && dlForm.querySelector(".form-status");
  if (dlForm) {
    var sysSel = dlForm.querySelector("select[name=sistema]");
    [["win", hasWin || hasPortable], ["mac", hasMac], ["linux", hasLinux]].forEach(function (o) {
      var opt = sysSel.querySelector('option[value="' + o[0] + '"]');
      if (opt && !o[1]) opt.remove();
    });
  }
  function openRequest(platform) {
    if (!dlDialog || !dlForm) return;
    var sel = dlForm.querySelector("select[name=sistema]");
    if (sel.querySelector('option[value="' + platform + '"]')) sel.value = platform;
    dlStatus.textContent = "";
    dlStatus.className = "form-status";
    if (typeof dlDialog.showModal === "function") dlDialog.showModal(); else dlDialog.setAttribute("open", "");
    var first = dlForm.querySelector("input[name=nome]");
    if (first) first.focus();
  }
  function closeRequest() {
    if (!dlDialog) return;
    if (typeof dlDialog.close === "function") dlDialog.close(); else dlDialog.removeAttribute("open");
  }
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest(".js-request");
    if (!a || !dlDialog) return;
    ev.preventDefault();
    openRequest(a.getAttribute("data-platform") || "win");
  });
  if (dlDialog) {
    dlDialog.querySelectorAll(".js-dl-close").forEach(function (b) { b.addEventListener("click", closeRequest); });
    dlDialog.addEventListener("click", function (ev) { if (ev.target === dlDialog) closeRequest(); });
  }
  if (requestUrl && location.hash === "#pedir" && dlDialog) {
    var dlSection = document.getElementById("download");
    if (dlSection) dlSection.scrollIntoView();
    openRequest("win");
  }
  if (dlForm) dlForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!requestUrl) return;
    var m = reqMsgs[currentLang] || reqMsgs.pt;
    if (!dlForm.checkValidity()) {
      dlStatus.textContent = m.invalid;
      dlStatus.className = "form-status err";
      return;
    }
    var data = {};
    new FormData(dlForm).forEach(function (v, k) { data[k] = v; });
    data.idioma = currentLang;
    var btn = dlForm.querySelector("button[type=submit]");
    btn.disabled = true;
    dlStatus.textContent = m.sending;
    dlStatus.className = "form-status";
    fetch(requestUrl, { method: "POST", body: JSON.stringify(data) })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.ok) {
          dlStatus.textContent = res.error === "invalid" ? m.invalid : res.error === "busy" ? m.busy : m.fail;
          dlStatus.className = "form-status err";
          return;
        }
        dlStatus.textContent = (res.repeated ? m.again : m.ok).replace("{key}", res.key || "");
        dlStatus.className = "form-status ok";
        dlForm.querySelector("input[name=nome]").value = "";
        dlForm.querySelector("input[name=email]").value = "";
      })
      .catch(function () {
        dlStatus.textContent = m.fail;
        dlStatus.className = "form-status err";
      })
      .then(function () { btn.disabled = false; });
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
