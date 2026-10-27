// =====================================================================
//  CONFIGURAÇÃO DO SITE — único lugar a editar para cada nova versão.
//
//  VERSIONS: a primeira da lista é a versão atual (botões principais).
//  Todas aparecem na tabela "Versões". Para uma versão nova, copie o bloco,
//  cole no topo da lista e troque os dados e os links do Google Drive
//  ("Qualquer pessoa com o link"). Link vazio = "em breve".
//  As notas ficam em release-notes.md (rode tools/build-releases.py).
// =====================================================================
window.SILO_CONFIG = {
  VERSIONS: [
    {
      version: "1.0.6-RC",
      date: "2026-10-27",
      installerSize: "226 MB",
      portableSize: "239 MB",
      installerUrl: "",
      portableUrl: ""
    },
    {
      version: "1.0.5-RC",
      date: "2026-10-27",
      installerSize: "226 MB",
      portableSize: "238 MB",
      installerUrl: "https://drive.google.com/file/d/1tyBJPprJOJ64N-0jrOOA9QyTY1RD1Il_/view?usp=sharing",
      portableUrl: "https://drive.google.com/file/d/1WyRELNoar-D-NmkeKqglmx1kP3D92JRE/view?usp=sharing"
    }
  ],
  // Chave de acesso do Web3Forms (https://web3forms.com). O formulário de
  // suporte envia para o e-mail cadastrado lá, sem mostrar o e-mail no site.
  // Vazio = formulário desativado com aviso "em breve".
  FORM_ACCESS_KEY: "fac82c97-df12-438f-8bdb-498e6c03acbd"
};
