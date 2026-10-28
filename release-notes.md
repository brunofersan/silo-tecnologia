# Silo IDE: notas de versão

**Versão disponível para download:** 1.1.0-RC (Windows 10 e 11, 64 bits)

| Arquivo | Tamanho | Uso |
|---|---|---|
| `SiloIDE-1.1.0-RC-setup.exe` | 226 MB | Instalador (não precisa de administrador) |
| `SiloIDE-1.1.0-RC-portable.zip` | 239 MB | Versão portátil: descompacte e rode `SiloIDE.bat` |

Quem já tem o Silo IDE instalado recebe as versões novas sozinho, ao abrir o programa ou em **Ajuda > Procurar atualizações**.

---

## 1.1.0-RC

**Renomear em todo o projeto, vários cursores, monitor de SQL e mais 7 novidades.**

- **Renomear em todo o projeto (Shift+F6):** classe, método ou campo em todos os arquivos do módulo, com prévia e escolha do que aplicar.
- **Histórico local:** botão direito no arquivo aberto mostra as versões salvas nos últimos 30 dias, com comparação lado a lado e restauração, mesmo fora do Git.
- **Stash e cherry-pick** no botão direito do projeto, junto com o painel **TODO e FIXME** com todas as pendências do código.
- **Marcadores:** Ctrl+Alt+B marca a linha, Ctrl+Alt+N e Ctrl+Alt+Shift+N andam entre eles e Ctrl+Alt+Shift+B lista todos.
- **Vários cursores:** Alt+clique, Alt+J para a próxima ocorrência e Alt+Shift+A para seleção em coluna.
- **Mensagem de commit pela IA:** o botão ✨ **Sugerir mensagem** escreve a mensagem a partir das mudanças preparadas.
- **Data Source > 🧰:** diagrama das tabelas com exportação em PNG, massa de dados de teste (CPF e CNPJ válidos) e monitor de SQL que avisa sobre consultas N+1 e lentas.
- **Arquivo faltando no classpath:** o Log diz qual arquivo de configuração falta e onde colocá-lo.
- **Desempenho:** mais rápido para digitar em arquivos grandes e com menos uso de memória no Log.

## 1.0.6-RC

**Assistente de IA, Docker, revisão de pull request, Linux e macOS e mais 20 novidades.**

- **Assistente de IA no editor:** explica erros, sugere correções, gera testes e responde perguntas sobre o código aberto, com a sua própria chave da Anthropic.
- **Comparar esquemas de banco:** compara tabelas, colunas, índices e PL/SQL de duas conexões e gera o script de diferença.
- **Docker Compose:** sobe, para, reinicia e derruba os serviços do projeto, com os logs, num clique.
- **Pull requests do GitHub dentro da IDE:** arquivos com diff, CI e conversa; comente, aprove ou peça mudanças sem sair do editor.
- **Gravação da depuração:** cada parada guarda pilha e variáveis num arquivo que o colega abre e percorre.
- **Profiler leve:** CPU por método e memória por classe da aplicação no ar, sem reiniciar.
- **Pareamento:** o colega acompanha seu editor pelo navegador, em tempo real.
- **Extensões:** temas e snippets de um catálogo ou de um arquivo `.zip`.
- **Linux e macOS:** pacote com Java embarcado.
- **Snippets e modelos da equipe:** um arquivo no projeto, versionado no Git, soma os snippets da equipe aos seus, com variáveis perguntadas na hora. Botão direito numa pasta > **Novo a partir de modelo** cria controller, service, DAO ou tela com o pacote certo.
- **Perfis de execução no WildFly:** a IDE cria o datasource Oracle e os módulos no `standalone.xml` do projeto e permite escolher outro arquivo de configuração.
- **Gerar teste JUnit:** cria a classe de teste com um teste por método público e mocks dos campos injetados (JUnit 5 ou 4 e Mockito).
- **Cobertura de testes no editor:** as linhas aparecem em verde (coberta), amarelo (parcial) e vermelho (sem teste), com o percentual do arquivo na barra de status.
- **Formatador e lint de SQL da equipe:** estilo do Formatar SQL, tamanho máximo de linha e regras próprias, avisadas ao salvar.
- **Painel de logs:** busca por nível, classe e horário nos logs antigos e alertas quando uma linha nova combina com um padrão.
- **Saúde das dependências:** versões mais novas no Maven Central e vulnerabilidades conhecidas, com a gravidade e a versão que corrige.
- **Tarefas do Jira, Azure Boards ou GitHub Issues:** lista seus cards, cria a branch pelo card e o commit já começa com a chave.
- **Canal de atualização:** Estável ou Beta, e **Voltar para a versão anterior** com um clique.
- **Perfil de equipe por link:** cada pessoa cola o link uma vez e as configurações da equipe chegam sozinhas.
- **Estatísticas de uso anônimas e opcionais**, com **Ver o que é enviado**.
- **Ajuda > O que mudou:** as notas de todas as versões, no idioma da IDE, com seletor de versão.
- **Correções:** detecção do JDK 8 sem erro quando não há JDK 8 instalado; blocos PL/SQL que começam com comentário voltam a rodar como PL/SQL; uma falha passageira ao ler uma senha guardada não a deixa mais vazia.

## 1.0.5-RC

**Instalador mais leve e ícone novo em todo lugar.**

- **Instalador 30% menor (226 MB):** componentes auxiliares que nem todos usam saíram do pacote, e o download ficou mais rápido.
- **Ícone novo na barra de tarefas e no menu Iniciar:** os atalhos fixados passam a mostrar a logo atual, sem a imagem antiga guardada pelo Windows.

