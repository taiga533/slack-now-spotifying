import 'module-alias/register';
import * as chai from 'chai';
import * as TestDeriver from 'src/test/testDriver'
TestDeriver.initialize()
import * as functionsEntryPoint from 'src/index'
import SpotifyConfig from 'src/configs/SpotifyConfig';
describe('auth_spotify', () => {
    it('should response vaild Oauth link', async () => {
        const authUrl = `https://accounts\\.spotify\\.com/ja/authorize\\?`
                + `client_id=${SpotifyConfig.CLIENT_ID}`
                + `&response_type=${SpotifyConfig.RESPONSE_TYPE}`
                + `&redirect_uri=${SpotifyConfig.REDIRECT_URL}`
                + `&scope=user-read-currently-playing`;
        const authLinkTagRegexp = new RegExp(authUrl)
        const req = {
        } as any
        const resp = {
            send: (body: string) => {
                chai.assert.match(body, authLinkTagRegexp)
            }
        } as any
        functionsEntryPoint.auth_spotify(req, resp);
    });
});
