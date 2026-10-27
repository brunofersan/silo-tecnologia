# Silo Tecnologia — site

Site estático do Silo IDE (HTML, CSS e JS puros), publicado pelo GitHub Pages.

## Para cada nova versão

Edite **apenas** `config.js`:

- `DOWNLOAD_URL`: link público do instalador (Google Drive com "Qualquer pessoa com o link" ou anexo de um GitHub Release). Vazio = botão desativado com aviso "em breve".
- `VERSION`, `INSTALLER_SIZE`, `RELEASE_DATE`.
- `SUPPORT_CONTACT`: e-mail ou página do suporte (nunca um e-mail pessoal).

Dica para Google Drive: troque `https://drive.google.com/file/d/ID/view?usp=sharing` por
`https://drive.google.com/uc?export=download&id=ID`. Para arquivos grandes o Drive mostra antes uma página de confirmação de vírus, o que é normal.

## Publicação

Settings › Pages › Build and deployment › Source: *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O site fica em https://brunofersan.github.io/silo-tecnologia/.

## Idiomas

Português no `index.html`; espanhol e inglês em `i18n.js` (mesmas chaves `data-i18n`).
