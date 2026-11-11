// Pedidos de download do Silo IDE com aprovação manual.
// Roda no Google Apps Script da conta do dono (veja apps-script/LEIAME.md).
// Nada secreto fica neste arquivo: e-mail do dono, IDs dos arquivos no Drive,
// segredo e planilha ficam nas Propriedades do script.

var PLATFORMS = {
  win: { files: ["FILE_WIN", "FILE_WIN_PORTABLE"], label: { pt: "Windows", es: "Windows", en: "Windows" } },
  mac: { files: ["FILE_MAC"], label: { pt: "macOS (Apple Silicon)", es: "macOS (Apple Silicon)", en: "macOS (Apple Silicon)" } },
  linux: { files: ["FILE_LINUX"], label: { pt: "Linux x64", es: "Linux x64", en: "Linux x64" } }
};
var FILE_LABEL = {
  FILE_WIN: { pt: "Instalador para Windows", es: "Instalador para Windows", en: "Windows installer" },
  FILE_WIN_PORTABLE: { pt: "Versão portátil para Windows", es: "Versión portátil para Windows", en: "Windows portable version" },
  FILE_MAC: { pt: "Instalador para Mac (.dmg)", es: "Instalador para Mac (.dmg)", en: "Mac installer (.dmg)" },
  FILE_LINUX: { pt: "Pacote para Linux (.tar.gz)", es: "Paquete para Linux (.tar.gz)", en: "Linux package (.tar.gz)" }
};
var HEADERS = ["Chave", "Pedido em", "Nome", "E-mail", "Sistema", "Idioma", "Status", "Decidido em", "Token", "Link vale até", "Downloads", "Último download"];
var COL = { key: 1, at: 2, name: 3, email: 4, platform: 5, lang: 6, status: 7, decided: 8, token: 9, expires: 10, downloads: 11, lastDl: 12 };
var STATUS = { pending: "pendente", approved: "aprovado", denied: "recusado" };

