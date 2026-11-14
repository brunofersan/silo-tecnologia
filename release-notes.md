# Silo IDE: notas de versão

**Versão disponível para download:** 3.0.0 (Windows 10 e 11, 64 bits; macOS 11 ou mais novo, chip Apple; Linux x64)

| Arquivo | Uso |
|---|---|
| `SiloIDE-3.0.0-setup.exe` | Instalador do Windows (não precisa de administrador) |
| `SiloIDE-3.0.0-portable.zip` | Versão portátil do Windows: descompacte e rode `SiloIDE.bat` |
| `SiloIDE-3.0.0-macos-arm64.dmg` | macOS: abra e arraste o Silo IDE para Aplicativos; na primeira vez, clique com o botão direito e escolha Abrir |
| `SiloIDE-3.0.0-linux-x64.tar.gz` | Linux com GTK 3: extraia com `tar xzf` e rode `./SiloIDE/silo-ide.sh`; o Java já vai dentro |

O download é direto, na página inicial. Quem já tem o Silo IDE instalado recebe as versões novas sozinho, ao abrir o programa ou em **Ajuda > Procurar atualizações**.

---

## 3.0.0

**Só a IDE no instalador, com plugins à parte e download livre.**

- **Instalador mais enxuto:** o instalador e a atualização trazem só a IDE, sem plugins de produto e sem aplicações web embarcadas. Quem já tem plugins continua com eles; plugins novos são instalados em **Plugins > Gerenciar plugins > Instalar de arquivo**.
- **Aplicações encontradas no computador:** os plugins procuram as aplicações de que precisam nas pastas comuns e nos webapps do Tomcat, sem atrasar a abertura, e deixam escolher a pasta em **Configurações > Aplicações**.
- **Plugins completos:** cada plugin traz os seus textos e a sua ajuda em português, espanhol e inglês.
- **Node 10 sob demanda:** projetos Angular 7 ou anteriores recebem o Node 10 na primeira vez que precisam, sem pesar no instalador.
- **Download livre:** os instaladores para Windows, macOS e Linux são baixados direto pelo site, sem pedido por e-mail.
- **macOS e Linux na 3.0.0:** o `.dmg` do Mac com chip Apple e o pacote `.tar.gz` do Linux x64 voltam ao site, já na versão 3.0.0.

---

Quem já tem o Silo IDE instalado recebe as versões novas sozinho, ao abrir o programa ou em **Ajuda > Procurar atualizações**. A 1.2.2, a 1.2.3, a 1.2.4, a 1.2.5, a 1.3.0, a 1.3.1, a 1.3.2, a 1.3.3, a 1.3.4, a 1.3.5, a 2.0.1, a 2.0.2, a 2.0.3, a 2.1.0, a 2.1.1, a 2.2.0, a 2.2.1, a 2.2.2, a 2.3.0, a 2.4.0, a 2.5.0, a 2.5.1, a 2.5.2, a 2.5.3, a 2.5.4, a 2.6.0 e a 2.6.1 chegaram só pela atualização automática, para quem já tinha o Silo IDE instalado.

**Para macOS (chip Apple, macOS 11 ou mais novo):** instalador `.dmg` da 3.0.0, na página inicial em **Baixar para Mac**. As versões seguintes chegam sozinhas pela atualização automática.

**Para Linux (x64, com GTK 3):** pacote `.tar.gz` da 3.0.0, na página inicial em **Baixar para Linux**. Extraia com `tar xzf` e rode `./SiloIDE/silo-ide.sh`; o Java já vai dentro. As versões seguintes chegam sozinhas pela atualização automática.

---

## 2.6.1

**Plugins embutidos em arquivos separados.**

- **Plugins embutidos em arquivos separados:** cada plugin que já vem com a IDE agora é um arquivo próprio, fora do programa principal. Eles chegam pela atualização automática e continuam ligados por padrão; nada muda no uso.

---

## 2.6.0

**Plugins, paleta de comandos, revisão de código por linha, filtro no log, backup das configurações e muito mais.**

