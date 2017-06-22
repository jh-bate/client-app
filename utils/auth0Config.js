export const AUTH_CONFIG = {
  domain: 'tidepool.auth0.com',
  clientId: '<app_client_id>',
  responseType: 'id_token token',
  scope: 'openid profile read:data',
  audience: 'https://dev-api.tidepool.org/data',
  redirectUri: 'http://localhost:3009/auth/signed-in'
}