var TEXT = {
  pt: {
    gotSubject: "Silo IDE: recebemos seu pedido de download",
    got: "Olá, {name}.\n\nRecebemos seu pedido de download do Silo IDE para {platform}. A chave do pedido é {key}.\n\nAssim que o pedido for aprovado, você recebe neste e-mail o link para baixar.\n\nSilo Tecnologia",
    okSubject: "Silo IDE: seu download foi liberado",
    ok: "Olá, {name}.\n\nSeu pedido {key} foi aprovado. Use o link abaixo para baixar o Silo IDE para {platform}:\n\n{link}\n\nO link vale até {until} e é pessoal. Depois de instalar, as próximas versões chegam pela atualização automática da IDE.\n\nSilo Tecnologia",
    pageTitle: "Download do Silo IDE",
    pageReady: "Olá, {name}. Escolha o arquivo para baixar:",
    pageExpired: "Este link expirou. Peça o download de novo pelo site.",
    pageInvalid: "Link inválido. Confira se copiou o endereço inteiro do e-mail.",
    pageMissing: "O arquivo ainda não está disponível. Tente de novo mais tarde.",
    pageHint: "Se o Google Drive avisar que não consegue verificar vírus em arquivos grandes, clique em Baixar assim mesmo."
  },
  es: {
    gotSubject: "Silo IDE: recibimos tu solicitud de descarga",
    got: "Hola, {name}.\n\nRecibimos tu solicitud de descarga de Silo IDE para {platform}. La clave de la solicitud es {key}.\n\nEn cuanto se apruebe, recibirás en este correo el enlace de descarga.\n\nSilo Tecnologia",
    okSubject: "Silo IDE: tu descarga está disponible",
    ok: "Hola, {name}.\n\nTu solicitud {key} fue aprobada. Usa el enlace de abajo para descargar Silo IDE para {platform}:\n\n{link}\n\nEl enlace es válido hasta el {until} y es personal. Después de instalar, las próximas versiones llegan por la actualización automática del IDE.\n\nSilo Tecnologia",
    pageTitle: "Descarga de Silo IDE",
    pageReady: "Hola, {name}. Elige el archivo para descargar:",
    pageExpired: "Este enlace expiró. Solicita la descarga de nuevo en el sitio.",
    pageInvalid: "Enlace no válido. Verifica que copiaste la dirección completa del correo.",
    pageMissing: "El archivo aún no está disponible. Inténtalo de nuevo más tarde.",
    pageHint: "Si Google Drive avisa que no puede analizar virus en archivos grandes, haz clic en Descargar de todos modos."
  },
  en: {
    gotSubject: "Silo IDE: we received your download request",
    got: "Hello, {name}.\n\nWe received your request to download Silo IDE for {platform}. Your request key is {key}.\n\nAs soon as it is approved, you will get the download link at this e-mail address.\n\nSilo Tecnologia",
    okSubject: "Silo IDE: your download is ready",
    ok: "Hello, {name}.\n\nYour request {key} was approved. Use the link below to download Silo IDE for {platform}:\n\n{link}\n\nThe link is valid until {until} and is personal. After installing, new versions arrive through the IDE's automatic update.\n\nSilo Tecnologia",
    pageTitle: "Silo IDE download",
    pageReady: "Hello, {name}. Choose the file to download:",
    pageExpired: "This link has expired. Please request the download again on the website.",
    pageInvalid: "Invalid link. Check that you copied the whole address from the e-mail.",
    pageMissing: "The file is not available yet. Please try again later.",
    pageHint: "If Google Drive says it can't scan large files for viruses, click Download anyway."
  }
};

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    return json_(createRequest_(data));
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server" });
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  try {
    if (p.acao === "baixar") return downloadPage_(p.t || "");
    if (p.acao === "aprovar" || p.acao === "recusar") return decisionPage_(p);
    return page_("Silo IDE", "<p>Serviço de pedidos de download do Silo IDE.</p>");
  } catch (err) {
    console.error(err);
    return page_("Silo IDE", "<p>Erro: " + esc_(String(err.message || err)) + "</p>");
  }
}

function createRequest_(data) {
  if (data.site) return { ok: true, key: "" };
  var name = clean_(data.nome, 120);
  var email = clean_(data.email, 160).toLowerCase();
  var platform = String(data.sistema || "");
  var lang = TEXT[data.idioma] ? data.idioma : "pt";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !PLATFORMS[platform]) return { ok: false, error: "invalid" };

  var cache = CacheService.getScriptCache();
  var recent = cache.get("req:" + email + ":" + platform);
  if (recent) return { ok: true, key: recent, repeated: true };
  var hourKey = "hour:" + Utilities.formatDate(new Date(), "UTC", "yyyyMMddHH");
  var hourCount = Number(cache.get(hourKey) || 0);
  if (hourCount >= Number(prop_("MAX_PER_HOUR", "30"))) return { ok: false, error: "busy" };
  cache.put(hourKey, String(hourCount + 1), 3600);

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var key, previous;
  try {
    var sheet = sheet_();
    previous = history_(sheet, email);
    key = newKey_(sheet);
    sheet.appendRow([key, new Date(), name, email, platform, lang, STATUS.pending, "", "", "", 0, ""]);
  } finally {
    lock.releaseLock();
  }
  cache.put("req:" + email + ":" + platform, key, 600);

  notifyOwner_(key, name, email, platform, lang, previous);
  var t = TEXT[lang];
  var vars = { name: name, key: key, platform: PLATFORMS[platform].label[lang] };
  MailApp.sendEmail({ to: email, subject: t.gotSubject, body: fill_(t.got, vars), name: "Silo Tecnologia", replyTo: owner_() });
  return { ok: true, key: key };
}