- **Plugins:** loja de plugins da equipe e Plugins > Gerenciar para ligar e desligar, com dependências entre plugins. Nada muda para quem já usa: o que existia continua ligado.
- **Navegação e editor:** paleta de comandos (Ctrl+Shift+P), sessões de trabalho, recentes com prévia (Ctrl+E), Ctrl+G, minimapa, guias de indentação, parênteses coloridos, dobrar código, templates, modo Zen, zoom, macros, ferramentas de linhas, comparar seleções e anotações por linha.
- **SQL e banco:** formatador de PL/SQL, Ctrl+clique em tabela e coluna para ir à definição, quem usa a coluna, objetos inválidos do schema e aviso dos dependentes antes de compilar.
- **Git:** desfazer o último commit ainda não enviado e revisar pull requests (GitHub) e merge requests (GitLab) com comentário por linha.
- **Log do Tomcat:** filtro de texto e cores por tipo de linha; a detecção de erro ficou bem mais rápida.
- **Visual:** abas coloridas e fixadas, densidade, ícones de status, barra de status, fonte por linguagem, temas da comunidade e editor de temas.
- **Outros:** Notas e terminal com abas, relatório semanal, SonarQube no menu do projeto, importar atalhos de outras IDEs, backup completo das configurações com backup automático diário e Primeiros passos para quem acabou de instalar.

---

## 2.5.4

**Novo logo e janela aparecendo mais cedo.**

- **Novo logo.**
- **Janela aparece mais cedo:** o terminal embutido do bloco Log agora é montado depois de a janela abrir, e não antes; até lá o bloco mostra o console comum.

---

## 2.5.3

**Abertura mais leve com muitos projetos.**

- **Abertura mais leve:** a árvore do bloco Arquivos não é mais redesenhada inteira a cada projeto que termina de ler o status do Git, e o menu do botão direito de cada arquivo só é montado quando você clica.

---

## 2.5.2

**Menos memória e Ctrl+Shift+R rápido.**

- **Menos memória:** os dicionários do corretor ortográfico e as contagens de uso acima dos métodos ocupam uma fração do espaço de antes.
- **Ctrl+Shift+R rápido com muitos projetos:** a busca de arquivos não trava mais a janela a cada letra; com centenas de milhares de arquivos, cada busca caiu de cerca de 2 segundos para poucos milissegundos.
- **Listas de arquivos liberadas:** as listas da busca rápida e do filtro do bloco Arquivos são descartadas depois de um tempo sem uso e remontadas quando você volta a buscar.

---

## 2.5.1

**Barra de rolagem nos avisos longos e Diff que não fica mais vazio.**

- **Barra de rolagem nas mensagens longas:** quando a checagem antes do push (ou qualquer outro aviso) traz muitos erros, a lista fica numa caixa com barra de rolagem e os botões, como o de enviar mesmo assim, ficam sempre visíveis.
- **Diff não fica mais vazio:** ao sair da subaba Diff de um arquivo, abrir o Diff de outro e voltar, o diff do primeiro aparece de novo, sem precisar passar pela subaba Código.

---

## 2.5.0

**Notas, Arquivos e Log que abrem ao passar o mouse, e as opções de layout juntas num menu.**

- **Notas ao passar o mouse:** basta parar o mouse sobre a faixa 📝 Notas para o bloco abrir, sem clicar; tirando o mouse de cima, ele se recolhe sozinho.
- **Arquivos como painel recolhível:** em Exibir > Layout, o bloco de projetos e arquivos vira uma faixa na borda esquerda que abre por cima do editor ao passar o mouse e se recolhe ao sair, deixando o editor com o espaço todo. Arraste a borda para mudar a largura. Desligado, fica como sempre foi.
- **Log como painel recolhível no rodapé:** também em Exibir > Layout, o bloco Log vira uma faixa horizontal acima do rodapé que abre de baixo para cima ao passar o mouse.
- **Exibir > Layout:** painéis recolhíveis, blocos em altura total, ícones, abas e Restaurar layout padrão ficam juntos num submenu.

---

## 2.4.0

**IA completando ao digitar, histórico da área de transferência, corretor ortográfico, perguntas ao banco em português e outros bancos de dados.**

- **IA completando enquanto você digita:** ao parar no fim de uma linha, a sugestão aparece em cinza depois do cursor. Tab aceita, Ctrl+→ aceita só a próxima palavra, Esc descarta e Alt+\ pede na hora. Liga e desliga em Código > Assistente de IA.
- **Histórico da área de transferência:** Ctrl+Shift+V (ou Editar > Histórico da área de transferência) mostra os últimos 40 textos copiados para colar de novo.
- **Corretor ortográfico em português, inglês e espanhol:** sublinha erros de digitação em comentários, textos, arquivos .properties e .md e na mensagem de commit, com sugestões no botão direito e um dicionário só seu.
- **Perguntar ao banco em português:** no Data Source, o botão 💬 transforma a pergunta em SQL usando as tabelas e os comentários do esquema. O SQL vai para o editor para você conferir antes de rodar.
- **Outros bancos além do Oracle:** PostgreSQL, SQL Server, MySQL e MariaDB nas conexões e no Data Source. A IDE baixa o driver JDBC quando falta.

