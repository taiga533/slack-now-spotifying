import axios from 'axios'
import SpotifyConfig from "src/configs/SpotifyConfig";
import * as querystring from 'querystring'

export default class SpotifyDAO {

    constructor(private _apiScope: string) {
    }

    get apiScope(): string {
        return this._apiScope;
    }

    get authUrl(): string {
        return `https://accounts.spotify.com/ja/authorize?`
                + `client_id=${SpotifyConfig.CLIENT_ID}`
                + `&response_type=${SpotifyConfig.RESPONSE_TYPE}`
                + `&redirect_uri=${SpotifyConfig.REDIRECT_URL}`
                + `&scope=${this._apiScope}`;
    }

    async fetchToken(authorizeCode: string) {
        const grantType = "authorization_code"
        return axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify({
                grant_type: grantType,
                code: authorizeCode,
                redirect_uri: SpotifyConfig.REDIRECT_URL
            }),
            {
                headers: {
                    'Authorization': `Basic ${SpotifyConfig.bearerToken}`,
                    'Accept-Language': 'ja,en'
                }
            },
        );
    }

    async refreshToken(refreshToken: string) {
        const grantType = "refresh_token"

        return axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify({
                grant_type: grantType,
                refresh_token: refreshToken,
            }),
            {
                headers: {
                    'Authorization': `Basic ${SpotifyConfig.bearerToken}`
                }
            },
        );
    }

    async fetchNowPlaying(accessToken: string) {
        return axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': 'ja,en'
                }
            },
        );
    }

}