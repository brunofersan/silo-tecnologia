// =====================================================================
//  CONFIGURAÇÃO DO SITE — único lugar a editar para cada nova versão.
//
//  VERSIONS: a primeira da lista é a versão atual (botões principais).
//  Todas aparecem na tabela "Versões". Para uma versão nova, copie o bloco,
//  cole no topo da lista e troque os dados.
//  installerId / portableId: ID do arquivo no Google Drive (o trecho entre
//  /d/ e /view do link de compartilhamento, com acesso "qualquer pessoa com o
//  link"). O download é direto, sem pedido. Vazio = "em breve" / botão desativado.
//  As notas ficam em release-notes.md (rode tools/build-releases.py).
// =====================================================================
window.SILO_CONFIG = {
  // Versão mais nova do Silo IDE, entregue pela atualização automática.
  // Quando for maior que a do instalador (VERSIONS[0]), o site avisa que o
  // instalador é de versão anterior e que a IDE se atualiza sozinha.
  LATEST: "3.0.0",
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
      version: "3.0.0",
      date: "2026-11-13",
      installerSize: "",
      portableSize: "",
      installerId: "",
      portableId: "",
      installer: true,
      portable: true
    }
  ],
  // Chave de acesso do Web3Forms (https://web3forms.com). O formulário de
  // suporte envia para o e-mail cadastrado lá, sem mostrar o e-mail no site.
  // Vazio = formulário desativado com aviso "em breve".
  FORM_ACCESS_KEY: "fac82c97-df12-438f-8bdb-498e6c03acbd"
};