---

## 2.3.0

**Revisão de merge request do GitLab com IA, menus organizados, Notas e links no log.**

- **Comentários do merge request (GitLab):** botão direito no projeto > Git > **Comentários do MR (GitLab)** lista o que o revisor pediu na branch atual, com arquivo, linha e o código ao lado. Dois cliques abrem o arquivo na linha; dá para responder e marcar como resolvido sem sair da IDE.
- **Onde corrigir (IA):** a IA lê todos os comentários a resolver e descreve quais arquivos e linhas mudar e o quê.
- **Corrigir com IA:** a IA propõe a correção de um comentário e mostra o diff para você aceitar ou recusar. Nada é commitado sozinho.
- **Aviso de comentários:** o Log avisa quando o merge request da branch tem comentários a resolver (ao abrir a IDE, depois de cada push e de 10 em 10 minutos).
- **Menus do botão direito organizados:** as opções ficam em submenus por assunto. No projeto: Git, Maven, Gradle, Jira e tarefas, Código, Celular e Aplicação. Nos arquivos: Novo, Copiar/colar/excluir, Histórico e Mostrar em. No editor: Navegar e buscar, Banco de dados, Refatorar, Depuração e Histórico.
- **Gradle no botão direito:** build, clean build, test, assemble, tasks ou as tarefas que quiser, nos projetos Gradle.
- **Ticket da branch:** Jira e tarefas > **Abrir o ticket da branch no navegador**.
- **Notas:** a faixa 📝 na borda direita abre um bloco de notas por cima dos painéis, na altura toda da janela, com lista de tarefas. Clique na bolinha para concluir e o texto fica riscado; clicar fora recolhe. Fica salvo sozinho.
- **Links no Log e no Console:** Ctrl+clique num endereço, como o link para criar o merge request que o GitLab mostra depois do push, abre no navegador padrão.

---

## 2.2.2

**Árvore da aba Arquivos expandindo de verdade ao abrir a IDE.**

- **Pastas e grupos que não abriam:** logo depois que a IDE subia, a setinha virava mas os itens só apareciam depois de trocar de aba e voltar. A correção da 2.2.1 não resolvia todos os casos; agora a árvore abre na hora.

---

## 2.2.1

**Correções na aba Arquivos e excluir arquivo ou pasta.**

- **Árvore que não expandia:** quando a IDE abria já na aba Arquivos, as pastas não expandiam até trocar de aba e voltar. Agora expandem direto.
- **Excluir pela árvore:** botão direito > **Excluir** ou a tecla Delete no que está selecionado. A IDE pede confirmação, apaga a pasta com tudo o que tem dentro e, quando o Windows permite, manda para a Lixeira. Depois, a seleção vai para o item seguinte ou o anterior.

---

## 2.2.0

**Uma aba só para arquivos, Git e o que sobe no Tomcat.**

- **Abas Subir e Git dentro da aba Arquivos:** no painel Projetos ficou só a aba **Arquivos**. Ao lado do nome de cada projeto aparecem a caixa para subir no Tomcat, a branch e a quantidade de alterações, e o botão direito no projeto traz pull, push, commit, troca de branch e as outras opções do Git junto com as de arquivos.
- **Alterações e Subir no Tomcat em cada projeto:** dentro do projeto, o nó **Alterações** lista os arquivos alterados (clique para ver o diff; o botão direito tem stage, commit, reverter e excluir) e o nó **Subir no Tomcat** mostra o que está escolhido e deixa marcar forms, reports e telas. O F5 relê as pastas e o status do Git de uma vez.

---

## 2.1.1

**Correção: a IDE não trava mais com vários avisos ao abrir.**

- **A IDE não trava mais ao abrir com vários avisos:** quando dois avisos da inicialização (novidades, atualização, painel do dia, branch atrasada, tickets do Jira...) apareciam um logo depois do outro, a janela principal podia ficar sem responder no Windows, e era preciso fechar a IDE pelo Gerenciador de Tarefas. Agora os avisos aparecem um de cada vez, só depois que o anterior fecha, e clicar na janela principal com um aviso aberto traz o aviso para a frente em vez de travar.

---

## 2.1.0

**Painel do dia, checklist antes do commit, histórico local e comparação com o banco.**

