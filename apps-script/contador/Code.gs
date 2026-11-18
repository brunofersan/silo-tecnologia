var TIPOS = { visita: true, clique: true };
var COLUNAS = ["Data", "Tipo", "Página", "Alvo", "Idioma", "Origem", "Dispositivo"];
var MAX_POR_MINUTO_PADRAO = 300;

function doPost(e) {
  try {
    var dados = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var tipo = limpar(dados.t, 10);
    if (!TIPOS[tipo]) return resposta("ignorado");
    if (!dentroDoLimite()) return resposta("limite");
    var linha = [
      new Date(),
      tipo,
      limpar(dados.p, 40) || "index",
      limpar(dados.a, 80),
      limpar(dados.l, 8),
      limpar(dados.o, 80),
      limpar(dados.d, 12)
    ];
    var trava = LockService.getScriptLock();
    if (!trava.tryLock(5000)) return resposta("ocupado");
    try {
      planilha().getSheetByName("Eventos").appendRow(linha);
    } finally {
      trava.releaseLock();
    }
    return resposta("ok");
  } catch (err) {
    return resposta("erro");
  }
}

function doGet() {
  return resposta("Contador do site Silo Tecnologia ativo.");
}

function limpar(valor, max) {
  var s = String(valor == null ? "" : valor).replace(/[\u0000-\u001f]/g, "").trim();
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s.slice(0, max);
}

function dentroDoLimite() {
  var props = PropertiesService.getScriptProperties();
  var max = parseInt(props.getProperty("MAX_POR_MINUTO"), 10) || MAX_POR_MINUTO_PADRAO;
  var cache = CacheService.getScriptCache();
  var chave = "min-" + Math.floor(Date.now() / 60000);
  var atual = parseInt(cache.get(chave), 10) || 0;
  if (atual >= max) return false;
  cache.put(chave, String(atual + 1), 120);
  return true;
}

function planilha() {
  var id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!id) throw new Error("Rode configurar() antes de implantar.");
  return SpreadsheetApp.openById(id);
}

function resposta(texto) {
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.TEXT);
}

function configurar() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  var ss = null;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create("Visitas e cliques do site Silo Tecnologia");
    props.setProperty("SHEET_ID", ss.getId());
  }
  var eventos = ss.getSheetByName("Eventos") || ss.insertSheet("Eventos");
  if (eventos.getLastRow() === 0) {
    eventos.appendRow(COLUNAS);
    eventos.setFrozenRows(1);
    eventos.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
    eventos.getRange("A:A").setNumberFormat("dd/MM/yyyy HH:mm:ss");
  }
  var resumo = ss.getSheetByName("Resumo") || ss.insertSheet("Resumo", 0);
  resumo.clear();
  var blocos = [
    ["Totais", null],
    ["Visitas por dia", "select toDate(A), count(A) where B = 'visita' group by toDate(A) order by toDate(A) desc label toDate(A) 'Dia', count(A) 'Visitas'"],
    ["Cliques", "select D, count(A) where B = 'clique' group by D order by count(A) desc label D 'Clique', count(A) 'Total'"],
    ["Cliques por dia", "select toDate(A), count(A) where B = 'clique' group by toDate(A) order by toDate(A) desc label toDate(A) 'Dia', count(A) 'Cliques'"],
    ["Visitas por página", "select C, count(A) where B = 'visita' group by C order by count(A) desc label C 'Página', count(A) 'Visitas'"],
    ["Visitas por idioma", "select E, count(A) where B = 'visita' group by E order by count(A) desc label E 'Idioma', count(A) 'Visitas'"],
    ["De onde vieram", "select F, count(A) where B = 'visita' and F <> '' group by F order by count(A) desc label F 'Origem', count(A) 'Visitas'"],
    ["Dispositivo", "select G, count(A) where B = 'visita' group by G order by count(A) desc label G 'Dispositivo', count(A) 'Visitas'"]
  ];
  blocos.forEach(function (b, i) {
    var col = 1 + i * 3;
    resumo.getRange(1, col).setValue(b[0]).setFontWeight("bold");
    if (b[1]) {
      resumo.getRange(2, col).setFormula('=QUERY(Eventos!A:G, "' + b[1] + '", 1)');
    } else {
      resumo.getRange(2, col, 4, 2).setValues([
        ["Visitas", ""], ["Cliques", ""], ["Visitas hoje", ""], ["Visitas em 7 dias", ""]
      ]);
      resumo.getRange(2, col + 1).setFormula('=COUNTIF(Eventos!B:B, "visita")');
      resumo.getRange(3, col + 1).setFormula('=COUNTIF(Eventos!B:B, "clique")');
      resumo.getRange(4, col + 1).setFormula('=COUNTIFS(Eventos!B:B, "visita", Eventos!A:A, ">=" & TODAY())');
      resumo.getRange(5, col + 1).setFormula('=COUNTIFS(Eventos!B:B, "visita", Eventos!A:A, ">=" & (TODAY() - 6))');
    }
  });
  resumo.setFrozenRows(1);
  var padrao = ss.getSheetByName("Página1") || ss.getSheetByName("Sheet1");
  if (padrao && ss.getSheets().length > 2) ss.deleteSheet(padrao);
  Logger.log("Planilha: " + ss.getUrl());
}

function testar() {
  doPost({ postData: { contents: JSON.stringify({ t: "visita", p: "teste", l: "pt", d: "computador" }) } });
  Logger.log("Linha de teste gravada em " + planilha().getUrl());
}
