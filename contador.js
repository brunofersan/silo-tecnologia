(function () {
  var url = ((window.SILO_CONFIG || {}).COUNTER_URL || "").trim();
  if (!/^https:\/\/script\.google\.com\//.test(url)) return;
  if (location.protocol === "file:" || /^(localhost|127\.|\[::1\])/.test(location.hostname)) return;
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl) return;

  var page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
  var device = window.matchMedia && matchMedia("(pointer: coarse)").matches ? "celular" : "computador";

  function lang() { return (document.documentElement.lang || "").slice(0, 2); }

  function send(type, target, origin) {
    var body = JSON.stringify({ t: type, p: page, a: target || "", l: lang(), o: origin || "", d: device });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: "text/plain" }))) return;
    } catch (e) {}
    try {
      fetch(url, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain" }, body: body });
    } catch (e) {}
  }

  var origin = "";
  try {
    if (document.referrer) {
      var ref = new URL(document.referrer);
      if (ref.hostname !== location.hostname) origin = ref.hostname;
    }
  } catch (e) {}
  var utm = null;
  try { utm = new URLSearchParams(location.search).get("utm_source"); } catch (e) {}
  if (utm) origin = utm;

  var seenKey = "silo-visita-" + page;
  var seen = false;
  try { seen = sessionStorage.getItem(seenKey) === "1"; sessionStorage.setItem(seenKey, "1"); } catch (e) {}
  if (!seen) send("visita", "", origin);

  var classes = [
    ["js-download", "download:windows"],
    ["js-portable", "download:portatil"],
    ["js-mac", "download:mac"],
    ["js-linux", "download:linux"],
    ["js-pix-copy", "apoie:pix"],
    ["js-donate-pill", "apoie:destaque"],
    ["js-donate-nav", "apoie:menu"]
  ];

  function label(el) {
    var own = el.getAttribute("data-track");
    if (own) return own;
    for (var i = 0; i < classes.length; i++) {
      if (el.classList.contains(classes[i][0])) return classes[i][1];
    }
    var langCode = el.getAttribute("data-lang");
    if (langCode) return "idioma:" + langCode;
    if (el.tagName !== "A") return "";
    var href = el.getAttribute("href") || "";
    if (/drive\.google\.com/.test(href)) return el.closest("#versionsBody") ? "download:tabela" : "download:link";
    if (el.closest(".js-donate-links")) return "apoie:" + (el.textContent || "").trim().toLowerCase();
    if (href.charAt(0) === "#") return (el.closest("#nav") ? "menu:" : "ancora:") + (href.slice(1) || "inicio");
    var target;
    try { target = new URL(href, location.href); } catch (e) { return ""; }
    if (target.hostname !== location.hostname) return "externo:" + target.hostname;
    var name = target.pathname.split("/").pop().replace(/\.html$/, "") || "index";
    return name === page && target.hash ? "ancora:" + target.hash.slice(1) : "pagina:" + name + (target.hash || "");
  }

  document.addEventListener("click", function (ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest("a, button, [data-track]") : null;
    if (!el || el.id === "menuBtn" || el.type === "submit") return;
    var name = label(el);
    if (name) send("clique", name);
  }, true);

  var form = document.getElementById("supportForm");
  if (form) form.addEventListener("submit", function () {
    var sel = form.querySelector("select[name=assunto]");
    send("clique", "suporte:enviar" + (sel && sel.value ? ":" + sel.value : ""));
  }, true);
})();
