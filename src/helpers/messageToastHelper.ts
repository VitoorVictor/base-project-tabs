export const messageToastHelper = {
  accessDenied: (feature?: string) =>
    feature
      ? `Você não tem permissão para acessar ${feature}.`
      : "Você não tem permissão para acessar esta funcionalidade.",

//   actionNotAllowed: "Ação não permitida.",
//   loginRequired: "Você precisa estar logado para realizar esta ação.",
//   invalidOperation: "Operação inválida.",
};