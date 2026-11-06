# Silo IDE: notas de versão

**Versão disponível para download:** 2.0.0 (Windows 10 e 11, 64 bits)

| Arquivo | Tamanho | Uso |
|---|---|---|
| `SiloIDE-2.0.0-setup.exe` | 235 MB | Instalador (não precisa de administrador) |
| `SiloIDE-2.0.0-portable.zip` | 247 MB | Versão portátil: descompacte e rode `SiloIDE.bat` |

Quem já tem o Silo IDE instalado recebe as versões novas sozinho, ao abrir o programa ou em **Ajuda > Procurar atualizações**. A 1.2.2, a 1.2.3, a 1.2.4, a 1.2.5, a 1.3.0, a 1.3.1, a 1.3.2, a 1.3.3, a 1.3.4 e a 1.3.5 chegaram só pela atualização automática, para quem já tinha o Silo IDE instalado.

**Para macOS (chip Apple, macOS 11 ou mais novo):** instalador `.dmg` da 2.0.0 (138 MB), na página inicial em **Baixar para Mac**. As versões seguintes chegam sozinhas pela atualização automática.

**Para Linux (x64, com GTK 3):** pacote `.tar.gz` da 2.0.0 (143 MB), na página inicial em **Baixar para Linux**. Extraia com `tar xzf` e rode `./SiloIDE/silo-ide.sh`; o Java já vai dentro. Esse pacote não tem atualização automática.

---

## 2.0.0

**Temas novos e nomes novos nos textos.**

- **Temas:** em **Exibir > Tema** há três opções novas: **Grafite** (escuro em cinza neutro), **Daltonismo** (azul e laranja no lugar de verde e vermelho, inclusive nas cores de diferenças do Git) e **Seguir o sistema** (muda sozinho entre claro e escuro junto com o Windows ou o macOS).
- **Nomes:** textos, ajuda e documentação passam a falar em Módulos, Prontuário, Prescrição e SiloEditor.
- **Temas de extensões:** as cores do visual ganharam nomes novos. Temas de extensões instalados antes da 2.0 precisam ser instalados de novo em **Exibir > Extensões**.

---

## 1.3.5

**Uma janela só e busca de arquivos que aguenta código colado.**

- **Uma única IDE aberta:** ao abrir o Silo IDE de novo, a janela que já está aberta vem para a frente, em vez de abrir uma segunda IDE.
- **Busca de arquivos:** colar código no campo de busca (com chaves, parênteses ou colchetes) não gera mais erro. Só `*` e `?` valem como curingas; o resto é texto. A mesma regra vale para a busca de nomes no editor e para o filtro de arquivos da busca em texto.

---

## 1.3.4

**Silo IDE para macOS e Git Bash no Console.**

- **macOS (chip Apple):** instalador `.dmg` e atualização automática. A janela usa a barra de título nativa do Mac, sem os botões do Windows (os ícones de configurações, ajuda e idioma ficam mais à direita), e os diálogos usam a moldura do sistema.
- **Terminal no Console:** no macOS e no Linux a lista de shells ganhou o **Terminal**, que abre o zsh ou o bash do sistema na pasta escolhida.
- **Git Bash no Windows:** o Console também encontra o Git Bash no Git que acompanha a IDE, quando o Git do computador não é encontrado.

## 1.3.3

**Breakpoint que não para agora explica o motivo.**

- **Diagnóstico no Console:** ao conectar e a cada classe carregada, o depurador confere os breakpoints e escreve no Console (linhas `[debug]`) por que um deles não vai parar: classe que ainda não carregou no servidor, linha sem código, fonte diferente do que está rodando ou classe compilada sem informação de linhas.
- **Linha sem código:** um breakpoint numa continuação de expressão ou anotação passa para a próxima linha com código, até 5 linhas abaixo, e o Console avisa qual.
- **Falha ao conectar:** o motivo também aparece no Console, e não só na barra da aba Debug.

## 1.3.2

**Navegação entre o Java e o PL/SQL, catálogos de extensões e barra mais limpa.**

