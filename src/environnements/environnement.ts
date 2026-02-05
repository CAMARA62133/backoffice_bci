export const environment = {
  production: true,
  apiUrl: 'https://dev-api-bcibank.ecash-guinee.com',
  appName: 'Backoffice web site',
  siteUrl: 'http://localhost:4200',

  lienSite: 'https://devbackoffice-bci.ecash-guinee.com',
  lienSite2: 'http://localhost:4200',

  // Le liens des apis avec node
  nodeApi: {
    userLogUrl: 'https://dev-api-bcibankjs.ecash-guinee.com/api/user_activity',
    orgLogUrl: 'https://dev-api-bcibankjs.ecash-guinee.com/api/org_logs',
    baseUrl: 'https://dev-api-bcibankjs.ecash-guinee.com/api',
    facturierImgUrl:
      'https://dev-api-bcibankjs.ecash-guinee.com/api/webdav/read-image',
  },

  appVersion: {
    vcVersion: '1.00',
  },
};
