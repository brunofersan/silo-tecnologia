# Pedidos de download com aprovação

Os instaladores não têm mais link público no site. Quem quer baixar preenche nome, e-mail e sistema. O fluxo:

1. O site manda o pedido para um app da Web do Google Apps Script (`Code.gs`), que roda na conta Google do dono.
2. O script gera uma chave (ex.: `SILO-7KQ2-M9XD`), grava o pedido numa planilha e manda dois e-mails:
   - para o dono: chave, nome, e-mail, sistema e os botões **Aprovar** e **Recusar**;
   - para a pessoa: "recebemos seu pedido, chave tal".
3. O dono clica em **Aprovar**, que abre `aprovar.html` no site, e confirma. A pessoa recebe um e-mail com um link pessoal (`baixar.html?t=...`) que vale 7 dias (`LINK_DAYS`).
4. O link abre uma página do site com o(s) arquivo(s) do sistema escolhido (Windows: instalador e portátil).

As páginas de aprovar e baixar ficam no site e falam com o script por trás, sem login. Abrir a URL do script direto no navegador falha ("Não foi possível abrir o arquivo") quando o navegador tem mais de uma conta Google logada.

Recusar só marca o pedido como recusado na planilha, sem mandar e-mail. Aprovar de novo um pedido já aprovado gera um link novo e reenvia o e-mail.
Também dá para aprovar pelo editor do Apps Script: rode `aprovarChave("SILO-XXXX-XXXX")`.

## Configuração (uma vez)

### 1. Arquivos no Google Drive

Os links antigos (2.0.0) ficaram públicos no site e no histórico do Git. Para fechá-los:

1. Em `G:\Meu Drive\SiloIDE-downloads`, abra cada instalador no drive.google.com, clique em **Compartilhar** e mude **Acesso geral** para **Restrito**. Os links antigos param de funcionar.
2. Para cada arquivo, use **Fazer uma cópia**. A cópia tem um ID novo, que nunca foi publicado. Tire o "Cópia de" do nome.
3. Nas cópias, **Compartilhar › Acesso geral › Qualquer pessoa com o link** (necessário para quem não tem conta Google conseguir baixar).
4. Anote o ID de cada cópia: é o trecho entre `/d/` e `/view` do link.

Para uma versão nova do instalador, use **Gerenciar versões › Enviar nova versão** no arquivo do Drive: o ID continua o mesmo e nada precisa mudar no script.

### 2. Projeto no Apps Script

1. Abra https://script.google.com com a conta dona do Drive e crie um **Novo projeto** (ex.: "Silo IDE downloads").
2. Apague o conteúdo de `Código.gs` e cole o `Code.gs` desta pasta.
3. **Configurações do projeto** (engrenagem) › marque **Mostrar o arquivo de manifesto "appsscript.json" no editor**. Volte ao editor e troque o conteúdo de `appsscript.json` pelo desta pasta.
4. Ainda em **Configurações do projeto › Propriedades do script**, adicione:

   | Propriedade | Valor |
   |---|---|
   | `OWNER_EMAIL` | e-mail que recebe os pedidos (se ficar vazio, usa o da conta) |
   | `FILE_WIN` | ID da cópia do instalador do Windows (setup.exe) |
   | `FILE_WIN_PORTABLE` | ID da cópia da versão portátil (.zip) |
   | `FILE_MAC` | ID da cópia do .dmg |
   | `FILE_LINUX` | ID da cópia do .tar.gz |
   | `WEBAPP_URL` | URL do app da Web (`.../exec`), preenchida depois do passo 3; garante que os links dos e-mails usem a implantação certa |
   | `SITE_URL` | opcional, endereço do site (padrão `https://brunofersan.github.io/silo-tecnologia/`) |
   | `LINK_DAYS` | opcional, dias que o link vale (padrão 7) |
   | `MAX_PER_HOUR` | opcional, limite de pedidos por hora (padrão 30) |

   `SECRET` e `SHEET_ID` são criados sozinhos no próximo passo. Não apague nem compartilhe o `SECRET`: é ele que garante que só os botões do seu e-mail aprovam pedidos.
5. No editor, escolha a função `configurar` e clique em **Executar**. O Google pede autorização: **Revisar permissões**, escolha a conta, **Avançado › Acessar Silo IDE downloads (não seguro)** (é o seu próprio script) e **Permitir**. O registro de execução mostra o link da planilha "Pedidos de download do Silo IDE" e o nome de cada arquivo encontrado.

### 3. Publicar como app da Web

1. **Implantar › Nova implantação**, tipo **App da Web**.
2. **Executar como: Eu**. **Quem pode acessar: Qualquer pessoa**.
3. **Implantar** e copie a **URL do app da Web** (termina em `/exec`).
4. Coloque essa URL em `DOWNLOAD_REQUEST_URL` no `config.js` do site. Enquanto estiver vazia, os botões de download ficam desativados com o aviso "em breve".

Para trocar o código depois: **Implantar › Gerenciar implantações › editar (lápis) › Versão: Nova versão › Implantar**. A URL continua a mesma.

### 4. Testar

Peça um download pelo site com outro e-mail seu. Devem chegar o e-mail do pedido (para você), a confirmação (para a pessoa) e, depois de aprovar, o e-mail com o link.

## Limites

- Conta Google gratuita envia até 100 e-mails por dia pelo Apps Script. Cada pedido usa 2 e cada aprovação 1.
- O link pessoal expira, mas a página de download aponta para o arquivo do Drive. Quem já baixou pode repassar esse endereço. Se isso acontecer, faça uma nova cópia do arquivo, troque o ID na propriedade e deixe a cópia antiga como **Restrito**.
- A atualização automática da IDE usa outra pasta (`SiloIDE-updates`) e não muda: quem já tem a IDE continua recebendo as versões novas.
