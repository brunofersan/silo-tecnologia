# Silo Tecnologia — site

Site estático do Silo IDE (HTML, CSS e JS puros), publicado pelo GitHub Pages.

## Para cada nova versão

1. Em `config.js`, copie o primeiro bloco de `VERSIONS`, cole no topo e preencha versão, data e tamanhos. A primeira da lista é a versão atual. Os links dos instaladores não ficam no site: troque o arquivo no Drive com **Gerenciar versões** (o ID não muda) ou atualize os IDs nas propriedades do Apps Script.
2. Acrescente as novidades no topo de `release-notes.md` e rode `pip install markdown && python tools/build-releases.py` para gerar `releases.html`.
3. Aumente o `?v=` dos arquivos em `index.html` e em `tools/releases.template.html`, para o navegador não usar cópia antiga.

## Downloads com aprovação

Os botões de download abrem um pedido (nome, e-mail, sistema). O dono aprova pelo e-mail e a pessoa recebe o link. O backend é um Google Apps Script em `apps-script/`; a configuração está em [apps-script/LEIAME.md](apps-script/LEIAME.md). `DOWNLOAD_REQUEST_URL` no `config.js` é a URL do app da Web (vazio = downloads desativados).

`FORM_ACCESS_KEY` é a chave do Web3Forms do formulário de suporte (as mensagens chegam no e-mail cadastrado lá, que não aparece no site).

## Publicação

Settings › Pages › Build and deployment › Source: *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O site fica em https://brunofersan.github.io/silo-tecnologia/.

## Idiomas

Português no `index.html`; espanhol e inglês em `i18n.js` (mesmas chaves `data-i18n`).

