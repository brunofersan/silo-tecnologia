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
    size: "138 MB",
    url: "https://drive.google.com/file/d/1H6_TBzAW7IjGo9a6QI4avdpQK3GQ3gfQ/view?usp=sharing"
  },
  // Pacote do Linux x64 (.tar.gz), independente da lista de versões do Windows.
  // url vazio = o botão "Baixar para Linux" fica escondido.
  LINUX: {
    version: "2.0.0",
    date: "2026-11-06",
    size: "143 MB",
    url: "https://drive.google.com/file/d/1_2nBrJx6pw0f0JYybyjpbOilwnBz2hpg/view?usp=sharing"
  },
  // Doações. Tudo opcional: a seção "Apoie" só aparece se houver chave Pix ou algum link.
  //   pixKey    chave Pix (e-mail, telefone, CPF/CNPJ ou chave aleatória)
  //   pixHolder nome que aparece no app do banco ao pagar (opcional, ajuda a pessoa a conferir)
  //   links     outros meios, só https: [{ label: "PayPal", url: "https://www.paypal.com/..." }]
  DONATE: {
    pixKey: "",
    pixHolder: "",
    links: []
  },
  // Anúncios do Google AdSense. Sem "client" nada é carregado nem aparece.
  //   client      ID do editor, no formato ca-pub-0000000000000000
  //   slots       ID de cada bloco de anúncio criado no AdSense: { middle: "...", bottom: "..." }
  //   ownConsent  true: o aviso de cookies deste site decide se os anúncios carregam;
  //               false: use só o aviso do próprio Google (AdSense > Privacidade e mensagens)
  ADS: {
    client: "",
    slots: { middle: "", bottom: "" },
    ownConsent: true
  },
  VERSIONS: [
    {
      version: "2.0.0",
      date: "2026-11-06",
      installerSize: "235 MB",
      portableSize: "247 MB",
      installerUrl: "https://drive.google.com/file/d/1IO5zKZXGLwgwc6Rj_KcJggh9miMzwQCW/view?usp=sharing",
      portableUrl: "https://drive.google.com/file/d/1k9Iqi7gamOGApqJlmgvBRkDHL8e5X_T-/view?usp=sharing"
    }
  ],
  // Chave de acesso do Web3Forms (https://web3forms.com). O formulário de
  // suporte envia para o e-mail cadastrado lá, sem mostrar o e-mail no site.
  // Vazio = formulário desativado com aviso "em breve".
  FORM_ACCESS_KEY: "fac82c97-df12-438f-8bdb-498e6c03acbd"
};