- **Java para PL/SQL:** Ctrl+clique (ou F3) no nome da package ou procedure dentro de uma string de chamada, como `prepareCall("{call PKG_PEDIDO.CALCULA(?)}")`, abre o fonte já na procedure ou função. Nas classes Java que só repassam a chamada para o banco, **Alt+F3** vai direto para o PL/SQL.
- **De onde vem o fonte:** dos projetos de banco abertos no Silo IDE e, se não estiver neles, do banco conectado no Data Source.
- **PL/SQL para Java:** num arquivo de package, F3 ou Ctrl+clique vai à definição e **Ctrl+Shift+G** (**Usos no Java**) lista todas as classes que chamam aquela package ou procedure.
- **Extensões:** o campo **Catálogo** virou uma lista com o catálogo oficial do Silo IDE (temas e snippets publicados aqui no site) e os temas e snippets do VS Code do Open VSX, convertidos na instalação. Também dá para instalar um `.vsix` baixado.
- **Visual:** **Aplicar configuração em todos** e **Abrir no navegador** ficaram só com o ícone; o nome aparece ao parar o mouse.

## 1.3.1

**Push confiável, ajuda com arquivo preso no Maven, Jira e mais atalhos no dia a dia.**

- **Commit e push:** no primeiro push de uma branch o Silo IDE roda `git push --set-upstream origin <branch>` sozinho, confere a resposta do git e se a branch chegou mesmo no remoto. Se falhar, mostra a mensagem do git e o motivo provável em vez de dar o push como feito.
- **Maven:** quando o `mvn clean` falha com "Failed to delete" porque um jar da pasta `target` está em uso (por exemplo pelo Tomcat ainda rodando a versão anterior), o Silo IDE mostra quem segura o arquivo, pergunta se pode parar o Tomcat e encerrar esses processos e roda o Maven de novo.
- **Stack trace:** no Log e no Console, Ctrl+clique numa linha `at pacote.Classe.metodo(Arquivo.java:42)` abre o arquivo do projeto na linha.
- **Trocar de branch:** com arquivos alterados, o Silo IDE pergunta antes se guarda num stash e troca, leva as alterações ou cancela, e oferece restaurar quando você volta.
- **Jira:** em **Tarefas**, cole o ticket ou o link ou busque por texto; o Silo IDE mostra o resumo e o status, cria a branch com o nome do ticket e já começa a mensagem do commit com a chave.
- **Blame da linha:** o rodapé mostra quem alterou por último a linha do cursor, quando e a mensagem do commit.
- **Atualização:** o aviso de versão nova mostra as novidades dela antes de instalar.
- **Visual:** ícones de configurações e ajuda do topo redesenhados, acompanhando o tema.

## 1.3.0

**Suporte a Kotlin e Android para apps mobile.**

- **Kotlin:** realce próprio, autocompletar com as funções, classes e constantes do projeto, os componentes e modifiers do Compose (o `import` entra sozinho) e os recursos `R.string`, `R.color`, `R.drawable`...
- **XML do Android:** layouts e manifesto sugerem views, atributos `android:`, valores como `match_parent` e os recursos `@string/`, `@color/` e `@drawable/` do projeto.
- **Navegação:** Ctrl+clique leva à declaração da função Kotlin ou do recurso no `strings.xml`, e Ctrl+O mostra a estrutura do arquivo Kotlin.

## 1.2.5

**Apps Spring Boot abrem pelo Tomcat mesmo quando ele roda em Java 8.**

- **Sem erro 500 de versão do Java:** com um projeto em Java 8 e um app Spring Boot selecionados juntos, abrir o app pelo endereço do Tomcat dava erro 500 (UnsupportedClassVersionError). O proxy que a IDE coloca no Tomcat agora é compilado para Java 8 e funciona em qualquer versão do Java.

## 1.2.4

**Iniciar o Tomcat confere o webapp antes de pular o build.**

- **Sem ClassNotFoundException por build incompleto:** ao subir o Tomcat, a IDE confere se os listeners, filtros e servlets do `web.xml` existem nas classes ou nos jars do `WEB-INF/lib`. Se faltar algum (build interrompido, feito pela metade ou com jars apagados), compila o projeto de novo em vez de pular o build, e o log diz qual classe falta e em qual pasta.

