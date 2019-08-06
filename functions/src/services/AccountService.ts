import SpotifyDAO from 'src/dataAccessObjects/SpotifyDAO';
import SpotifyToken from 'src/objects/SpotifyToken';
import TokenDAO from 'src/dataAccessObjects/TokenDAO';

export default class AccountService {
    private _spotifyDAO: SpotifyDAO = new SpotifyDAO("user-read-currently-playing")

    get authUrl():string {
        return this._spotifyDAO.authUrl;
    }

    async fetchToken(authorizeCode: string) {
        return this._spotifyDAO.fetchToken(authorizeCode);
    }

    async storeToken(accessToken: string, refreshToken: string) {
        const token = new SpotifyToken(accessToken, refreshToken);
        return TokenDAO.addToken(token);
    }

    async refreshTokens() {
        const oldTokens = await TokenDAO.getTokens();
        const refreshedTokens = await Promise.all(oldTokens.map(async token => {
            const res = await this._spotifyDAO.refreshToken(token.refreshToken)
            const refreshedToken = new SpotifyToken(
                    res.data.access_token,
                    token.refreshToken,
                    token.id);
            await TokenDAO.updateToken(refreshedToken);
            return refreshedToken;
        }));
        return refreshedTokens
    }


}