## 1.0.4-RC

**Logo nova e cinco melhorias pedidas pelos usuários.**

- **Logo nova:** contorno de silo com o símbolo de prompt `>` num círculo em degradê verde-azulado, também na tela de abertura e no ícone.
- **Ajuda > Baixar WildFly:** baixa o WildFly 35.0.1, confere a integridade do arquivo e deixa tudo pronto para os projetos WAR.
- **Classe não encontrada no Tomcat da IDE:** quando um módulo dá `ClassNotFoundException`, a IDE lê a pilha de erro, descobre o projeto e coloca a dependência que falta no `pom.xml` dele.
- **Atalho das validações no rodapé:** um clique liga ou desliga as boas práticas e o Validador de banco de dados.
- **Tempo de cada módulo no build:** depois de um build com vários módulos, o Log mostra os mais lentos primeiro, com o tempo e a porcentagem de cada um.
- **Exportar e importar configurações:** em **Arquivo**, leve todas as suas configurações para outra máquina num arquivo `.siloide-config`, sem senhas nem tokens.

## 1.0.3-RC

**WildFly, validações configuráveis e correção automática de dependências.**

- **Suba todos os seus projetos juntos em um único servidor:** o novo lema do Silo IDE.
- **WildFly por projeto:** projetos WAR escolhem em **Configurar aplicação > Como subir**: **Processo próprio**, **Tomcat da IDE** ou **WildFly**. A escolha fica guardada por projeto, e a IDE gera o WAR e faz o deploy numa pasta separada para cada projeto, na porta 8180.
- **Novo modelo de projeto: Java web (WAR para WildFly)**, com Jakarta EE 10 e um servlet de exemplo.
- **Arquivo > Configurações > Validações:** liga e desliga as boas práticas de desenvolvimento e o **Validador de banco de dados**, com o endereço do validador.
- **Classe não encontrada:** quando o build falha com `package ... does not exist`, ou uma aplicação dá `ClassNotFoundException` ou `NoClassDefFoundError`, a IDE procura a classe no repositório Maven local e nos projetos clonados, adiciona a dependência no `pom.xml` e compila de novo. No editor, **Ctrl+1** sobre um `import` com erro faz o mesmo.
- **Log:** a barra de rolagem acompanha as últimas linhas. Se você sobe para ler, o Log fica parado até você voltar ao fim.

## 1.0.2-RC

**Relatórios por e-mail e Log mais fácil de usar.**

- **Relatórios de erro por e-mail já configurados no instalador:** um clique em **Ajuda > Reportar erro ou sugestão** envia o relatório com o diagnóstico.
- **Sem aviso desnecessário:** sem e-mail configurado, o aviso de registro do computador não aparece mais.
- **Selecionar texto no Log:** enquanto houver texto selecionado, as linhas novas esperam e a seleção não se perde.

## 1.0.1-RC

**Atualização automática.**

- **O Silo IDE se atualiza sozinho:** ao abrir, ele confere se há versão nova e baixa só o que mudou. Os pacotes são assinados digitalmente pela Silo Tecnologia, e o programa recusa qualquer pacote sem essa assinatura.

## 1.0.0-RC

**Primeira versão do Silo IDE: editor, Git, banco e servidores em um lugar.**

**Projetos e servidores**
- Lista de projetos por área, escolha do que subir e perfis de trabalho.
- Tomcat embutido com os módulos escolhidos, publicação sem cópia, porta de depuração e troca de classes a quente.
- Serviços Angular, Spring Boot, Gradle e Java (Maven) em paralelo ao Tomcat, cada um com o JDK que pede.
- Logs com filtros por origem, só problemas e agrupamento de erros repetidos.

**Editor**
- Java, TypeScript, HTML, SQL e XML, com compilação ao salvar, completar código, navegar, refatorar e dobras.
- Correções rápidas (**Ctrl+1**), organizar imports, formatar e dicas de parâmetros.
- Templates Angular com sugestões de componentes, atributos, pipes e avisos de membros inexistentes.
- Validação de XML e XVC ao salvar e boas práticas de desenvolvimento no código novo.
- Designer visual de telas e Task Outline, que alteram todos os arquivos da tela, com textos em todos os idiomas.

**Banco de dados**
- Console SQL com binds, plano de execução, comparação entre bancos, histórico e exportação para Excel.
- Blocos PL/SQL com SQLCODE, SQLERRM, a linha do erro e DBMS_OUTPUT.

**Git**
- Alterações, diff, stage e commit, branches, linha do tempo e conferência antes do push.

**Build**
- Maven com ordem entre projetos e resolução automática de dependências entre eles.
- Build só do que mudou, histórico de builds com aviso de lentidão e erro de compilação aberto na linha.

**Java**
- A IDE roda no Java 25, e cada projeto usa o Java 8 a 25 que declara.
- Instalação de JDKs (Temurin 8, 11, 17, 21 e 25) pelo próprio programa, com conferência de integridade.

**Novos projetos**
- **Arquivo > Novo projeto** cria projetos Java, Spring Boot, Python, Node, Vue, React e Angular e baixa as bibliotecas.

**Suporte**
- Saúde do ambiente, pacote de diagnóstico, detecção de travamentos e relatório de erros.
- Ajuda completa em português, espanhol e inglês, e um tour para quem está chegando.
- Temas Claro, Escuro e Alto contraste.