- **Memória fiel ao Gerenciador de Tarefas:** o rodapé mostra a memória do processo inteiro do Silo IDE (ex.: **IDE 412 MB**), o mesmo número da coluna Memória do Gerenciador de Tarefas (no Linux e no Mac, a memória residente). Antes ele mostrava só o heap Java (ex.: 84 MB), bem menor do que o Windows mostra. O heap, o limite `-Xmx` e o restante continuam na dica; a barrinha segue medindo o heap e fica vermelha a partir de 85% do limite.
- **Avisos da inicialização do seu jeito:** em **Arquivo > Configurações > Inicialização** você liga ou desliga cada aviso que aparece sozinho ao abrir a IDE (novidades, resumo do dia, sugestão de pull na branch atrasada, tickets do Jira, atualização disponível, arquivos não salvos, tour, verificação do ambiente e JDK 8). O que for desligado continua disponível pelo menu.
- **Comparar com o banco:** num arquivo .sql de package, procedure, function, trigger, type ou view, **Alt+F9** (ou o botão ⇄ no rodapé do editor, ou o botão direito) abre o diff lado a lado entre o que está compilado no banco da conexão ativa e o arquivo do repositório. Só aparece o que muda de verdade no código: dono, aspas e GRANTs não contam. Dá para trazer um bloco do banco para o arquivo com » e salvar ali mesmo, e o rodapé diz quantos objetos estão iguais, diferentes ou faltando no banco.
- **☀ Painel do dia:** ao abrir a IDE (uma vez por dia) e em **Ajuda > Painel do dia**, uma janela mostra os seus **tickets em andamento** (e os outros abertos para você), as **horas lançadas hoje** no Jira por ticket, com o botão **Lançar horas do dia**, as **branches abertas** de cada repositório (com commits fora da branch pai, quantos sem push e há quantos dias foram mexidas) e os **pull requests pendentes** no GitHub (revisões pedidas a você e os seus PRs abertos). Clique no ticket ou no PR para abrir no navegador. Substitui o antigo Resumo do dia; liga e desliga pela própria janela ou em Configurações > Inicialização.
- **Atualizar a partir da branch pai:** o aviso de branch atrasada não pede mais para atualizar sempre da develop. A IDE descobre de qual branch a sua saiu (a branch usada ao criá-la pela IDE, o histórico local do Git ou a branch remota mais próxima) e sugere o pull dela, dizendo como chegou nessa conclusão. Se errar, clique com o botão direito no projeto > **🌳 Branch pai...** e informe o pai do repositório (ex.: `release/2.5`); em branco, volta a descobrir sozinha. O Resumo do dia e a Linha do tempo da branch usam o mesmo pai.
- **Checklist antes do commit:** na aba **Stage**, ao clicar em Commit, a IDE confere antes se ficou **conflito de merge** sem resolver (ou marcador `<<<<<<<` no código), **debug esquecido** (`System.out`, `printStackTrace()`, `console.log`, `debugger`, `DBMS_OUTPUT.PUT_LINE`, import sem uso...), **arquivo novo esquecido** fora do commit (na mesma pasta ou citado no código), **alteração deixada de fora** de um arquivo que está no commit, e **compila e roda os testes rápidos** das classes alteradas. Se tudo passar, o commit sai direto. Se aparecer algo, uma janela lista os pontos (duplo clique abre o arquivo na linha) e você escolhe entre **Adicionar os esquecidos ao commit**, **Voltar e corrigir** ou **Commitar assim mesmo**; durante a compilação dá para **Commitar sem esperar**. O botão **☑ Checklist** da aba Stage liga e desliga o checklist e a compilação e roda o checklist sem commitar.
- **🕘 Histórico local como no IntelliJ:** a cada salvamento a IDE guarda uma versão do arquivo, mesmo que ela nunca vá para o Git, e também quando o arquivo muda fora da IDE (pull, checkout) e antes de desfazer ou apagar pela aba Git. Botão direito no editor ou num arquivo da aba Arquivos > **Histórico local...** mostra as versões com data, hora e motivo; clique numa para ver o diff novo (palavras destacadas, mapa, **»** para trazer só um bloco e 💾 para aplicar) ou use **Restaurar esta versão**. Dá para comparar com a versão anterior ou entre duas versões (Ctrl+clique), buscar um texto em todas as versões, **marcar uma versão com nome** antes de um refactoring e, no botão direito de uma pasta, **recuperar arquivos apagados**. Em **⚙ Configurar histórico** você liga ou desliga e define dias (padrão 30), versões por arquivo (60) e espaço máximo (200 MB).

---

## 2.0.3

**Quanto de memória a IDE está usando, diff como no IntelliJ e mais ajuda com o Jira.**

