// =====================================================================
//  CONFIGURAÇÃO DO SITE — único lugar a editar para cada nova versão.
//
//  VERSIONS: a primeira da lista é a versão atual (botões principais).
//  Todas aparecem na tabela "Versões". Para uma versão nova, copie o bloco,
//  cole no topo da lista e troque os dados.
//  Os links dos instaladores NÃO ficam no site: cada download é pedido pelo
//  formulário e só é liberado depois da aprovação (veja apps-script/LEIAME.md).
//  Os IDs dos arquivos no Drive ficam nas propriedades do Apps Script.
//  available: false = "em breve" / botão escondido.
//  As notas ficam em release-notes.md (rode tools/build-releases.py).
// =====================================================================
window.SILO_CONFIG = {
  // Versão mais nova do Silo IDE, entregue pela atualização automática.
  // Quando for maior que a do instalador de algum sistema (VERSIONS[0], MAC ou
  // LINUX), o site avisa quais instaladores são de versão anterior e que a IDE
  // se atualiza sozinha.
  LATEST: "2.6.0",
  // Instalador do macOS (Apple Silicon), independente da lista de versões do Windows.
  // available: false = o botão "Baixar para Mac" fica escondido.
  MAC: {
    version: "2.0.0",
    date: "2026-11-06",
    size: "138 MB",
    available: true
  },
  // Pacote do Linux x64 (.tar.gz), independente da lista de versões do Windows.
  // available: false = o botão "Baixar para Linux" fica escondido.
  LINUX: {
    version: "2.4.0",
    date: "2026-11-12",
    size: "144 MB",
    available: true
  },
  // Doações. Tudo opcional: a seção "Apoie" só aparece se houver chave Pix ou algum link.
  //   pixKey    chave Pix (e-mail, telefone, CPF/CNPJ ou chave aleatória)
  //   pixHolder nome que aparece no app do banco ao pagar (opcional, ajuda a pessoa a conferir)
  //   links     outros meios, só https: [{ label: "PayPal", url: "https://www.paypal.com/..." }]
  DONATE: {
    pixKey: "52a31425-6b1a-4553-bfa9-342bf99a7632",
    pixHolder: "Bruno Ferreira dos Santos",
    links: [{ label: "Mercado Pago", url: "https://link.mercadopago.com.br/doacaosilotech" }]
  },
  VERSIONS: [
    {
      version: "2.0.0",
      date: "2026-11-06",
      installerSize: "235 MB",
      portableSize: "247 MB",
      installer: true,
      portable: true
    }
  ],
  // Endereço do app da Web do Apps Script que recebe os pedidos de download
  // (termina em /exec). Vazio = botões de download desativados com aviso "em breve".
  DOWNLOAD_REQUEST_URL: "https://script.google.com/macros/s/AKfycbxYkXqfyuo_KIXj32SSr9-3FwOLbIRBd9ekRbCklZ-d9ujzJIUw31DN3NyNjOdr0zLyVQ/exec",
  // Chave de acesso do Web3Forms (https://web3forms.com). O formulário de
  // suporte envia para o e-mail cadastrado lá, sem mostrar o e-mail no site.
  // Vazio = formulário desativado com aviso "em breve".
  FORM_ACCESS_KEY: "fac82c97-df12-438f-8bdb-498e6c03acbd"
};
