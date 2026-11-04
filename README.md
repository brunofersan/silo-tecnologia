# Silo Tecnologia — site

Site estático do Silo IDE (HTML, CSS e JS puros), publicado pelo GitHub Pages.

## Para cada nova versão

1. Em `config.js`, copie o primeiro bloco de `VERSIONS`, cole no topo e preencha versão, data, tamanhos e os links do Google Drive ("Qualquer pessoa com o link"). A primeira da lista é a versão atual.
2. Acrescente as novidades no topo de `release-notes.md` e rode `pip install markdown && python tools/build-releases.py` para gerar `releases.html`.
3. Aumente o `?v=` dos arquivos em `index.html` e em `tools/releases.template.html`, para o navegador não usar cópia antiga.

`FORM_ACCESS_KEY` é a chave do Web3Forms do formulário de suporte (as mensagens chegam no e-mail cadastrado lá, que não aparece no site).

## Publicação

Settings › Pages › Build and deployment › Source: *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O site fica em https://brunofersan.github.io/silo-tecnologia/.

## Idiomas

Português no `index.html`; espanhol e inglês em `i18n.js` (mesmas chaves `data-i18n`).

## Tomadinha

`tomadinha.html` é a página "O que vem por aí" da Tomadinha, aberta pelo link do card em Produtos. Estilo próprio
(cores da marca da Tomadinha) e textos em espanhol e inglês em `tomadinha.js`. O botão "Quero ser avisado" abre o
formulário com o assunto Tomadinha (`index.html?assunto=Tomadinha#contato`). Quando o app for lançado, troque o
selo "Lançamento em breve" e os botões pelos links das lojas.
