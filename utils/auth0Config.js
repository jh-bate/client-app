export const AUTH_CONFIG = {
  domain: 'tidepool-dev.auth0.com',
  clientId: 'uxishYjfZAfLewQ2E7uBNsWHzZ0lucdU',
  responseType: 'id_token token',
  scope: 'openid read:device-data',
  audience: 'open-api',
  redirectUri: 'http://localhost:3009/auth/signed-in',
  //tidepoolAPI: 'http://localhost:8009',
  tidepoolAPI: 'https://dev-api.tidepool.org',
}