function notifyOwner_(key, name, email, platform, lang, previous) {
  var base = execUrl_();
  var approve = base + "?acao=aprovar&chave=" + encodeURIComponent(key) + "&sig=" + sign_("aprovar:" + key);
  var deny = base + "?acao=recusar&chave=" + encodeURIComponent(key) + "&sig=" + sign_("recusar:" + key);
  var plat = PLATFORMS[platform].label.pt;
  var prevText = previous.total ? previous.total + " pedido(s) anterior(es) deste e-mail, " + previous.approved + " aprovado(s)." : "Primeiro pedido deste e-mail.";
  var body = "Novo pedido de download do Silo IDE\n\n" +
    "Chave: " + key + "\nNome: " + name + "\nE-mail: " + email + "\nSistema: " + plat + "\nIdioma: " + lang + "\n" + prevText + "\n\n" +
    "Aprovar: " + approve + "\n\nRecusar: " + deny + "\n";
  var html = "<p>Novo pedido de download do Silo IDE</p><table cellpadding='4'>" +
    "<tr><td><b>Chave</b></td><td><code>" + esc_(key) + "</code></td></tr>" +
    "<tr><td><b>Nome</b></td><td>" + esc_(name) + "</td></tr>" +
    "<tr><td><b>E-mail</b></td><td>" + esc_(email) + "</td></tr>" +
    "<tr><td><b>Sistema</b></td><td>" + esc_(plat) + "</td></tr>" +
    "<tr><td><b>Idioma</b></td><td>" + esc_(lang) + "</td></tr></table>" +
    "<p>" + esc_(prevText) + "</p>" +
    "<p><a href='" + approve + "' style='background:#14918f;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold'>Aprovar</a>" +
    " &nbsp; <a href='" + deny + "' style='color:#b91c1c'>Recusar</a></p>" +
    "<p style='color:#666'>Os botões abrem uma página de confirmação. Os pedidos ficam na planilha <a href='" + sheet_().getParent().getUrl() + "'>Pedidos de download do Silo IDE</a>.</p>";
  MailApp.sendEmail({ to: owner_(), subject: "Pedido de download " + key + ": " + name + " (" + plat + ")", body: body, htmlBody: html, name: "Site Silo Tecnologia", replyTo: email });
}

function decisionPage_(p) {
  var action = p.acao;
  var key = String(p.chave || "");
  if (!key || !safeEquals_(String(p.sig || ""), sign_(action + ":" + key))) return page_("Silo IDE", "<p>Link de aprovação inválido.</p>");
  var row = findRow_(key);
  if (!row) return page_("Silo IDE", "<p>Pedido " + esc_(key) + " não encontrado.</p>");
  var info = row.values;
  var summary = "<p><b>" + esc_(key) + "</b> · " + esc_(info[COL.name - 1]) + " · " + esc_(info[COL.email - 1]) + " · " + esc_(PLATFORMS[info[COL.platform - 1]] ? PLATFORMS[info[COL.platform - 1]].label.pt : info[COL.platform - 1]) + "</p>";
  var current = info[COL.status - 1];
  if (p.ok !== "1") {
    var verb = action === "aprovar" ? "Aprovar" : "Recusar";
    var note = current !== STATUS.pending ? "<p>Status atual: " + esc_(current) + ".</p>" : "";
    var url = execUrl_() + "?acao=" + action + "&chave=" + encodeURIComponent(key) + "&sig=" + encodeURIComponent(p.sig) + "&ok=1";
    return page_(verb + " pedido", summary + note + "<p><a class='btn' target='_top' href='" + url + "'>" + verb + " este pedido</a></p>");
  }
  if (action === "aprovar") {
    var result = approve_(key);
    return page_("Pedido aprovado", summary + "<p>Aprovado. O link foi enviado para " + esc_(result.email) + " e vale até " + esc_(result.until) + ".</p>");
  }
  deny_(key);
  return page_("Pedido recusado", summary + "<p>Recusado. Nenhum e-mail foi enviado para a pessoa.</p>");
}