## 1.2.3

**Rodar no Android em um clique e salvar já atualiza o módulo publicado.**

- **Rodar no Android em um clique:** a IDE resolve o Java 17, o Android SDK e a plataforma do projeto, abre o emulador, compila, instala e abre o app, mostrando cada etapa.
- **Salvar e ver na hora:** salvar uma tela (ou outro `.xml`, `.properties`, `.js`) já atualiza o módulo publicado, sem publicar de novo.

## 1.2.2

**Simulador de celular, projetos em subpastas, Data Source mais compacto e mais 6 novidades.**

- **Simulador de celular:** projetos Flutter, Expo, React Native, Ionic e Compose Multiplatform rodam numa janela com iPhone, Pixel, Galaxy ou iPad, com girar, voltar e recarregar. O botão 📱 abre o Tomcat local no tamanho do celular.
- **Instalação em um clique:** o simulador instala o que falta (Android SDK, emulador, aparelho virtual, JDK 17, Node.js e Flutter) na pasta do usuário, sem Android Studio e sem administrador; o 🤖 roda o app no emulador do Android.
- **Projetos em subpastas:** escanear e adicionar acham os projetos com `pom.xml` ou Gradle dentro de outras pastas, com a profundidade escolhida para cada pasta raiz.
- **Data Source mais compacto:** barra só com ícones e o resto no menu 🧰.
- **INSERT, UPDATE e MERGE:** gerados no script a partir do resultado, como no SQL Developer, usando a chave primária da tabela.
- **Fixar e comparar resultados:** 📌 guarda o resultado numa aba e dois resultados fixados podem ser comparados lado a lado, com as diferenças destacadas.
- **Visualizar Markdown:** arquivos `.md` têm a aba Visualizar, com as cores do tema.
- **Iniciar, Depurar ou Publicar** num só combo com o botão ▶, e barra de progresso enquanto o Tomcat sobe.
- **Histórico de busca** na Busca e no Localizar, guardado entre reinícios.
- **Correções:** erro ao clicar no editor, margem de breakpoints sumindo em algumas resoluções, dicas piscando, paleta de Componentes sem tradução e logo sem nitidez.

## 1.2.1

**Correções: diff de arquivos grandes, scripts com BOM e relatórios de erro.**

- **Diff sem travar:** comparar arquivos grandes não estoura mais a memória nem congela a tela.
- **Scripts com BOM:** compilar e validar no banco funciona com scripts salvos com BOM (antes dava ORA-00911).
- **Relatórios de erro:** o envio automático por e-mail volta a funcionar e não se perde mais nas atualizações.

## 1.2.0

**Breakpoints com condição e logpoint, terminal de verdade no Console, depurador PL/SQL e mais 13 novidades.**

- **Breakpoints mais espertos:** condição, contagem de passagens, logpoint (escreve no Log sem parar) e breakpoint de exceção.
- **Valores na linha:** parado no depurador, o editor mostra o valor das variáveis ao fim de cada linha.
- **Nada se perde:** salvamento automático (Arquivo > Salvamento automático) e recuperação dos arquivos não salvos depois de uma queda.
- **Buscar ação** (`Ctrl+3`): qualquer comando dos menus pelo nome ou pelas iniciais.
- **Editor dividido** (`Ctrl+Alt+\`), **trilha pacote › classe › método** com cabeçalho fixo e **contagem de referências** em cada classe e método.
- **Revisão do diff pela IA:** 🔍 Revisar com IA no Stage / Commit aponta problemas antes do commit.
- **Rebase interativo visual** (botão direito no projeto): squash, fixup, reordenar, editar mensagem e descartar commits.
- **Data Source > 🧰:** painel de migrações Flyway e Liquibase e depurador PL/SQL.
- **Análise estática** (botão direito no projeto Maven): Checkstyle, PMD e SonarQube, com marcação no editor.
- **Terminal de verdade no Console:** cores, Tab, setas e programas interativos como `claude` e `vim`.
- **Correção:** Ctrl+C, Ctrl+X e Ctrl+V em todos os editores usam só texto puro e não dão mais erro no Java 25.

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
