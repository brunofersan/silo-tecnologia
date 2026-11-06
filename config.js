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
  // Instalador do macOS (Apple Silicon), independente da lista de versões do Windows.
  // url vazio = o botão "Baixar para Mac" fica escondido.
  MAC: {
    version: "2.0.0",
    date: "2026-11-06",
    size: "139 MB",
    url: "https://drive.google.com/file/d/1H6_TBzAW7IjGo9a6QI4avdpQK3GQ3gfQ/view?usp=sharing"
  },
  VERSIONS: [
    {
      version: "1.2.1",
      date: "2026-11-03",
      installerSize: "234 MB",
      portableSize: "247 MB",
      installerUrl: "https://drive.google.com/file/d/155BmsRGha7JFKbtG2jTU_df5Unx0qtHT/view?usp=sharing",
      portableUrl: "https://drive.google.com/file/d/1qWY8Uj-5SMynPHFFqFX9GylEEHKaLdJe/view?usp=sharing"
    }
  ],
  // Chave de acesso do Web3Forms (https://web3forms.com). O formulário de
  // suporte envia para o e-mail cadastrado lá, sem mostrar o e-mail no site.
  // Vazio = formulário desativado com aviso "em breve".
  FORM_ACCESS_KEY: "fac82c97-df12-438f-8bdb-498e6c03acbd"
};