function approve_(key) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  var row, token, expires;
  try {
    row = findRow_(key);
    if (!row) throw new Error("Pedido " + key + " não encontrado.");
    token = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
    expires = new Date(Date.now() + Number(prop_("LINK_DAYS", "7")) * 86400000);
    var s = row.sheet;
    s.getRange(row.index, COL.status).setValue(STATUS.approved);
    s.getRange(row.index, COL.decided).setValue(new Date());
    s.getRange(row.index, COL.token).setValue(token);
    s.getRange(row.index, COL.expires).setValue(expires);
  } finally {
    lock.releaseLock();
  }
  var v = row.values;
  var lang = TEXT[v[COL.lang - 1]] ? v[COL.lang - 1] : "pt";
  var t = TEXT[lang];
  var until = formatDate_(expires, lang);
  var link = execUrl_() + "?acao=baixar&t=" + token;
  var vars = { name: v[COL.name - 1], key: key, platform: PLATFORMS[v[COL.platform - 1]].label[lang], link: link, until: until };
  MailApp.sendEmail({ to: v[COL.email - 1], subject: t.okSubject, body: fill_(t.ok, vars), name: "Silo Tecnologia", replyTo: owner_() });
  return { email: v[COL.email - 1], until: formatDate_(expires, "pt") };
}

function deny_(key) {
  var row = findRow_(key);
  if (!row) return;
  row.sheet.getRange(row.index, COL.status).setValue(STATUS.denied);
  row.sheet.getRange(row.index, COL.decided).setValue(new Date());
  row.sheet.getRange(row.index, COL.token).setValue("");
  row.sheet.getRange(row.index, COL.expires).setValue("");
}

function downloadPage_(token) {
  token = String(token);
  var row = /^[a-f0-9]{64}$/.test(token) ? findRow_(token, COL.token) : null;
  if (!row || row.values[COL.status - 1] !== STATUS.approved) return page_(TEXT.pt.pageTitle, "<p>" + TEXT.pt.pageInvalid + "</p><p>" + TEXT.es.pageInvalid + "</p><p>" + TEXT.en.pageInvalid + "</p>");
  var v = row.values;
  var lang = TEXT[v[COL.lang - 1]] ? v[COL.lang - 1] : "pt";
  var t = TEXT[lang];
  if (new Date(v[COL.expires - 1]).getTime() < Date.now()) return page_(t.pageTitle, "<p>" + esc_(t.pageExpired) + "</p>");
  var links = PLATFORMS[v[COL.platform - 1]].files.map(function (k) {
    var id = prop_(k, "").trim();
    return id ? "<p><a class='btn' target='_blank' rel='noopener' href='https://drive.google.com/uc?export=download&id=" + encodeURIComponent(id) + "'>" + esc_(FILE_LABEL[k][lang]) + "</a></p>" : "";
  }).join("");
  if (!links) return page_(t.pageTitle, "<p>" + esc_(t.pageMissing) + "</p>");
  row.sheet.getRange(row.index, COL.downloads).setValue(Number(v[COL.downloads - 1] || 0) + 1);
  row.sheet.getRange(row.index, COL.lastDl).setValue(new Date());
  return page_(t.pageTitle, "<p>" + esc_(fill_(t.pageReady, { name: v[COL.name - 1] })) + "</p>" + links + "<p class='muted'>" + esc_(t.pageHint) + "</p>");
}

function configurar() {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty("SECRET")) props.setProperty("SECRET", Utilities.getUuid() + Utilities.getUuid());
  if (!props.getProperty("OWNER_EMAIL")) props.setProperty("OWNER_EMAIL", Session.getEffectiveUser().getEmail());
  var sheet = sheet_();
  console.log("Planilha: " + sheet.getParent().getUrl());
  console.log("E-mail que recebe os pedidos: " + owner_());
  ["FILE_WIN", "FILE_WIN_PORTABLE", "FILE_MAC", "FILE_LINUX"].forEach(function (k) {
    var id = (props.getProperty(k) || "").trim();
    if (!id) { console.log(k + ": vazio"); return; }
    try { console.log(k + ": " + DriveApp.getFileById(id).getName()); } catch (err) { console.log(k + ": ID não encontrado no seu Drive (" + id + ")"); }
  });
  try { console.log("URL do app da Web: " + execUrl_()); } catch (err) { console.log("Implante como app da Web e rode configurar() de novo para ver a URL."); }
}

