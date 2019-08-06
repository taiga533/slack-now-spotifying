import SpotifyDAO from 'src/dataAccessObjects/SpotifyDAO';
import SlackDAO from 'src/dataAccessObjects/SlackDAO';
import TokenDAO from 'src/dataAccessObjects/TokenDAO';
import { AxiosResponse } from 'axios';

export default class SlackStatusService {
    private static HTTP_NO_CONTENT_STATUS_CODE = 204
    private _spotifyDAO: SpotifyDAO = new SpotifyDAO("user-read-currently-playing")

    async setNowPlayingToStatus() {
        const tokens = await TokenDAO.getTokens();
        await Promise.all(tokens.map(async token => {
            const spotifyResponse = await this._spotifyDAO.fetchNowPlaying(token.accessToken);
            const statusText = this.buildStatusText(spotifyResponse)
            const slackResponse = await SlackDAO.updateStatus(statusText)
            return slackResponse.status === 200 ? "success" : "failed"
        }))
        return "ok"
    }

    private buildStatusText(res: AxiosResponse):string {
        if (!res.data.is_playing || res.status === SlackStatusService.HTTP_NO_CONTENT_STATUS_CODE)
                return "現在再生中の曲はありません。"
        return `再生中:${res.data.item.name}\n`
                + `アーティスト:${res.data.item.artists[0].name} ${res.data.item.artists.length > 1 ? "+α" : ""}`
    }
}