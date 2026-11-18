# Contador de visitas e cliques

O site conta visitas e cliques sem cookies e sem serviço de terceiros. O `contador.js` manda cada evento (com `navigator.sendBeacon`, sem atrasar a página) para um app da Web do Google Apps Script (`Code.gs`), que roda na sua conta Google e grava uma linha numa planilha sua.

## O que é gravado

Aba **Eventos**, uma linha por evento:

| Coluna | Exemplo |
|---|---|
| Data | 18/11/2026 09:30:12 (horário de Brasília) |
| Tipo | `visita` ou `clique` |
| Página | `index`, `releases`, `termos` |
| Alvo | só nos cliques: `download:windows`, `download:portatil`, `download:mac`, `download:linux`, `download:tabela`, `idioma:es`, `menu:faq`, `pagina:releases`, `apoie:pix`, `externo:github.com`, `suporte:enviar:...` |
| Idioma | `pt`, `es`, `en` |
| Origem | site de onde a pessoa veio (ex.: `www.google.com`) ou o `?utm_source=` do link |
| Dispositivo | `celular` ou `computador` |

Não grava nome, e-mail nem IP (o Apps Script nem recebe o IP). Uma visita conta uma vez por página em cada aba aberta (recarregar não soma). Quem tem "Não rastrear" ligado no navegador não é contado, e o contador não roda em `localhost`.

A aba **Resumo** já vem com totais, visitas por dia, cliques por botão, cliques por dia, visitas por página, por idioma, por origem e por dispositivo. Ela se atualiza sozinha.

Para medir um botão novo, basta pôr `data-track="nome"` no elemento. Os botões de download, idioma, menu, Apoie e links externos já são contados sem nada a mais.

Para saber de onde vêm as visitas de um link que você divulgar, acrescente `?utm_source=nome` (ex.: `https://brunofersan.github.io/silo-tecnologia/?utm_source=linkedin`).

## Configuração (uma vez)

1. Abra https://script.google.com e crie um **Novo projeto**. Dê o nome "Silo contador do site".
2. Apague o conteúdo de `Código.gs` e cole o `Code.gs` desta pasta.
3. **Configurações do projeto** (engrenagem) › marque **Mostrar o arquivo de manifesto "appsscript.json" no editor**. Volte ao editor e troque o conteúdo de `appsscript.json` pelo desta pasta.
4. No editor, escolha a função `configurar` e clique em **Executar**. O Google pede autorização: **Revisar permissões**, escolha a conta, **Avançado › Acessar Silo contador do site (não seguro)** (é o seu próprio script) e **Permitir**. O registro de execução mostra o link da planilha "Visitas e cliques do site Silo Tecnologia" (fica no seu Drive).
5. Opcional: escolha a função `testar` e clique em **Executar**. Aparece uma linha `visita` / `teste` na aba Eventos. Pode apagar essa linha depois.
6. **Implantar › Nova implantação**, tipo **App da Web**. **Executar como: Eu**. **Quem pode acessar: Qualquer pessoa**. **Implantar** e copie a **URL do app da Web** (termina em `/exec`).
7. Cole essa URL em `COUNTER_URL` no `config.js` do site, aumente o `?v=` do `config.js` nos HTML e publique. Enquanto `COUNTER_URL` estiver vazio, o contador fica desligado.

Para trocar o código depois: **Implantar › Gerenciar implantações › editar (lápis) › Versão: Nova versão › Implantar**. A URL continua a mesma.

## Limites

- Qualquer pessoa pode chamar a URL do app da Web, então os números são indicativos, não auditáveis. Para evitar abuso, o script aceita no máximo 300 eventos por minuto (propriedade de script `MAX_POR_MINUTO` muda o limite).
- Conta Google gratuita: até 20.000 execuções de URL por dia e 10 milhões de células por planilha (cerca de 1,4 milhão de eventos). Quando a aba Eventos ficar grande, copie as linhas antigas para outra planilha e apague-as dali.
- `configurar` pode ser rodado de novo sem perder dados: ele só recria a aba Resumo.
