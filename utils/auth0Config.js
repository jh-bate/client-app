export const AUTH_CONFIG = {
  domain: 'tidepool.auth0.com',
  clientId: 'ux9oGsuLRVN50vPvckkZ1uz4p6Aebp4h',
  responseType: 'id_token token',
  scope: 'openid profile read:data',
  audience: 'http://localhost:8009/data',
  redirectUri: 'http://localhost:3009/auth/signed-in'
}
