# Silo IDE: notas de versão

**Versão disponível para download:** 1.0.5-RC (Windows 10 e 11, 64 bits)

| Arquivo | Tamanho | Uso |
|---|---|---|
| `SiloIDE-1.0.5-RC-setup.exe` | 226 MB | Instalador (não precisa de administrador) |
| `SiloIDE-1.0.5-RC-portable.zip` | 238 MB | Versão portátil: descompacte e rode `SiloIDE.bat` |

Quem já tem o Silo IDE instalado recebe as versões novas sozinho, ao abrir o programa ou em **Ajuda > Procurar atualizações**.

---

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