function aprovarChave(key) {
  return approve_(String(key).trim().toUpperCase());
}

function sheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  var ss = id ? SpreadsheetApp.openById(id) : null;
  if (!ss) {
    ss = SpreadsheetApp.create("Pedidos de download do Silo IDE");
    props.setProperty("SHEET_ID", ss.getId());
  }
  var sheet = ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setName("Pedidos");
  }
  return sheet;
}

function findRow_(value, col) {
  col = col || COL.key;
  var sheet = sheet_();
  var last = sheet.getLastRow();
  if (last < 2) return null;
  var values = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (String(values[i][col - 1]) === value) return { sheet: sheet, index: i + 2, values: values[i] };
  }
  return null;
}

function history_(sheet, email) {
  var last = sheet.getLastRow();
  var out = { total: 0, approved: 0 };
  if (last < 2) return out;
  sheet.getRange(2, COL.email, last - 1, COL.status - COL.email + 1).getValues().forEach(function (r) {
    if (String(r[0]).toLowerCase() === email) {
      out.total++;
      if (r[COL.status - COL.email] === STATUS.approved) out.approved++;
    }
  });
  return out;
}

function newKey_(sheet) {
  var alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var existing = {};
  var last = sheet.getLastRow();
  if (last >= 2) sheet.getRange(2, COL.key, last - 1, 1).getValues().forEach(function (r) { existing[r[0]] = true; });
  for (;;) {
    var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid());
    var s = "";
    for (var i = 0; i < 8; i++) s += alphabet.charAt((bytes[i] + 256) % alphabet.length);
    var key = "SILO-" + s.slice(0, 4) + "-" + s.slice(4);
    if (!existing[key]) return key;
  }
}

function sign_(text) {
  var raw = Utilities.computeHmacSha256Signature(text, prop_("SECRET", ""));
  return Utilities.base64EncodeWebSafe(raw).replace(/=+$/, "");
}

function safeEquals_(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function prop_(name, fallback) {
  var v = PropertiesService.getScriptProperties().getProperty(name);
  return v === null || v === undefined || v === "" ? fallback : v;
}

function owner_() {
  var o = prop_("OWNER_EMAIL", "");
  if (!o) throw new Error("Defina OWNER_EMAIL nas propriedades do script.");
  return o;
}

function execUrl_() {
  var u = prop_("WEBAPP_URL", "") || ScriptApp.getService().getUrl();
  if (!u) throw new Error("O script ainda não foi implantado como app da Web.");
  return u.replace(/\/dev$/, "/exec");
}

function formatDate_(d, lang) {
  var tz = Session.getScriptTimeZone() || "America/Sao_Paulo";
  return Utilities.formatDate(d, tz, lang === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy");
}

function clean_(v, max) {
  return String(v || "").replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function fill_(text, vars) {
  return text.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] === undefined ? "" : String(vars[k]); });
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function page_(title, inner) {
  var html = "<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>" +
    "<style>body{font:16px/1.6 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:40px auto;padding:0 16px;color:#0f172a;background:#fff}" +
    "h1{font-size:1.4rem}.btn{display:inline-block;background:#14918f;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600}" +
    ".muted{color:#5b6b82;font-size:.9rem}@media (prefers-color-scheme:dark){body{background:#0b1220;color:#e6edf7}.muted{color:#93a3bb}}</style></head>" +
    "<body><h1>" + esc_(title) + "</h1>" + inner + "</body></html>";
  return HtmlService.createHtmlOutput(html).setTitle(title).addMetaTag("viewport", "width=device-width, initial-scale=1");
}
