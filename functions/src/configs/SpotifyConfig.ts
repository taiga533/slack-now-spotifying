import * as functions from 'firebase-functions';

export default class SpotifyConfig {
    static CLIENT_ID: string = functions.config().spotify.client_id
    static REDIRECT_URL: string = functions.config().spotify.redirect_url
    static RESPONSE_TYPE: string = "code"
    private static SECRET: string = functions.config().spotify.secret

    public static get bearerToken():string {
        const stringBuffer = Buffer.from(`${this.CLIENT_ID}:${this.SECRET}`);
        return stringBuffer.toString('base64');
    }
}