- **Rodapé:** mostra a memória do próprio Silo IDE (ex.: **IDE 412 de 1536 MB**) com uma barrinha que fica vermelha a partir de 85% do limite. Passe o mouse para ver heap usado e reservado, limite, memória fora do heap e threads; clique para liberar memória na hora (o Log diz quanto foi liberado). Tomcat, Node e Gradle continuam na aba **Memória**.
- **Diff como no IntelliJ:** dentro de um bloco alterado, as palavras que mudaram ficam num tom mais forte. Entre o HEAD e o arquivo local, uma faixa liga cada bloco ao seu par, e o botão **»** reverte só aquele bloco. Ao lado da barra de rolagem, um mapa mostra todas as alterações do arquivo, e o botão **␣** ignora espaços em branco ao comparar.
- **Clonar e instalar dependência fora do Nexus:** quando a compilação falha porque falta uma biblioteca que não está no Nexus nem na máquina, a IDE procura o repositório Git do projeto dono (no `<scm>` dos poms do repositório local do Maven, na URL usada da última vez e ao lado dos projetos já clonados) e pergunta se pode clonar. Se houver tag ou branch da versão pedida, clona nela; depois adiciona o projeto à lista, roda `mvn install` e compila de novo.
- **Avisos dos seus tickets:** com a IDE aberta, ela confere os seus tickets do Jira de tempos em tempos (padrão: a cada 5 minutos, em Conexão > Atualizar) e avisa quando chega um ticket novo para você ou quando um status muda. A lista **👤 Meus tickets** se atualiza sozinha.
- **Começar um ticket:** ao abrir um ticket pela busca, a branch com o nome dele já fica pronta, é só teclar Enter. Ao criar a branch, o card passa para Em andamento (dá para desmarcar).
- **🕘 Horas do dia:** sugere quanto lançar em cada ticket a partir dos seus commits do dia em todos os projetos, mostra o que já foi lançado, distribui um total como `8h` e lança tudo de uma vez.

---

## 2.0.2

**Vários tickets do Jira de uma vez.**

- **Tarefas (Jira):** cole vários tickets ou links juntos, separados por vírgula, espaço ou quebra de linha (ex.: `FATURCONV-58967, FATURCONV-58970`), e todos aparecem na lista; a barra de status diz quais não foram encontrados. A busca também aceita uma JQL, como `sprint in openSprints() AND assignee = currentUser()`.
- **Meus tickets:** a janela de Tarefas sempre abre com os seus tickets abertos, mesmo com um ticket copiado (ele fica no campo de busca), e o botão **👤 Meus tickets** volta para a sua lista.

---

## 2.0.1

**Projetos clonados aparecem na lista e telas sem reiniciar o Tomcat.**

- **Telas sem reiniciar o Tomcat:** ao salvar um Task.Config, Struct, Manager.Config, ValueSet ou texto de uma tela, a IDE recarrega só o módulo daquela tela, e não o Tomcat inteiro. Depois é só abrir a tela de novo no navegador.
- **F5 e Atualizar** na lista de projetos também procuram projetos novos nas pastas do repositório, como um projeto clonado fora da IDE.
- **Projeto que voltou:** um projeto da lista cuja pasta foi apagada e clonada de novo volta a aparecer sem reiniciar a IDE.
- **Clonar projeto** adiciona os projetos que estão em subpastas do repositório e avisa quando o git não consegue clonar.
- **Avisos** mostram o texto inteiro, em várias linhas, em vez de cortar com reticências.
- **Dependência fora do Nexus:** quando a compilação para porque falta uma biblioteca que não está no Nexus nem na máquina, o Log mostra quem pede essa versão e o nome certo do projeto a clonar, sem perder tempo compilando de novo com `-U`.
- **Abrir e arrastar arquivos:** **Arquivo > Abrir arquivo...** abre `.txt`, `.md` e qualquer arquivo de texto, mesmo fora dos projetos; arquivos arrastados do Explorer para a janela (ou soltos no atalho da IDE) abrem no editor.
- **Jira:** na janela de Tarefas, mude o status do card e lance horas (`1h 30m`, `45m`, `1:30`...) com o dia e o que foi feito.
- **Temas antigos:** temas de extensões instalados antes da 2.0 passam sozinhos para as cores novas, sem reinstalar.

---

## 2.0.0

**Temas novos e nomes novos nos textos.**

- **Temas:** em **Exibir > Tema** há três opções novas: **Grafite** (escuro em cinza neutro), **Daltonismo** (azul e laranja no lugar de verde e vermelho, inclusive nas cores de diferenças do Git) e **Seguir o sistema** (muda sozinho entre claro e escuro junto com o Windows ou o macOS).
- **Nomes:** textos, ajuda e documentação passam a usar nomes neutros, sem nomes de produtos de terceiros.
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
